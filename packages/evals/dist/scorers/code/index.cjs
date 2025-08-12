'use strict';

var scores = require('@mastra/core/scores');
var nlp = require('compromise');
var difflib = require('difflib');
var keyword_extractor = require('keyword-extractor');
var stringSimilarity = require('string-similarity');
var Sentiment = require('sentiment');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var nlp__default = /*#__PURE__*/_interopDefault(nlp);
var keyword_extractor__default = /*#__PURE__*/_interopDefault(keyword_extractor);
var stringSimilarity__default = /*#__PURE__*/_interopDefault(stringSimilarity);
var Sentiment__default = /*#__PURE__*/_interopDefault(Sentiment);

function normalizeString(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function extractElements(doc) {
  const nouns = doc.nouns().out("array") || [];
  const verbs = doc.verbs().toInfinitive().out("array") || [];
  const topics = doc.topics().out("array") || [];
  const terms = doc.terms().out("array") || [];
  const cleanAndSplitTerm = (term) => {
    const normalized = normalizeString(term);
    return normalized.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter((word) => word.length > 0);
  };
  const processedTerms = [
    ...nouns.flatMap(cleanAndSplitTerm),
    ...verbs.flatMap(cleanAndSplitTerm),
    ...topics.flatMap(cleanAndSplitTerm),
    ...terms.flatMap(cleanAndSplitTerm)
  ];
  return [...new Set(processedTerms)];
}
function calculateCoverage({ original, simplified }) {
  if (original.length === 0) {
    return simplified.length === 0 ? 1 : 0;
  }
  const covered = original.filter(
    (element) => simplified.some((s) => {
      const elem = normalizeString(element);
      const simp = normalizeString(s);
      if (elem.length <= 3) {
        return elem === simp;
      }
      const longer = elem.length > simp.length ? elem : simp;
      const shorter = elem.length > simp.length ? simp : elem;
      if (longer.includes(shorter)) {
        return shorter.length / longer.length > 0.6;
      }
      return false;
    })
  );
  return covered.length / original.length;
}
function createCompletenessScorer() {
  return scores.createScorer({
    name: "Completeness",
    description: 'Leverage the nlp method from "compromise" to extract elements from the input and output and calculate the coverage.'
  }).preprocess(async ({ run }) => {
    const isInputInvalid = !run.input || run.input.inputMessages.some((i) => i.content === null || i.content === void 0);
    const isOutputInvalid = !run.output || run.output.some((i) => i.content === null || i.content === void 0);
    if (isInputInvalid || isOutputInvalid) {
      throw new Error("Inputs cannot be null or undefined");
    }
    const input = run.input?.inputMessages.map((i) => i.content).join(", ") || "";
    const output = run.output?.map(({ content }) => content).join(", ") || "";
    const inputToProcess = input;
    const outputToProcess = output;
    const inputDoc = nlp__default.default(inputToProcess.trim());
    const outputDoc = nlp__default.default(outputToProcess.trim());
    const inputElements = extractElements(inputDoc);
    const outputElements = extractElements(outputDoc);
    return {
      inputElements,
      outputElements,
      missingElements: inputElements.filter((e) => !outputElements.includes(e)),
      elementCounts: {
        input: inputElements.length,
        output: outputElements.length
      }
    };
  }).generateScore(({ results }) => {
    const inputElements = results.preprocessStepResult?.inputElements;
    const outputElements = results.preprocessStepResult?.outputElements;
    return calculateCoverage({
      original: inputElements,
      simplified: outputElements
    });
  });
}
function createTextualDifferenceScorer() {
  return scores.createScorer({
    name: "Completeness",
    description: 'Leverage the nlp method from "compromise" to extract elements from the input and output and calculate the coverage.'
  }).preprocess(async ({ run }) => {
    const input = run.input?.inputMessages?.map((i) => i.content).join(", ") || "";
    const output = run.output?.map((i) => i.content).join(", ") || "";
    const matcher = new difflib.SequenceMatcher(null, input, output);
    const ratio = matcher.ratio();
    const ops = matcher.getOpcodes();
    const changes = ops.filter(([op]) => op !== "equal").length;
    const maxLength = Math.max(input.length, output.length);
    const lengthDiff = maxLength > 0 ? Math.abs(input.length - output.length) / maxLength : 0;
    const confidence = 1 - lengthDiff;
    return {
      ratio,
      confidence,
      changes,
      lengthDiff
    };
  }).generateScore(({ results }) => {
    return results.preprocessStepResult?.ratio;
  });
}
function createKeywordCoverageScorer() {
  return scores.createScorer({
    name: "Completeness",
    description: 'Leverage the nlp method from "compromise" to extract elements from the input and output and calculate the coverage.'
  }).preprocess(async ({ run }) => {
    const input = run.input?.inputMessages?.map((i) => i.content).join(", ") || "";
    const output = run.output?.map((i) => i.content).join(", ") || "";
    if (!input && !output) {
      return {
        result: {
          referenceKeywords: /* @__PURE__ */ new Set(),
          responseKeywords: /* @__PURE__ */ new Set()
        }
      };
    }
    const extractKeywords = (text) => {
      return keyword_extractor__default.default.extract(text, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: true
      });
    };
    const referenceKeywords = new Set(extractKeywords(input));
    const responseKeywords = new Set(extractKeywords(output));
    return {
      referenceKeywords,
      responseKeywords
    };
  }).analyze(async ({ results }) => {
    if (!results.preprocessStepResult?.referenceKeywords?.size && !results.preprocessStepResult?.responseKeywords?.size) {
      return {
        totalKeywordsLength: 0,
        matchedKeywordsLength: 0
      };
    }
    const matchedKeywords = [...results.preprocessStepResult?.referenceKeywords].filter(
      (k) => results.preprocessStepResult?.responseKeywords?.has(k)
    );
    return {
      totalKeywordsLength: Array.from(results.preprocessStepResult?.referenceKeywords).length ?? 0,
      matchedKeywordsLength: matchedKeywords.length ?? 0
    };
  }).generateScore(({ results }) => {
    if (!results.analyzeStepResult?.totalKeywordsLength) {
      return 1;
    }
    const totalKeywords = results.analyzeStepResult?.totalKeywordsLength;
    const matchedKeywords = results.analyzeStepResult?.matchedKeywordsLength;
    return totalKeywords > 0 ? matchedKeywords / totalKeywords : 0;
  });
}
function createContentSimilarityScorer({ ignoreCase, ignoreWhitespace } = { ignoreCase: true, ignoreWhitespace: true }) {
  return scores.createScorer({
    name: "Completeness",
    description: 'Leverage the nlp method from "compromise" to extract elements from the input and output and calculate the coverage.'
  }).preprocess(async ({ run }) => {
    let processedInput = run.input?.inputMessages.map((i) => i.content).join(", ") || "";
    let processedOutput = run.output.map((i) => i.content).join(", ") || "";
    if (ignoreCase) {
      processedInput = processedInput.toLowerCase();
      processedOutput = processedOutput.toLowerCase();
    }
    if (ignoreWhitespace) {
      processedInput = processedInput.replace(/\s+/g, " ").trim();
      processedOutput = processedOutput.replace(/\s+/g, " ").trim();
    }
    return {
      processedInput,
      processedOutput
    };
  }).generateScore(({ results }) => {
    const similarity = stringSimilarity__default.default.compareTwoStrings(
      results.preprocessStepResult?.processedInput,
      results.preprocessStepResult?.processedOutput
    );
    return similarity;
  });
}
function createToneScorer(config = {}) {
  const { referenceTone } = config;
  return scores.createScorer({
    name: "Completeness",
    description: 'Leverage the nlp method from "compromise" to extract elements from the input and output and calculate the coverage.'
  }).preprocess(async ({ run }) => {
    const sentiment = new Sentiment__default.default();
    const agentMessage = run.output?.map((i) => i.content).join(", ") || "";
    const responseSentiment = sentiment.analyze(agentMessage);
    if (referenceTone) {
      const referenceSentiment = sentiment.analyze(referenceTone);
      const sentimentDiff = Math.abs(responseSentiment.comparative - referenceSentiment.comparative);
      const normalizedScore = Math.max(0, 1 - sentimentDiff);
      return {
        score: normalizedScore,
        responseSentiment: responseSentiment.comparative,
        referenceSentiment: referenceSentiment.comparative,
        difference: sentimentDiff
      };
    }
    const sentences = agentMessage.match(/[^.!?]+[.!?]+/g) || [agentMessage];
    const sentiments = sentences.map((s) => sentiment.analyze(s).comparative);
    const avgSentiment = sentiments.reduce((a, b) => a + b, 0) / sentiments.length;
    const variance = sentiments.reduce((sum, s) => sum + Math.pow(s - avgSentiment, 2), 0) / sentiments.length;
    const stability = Math.max(0, 1 - variance);
    return {
      score: stability,
      avgSentiment,
      sentimentVariance: variance
    };
  }).generateScore(({ results }) => {
    return results.preprocessStepResult?.score;
  });
}

exports.createCompletenessScorer = createCompletenessScorer;
exports.createContentSimilarityScorer = createContentSimilarityScorer;
exports.createKeywordCoverageScorer = createKeywordCoverageScorer;
exports.createTextualDifferenceScorer = createTextualDifferenceScorer;
exports.createToneScorer = createToneScorer;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map