import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import React__default, { createContext, useContext, forwardRef, memo, useState, useEffect, useRef, useCallback, useMemo, Suspense, Fragment as Fragment$1, startTransition } from 'react';
import { MastraClient } from '@mastra/client-js';
import { useMessage, MessagePrimitive, ActionBarPrimitive, useAttachment, AttachmentPrimitive, useComposerRuntime, ComposerPrimitive, ThreadPrimitive, CompositeAttachmentAdapter, SimpleImageAttachmentAdapter, SimpleTextAttachmentAdapter, WebSpeechSynthesisAdapter, useExternalStoreRuntime, AssistantRuntimeProvider } from '@assistant-ui/react';
import { CheckIcon as CheckIcon$1, CopyIcon, Check, Copy, ChevronUpIcon, BrainIcon, AudioLinesIcon, StopCircleIcon, X, FileText, CircleXIcon, Mic, PlusIcon, ArrowUp, Search, RefreshCcwIcon, ChevronRight, SortAsc, SortDesc, Circle, ChevronDown, Braces, SaveIcon, RefreshCw, ExternalLink, InfoIcon as InfoIcon$1, GaugeIcon, Plus, LoaderCircle, ChevronDownIcon, ExternalLinkIcon, Loader2, Network, PauseIcon, HourglassIcon, CircleDashed, Footprints, CircleCheck, CircleX, Minus, Maximize, Workflow, AlertCircleIcon, Users, Brain, NetworkIcon, SearchIcon, AlertCircle, CalendarIcon, Brackets, TrashIcon, CirclePause, StopCircle, ChevronUp } from 'lucide-react';
import { Slot } from '@radix-ui/react-slot';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { TooltipProvider as TooltipProvider$1 } from '@radix-ui/react-tooltip';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { unstable_memoizeMarkdownComponents, useIsMarkdownCodeBlock, MarkdownTextPrimitive } from '@assistant-ui/react-markdown';
import '@assistant-ui/react-markdown/styles/dot.css';
import remarkGfm from 'remark-gfm';
import { makePrismAsyncSyntaxHighlighter } from '@assistant-ui/react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { jsonLanguage } from '@codemirror/lang-json';
import { tags } from '@lezer/highlight';
import { draculaInit } from '@uiw/codemirror-theme-dracula';
import CodeMirror from '@uiw/react-codemirror';
import { toast } from 'sonner';
import { useShallow } from 'zustand/shallow';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { RuntimeContext as RuntimeContext$1 } from '@mastra/core/di';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format, formatDistanceToNow, isValid, formatDate } from 'date-fns';
import { AnimatePresence } from 'motion/react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as SliderPrimitive from '@radix-ui/react-slider';
import * as LabelPrimitive from '@radix-ui/react-label';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import prettier from 'prettier';
import prettierPluginBabel from 'prettier/plugins/babel';
import prettierPluginEstree from 'prettier/plugins/estree';
import { C as Colors } from './colors-DrbbnW3f.js';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { processDataStream } from '@ai-sdk/ui-utils';
import Markdown from 'react-markdown';
import { MarkerType, Handle, Position, useViewport, useReactFlow, Panel, useNodesState, useEdgesState, ReactFlow, MiniMap, Background, BackgroundVariant, ReactFlowProvider, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Dagre from '@dagrejs/dagre';
import { Highlight, themes } from 'prism-react-renderer';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { useDebouncedCallback } from 'use-debounce';
import { v4 } from '@lukeed/uuid';
import { RuntimeContext as RuntimeContext$2 } from '@mastra/core/runtime-context';
import jsonSchemaToZod from 'json-schema-to-zod';
import { parse } from 'superjson';
import z$1, { z, ZodObject } from 'zod';
import { AutoForm as AutoForm$1, buildZodFieldConfig } from '@autoform/react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { DayPicker } from 'react-day-picker';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ZodProvider, getFieldConfigInZodStack, getDefaultValueInZodStack } from '@autoform/zod';
import { CodeBlock as CodeBlock$1 } from 'react-code-block';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './index.css';export * from '@tanstack/react-query';

const createMastraClient = (baseUrl, mastraClientHeaders = {}) => {
  return new MastraClient({
    baseUrl: baseUrl || "",
    // only add the header if the baseUrl is not provided i.e it's a local dev environment
    headers: !baseUrl ? { ...mastraClientHeaders, "x-mastra-dev-playground": "true" } : mastraClientHeaders
  });
};

const MastraClientContext = createContext(void 0);
const MastraClientProvider = ({
  children,
  baseUrl,
  headers
}) => {
  const client = createMastraClient(baseUrl, headers);
  return /* @__PURE__ */ jsx(MastraClientContext.Provider, { value: { client }, children });
};
const useMastraClient = () => {
  const context = useContext(MastraClientContext);
  if (context === void 0) {
    throw new Error("useMastraClient must be used within a MastraClientProvider");
  }
  return context.client;
};

function r(e){var t,f,n="";if("string"==typeof e||"number"==typeof e)n+=e;else if("object"==typeof e)if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(f=r(e[t]))&&(n&&(n+=" "),n+=f);}else for(f in e)e[f]&&(n&&(n+=" "),n+=f);return n}function clsx(){for(var e,t,f=0,n="",o=arguments.length;f<o;f++)(e=arguments[f])&&(t=r(e))&&(n&&(n+=" "),n+=t);return n}

const falsyToString = (value)=>typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config)=>(props)=>{
        var _config_compoundVariants;
        if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
        const { variants, defaultVariants } = config;
        const getVariantClassNames = Object.keys(variants).map((variant)=>{
            const variantProp = props === null || props === void 0 ? void 0 : props[variant];
            const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
            if (variantProp === null) return null;
            const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
            return variants[variant][variantKey];
        });
        const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param)=>{
            let [key, value] = param;
            if (value === undefined) {
                return acc;
            }
            acc[key] = value;
            return acc;
        }, {});
        const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param)=>{
            let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
            return Object.entries(compoundVariantOptions).every((param)=>{
                let [key, value] = param;
                return Array.isArray(value) ? value.includes({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                }[key]) : ({
                    ...defaultVariants,
                    ...propsWithoutUndefined
                })[key] === value;
            }) ? [
                ...acc,
                cvClass,
                cvClassName
            ] : acc;
        }, []);
        return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
    };

const CLASS_PART_SEPARATOR = '-';
const createClassGroupUtils = config => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = className => {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    // Classes like `-inset-1` produce an empty string as first classPart. We assume that classes for negative values are used correctly and remove it from classParts.
    if (classParts[0] === '' && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
const getGroupRecursive = (classParts, classPartObject) => {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : undefined;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return undefined;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator
  }) => validator(classRest))?.classGroupId;
};
const arbitraryPropertyRegex = /^\[(.+)\]$/;
const getGroupIdForArbitraryProperty = className => {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(':'));
    if (property) {
      // I use two dots here because one dot is used as prefix for class groups in plugins
      return 'arbitrary..' + property;
    }
  }
};
/**
 * Exported for testing only
 */
const createClassMap = config => {
  const {
    theme,
    classGroups
  } = config;
  const classMap = {
    nextPart: new Map(),
    validators: []
  };
  for (const classGroupId in classGroups) {
    processClassesRecursively(classGroups[classGroupId], classMap, classGroupId, theme);
  }
  return classMap;
};
const processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  classGroup.forEach(classDefinition => {
    if (typeof classDefinition === 'string') {
      const classPartObjectToEdit = classDefinition === '' ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === 'function') {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key, classGroup]) => {
      processClassesRecursively(classGroup, getPart(classPartObject, key), classGroupId, theme);
    });
  });
};
const getPart = (classPartObject, path) => {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach(pathPart => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
};
const isThemeGetter = func => func.isThemeGetter;

// LRU cache inspired from hashlru (https://github.com/dominictarr/hashlru/blob/v1.0.4/index.js) but object replaced with Map to improve performance
const createLruCache = maxCacheSize => {
  if (maxCacheSize < 1) {
    return {
      get: () => undefined,
      set: () => {}
    };
  }
  let cacheSize = 0;
  let cache = new Map();
  let previousCache = new Map();
  const update = (key, value) => {
    cache.set(key, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = new Map();
    }
  };
  return {
    get(key) {
      let value = cache.get(key);
      if (value !== undefined) {
        return value;
      }
      if ((value = previousCache.get(key)) !== undefined) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (cache.has(key)) {
        cache.set(key, value);
      } else {
        update(key, value);
      }
    }
  };
};
const IMPORTANT_MODIFIER = '!';
const MODIFIER_SEPARATOR = ':';
const MODIFIER_SEPARATOR_LENGTH = MODIFIER_SEPARATOR.length;
const createParseClassName = config => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  /**
   * Parse class name into parts.
   *
   * Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
   * @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
   */
  let parseClassName = className => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index = 0; index < className.length; index++) {
      let currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + MODIFIER_SEPARATOR_LENGTH;
          continue;
        }
        if (currentCharacter === '/') {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === '[') {
        bracketDepth++;
      } else if (currentCharacter === ']') {
        bracketDepth--;
      } else if (currentCharacter === '(') {
        parenDepth++;
      } else if (currentCharacter === ')') {
        parenDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const baseClassName = stripImportantModifier(baseClassNameWithImportantModifier);
    const hasImportantModifier = baseClassName !== baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = className => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.substring(fullPrefix.length)) : {
      isExternal: true,
      modifiers: [],
      hasImportantModifier: false,
      baseClassName: className,
      maybePostfixModifierPosition: undefined
    };
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = className => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
const stripImportantModifier = baseClassName => {
  if (baseClassName.endsWith(IMPORTANT_MODIFIER)) {
    return baseClassName.substring(0, baseClassName.length - 1);
  }
  /**
   * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
   * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
   */
  if (baseClassName.startsWith(IMPORTANT_MODIFIER)) {
    return baseClassName.substring(1);
  }
  return baseClassName;
};

/**
 * Sorts modifiers according to following schema:
 * - Predefined modifiers are sorted alphabetically
 * - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
 */
const createSortModifiers = config => {
  const orderSensitiveModifiers = Object.fromEntries(config.orderSensitiveModifiers.map(modifier => [modifier, true]));
  const sortModifiers = modifiers => {
    if (modifiers.length <= 1) {
      return modifiers;
    }
    const sortedModifiers = [];
    let unsortedModifiers = [];
    modifiers.forEach(modifier => {
      const isPositionSensitive = modifier[0] === '[' || orderSensitiveModifiers[modifier];
      if (isPositionSensitive) {
        sortedModifiers.push(...unsortedModifiers.sort(), modifier);
        unsortedModifiers = [];
      } else {
        unsortedModifiers.push(modifier);
      }
    });
    sortedModifiers.push(...unsortedModifiers.sort());
    return sortedModifiers;
  };
  return sortModifiers;
};
const createConfigUtils = config => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  ...createClassGroupUtils(config)
});
const SPLIT_CLASSES_REGEX = /\s+/;
const mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers
  } = configUtils;
  /**
   * Set of classGroupIds in following format:
   * `{importantModifier}{variantModifiers}{classGroupId}`
   * @example 'float'
   * @example 'hover:focus:bg-color'
   * @example 'md:!pr'
   */
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = '';
  for (let index = classNames.length - 1; index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? ' ' + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        // Not a Tailwind class
        result = originalClassName + (result.length > 0 ? ' ' + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(':');
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.includes(classId)) {
      // Tailwind class omitted due to conflict
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0; i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    // Tailwind class not in conflict
    result = originalClassName + (result.length > 0 ? ' ' + result : result);
  }
  return result;
};

/**
 * The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
 *
 * Specifically:
 * - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
 * - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
 *
 * Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 */
function twJoin() {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = '';
  while (index < arguments.length) {
    if (argument = arguments[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
}
const toValue = mix => {
  if (typeof mix === 'string') {
    return mix;
  }
  let resolvedValue;
  let string = '';
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += ' ');
        string += resolvedValue;
      }
    }
  }
  return string;
};
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
const fromTheme = key => {
  const themeGetter = theme => theme[key] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
const arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
const arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
const fractionRegex = /^\d+\/\d+$/;
const tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
const lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
const colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
// Shadow always begins with x and y offset separated by underscore optionally prepended by inset
const shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
const imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
const isFraction = value => fractionRegex.test(value);
const isNumber = value => !!value && !Number.isNaN(Number(value));
const isInteger = value => !!value && Number.isInteger(Number(value));
const isPercent = value => value.endsWith('%') && isNumber(value.slice(0, -1));
const isTshirtSize = value => tshirtUnitRegex.test(value);
const isAny = () => true;
const isLengthOnly = value =>
// `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
// For example, `hsl(0 0% 0%)` would be classified as a length without this check.
// I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
const isNever = () => false;
const isShadow = value => shadowRegex.test(value);
const isImage = value => imageRegex.test(value);
const isAnyNonArbitrary = value => !isArbitraryValue(value) && !isArbitraryVariable(value);
const isArbitrarySize = value => getIsArbitraryValue(value, isLabelSize, isNever);
const isArbitraryValue = value => arbitraryValueRegex.test(value);
const isArbitraryLength = value => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
const isArbitraryNumber = value => getIsArbitraryValue(value, isLabelNumber, isNumber);
const isArbitraryPosition = value => getIsArbitraryValue(value, isLabelPosition, isNever);
const isArbitraryImage = value => getIsArbitraryValue(value, isLabelImage, isImage);
const isArbitraryShadow = value => getIsArbitraryValue(value, isLabelShadow, isShadow);
const isArbitraryVariable = value => arbitraryVariableRegex.test(value);
const isArbitraryVariableLength = value => getIsArbitraryVariable(value, isLabelLength);
const isArbitraryVariableFamilyName = value => getIsArbitraryVariable(value, isLabelFamilyName);
const isArbitraryVariablePosition = value => getIsArbitraryVariable(value, isLabelPosition);
const isArbitraryVariableSize = value => getIsArbitraryVariable(value, isLabelSize);
const isArbitraryVariableImage = value => getIsArbitraryVariable(value, isLabelImage);
const isArbitraryVariableShadow = value => getIsArbitraryVariable(value, isLabelShadow, true);
// Helpers
const getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
const getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
// Labels
const isLabelPosition = label => label === 'position' || label === 'percentage';
const isLabelImage = label => label === 'image' || label === 'url';
const isLabelSize = label => label === 'length' || label === 'size' || label === 'bg-size';
const isLabelLength = label => label === 'length';
const isLabelNumber = label => label === 'number';
const isLabelFamilyName = label => label === 'family-name';
const isLabelShadow = label => label === 'shadow';
const getDefaultConfig = () => {
  /**
   * Theme getters for theme variable namespaces
   * @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
   */
  /***/
  const themeColor = fromTheme('color');
  const themeFont = fromTheme('font');
  const themeText = fromTheme('text');
  const themeFontWeight = fromTheme('font-weight');
  const themeTracking = fromTheme('tracking');
  const themeLeading = fromTheme('leading');
  const themeBreakpoint = fromTheme('breakpoint');
  const themeContainer = fromTheme('container');
  const themeSpacing = fromTheme('spacing');
  const themeRadius = fromTheme('radius');
  const themeShadow = fromTheme('shadow');
  const themeInsetShadow = fromTheme('inset-shadow');
  const themeTextShadow = fromTheme('text-shadow');
  const themeDropShadow = fromTheme('drop-shadow');
  const themeBlur = fromTheme('blur');
  const themePerspective = fromTheme('perspective');
  const themeAspect = fromTheme('aspect');
  const themeEase = fromTheme('ease');
  const themeAnimate = fromTheme('animate');
  /**
   * Helpers to avoid repeating the same scales
   *
   * We use functions that create a new array every time they're called instead of static arrays.
   * This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
   */
  /***/
  const scaleBreak = () => ['auto', 'avoid', 'all', 'avoid-page', 'page', 'left', 'right', 'column'];
  const scalePosition = () => ['center', 'top', 'bottom', 'left', 'right', 'top-left',
  // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
  'left-top', 'top-right',
  // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
  'right-top', 'bottom-right',
  // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
  'right-bottom', 'bottom-left',
  // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
  'left-bottom'];
  const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
  const scaleOverflow = () => ['auto', 'hidden', 'clip', 'visible', 'scroll'];
  const scaleOverscroll = () => ['auto', 'contain', 'none'];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, 'full', 'auto', ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, 'none', 'subgrid', isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ['auto', {
    span: ['full', isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, 'auto', isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ['auto', 'min', 'max', 'fr', isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch', 'baseline', 'center-safe', 'end-safe'];
  const scaleAlignSecondaryAxis = () => ['start', 'end', 'center', 'stretch', 'center-safe', 'end-safe'];
  const scaleMargin = () => ['auto', ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, 'auto', 'full', 'dvw', 'dvh', 'lvw', 'lvh', 'svw', 'svh', 'min', 'max', 'fit', ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
    position: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleBgRepeat = () => ['no-repeat', {
    repeat: ['', 'x', 'y', 'space', 'round']
  }];
  const scaleBgSize = () => ['auto', 'cover', 'contain', isArbitraryVariableSize, isArbitrarySize, {
    size: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
  const scaleRadius = () => [
  // Deprecated since Tailwind CSS v4.0.0
  '', 'none', 'full', themeRadius, isArbitraryVariable, isArbitraryValue];
  const scaleBorderWidth = () => ['', isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ['solid', 'dashed', 'dotted', 'double'];
  const scaleBlendMode = () => ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];
  const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
  const scaleBlur = () => [
  // Deprecated since Tailwind CSS v4.0.0
  '', 'none', themeBlur, isArbitraryVariable, isArbitraryValue];
  const scaleRotate = () => ['none', isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ['none', isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, 'full', ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ['spin', 'ping', 'pulse', 'bounce'],
      aspect: ['video'],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      'drop-shadow': [isTshirtSize],
      ease: ['in', 'out', 'in-out'],
      font: [isAnyNonArbitrary],
      'font-weight': ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'],
      'inset-shadow': [isTshirtSize],
      leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
      perspective: ['dramatic', 'near', 'normal', 'midrange', 'distant', 'none'],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ['px', isNumber],
      text: [isTshirtSize],
      'text-shadow': [isTshirtSize],
      tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest']
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ['auto', 'square', isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ['container'],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      'break-after': [{
        'break-after': scaleBreak()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      'break-before': [{
        'break-before': scaleBreak()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      'break-inside': [{
        'break-inside': ['auto', 'avoid', 'avoid-page', 'avoid-column']
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      'box-decoration': [{
        'box-decoration': ['slice', 'clone']
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ['border', 'content']
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table', 'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group', 'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'inline-grid', 'contents', 'list-item', 'hidden'],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ['sr-only', 'not-sr-only'],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ['right', 'left', 'none', 'start', 'end']
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ['left', 'right', 'both', 'none', 'start', 'end']
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ['isolate', 'isolation-auto'],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      'object-fit': [{
        object: ['contain', 'cover', 'fill', 'none', 'scale-down']
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      'object-position': [{
        object: scalePositionWithArbitrary()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: scaleOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-x': [{
        'overflow-x': scaleOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      'overflow-y': [{
        'overflow-y': scaleOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-x': [{
        'overscroll-x': scaleOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      'overscroll-y': [{
        'overscroll-y': scaleOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: scaleInset()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-x': [{
        'inset-x': scaleInset()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      'inset-y': [{
        'inset-y': scaleInset()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: scaleInset()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: scaleInset()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: scaleInset()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: scaleInset()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: scaleInset()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: scaleInset()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ['visible', 'invisible', 'collapse'],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [isInteger, 'auto', isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [isFraction, 'full', 'auto', themeContainer, ...scaleUnambiguousSpacing()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      'flex-direction': [{
        flex: ['row', 'row-reverse', 'col', 'col-reverse']
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      'flex-wrap': [{
        flex: ['nowrap', 'wrap', 'wrap-reverse']
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [isNumber, isFraction, 'auto', 'initial', 'none', isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [isInteger, 'first', 'last', 'none', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      'grid-cols': [{
        'grid-cols': scaleGridTemplateColsRows()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start-end': [{
        col: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-start': [{
        'col-start': scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      'col-end': [{
        'col-end': scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      'grid-rows': [{
        'grid-rows': scaleGridTemplateColsRows()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start-end': [{
        row: scaleGridColRowStartAndEnd()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-start': [{
        'row-start': scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      'row-end': [{
        'row-end': scaleGridColRowStartOrEnd()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      'grid-flow': [{
        'grid-flow': ['row', 'col', 'dense', 'row-dense', 'col-dense']
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      'auto-cols': [{
        'auto-cols': scaleGridAutoColsRows()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      'auto-rows': [{
        'auto-rows': scaleGridAutoColsRows()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-x': [{
        'gap-x': scaleUnambiguousSpacing()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      'gap-y': [{
        'gap-y': scaleUnambiguousSpacing()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      'justify-content': [{
        justify: [...scaleAlignPrimaryAxis(), 'normal']
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      'justify-items': [{
        'justify-items': [...scaleAlignSecondaryAxis(), 'normal']
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      'justify-self': [{
        'justify-self': ['auto', ...scaleAlignSecondaryAxis()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      'align-content': [{
        content: ['normal', ...scaleAlignPrimaryAxis()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      'align-items': [{
        items: [...scaleAlignSecondaryAxis(), {
          baseline: ['', 'last']
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      'align-self': [{
        self: ['auto', ...scaleAlignSecondaryAxis(), {
          baseline: ['', 'last']
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      'place-content': [{
        'place-content': scaleAlignPrimaryAxis()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      'place-items': [{
        'place-items': [...scaleAlignSecondaryAxis(), 'baseline']
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      'place-self': [{
        'place-self': ['auto', ...scaleAlignSecondaryAxis()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: scaleMargin()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: scaleMargin()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: scaleMargin()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: scaleMargin()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: scaleMargin()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: scaleMargin()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: scaleMargin()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: scaleMargin()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: scaleMargin()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      'space-x': [{
        'space-x': scaleUnambiguousSpacing()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      'space-x-reverse': ['space-x-reverse'],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      'space-y': [{
        'space-y': scaleUnambiguousSpacing()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      'space-y-reverse': ['space-y-reverse'],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: scaleSizing()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [themeContainer, 'screen', ...scaleSizing()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      'min-w': [{
        'min-w': [themeContainer, 'screen', /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
        'none', ...scaleSizing()]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      'max-w': [{
        'max-w': [themeContainer, 'screen', 'none', /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
        'prose', /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
        {
          screen: [themeBreakpoint]
        }, ...scaleSizing()]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ['screen', 'lh', ...scaleSizing()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      'min-h': [{
        'min-h': ['screen', 'lh', 'none', ...scaleSizing()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      'max-h': [{
        'max-h': ['screen', 'lh', ...scaleSizing()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      'font-size': [{
        text: ['base', themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      'font-smoothing': ['antialiased', 'subpixel-antialiased'],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      'font-style': ['italic', 'not-italic'],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      'font-weight': [{
        font: [themeFontWeight, isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      'font-stretch': [{
        'font-stretch': ['ultra-condensed', 'extra-condensed', 'condensed', 'semi-condensed', 'normal', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded', isPercent, isArbitraryValue]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      'font-family': [{
        font: [isArbitraryVariableFamilyName, isArbitraryValue, themeFont]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-normal': ['normal-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-ordinal': ['ordinal'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-slashed-zero': ['slashed-zero'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-figure': ['lining-nums', 'oldstyle-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-spacing': ['proportional-nums', 'tabular-nums'],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      'fvn-fraction': ['diagonal-fractions', 'stacked-fractions'],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      'line-clamp': [{
        'line-clamp': [isNumber, 'none', isArbitraryVariable, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [/** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
        themeLeading, ...scaleUnambiguousSpacing()]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      'list-image': [{
        'list-image': ['none', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      'list-style-position': [{
        list: ['inside', 'outside']
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      'list-style-type': [{
        list: ['disc', 'decimal', 'none', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      'text-alignment': [{
        text: ['left', 'center', 'right', 'justify', 'start', 'end']
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      'placeholder-color': [{
        placeholder: scaleColor()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      'text-color': [{
        text: scaleColor()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      'text-decoration': ['underline', 'overline', 'line-through', 'no-underline'],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      'text-decoration-style': [{
        decoration: [...scaleLineStyle(), 'wavy']
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      'text-decoration-thickness': [{
        decoration: [isNumber, 'from-font', 'auto', isArbitraryVariable, isArbitraryLength]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      'text-decoration-color': [{
        decoration: scaleColor()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      'underline-offset': [{
        'underline-offset': [isNumber, 'auto', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      'text-transform': ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      'text-overflow': ['truncate', 'text-ellipsis', 'text-clip'],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      'text-wrap': [{
        text: ['wrap', 'nowrap', 'balance', 'pretty']
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      'vertical-align': [{
        align: ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ['normal', 'words', 'all', 'keep']
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ['break-word', 'anywhere', 'normal']
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ['none', 'manual', 'auto']
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ['none', isArbitraryVariable, isArbitraryValue]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      'bg-attachment': [{
        bg: ['fixed', 'local', 'scroll']
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      'bg-clip': [{
        'bg-clip': ['border', 'padding', 'content', 'text']
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      'bg-origin': [{
        'bg-origin': ['border', 'padding', 'content']
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      'bg-position': [{
        bg: scaleBgPosition()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      'bg-repeat': [{
        bg: scaleBgRepeat()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      'bg-size': [{
        bg: scaleBgSize()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      'bg-image': [{
        bg: ['none', {
          linear: [{
            to: ['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ['', isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      'bg-color': [{
        bg: scaleColor()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from-pos': [{
        from: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via-pos': [{
        via: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to-pos': [{
        to: scaleGradientStopPosition()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-from': [{
        from: scaleColor()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-via': [{
        via: scaleColor()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      'gradient-to': [{
        to: scaleColor()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: scaleRadius()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-s': [{
        'rounded-s': scaleRadius()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-e': [{
        'rounded-e': scaleRadius()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-t': [{
        'rounded-t': scaleRadius()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-r': [{
        'rounded-r': scaleRadius()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-b': [{
        'rounded-b': scaleRadius()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-l': [{
        'rounded-l': scaleRadius()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ss': [{
        'rounded-ss': scaleRadius()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-se': [{
        'rounded-se': scaleRadius()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-ee': [{
        'rounded-ee': scaleRadius()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-es': [{
        'rounded-es': scaleRadius()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tl': [{
        'rounded-tl': scaleRadius()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-tr': [{
        'rounded-tr': scaleRadius()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-br': [{
        'rounded-br': scaleRadius()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      'rounded-bl': [{
        'rounded-bl': scaleRadius()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w': [{
        border: scaleBorderWidth()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-x': [{
        'border-x': scaleBorderWidth()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-y': [{
        'border-y': scaleBorderWidth()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-s': [{
        'border-s': scaleBorderWidth()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-e': [{
        'border-e': scaleBorderWidth()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-t': [{
        'border-t': scaleBorderWidth()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-r': [{
        'border-r': scaleBorderWidth()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-b': [{
        'border-b': scaleBorderWidth()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      'border-w-l': [{
        'border-l': scaleBorderWidth()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      'divide-x': [{
        'divide-x': scaleBorderWidth()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      'divide-x-reverse': ['divide-x-reverse'],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      'divide-y': [{
        'divide-y': scaleBorderWidth()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      'divide-y-reverse': ['divide-y-reverse'],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      'border-style': [{
        border: [...scaleLineStyle(), 'hidden', 'none']
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      'divide-style': [{
        divide: [...scaleLineStyle(), 'hidden', 'none']
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color': [{
        border: scaleColor()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-x': [{
        'border-x': scaleColor()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-y': [{
        'border-y': scaleColor()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-s': [{
        'border-s': scaleColor()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-e': [{
        'border-e': scaleColor()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-t': [{
        'border-t': scaleColor()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-r': [{
        'border-r': scaleColor()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-b': [{
        'border-b': scaleColor()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      'border-color-l': [{
        'border-l': scaleColor()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      'divide-color': [{
        divide: scaleColor()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      'outline-style': [{
        outline: [...scaleLineStyle(), 'none', 'hidden']
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      'outline-offset': [{
        'outline-offset': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      'outline-w': [{
        outline: ['', isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      'outline-color': [{
        outline: scaleColor()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
        // Deprecated since Tailwind CSS v4.0.0
        '', 'none', themeShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      'shadow-color': [{
        shadow: scaleColor()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      'inset-shadow': [{
        'inset-shadow': ['none', themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      'inset-shadow-color': [{
        'inset-shadow': scaleColor()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      'ring-w': [{
        ring: scaleBorderWidth()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      'ring-w-inset': ['ring-inset'],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      'ring-color': [{
        ring: scaleColor()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      'ring-offset-w': [{
        'ring-offset': [isNumber, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      'ring-offset-color': [{
        'ring-offset': scaleColor()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      'inset-ring-w': [{
        'inset-ring': scaleBorderWidth()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      'inset-ring-color': [{
        'inset-ring': scaleColor()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      'text-shadow': [{
        'text-shadow': ['none', themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      'text-shadow-color': [{
        'text-shadow': scaleColor()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      'mix-blend': [{
        'mix-blend': [...scaleBlendMode(), 'plus-darker', 'plus-lighter']
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      'bg-blend': [{
        'bg-blend': scaleBlendMode()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      'mask-clip': [{
        'mask-clip': ['border', 'padding', 'content', 'fill', 'stroke', 'view']
      }, 'mask-no-clip'],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      'mask-composite': [{
        mask: ['add', 'subtract', 'intersect', 'exclude']
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      'mask-image-linear-pos': [{
        'mask-linear': [isNumber]
      }],
      'mask-image-linear-from-pos': [{
        'mask-linear-from': scaleMaskImagePosition()
      }],
      'mask-image-linear-to-pos': [{
        'mask-linear-to': scaleMaskImagePosition()
      }],
      'mask-image-linear-from-color': [{
        'mask-linear-from': scaleColor()
      }],
      'mask-image-linear-to-color': [{
        'mask-linear-to': scaleColor()
      }],
      'mask-image-t-from-pos': [{
        'mask-t-from': scaleMaskImagePosition()
      }],
      'mask-image-t-to-pos': [{
        'mask-t-to': scaleMaskImagePosition()
      }],
      'mask-image-t-from-color': [{
        'mask-t-from': scaleColor()
      }],
      'mask-image-t-to-color': [{
        'mask-t-to': scaleColor()
      }],
      'mask-image-r-from-pos': [{
        'mask-r-from': scaleMaskImagePosition()
      }],
      'mask-image-r-to-pos': [{
        'mask-r-to': scaleMaskImagePosition()
      }],
      'mask-image-r-from-color': [{
        'mask-r-from': scaleColor()
      }],
      'mask-image-r-to-color': [{
        'mask-r-to': scaleColor()
      }],
      'mask-image-b-from-pos': [{
        'mask-b-from': scaleMaskImagePosition()
      }],
      'mask-image-b-to-pos': [{
        'mask-b-to': scaleMaskImagePosition()
      }],
      'mask-image-b-from-color': [{
        'mask-b-from': scaleColor()
      }],
      'mask-image-b-to-color': [{
        'mask-b-to': scaleColor()
      }],
      'mask-image-l-from-pos': [{
        'mask-l-from': scaleMaskImagePosition()
      }],
      'mask-image-l-to-pos': [{
        'mask-l-to': scaleMaskImagePosition()
      }],
      'mask-image-l-from-color': [{
        'mask-l-from': scaleColor()
      }],
      'mask-image-l-to-color': [{
        'mask-l-to': scaleColor()
      }],
      'mask-image-x-from-pos': [{
        'mask-x-from': scaleMaskImagePosition()
      }],
      'mask-image-x-to-pos': [{
        'mask-x-to': scaleMaskImagePosition()
      }],
      'mask-image-x-from-color': [{
        'mask-x-from': scaleColor()
      }],
      'mask-image-x-to-color': [{
        'mask-x-to': scaleColor()
      }],
      'mask-image-y-from-pos': [{
        'mask-y-from': scaleMaskImagePosition()
      }],
      'mask-image-y-to-pos': [{
        'mask-y-to': scaleMaskImagePosition()
      }],
      'mask-image-y-from-color': [{
        'mask-y-from': scaleColor()
      }],
      'mask-image-y-to-color': [{
        'mask-y-to': scaleColor()
      }],
      'mask-image-radial': [{
        'mask-radial': [isArbitraryVariable, isArbitraryValue]
      }],
      'mask-image-radial-from-pos': [{
        'mask-radial-from': scaleMaskImagePosition()
      }],
      'mask-image-radial-to-pos': [{
        'mask-radial-to': scaleMaskImagePosition()
      }],
      'mask-image-radial-from-color': [{
        'mask-radial-from': scaleColor()
      }],
      'mask-image-radial-to-color': [{
        'mask-radial-to': scaleColor()
      }],
      'mask-image-radial-shape': [{
        'mask-radial': ['circle', 'ellipse']
      }],
      'mask-image-radial-size': [{
        'mask-radial': [{
          closest: ['side', 'corner'],
          farthest: ['side', 'corner']
        }]
      }],
      'mask-image-radial-pos': [{
        'mask-radial-at': scalePosition()
      }],
      'mask-image-conic-pos': [{
        'mask-conic': [isNumber]
      }],
      'mask-image-conic-from-pos': [{
        'mask-conic-from': scaleMaskImagePosition()
      }],
      'mask-image-conic-to-pos': [{
        'mask-conic-to': scaleMaskImagePosition()
      }],
      'mask-image-conic-from-color': [{
        'mask-conic-from': scaleColor()
      }],
      'mask-image-conic-to-color': [{
        'mask-conic-to': scaleColor()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      'mask-mode': [{
        mask: ['alpha', 'luminance', 'match']
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      'mask-origin': [{
        'mask-origin': ['border', 'padding', 'content', 'fill', 'stroke', 'view']
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      'mask-position': [{
        mask: scaleBgPosition()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      'mask-repeat': [{
        mask: scaleBgRepeat()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      'mask-size': [{
        mask: scaleBgSize()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      'mask-type': [{
        'mask-type': ['alpha', 'luminance']
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      'mask-image': [{
        mask: ['none', isArbitraryVariable, isArbitraryValue]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
        // Deprecated since Tailwind CSS v3.0.0
        '', 'none', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: scaleBlur()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      'drop-shadow': [{
        'drop-shadow': [
        // Deprecated since Tailwind CSS v4.0.0
        '', 'none', themeDropShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      'drop-shadow-color': [{
        'drop-shadow': scaleColor()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      'hue-rotate': [{
        'hue-rotate': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      'backdrop-filter': [{
        'backdrop-filter': [
        // Deprecated since Tailwind CSS v3.0.0
        '', 'none', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      'backdrop-blur': [{
        'backdrop-blur': scaleBlur()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      'backdrop-brightness': [{
        'backdrop-brightness': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      'backdrop-contrast': [{
        'backdrop-contrast': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      'backdrop-grayscale': [{
        'backdrop-grayscale': ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      'backdrop-hue-rotate': [{
        'backdrop-hue-rotate': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      'backdrop-invert': [{
        'backdrop-invert': ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      'backdrop-opacity': [{
        'backdrop-opacity': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      'backdrop-saturate': [{
        'backdrop-saturate': [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      'backdrop-sepia': [{
        'backdrop-sepia': ['', isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      'border-collapse': [{
        border: ['collapse', 'separate']
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing': [{
        'border-spacing': scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-x': [{
        'border-spacing-x': scaleUnambiguousSpacing()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      'border-spacing-y': [{
        'border-spacing-y': scaleUnambiguousSpacing()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      'table-layout': [{
        table: ['auto', 'fixed']
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ['top', 'bottom']
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ['', 'all', 'colors', 'opacity', 'shadow', 'transform', 'none', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      'transition-behavior': [{
        transition: ['normal', 'discrete']
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [isNumber, 'initial', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ['linear', 'initial', themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ['none', themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ['hidden', 'visible']
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      'perspective-origin': [{
        'perspective-origin': scalePositionWithArbitrary()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: scaleRotate()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      'rotate-x': [{
        'rotate-x': scaleRotate()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      'rotate-y': [{
        'rotate-y': scaleRotate()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      'rotate-z': [{
        'rotate-z': scaleRotate()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: scaleScale()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-x': [{
        'scale-x': scaleScale()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-y': [{
        'scale-y': scaleScale()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-z': [{
        'scale-z': scaleScale()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      'scale-3d': ['scale-3d'],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: scaleSkew()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-x': [{
        'skew-x': scaleSkew()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      'skew-y': [{
        'skew-y': scaleSkew()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, '', 'none', 'gpu', 'cpu']
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      'transform-origin': [{
        origin: scalePositionWithArbitrary()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      'transform-style': [{
        transform: ['3d', 'flat']
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: scaleTranslate()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-x': [{
        'translate-x': scaleTranslate()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-y': [{
        'translate-y': scaleTranslate()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-z': [{
        'translate-z': scaleTranslate()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      'translate-none': ['translate-none'],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: scaleColor()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ['none', 'auto']
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      'caret-color': [{
        caret: scaleColor()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      'color-scheme': [{
        scheme: ['normal', 'dark', 'light', 'light-dark', 'only-dark', 'only-light']
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out', isArbitraryVariable, isArbitraryValue]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      'field-sizing': [{
        'field-sizing': ['fixed', 'content']
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      'pointer-events': [{
        'pointer-events': ['auto', 'none']
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ['none', '', 'y', 'x']
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      'scroll-behavior': [{
        scroll: ['auto', 'smooth']
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-m': [{
        'scroll-m': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mx': [{
        'scroll-mx': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-my': [{
        'scroll-my': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ms': [{
        'scroll-ms': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-me': [{
        'scroll-me': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mt': [{
        'scroll-mt': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mr': [{
        'scroll-mr': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-mb': [{
        'scroll-mb': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      'scroll-ml': [{
        'scroll-ml': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-p': [{
        'scroll-p': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-px': [{
        'scroll-px': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-py': [{
        'scroll-py': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-ps': [{
        'scroll-ps': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pe': [{
        'scroll-pe': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pt': [{
        'scroll-pt': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pr': [{
        'scroll-pr': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pb': [{
        'scroll-pb': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      'scroll-pl': [{
        'scroll-pl': scaleUnambiguousSpacing()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      'snap-align': [{
        snap: ['start', 'end', 'center', 'align-none']
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      'snap-stop': [{
        snap: ['normal', 'always']
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-type': [{
        snap: ['none', 'x', 'y', 'both']
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      'snap-strictness': [{
        snap: ['mandatory', 'proximity']
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ['auto', 'none', 'manipulation']
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-x': [{
        'touch-pan': ['x', 'left', 'right']
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-y': [{
        'touch-pan': ['y', 'up', 'down']
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      'touch-pz': ['touch-pinch-zoom'],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ['none', 'text', 'all', 'auto']
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      'will-change': [{
        'will-change': ['auto', 'scroll', 'contents', 'transform', isArbitraryVariable, isArbitraryValue]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ['none', ...scaleColor()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      'stroke-w': [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ['none', ...scaleColor()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      'forced-color-adjust': [{
        'forced-color-adjust': ['auto', 'none']
      }]
    },
    conflictingClassGroups: {
      overflow: ['overflow-x', 'overflow-y'],
      overscroll: ['overscroll-x', 'overscroll-y'],
      inset: ['inset-x', 'inset-y', 'start', 'end', 'top', 'right', 'bottom', 'left'],
      'inset-x': ['right', 'left'],
      'inset-y': ['top', 'bottom'],
      flex: ['basis', 'grow', 'shrink'],
      gap: ['gap-x', 'gap-y'],
      p: ['px', 'py', 'ps', 'pe', 'pt', 'pr', 'pb', 'pl'],
      px: ['pr', 'pl'],
      py: ['pt', 'pb'],
      m: ['mx', 'my', 'ms', 'me', 'mt', 'mr', 'mb', 'ml'],
      mx: ['mr', 'ml'],
      my: ['mt', 'mb'],
      size: ['w', 'h'],
      'font-size': ['leading'],
      'fvn-normal': ['fvn-ordinal', 'fvn-slashed-zero', 'fvn-figure', 'fvn-spacing', 'fvn-fraction'],
      'fvn-ordinal': ['fvn-normal'],
      'fvn-slashed-zero': ['fvn-normal'],
      'fvn-figure': ['fvn-normal'],
      'fvn-spacing': ['fvn-normal'],
      'fvn-fraction': ['fvn-normal'],
      'line-clamp': ['display', 'overflow'],
      rounded: ['rounded-s', 'rounded-e', 'rounded-t', 'rounded-r', 'rounded-b', 'rounded-l', 'rounded-ss', 'rounded-se', 'rounded-ee', 'rounded-es', 'rounded-tl', 'rounded-tr', 'rounded-br', 'rounded-bl'],
      'rounded-s': ['rounded-ss', 'rounded-es'],
      'rounded-e': ['rounded-se', 'rounded-ee'],
      'rounded-t': ['rounded-tl', 'rounded-tr'],
      'rounded-r': ['rounded-tr', 'rounded-br'],
      'rounded-b': ['rounded-br', 'rounded-bl'],
      'rounded-l': ['rounded-tl', 'rounded-bl'],
      'border-spacing': ['border-spacing-x', 'border-spacing-y'],
      'border-w': ['border-w-x', 'border-w-y', 'border-w-s', 'border-w-e', 'border-w-t', 'border-w-r', 'border-w-b', 'border-w-l'],
      'border-w-x': ['border-w-r', 'border-w-l'],
      'border-w-y': ['border-w-t', 'border-w-b'],
      'border-color': ['border-color-x', 'border-color-y', 'border-color-s', 'border-color-e', 'border-color-t', 'border-color-r', 'border-color-b', 'border-color-l'],
      'border-color-x': ['border-color-r', 'border-color-l'],
      'border-color-y': ['border-color-t', 'border-color-b'],
      translate: ['translate-x', 'translate-y', 'translate-none'],
      'translate-none': ['translate', 'translate-x', 'translate-y', 'translate-z'],
      'scroll-m': ['scroll-mx', 'scroll-my', 'scroll-ms', 'scroll-me', 'scroll-mt', 'scroll-mr', 'scroll-mb', 'scroll-ml'],
      'scroll-mx': ['scroll-mr', 'scroll-ml'],
      'scroll-my': ['scroll-mt', 'scroll-mb'],
      'scroll-p': ['scroll-px', 'scroll-py', 'scroll-ps', 'scroll-pe', 'scroll-pt', 'scroll-pr', 'scroll-pb', 'scroll-pl'],
      'scroll-px': ['scroll-pr', 'scroll-pl'],
      'scroll-py': ['scroll-pt', 'scroll-pb'],
      touch: ['touch-x', 'touch-y', 'touch-pz'],
      'touch-x': ['touch'],
      'touch-y': ['touch'],
      'touch-pz': ['touch']
    },
    conflictingClassGroupModifiers: {
      'font-size': ['leading']
    },
    orderSensitiveModifiers: ['*', '**', 'after', 'backdrop', 'before', 'details-content', 'file', 'first-letter', 'first-line', 'marker', 'placeholder', 'selection']
  };
};
const twMerge = /*#__PURE__*/createTailwindMerge(getDefaultConfig);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button$1 = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button$1.displayName = "Button";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(TooltipPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  TooltipPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

const TooltipIconButton = forwardRef(
  ({ children, tooltip, side = "bottom", className, ...rest }, ref) => {
    return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button$1, { variant: "ghost", size: "icon", ...rest, className: cn("size-6 p-1", className), ref, children: [
        children,
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: tooltip })
      ] }) }),
      /* @__PURE__ */ jsx(TooltipContent, { side, children: tooltip })
    ] }) });
  }
);
TooltipIconButton.displayName = "TooltipIconButton";

const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AvatarPrimitive.Image, { ref, className: cn("aspect-square h-full w-full", className), ...props }));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const SyntaxHighlighter$3 = makePrismAsyncSyntaxHighlighter({
  style: coldarkDark,
  customStyle: {
    margin: 0,
    backgroundColor: "black"
  }
});
const MarkdownTextImpl = () => {
  return /* @__PURE__ */ jsx(MarkdownTextPrimitive, { remarkPlugins: [remarkGfm], className: "aui-md", components: defaultComponents });
};
const MarkdownText = memo(MarkdownTextImpl);
const CodeHeader = ({ language, code }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard$1();
  const onCopy = () => {
    if (!code || isCopied) return;
    copyToClipboard(code);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      style: {
        background: "hsl(0 0% 100% / 0.06)",
        borderTopRightRadius: "0.5rem",
        borderTopLeftRadius: "0.5rem",
        marginTop: "0.5rem",
        border: "1px solid hsl(0 0% 20.4%)",
        borderBottom: "none"
      },
      className: "flex items-center justify-between gap-4 px-4 py-2 text-sm font-semibold text-white",
      children: [
        /* @__PURE__ */ jsx("span", { className: "lowercase [&>span]:text-xs", children: language }),
        /* @__PURE__ */ jsx(TooltipIconButton, { tooltip: "Copy", onClick: onCopy, children: /* @__PURE__ */ jsxs("span", { className: "grid", children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              style: {
                gridArea: "1/1"
              },
              className: cn("transition-transform", isCopied ? "scale-100" : "scale-0"),
              children: /* @__PURE__ */ jsx(CheckIcon$1, { size: 14 })
            },
            "checkmark"
          ),
          /* @__PURE__ */ jsx(
            "span",
            {
              style: {
                gridArea: "1/1"
              },
              className: cn("transition-transform", isCopied ? "scale-0" : "scale-100"),
              children: /* @__PURE__ */ jsx(CopyIcon, { size: 14 })
            },
            "copy"
          )
        ] }) })
      ]
    }
  );
};
const useCopyToClipboard$1 = ({
  copiedDuration = 1500
} = {}) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = (value) => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), copiedDuration);
    });
  };
  return { isCopied, copyToClipboard };
};
const ImageWithFallback = ({ alt, src, ...rest }) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    setError(false);
  }, [src]);
  return error || !src ? /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: "1.5",
        stroke: "currentColor",
        width: "150",
        height: "150",
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("p", { className: "text-xs italic text-muted-foreground -mt-[0.625rem] mb-[0.625rem]", children: "Image link is broken" })
  ] }) : /* @__PURE__ */ jsx(
    "img",
    {
      src,
      alt,
      ...rest,
      onError: () => {
        setError(true);
      }
    }
  );
};
const defaultComponents = unstable_memoizeMarkdownComponents({
  h1: ({ className, ...props }) => /* @__PURE__ */ jsx(
    "h1",
    {
      className: cn("mb-8 scroll-m-20 text-4xl font-extrabold tracking-tight last:mb-0", className),
      ...props,
      style: {
        marginBottom: "2rem"
      }
    }
  ),
  h2: ({ className, ...props }) => /* @__PURE__ */ jsx(
    "h2",
    {
      className: cn("mb-4 mt-8 scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 last:mb-0", className),
      ...props,
      style: {
        marginBottom: "1rem",
        marginTop: "2rem"
      }
    }
  ),
  h3: ({ className, ...props }) => /* @__PURE__ */ jsx(
    "h3",
    {
      className: cn("scroll-m-20 text-2xl font-semibold tracking-tight first:mt-0 last:mb-0", className),
      ...props,
      style: {
        marginBottom: "1rem",
        marginTop: "1.5rem"
      }
    }
  ),
  h4: ({ className, ...props }) => /* @__PURE__ */ jsx(
    "h4",
    {
      className: cn("scroll-m-20 text-xl font-semibold tracking-tight first:mt-0 last:mb-0", className),
      ...props,
      style: {
        marginBottom: "1rem",
        marginTop: "1.5rem"
      }
    }
  ),
  h5: ({ className, ...props }) => /* @__PURE__ */ jsx(
    "h5",
    {
      className: cn("font-semibold first:mt-0 last:mb-0", className),
      ...props,
      style: {
        marginBottom: "1rem",
        marginTop: "1rem"
      }
    }
  ),
  h6: ({ className, ...props }) => /* @__PURE__ */ jsx(
    "h6",
    {
      className: cn("font-semibold first:mt-0 last:mb-0", className),
      ...props,
      style: {
        marginBottom: "1rem",
        marginTop: "1rem"
      }
    }
  ),
  p: ({ className, ...props }) => /* @__PURE__ */ jsx("p", { className: cn("leading-7 first:mt-0 last:mb-0", className), ...props }),
  a: ({ className, ...props }) => /* @__PURE__ */ jsx("a", { className: cn("text-primary font-medium underline underline-offset-4", className), ...props }),
  blockquote: ({ className, ...props }) => /* @__PURE__ */ jsx("blockquote", { className: cn("border-l-2 pl-6 italic", className), ...props }),
  ul: ({ className, ...props }) => /* @__PURE__ */ jsx("ul", { className: cn("my-5 ml-6 list-disc [&>li]:mt-2", className), ...props }),
  ol: ({ className, ...props }) => /* @__PURE__ */ jsx("ol", { className: cn("my-5 ml-6 list-decimal [&>li]:mt-2", className), ...props }),
  hr: ({ className, ...props }) => /* @__PURE__ */ jsx("hr", { className: cn("my-5 border-b", className), ...props }),
  table: ({ className, ...props }) => /* @__PURE__ */ jsx("table", { className: cn("my-5 w-full border-separate border-spacing-0 overflow-y-auto", className), ...props }),
  th: ({ className, ...props }) => /* @__PURE__ */ jsx(
    "th",
    {
      className: cn(
        "bg-muted px-4 py-2 text-left font-bold first:rounded-tl-lg last:rounded-tr-lg [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      ),
      ...props
    }
  ),
  td: ({ className, ...props }) => /* @__PURE__ */ jsx(
    "td",
    {
      className: cn(
        "border-b border-l px-4 py-2 text-left last:border-r [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      ),
      ...props
    }
  ),
  tr: ({ className, ...props }) => /* @__PURE__ */ jsx(
    "tr",
    {
      className: cn(
        "m-0 border-b p-0 first:border-t [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg",
        className
      ),
      ...props
    }
  ),
  sup: ({ className, ...props }) => /* @__PURE__ */ jsx("sup", { className: cn("[&>a]:text-xs [&>a]:no-underline", className), ...props }),
  pre: ({ className, ...props }) => /* @__PURE__ */ jsx(
    "pre",
    {
      ...props,
      style: {
        borderBottomRightRadius: "0.5rem",
        borderBottomLeftRadius: "0.5rem",
        background: "transparent",
        fontSize: "0.875rem",
        marginBottom: "0.5rem",
        border: "1px solid hsl(0 0% 20.4%)"
      },
      className: cn("overflow-x-auto p-4 text-white", className)
    }
  ),
  code: function Code({ className, ...props }) {
    const isCodeBlock = useIsMarkdownCodeBlock();
    return /* @__PURE__ */ jsxs(
      "pre",
      {
        style: {
          fontSize: "0.875rem",
          display: "inline"
        },
        children: [
          /* @__PURE__ */ jsx(
            "code",
            {
              className: cn(!isCodeBlock && "bg-muted rounded border font-semibold", className),
              ...props,
              style: {
                fontWeight: "400",
                paddingBlock: !isCodeBlock ? "0.1em" : 0,
                paddingInline: !isCodeBlock ? "0.3em" : 0
              }
            }
          ),
          " "
        ]
      }
    );
  },
  CodeHeader,
  SyntaxHighlighter: SyntaxHighlighter$3,
  img: ImageWithFallback
});

const sizes = {
  sm: "[&>svg]:h-icon-sm [&>svg]:w-icon-sm",
  default: "[&>svg]:h-icon-default [&>svg]:w-icon-default",
  lg: "[&>svg]:h-icon-lg [&>svg]:w-icon-lg"
};
const Icon = ({ children, className, size = "default", ...props }) => {
  return /* @__PURE__ */ jsx("span", { className: clsx("block", sizes[size], className), ...props, children });
};

const variantClasses$2 = {
  default: "text-icon3",
  success: "text-accent1",
  error: "text-accent2",
  info: "text-accent3"
};
const Badge$1 = ({ icon, variant = "default", className, children, ...props }) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: clsx(
        "bg-surface4 text-ui-sm gap-md h-badge-default inline-flex items-center rounded-md",
        icon ? "pl-md pr-1.5" : "px-1.5",
        icon || variant === "default" ? "text-icon5" : variantClasses$2[variant],
        className
      ),
      ...props,
      children: [
        icon && /* @__PURE__ */ jsx("span", { className: variantClasses$2[variant], children: /* @__PURE__ */ jsx(Icon, { children: icon }) }),
        children
      ]
    }
  );
};

const AgentIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M8.5 15C10.3565 15 12.137 14.2625 13.4497 12.9497C14.7625 11.637 15.5 9.85652 15.5 8C15.5 6.14348 14.7625 4.36301 13.4497 3.05025C12.137 1.7375 10.3565 1 8.5 1C6.64348 1 4.86301 1.7375 3.55025 3.05025C2.2375 4.36301 1.5 6.14348 1.5 8C1.5 9.85652 2.2375 11.637 3.55025 12.9497C4.86301 14.2625 6.64348 15 8.5 15ZM5.621 10.879L4.611 11.889C3.84179 11.1198 3.31794 10.1398 3.1057 9.07291C2.89346 8.00601 3.00236 6.90013 3.41864 5.89512C3.83491 4.89012 4.53986 4.03112 5.44434 3.42676C6.34881 2.8224 7.41219 2.49983 8.5 2.49983C9.58781 2.49983 10.6512 2.8224 11.5557 3.42676C12.4601 4.03112 13.1651 4.89012 13.5814 5.89512C13.9976 6.90013 14.1065 8.00601 13.8943 9.07291C13.6821 10.1398 13.1582 11.1198 12.389 11.889L11.379 10.879C11.1004 10.6003 10.7696 10.3792 10.4055 10.2284C10.0414 10.0776 9.6511 9.99995 9.257 10H7.743C7.3489 9.99995 6.95865 10.0776 6.59455 10.2284C6.23045 10.3792 5.89963 10.6003 5.621 10.879Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M8.5 4C7.96957 4 7.46086 4.21071 7.08579 4.58579C6.71071 4.96086 6.5 5.46957 6.5 6V6.5C6.5 7.03043 6.71071 7.53914 7.08579 7.91421C7.46086 8.28929 7.96957 8.5 8.5 8.5C9.03043 8.5 9.53914 8.28929 9.91421 7.91421C10.2893 7.53914 10.5 7.03043 10.5 6.5V6C10.5 5.46957 10.2893 4.96086 9.91421 4.58579C9.53914 4.21071 9.03043 4 8.5 4Z",
      fill: "currentColor"
    }
  )
] });

const AgentCoinIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "126", height: "85", viewBox: "0 0 126 85", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M63.0002 0.968262C28.5152 0.968262 0.55957 15.6484 0.55957 33.7573V51.2428C0.55957 69.3517 28.5152 84.0319 63.0002 84.0319C97.4853 84.0319 125.441 69.3517 125.441 51.2428V33.7573C125.441 15.6484 97.4853 0.968262 63.0002 0.968262Z",
      stroke: "#707070"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M119.322 35.1636C119.322 50.3595 94.1055 62.6782 62.9998 62.6782C31.894 62.6782 6.67773 50.3595 6.67773 35.1636V49.8363C6.67773 65.0322 31.894 77.351 62.9998 77.351C94.1055 77.351 119.322 65.0322 119.322 49.8363V35.1636Z",
      fill: "#2E2E2E",
      fillOpacity: "0.9"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M119.322 35.1636C119.322 50.3595 94.1055 62.6782 62.9998 62.6782C31.894 62.6782 6.67773 50.3595 6.67773 35.1636M119.322 35.1636C119.322 19.9677 94.1055 7.64893 62.9998 7.64893C31.894 7.64893 6.67773 19.9677 6.67773 35.1636M119.322 35.1636V49.8363C119.322 65.0322 94.1055 77.351 62.9998 77.351C31.894 77.351 6.67773 65.0322 6.67773 49.8363V35.1636",
      stroke: "#424242"
    }
  ),
  /* @__PURE__ */ jsxs("g", { clipPath: "url(#clip0_21421_19519)", children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M38.5383 47.0955C45.0714 50.3122 53.9322 52.1193 63.1714 52.1193C72.4106 52.1193 81.2714 50.3122 87.8045 47.0955C94.3376 43.8787 98.0078 39.5159 98.0078 34.9668C98.0078 30.4177 94.3376 26.0549 87.8045 22.8381C81.2714 19.6214 72.4106 17.8143 63.1714 17.8143C53.9322 17.8143 45.0714 19.6214 38.5383 22.8381C32.0052 26.0549 28.3349 30.4177 28.3349 34.9668C28.3349 39.5159 32.0052 43.8787 38.5383 47.0955ZM42.9089 34.9668L35.8005 34.9668C35.8004 32.3013 37.4056 29.6956 40.4132 27.4793C43.4207 25.263 47.6956 23.5355 52.6971 22.5154C57.6986 21.4954 63.2022 21.2285 68.5118 21.7485C73.8214 22.2685 78.6986 23.552 82.5266 25.4368C86.3546 27.3216 88.9615 29.723 90.0176 32.3373C91.0737 34.9517 90.5316 37.6614 88.4599 40.1241C86.3881 42.5867 82.8797 44.6915 78.3784 46.1723C73.8771 47.6532 68.585 48.4435 63.1714 48.4435V44.9435C63.1717 43.9778 62.7855 43.0215 62.035 42.1293C61.2845 41.2372 60.1843 40.4265 58.7973 39.7438L53.4695 37.1205C52.0828 36.4376 50.4364 35.8959 48.6244 35.5263C46.8124 35.1568 44.8702 34.9667 42.9089 34.9668Z",
        fill: "#A9A9A9"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M77.2474 28.0361C75.3808 27.1171 72.8492 26.6007 70.2094 26.6007C67.5696 26.6007 65.038 27.1171 63.1714 28.0361L61.4119 28.9025C59.5453 29.8215 58.4966 31.068 58.4966 32.3678C58.4966 33.6676 59.5453 34.9141 61.4119 35.8331C63.2785 36.7522 65.8101 37.2685 68.4499 37.2685C71.0897 37.2685 73.6213 36.7522 75.4879 35.8331L77.2474 34.9668C79.114 34.0477 80.1627 32.8012 80.1627 31.5015C80.1627 30.2017 79.114 28.9552 77.2474 28.0361Z",
        fill: "#A9A9A9"
      }
    )
  ] }),
  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_21421_19519", children: /* @__PURE__ */ jsx(
    "rect",
    {
      width: "62.7591",
      height: "62.7591",
      fill: "white",
      transform: "matrix(0.897148 0.441731 -0.897148 0.441731 63.1714 7.24365)"
    }
  ) }) })
] });

const AiIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M4.31445 3.16083C3.78402 3.16083 3.27531 3.37154 2.90024 3.74661C2.52517 4.12169 2.31445 4.63039 2.31445 5.16083V5.66083C2.31445 6.19126 2.52517 6.69997 2.90024 7.07504C3.27531 7.45011 3.78402 7.66083 4.31445 7.66083C4.84489 7.66083 5.35359 7.45011 5.72867 7.07504C6.10374 6.69997 6.31445 6.19126 6.31445 5.66083V5.16083C6.31445 4.63039 6.10374 4.12169 5.72867 3.74661C5.35359 3.37154 4.84489 3.16083 4.31445 3.16083Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M6.76666 9.50235C6.57678 9.28532 6.30244 9.16083 6.01407 9.16083H4.50201C4.10791 9.16078 3.71766 9.23838 3.35356 9.38921C3.11733 9.48706 2.8951 9.6145 2.69205 9.76806C2.48056 9.928 2.38001 10.1888 2.38001 10.454V13.0642C2.38001 13.6165 2.82773 14.0642 3.38001 14.0642H8.55436C9.4135 14.0642 9.87269 13.0523 9.30695 12.4057L6.76666 9.50235Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M12.0686 2.26107C12.0686 2.17635 11.9999 2.10767 11.9152 2.10767H10.9948C10.91 2.10767 10.8414 2.17635 10.8414 2.26107V3.85184C10.8414 3.95606 10.7397 4.02994 10.6406 3.99773L9.12775 3.50619C9.04718 3.48001 8.96063 3.52411 8.93445 3.60468L8.65003 4.48004C8.62385 4.56062 8.66795 4.64716 8.74852 4.67334L10.2611 5.1648C10.3602 5.19701 10.399 5.31655 10.3378 5.40086L9.40289 6.68765C9.35309 6.75619 9.36829 6.85212 9.43683 6.90192L10.1815 7.44292C10.25 7.49272 10.3459 7.47752 10.3957 7.40898L11.3309 6.12181C11.3922 6.03749 11.5179 6.03749 11.5791 6.12181L12.5143 7.40904C12.5641 7.47758 12.6601 7.49278 12.7286 7.44298L13.4732 6.90198C13.5418 6.85218 13.557 6.75625 13.5072 6.68771L12.5723 5.40091C12.511 5.3166 12.5499 5.19705 12.649 5.16485L14.1615 4.67338C14.2421 4.6472 14.2862 4.56066 14.26 4.48009L13.9756 3.60473C13.9494 3.52415 13.8629 3.48006 13.7823 3.50624L12.2694 3.99782C12.1703 4.03003 12.0686 3.95615 12.0686 3.85193V2.26107Z",
      fill: "currentColor"
    }
  )
] });

const ApiIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M11.0313 7.97578C11.0313 9.34436 9.92183 10.4538 8.55324 10.4538C7.18466 10.4538 6.0752 9.34436 6.0752 7.97578C6.0752 6.60719 7.18466 5.49773 8.55324 5.49773C9.92183 5.49773 11.0313 6.60719 11.0313 7.97578ZM11.0313 7.97578H14.573",
      stroke: "currentColor",
      strokeWidth: "1.33333",
      strokeLinecap: "round"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M12.967 4.46154C11.9273 3.14431 10.3165 2.29883 8.50814 2.29883C5.37277 2.29883 2.83105 4.84055 2.83105 7.97591C2.83105 11.1113 5.37277 13.653 8.50814 13.653C10.3165 13.653 11.9273 12.8075 12.967 11.4903",
      stroke: "currentColor",
      strokeWidth: "1.33333",
      strokeLinecap: "round"
    }
  )
] });

const BranchIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx("circle", { cx: "8.57129", cy: "8.08496", r: "2.27832", stroke: "currentColor" }),
  /* @__PURE__ */ jsx("path", { d: "M5.89692 8.08203H2.45312", stroke: "currentColor" }),
  /* @__PURE__ */ jsx("path", { d: "M14.5454 8.08203H11.1016", stroke: "currentColor" })
] });

const CheckIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M5.99982 2.0625C3.8252 2.0625 2.06232 3.82538 2.06232 6C2.06232 8.17462 3.8252 9.9375 5.99982 9.9375C8.17444 9.9375 9.93732 8.17462 9.93732 6C9.93732 3.82538 8.17444 2.0625 5.99982 2.0625ZM0.937317 6C0.937317 3.20406 3.20388 0.9375 5.99982 0.9375C8.79576 0.9375 11.0623 3.20406 11.0623 6C11.0623 8.79594 8.79576 11.0625 5.99982 11.0625C3.20388 11.0625 0.937317 8.79594 0.937317 6Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M7.97865 4.57004C8.22604 4.75795 8.27426 5.11082 8.08635 5.35821L6.05486 8.03279C5.94873 8.17251 5.78348 8.25471 5.60803 8.25505C5.43257 8.2554 5.267 8.17385 5.16032 8.03454L3.80937 6.27034C3.6205 6.02369 3.66733 5.67063 3.91398 5.48176C4.16063 5.29288 4.51369 5.33972 4.70257 5.58637L5.6051 6.76498L7.19048 4.67774C7.37839 4.43036 7.73126 4.38213 7.97865 4.57004Z",
      fill: "currentColor"
    }
  )
] });

const ChevronIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    d: "M4.60059 6.30005L8.00098 9.70005L11.3996 6.30142",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }
) });

const CommitIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "12", height: "13", viewBox: "0 0 12 13", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M1.46484 7.18262H3.29529C3.55505 8.46829 4.69121 9.43628 6.05347 9.43628C7.41572 9.43628 8.55188 8.46829 8.81165 7.18262L10.534 7.18262C10.8447 7.18262 11.0965 6.93078 11.0965 6.62012C11.0965 6.30946 10.8447 6.05762 10.534 6.05762L8.81075 6.05762C8.54929 4.77414 7.41417 3.80835 6.05347 3.80835C4.69277 3.80835 3.55764 4.77414 3.29618 6.05762H1.46484C1.15418 6.05762 0.902344 6.30946 0.902344 6.62012C0.902344 6.93078 1.15418 7.18262 1.46484 7.18262ZM6.05347 4.93335C5.12068 4.93335 4.3645 5.68952 4.3645 6.62231C4.3645 7.5551 5.12068 8.31128 6.05347 8.31128C6.98626 8.31128 7.74243 7.5551 7.74243 6.62231C7.74243 5.68952 6.98626 4.93335 6.05347 4.93335Z",
    fill: "currentColor"
  }
) });

const CrossIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M5.99982 2.0625C3.8252 2.0625 2.06232 3.82538 2.06232 6C2.06232 8.17462 3.8252 9.9375 5.99982 9.9375C8.17444 9.9375 9.93732 8.17462 9.93732 6C9.93732 3.82538 8.17444 2.0625 5.99982 2.0625ZM0.937317 6C0.937317 3.20406 3.20388 0.9375 5.99982 0.9375C8.79576 0.9375 11.0623 3.20406 11.0623 6C11.0623 8.79594 8.79576 11.0625 5.99982 11.0625C3.20388 11.0625 0.937317 8.79594 0.937317 6Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M7.89741 4.10293C8.11707 4.32261 8.11706 4.67877 7.89738 4.89843L6.79517 6.00058L7.8962 7.10155C8.11588 7.32122 8.11589 7.67737 7.89623 7.89705C7.67656 8.11673 7.32041 8.11674 7.10073 7.89707L5.99965 6.79605L4.89856 7.89707C4.67889 8.11673 4.32273 8.11672 4.10307 7.89704C3.88341 7.67737 3.88342 7.32121 4.10309 7.10155L5.20413 6.00058L4.10191 4.89843C3.88224 4.67877 3.88223 4.32262 4.10189 4.10294C4.32155 3.88326 4.67771 3.88325 4.89738 4.10292L5.99965 5.20511L7.10191 4.10291C7.32159 3.88325 7.67774 3.88326 7.89741 4.10293Z",
      fill: "currentColor"
    }
  )
] });

const DbIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "13", height: "14", viewBox: "0 0 13 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M0.941406 2.831V3.75745C0.941406 4.27885 1.35491 4.76002 2.05273 5.14711C2.10389 5.17549 2.15658 5.20337 2.21074 5.23071C3.23028 5.74546 4.77322 6.07356 6.50007 6.07356C8.31866 6.07356 9.93328 5.70967 10.9474 5.14711C11.6453 4.76002 12.0587 4.27886 12.0587 3.75745V2.831C12.0587 1.55185 9.57003 0.514893 6.50007 0.514893C3.4301 0.514893 0.941406 1.55185 0.941406 2.831ZM1.02052 6.14518C0.968505 6.27247 0.941406 6.40331 0.941406 6.53678V7.46322C0.941406 7.98463 1.35491 8.46579 2.05273 8.85289C3.06686 9.41542 4.68148 9.77933 6.50007 9.77933C8.22692 9.77933 9.76986 9.45128 10.7894 8.93645C10.8436 8.90912 10.8962 8.88124 10.9474 8.85289C11.6453 8.46579 12.0587 7.98462 12.0587 7.46322V6.53678C12.0587 6.40331 12.0316 6.27248 11.9796 6.14519C11.664 6.35469 11.3187 6.53063 10.9652 6.67795C9.75207 7.18337 8.17267 7.46322 6.50007 7.46322C4.82747 7.46322 3.24803 7.18337 2.03502 6.67795C1.68142 6.53063 1.3362 6.35469 1.02052 6.14518ZM1.02052 9.85095C0.968505 9.97824 0.941406 10.1091 0.941406 10.2426V11.169C0.941406 12.4481 3.4301 13.4851 6.50007 13.4851C9.57003 13.4851 12.0587 12.4481 12.0587 11.169V10.2426C12.0587 10.1091 12.0316 9.97824 11.9796 9.85095C11.664 10.0605 11.3187 10.2364 10.9652 10.3837C9.75207 10.8891 8.17267 11.169 6.50007 11.169C4.82747 11.169 3.24803 10.8891 2.03502 10.3837C1.68142 10.2364 1.3362 10.0605 1.02052 9.85095Z",
    fill: "currentColor"
  }
) });

const DebugIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    d: "M6.14934 2.26085C5.88284 2.57794 5.92385 3.05104 6.24094 3.31754L7.05702 4.00343C6.51911 4.24774 6.05679 4.62747 5.72304 5.10093L4.31451 3.91711C3.99742 3.65061 3.52432 3.69162 3.25781 4.00871C2.99131 4.3258 3.03232 4.7989 3.34941 5.06541L5.1711 6.59647C5.16257 6.69009 5.1582 6.78504 5.1582 6.88115V8.02254H3.36523C2.95102 8.02254 2.61523 8.35833 2.61523 8.77254C2.61523 9.18675 2.95102 9.52254 3.36523 9.52254H5.1582V11.0692L3.38248 12.7049C3.07782 12.9856 3.05836 13.4601 3.339 13.7647C3.61965 14.0694 4.09412 14.0888 4.39877 13.8082L10.2843 8.38652V10.5302C10.2843 11.4231 9.5099 12.2129 8.47123 12.2129C8.28703 12.2129 8.11062 12.1876 7.94518 12.1411C7.54642 12.029 7.13229 12.2614 7.02021 12.6601C6.90812 13.0589 7.14051 13.473 7.53927 13.5851C7.83596 13.6685 8.14892 13.7129 8.47123 13.7129C9.71498 13.7129 10.8279 13.0443 11.3927 12.0355L13.0897 13.4618C13.4068 13.7283 13.8799 13.6873 14.1464 13.3702C14.4129 13.0531 14.3719 12.58 14.0548 12.3135L11.7843 10.4052V9.52254H13.634C14.0482 9.52254 14.384 9.18675 14.384 8.77254C14.384 8.35833 14.0482 8.02254 13.634 8.02254H11.7843V7.00473L13.9182 5.039C14.2228 4.75836 14.2423 4.28389 13.9616 3.97923C13.681 3.67458 13.2065 3.65512 12.9019 3.93576L6.6582 9.68737V6.88115C6.6582 5.98821 7.43256 5.19844 8.47123 5.19844L8.4789 5.19846L8.50782 5.22276L8.53124 5.19934C8.72739 5.20523 8.91424 5.23987 9.08781 5.29818C9.48045 5.43009 9.90569 5.21873 10.0376 4.82608C10.146 4.50351 10.0227 4.15895 9.75749 3.97309L10.4258 3.30474C10.7187 3.01185 10.7187 2.53698 10.4258 2.24408C10.1329 1.95119 9.65807 1.95119 9.36518 2.24408L8.41985 3.18941L7.20604 2.16925C6.88895 1.90274 6.41585 1.94375 6.14934 2.26085Z",
    fill: "currentColor"
  }
) });

const DeploymentIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "13", height: "14", viewBox: "0 0 13 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M6.83531 7.0062C6.64515 7.35069 6.15 7.35069 5.95984 7.0062L2.99029 1.62664C2.7855 1.25565 3.10614 0.814077 3.5223 0.893977L6.30195 1.42765C6.36421 1.43961 6.42818 1.43961 6.49044 1.42766L9.27301 0.893806C9.68915 0.813965 10.0097 1.25552 9.80495 1.62648L6.83531 7.0062Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M4.77553 6.93249C4.70399 6.80288 4.52254 6.79459 4.4558 6.92674C4.30167 7.23196 4.21484 7.57697 4.21484 7.94226C4.21484 9.18814 5.22483 10.1981 6.4707 10.1981C7.71658 10.1981 8.72656 9.18814 8.72656 7.94226C8.72656 7.51818 8.60954 7.12143 8.40603 6.78254C8.33262 6.66031 8.15949 6.67411 8.09059 6.79894L7.70941 7.48947C7.13892 8.52294 5.65347 8.52293 5.08299 7.48947L4.77553 6.93249ZM5.56313 5.8764C5.46196 5.92091 5.42707 6.04354 5.48048 6.1403L5.95846 7.0062C6.14862 7.35069 6.64377 7.35069 6.83393 7.0062L7.33905 6.09115C7.39467 5.99039 7.35417 5.86275 7.2461 5.8232C7.00431 5.7347 6.74315 5.6864 6.4707 5.6864C6.14785 5.6864 5.84083 5.75423 5.56313 5.8764Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M4.01974 3.49407C4.17993 3.78426 4.54405 3.88541 4.85312 3.76562C5.35484 3.57118 5.90031 3.46453 6.4707 3.46453C7.0005 3.46453 7.50881 3.55654 7.98052 3.72545C8.28711 3.83523 8.64168 3.73133 8.79906 3.44623C8.96234 3.15043 8.85109 2.77497 8.5364 2.652C7.89621 2.40184 7.19949 2.26453 6.4707 2.26453C5.69013 2.26453 4.94634 2.42205 4.2694 2.70703C3.96395 2.83562 3.85958 3.20392 4.01974 3.49407ZM9.9461 4.47216C9.81565 4.70848 9.85645 4.99948 10.0211 5.21339C10.6026 5.96887 10.9484 6.91518 10.9484 7.94226C10.9484 10.4152 8.94369 12.42 6.4707 12.42C3.99772 12.42 1.99297 10.4152 1.99297 7.94226C1.99297 6.96004 2.30923 6.05168 2.84547 5.31345C3.0006 5.09989 3.03605 4.81591 2.90848 4.58482C2.70986 4.22501 2.22216 4.15342 1.97124 4.47893C1.2324 5.43738 0.792968 6.6385 0.792968 7.94226C0.792969 11.078 3.33498 13.62 6.4707 13.62C9.60643 13.62 12.1484 11.078 12.1484 7.94226C12.1484 6.58193 11.67 5.33333 10.8723 4.35553C10.6173 4.04298 10.141 4.11901 9.9461 4.47216Z",
      fill: "currentColor"
    }
  )
] });

const DividerIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx("path", { d: "M8.5 3V13", stroke: "currentColor", strokeWidth: "0.5" }) });

const DocsIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M5.1747 3.18598L7.02554 1.95209C7.11557 1.89207 7.31087 1.87106 7.41016 1.90924L12.4139 3.83377C12.4683 3.85467 12.546 3.96798 12.546 4.03118V13.0167C12.546 13.265 12.7473 13.4663 12.9956 13.4663C13.2439 13.4663 13.4452 13.265 13.4452 13.0167V4.03118C13.4452 3.59605 13.1384 3.14906 12.7367 2.99456L7.73293 1.07004C7.36225 0.927472 6.86056 0.981451 6.52679 1.20396L4.20445 2.75219L3.90419 2.95236L3.90647 2.95824C3.69329 3.05449 3.55469 3.27599 3.55469 3.57581V11.7119C3.55469 12.2084 3.93067 12.7499 4.39251 12.9206L9.89804 14.955C10.3608 15.126 10.7359 14.8596 10.7359 14.3659V5.83295C10.7359 5.33662 10.3498 4.81289 9.88389 4.66643L5.1747 3.18598Z",
    fill: "currentColor"
  }
) });

const EnvIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx("rect", { x: "2.74902", y: "1.89307", width: "11.8252", height: "11.8252", rx: "1.5", stroke: "currentColor" }),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M5.74512 5.43539L8.13964 7.83011L5.86867 10.1011M9.32711 10.1753H11.7465",
      stroke: "currentColor",
      strokeLinecap: "round"
    }
  )
] });

const EvaluatorCoinIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "126", height: "85", viewBox: "0 0 126 85", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M119.322 35.1636C119.322 50.3595 94.1055 62.6782 62.9998 62.6782C31.894 62.6782 6.67773 50.3595 6.67773 35.1636V49.8363C6.67773 65.0322 31.894 77.351 62.9998 77.351C94.1055 77.351 119.322 65.0322 119.322 49.8363V35.1636Z",
      fill: "#2E2E2E",
      fillOpacity: "0.9"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M119.322 35.1636C119.322 50.3595 94.1055 62.6782 62.9998 62.6782C31.894 62.6782 6.67773 50.3595 6.67773 35.1636M119.322 35.1636C119.322 19.9677 94.1055 7.64893 62.9998 7.64893C31.894 7.64893 6.67773 19.9677 6.67773 35.1636M119.322 35.1636V49.8363C119.322 65.0322 94.1055 77.351 62.9998 77.351C31.894 77.351 6.67773 65.0322 6.67773 49.8363V35.1636",
      stroke: "#424242"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M63.0002 0.968262C28.5152 0.968262 0.55957 15.6484 0.55957 33.7573V51.2428C0.55957 69.3517 28.5152 84.0319 63.0002 84.0319C97.4853 84.0319 125.441 69.3517 125.441 51.2428V33.7573C125.441 15.6484 97.4853 0.968262 63.0002 0.968262Z",
      stroke: "#707070"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M29.7417 32.3666L33.2608 30.6339C34.6607 29.9446 36.5594 29.5574 38.5393 29.5574C40.5191 29.5574 42.4178 29.9446 43.8178 30.6339C45.2177 31.3232 46.0042 32.2581 46.0042 33.2329C46.0042 34.2077 45.2177 35.1426 43.8178 35.8319L40.2988 37.5646C38.8988 38.2539 37.0001 38.6411 35.0203 38.6411C33.0404 38.6411 31.1417 38.2539 29.7417 37.5646C28.3418 36.8753 27.5553 35.9404 27.5553 34.9656C27.5553 33.9908 28.3418 33.0559 29.7417 32.3666ZM43.8178 39.2972L56.1343 33.2329C57.5343 32.5436 59.433 32.1564 61.4129 32.1564C63.3927 32.1564 65.2914 32.5436 66.6914 33.2329C68.0913 33.9222 68.8778 34.8571 68.8778 35.8319C68.8778 36.8067 68.0913 37.7416 66.6914 38.4309L54.3748 44.4952C52.9749 45.1845 51.0761 45.5718 49.0963 45.5718C47.1165 45.5718 45.2177 45.1845 43.8178 44.4952C42.4178 43.8059 41.6314 42.8711 41.6314 41.8962C41.6314 40.9214 42.4178 39.9865 43.8178 39.2972ZM57.8938 46.2279L86.0459 32.3666C87.4459 31.6773 89.3446 31.29 91.3245 31.29C93.3043 31.29 95.203 31.6773 96.603 32.3666C98.0029 33.0559 98.7894 33.9908 98.7894 34.9656C98.7894 35.9404 98.0029 36.8753 96.603 37.5646L68.4509 51.4259C67.0509 52.1152 65.1522 52.5024 63.1724 52.5024C61.1925 52.5024 59.2938 52.1152 57.8938 51.4259C56.4939 50.7366 55.7074 49.8017 55.7074 48.8269C55.7074 47.8521 56.4939 46.9172 57.8938 46.2279Z",
      fill: "#A9A9A9"
    }
  )
] });

const FiltersIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.00001 12.5C6.00001 11.948 6.44401 11.5 7.00001 11.5H10C10.552 11.5 11 11.944 11 12.5C11 13.052 10.556 13.5 10 13.5H7.00001C6.44801 13.5 6.00001 13.056 6.00001 12.5ZM4.00001 8.5C4.00001 7.948 4.44601 7.5 4.99801 7.5H12.002C12.553 7.5 13 7.944 13 8.5C13 9.052 12.554 9.5 12.002 9.5H4.99801C4.86671 9.50026 4.73665 9.47457 4.61531 9.42438C4.49398 9.37419 4.38377 9.30051 4.29102 9.20757C4.19827 9.11464 4.12481 9.00428 4.07486 8.88284C4.02492 8.76141 3.99948 8.6313 4.00001 8.5ZM1.50001 4C1.50001 3.172 2.17501 2.5 2.99801 2.5H14.002C14.829 2.5 15.5 3.166 15.5 4C15.5 4.828 14.825 5.5 14.002 5.5H2.99801C2.80101 5.5004 2.60587 5.46185 2.42382 5.38659C2.24176 5.31132 2.07638 5.20082 1.93717 5.06142C1.79796 4.92203 1.68768 4.7565 1.61265 4.57434C1.53763 4.39219 1.49935 4.197 1.50001 4Z",
    fill: "currentColor"
  }
) });

const GithubCoinIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "127", height: "86", viewBox: "0 0 127 86", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M63.9116 1.87891C29.4266 1.87891 1.47095 16.5591 1.47095 34.668V52.1534C1.47095 70.2623 29.4266 84.9425 63.9116 84.9425C98.3967 84.9425 126.352 70.2623 126.352 52.1534V34.668C126.352 16.5591 98.3967 1.87891 63.9116 1.87891Z",
      stroke: "#707070"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M120.233 36.0742C120.233 51.2701 95.0169 63.5889 63.9111 63.5889C32.8053 63.5889 7.58911 51.2701 7.58911 36.0742V50.7469C7.58911 65.9429 32.8053 78.2616 63.9111 78.2616C95.0169 78.2616 120.233 65.9429 120.233 50.7469V36.0742Z",
      fill: "#2E2E2E",
      fillOpacity: "0.9"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M120.233 36.0742C120.233 51.2701 95.0169 63.5889 63.9111 63.5889C32.8053 63.5889 7.58911 51.2701 7.58911 36.0742M120.233 36.0742C120.233 20.8783 95.0169 8.55957 63.9111 8.55957C32.8053 8.55957 7.58911 20.8783 7.58911 36.0742M120.233 36.0742V50.7469C120.233 65.9429 95.0169 78.2616 63.9111 78.2616C32.8053 78.2616 7.58911 65.9429 7.58911 50.7469V36.0742",
      stroke: "#424242"
    }
  ),
  /* @__PURE__ */ jsx("g", { clipPath: "url(#clip0_21999_20545)", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M86.4812 24.847C73.5239 18.4672 52.5342 18.4672 39.5769 24.847C29.1993 29.9566 27.1473 37.5778 33.3621 43.6978C34.3295 44.3762 35.4728 44.2463 36.0884 43.9432C36.6454 43.6689 38.4629 42.7452 40.4271 41.7781C33.45 39.4109 34.4468 37.419 35.2969 36.5385C35.7073 36.0766 36.6454 34.4889 36.2057 33.7239C35.8246 33.1032 35.7366 31.9918 37.7301 32.9445C39.6062 33.8394 39.1958 35.3405 38.932 35.9034C37.4955 38.6892 41.8635 39.8584 43.8276 40.2192C45.5572 39.5697 47.1989 39.3676 48.4594 39.4109C43.8276 36.553 40.3977 32.8723 49.3682 28.4555C51.9186 27.1997 54.9381 26.6079 58.0748 26.5358C58.4266 26.1316 60.0096 24.5439 64.5241 23.5912C64.5241 23.5912 67.1039 24.2552 68.5696 27.9503C70.9735 28.6143 73.2307 29.4659 75.2242 30.4474C77.2176 31.4289 78.9472 32.5403 80.2957 33.7239C87.8297 34.4312 89.1489 35.7158 89.1489 35.7158C87.2141 37.9386 83.9894 38.7181 83.1686 38.8913C83.022 40.4357 81.8494 41.908 79.2697 43.1782C70.2699 47.6094 62.7945 45.8918 56.9901 43.6112C57.1074 44.3906 56.4331 45.4443 54.2345 46.5269C51.0978 48.0713 48.5474 49.2982 47.7558 49.6879C47.1402 49.991 46.8471 50.5684 48.2542 51.0303C54.4816 52.5487 61.5193 53.0674 68.3768 52.5133C75.2342 51.9592 81.5661 50.3602 86.4812 47.9414C99.4385 41.5616 99.4385 31.2268 86.4812 24.847Z",
      fill: "#A9A9A9"
    }
  ) }),
  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_21999_20545", children: /* @__PURE__ */ jsx(
    "rect",
    {
      width: "62.7591",
      height: "62.7591",
      fill: "white",
      transform: "matrix(0.897148 0.441731 -0.897148 0.441731 64.0828 8.1543)"
    }
  ) }) })
] });

const GithubIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx("g", { clipPath: "url(#clip0_21999_22095)", children: /* @__PURE__ */ jsx(
    "path",
    {
      d: "M7.5 0.75C3.6325 0.75 0.5 3.8825 0.5 7.75C0.5 10.8475 2.50375 13.4637 5.28625 14.3912C5.63625 14.4525 5.7675 14.2425 5.7675 14.0587C5.7675 13.8925 5.75875 13.3412 5.75875 12.755C4 13.0787 3.545 12.3262 3.405 11.9325C3.32625 11.7312 2.985 11.11 2.6875 10.9437C2.4425 10.8125 2.0925 10.4887 2.67875 10.48C3.23 10.4712 3.62375 10.9875 3.755 11.1975C4.385 12.2562 5.39125 11.9587 5.79375 11.775C5.855 11.32 6.03875 11.0137 6.24 10.8387C4.6825 10.6637 3.055 10.06 3.055 7.3825C3.055 6.62125 3.32625 5.99125 3.7725 5.50125C3.7025 5.32625 3.4575 4.60875 3.8425 3.64625C3.8425 3.64625 4.42875 3.4625 5.7675 4.36375C6.3275 4.20625 6.9225 4.1275 7.5175 4.1275C8.1125 4.1275 8.7075 4.20625 9.2675 4.36375C10.6062 3.45375 11.1925 3.64625 11.1925 3.64625C11.5775 4.60875 11.3325 5.32625 11.2625 5.50125C11.7087 5.99125 11.98 6.6125 11.98 7.3825C11.98 10.0687 10.3438 10.6637 8.78625 10.8387C9.04 11.0575 9.25875 11.4775 9.25875 12.1337C9.25875 13.07 9.25 13.8225 9.25 14.0587C9.25 14.2425 9.38125 14.4612 9.73125 14.3912C11.1209 13.9221 12.3284 13.029 13.1839 11.8377C14.0393 10.6463 14.4996 9.21668 14.5 7.75C14.5 3.8825 11.3675 0.75 7.5 0.75Z",
      fill: "currentColor"
    }
  ) }),
  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_21999_22095", children: /* @__PURE__ */ jsx("rect", { width: "14", height: "14", fill: "currentColor", transform: "translate(0.5 0.75)" }) }) })
] });

const GoogleIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "15", height: "15", viewBox: "0 0 15 15", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsxs("g", { clipPath: "url(#clip0_21999_20513)", children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M13.5037 7.54867C13.5037 7.1144 13.4648 6.69683 13.3924 6.29596H7.62436V8.66776H10.9204C10.7756 9.43052 10.3413 10.0764 9.68994 10.5106V12.0529H11.6776C12.8356 10.9839 13.5037 9.41382 13.5037 7.54867Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M7.62415 13.5339C9.27773 13.5339 10.6643 12.9882 11.6776 12.0529L9.68994 10.5106C9.14431 10.8781 8.44816 11.1009 7.62415 11.1009C6.03182 11.1009 4.67889 10.0263 4.19451 8.57877H2.15677V10.16C3.1645 12.1587 5.23008 13.5339 7.62415 13.5339Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M4.19472 8.57315C4.07223 8.20569 3.99985 7.81595 3.99985 7.40952C3.99985 7.00308 4.07223 6.61335 4.19472 6.24589V4.66469H2.15698C1.73941 5.4887 1.5 6.41849 1.5 7.40952C1.5 8.40055 1.73941 9.33034 2.15698 10.1543L3.74374 8.91834L4.19472 8.57315Z",
        fill: "white"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M7.62415 3.72376C8.5261 3.72376 9.32783 4.03555 9.96811 4.63685L11.7219 2.88306C10.6585 1.89202 9.27773 1.28516 7.62415 1.28516C5.23008 1.28516 3.16471 2.66036 2.15698 4.66469L4.19472 6.24589C4.6791 4.79832 6.03182 3.72376 7.62415 3.72376Z",
        fill: "white"
      }
    )
  ] }),
  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_21999_20513", children: /* @__PURE__ */ jsx("rect", { width: "12.2487", height: "12.2487", fill: "white", transform: "translate(1.375 1.28516)" }) }) })
] });

const RepoIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "21", height: "21", viewBox: "0 0 21 21", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M6.15562 2.79004C4.56136 2.78745 3.26758 4.07913 3.26758 5.6734V13.8135C3.26758 15.4058 4.55831 16.6967 6.15062 16.6968L6.16797 16.6968V14.8218L6.15082 14.8218C5.59397 14.8218 5.14258 14.3703 5.14258 13.8135V13.4325C5.14258 12.8756 5.59415 12.4241 6.15112 12.4242L15.0001 12.4258L15.0056 14.8228L12.6035 14.8226V16.6976L16.8849 16.698L16.8713 10.7717V2.80745L6.15562 2.79004ZM14.9963 10.5508V4.67941L6.15257 4.66504C5.59503 4.66413 5.14258 5.11586 5.14258 5.6734V10.7304C5.4566 10.6132 5.79655 10.5491 6.15147 10.5492L14.9963 10.5508Z",
      fill: "#939393"
    }
  ),
  /* @__PURE__ */ jsx("path", { d: "M7.55469 13.6982H11.2655V18.6897L9.41007 17.1997L7.55469 18.6897V13.6982Z", fill: "#939393" })
] });

const HomeIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "13", height: "14", viewBox: "0 0 13 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx("path", { d: "M3.84766 10.1444H9.11328", stroke: "currentColor", strokeWidth: "1.33333", strokeLinecap: "round" }),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M11.1395 12.9536L1.82388 12.9535C1.4557 12.9535 1.15723 12.655 1.15723 12.2868V5.69147C1.15723 5.49041 1.24796 5.30009 1.40417 5.17351L6.07746 1.38658C6.32202 1.18841 6.67185 1.18829 6.91654 1.38629L11.5589 5.14286C11.7153 5.26944 11.8062 5.45989 11.8062 5.66111V12.287C11.8062 12.6552 11.5077 12.9536 11.1395 12.9536Z",
      stroke: "currentColor",
      strokeWidth: "1.33333",
      strokeLinecap: "round"
    }
  )
] });

const InfoIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M7.07303 7.39921C6.65882 7.39921 6.32303 7.735 6.32303 8.14921C6.32303 8.56343 6.65882 8.89921 7.07303 8.89921H7.75V10.6187C7.75 11.0329 8.08579 11.3687 8.5 11.3687C8.91421 11.3687 9.25 11.0329 9.25 10.6187V8.14921C9.25 7.735 8.91421 7.39921 8.5 7.39921H7.07303Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M8.50309 4.72995C7.9971 4.72995 7.58691 5.14014 7.58691 5.64613C7.58691 6.15212 7.9971 6.56231 8.50309 6.56231C9.00908 6.56231 9.41927 6.15212 9.41927 5.64613C9.41927 5.14014 9.00908 4.72995 8.50309 4.72995Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M8.5 1.75293C5.04984 1.75293 2.25293 4.54984 2.25293 8C2.25293 11.4502 5.04984 14.2471 8.5 14.2471C11.9502 14.2471 14.7471 11.4502 14.7471 8C14.7471 4.54984 11.9502 1.75293 8.5 1.75293ZM3.75293 8C3.75293 5.37827 5.87827 3.25293 8.5 3.25293C11.1218 3.25293 13.2471 5.37826 13.2471 8C13.2471 10.6218 11.1218 12.7471 8.5 12.7471C5.87826 12.7471 3.75293 10.6218 3.75293 8Z",
      fill: "currentColor"
    }
  )
] });

const JudgeIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M4.31445 3.16083C3.78402 3.16083 3.27531 3.37154 2.90024 3.74661C2.52517 4.12169 2.31445 4.63039 2.31445 5.16083V5.66083C2.31445 6.19126 2.52517 6.69997 2.90024 7.07504C3.27531 7.45011 3.78402 7.66083 4.31445 7.66083C4.84489 7.66083 5.35359 7.45011 5.72867 7.07504C6.10374 6.69997 6.31445 6.19126 6.31445 5.66083V5.16083C6.31445 4.63039 6.10374 4.12169 5.72867 3.74661C5.35359 3.37154 4.84489 3.16083 4.31445 3.16083Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M6.76666 9.50235C6.57678 9.28532 6.30244 9.16083 6.01407 9.16083H4.50201C4.10791 9.16078 3.71766 9.23838 3.35356 9.38921C3.11733 9.48706 2.8951 9.6145 2.69205 9.76806C2.48056 9.928 2.38001 10.1888 2.38001 10.454V13.0642C2.38001 13.6165 2.82773 14.0642 3.38001 14.0642H8.55436C9.4135 14.0642 9.87269 13.0523 9.30695 12.4057L6.76666 9.50235Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx("rect", { x: "7.92188", y: "6.46759", width: "1.41089", height: "1.56773", rx: "0.705445", fill: "currentColor" }),
  /* @__PURE__ */ jsx("rect", { x: "10.4258", y: "4.35107", width: "1.41089", height: "3.72998", rx: "0.705445", fill: "currentColor" }),
  /* @__PURE__ */ jsx("rect", { x: "12.9287", y: "2.23419", width: "1.41089", height: "5.75781", rx: "0.705445", fill: "currentColor" })
] });

const LogsIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx("path", { d: "M3.46094 8.01825L13.6348 8.01825", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }),
  /* @__PURE__ */ jsx("path", { d: "M3.46094 3.49384L13.6348 3.49384", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }),
  /* @__PURE__ */ jsx("path", { d: "M3.46094 12.5427L13.6348 12.5427", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
] });

const MemoryIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    d: "M3.8674 9.19968L4.14554 10.8649C4.23965 11.4283 4.75254 11.8237 5.32137 11.7713L5.58252 11.7472C6.56555 11.6567 7.43309 12.3868 7.51181 13.3708L7.59308 14.3867C7.60422 14.5259 7.71868 14.6342 7.85825 14.6376L9.91053 14.6876C10.1066 14.6924 10.2434 14.4948 10.17 14.3129L8.90452 11.1782C8.80956 10.9429 8.65085 10.7389 8.44626 10.5889L7.90134 10.1895C7.70604 10.0464 7.55223 9.85411 7.45759 9.63124C7.15011 8.90712 6.6579 7.71234 6.37054 6.88944C6.19204 6.3783 5.79931 6.29158 5.45492 6.21553C4.98179 6.11106 4.5999 6.02673 4.99001 4.88985C5.66408 2.92541 8.06015 2.07904 10.6601 3.33088C12.6488 4.2884 13.1187 6.35416 13.0328 7.58237C13.0297 7.62768 13.0214 7.67186 13.0094 7.71566C12.8829 8.17534 12.368 8.40491 11.9415 8.19169L10.3022 7.37201C10.2069 7.32439 10.0927 7.33657 10.0096 7.40322L8.64809 8.49559C8.55405 8.57104 8.52072 8.69931 8.56615 8.811L10.8995 14.5478C10.9404 14.6483 11.0369 14.715 11.1454 14.7177L12.0572 14.7399C12.2581 14.7448 12.3951 14.5382 12.3124 14.3551L11.8681 13.3706C11.4211 12.3803 11.6047 11.2192 12.3354 10.4151L13.4616 9.17575C13.7473 8.86125 13.9224 8.46187 13.9599 8.03858L13.9763 7.85359C14.2866 4.35298 11.377 1.41272 7.87336 1.68639C6.03919 1.82965 4.45399 3.02228 3.80807 4.74492L3.70275 5.02579C3.5828 5.34571 3.62741 5.70411 3.82213 5.98485L3.88946 6.08192C4.12183 6.41695 4.0958 6.86726 3.82637 7.17328L3.06705 8.03572C2.96261 8.15435 2.98058 8.33664 3.10617 8.43259L3.66059 8.85617C3.77064 8.94026 3.84458 9.06307 3.8674 9.19968Z",
    fill: "currentColor"
  }
) });

const OpenAIIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "12", height: "13", viewBox: "0 0 12 13", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    d: "M10.1266 5.67745C10.3409 5.0225 10.2695 4.2961 9.92413 3.70069C9.40017 2.78376 8.34034 2.31934 7.30433 2.53369C6.85182 2.02164 6.18496 1.73584 5.49428 1.73584C4.43445 1.73584 3.50561 2.41461 3.17218 3.4149C2.49342 3.55779 1.90992 3.97458 1.56458 4.5819C1.04062 5.49883 1.1597 6.64202 1.86228 7.42796C1.64793 8.09482 1.73129 8.80931 2.07663 9.40472C2.60059 10.3217 3.66042 10.798 4.69643 10.5717C5.16085 11.0838 5.8158 11.3815 6.50648 11.3815C7.56631 11.3815 8.49515 10.7027 8.82858 9.70243C9.50735 9.55953 10.0908 9.14274 10.4362 8.53542C10.9601 7.61849 10.8411 6.46339 10.1266 5.67745ZM6.50648 10.7503C6.07778 10.7503 5.67291 10.6074 5.35138 10.3336C5.36329 10.3217 5.39902 10.3097 5.41093 10.2978L7.32815 9.19037C7.42341 9.13083 7.48295 9.03557 7.48295 8.91648V6.21332L8.29271 6.67774C8.30462 6.67774 8.30462 6.68965 8.30462 6.70156V8.9403C8.31653 9.94059 7.50677 10.7503 6.50648 10.7503ZM2.62441 9.09511C2.41006 8.72595 2.33861 8.29726 2.41006 7.88047C2.42197 7.89238 2.44578 7.90429 2.4696 7.91619L4.38682 9.02366C4.48209 9.0832 4.60117 9.0832 4.69643 9.02366L7.04235 7.66612V8.60687C7.04235 8.61878 7.04235 8.63069 7.03044 8.63069L5.0894 9.75006C4.23201 10.2502 3.12455 9.9525 2.62441 9.09511ZM2.12426 4.90342C2.33861 4.53427 2.67204 4.26038 3.06501 4.10557V6.39195C3.06501 6.49912 3.12455 6.60629 3.21982 6.66583L5.56573 8.02337L4.75597 8.48779C4.74407 8.48779 4.73216 8.4997 4.73216 8.48779L2.79112 7.36842C1.90992 6.86827 1.62412 5.76081 2.12426 4.90342ZM8.79285 6.45149L6.44694 5.09395L7.2567 4.62953C7.2686 4.62953 7.28051 4.61762 7.28051 4.62953L9.22155 5.7489C10.0908 6.24905 10.3766 7.35651 9.8765 8.2139C9.66215 8.58305 9.32872 8.85694 8.93575 8.99984V6.72538C8.94766 6.6182 8.88812 6.51103 8.79285 6.45149ZM9.5907 5.23685C9.5788 5.22494 9.55498 5.21303 9.53116 5.20113L7.61394 4.09366C7.51868 4.03412 7.39959 4.03412 7.30433 4.09366L4.95841 5.4512V4.51045C4.95841 4.49854 4.95841 4.48663 4.97032 4.48663L6.91136 3.36726C7.78066 2.86712 8.87621 3.16482 9.37636 4.03412C9.5907 4.39137 9.66215 4.82006 9.5907 5.23685ZM4.51781 6.904L3.70805 6.43958C3.69615 6.43958 3.69615 6.42767 3.69615 6.41576V4.17702C3.69615 3.17673 4.5059 2.36697 5.50619 2.36697C5.93489 2.36697 6.33977 2.50987 6.66129 2.78376C6.64938 2.79567 6.62556 2.80758 6.60175 2.81949L4.68453 3.92695C4.58926 3.98649 4.52972 4.08176 4.52972 4.20084V6.904H4.51781ZM4.95841 5.95134L6.00634 5.34402L7.05426 5.95134V7.15407L6.00634 7.76139L4.95841 7.15407V5.95134Z",
    fill: "currentColor"
  }
) });

const PromptIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.8341 11.2099H12.4915C13.598 11.2099 14.5 10.3156 14.5 9.21251V4.20729C14.5 3.10576 13.6007 2.2099 12.4915 2.2099H4.50853C3.40195 2.2099 2.5 3.10416 2.5 4.20729V9.21251C2.5 10.3112 3.39464 11.2053 4.5 11.2099V13.2005C4.5 13.7665 4.87069 13.9533 5.32796 13.6368L8.8341 11.2099Z",
    fill: "currentColor"
  }
) });

const ScoreIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M3 12V11C3 10.6022 3.15804 10.2206 3.43934 9.93934C3.72064 9.65804 4.10218 9.5 4.5 9.5C4.89782 9.5 5.27936 9.65804 5.56066 9.93934C5.84196 10.2206 6 10.6022 6 11V12C6 12.3978 5.84196 12.7794 5.56066 13.0607C5.27936 13.342 4.89782 13.5 4.5 13.5C4.10218 13.5 3.72064 13.342 3.43934 13.0607C3.15804 12.7794 3 12.3978 3 12ZM7 12V8.5C7 8.10218 7.15804 7.72064 7.43934 7.43934C7.72064 7.15804 8.10218 7 8.5 7C8.89782 7 9.27936 7.15804 9.56066 7.43934C9.84196 7.72064 10 8.10218 10 8.5V12C10 12.3978 9.84196 12.7794 9.56066 13.0607C9.27936 13.342 8.89782 13.5 8.5 13.5C8.10218 13.5 7.72064 13.342 7.43934 13.0607C7.15804 12.7794 7 12.3978 7 12ZM11 12V4C11 3.60218 11.158 3.22064 11.4393 2.93934C11.7206 2.65804 12.1022 2.5 12.5 2.5C12.8978 2.5 13.2794 2.65804 13.5607 2.93934C13.842 3.22064 14 3.60218 14 4V12C14 12.3978 13.842 12.7794 13.5607 13.0607C13.2794 13.342 12.8978 13.5 12.5 13.5C12.1022 13.5 11.7206 13.342 11.4393 13.0607C11.158 12.7794 11 12.3978 11 12Z",
    fill: "currentColor"
  }
) });

const SettingsIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "17", height: "18", viewBox: "0 0 17 18", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M8.40864 11.9983C7.58064 11.9733 6.84164 11.6153 6.31564 11.0563C6.31464 11.0563 6.31464 11.0553 6.31464 11.0553C5.78864 10.4963 5.47564 9.73633 5.50064 8.90833C5.52564 8.08033 5.88464 7.34133 6.44364 6.81533C7.00264 6.28833 7.76264 5.97633 8.59064 6.00133C9.41864 6.02633 10.1576 6.38433 10.6836 6.94333H10.6846C11.2106 7.50333 11.5236 8.26233 11.4986 9.09033C11.4726 9.91833 11.1146 10.6583 10.5556 11.1843C9.99664 11.7103 9.23664 12.0233 8.40864 11.9983ZM16.1266 8.15033L14.3606 7.74033C14.2316 7.14133 14.0146 6.57633 13.7216 6.05733L14.7726 4.57933C14.9116 4.38533 14.8926 4.12033 14.7296 3.94633L13.9206 3.08733C13.7576 2.91333 13.4946 2.87933 13.2916 3.00533L11.7526 3.96533C11.2526 3.64133 10.7016 3.39033 10.1116 3.22633L9.80964 1.43833C9.76964 1.20333 9.56964 1.02833 9.33164 1.02133L8.15264 0.985326C7.91364 0.978326 7.70364 1.14033 7.64964 1.37233L7.24064 3.13933C6.64164 3.26733 6.07664 3.48433 5.55664 3.77733L4.07864 2.72633C3.88464 2.58833 3.61964 2.60633 3.44664 2.76933L2.58664 3.57833C2.41364 3.74133 2.37964 4.00533 2.50564 4.20733L3.46564 5.74633C3.14164 6.24633 2.89064 6.79833 2.72564 7.38833L0.937635 7.68933C0.702635 7.72933 0.528635 7.92933 0.520635 8.16733L0.485635 9.34733C0.477635 9.58533 0.639635 9.79533 0.872635 9.84933L2.63864 10.2583C2.76764 10.8573 2.98464 11.4233 3.27764 11.9423L2.22564 13.4203C2.08764 13.6143 2.10564 13.8793 2.26964 14.0523L3.07864 14.9123C3.24164 15.0853 3.50464 15.1203 3.70664 14.9933L5.24564 14.0333C5.74663 14.3583 6.29764 14.6093 6.88764 14.7733L7.18964 16.5613C7.22864 16.7963 7.42864 16.9713 7.66764 16.9783L8.84663 17.0143C9.08564 17.0213 9.29564 16.8593 9.34964 16.6273L9.75864 14.8603C10.3576 14.7323 10.9226 14.5153 11.4416 14.2213L12.9206 15.2733C13.1146 15.4113 13.3786 15.3933 13.5526 15.2293L14.4116 14.4213C14.5856 14.2573 14.6196 13.9943 14.4936 13.7923L13.5336 12.2533C13.8576 11.7523 14.1086 11.2013 14.2726 10.6113L16.0616 10.3103C16.2966 10.2703 16.4706 10.0703 16.4776 9.83233L16.5136 8.65233C16.5206 8.41433 16.3586 8.20433 16.1266 8.15033Z",
    fill: "currentColor"
  }
) });

const SlashIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx("path", { d: "M5.25684 12.6387L10.4003 3.36133H11.7432L6.5997 12.6387H5.25684Z", fill: "currentColor" }) });

const ToolsIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M7.5605 1.42351C8.0791 0.904904 8.92215 0.906157 9.4395 1.42351L10.6922 2.67617C11.2108 3.19477 11.2095 4.03782 10.6922 4.55517L9.4395 5.80783C8.9209 6.32643 8.07785 6.32518 7.5605 5.80783L6.30784 4.55517C5.78923 4.03656 5.79049 3.19352 6.30784 2.67617L7.5605 1.42351ZM3.17618 5.80783C3.69478 5.28923 4.53782 5.29048 5.05517 5.80783L6.30784 7.0605C6.82644 7.5791 6.82519 8.42214 6.30784 8.93949L5.05517 10.1922C4.53657 10.7108 3.69353 10.7095 3.17618 10.1922L1.92351 8.93949C1.40491 8.42089 1.40616 7.57785 1.92351 7.0605L3.17618 5.80783ZM11.9448 5.80783C12.4634 5.28923 13.3065 5.29048 13.8238 5.80783L15.0765 7.0605C15.5951 7.5791 15.5938 8.42214 15.0765 8.93949L13.8238 10.1922C13.3052 10.7108 12.4622 10.7095 11.9448 10.1922L10.6922 8.93949C10.1736 8.42089 10.1748 7.57785 10.6922 7.0605L11.9448 5.80783ZM7.5605 10.1922C8.0791 9.67355 8.92215 9.67481 9.4395 10.1922L10.6922 11.4448C11.2108 11.9634 11.2095 12.8065 10.6922 13.3238L9.4395 14.5765C8.9209 15.0951 8.07785 15.0938 7.5605 14.5765L6.30784 13.3238C5.78923 12.8052 5.79049 11.9622 6.30784 11.4448L7.5605 10.1922Z",
    fill: "currentColor"
  }
) });

const TraceIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M3.0498 3.17139V7.95137M6.91346 12.8737L4.04984 12.8738C3.49754 12.8738 3.0498 12.4261 3.0498 11.8738V7.95137M3.0498 7.95137L6.85968 7.95125",
      stroke: "currentColor",
      strokeLinecap: "round"
    }
  ),
  /* @__PURE__ */ jsx("path", { d: "M6.59668 3.12631L13.9507 3.12631", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }),
  /* @__PURE__ */ jsx("path", { d: "M10.293 7.95099L13.8072 7.95099", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" }),
  /* @__PURE__ */ jsx("path", { d: "M10.293 12.8025L13.8072 12.8025", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round" })
] });

const TsIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx("rect", { x: "2.74902", y: "1.89307", width: "11.8252", height: "11.8252", rx: "1.5", stroke: "currentColor" }),
  /* @__PURE__ */ jsx("path", { d: "M5.64062 7.98265V7.29806H8.86605V7.98265H7.66371V11.2253H6.84297V7.98265H5.64062Z", fill: "currentColor" }),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M11.5277 8.42754C11.5124 8.27285 11.4465 8.15268 11.3302 8.06703C11.2138 7.98137 11.056 7.93855 10.8565 7.93855C10.721 7.93855 10.6066 7.95772 10.5133 7.99607C10.42 8.03315 10.3484 8.08492 10.2985 8.1514C10.2499 8.21788 10.2256 8.2933 10.2256 8.37768C10.2231 8.44799 10.2378 8.50936 10.2697 8.56177C10.303 8.61418 10.3484 8.65957 10.4059 8.69792C10.4634 8.73499 10.5299 8.76759 10.6053 8.79572C10.6808 8.82257 10.7613 8.84558 10.8469 8.86475L11.1998 8.94913C11.3711 8.98748 11.5283 9.03862 11.6715 9.10254C11.8147 9.16646 11.9387 9.24508 12.0435 9.3384C12.1484 9.43173 12.2295 9.54167 12.2871 9.66823C12.3459 9.7948 12.3759 9.9399 12.3772 10.1035C12.3759 10.3439 12.3146 10.5523 12.1931 10.7287C12.0729 10.9038 11.8991 11.04 11.6715 11.1371C11.4452 11.233 11.1723 11.2809 10.8527 11.2809C10.5357 11.2809 10.2595 11.2324 10.0243 11.1352C9.79034 11.038 9.60753 10.8942 9.47585 10.7037C9.34545 10.512 9.27706 10.2748 9.27067 9.99231H10.0741C10.0831 10.124 10.1208 10.2339 10.1873 10.3221C10.255 10.4091 10.3452 10.4749 10.4577 10.5197C10.5714 10.5631 10.6999 10.5849 10.8431 10.5849C10.9837 10.5849 11.1058 10.5644 11.2094 10.5235C11.3142 10.4826 11.3954 10.4257 11.4529 10.3528C11.5104 10.28 11.5392 10.1962 11.5392 10.1016C11.5392 10.0134 11.513 9.93926 11.4606 9.87917C11.4094 9.81909 11.334 9.76795 11.2343 9.72576C11.1359 9.68357 11.0151 9.64522 10.8719 9.6107L10.4442 9.50332C10.1131 9.42278 9.8517 9.29686 9.65994 9.12555C9.46818 8.95424 9.37294 8.72349 9.37422 8.43329C9.37294 8.19551 9.43622 7.98776 9.56406 7.81007C9.69318 7.63237 9.87024 7.49366 10.0952 7.39394C10.3202 7.29423 10.5759 7.24437 10.8623 7.24437C11.1538 7.24437 11.4082 7.29423 11.6255 7.39394C11.8441 7.49366 12.0141 7.63237 12.1356 7.81007C12.257 7.98776 12.3197 8.19359 12.3235 8.42754H11.5277Z",
      fill: "currentColor"
    }
  )
] });

const VariablesIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M15.4997 7.97482V8.6501C15.0469 8.6501 14.7307 8.75585 14.5512 8.96735C14.3717 9.17885 14.2819 9.52631 14.2819 10.0097V11.315C14.2819 11.7773 14.235 12.1655 14.1413 12.4797C14.0502 12.797 13.9095 13.0508 13.7193 13.2411C13.529 13.4315 13.2879 13.5689 12.9958 13.6535C12.7038 13.7381 12.3594 13.7804 11.9629 13.7804V12.7063C12.2737 12.7063 12.5162 12.6535 12.6904 12.5477C12.8645 12.445 12.9851 12.2848 13.0521 12.0673C13.1217 11.8528 13.1566 11.5794 13.1566 11.247V9.59731C13.1566 9.36467 13.1874 9.15015 13.249 8.95376C13.3106 8.75434 13.4245 8.58212 13.5906 8.4371C13.7568 8.28905 13.9939 8.17575 14.302 8.09719C14.6102 8.01561 15.0094 7.97482 15.4997 7.97482ZM11.9629 2.21906C12.3594 2.21906 12.7038 2.26135 12.9958 2.34595C13.2879 2.43055 13.529 2.56803 13.7193 2.75837C13.9095 2.94872 14.0502 3.20252 14.1413 3.51977C14.235 3.83399 14.2819 4.22224 14.2819 4.68452V5.98523C14.2819 6.47168 14.3717 6.82065 14.5512 7.03214C14.7307 7.24062 15.0469 7.34486 15.4997 7.34486V8.02467C15.0094 8.02467 14.6102 7.98389 14.302 7.90231C13.9939 7.82073 13.7568 7.70743 13.5906 7.5624C13.4245 7.41737 13.3106 7.24666 13.249 7.05027C13.1874 6.85086 13.1566 6.63483 13.1566 6.40218V4.7525C13.1566 4.41712 13.1217 4.14218 13.0521 3.92766C12.9851 3.71012 12.8645 3.54998 12.6904 3.44725C12.5162 3.34453 12.2737 3.29316 11.9629 3.29316V2.21906ZM15.4997 7.34486V8.6501H14.3864V7.34486H15.4997Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M7.14024 4.97928L8.50273 7.33122L9.87728 4.97928H11.1915L9.26637 7.99983L11.2076 11.0204H9.89335L8.50273 8.76283L7.11613 11.0204H5.79785L7.719 7.99983L5.82197 4.97928H7.14024Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M1.5 8.02467V7.34486C1.95282 7.34486 2.269 7.24062 2.44852 7.03214C2.62804 6.82065 2.7178 6.47168 2.7178 5.98523V4.68452C2.7178 4.22224 2.76335 3.83399 2.85445 3.51977C2.94823 3.20252 3.09024 2.94872 3.28048 2.75837C3.47072 2.56803 3.71187 2.43055 4.00392 2.34595C4.29598 2.26135 4.64029 2.21906 5.03684 2.21906V3.29316C4.72603 3.29316 4.48354 3.34453 4.30938 3.44725C4.13522 3.54998 4.0133 3.71012 3.94364 3.92766C3.87665 4.14218 3.84316 4.41712 3.84316 4.7525V6.40218C3.84316 6.63483 3.81234 6.85086 3.75072 7.05027C3.68909 7.24666 3.57522 7.41737 3.40909 7.5624C3.24297 7.70743 3.00584 7.82073 2.6977 7.90231C2.38957 7.98389 1.99033 8.02467 1.5 8.02467ZM5.03684 13.7804C4.64029 13.7804 4.29598 13.7381 4.00392 13.6535C3.71187 13.5689 3.47072 13.4315 3.28048 13.2411C3.09024 13.0508 2.94823 12.797 2.85445 12.4797C2.76335 12.1655 2.7178 11.7773 2.7178 11.315V10.0097C2.7178 9.52631 2.62804 9.17885 2.44852 8.96735C2.269 8.75585 1.95282 8.6501 1.5 8.6501V7.97482C1.99033 7.97482 2.38957 8.01561 2.6977 8.09719C3.00584 8.17575 3.24297 8.28905 3.40909 8.4371C3.57522 8.58212 3.68909 8.75434 3.75072 8.95376C3.81234 9.15015 3.84316 9.36467 3.84316 9.59731V11.247C3.84316 11.5794 3.87665 11.8528 3.94364 12.0673C4.0133 12.2848 4.13522 12.445 4.30938 12.5477C4.48354 12.6535 4.72603 12.7063 5.03684 12.7063V13.7804ZM1.5 8.6501V7.34486H2.6133V8.6501H1.5Z",
      fill: "currentColor"
    }
  )
] });

const WorkflowIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "17", height: "16", viewBox: "0 0 17 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M6.24388 2.4018C6.24388 2.0394 6.53767 1.74561 6.90008 1.74561H10.0991C10.4614 1.74561 10.7553 2.0394 10.7553 2.4018V4.57546C10.7553 4.93787 10.4614 5.23166 10.0991 5.23166H9.31982V7.35469L10.0033 9.22664C9.90442 9.20146 9.80035 9.1761 9.6915 9.14986L9.62652 9.13422C9.30473 9.05687 8.92256 8.96501 8.61993 8.84491C8.5819 8.82981 8.54147 8.81292 8.49957 8.79391C8.45767 8.81292 8.41724 8.82981 8.3792 8.84491C8.07657 8.96501 7.6944 9.05687 7.37261 9.13422L7.30763 9.14986C7.19879 9.1761 7.09471 9.20146 6.99577 9.22664L7.67932 7.35469V5.23166H6.90008C6.53767 5.23166 6.24388 4.93787 6.24388 4.57546V2.4018ZM6.99577 9.22664C6.99577 9.22664 6.99578 9.22664 6.99577 9.22664L6.43283 10.7683H6.81806C7.18047 10.7683 7.47426 11.0622 7.47426 11.4245V13.5982C7.47426 13.9606 7.18047 14.2544 6.81806 14.2544H3.61909C3.25668 14.2544 2.96289 13.9606 2.96289 13.5982V11.4245C2.96289 11.0622 3.25668 10.7683 3.61909 10.7683H4.26617C4.2921 10.4663 4.32783 10.1494 4.37744 9.85171C4.43762 9.49063 4.52982 9.08135 4.68998 8.76102C4.93975 8.2615 5.44743 8.01751 5.7771 7.88788C6.14684 7.74249 6.57537 7.63889 6.92317 7.55505C7.24707 7.47696 7.49576 7.41679 7.67932 7.35469L6.99577 9.22664ZM6.43283 10.7683L6.99577 9.22664C6.75846 9.28705 6.55067 9.34646 6.37745 9.41458C6.22784 9.47341 6.1623 9.51712 6.14023 9.53254C6.09752 9.63631 6.04409 9.83055 5.99562 10.1214C5.96201 10.3231 5.93498 10.5439 5.91341 10.7683H6.43283ZM10.0033 9.22664L9.31982 7.35469C9.50338 7.41679 9.75206 7.47696 10.076 7.55505C10.4238 7.63889 10.8523 7.74249 11.2221 7.88788C11.5517 8.01751 12.0594 8.2615 12.3091 8.76102C12.4693 9.08135 12.5615 9.49063 12.6217 9.85171C12.6713 10.1494 12.707 10.4663 12.733 10.7683H13.38C13.7424 10.7683 14.0362 11.0622 14.0362 11.4245V13.5982C14.0362 13.9606 13.7424 14.2544 13.38 14.2544H10.1811C9.81867 14.2544 9.52488 13.9606 9.52488 13.5982V11.4245C9.52488 11.0622 9.81867 10.7683 10.1811 10.7683H10.5663L10.0033 9.22664ZM10.0033 9.22664L10.5663 10.7683H11.0857C11.0642 10.5439 11.0372 10.3231 11.0035 10.1214C10.9551 9.83055 10.9016 9.63631 10.8589 9.53254C10.8369 9.51712 10.7713 9.47341 10.6217 9.41458C10.4485 9.34646 10.2407 9.28705 10.0033 9.22664Z",
    fill: "currentColor"
  }
) });

const WorkflowCoinIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "126", height: "85", viewBox: "0 0 126 85", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M119.322 35.1636C119.322 50.3595 94.1055 62.6782 62.9998 62.6782C31.894 62.6782 6.67773 50.3595 6.67773 35.1636V49.8363C6.67773 65.0322 31.894 77.351 62.9998 77.351C94.1055 77.351 119.322 65.0322 119.322 49.8363V35.1636Z",
      fill: "#2E2E2E",
      fillOpacity: "0.9"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M119.322 35.1636C119.322 50.3595 94.1055 62.6782 62.9998 62.6782C31.894 62.6782 6.67773 50.3595 6.67773 35.1636M119.322 35.1636C119.322 19.9677 94.1055 7.64893 62.9998 7.64893C31.894 7.64893 6.67773 19.9677 6.67773 35.1636M119.322 35.1636V49.8363C119.322 65.0322 94.1055 77.351 62.9998 77.351C31.894 77.351 6.67773 65.0322 6.67773 49.8363V35.1636",
      stroke: "#424242"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M63.0002 0.968262C28.5152 0.968262 0.55957 15.6484 0.55957 33.7573V51.2428C0.55957 69.3517 28.5152 84.0319 63.0002 84.0319C97.4853 84.0319 125.441 69.3517 125.441 51.2428V33.7573C125.441 15.6484 97.4853 0.968262 63.0002 0.968262Z",
      stroke: "#707070"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M74.9374 21.357C76.2127 20.7291 78.2804 20.7291 79.5557 21.357L90.8129 26.8997C92.0882 27.5276 92.0882 28.5458 90.8129 29.1737L83.1638 32.9399C81.8885 33.5678 79.8207 33.5678 78.5454 32.9399L75.8033 31.5898L68.3324 35.2682L64.1502 39.696C63.8908 39.481 63.6138 39.2568 63.3231 39.0227L63.1495 38.883C62.2893 38.1914 61.2677 37.3701 60.6254 36.6376C60.5446 36.5456 60.4618 36.4463 60.3812 36.3407C60.1669 36.3011 59.9652 36.2603 59.7782 36.2205C58.2906 35.9043 56.6225 35.4013 55.2179 34.9777L54.9342 34.8922C54.4589 34.7491 54.0034 34.6127 53.5666 34.4849L62.5594 32.4258L70.0304 28.7473L67.2882 27.3972C66.0129 26.7692 66.0129 25.7512 67.2882 25.1232L74.9374 21.357ZM53.5666 34.4849C53.5666 34.4849 53.5666 34.4849 53.5666 34.4849L46.1603 36.1808L47.516 36.8483C48.7913 37.4762 48.7912 38.4943 47.516 39.1222L39.8668 42.8884C38.5916 43.5163 36.5238 43.5164 35.2485 42.8884L23.9913 37.3457C22.7159 36.7177 22.716 35.6996 23.9913 35.0717L31.6404 31.3055C32.9156 30.6776 34.9834 30.6776 36.2587 31.3055L38.5358 32.4267C39.6899 31.9483 40.9309 31.4611 42.153 31.0313C43.6354 30.5099 45.4001 29.9605 47.091 29.683C49.7278 29.2502 52.3729 29.7072 53.9892 30.0537C55.8019 30.4425 57.6745 31.0055 59.1934 31.4628C60.6081 31.8887 61.6949 32.2154 62.5594 32.4258L53.5666 34.4849ZM46.1603 36.1808L53.5666 34.4849C52.5189 34.1784 51.5786 33.9213 50.7293 33.7392C49.9958 33.5819 49.6114 33.5441 49.4794 33.5326C48.964 33.6384 48.0924 33.8823 46.8983 34.3023C46.0703 34.5936 45.1981 34.9293 44.3325 35.2808L46.1603 36.1808ZM64.1502 39.696L68.3324 35.2682C68.7598 35.6939 69.4232 36.229 70.2883 36.9256C71.2171 37.6735 72.3605 38.5954 73.15 39.488C73.8539 40.2838 74.7818 41.5862 73.9029 42.8844C73.3394 43.717 72.2235 44.5859 71.1648 45.3159C70.2916 45.9175 69.3021 46.5286 68.3305 47.0968L70.6077 48.218C71.8829 48.8459 71.8829 49.864 70.6077 50.4919L62.9585 54.2582C61.6833 54.8861 59.6154 54.8861 58.3402 54.2582L47.083 48.7154C45.8077 48.0875 45.8077 47.0694 47.083 46.4415L54.7321 42.6752C56.0074 42.0474 58.0751 42.0473 59.3505 42.6752L60.7062 43.3428L64.1502 39.696ZM64.1502 39.696L60.7062 43.3428L62.5339 44.2427C63.2478 43.8165 63.9298 43.3871 64.5213 42.9794C65.3742 42.3914 65.8695 41.9622 66.0846 41.7085C66.0613 41.6436 65.9844 41.4543 65.6649 41.0931C65.295 40.6749 64.773 40.212 64.1502 39.696Z",
      fill: "#A9A9A9"
    }
  )
] });

const LatencyIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M2.0625 5.99976C2.0625 3.82513 3.82538 2.06226 6 2.06226C6.58712 2.06226 7.14423 2.19076 7.64473 2.42117V1.21042C7.12905 1.03337 6.57575 0.937256 6 0.937256C3.20406 0.937256 0.9375 3.20381 0.9375 5.99976C0.9375 8.7957 3.20406 11.0623 6 11.0623C8.79594 11.0623 11.0625 8.7957 11.0625 5.99976H9.9375C9.9375 8.17438 8.17462 9.93726 6 9.93726C3.82538 9.93726 2.0625 8.17438 2.0625 5.99976Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M9.28577 4.3986C9.08709 4.3986 8.92603 4.23753 8.92603 4.03885V0.978563C8.92603 0.681899 9.16652 0.441406 9.46318 0.441406C9.75985 0.441406 10.0003 0.6819 10.0003 0.978564V3.25858C10.0003 3.33638 10.0634 3.39944 10.1412 3.39944H11.2091C11.485 3.39944 11.7087 3.62311 11.7087 3.89902C11.7087 4.17493 11.485 4.3986 11.2091 4.3986H9.28577Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M6.57568 3.69244C6.57568 3.38178 6.32384 3.12994 6.01318 3.12994C5.70252 3.12994 5.45068 3.38178 5.45068 3.69244V6.22272L6.7242 7.88675C6.91301 8.13346 7.26606 8.18039 7.51276 7.99159C7.75946 7.80278 7.8064 7.44973 7.61759 7.20303L6.57568 5.84162V3.69244Z",
      fill: "currentColor"
    }
  )
] });

const McpServerIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M6.53918 9.32122C6.34324 9.51508 6.02724 9.51338 5.83338 9.31744C5.63952 9.1215 5.6412 8.80551 5.83713 8.61164L10.1958 4.29931C10.7996 3.70186 10.8017 2.72852 10.2041 2.12839L10.1899 2.11428C9.58767 1.52481 8.62251 1.53208 8.0292 2.13052L2.29396 7.91536C2.0999 8.1111 1.78388 8.11246 1.58813 7.9184C1.39239 7.72433 1.39103 7.40831 1.58509 7.21257L7.32036 1.42774C8.30005 0.439581 9.89369 0.427613 10.8881 1.40094L10.9116 1.42425C11.4942 2.00929 11.7316 2.80913 11.6232 3.56922C12.389 3.44866 13.1999 3.67918 13.7961 4.26273C14.804 5.24929 14.8147 6.86824 13.82 7.86808L8.5531 13.1619C8.50045 13.2148 8.50024 13.3002 8.55263 13.3534L9.65448 14.4717C9.84794 14.668 9.8456 14.984 9.64925 15.1775C9.45291 15.3709 9.13691 15.3686 8.94345 15.1723L7.84163 14.054C7.40505 13.6109 7.40677 12.8988 7.8455 12.4579L13.1124 7.16405C13.7161 6.55727 13.7095 5.57478 13.0979 4.97606C12.4925 4.38347 11.4942 4.40725 10.8978 5.00886L6.53918 9.32122Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M8.84622 2.75411C9.04697 2.56188 9.36555 2.56381 9.56395 2.76076C9.76234 2.95771 9.76658 3.27625 9.57582 3.4784L9.56661 3.48794L5.25912 7.82701C4.67023 8.42022 4.672 9.37798 5.26305 9.96904C5.85624 10.5622 6.81818 10.5615 7.41052 9.9675L11.6299 5.73599L11.6395 5.72671C11.8406 5.53493 12.1592 5.53756 12.3572 5.73496C12.5583 5.93548 12.5587 6.26104 12.3582 6.46214L8.13877 10.6937C7.14498 11.6903 5.53105 11.6915 4.53584 10.6963C3.5442 9.70461 3.54127 8.09774 4.52928 7.10248L8.83677 2.76342L8.84622 2.75411Z",
      fill: "currentColor"
    }
  )
] });

const FolderIcon = (props) => /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: /* @__PURE__ */ jsx(
  "path",
  {
    d: "M1.5 8.5V8C1.5 7.60218 1.65804 7.22064 1.93934 6.93934C2.22064 6.65804 2.60218 6.5 3 6.5H13C13.3978 6.5 13.7794 6.65804 14.0607 6.93934C14.342 7.22064 14.5 7.60218 14.5 8V8.5M8.70667 4.20667L7.29333 2.79333C7.20048 2.70037 7.09022 2.62661 6.96886 2.57628C6.84749 2.52595 6.71739 2.50003 6.586 2.5H3C2.60218 2.5 2.22064 2.65804 1.93934 2.93934C1.65804 3.22064 1.5 3.60218 1.5 4V12C1.5 12.3978 1.65804 12.7794 1.93934 13.0607C2.22064 13.342 2.60218 13.5 3 13.5H13C13.3978 13.5 13.7794 13.342 14.0607 13.0607C14.342 12.7794 14.5 12.3978 14.5 12V6C14.5 5.60218 14.342 5.22064 14.0607 4.93934C13.7794 4.65804 13.3978 4.5 13 4.5H9.414C9.14887 4.49977 8.89402 4.39426 8.70667 4.20667Z",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }
) });

const McpCoinIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "126", height: "85", viewBox: "0 0 126 85", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M119.322 35.1641C119.322 50.36 94.1055 62.6787 62.9998 62.6787C31.894 62.6787 6.67773 50.36 6.67773 35.1641V49.8368C6.67773 65.0327 31.894 77.3514 62.9998 77.3514C94.1055 77.3514 119.322 65.0327 119.322 49.8368V35.1641Z",
      fill: "#2E2E2E",
      fillOpacity: "0.9"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M119.322 35.1641C119.322 50.36 94.1055 62.6787 62.9998 62.6787C31.894 62.6787 6.67773 50.36 6.67773 35.1641M119.322 35.1641C119.322 19.9681 94.1055 7.64941 62.9998 7.64941C31.894 7.64941 6.67773 19.9681 6.67773 35.1641M119.322 35.1641V49.8368C119.322 65.0327 94.1055 77.3514 62.9998 77.3514C31.894 77.3514 6.67773 65.0327 6.67773 49.8368V35.1641",
      stroke: "#424242"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M63.0002 0.96875C28.5152 0.96875 0.55957 15.6489 0.55957 33.7578V51.2433C0.55957 69.3522 28.5152 84.0323 63.0002 84.0323C97.4853 84.0323 125.441 69.3522 125.441 51.2433V33.7578C125.441 15.6489 97.4853 0.96875 63.0002 0.96875Z",
      stroke: "#707070"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M51.5215 39.9726C50.5464 40.4477 48.9738 40.4435 48.009 39.9634C47.0442 39.4833 47.0526 38.709 48.0277 38.2339L69.7191 27.6672C72.7243 26.2032 72.7347 23.8181 69.7605 22.3476L69.6898 22.313C66.6927 20.8686 61.8895 20.8864 58.9368 22.3528L30.3946 36.5278C29.4288 37.0074 27.8561 37.0107 26.882 36.5352C25.9078 36.0597 25.901 35.2853 26.8668 34.8057L55.4092 20.6308C60.2847 18.2094 68.2157 18.1801 73.1645 20.5651L73.2814 20.6222C76.1808 22.0558 77.3624 24.0157 76.8227 25.8782C80.6339 25.5828 84.6694 26.1476 87.6364 27.5775C92.6525 29.9949 92.7059 33.962 87.7554 36.4119L61.5441 49.3836C61.282 49.5133 61.281 49.7227 61.5417 49.853L67.0252 52.5932C67.988 53.0743 67.9763 53.8486 66.9992 54.3226C66.0221 54.7966 64.4495 54.7909 63.4867 54.3098L58.0033 51.5695C55.8306 50.4838 55.8392 48.7391 58.0226 47.6585L84.2339 34.6868C87.2382 33.2 87.2058 30.7925 84.1617 29.3254C81.1488 27.8734 76.1811 27.9317 73.2127 29.4058L51.5215 39.9726Z",
      fill: "#A9A9A9"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M63.0028 23.8809C64.0019 23.4098 65.5873 23.4146 66.5747 23.8972C67.562 24.3798 67.5831 25.1603 66.6338 25.6556L66.5879 25.679L45.1511 36.3113C42.2204 37.7649 42.2292 40.1117 45.1707 41.56C48.1228 43.0135 52.91 43.0118 55.8578 41.5563L76.8564 31.1875L76.9037 31.1648C77.9049 30.6949 79.4903 30.7013 80.4755 31.185C81.4763 31.6764 81.4785 32.4741 80.4806 32.9669L59.4821 43.3356C54.5363 45.7777 46.5044 45.7806 41.5516 43.342C36.6166 40.9121 36.602 36.9747 41.519 34.5359L62.9558 23.9037L63.0028 23.8809Z",
      fill: "#A9A9A9"
    }
  )
] });

const ToolCoinIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "126", height: "85", viewBox: "0 0 126 85", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M119.322 35.1641C119.322 50.36 94.1055 62.6787 62.9998 62.6787C31.894 62.6787 6.67773 50.36 6.67773 35.1641V49.8368C6.67773 65.0327 31.894 77.3514 62.9998 77.3514C94.1055 77.3514 119.322 65.0327 119.322 49.8368V35.1641Z",
      fill: "#2E2E2E",
      fillOpacity: "0.9"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M119.322 35.1641C119.322 50.36 94.1055 62.6787 62.9998 62.6787C31.894 62.6787 6.67773 50.36 6.67773 35.1641M119.322 35.1641C119.322 19.9681 94.1055 7.64941 62.9998 7.64941C31.894 7.64941 6.67773 19.9681 6.67773 35.1641M119.322 35.1641V49.8368C119.322 65.0327 94.1055 77.3514 62.9998 77.3514C31.894 77.3514 6.67773 65.0327 6.67773 49.8368V35.1641",
      stroke: "#424242"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M63.0002 0.96875C28.5152 0.96875 0.55957 15.6489 0.55957 33.7578V51.2433C0.55957 69.3522 28.5152 84.0323 63.0002 84.0323C97.4853 84.0323 125.441 69.3522 125.441 51.2433V33.7578C125.441 15.6489 97.4853 0.96875 63.0002 0.96875Z",
      stroke: "#707070"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M95.8997 32.6647C98.4806 33.9355 98.4744 36.0012 95.8997 37.2689L89.6657 40.3384C87.0848 41.6091 82.8892 41.6061 80.3146 40.3384L74.0805 37.2689C71.4996 35.9981 71.5059 33.9324 74.0805 32.6647L80.3146 29.5952C82.8955 28.3244 87.091 28.3275 89.6657 29.5952L95.8997 32.6647ZM74.0805 21.9215C76.6614 23.1923 76.6552 25.258 74.0805 26.5257L67.8465 29.5952C65.2656 30.866 61.0701 30.8629 58.4954 29.5952L52.2613 26.5257C49.6804 25.255 49.6867 23.1892 52.2613 21.9215L58.4954 18.852C61.0763 17.5813 65.2718 17.5843 67.8465 18.852L74.0805 21.9215ZM74.0805 43.4079C76.6614 44.6786 76.6552 46.7444 74.0805 48.0121L67.8465 51.0816C65.2656 52.3523 61.0701 52.3493 58.4954 51.0816L52.2613 48.0121C49.6804 46.7413 49.6867 44.6756 52.2613 43.4079L58.4954 40.3384C61.0763 39.0676 65.2718 39.0707 67.8465 40.3384L74.0805 43.4079ZM52.2613 32.6647C54.8422 33.9355 54.836 36.0012 52.2613 37.2689L46.0273 40.3384C43.4464 41.6091 39.2509 41.6061 36.6762 40.3384L30.4422 37.2689C27.8613 35.9981 27.8675 33.9324 30.4422 32.6647L36.6762 29.5952C39.2571 28.3244 43.4526 28.3275 46.0273 29.5952L52.2613 32.6647Z",
      fill: "#A9A9A9"
    }
  )
] });

const AgentNetworkCoinIcon = (props) => /* @__PURE__ */ jsxs("svg", { width: "126", height: "85", viewBox: "0 0 126 85", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M119.322 35.1641C119.322 50.36 94.1055 62.6787 62.9998 62.6787C31.894 62.6787 6.67773 50.36 6.67773 35.1641V49.8368C6.67773 65.0327 31.894 77.3514 62.9998 77.3514C94.1055 77.3514 119.322 65.0327 119.322 49.8368V35.1641Z",
      fill: "#2E2E2E",
      fillOpacity: "0.9"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M119.322 35.1641C119.322 50.36 94.1055 62.6787 62.9998 62.6787C31.894 62.6787 6.67773 50.36 6.67773 35.1641M119.322 35.1641C119.322 19.9681 94.1055 7.64941 62.9998 7.64941C31.894 7.64941 6.67773 19.9681 6.67773 35.1641M119.322 35.1641V49.8368C119.322 65.0327 94.1055 77.3514 62.9998 77.3514C31.894 77.3514 6.67773 65.0327 6.67773 49.8368V35.1641",
      stroke: "#424242"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      d: "M63.0002 0.96875C28.5152 0.96875 0.55957 15.6489 0.55957 33.7578V51.2433C0.55957 69.3522 28.5152 84.0323 63.0002 84.0323C97.4853 84.0323 125.441 69.3522 125.441 51.2433V33.7578C125.441 15.6489 97.4853 0.96875 63.0002 0.96875Z",
      stroke: "#707070"
    }
  ),
  /* @__PURE__ */ jsx("g", { clipPath: "url(#clip0_23333_14744)", children: /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M79.2946 17.9539C83.0143 19.7854 83.016 22.7559 79.2979 24.5879C77.0214 25.7087 73.8794 26.1385 70.9301 25.8878L67.5296 30.2202C68.0944 30.3987 68.6321 30.6075 69.1262 30.8507C71.0847 31.815 72.0009 33.0948 71.8979 34.3581L77.2504 35.1977C77.6452 34.8727 78.1174 34.5635 78.6856 34.2835C82.4066 32.4514 88.4403 32.4485 92.1623 34.2803C95.8842 36.1128 95.8805 39.0851 92.159 40.9175C88.4373 42.7488 82.4002 42.7513 78.679 40.9191C76.7415 39.9647 75.8248 38.7009 75.9073 37.4506L70.5219 36.6045C70.1354 36.9168 69.6777 37.2145 69.1295 37.4846C68.345 37.8708 67.4527 38.1705 66.5059 38.3939L67.9312 41.984C70.1507 42.0573 72.3276 42.5087 74.0244 43.3438C77.7444 45.1754 77.7467 48.1458 74.0277 49.9778C70.3071 51.8092 64.2712 51.8095 60.551 49.9778C56.8323 48.1459 56.8351 45.1755 60.5543 43.3438C61.3581 42.9482 62.2741 42.6414 63.247 42.4167L61.8282 38.8428C59.5803 38.7777 57.3696 38.3299 55.6527 37.4846C54.1264 36.7327 53.2395 35.7882 52.9666 34.8103L43.924 34.0469C43.4596 34.6259 42.7547 35.1702 41.8041 35.6385C38.0834 37.4696 32.0473 37.4701 28.3273 35.6385C24.6089 33.8068 24.6123 30.8363 28.3306 29.0046C32.0508 27.1737 38.0806 27.1737 41.8008 29.0046C43.3459 29.7653 44.2412 30.7224 44.5033 31.7129L53.5098 32.4747C53.9742 31.8832 54.6868 31.3279 55.656 30.8507C57.6687 29.8601 60.357 29.4079 62.9902 29.4892L66.5783 24.9218C66.3174 24.8179 66.0637 24.7073 65.8212 24.5879C62.1022 22.7559 62.1045 19.7856 65.8245 17.9539C69.5447 16.1235 75.5747 16.1232 79.2946 17.9539ZM38.4299 30.6643C36.5715 29.75 33.5599 29.75 31.7015 30.6643C29.8447 31.5793 29.8414 33.0638 31.6982 33.9788C33.5565 34.8938 36.5742 34.8933 38.4332 33.9788C40.2906 33.0635 40.2883 31.5793 38.4299 30.6643ZM70.6536 45.0035C68.7951 44.0893 65.7836 44.0893 63.9251 45.0035C62.0676 45.9185 62.0647 47.4029 63.9218 48.318C65.7804 49.2332 68.7979 49.2329 70.6569 48.3181C72.5142 47.4027 72.5119 45.9185 70.6536 45.0035ZM65.7553 32.5104C63.8969 31.5961 60.8853 31.5961 59.0269 32.5104C57.1685 33.4254 57.1662 34.9096 59.0236 35.8249C60.8824 36.7402 63.8998 36.7402 65.7586 35.8249C67.616 34.9096 67.6137 33.4254 65.7553 32.5104ZM88.7915 35.94C86.9338 35.0261 83.9184 35.0264 82.0564 35.9432C80.1965 36.8601 80.1945 38.3451 82.0498 39.2594C83.9067 40.1736 86.9255 40.1738 88.7882 39.2578C90.6507 38.3407 90.649 36.8546 88.7915 35.94ZM75.9238 19.6136C74.0656 18.6995 71.0538 18.6998 69.1953 19.6136C67.3369 20.5286 67.3347 22.0129 69.192 22.9282C71.0509 23.8434 74.0682 23.8434 75.9271 22.9282C77.7836 22.0128 77.7818 20.5285 75.9238 19.6136Z",
      fill: "#A9A9A9"
    }
  ) }),
  /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_23333_14744", children: /* @__PURE__ */ jsx(
    "rect",
    {
      width: "59.3185",
      height: "59.3185",
      fill: "white",
      transform: "matrix(0.897148 0.441731 -0.897148 0.441731 65.3042 6.51953)"
    }
  ) }) })
] });

function useCopyToClipboard({ text, copyMessage = "Copied to clipboard!" }) {
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef(null);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(copyMessage);
      setIsCopied(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      timeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2e3);
    }).catch(() => {
      toast.error("Failed to copy to clipboard.");
    });
  }, [text, copyMessage]);
  return { isCopied, handleCopy };
}

function CopyButton({ content, copyMessage, className }) {
  const { isCopied, handleCopy } = useCopyToClipboard({
    text: content,
    copyMessage
  });
  return /* @__PURE__ */ jsxs(
    Button$1,
    {
      variant: "ghost",
      size: "icon",
      className: cn("relative h-6 w-6", className),
      "aria-label": "Copy to clipboard",
      onClick: handleCopy,
      children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx(Check, { className: cn("h-4 w-4 transition-transform ease-in-out", isCopied ? "scale-100" : "scale-0") }) }),
        /* @__PURE__ */ jsx(Copy, { className: cn("h-4 w-4 transition-transform ease-in-out", isCopied ? "scale-0" : "scale-100") })
      ]
    }
  );
}

const useCodemirrorTheme$1 = () => {
  return useMemo(
    () => draculaInit({
      settings: {
        fontFamily: "var(--geist-mono)",
        fontSize: "0.8rem",
        lineHighlight: "transparent",
        gutterBackground: "transparent",
        background: "transparent",
        gutterForeground: "#939393"
      },
      styles: [{ tag: [tags.className, tags.propertyName] }]
    }),
    []
  );
};
const SyntaxHighlighter$2 = ({ data, className }) => {
  const formattedCode = JSON.stringify(data, null, 2);
  const theme = useCodemirrorTheme$1();
  return /* @__PURE__ */ jsxs("div", { className: clsx("rounded-md bg-surface4 p-1 font-mono relative", className), children: [
    /* @__PURE__ */ jsx(CopyButton, { content: formattedCode, className: "absolute top-2 right-2" }),
    /* @__PURE__ */ jsx(CodeMirror, { value: formattedCode, theme, extensions: [jsonLanguage] })
  ] });
};
async function highlight(code, language) {
  const { codeToTokens, bundledLanguages } = await import('shiki');
  if (!(language in bundledLanguages)) return null;
  const { tokens } = await codeToTokens(code, {
    lang: language,
    defaultColor: false,
    themes: {
      light: "github-light",
      dark: "github-dark"
    }
  });
  return tokens;
}

const ToolFallback$1 = ({ toolName, argsText, result }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  let argSlot;
  try {
    const parsedArgs = JSON.parse(argsText);
    argSlot = /* @__PURE__ */ jsx(SyntaxHighlighter$2, { data: parsedArgs });
  } catch {
    argSlot = /* @__PURE__ */ jsx("pre", { className: "whitespace-pre-wrap", children: argsText });
  }
  return /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
    /* @__PURE__ */ jsxs("button", { onClick: () => setIsCollapsed((s) => !s), className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: cn("transition-all", isCollapsed ? "rotate-90" : "rotate-180") }) }),
      /* @__PURE__ */ jsx(Badge$1, { icon: /* @__PURE__ */ jsx(ToolsIcon, { className: "text-[#ECB047]" }), children: toolName })
    ] }),
    !isCollapsed && /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxs("div", { className: "border-sm border-border1 rounded-lg bg-surface4", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-4 border-b-sm border-border1 py-2", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium pb-2", children: "Tool arguments" }),
        argSlot
      ] }),
      result !== void 0 && /* @__PURE__ */ jsxs("div", { className: "px-4 py-2", children: [
        /* @__PURE__ */ jsx("p", { className: "font-medium pb-2", children: "Tool result" }),
        typeof result === "string" ? /* @__PURE__ */ jsx("pre", { className: "whitespace-pre-wrap", children: result }) : /* @__PURE__ */ jsx(SyntaxHighlighter$2, { data: result })
      ] })
    ] }) })
  ] });
};

const Reasoning = ({ text }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "mb-2 space-y-2", children: [
    /* @__PURE__ */ jsxs("button", { onClick: () => setIsCollapsed((s) => !s), className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(ChevronUpIcon, { className: cn("transition-all", isCollapsed ? "rotate-90" : "rotate-180") }) }),
      /* @__PURE__ */ jsxs(Badge$1, { icon: /* @__PURE__ */ jsx(BrainIcon, {}), children: [
        isCollapsed ? "Show" : "Hide",
        " reasoning"
      ] })
    ] }),
    !isCollapsed ? /* @__PURE__ */ jsx("div", { className: "rounded-lg bg-surface4 p-2 border-sm border-border-1", children: /* @__PURE__ */ jsx("pre", { className: "whitespace-pre-wrap text-ui-sm leading-ui-sm text-icon6", children: text }) }) : null
  ] });
};

const AssistantMessage = ({ ToolFallback: ToolFallbackCustom }) => {
  const data = useMessage();
  const messageId = data.id;
  const isToolCallAndOrReasoning = data.content.every(({ type }) => type === "tool-call" || type === "reasoning");
  return /* @__PURE__ */ jsxs(MessagePrimitive.Root, { className: "max-w-full", "data-message-id": messageId, children: [
    /* @__PURE__ */ jsx("div", { className: "text-icon6 text-ui-lg leading-ui-lg", children: /* @__PURE__ */ jsx(
      MessagePrimitive.Content,
      {
        components: {
          Text: MarkdownText,
          tools: { Fallback: ToolFallbackCustom || ToolFallback$1 },
          Reasoning
        }
      }
    ) }),
    !isToolCallAndOrReasoning && /* @__PURE__ */ jsx("div", { className: "h-6 pt-1", children: /* @__PURE__ */ jsx(AssistantActionBar$1, {}) })
  ] });
};
const AssistantActionBar$1 = () => {
  return /* @__PURE__ */ jsxs(
    ActionBarPrimitive.Root,
    {
      hideWhenRunning: true,
      autohide: "always",
      autohideFloat: "single-branch",
      className: "flex gap-1 items-center transition-all relative",
      children: [
        /* @__PURE__ */ jsx(MessagePrimitive.If, { speaking: false, children: /* @__PURE__ */ jsx(ActionBarPrimitive.Speak, { asChild: true, children: /* @__PURE__ */ jsx(TooltipIconButton, { tooltip: "Read aloud", children: /* @__PURE__ */ jsx(AudioLinesIcon, {}) }) }) }),
        /* @__PURE__ */ jsx(MessagePrimitive.If, { speaking: true, children: /* @__PURE__ */ jsx(ActionBarPrimitive.StopSpeaking, { asChild: true, children: /* @__PURE__ */ jsx(TooltipIconButton, { tooltip: "Stop", children: /* @__PURE__ */ jsx(StopCircleIcon, {}) }) }) }),
        /* @__PURE__ */ jsx(ActionBarPrimitive.Copy, { asChild: true, children: /* @__PURE__ */ jsxs(TooltipIconButton, { tooltip: "Copy", className: "bg-transparent text-icon3 hover:text-icon6", children: [
          /* @__PURE__ */ jsx(MessagePrimitive.If, { copied: true, children: /* @__PURE__ */ jsx(CheckIcon$1, {}) }),
          /* @__PURE__ */ jsx(MessagePrimitive.If, { copied: false, children: /* @__PURE__ */ jsx(CopyIcon, {}) })
        ] }) })
      ]
    }
  );
};

const useFileSrc = (file) => {
  const [src, setSrc] = useState(void 0);
  useEffect(() => {
    if (!file) {
      setSrc(void 0);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setSrc(objectUrl);
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);
  return src;
};

const useAttachmentSrc = () => {
  const { file, src } = useAttachment(
    useShallow((a) => {
      if (a.type !== "image") return {};
      if (a.file) return { file: a.file };
      const src2 = a.content?.filter((c) => c.type === "image")[0]?.image;
      if (!src2) return {};
      return { src: src2 };
    })
  );
  return useFileSrc(file) ?? src;
};

const Dialog = DialogPrimitive.Root;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: clsx("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const PdfEntry = ({ data }) => {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { onClick: () => setOpen(true), className: "h-full w-full flex items-center justify-center", type: "button", children: /* @__PURE__ */ jsx(FileText, { className: "text-accent2" }) }),
    /* @__PURE__ */ jsx(PdfPreviewDialog, { data, open, onOpenChange: setOpen })
  ] });
};
const PdfPreviewDialog = ({ data, open, onOpenChange }) => {
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-4xl bg-surface2", children: /* @__PURE__ */ jsxs("div", { className: "h-full w-full", children: [
    /* @__PURE__ */ jsx(DialogTitle, { className: "pb-4", children: "PDF preview" }),
    open && /* @__PURE__ */ jsx("iframe", { src: data, width: "100%", height: "600px" })
  ] }) }) });
};
const ImageEntry = ({ src }) => {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { onClick: () => setOpen(true), type: "button", className: "h-full w-full flex items-center justify-center", children: /* @__PURE__ */ jsx("img", { src, className: "object-cover aspect-ratio max-h-[140px] max-w-[320px]", alt: "Preview" }) }),
    /* @__PURE__ */ jsx(ImagePreviewDialog, { src, open, onOpenChange: setOpen })
  ] });
};
const ImagePreviewDialog = ({ src, open, onOpenChange }) => {
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-4xl bg-surface2", children: /* @__PURE__ */ jsxs("div", { className: "h-full w-full", children: [
    /* @__PURE__ */ jsx(DialogTitle, { className: "pb-4", children: "Image preview" }),
    open && /* @__PURE__ */ jsx("img", { src, alt: "Image" })
  ] }) }) });
};
const TxtEntry = ({ data }) => {
  const [open, setOpen] = useState(false);
  const formattedContent = data.replace(/<attachment[^>]*>/, "").replace(/<\/attachment>/g, "");
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("button", { onClick: () => setOpen(true), className: "h-full w-full flex items-center justify-center", type: "button", children: /* @__PURE__ */ jsx(FileText, { className: "text-icon3" }) }),
    /* @__PURE__ */ jsx(TxtPreviewDialog, { data: formattedContent, open, onOpenChange: setOpen })
  ] });
};
const TxtPreviewDialog = ({ data, open, onOpenChange }) => {
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsx(DialogContent, { className: "max-w-4xl bg-surface2 h-[80vh] overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "h-full w-full", children: [
    /* @__PURE__ */ jsx(DialogTitle, { className: "pb-4", children: "Text preview" }),
    open && /* @__PURE__ */ jsx("div", { className: "whitespace-pre-wrap", children: data })
  ] }) }) });
};

const InMessageContextWrapper = () => {
  return /* @__PURE__ */ jsx(AttachmentPrimitive.Root, { className: "pt-4", children: /* @__PURE__ */ jsx("div", { className: "max-w-[366px] px-5 py-3 text-icon6 text-ui-lg leading-ui-lg rounded-lg bg-surface3", children: /* @__PURE__ */ jsx(InMessageAttachmentWrapper, {}) }) });
};
const InMessageAttachmentWrapper = () => {
  const src = useAttachmentSrc();
  const attachment = useAttachment((a) => a);
  if (attachment.type === "image") {
    return /* @__PURE__ */ jsx(
      InMessageAttachment,
      {
        type: "image",
        contentType: void 0,
        nameSlot: /* @__PURE__ */ jsx(AttachmentPrimitive.Name, {}),
        src,
        data: void 0
      }
    );
  }
  if (attachment.contentType === "application/pdf") {
    const pdfText = attachment.content?.[0]?.text;
    return /* @__PURE__ */ jsx(
      InMessageAttachment,
      {
        type: "document",
        contentType: attachment.contentType,
        nameSlot: /* @__PURE__ */ jsx(AttachmentPrimitive.Name, {}),
        src,
        data: `data:application/pdf;base64,${pdfText}`
      }
    );
  }
  return /* @__PURE__ */ jsx(
    InMessageAttachment,
    {
      type: attachment.type,
      contentType: attachment.contentType,
      nameSlot: /* @__PURE__ */ jsx(AttachmentPrimitive.Name, {}),
      src,
      data: attachment.content?.[0]?.text
    }
  );
};
const InMessageAttachment = ({ type, contentType, nameSlot, src, data }) => {
  return /* @__PURE__ */ jsx(TooltipProvider$1, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: "h-full w-full overflow-hidden rounded-lg", children: type === "image" ? /* @__PURE__ */ jsx(ImageEntry, { src: src ?? "" }) : type === "document" && contentType === "application/pdf" ? /* @__PURE__ */ jsx(PdfEntry, { data: data ?? "" }) : /* @__PURE__ */ jsx(TxtEntry, { data: data ?? "" }) }) }),
    /* @__PURE__ */ jsx(TooltipContent, { side: "top", children: nameSlot })
  ] }) });
};
const UserMessageAttachments = () => {
  return /* @__PURE__ */ jsx(MessagePrimitive.Attachments, { components: { Attachment: InMessageContextWrapper } });
};
const UserMessage = () => {
  const message = useMessage();
  const messageId = message?.id;
  return /* @__PURE__ */ jsxs(MessagePrimitive.Root, { className: "w-full flex items-end pb-4 flex-col", "data-message-id": messageId, children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-[366px] px-5 py-3 text-icon6 text-ui-lg leading-ui-lg rounded-lg bg-surface3", children: /* @__PURE__ */ jsx(
      MessagePrimitive.Content,
      {
        components: {
          File: (p) => {
            return /* @__PURE__ */ jsx(
              InMessageAttachment,
              {
                type: "document",
                contentType: p.mimeType,
                nameSlot: "Unknown filename",
                src: void 0,
                data: p.image
              }
            );
          },
          Image: (p) => {
            return /* @__PURE__ */ jsx(InMessageAttachment, { type: "image", nameSlot: "Unknown filename", src: p.image });
          },
          Text: (p) => {
            if (p.text.includes("<attachment name=")) {
              return /* @__PURE__ */ jsx(
                InMessageAttachment,
                {
                  type: "document",
                  contentType: "text/plain",
                  nameSlot: "Unknown filename",
                  src: void 0,
                  data: p.text
                }
              );
            }
            return p.text;
          }
        }
      }
    ) }),
    /* @__PURE__ */ jsx(UserMessageAttachments, {})
  ] });
};

const useAutoscroll = (ref, { enabled = true }) => {
  const shouldScrollRef = useRef(enabled);
  React__default.useEffect(() => {
    if (!enabled) return;
    if (!ref?.current) return;
    const area = ref.current;
    const observer = new MutationObserver(() => {
      if (shouldScrollRef.current) {
        area.scrollTo({ top: area.scrollHeight, behavior: "smooth" });
      }
    });
    observer.observe(area, {
      childList: true,
      // observe direct children changes
      subtree: true,
      // observe all descendants
      characterData: true
      // observe text content changes
    });
    const handleScroll = (e) => {
      const scrollElement = e.target;
      const currentPosition = scrollElement.scrollTop + scrollElement.clientHeight;
      const totalHeight = scrollElement.scrollHeight;
      const isAtEnd = currentPosition >= totalHeight - 1;
      if (isAtEnd) {
        shouldScrollRef.current = true;
      } else {
        shouldScrollRef.current = false;
      }
    };
    area.addEventListener("scroll", handleScroll);
    return () => {
      area.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [enabled, ref]);
};

const variants = {
  "header-md": "text-header-md leading-header-md",
  "ui-lg": "text-ui-lg leading-ui-lg",
  "ui-md": "text-ui-md leading-ui-md",
  "ui-sm": "text-ui-sm leading-ui-sm",
  "ui-xs": "text-ui-xs leading-ui-xs"
};
const fonts = {
  mono: "font-mono"
};
const Txt = ({ as: Root = "p", className, variant = "ui-md", font, ...props }) => {
  return /* @__PURE__ */ jsx(Root, { className: clsx(variants[variant], font && fonts[font], className), ...props });
};

async function recordMicrophoneToFile(onFinish) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream);
  let chunks = [];
  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };
  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: "audio/webm" });
    const file = new File([blob], `recording-${Date.now()}.webm`, {
      type: "audio/webm",
      lastModified: Date.now()
    });
    stream.getTracks().forEach((track) => track.stop());
    onFinish(file);
  };
  return mediaRecorder;
}

const useSpeechRecognition = ({
  language = "en-US",
  agentId
}) => {
  const client = useMastraClient();
  const [agent, setAgent] = useState(null);
  useEffect(() => {
    if (!agentId) return;
    const agent2 = client.getAgent(agentId);
    const check = async () => {
      try {
        await agent2.voice.getSpeakers();
        setAgent(agent2);
      } catch (error) {
        setAgent(null);
      }
    };
    check();
  }, [agentId]);
  const {
    start: startBrowser,
    stop: stopBrowser,
    isListening: isListeningBrowser,
    transcript: transcriptBrowser
  } = useBrowserSpeechRecognition({ language });
  const {
    start: startMastra,
    stop: stopMastra,
    isListening: isListeningMastra,
    transcript: transcriptMastra
  } = useMastraSpeechToText({ agent });
  if (!agent) {
    return {
      start: startBrowser,
      stop: stopBrowser,
      isListening: isListeningBrowser,
      transcript: transcriptBrowser
    };
  }
  return { start: startMastra, stop: stopMastra, isListening: isListeningMastra, transcript: transcriptMastra };
};
const useBrowserSpeechRecognition = ({ language = "en-US" }) => {
  const speechRecognitionRef = useRef(null);
  const [state, setState] = useState({
    isListening: false,
    transcript: "",
    error: null
  });
  const start = () => {
    if (!speechRecognitionRef.current) return;
    speechRecognitionRef.current.start();
  };
  const stop = () => {
    if (!speechRecognitionRef.current) return;
    speechRecognitionRef.current.stop();
  };
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      setState((prev) => ({ ...prev, error: "Speech Recognition not supported in this browser" }));
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    speechRecognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.lang = language;
    recognition.onstart = () => {
      setState((prev) => ({ ...prev, isListening: true }));
    };
    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        }
      }
      setState((prev) => ({ ...prev, transcript: finalTranscript }));
    };
    recognition.onerror = (event) => {
      setState((prev) => ({ ...prev, error: `Error: ${event.error}` }));
    };
    recognition.onend = () => setState((prev) => ({ ...prev, isListening: false }));
  }, [language]);
  return {
    ...state,
    start,
    stop
  };
};
const useMastraSpeechToText = ({ agent }) => {
  const [transcript, setTranscript] = useState("");
  const [recorder, setRecorder] = useState(null);
  if (!agent) {
    return {
      start: () => {
      },
      stop: () => {
      },
      isListening: false,
      transcript: ""
    };
  }
  const handleFinish = (file) => {
    agent.voice.listen(file).then((res) => {
      setTranscript(res.text);
    });
  };
  const start = () => {
    recordMicrophoneToFile(handleFinish).then((recorder2) => {
      setRecorder(recorder2);
      recorder2.start();
    });
  };
  const stop = () => {
    recorder?.stop();
    setRecorder(null);
  };
  return {
    start,
    stop,
    isListening: Boolean(recorder),
    transcript
  };
};

const useHasAttachments = () => {
  const composer = useComposerRuntime();
  const [hasAttachments, setHasAttachments] = useState(false);
  useEffect(() => {
    composer.subscribe(() => {
      const attachments = composer.getState().attachments;
      setHasAttachments(attachments.length > 0);
    });
  }, [composer]);
  return hasAttachments;
};

function Spinner({ color = "#fff", className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      className: cn("animate-spin duration-700", className),
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx("path", { d: "M21 12a9 9 0 1 1-6.219-8.56", stroke: color })
    }
  );
}

const useLoadBrowserFile = (file) => {
  const [state, setState] = useState({ isLoading: false, text: "" });
  useEffect(() => {
    if (!file) return;
    const run = async () => {
      setState((s) => ({ ...s, isLoading: true }));
      const text = await file.text();
      setState((s) => ({ ...s, isLoading: false, text }));
    };
    run();
  }, [file]);
  return state;
};

const fileToBase64 = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Failed to convert file to base64."));
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

const ComposerTxtAttachment = ({ document }) => {
  const { isLoading, text } = useLoadBrowserFile(document.file);
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-full w-full", children: isLoading ? /* @__PURE__ */ jsx(Spinner, { className: "animate-spin" }) : /* @__PURE__ */ jsx(TxtEntry, { data: text }) });
};
const ComposerPdfAttachment = ({ document }) => {
  const [state, setState] = useState({ isLoading: false, text: "" });
  useEffect(() => {
    let isCanceled = false;
    const run = async () => {
      if (!document.file) return;
      setState((s) => ({ ...s, isLoading: true }));
      const text = await fileToBase64(document.file);
      if (isCanceled) {
        return;
      }
      setState((s) => ({ ...s, isLoading: false, text }));
    };
    run();
    return () => {
      isCanceled = true;
    };
  }, [document]);
  return /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-full w-full", children: state.isLoading ? /* @__PURE__ */ jsx(Spinner, { className: "animate-spin" }) : /* @__PURE__ */ jsx(PdfEntry, { data: state.text }) });
};
const AttachmentThumbnail = () => {
  const isImage = useAttachment((a) => a.type === "image");
  const document = useAttachment((a) => a.type === "document" ? a : void 0);
  const src = useAttachmentSrc();
  const canRemove = useAttachment((a) => a.source !== "message");
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(TooltipProvider$1, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(AttachmentPrimitive.Root, { children: /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: "overflow-hidden size-16 rounded-lg bg-surface3 border-sm border-border1 ", children: isImage ? /* @__PURE__ */ jsx(ImageEntry, { src: src ?? "" }) : document?.contentType === "application/pdf" ? /* @__PURE__ */ jsx(ComposerPdfAttachment, { document }) : document ? /* @__PURE__ */ jsx(ComposerTxtAttachment, { document }) : null }) }) }),
      /* @__PURE__ */ jsx(TooltipContent, { side: "top", children: /* @__PURE__ */ jsx(AttachmentPrimitive.Name, {}) })
    ] }) }),
    canRemove && /* @__PURE__ */ jsx(AttachmentRemove, {})
  ] }) });
};
const AttachmentRemove = () => {
  return /* @__PURE__ */ jsx(AttachmentPrimitive.Remove, { asChild: true, children: /* @__PURE__ */ jsx(
    TooltipIconButton,
    {
      tooltip: "Remove file",
      className: "absolute -right-3 -top-3 text-icon3 hover:text-icon6 rounded-full bg-surface1 hover:bg-surface2 rounded-full p-1",
      side: "top",
      children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(CircleXIcon, {}) })
    }
  ) });
};
const ComposerAttachments = () => {
  const hasAttachments = useHasAttachments();
  if (!hasAttachments) return null;
  return /* @__PURE__ */ jsx("div", { className: "flex w-full flex-row items-center gap-4 pb-2", children: /* @__PURE__ */ jsx(ComposerPrimitive.Attachments, { components: { Attachment: AttachmentThumbnail } }) });
};

const Thread = ({ ToolFallback, agentName, agentId, hasMemory, onInputChange }) => {
  const areaRef = useRef(null);
  useAutoscroll(areaRef, { enabled: true });
  const WrappedAssistantMessage = (props) => {
    return /* @__PURE__ */ jsx(AssistantMessage, { ...props, ToolFallback });
  };
  return /* @__PURE__ */ jsxs(ThreadWrapper$1, { children: [
    /* @__PURE__ */ jsxs(ThreadPrimitive.Viewport, { ref: areaRef, autoScroll: false, className: "overflow-y-scroll scroll-smooth h-full", children: [
      /* @__PURE__ */ jsx(ThreadWelcome$1, { agentName }),
      /* @__PURE__ */ jsx("div", { className: "max-w-[568px] w-full mx-auto px-4 pb-7", children: /* @__PURE__ */ jsx(
        ThreadPrimitive.Messages,
        {
          components: {
            UserMessage,
            EditComposer: EditComposer$1,
            AssistantMessage: WrappedAssistantMessage
          }
        }
      ) }),
      /* @__PURE__ */ jsx(ThreadPrimitive.If, { empty: false, children: /* @__PURE__ */ jsx("div", {}) })
    ] }),
    /* @__PURE__ */ jsx(Composer$1, { hasMemory, onInputChange, agentId })
  ] });
};
const ThreadWrapper$1 = ({ children }) => {
  return /* @__PURE__ */ jsx(ThreadPrimitive.Root, { className: "grid grid-rows-[1fr_auto] h-full overflow-y-auto", children });
};
const ThreadWelcome$1 = ({ agentName }) => {
  const safeAgentName = agentName ?? "";
  const words = safeAgentName.split(" ") ?? [];
  let initials = "A";
  if (words.length === 2) {
    initials = `${words[0][0]}${words[1][0]}`;
  } else if (safeAgentName.length > 0) {
    initials = `${safeAgentName[0]}`;
  } else {
    initials = "A";
  }
  return /* @__PURE__ */ jsx(ThreadPrimitive.Empty, { children: /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-grow flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx(Avatar, { children: /* @__PURE__ */ jsx(AvatarFallback, { children: initials }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 font-medium", children: "How can I help you today?" })
  ] }) });
};
const Composer$1 = ({ hasMemory, onInputChange, agentId }) => {
  return /* @__PURE__ */ jsxs("div", { className: "mx-4", children: [
    /* @__PURE__ */ jsxs(ComposerPrimitive.Root, { children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-[568px] w-full mx-auto pb-2", children: /* @__PURE__ */ jsx(ComposerAttachments, {}) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-surface3 rounded-lg border-sm border-border1 py-4 mt-auto max-w-[568px] w-full mx-auto px-4", children: [
        /* @__PURE__ */ jsx(ComposerPrimitive.Input, { asChild: true, className: "w-full", children: /* @__PURE__ */ jsx(
          "textarea",
          {
            className: "text-ui-lg leading-ui-lg placeholder:text-icon3 text-icon6 bg-transparent focus:outline-none resize-none",
            autoFocus: true,
            placeholder: "Enter your message...",
            name: "",
            id: "",
            onChange: (e) => onInputChange?.(e.target.value)
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx(SpeechInput$1, { agentId }),
          /* @__PURE__ */ jsx(ComposerAction$1, {})
        ] })
      ] })
    ] }),
    !hasMemory && /* @__PURE__ */ jsxs(Txt, { variant: "ui-sm", className: "text-icon3 flex gap-2 pt-1 max-w-[568px] w-full mx-auto border-t items-start", children: [
      /* @__PURE__ */ jsx(Icon, { className: "transform translate-y-[0.1rem]", children: /* @__PURE__ */ jsx(InfoIcon, {}) }),
      "Memory is not enabled. The conversation will not be persisted."
    ] })
  ] });
};
const SpeechInput$1 = ({ agentId }) => {
  const composerRuntime = useComposerRuntime();
  const { start, stop, isListening, transcript } = useSpeechRecognition({ agentId });
  useEffect(() => {
    if (!transcript) return;
    composerRuntime.setText(transcript);
  }, [composerRuntime, transcript]);
  return /* @__PURE__ */ jsx(
    TooltipIconButton,
    {
      type: "button",
      tooltip: isListening ? "Stop dictation" : "Start dictation",
      variant: "ghost",
      className: "rounded-full",
      onClick: () => isListening ? stop() : start(),
      children: isListening ? /* @__PURE__ */ jsx(CircleStopIcon$1, {}) : /* @__PURE__ */ jsx(Mic, { className: "h-6 w-6 text-[#898989] hover:text-[#fff]" })
    }
  );
};
const ComposerAction$1 = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ComposerPrimitive.AddAttachment, { asChild: true, children: /* @__PURE__ */ jsx(TooltipIconButton, { tooltip: "Add attachment", variant: "ghost", className: "rounded-full", children: /* @__PURE__ */ jsx(PlusIcon, { className: "h-6 w-6 text-[#898989] hover:text-[#fff]" }) }) }),
    /* @__PURE__ */ jsx(ThreadPrimitive.If, { running: false, children: /* @__PURE__ */ jsx(ComposerPrimitive.Send, { asChild: true, children: /* @__PURE__ */ jsx(
      TooltipIconButton,
      {
        tooltip: "Send",
        variant: "default",
        className: "rounded-full border-sm border-[#363636] bg-[#292929]",
        children: /* @__PURE__ */ jsx(ArrowUp, { className: "h-6 w-6 text-[#898989] hover:text-[#fff]" })
      }
    ) }) }),
    /* @__PURE__ */ jsx(ThreadPrimitive.If, { running: true, children: /* @__PURE__ */ jsx(ComposerPrimitive.Cancel, { asChild: true, children: /* @__PURE__ */ jsx(TooltipIconButton, { tooltip: "Cancel", variant: "default", children: /* @__PURE__ */ jsx(CircleStopIcon$1, {}) }) }) })
  ] });
};
const EditComposer$1 = () => {
  return /* @__PURE__ */ jsxs(ComposerPrimitive.Root, { children: [
    /* @__PURE__ */ jsx(ComposerPrimitive.Input, {}),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(ComposerPrimitive.Cancel, { asChild: true, children: /* @__PURE__ */ jsx(Button$1, { variant: "ghost", children: "Cancel" }) }),
      /* @__PURE__ */ jsx(ComposerPrimitive.Send, { asChild: true, children: /* @__PURE__ */ jsx(Button$1, { children: "Send" }) })
    ] })
  ] });
};
const CircleStopIcon$1 = () => {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", fill: "currentColor", width: "16", height: "16", children: /* @__PURE__ */ jsx("rect", { width: "10", height: "10", x: "3", y: "3", rx: "2" }) });
};

function parseJsonString(jsonString) {
  try {
    return JSON.stringify(JSON.parse(jsonString), null, 2);
  } catch {
    return jsonString;
  }
}
function useAgentWorkingMemory(agentId, threadId, resourceId) {
  const client = useMastraClient();
  const [threadExists, setThreadExists] = useState(false);
  const [workingMemoryData, setWorkingMemoryData] = useState(null);
  const [workingMemorySource, setWorkingMemorySource] = useState("thread");
  const [workingMemoryFormat, setWorkingMemoryFormat] = useState("markdown");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      if (!agentId || !threadId) {
        setWorkingMemoryData(null);
        setIsLoading(false);
        return;
      }
      const res = await client.getWorkingMemory({ agentId, threadId, resourceId });
      const { workingMemory, source, workingMemoryTemplate, threadExists: threadExists2 } = res;
      setThreadExists(threadExists2);
      setWorkingMemoryData(workingMemory);
      setWorkingMemorySource(source);
      setWorkingMemoryFormat(workingMemoryTemplate?.format || "markdown");
      if (workingMemoryTemplate?.format === "json") {
        let dataToSet = "";
        if (workingMemory) {
          dataToSet = parseJsonString(workingMemory);
        } else if (workingMemoryTemplate?.content) {
          dataToSet = parseJsonString(workingMemoryTemplate.content);
        } else {
          dataToSet = "";
        }
        setWorkingMemoryData(dataToSet);
      } else {
        setWorkingMemoryData(workingMemory || workingMemoryTemplate?.content || "");
      }
    } catch (error) {
      setWorkingMemoryData(null);
      console.error("Error fetching working memory", error);
    } finally {
      setIsLoading(false);
    }
  }, [agentId, threadId, resourceId]);
  useEffect(() => {
    refetch();
  }, [refetch]);
  const updateWorkingMemory = async (newMemory) => {
    setIsUpdating(true);
    try {
      if (workingMemoryFormat === "json") {
        try {
          JSON.parse(newMemory);
        } catch (e) {
          throw new Error("Invalid JSON working memory");
        }
      }
      await client.updateWorkingMemory({ agentId, threadId, workingMemory: newMemory, resourceId });
      refetch();
    } catch (error) {
      console.error("Error updating working memory", error);
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };
  return {
    threadExists,
    workingMemoryData,
    workingMemorySource,
    workingMemoryFormat,
    isLoading,
    isUpdating,
    refetch,
    updateWorkingMemory
  };
}

const WorkingMemoryContext = createContext({
  threadExists: false,
  workingMemoryData: null,
  workingMemorySource: "thread",
  isLoading: false,
  isUpdating: false,
  updateWorkingMemory: () => Promise.resolve(),
  refetch: () => Promise.resolve()
});
function WorkingMemoryProvider({ agentId, threadId, resourceId, children }) {
  const value = useAgentWorkingMemory(agentId, threadId, resourceId);
  return /* @__PURE__ */ jsx(WorkingMemoryContext.Provider, { value, children });
}
function useWorkingMemory() {
  const ctx = useContext(WorkingMemoryContext);
  if (!ctx) throw new Error("useWorkingMemory must be used within a WorkingMemoryProvider");
  return ctx;
}

class VoiceAttachmentAdapter {
  constructor(agent) {
    this.agent = agent;
  }
  speak(text) {
    let _cleanup = () => {
    };
    const handleEnd = (reason, error) => {
      if (res.status.type === "ended") return;
      res.status = { type: "ended", reason, error };
      _cleanup();
    };
    const res = {
      status: { type: "running" },
      cancel: () => {
        handleEnd("cancelled");
      },
      subscribe: (callback) => {
        this.agent.voice.speak(text).then((res2) => {
          if (res2) {
            return res2.body;
          }
        }).then((readableStream) => {
          if (readableStream) {
            return playStreamWithWebAudio(readableStream);
          }
        }).then((cleanup) => {
          if (cleanup) {
            _cleanup = cleanup;
          }
          callback();
        }).catch((error) => {
          handleEnd("error", error);
        });
        return () => {
        };
      }
    };
    return res;
  }
}
async function playStreamWithWebAudio(stream) {
  const audioContext = new window.AudioContext();
  const reader = stream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const combinedBuffer = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    combinedBuffer.set(chunk, offset);
    offset += chunk.length;
  }
  const audioBuffer = await audioContext.decodeAudioData(combinedBuffer.buffer);
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start();
  return () => {
    source.stop();
    audioContext.close();
  };
}

class PDFAttachmentAdapter {
  accept = "application/pdf";
  async add({ file }) {
    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("PDF size exceeds 20MB limit");
    }
    return {
      id: crypto.randomUUID(),
      type: "document",
      name: file.name,
      file,
      status: {
        type: "running",
        reason: "uploading",
        progress: 0
      },
      contentType: "application/pdf"
    };
  }
  async send(attachment) {
    const base64Data = await this.fileToBase64(attachment.file);
    return {
      id: attachment.id,
      type: "document",
      name: attachment.name,
      content: [
        {
          type: "text",
          text: base64Data
        }
      ],
      status: { type: "complete" },
      contentType: "application/pdf"
    };
  }
  async remove(attachment) {
  }
  async fileToBase64(file) {
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    let binary = "";
    bytes.forEach((byte) => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  }
  // Optional: Extract text from PDF using a library like pdf.js
  async extractTextFromPDF(file) {
    return "Extracted PDF text content";
  }
}

const useAdapters = (agentId) => {
  const [isReady, setIsReady] = useState(false);
  const [speechAdapter, setSpeechAdapter] = useState(void 0);
  const baseClient = useMastraClient();
  useEffect(() => {
    const check = async () => {
      const agent = baseClient.getAgent(agentId);
      try {
        await agent.voice.getSpeakers();
        setSpeechAdapter(new VoiceAttachmentAdapter(agent));
        setIsReady(true);
      } catch {
        setSpeechAdapter(new WebSpeechSynthesisAdapter());
        setIsReady(true);
      }
    };
    check();
  }, [agentId]);
  return {
    isReady,
    adapters: {
      attachments: new CompositeAttachmentAdapter([
        new SimpleImageAttachmentAdapter(),
        new SimpleTextAttachmentAdapter(),
        new PDFAttachmentAdapter()
      ]),
      speech: speechAdapter
    }
  };
};

const convertMessage$2 = (message) => {
  return message;
};
const handleFinishReason = (finishReason) => {
  switch (finishReason) {
    case "tool-calls":
      throw new Error("Stream finished with reason tool-calls, try increasing maxSteps");
  }
};
const convertToAIAttachments = async (attachments) => {
  const promises = attachments.filter((attachment) => attachment.type === "image" || attachment.type === "document").map(async (attachment) => {
    if (attachment.type === "document") {
      if (attachment.contentType === "application/pdf") {
        const pdfText = attachment.content?.[0]?.text || "";
        return {
          role: "user",
          content: [
            {
              type: "file",
              data: `data:application/pdf;base64,${pdfText}`,
              mimeType: attachment.contentType,
              filename: attachment.name
            }
          ]
        };
      }
      return {
        role: "user",
        // @ts-expect-error - TODO: fix this type issue somehow
        content: attachment.content[0]?.text || ""
      };
    }
    return {
      role: "user",
      content: [
        {
          type: "image",
          image: await fileToBase64(attachment.file),
          mimeType: attachment.file.type
        }
      ]
    };
  });
  return Promise.all(promises);
};
function MastraRuntimeProvider({
  children,
  agentId,
  initialMessages,
  memory,
  threadId,
  refreshThreadList,
  settings,
  runtimeContext
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentThreadId, setCurrentThreadId] = useState(threadId);
  const { refetch: refreshWorkingMemory } = useWorkingMemory();
  const abortControllerRef = useRef(null);
  const {
    frequencyPenalty,
    presencePenalty,
    maxRetries,
    maxSteps,
    maxTokens,
    temperature,
    topK,
    topP,
    instructions,
    chatWithGenerate,
    providerOptions
  } = settings?.modelSettings ?? {};
  const toolCallIdToName = useRef({});
  const runtimeContextInstance = new RuntimeContext$1();
  Object.entries(runtimeContext ?? {}).forEach(([key, value]) => {
    runtimeContextInstance.set(key, value);
  });
  useEffect(() => {
    const hasNewInitialMessages = initialMessages && initialMessages?.length > messages?.length;
    if (messages.length === 0 || currentThreadId !== threadId || hasNewInitialMessages && currentThreadId === threadId) {
      if (initialMessages && threadId && memory) {
        const convertedMessages = initialMessages?.map((message) => {
          const attachmentsAsContentParts = (message.experimental_attachments || []).map((image) => ({
            type: image.contentType.startsWith(`image/`) ? "image" : image.contentType.startsWith(`audio/`) ? "audio" : "file",
            mimeType: image.contentType,
            image: image.url
          }));
          const formattedParts = (message.parts || []).map((part) => {
            if (part.type === "reasoning") {
              return {
                type: "reasoning",
                text: part.reasoning || part?.details?.filter((detail) => detail.type === "text")?.map((detail) => detail.text).join(" ")
              };
            }
            if (part.type === "tool-invocation") {
              if (part.toolInvocation.state === "result") {
                return {
                  type: "tool-call",
                  toolCallId: part.toolInvocation.toolCallId,
                  toolName: part.toolInvocation.toolName,
                  args: part.toolInvocation.args,
                  result: part.toolInvocation.result
                };
              }
            }
            if (part.type === "file") {
              return {
                type: "file",
                mimeType: part.mimeType,
                data: part.data
              };
            }
            if (part.type === "text") {
              return {
                type: "text",
                text: part.text
              };
            }
          }).filter(Boolean);
          return {
            ...message,
            content: [...formattedParts, ...attachmentsAsContentParts]
          };
        }).filter(Boolean);
        setMessages(convertedMessages);
        setCurrentThreadId(threadId);
      }
    }
  }, [initialMessages, threadId, memory]);
  const baseClient = useMastraClient();
  const onNew = async (message) => {
    if (message.content[0]?.type !== "text") throw new Error("Only text messages are supported");
    const attachments = await convertToAIAttachments(message.attachments);
    const input = message.content[0].text;
    setMessages((currentConversation) => [
      ...currentConversation,
      { role: "user", content: input, attachments: message.attachments }
    ]);
    setIsRunning(true);
    const controller = new AbortController();
    abortControllerRef.current = controller;
    const clientWithAbort = new MastraClient({
      ...baseClient.options,
      abortSignal: controller.signal
    });
    const agent = clientWithAbort.getAgent(agentId);
    try {
      if (chatWithGenerate) {
        const generateResponse = await agent.generate({
          messages: [
            {
              role: "user",
              content: input
            },
            ...attachments
          ],
          runId: agentId,
          frequencyPenalty,
          presencePenalty,
          maxRetries,
          maxSteps,
          maxTokens,
          temperature,
          topK,
          topP,
          instructions,
          runtimeContext: runtimeContextInstance,
          ...memory ? { threadId, resourceId: agentId } : {},
          providerOptions
        });
        if (generateResponse.response && "messages" in generateResponse.response) {
          const latestMessage = generateResponse.response.messages.reduce(
            (acc, message2) => {
              const _content = Array.isArray(acc.content) ? acc.content : [];
              if (typeof message2.content === "string") {
                return {
                  ...acc,
                  content: [
                    ..._content,
                    ...generateResponse.reasoning ? [{ type: "reasoning", text: generateResponse.reasoning }] : [],
                    {
                      type: "text",
                      text: message2.content
                    }
                  ]
                };
              }
              if (message2.role === "assistant") {
                const toolCallContent = Array.isArray(message2.content) ? message2.content.find((content) => content.type === "tool-call") : void 0;
                const reasoningContent = Array.isArray(message2.content) ? message2.content.find((content) => content.type === "reasoning") : void 0;
                if (toolCallContent) {
                  const newContent = _content.map((c) => {
                    if (c.type === "tool-call" && c.toolCallId === toolCallContent?.toolCallId) {
                      return { ...c, ...toolCallContent };
                    }
                    return c;
                  });
                  const containsToolCall = newContent.some((c) => c.type === "tool-call");
                  return {
                    ...acc,
                    content: containsToolCall ? [...reasoningContent ? [reasoningContent] : [], ...newContent] : [..._content, ...reasoningContent ? [reasoningContent] : [], toolCallContent]
                  };
                }
                const textContent = Array.isArray(message2.content) ? message2.content.find((content) => content.type === "text" && content.text) : void 0;
                if (textContent) {
                  return {
                    ...acc,
                    content: [..._content, ...reasoningContent ? [reasoningContent] : [], textContent]
                  };
                }
              }
              if (message2.role === "tool") {
                const toolResult = Array.isArray(message2.content) ? message2.content.find((content) => content.type === "tool-result") : void 0;
                if (toolResult) {
                  const newContent = _content.map((c) => {
                    if (c.type === "tool-call" && c.toolCallId === toolResult?.toolCallId) {
                      return { ...c, result: toolResult.result };
                    }
                    return c;
                  });
                  const containsToolCall = newContent.some((c) => c.type === "tool-call");
                  return {
                    ...acc,
                    content: containsToolCall ? newContent : [
                      ..._content,
                      { type: "tool-result", toolCallId: toolResult.toolCallId, result: toolResult.result }
                    ]
                  };
                }
                return {
                  ...acc,
                  content: [..._content, toolResult]
                };
              }
              return acc;
            },
            { role: "assistant", content: [] }
          );
          setMessages((currentConversation) => [...currentConversation, latestMessage]);
          handleFinishReason(generateResponse.finishReason);
        }
      } else {
        let updater = function() {
          setMessages((currentConversation) => {
            const message2 = {
              role: "assistant",
              content: [{ type: "text", text: content }]
            };
            if (!assistantMessageAdded) {
              assistantMessageAdded = true;
              if (assistantToolCallAddedForUpdater) {
                assistantToolCallAddedForUpdater = false;
              }
              return [...currentConversation, message2];
            }
            if (assistantToolCallAddedForUpdater) {
              assistantToolCallAddedForUpdater = false;
              return [...currentConversation, message2];
            }
            return [...currentConversation.slice(0, -1), message2];
          });
        };
        const response = await agent.stream({
          messages: [
            {
              role: "user",
              content: input
            },
            ...attachments
          ],
          runId: agentId,
          frequencyPenalty,
          presencePenalty,
          maxRetries,
          maxSteps,
          maxTokens,
          temperature,
          topK,
          topP,
          instructions,
          runtimeContext: runtimeContextInstance,
          ...memory ? { threadId, resourceId: agentId } : {},
          providerOptions
        });
        if (!response.body) {
          throw new Error("No response body");
        }
        let content = "";
        let assistantMessageAdded = false;
        let assistantToolCallAddedForUpdater = false;
        let assistantToolCallAddedForContent = false;
        await response.processDataStream({
          onTextPart(value) {
            if (assistantToolCallAddedForContent) {
              assistantToolCallAddedForContent = false;
              content = value;
            } else {
              content += value;
            }
            updater();
          },
          async onToolCallPart(value) {
            setMessages((currentConversation) => {
              const lastMessage = currentConversation[currentConversation.length - 1];
              if (lastMessage && lastMessage.role === "assistant") {
                const updatedMessage = {
                  ...lastMessage,
                  content: Array.isArray(lastMessage.content) ? [
                    ...lastMessage.content,
                    {
                      type: "tool-call",
                      toolCallId: value.toolCallId,
                      toolName: value.toolName,
                      args: value.args
                    }
                  ] : [
                    ...typeof lastMessage.content === "string" ? [{ type: "text", text: lastMessage.content }] : [],
                    {
                      type: "tool-call",
                      toolCallId: value.toolCallId,
                      toolName: value.toolName,
                      args: value.args
                    }
                  ]
                };
                assistantToolCallAddedForUpdater = true;
                assistantToolCallAddedForContent = true;
                return [...currentConversation.slice(0, -1), updatedMessage];
              }
              const newMessage = {
                role: "assistant",
                content: [
                  { type: "text", text: content },
                  {
                    type: "tool-call",
                    toolCallId: value.toolCallId,
                    toolName: value.toolName,
                    args: value.args
                  }
                ]
              };
              assistantToolCallAddedForUpdater = true;
              assistantToolCallAddedForContent = true;
              return [...currentConversation, newMessage];
            });
            toolCallIdToName.current[value.toolCallId] = value.toolName;
          },
          async onToolResultPart(value) {
            setMessages((currentConversation) => {
              const lastMessage = currentConversation[currentConversation.length - 1];
              if (lastMessage && lastMessage.role === "assistant" && Array.isArray(lastMessage.content)) {
                const updatedContent = lastMessage.content.map((part) => {
                  if (typeof part === "object" && part.type === "tool-call" && part.toolCallId === value.toolCallId) {
                    return {
                      ...part,
                      result: value.result
                    };
                  }
                  return part;
                });
                const updatedMessage = {
                  ...lastMessage,
                  content: updatedContent
                };
                return [...currentConversation.slice(0, -1), updatedMessage];
              }
              return currentConversation;
            });
            try {
              const toolName = toolCallIdToName.current[value.toolCallId];
              if (toolName === "updateWorkingMemory" && value.result?.success) {
                await refreshWorkingMemory?.();
              }
            } finally {
              delete toolCallIdToName.current[value.toolCallId];
            }
          },
          onErrorPart(error) {
            throw new Error(error);
          },
          onFinishMessagePart({ finishReason }) {
            handleFinishReason(finishReason);
          },
          onReasoningPart(value) {
            setMessages((currentConversation) => {
              const lastMessage = currentConversation[currentConversation.length - 1];
              if (lastMessage && lastMessage.role === "assistant" && Array.isArray(lastMessage.content)) {
                const updatedContent = lastMessage.content.map((part) => {
                  if (typeof part === "object" && part.type === "reasoning") {
                    return {
                      ...part,
                      text: part.text + value
                    };
                  }
                  return part;
                });
                const updatedMessage = {
                  ...lastMessage,
                  content: updatedContent
                };
                return [...currentConversation.slice(0, -1), updatedMessage];
              }
              const newMessage = {
                role: "assistant",
                content: [
                  {
                    type: "reasoning",
                    text: value
                  },
                  { type: "text", text: content }
                ]
              };
              return [...currentConversation, newMessage];
            });
          }
        });
      }
      setIsRunning(false);
      setTimeout(() => {
        refreshThreadList?.();
      }, 500);
    } catch (error) {
      console.error("Error occurred in MastraRuntimeProvider", error);
      setIsRunning(false);
      if (error.name === "AbortError") {
        return;
      }
      setMessages((currentConversation) => [
        ...currentConversation,
        { role: "assistant", content: [{ type: "text", text: `${error}` }] }
      ]);
    } finally {
      abortControllerRef.current = null;
    }
  };
  const onCancel = async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsRunning(false);
    }
  };
  const { adapters, isReady } = useAdapters(agentId);
  const runtime = useExternalStoreRuntime({
    isRunning,
    messages,
    convertMessage: convertMessage$2,
    onNew,
    onCancel,
    adapters: isReady ? adapters : void 0
  });
  if (!isReady) return null;
  return /* @__PURE__ */ jsxs(AssistantRuntimeProvider, { runtime, children: [
    " ",
    children,
    " "
  ] });
}

const defaultSettings = {
  modelSettings: {
    maxRetries: 2,
    maxSteps: 5,
    temperature: 0.5,
    topP: 1,
    chatWithGenerate: false
  }
};
function useAgentSettingsState({ agentId }) {
  const [settings, setSettingsState] = useState(void 0);
  const LOCAL_STORAGE_KEY = `mastra-agent-store-${agentId}`;
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setSettingsState(parsed ?? void 0);
      }
    } catch (e) {
      console.error(e);
    }
  }, [LOCAL_STORAGE_KEY]);
  const setSettings = (settingsValue) => {
    setSettingsState((prev) => ({ ...prev, ...settingsValue }));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...settingsValue, agentId }));
  };
  const resetAll = () => {
    setSettingsState(defaultSettings);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultSettings));
  };
  return {
    settings,
    setSettings,
    resetAll
  };
}

const AgentSettingsContext = createContext({});
function AgentSettingsProvider({ children, agentId }) {
  const { settings, setSettings, resetAll } = useAgentSettingsState({
    agentId
  });
  return /* @__PURE__ */ jsx(
    AgentSettingsContext.Provider,
    {
      value: {
        settings,
        setSettings,
        resetAll
      },
      children
    }
  );
}
const useAgentSettings = () => {
  return useContext(AgentSettingsContext);
};

const usePlaygroundStore = create()(
  persist(
    (set) => ({
      runtimeContext: {},
      setRuntimeContext: (runtimeContext) => set({ runtimeContext })
    }),
    {
      name: "mastra-playground-store"
    }
  )
);

const AgentChat = ({
  agentId,
  agentName,
  threadId,
  initialMessages,
  memory,
  refreshThreadList,
  onInputChange
}) => {
  const { settings } = useAgentSettings();
  const { runtimeContext } = usePlaygroundStore();
  return /* @__PURE__ */ jsx(
    MastraRuntimeProvider,
    {
      agentId,
      agentName,
      threadId,
      initialMessages,
      memory,
      refreshThreadList,
      settings,
      runtimeContext,
      children: /* @__PURE__ */ jsx(Thread, { agentName: agentName ?? "", hasMemory: memory, onInputChange, agentId })
    }
  );
};

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}

function CopyableContent({ content, label, multiline = false }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
  };
  return /* @__PURE__ */ jsxs("div", { className: "group relative flex items-start gap-2", children: [
    /* @__PURE__ */ jsx("span", { className: cn("text-sm text-mastra-el-4", multiline ? "whitespace-pre-wrap" : "truncate"), children: content }),
    /* @__PURE__ */ jsx(
      Button$1,
      {
        variant: "ghost",
        size: "sm",
        className: "opacity-0 group-hover:opacity-100 transition-opacity shrink-0 -mt-1",
        onClick: (e) => {
          e.stopPropagation();
          handleCopy();
        },
        "aria-label": `Copy ${label}`,
        children: /* @__PURE__ */ jsx(Copy, { className: "h-3 w-3" })
      }
    )
  ] });
}

function FormattedDate({ date }) {
  const formattedDate = {
    relativeTime: formatDistanceToNow(new Date(date), { addSuffix: true }),
    fullDate: format(new Date(date), "PPpp")
  };
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { className: "text-left text-sm text-mastra-el-4", children: formattedDate.relativeTime }),
    /* @__PURE__ */ jsx(TooltipContent, { className: "bg-mastra-bg-1 text-mastra-el-1", children: /* @__PURE__ */ jsx("p", { className: "text-sm", children: formattedDate.fullDate }) })
  ] }) });
}

const inputVariants = cva(
  "flex w-full text-icon6 rounded-lg border bg-transparent shadow-sm focus-visible:ring-ring transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-sm border-border1 placeholder:text-icon3",
        filled: "border-sm bg-inputFill border-border1 placeholder:text-icon3",
        unstyled: "border-0 bg-transparent placeholder:text-icon3 focus-visible:ring-transparent focus-visible:outline-none"
      },
      customSize: {
        default: "px-[13px] text-[calc(13_/_16_*_1rem)] h-8",
        sm: "h-[30px] px-[13px] text-xs",
        lg: "h-10 px-[17px] text-[calc(13_/_16_*_1rem)]"
      }
    },
    defaultVariants: {
      variant: "default",
      customSize: "default"
    }
  }
);
const Input = React.forwardRef(
  ({ className, customSize, testId, variant, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: clsx(className, inputVariants({ variant, customSize, className })),
        "data-testid": testId,
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

function ScoreIndicator({ score }) {
  return /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: score.toFixed(2) });
}

const Table$1 = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("table", { ref, className: cn("w-full caption-bottom text-sm border-spacing-0", className), ...props })
);
Table$1.displayName = "Table";
const TableHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("thead", { ref, className: cn("[&_tr]:border-b-[0.5px]", className), ...props })
);
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tbody", { ref, className: cn("[&_tr:last-child]:border-0", className), ...props })
);
TableBody.displayName = "TableBody";
const TableFooter = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("tfoot", { ref, className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className), ...props })
);
TableFooter.displayName = "TableFooter";
const TableRow = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "tr",
    {
      ref,
      className: cn(
        "border-b-[0.5px] border-mastra-border-1 transition-colors hover:bg-muted/50 data-[state=selected]:bg-mastra-bg-4/70",
        className
      ),
      ...props
    }
  )
);
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx(
    "th",
    {
      ref,
      className: cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className
      ),
      ...props
    }
  )
);
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("td", { ref, className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className), ...props })
);
TableCell.displayName = "TableCell";
const TableCaption = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("caption", { ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props })
);
TableCaption.displayName = "TableCaption";

const Tabs = TabsPrimitive.Root;
const TabsList = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.List,
  {
    ref,
    className: clsx("bg-muted text-muted-foreground inline-flex items-center bg-transparent", className),
    ...props
  }
));
TabsList.displayName = TabsPrimitive.List.displayName;
const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Trigger,
  {
    ref,
    className: cn(
      "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground whitespace-nowrap focus-visible:outline-none text-ui-lg text-icon3 -mb-[0.5px] inline-flex items-center justify-center border-b-2 border-transparent p-3 font-medium focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border-b-2 data-[state=active]:border-white data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;
const TabsContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  TabsPrimitive.Content,
  {
    ref,
    className: cn(
      "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

const PlaygroundTabs = ({
  children,
  defaultTab,
  value,
  onValueChange,
  className
}) => {
  const [internalTab, setInternalTab] = useState(defaultTab);
  const isControlled = value !== void 0 && onValueChange !== void 0;
  const currentTab = isControlled ? value : internalTab;
  const handleTabChange = (newValue) => {
    const typedValue = newValue;
    if (isControlled) {
      onValueChange(typedValue);
    } else {
      setInternalTab(typedValue);
    }
  };
  return /* @__PURE__ */ jsx(Tabs, { value: currentTab, onValueChange: handleTabChange, className: cn("h-full", className), children });
};
const TabList = ({ children, className }) => {
  return /* @__PURE__ */ jsx("div", { className: cn("w-full overflow-x-auto", className), children: /* @__PURE__ */ jsx(TabsList, { className: "border-b border-border1 flex min-w-full shrink-0", children }) });
};
const Tab = ({ children, value, onClick }) => {
  return /* @__PURE__ */ jsx(
    TabsTrigger,
    {
      value,
      className: "text-xs p-3 text-mastra-el-3 data-[state=active]:text-mastra-el-5 data-[state=active]:border-b-2 whitespace-nowrap flex-shrink-0",
      onClick,
      children
    }
  );
};
const TabContent = ({ children, value }) => {
  return /* @__PURE__ */ jsx(TabsContent, { value, className: "h-full overflow-hidden flex flex-col", children });
};

const scrollableContentClass = cn(
  "relative overflow-y-auto overflow-x-hidden invisible hover:visible focus:visible",
  "[&::-webkit-scrollbar]:w-1",
  "[&::-webkit-scrollbar-track]:bg-transparent",
  "[&::-webkit-scrollbar-thumb]:rounded-full",
  "[&::-webkit-scrollbar-thumb]:bg-mastra-border/20",
  "[&>*]:visible"
);
cn(
  "px-4 py-2 text-sm transition-all border-b-2 border-transparent",
  "data-[state=active]:border-white data-[state=active]:text-white font-medium",
  "data-[state=inactive]:text-mastra-el-4 hover:data-[state=inactive]:text-mastra-el-2",
  "focus-visible:outline-none"
);
cn("data-[state=inactive]:mt-0 min-h-0 h-full grid grid-rows-[1fr]");
function AgentEvals({ liveEvals, ciEvals, onRefetchLiveEvals, onRefetchCiEvals }) {
  const [activeTab, setActiveTab] = useState("live");
  function handleRefresh() {
    if (activeTab === "live") return onRefetchLiveEvals();
    return onRefetchCiEvals();
  }
  return /* @__PURE__ */ jsxs(PlaygroundTabs, { defaultTab: "live", children: [
    /* @__PURE__ */ jsxs(TabList, { children: [
      /* @__PURE__ */ jsx(Tab, { value: "live", children: "Live" }),
      /* @__PURE__ */ jsx(Tab, { value: "ci", children: "CI" })
    ] }),
    /* @__PURE__ */ jsx(TabContent, { value: "live", children: /* @__PURE__ */ jsx(EvalTable, { evals: liveEvals, isCIMode: false, onRefresh: handleRefresh }) }),
    /* @__PURE__ */ jsx(TabContent, { value: "ci", children: /* @__PURE__ */ jsx(EvalTable, { evals: ciEvals, isCIMode: true, onRefresh: handleRefresh }) })
  ] });
}
function EvalTable({ evals, isCIMode = false, onRefresh }) {
  const [expandedMetrics, setExpandedMetrics] = useState(/* @__PURE__ */ new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ field: "metricName", direction: "asc" });
  return /* @__PURE__ */ jsxs("div", { className: "min-h-0 grid grid-rows-[auto_1fr]", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 p-4 rounded-lg", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-mastra-el-3" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "search-input",
            placeholder: "Search metrics, inputs, or outputs...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "pl-10"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
        evals.length,
        " Total Evaluations"
      ] }),
      /* @__PURE__ */ jsx(Button$1, { variant: "ghost", size: "icon", onClick: onRefresh, className: "h-9 w-9", children: /* @__PURE__ */ jsx(RefreshCcwIcon, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-auto", children: /* @__PURE__ */ jsxs(Table$1, { className: "w-full", children: [
      /* @__PURE__ */ jsx(TableHeader, { className: "bg-mastra-bg-2 h-[var(--table-header-height)] sticky top-0 z-10", children: /* @__PURE__ */ jsxs(TableRow, { className: "border-gray-6 border-b-[0.1px] text-[0.8125rem]", children: [
        /* @__PURE__ */ jsx(TableHead, { className: "w-12 h-12" }),
        /* @__PURE__ */ jsx(
          TableHead,
          {
            className: "min-w-[200px] max-w-[30%] text-mastra-el-3 cursor-pointer",
            onClick: () => toggleSort("metricName"),
            children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              "Metric ",
              getSortIcon("metricName")
            ] })
          }
        ),
        /* @__PURE__ */ jsx(TableHead, { className: "flex-1 text-mastra-el-3" }),
        /* @__PURE__ */ jsx(TableHead, { className: "w-48 text-mastra-el-3 cursor-pointer", onClick: () => toggleSort("averageScore"), children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          "Average Score ",
          getSortIcon("averageScore")
        ] }) }),
        /* @__PURE__ */ jsx(TableHead, { className: "w-48 text-mastra-el-3", children: "Evaluations" })
      ] }) }),
      /* @__PURE__ */ jsx(TableBody, { className: "border-b border-gray-6 relative", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", presenceAffectsLayout: false, children: groupEvals(evals).length === 0 ? /* @__PURE__ */ jsxs(TableRow, { children: [
        /* @__PURE__ */ jsx(TableCell, { className: "h-12 w-16" }),
        /* @__PURE__ */ jsx(TableCell, { colSpan: 4, className: "h-32 px-4 text-center text-mastra-el-3", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
          /* @__PURE__ */ jsx(Search, { className: "size-5" }),
          /* @__PURE__ */ jsx("p", { children: "No evaluations found" }),
          searchTerm && /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Try adjusting your search terms" })
        ] }) })
      ] }) : groupEvals(evals).map((group) => /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
        /* @__PURE__ */ jsxs(
          TableRow,
          {
            className: "border-b-gray-6 border-b-[0.1px] text-[0.8125rem] cursor-pointer hover:bg-mastra-bg-3",
            onClick: () => toggleMetric(group.metricName),
            children: [
              /* @__PURE__ */ jsx(TableCell, { className: "w-12", children: /* @__PURE__ */ jsx("div", { className: "h-8 w-full flex items-center justify-center", children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    "transform transition-transform duration-200",
                    expandedMetrics.has(group.metricName) ? "rotate-90" : ""
                  ),
                  children: /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4 text-mastra-el-5" })
                }
              ) }) }),
              /* @__PURE__ */ jsx(TableCell, { className: "min-w-[200px] max-w-[30%] font-medium text-mastra-el-5", children: group.metricName }),
              /* @__PURE__ */ jsx(TableCell, { className: "flex-1 text-mastra-el-5" }),
              /* @__PURE__ */ jsx(TableCell, { className: "w-48 text-mastra-el-5", children: /* @__PURE__ */ jsx(ScoreIndicator, { score: group.averageScore }) }),
              /* @__PURE__ */ jsx(TableCell, { className: "w-48 text-mastra-el-5", children: /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: group.evals.length }) })
            ]
          }
        ),
        expandedMetrics.has(group.metricName) && /* @__PURE__ */ jsx(TableRow, { children: /* @__PURE__ */ jsx(
          TableCell,
          {
            colSpan: 5 + (getHasReasons(group.evals) ? 1 : 0) + (isCIMode ? 1 : 0),
            className: "p-0",
            children: /* @__PURE__ */ jsx("div", { className: "bg-mastra-bg-3 rounded-lg m-2", children: /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxs(Table$1, { className: "w-full", children: [
              /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { className: "text-[0.7rem] text-mastra-el-3 hover:bg-transparent", children: [
                /* @__PURE__ */ jsx(TableHead, { className: "pl-12 w-[120px]", children: "Timestamp" }),
                /* @__PURE__ */ jsx(TableHead, { className: "w-[300px]", children: "Instructions" }),
                /* @__PURE__ */ jsx(TableHead, { className: "w-[300px]", children: "Input" }),
                /* @__PURE__ */ jsx(TableHead, { className: "w-[300px]", children: "Output" }),
                /* @__PURE__ */ jsx(TableHead, { className: "w-[80px]", children: "Score" }),
                getHasReasons(group.evals) && /* @__PURE__ */ jsx(TableHead, { className: "w-[250px]", children: "Reason" }),
                isCIMode && /* @__PURE__ */ jsx(TableHead, { className: "w-[120px]", children: "Test Name" })
              ] }) }),
              /* @__PURE__ */ jsx(TableBody, { children: group.evals.map((evaluation, index) => /* @__PURE__ */ jsxs(
                TableRow,
                {
                  className: "text-[0.8125rem] hover:bg-mastra-bg-2/50",
                  children: [
                    /* @__PURE__ */ jsx(TableCell, { className: "pl-12 text-mastra-el-4 align-top py-4", children: /* @__PURE__ */ jsx(FormattedDate, { date: evaluation.createdAt }) }),
                    /* @__PURE__ */ jsx(TableCell, { className: "text-mastra-el-4 align-top py-4", children: /* @__PURE__ */ jsx("div", { className: cn("max-w-[300px] max-h-[200px]", scrollableContentClass), children: /* @__PURE__ */ jsx(
                      CopyableContent,
                      {
                        content: evaluation.instructions,
                        label: "instructions",
                        multiline: true
                      }
                    ) }) }),
                    /* @__PURE__ */ jsx(TableCell, { className: "text-mastra-el-4 align-top py-4", children: /* @__PURE__ */ jsx("div", { className: cn("max-w-[300px] max-h-[200px]", scrollableContentClass), children: /* @__PURE__ */ jsx(CopyableContent, { content: evaluation.input, label: "input", multiline: true }) }) }),
                    /* @__PURE__ */ jsx(TableCell, { className: "text-mastra-el-4 align-top py-4", children: /* @__PURE__ */ jsx("div", { className: cn("max-w-[300px] max-h-[200px]", scrollableContentClass), children: /* @__PURE__ */ jsx(CopyableContent, { content: evaluation.output, label: "output", multiline: true }) }) }),
                    /* @__PURE__ */ jsx(TableCell, { className: "text-mastra-el-4 align-top py-4", children: /* @__PURE__ */ jsx(ScoreIndicator, { score: evaluation.result.score }) }),
                    getHasReasons(group.evals) && /* @__PURE__ */ jsx(TableCell, { className: "text-mastra-el-4 align-top py-4", children: /* @__PURE__ */ jsx("div", { className: cn("max-w-[300px] max-h-[200px]", scrollableContentClass), children: /* @__PURE__ */ jsx(
                      CopyableContent,
                      {
                        content: evaluation.result.info?.reason || "",
                        label: "reason",
                        multiline: true
                      }
                    ) }) }),
                    isCIMode && /* @__PURE__ */ jsx(TableCell, { className: "text-mastra-el-4 align-top py-4", children: evaluation.testInfo?.testName && /* @__PURE__ */ jsx(Badge, { variant: "secondary", className: "text-xs", children: evaluation.testInfo.testName }) })
                  ]
                },
                `${group.metricName}-${index}`
              )) })
            ] }) }) })
          }
        ) })
      ] }, group.metricName)) }) })
    ] }) })
  ] });
  function getHasReasons(groupEvals2) {
    return groupEvals2.some((eval_) => eval_.result.info?.reason);
  }
  function toggleMetric(metricName) {
    const newExpanded = new Set(expandedMetrics);
    if (newExpanded.has(metricName)) {
      newExpanded.delete(metricName);
    } else {
      newExpanded.add(metricName);
    }
    setExpandedMetrics(newExpanded);
  }
  function toggleSort(field) {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc"
    }));
  }
  function getSortIcon(field) {
    if (sortConfig.field !== field) return null;
    return sortConfig.direction === "asc" ? /* @__PURE__ */ jsx(SortAsc, { className: "h-4 w-4 ml-1" }) : /* @__PURE__ */ jsx(SortDesc, { className: "h-4 w-4 ml-1" });
  }
  function groupEvals(evaluations) {
    let groups = evaluations.reduce((groups2, evaluation) => {
      const existingGroup = groups2.find((g) => g.metricName === evaluation.metricName);
      if (existingGroup) {
        existingGroup.evals.push(evaluation);
        existingGroup.averageScore = existingGroup.evals.reduce((sum, e) => sum + e.result.score, 0) / existingGroup.evals.length;
      } else {
        groups2.push({
          metricName: evaluation.metricName,
          averageScore: evaluation.result.score,
          evals: [evaluation]
        });
      }
      return groups2;
    }, []);
    if (searchTerm) {
      groups = groups.filter(
        (group) => group.metricName.toLowerCase().includes(searchTerm.toLowerCase()) || group.evals.some(
          (metric) => metric.input?.toLowerCase().includes(searchTerm.toLowerCase()) || metric.output?.toLowerCase().includes(searchTerm.toLowerCase()) || metric.instructions?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    groups.sort((a, b) => {
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      switch (sortConfig.field) {
        case "metricName":
          return direction * a.metricName.localeCompare(b.metricName);
        case "averageScore":
          return direction * (a.averageScore - b.averageScore);
        default:
          return 0;
      }
    });
    return groups;
  }
}

const Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  SliderPrimitive.Root,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary/50" }) }),
      /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-white shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = SliderPrimitive.Root.displayName;

const labelVariants = cva("text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(RadioGroupPrimitive.Root, { className: cn("grid gap-2", className), ...props, ref });
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;
const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    RadioGroupPrimitive.Item,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(RadioGroupPrimitive.Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
    }
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

const Entry = ({ label, children }) => {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-md", className: "text-icon3", children: label }),
    children
  ] });
};

const sizeClasses = {
  md: "h-button-md gap-md",
  lg: "h-button-lg gap-lg"
};
const variantClasses$1 = {
  default: "bg-surface2 hover:bg-surface4 text-icon3 hover:text-icon6",
  light: "bg-surface3 hover:bg-surface5 text-icon6"
};
const Button = ({ className, as, size = "md", variant = "default", ...props }) => {
  const Component = as || "button";
  return /* @__PURE__ */ jsx(
    Component,
    {
      className: clsx(
        "bg-surface2 border-sm border-border1 px-lg text-ui-md inline-flex items-center justify-center rounded-md border",
        variantClasses$1[variant],
        sizeClasses[size],
        className,
        {
          "cursor-not-allowed": props.disabled
        }
      ),
      ...props
    }
  );
};

const Collapsible = CollapsiblePrimitive.Root;
const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;
const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent;

const formatJSON = async (code) => {
  const formatted = await prettier.format(code, {
    semi: false,
    parser: "json",
    printWidth: 80,
    tabWidth: 2,
    plugins: [prettierPluginBabel, prettierPluginEstree]
  });
  return formatted;
};
const isValidJson = (str) => {
  try {
    const obj = JSON.parse(str);
    return !!obj && typeof obj === "object";
  } catch (e) {
    return false;
  }
};

const useCodemirrorTheme = () => {
  return useMemo(
    () => draculaInit({
      settings: {
        fontFamily: "var(--geist-mono)",
        fontSize: "0.8rem",
        lineHighlight: "transparent",
        gutterBackground: "transparent",
        gutterForeground: Colors.surface3,
        background: "transparent"
      },
      styles: [{ tag: [tags.className, tags.propertyName] }]
    }),
    []
  );
};
const SyntaxHighlighter$1 = ({ data }) => {
  const formattedCode = JSON.stringify(data, null, 2);
  const theme = useCodemirrorTheme();
  return /* @__PURE__ */ jsx("div", { className: "rounded-md bg-[#1a1a1a] p-1 font-mono", children: /* @__PURE__ */ jsx(CodeMirror, { value: formattedCode, theme, extensions: [jsonLanguage] }) });
};

const AgentAdvancedSettings = () => {
  const { settings, setSettings } = useAgentSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [providerOptionsValue, setProviderOptionsValue] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const theme = useCodemirrorTheme();
  const { handleCopy } = useCopyToClipboard({ text: providerOptionsValue });
  const providerOptionsStr = JSON.stringify(settings?.modelSettings?.providerOptions ?? {});
  useEffect(() => {
    const run = async () => {
      if (!isValidJson(providerOptionsStr)) {
        setError("Invalid JSON");
        return;
      }
      const formatted = await formatJSON(providerOptionsStr);
      setProviderOptionsValue(formatted);
    };
    run();
  }, [providerOptionsStr]);
  const formatProviderOptions = async () => {
    setError(null);
    if (!isValidJson(providerOptionsValue)) {
      setError("Invalid JSON");
      return;
    }
    const formatted = await formatJSON(providerOptionsValue);
    setProviderOptionsValue(formatted);
  };
  const saveProviderOptions = async () => {
    try {
      setError(null);
      const parsedContext = JSON.parse(providerOptionsValue);
      setSettings({
        ...settings,
        modelSettings: {
          ...settings?.modelSettings,
          providerOptions: parsedContext
        }
      });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 1e3);
    } catch (error2) {
      console.error("error", error2);
      setError("Invalid JSON");
    }
  };
  const collapsibleClassName = "rounded-lg border-sm border-border1 bg-surface3 overflow-clip";
  const collapsibleTriggerClassName = "text-icon3 text-ui-lg font-medium flex items-center gap-2 w-full p-[10px] justify-between";
  const collapsibleContentClassName = "bg-surface2 p-[10px] grid grid-cols-2 gap-[10px]";
  const buttonClass = "text-icon3 hover:text-icon6";
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Collapsible, { className: collapsibleClassName, open: isOpen, onOpenChange: setIsOpen, children: [
    /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: collapsibleTriggerClassName, children: [
      "Advanced Settings",
      /* @__PURE__ */ jsx(Icon, { className: cn("transition-transform", isOpen ? "rotate-0" : "-rotate-90"), children: /* @__PURE__ */ jsx(ChevronDown, {}) })
    ] }),
    /* @__PURE__ */ jsxs(CollapsibleContent, { className: collapsibleContentClassName, children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Txt, { as: "label", className: "text-icon3", variant: "ui-sm", htmlFor: "top-k", children: "Top K" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "top-k",
            type: "number",
            value: settings?.modelSettings?.topK || "",
            onChange: (e) => setSettings({
              ...settings,
              modelSettings: {
                ...settings?.modelSettings,
                topK: e.target.value ? Number(e.target.value) : void 0
              }
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Txt, { as: "label", className: "text-icon3", variant: "ui-sm", htmlFor: "frequency-penalty", children: "Frequency Penalty" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "frequency-penalty",
            type: "number",
            value: settings?.modelSettings?.frequencyPenalty || "",
            onChange: (e) => setSettings({
              ...settings,
              modelSettings: {
                ...settings?.modelSettings,
                frequencyPenalty: e.target.value ? Number(e.target.value) : void 0
              }
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Txt, { as: "label", className: "text-icon3", variant: "ui-sm", htmlFor: "presence-penalty", children: "Presence Penalty" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "presence-penalty",
            type: "number",
            value: settings?.modelSettings?.presencePenalty || "",
            onChange: (e) => setSettings({
              ...settings,
              modelSettings: {
                ...settings?.modelSettings,
                presencePenalty: e.target.value ? Number(e.target.value) : void 0
              }
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Txt, { as: "label", className: "text-icon3", variant: "ui-sm", htmlFor: "max-tokens", children: "Max Tokens" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "max-tokens",
            type: "number",
            value: settings?.modelSettings?.maxTokens || "",
            onChange: (e) => setSettings({
              ...settings,
              modelSettings: {
                ...settings?.modelSettings,
                maxTokens: e.target.value ? Number(e.target.value) : void 0
              }
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Txt, { as: "label", className: "text-icon3", variant: "ui-sm", htmlFor: "max-steps", children: "Max Steps" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "max-steps",
            type: "number",
            value: settings?.modelSettings?.maxSteps || "",
            onChange: (e) => setSettings({
              ...settings,
              modelSettings: {
                ...settings?.modelSettings,
                maxSteps: e.target.value ? Number(e.target.value) : void 0
              }
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(Txt, { as: "label", className: "text-icon3", variant: "ui-sm", htmlFor: "max-retries", children: "Max Retries" }),
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "max-retries",
            type: "number",
            value: settings?.modelSettings?.maxRetries || "",
            onChange: (e) => setSettings({
              ...settings,
              modelSettings: {
                ...settings?.modelSettings,
                maxRetries: e.target.value ? Number(e.target.value) : void 0
              }
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1 col-span-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx(Txt, { as: "label", className: "text-icon3", variant: "ui-sm", htmlFor: "provider-options", children: "Provider Options" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { onClick: formatProviderOptions, className: buttonClass, children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(Braces, {}) }) }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: "Format the Provider Options JSON" })
            ] }),
            /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { onClick: handleCopy, className: buttonClass, children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(CopyIcon, {}) }) }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: "Copy Provider Options" })
            ] }),
            /* @__PURE__ */ jsxs(Tooltip, { children: [
              /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { onClick: saveProviderOptions, className: buttonClass, children: /* @__PURE__ */ jsx(Icon, { children: saved ? /* @__PURE__ */ jsx(CheckIcon$1, {}) : /* @__PURE__ */ jsx(SaveIcon, {}) }) }) }),
              /* @__PURE__ */ jsx(TooltipContent, { children: saved ? "Saved" : "Save Provider Options" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          CodeMirror,
          {
            value: providerOptionsValue,
            onChange: setProviderOptionsValue,
            theme,
            extensions: [jsonLanguage],
            className: "h-[300px] overflow-scroll rounded-lg border bg-transparent shadow-sm focus-visible:ring-ring transition-colors focus-visible:outline-none focus-visible:ring-1 p-2"
          }
        ),
        error && /* @__PURE__ */ jsx(Txt, { variant: "ui-md", className: "text-accent2", children: error })
      ] })
    ] })
  ] }) });
};

const AgentSettings = () => {
  const { settings, setSettings, resetAll } = useAgentSettings();
  return /* @__PURE__ */ jsxs("div", { className: "px-5 text-xs py-2 pb-4", children: [
    /* @__PURE__ */ jsxs("section", { className: "space-y-7", children: [
      /* @__PURE__ */ jsx(Entry, { label: "Chat Method", children: /* @__PURE__ */ jsxs(
        RadioGroup,
        {
          orientation: "horizontal",
          value: settings?.modelSettings?.chatWithGenerate ? "generate" : "stream",
          onValueChange: (value) => setSettings({
            ...settings,
            modelSettings: { ...settings?.modelSettings, chatWithGenerate: value === "generate" }
          }),
          className: "flex flex-row gap-4",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(RadioGroupItem, { value: "generate", id: "generate", className: "text-icon6" }),
              /* @__PURE__ */ jsx(Label, { className: "text-icon6 text-ui-md", htmlFor: "generate", children: "Generate" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(RadioGroupItem, { value: "stream", id: "stream", className: "text-icon6" }),
              /* @__PURE__ */ jsx(Label, { className: "text-icon6 text-ui-md", htmlFor: "stream", children: "Stream" })
            ] })
          ]
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsx(Entry, { label: "Temperature", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Slider,
            {
              value: [settings?.modelSettings?.temperature ?? -0.1],
              max: 1,
              min: -0.1,
              step: 0.1,
              onValueChange: (value) => setSettings({
                ...settings,
                modelSettings: { ...settings?.modelSettings, temperature: value[0] < 0 ? void 0 : value[0] }
              })
            }
          ),
          /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-sm", className: "text-icon3", children: settings?.modelSettings?.temperature ?? "n/a" })
        ] }) }),
        /* @__PURE__ */ jsx(Entry, { label: "Top P", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Slider,
            {
              onValueChange: (value) => setSettings({
                ...settings,
                modelSettings: { ...settings?.modelSettings, topP: value[0] < 0 ? void 0 : value[0] }
              }),
              value: [settings?.modelSettings?.topP ?? -0.1],
              max: 1,
              min: -0.1,
              step: 0.1
            }
          ),
          /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-sm", className: "text-icon3", children: settings?.modelSettings?.topP ?? "n/a" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "py-7", children: /* @__PURE__ */ jsx(AgentAdvancedSettings, {}) }),
    /* @__PURE__ */ jsxs(Button, { onClick: () => resetAll(), variant: "light", className: "w-full", size: "lg", children: [
      /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(RefreshCw, {}) }),
      "Reset"
    ] })
  ] });
};

const EmptyState = ({
  iconSlot,
  titleSlot,
  descriptionSlot,
  actionSlot,
  as: Component = "div"
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex w-[340px] flex-col items-center justify-center text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "h-auto [&>svg]:w-[126px]", children: iconSlot }),
    /* @__PURE__ */ jsx(Component, { className: "text-icon6 pt-[34px] font-serif text-[1.75rem] font-semibold", children: titleSlot }),
    /* @__PURE__ */ jsx(Txt, { variant: "ui-lg", className: "text-icon3 pb-[34px]", children: descriptionSlot }),
    actionSlot
  ] });
};

const rowSize = {
  default: "[&>tbody>tr]:h-table-row",
  small: "[&>tbody>tr]:h-table-row-small"
};
const Table = ({ className, children, size = "default" }) => {
  return /* @__PURE__ */ jsx("table", { className: clsx("w-full", rowSize[size], className), children });
};
const Thead = ({ className, children }) => {
  return /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { className: clsx("h-table-header border-b-sm border-border1", className), children }) });
};
const Th = ({ className, children, ...props }) => {
  return /* @__PURE__ */ jsx(
    "th",
    {
      className: clsx(
        "text-icon3 text-ui-sm h-full text-left font-normal uppercase first:pl-5 last:pr-5 whitespace-nowrap",
        className
      ),
      ...props,
      children
    }
  );
};
const Tbody = ({ className, children }) => {
  return /* @__PURE__ */ jsx("tbody", { className: clsx("", className), children });
};
const Row = ({ className, children, selected = false, onClick }) => {
  return /* @__PURE__ */ jsx(
    "tr",
    {
      className: clsx(
        "border-b-sm border-border1 hover:bg-surface3",
        selected && "bg-surface4",
        onClick && "cursor-pointer",
        className
      ),
      onClick,
      children
    }
  );
};

const formatDateCell = (date) => {
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(date).toUpperCase();
  const day = date.getDate();
  const formattedDay = `${month} ${day}`;
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
    // Use 24-hour format
  }).format(date);
  return { day: formattedDay, time };
};

const Cell = ({ className, children, ...props }) => {
  return /* @__PURE__ */ jsx("td", { className: clsx("text-icon5 first:pl-5 last:pr-5", className), ...props, children: /* @__PURE__ */ jsx("div", { className: clsx("flex h-full w-full shrink-0 items-center"), children }) });
};
const TxtCell = ({ className, children }) => {
  return /* @__PURE__ */ jsx(Cell, { className, children: /* @__PURE__ */ jsx(Txt, { as: "span", variant: "ui-md", className: "w-full truncate", children }) });
};
const UnitCell = ({ className, children, unit }) => {
  return /* @__PURE__ */ jsx(Cell, { className, children: /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center", children: [
    /* @__PURE__ */ jsx(Txt, { as: "span", variant: "ui-md", className: "shrink-0", children }),
    /* @__PURE__ */ jsx(Txt, { as: "span", variant: "ui-sm", className: "text-icon3 w-full truncate", children: unit })
  ] }) });
};
const DateTimeCell = ({ dateTime, ...props }) => {
  const { day, time } = formatDateCell(dateTime);
  return /* @__PURE__ */ jsx(Cell, { ...props, children: /* @__PURE__ */ jsxs("div", { className: "shrink-0", children: [
    /* @__PURE__ */ jsx(Txt, { as: "span", variant: "ui-sm", className: "text-icon3", children: day }),
    " ",
    /* @__PURE__ */ jsx(Txt, { as: "span", variant: "ui-md", children: time })
  ] }) });
};
const EntryCell = ({ name, description, icon, meta, ...props }) => {
  return /* @__PURE__ */ jsx(Cell, { ...props, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-[14px]", children: [
    /* @__PURE__ */ jsx(Icon, { size: "lg", className: "text-icon5", children: icon }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0", children: [
      /* @__PURE__ */ jsx(Txt, { as: "span", variant: "ui-md", className: "text-icon6 font-medium !leading-tight", children: name }),
      description && /* @__PURE__ */ jsx(Txt, { as: "span", variant: "ui-xs", className: "text-icon3 w-full max-w-[300px] truncate !leading-tight", children: description })
    ] }),
    meta
  ] }) });
};

const INDICATOR_WIDTH = 40;
const INDICATOR_HEIGHT = 150;
const INDICATOR_SPACE = 10;
const ScrollableContainer = ({
  className,
  children,
  scrollSpeed = 100,
  scrollIntervalTime = 20
}) => {
  const containerRef = useRef(null);
  const scrollInterval = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerRight, setContainerRight] = useState(0);
  const [containerTop, setContainerTop] = useState(0);
  const [containerLeft, setContainerLeft] = useState(0);
  const [showRightIndicator, setShowRightIndicator] = useState(false);
  const [showLeftIndicator, setShowLeftIndicator] = useState(false);
  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      const canScrollRight = containerRef.current.scrollLeft < containerRef.current.scrollWidth - containerRef.current.clientWidth;
      setShowRightIndicator(canScrollRight);
      setContainerHeight(containerRef.current.clientHeight);
      const rect = containerRef.current.getBoundingClientRect();
      setContainerRight(rect.right);
      setContainerLeft(rect.left);
      setContainerTop(rect.top);
    };
    updatePositions();
    const resizeObserver = new ResizeObserver(updatePositions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    const handleScroll = () => {
      if (!containerRef.current) return;
      const canScrollLeft = containerRef.current.scrollLeft > 0;
      const canScrollRight = containerRef.current.scrollLeft < containerRef.current.scrollWidth - containerRef.current.clientWidth;
      setShowLeftIndicator(canScrollLeft);
      setShowRightIndicator(canScrollRight);
      updatePositions();
    };
    containerRef?.current?.addEventListener("scroll", handleScroll);
    const container = containerRef.current;
    return () => {
      if (container) {
        resizeObserver.unobserve(container);
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const ScrollIndicator = ({
    isVisible,
    position,
    containerHeight: containerHeight2,
    containerTop: containerTop2,
    containerRight: containerRight2,
    onStartScrolling,
    onStopScrolling
  }) => {
    if (!isVisible) return null;
    const styles = {
      top: containerHeight2 < INDICATOR_HEIGHT ? containerTop2 : containerTop2 + (containerHeight2 - INDICATOR_HEIGHT) / 2,
      width: INDICATOR_WIDTH,
      height: containerHeight2 < INDICATOR_HEIGHT ? `${containerHeight2}px` : `${INDICATOR_HEIGHT}px`
    };
    return /* @__PURE__ */ jsxs(
      "button",
      {
        onMouseDown: onStartScrolling,
        onTouchStart: onStartScrolling,
        onMouseUp: onStopScrolling,
        onTouchEnd: onStopScrolling,
        onTouchCancel: onStopScrolling,
        className: "bg-surface4 text-muted-foreground border-surface5 hover:border-muted-foreground fixed z-10 flex items-center justify-center rounded-lg border text-2xl hover:text-white",
        style: {
          ...styles,
          left: position === "left" ? containerLeft + INDICATOR_SPACE : containerRight2 - INDICATOR_WIDTH - INDICATOR_SPACE
        },
        children: [
          " ",
          position === "left" ? "«" : "»"
        ]
      }
    );
  };
  const startScrolling = useCallback(
    (direction, e) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }
      if (containerRef.current) {
        containerRef.current.scrollBy({
          left: direction === "right" ? scrollSpeed * 2 : -scrollSpeed * 2,
          behavior: "smooth"
        });
      }
      scrollInterval.current = setInterval(() => {
        if (containerRef.current) {
          containerRef.current.scrollBy({
            left: direction === "right" ? scrollSpeed : -scrollSpeed,
            behavior: "smooth"
          });
        }
      }, scrollIntervalTime);
    },
    [scrollSpeed, scrollIntervalTime]
  );
  const stopScrolling = useCallback(() => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { ref: containerRef, className: clsx("relative max-h-full overflow-auto", className), children: [
    children,
    /* @__PURE__ */ jsx(
      ScrollIndicator,
      {
        isVisible: showLeftIndicator,
        position: "left",
        containerHeight,
        containerTop,
        containerRight,
        onStartScrolling: (e) => startScrolling("left", e),
        onStopScrolling: stopScrolling
      }
    ),
    /* @__PURE__ */ jsx(
      ScrollIndicator,
      {
        isVisible: showRightIndicator,
        position: "right",
        containerHeight,
        containerTop,
        containerRight,
        onStartScrolling: (e) => startScrolling("right", e),
        onStopScrolling: stopScrolling
      }
    )
  ] });
};

function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("animate-pulse rounded-md bg-muted/50", className), ...props });
}

const LinkComponentContext = createContext({
  Link: forwardRef(() => null),
  navigate: () => {
  }
});
const LinkComponentProvider = ({ children, Link, navigate }) => {
  return /* @__PURE__ */ jsx(LinkComponentContext.Provider, { value: { Link, navigate }, children });
};
const useLinkComponent = () => {
  const ctx = useContext(LinkComponentContext);
  if (!ctx) {
    throw new Error("useLinkComponent must be used within a LinkComponentProvider");
  }
  return ctx;
};

const OpenaiChatIcon = (props) => /* @__PURE__ */ jsx("svg", { className: "h-3 w-3", viewBox: "0 0 320 320", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", ...props, children: /* @__PURE__ */ jsx("path", { d: "m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z" }) });

const AnthropicChatIcon = (props) => /* @__PURE__ */ jsx("svg", { className: "h-3 w-3", viewBox: "0 0 320 320", xmlns: "http://www.w3.org/2000/svg", fill: "currentColor", ...props, children: /* @__PURE__ */ jsx("path", { d: "m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z" }) });

const AnthropicMessagesIcon = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    className: "h-3 w-3",
    fill: "white",
    height: "78",
    strokeLinejoin: "round",
    viewBox: "0 0 16 16",
    width: "78",
    style: { color: "currentcolor" },
    ...props,
    children: /* @__PURE__ */ jsx("g", { transform: "translate(0,2)", children: /* @__PURE__ */ jsx(
      "path",
      {
        d: "M11.375 0h-2.411L13.352 11.13h2.411L11.375 0ZM4.4 0 0 11.13h2.46l0.9-2.336h4.604l0.9 2.336h2.46L6.924 0H4.4Zm-0.244 6.723 1.506-3.909 1.506 3.909H4.156Z",
        fill: "currentColor"
      }
    ) })
  }
);

const AzureIcon = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    className: "h-3 w-3",
    xmlns: "http://www.w3.org/2000/svg",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    ...props,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        d: "M7.402 13.8777C9.45763 13.4674 11.1555 13.128 11.175 13.1233L11.2104 13.1148L9.2697 10.507C8.2023 9.07276 7.32898 7.8937 7.32898 7.88691C7.32898 7.87404 9.33293 1.63997 9.3442 1.61779C9.34797 1.61037 10.7117 4.27017 12.65 8.06532C14.4647 11.6184 15.9608 14.5479 15.9747 14.5754L16 14.6253L9.83224 14.6244L3.66449 14.6235L7.402 13.8777ZM0 13.0824C0 13.0787 0.914457 11.2855 2.03212 9.09735L4.06425 5.11896L6.43245 2.87384C7.73497 1.63902 8.80417 0.627201 8.80845 0.625356C8.81274 0.623511 8.79561 0.672228 8.77038 0.733617C8.74515 0.795006 7.58796 3.59893 6.19884 6.96455L3.67317 13.0839L1.83659 13.0865C0.826464 13.0879 0 13.0861 0 13.0824Z",
        fill: "#0089D6",
        style: { fill: "#0089D6", fillOpacity: 1 }
      }
    )
  }
);

const AmazonIcon = (props) => /* @__PURE__ */ jsxs(
  "svg",
  {
    className: "h-3 w-3",
    width: "16",
    height: "16",
    viewBox: "0 0 181 108",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /* @__PURE__ */ jsxs("g", { clipPath: "url(#clip0_1480_1723)", children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M51.2203 39.3158C51.2203 41.5066 51.4572 43.2829 51.8717 44.5856C52.3453 45.8882 52.9374 47.3093 53.7664 48.8487C54.0624 49.3224 54.1809 49.7961 54.1809 50.2106C54.1809 50.8027 53.8256 51.3948 53.0559 51.9869L49.3256 54.4737C48.7927 54.829 48.2598 55.0066 47.7861 55.0066C47.194 55.0066 46.6019 54.7106 46.0098 54.1777C45.1809 53.2895 44.4703 52.3422 43.8782 51.3948C43.2861 50.3882 42.694 49.2632 42.0427 47.9014C37.4243 53.3487 31.6217 56.0724 24.6348 56.0724C19.6611 56.0724 15.694 54.6514 12.7927 51.8093C9.8914 48.9672 8.41113 45.1777 8.41113 40.4408C8.41113 35.4079 10.1874 31.3224 13.7993 28.2435C17.4111 25.1645 22.2072 23.6251 28.3059 23.6251C30.319 23.6251 32.3914 23.8027 34.5822 24.0987C36.773 24.3948 39.023 24.8685 41.3914 25.4014V21.079C41.3914 16.579 40.444 13.4408 38.6085 11.6053C36.7138 9.76979 33.5164 8.88163 28.9572 8.88163C26.8848 8.88163 24.7532 9.11847 22.5624 9.65137C20.3717 10.1843 18.2401 10.8356 16.1677 11.6645C15.2203 12.079 14.5098 12.3158 14.0953 12.4343C13.6809 12.5527 13.3848 12.6119 13.148 12.6119C12.319 12.6119 11.9046 12.0198 11.9046 10.7764V7.87505C11.9046 6.92768 12.023 6.21716 12.319 5.80268C12.6151 5.38821 13.148 4.97374 13.9769 4.55926C16.0493 3.49347 18.5361 2.60531 21.4374 1.89479C24.3388 1.12505 27.4177 0.769788 30.6743 0.769788C37.7203 0.769788 42.8717 2.36847 46.1875 5.56584C49.444 8.76321 51.1019 13.6185 51.1019 20.1316V39.3158H51.2203ZM27.1809 48.3158C29.1348 48.3158 31.148 47.9606 33.2796 47.2501C35.4111 46.5395 37.3059 45.2369 38.9046 43.4606C39.8519 42.3356 40.5625 41.0922 40.9177 39.6711C41.273 38.2501 41.5098 36.5329 41.5098 34.5198V32.0329C39.7927 31.6185 37.9572 31.2632 36.0624 31.0264C34.1677 30.7895 32.3322 30.6711 30.4967 30.6711C26.5296 30.6711 23.6282 31.4408 21.6743 33.0395C19.7203 34.6382 18.773 36.8882 18.773 39.8487C18.773 42.6316 19.4835 44.704 20.9638 46.1251C22.3848 47.6053 24.4572 48.3158 27.1809 48.3158ZM74.7269 54.7106C73.6611 54.7106 72.9506 54.5329 72.4769 54.1185C72.0032 53.7632 71.5888 52.9343 71.2335 51.8093L57.319 6.03953C56.9638 4.85531 56.7861 4.08558 56.7861 3.6711C56.7861 2.72374 57.2598 2.19084 58.2072 2.19084H64.0098C65.1348 2.19084 65.9046 2.36847 66.319 2.78295C66.7927 3.13821 67.148 3.96716 67.5032 5.09216L77.4506 44.2895L86.6874 5.09216C86.9835 3.90795 87.3388 3.13821 87.8124 2.78295C88.2861 2.42768 89.1151 2.19084 90.1809 2.19084H94.9177C96.0427 2.19084 96.8124 2.36847 97.2861 2.78295C97.7598 3.13821 98.1743 3.96716 98.4111 5.09216L107.766 44.7632L118.01 5.09216C118.365 3.90795 118.78 3.13821 119.194 2.78295C119.668 2.42768 120.437 2.19084 121.503 2.19084H127.01C127.957 2.19084 128.49 2.66453 128.49 3.6711C128.49 3.96716 128.431 4.26321 128.372 4.61847C128.312 4.97374 128.194 5.44742 127.957 6.09874L113.687 51.8685C113.332 53.0527 112.918 53.8224 112.444 54.1777C111.97 54.5329 111.201 54.7698 110.194 54.7698H105.102C103.977 54.7698 103.207 54.5922 102.733 54.1777C102.26 53.7632 101.845 52.9935 101.608 51.8093L92.4309 13.6185L83.3125 51.7501C83.0164 52.9343 82.6611 53.704 82.1874 54.1185C81.7138 54.5329 80.8848 54.7106 79.819 54.7106H74.7269ZM150.812 56.3093C147.734 56.3093 144.655 55.954 141.694 55.2435C138.733 54.5329 136.424 53.7632 134.885 52.8751C133.937 52.3422 133.286 51.7501 133.049 51.2172C132.812 50.6843 132.694 50.0922 132.694 49.5593V46.5395C132.694 45.2961 133.168 44.704 134.056 44.704C134.411 44.704 134.766 44.7632 135.122 44.8816C135.477 45.0001 136.01 45.2369 136.602 45.4737C138.615 46.3619 140.806 47.0724 143.115 47.5461C145.484 48.0198 147.793 48.2566 150.161 48.2566C153.891 48.2566 156.793 47.6053 158.806 46.3027C160.819 45 161.885 43.1053 161.885 40.6777C161.885 39.0198 161.352 37.6579 160.286 36.5329C159.22 35.4079 157.207 34.4014 154.306 33.454L145.72 30.7895C141.398 29.4277 138.201 27.4145 136.247 24.7501C134.293 22.1448 133.286 19.2435 133.286 16.1645C133.286 13.6777 133.819 11.4869 134.885 9.59216C135.951 7.69742 137.372 6.03953 139.148 4.73689C140.924 3.37505 142.937 2.36847 145.306 1.65795C147.674 0.94742 150.161 0.651367 152.766 0.651367C154.069 0.651367 155.431 0.710578 156.734 0.888209C158.095 1.06584 159.339 1.30268 160.582 1.53953C161.766 1.83558 162.891 2.13163 163.957 2.48689C165.023 2.84216 165.852 3.19742 166.444 3.55268C167.273 4.02637 167.865 4.50005 168.22 5.03295C168.576 5.50663 168.753 6.15795 168.753 6.98689V9.76979C168.753 11.0132 168.28 11.6645 167.391 11.6645C166.918 11.6645 166.148 11.4277 165.141 10.954C161.766 9.41453 157.977 8.64479 153.773 8.64479C150.398 8.64479 147.734 9.17768 145.898 10.3027C144.062 11.4277 143.115 13.1448 143.115 15.5724C143.115 17.2303 143.707 18.6514 144.891 19.7764C146.076 20.9014 148.266 22.0264 151.405 23.0329L159.812 25.6974C164.076 27.0593 167.155 28.954 168.99 31.3816C170.826 33.8093 171.714 36.5922 171.714 39.6711C171.714 42.2172 171.181 44.5264 170.174 46.5395C169.108 48.5527 167.687 50.329 165.852 51.7501C164.016 53.2303 161.826 54.2961 159.28 55.0658C156.615 55.8948 153.832 56.3093 150.812 56.3093Z",
            fill: "currentColor"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M162.004 85.0856C142.524 99.4738 114.221 107.112 89.8855 107.112C55.7803 107.112 25.05 94.5001 1.83948 73.5396C0.00394917 71.8817 1.66184 69.6317 3.85263 70.9343C28.9579 85.5001 59.925 94.3225 91.9579 94.3225C113.57 94.3225 137.313 89.8225 159.162 80.5856C162.418 79.1054 165.201 82.7172 162.004 85.0856Z",
            fill: "#FF9900"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M170.115 75.8487C167.628 72.6513 153.654 74.3092 147.319 75.079C145.424 75.3158 145.128 73.6579 146.845 72.4145C157.976 64.5987 176.272 66.8487 178.404 69.454C180.536 72.1184 177.812 90.4145 167.391 99.1776C165.792 100.539 164.253 99.8289 164.963 98.0526C167.332 92.1908 172.601 78.9868 170.115 75.8487Z",
            fill: "#FF9900"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("clipPath", { id: "clip0_1480_1723", children: /* @__PURE__ */ jsx("rect", { width: "180", height: "107.763", fill: "white", transform: "translate(0.0625)" }) }) })
    ]
  }
);

const CohereIcon = (props) => /* @__PURE__ */ jsxs("svg", { className: "h-3 w-3", xmlns: "http://www.w3.org/2000/svg", width: "17", height: "18", fill: "none", ...props, children: [
  /* @__PURE__ */ jsx("mask", { id: "mask0_174_2406", maskUnits: "userSpaceOnUse", x: "0", y: "0", width: "17", height: "18", children: /* @__PURE__ */ jsx("path", { d: "M17 0.5H0V17.5H17V0.5Z", fill: "white" }) }),
  /* @__PURE__ */ jsxs("g", { mask: "url(#mask0_174_2406)", children: [
    /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M5.50773 10.6219C5.9653 10.6219 6.8755 10.5968 8.13362 10.0788C9.59973 9.47518 12.5166 8.37942 14.6208 7.2539C16.0924 6.46668 16.7375 5.42553 16.7375 4.02344C16.7375 2.07751 15.16 0.5 13.2141 0.5H5.06095C2.26586 0.5 0 2.76586 0 5.56095C0 8.35604 2.12151 10.6219 5.50773 10.6219Z",
        fill: "#39594D"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6.88672 14.107C6.88672 12.7369 7.71155 11.5016 8.97699 10.9764L11.5446 9.9108C14.1417 8.83294 17.0003 10.7415 17.0003 13.5535C17.0003 15.732 15.2339 17.4979 13.0553 17.4973L10.2754 17.4966C8.40372 17.4961 6.88672 15.9787 6.88672 14.107Z",
        fill: "#D18EE2"
      }
    ),
    /* @__PURE__ */ jsx(
      "path",
      {
        d: "M2.91749 11.2891C1.30623 11.2891 0 12.5952 0 14.2065V14.5844C0 16.1956 1.30618 17.5018 2.91744 17.5018C4.5287 17.5018 5.83493 16.1956 5.83493 14.5844V14.2065C5.83493 12.5952 4.52875 11.2891 2.91749 11.2891Z",
        fill: "#FF7759"
      }
    )
  ] })
] });

const GroqIcon = (props) => /* @__PURE__ */ jsxs(
  "svg",
  {
    className: "h-3 w-3",
    "data-testid": "geist-icon",
    height: "78",
    strokeLinejoin: "round",
    viewBox: "0 0 160 59",
    width: "104",
    style: {
      color: "currentcolor"
    },
    ...props,
    children: [
      /* @__PURE__ */ jsx(
        "mask",
        {
          id: "mask0_4345_1846",
          maskUnits: "userSpaceOnUse",
          x: "0",
          y: "0",
          width: "160",
          height: "59",
          style: {
            maskType: "luminance"
          },
          children: /* @__PURE__ */ jsx("path", { d: "M0.273438 0.219727H159.216V58.1817H0.273438V0.219727Z", fill: "white" })
        }
      ),
      /* @__PURE__ */ jsx("g", { mask: "url(#mask0_4345_1846)", children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M95.4635 0.314595C84.4822 0.314595 75.5599 9.19525 75.5599 20.1677C75.5599 31.1402 84.4632 40.0208 95.4635 40.0208C106.464 40.0208 115.367 31.1402 115.367 20.1677C115.348 9.21427 106.445 0.333611 95.4635 0.314595ZM95.4635 32.5664C88.6002 32.5664 83.0333 27.0136 83.0333 20.1677C83.0333 13.3218 88.6002 7.76902 95.4635 7.76902C102.327 7.76902 107.894 13.3218 107.894 20.1677C107.894 27.0136 102.327 32.5664 95.4635 32.5664ZM67.9912 0.39066C67.3049 0.314595 66.6376 0.276562 65.9513 0.276562C65.6081 0.276562 65.284 0.276562 64.9599 0.295578C64.6358 0.314595 64.2926 0.333611 63.9685 0.352628C62.634 0.44771 61.2995 0.675906 60.0031 1.03722C57.3531 1.74082 54.8556 2.99591 52.7013 4.68836C50.4898 6.43787 48.7358 8.68181 47.5347 11.23C46.9437 12.5041 46.5052 13.8543 46.2193 15.2234C46.0858 15.908 45.9905 16.5926 45.9142 17.2772C45.8952 17.6195 45.857 17.9618 45.857 18.3041L45.838 18.8175V19.293L45.8761 32.5854L45.9142 39.2221H53.3685L53.4067 32.5854L53.4448 19.293V18.5893C53.4448 18.3802 53.4829 18.171 53.4829 17.9618C53.5211 17.5434 53.5973 17.1441 53.6736 16.7257C53.8452 15.9271 54.093 15.1474 54.4362 14.4057C55.1225 12.9225 56.152 11.6293 57.4293 10.6025C58.7639 9.53755 60.3081 8.75787 61.9477 8.3205C62.7865 8.0923 63.6635 7.94017 64.5405 7.8641C64.7693 7.84509 64.979 7.82607 65.2078 7.82607C65.4365 7.82607 65.6653 7.80705 65.875 7.80705C66.2944 7.80705 66.7329 7.82607 67.1524 7.8641C68.8491 8.03525 70.4887 8.54869 71.9948 9.38541L75.7124 2.93886C73.3484 1.56968 70.7175 0.694923 67.9912 0.39066ZM20.3484 0.219513C9.36711 0.124431 0.36855 8.92902 0.273226 19.8825C0.177902 30.8359 9.00488 39.8116 19.9862 39.9067H26.8876V32.4713H20.3484C13.4851 32.5474 7.84193 27.0707 7.76567 20.2057C7.68941 13.3408 13.1801 7.73099 20.0624 7.65492H20.3484C27.2117 7.65492 32.7786 13.2077 32.8167 20.0536V38.3284C32.8167 45.1172 27.2689 50.651 20.4819 50.7271C17.2218 50.708 14.1142 49.3959 11.8265 47.0949L6.54553 52.3625C10.206 56.0326 15.1628 58.1244 20.3484 58.1625H20.6153C31.4632 58.0103 40.1757 49.2248 40.2329 38.4044V19.5592C39.966 8.81492 31.1391 0.238529 20.3484 0.219513ZM139.389 0.314595C128.407 0.314595 119.485 9.19525 119.504 20.1677C119.504 31.1212 128.407 40.0018 139.389 40.0018H146.195V32.5664H139.389C132.525 32.5664 126.958 27.0136 126.958 20.1677C126.958 13.3218 132.525 7.76902 139.389 7.76902C145.833 7.76902 151.209 12.6943 151.781 19.1028H151.762V57.2116H159.216V20.1677C159.216 9.21427 150.351 0.314595 139.389 0.314595Z",
          fill: "currentColor"
        }
      ) })
    ]
  }
);

const XGroqIcon = (props) => /* @__PURE__ */ jsx(
  "svg",
  {
    className: "h-3 w-3",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1000 1000",
    width: "78",
    height: "78",
    style: {
      color: "currentcolor"
    },
    ...props,
    children: /* @__PURE__ */ jsxs("g", { children: [
      /* @__PURE__ */ jsx(
        "polygon",
        {
          fill: "currentColor",
          points: "226.83 411.15 501.31 803.15 623.31 803.15 348.82 411.15 226.83 411.15"
        }
      ),
      /* @__PURE__ */ jsx(
        "polygon",
        {
          fill: "currentColor",
          points: "348.72 628.87 226.69 803.15 348.77 803.15 409.76 716.05 348.72 628.87"
        }
      ),
      /* @__PURE__ */ jsx(
        "polygon",
        {
          fill: "currentColor",
          points: "651.23 196.85 440.28 498.12 501.32 585.29 773.31 196.85 651.23 196.85"
        }
      ),
      /* @__PURE__ */ jsx(
        "polygon",
        {
          fill: "currentColor",
          points: "673.31 383.25 673.31 803.15 773.31 803.15 773.31 240.44 673.31 383.25"
        }
      )
    ] })
  }
);

const MistralIcon = (props) => /* @__PURE__ */ jsxs(
  "svg",
  {
    className: "h-3 w-3",
    xmlns: "http://www.w3.org/2000/svg",
    width: "176",
    height: "162",
    viewBox: "0 0 176 162",
    fill: "none",
    ...props,
    children: [
      /* @__PURE__ */ jsx("rect", { x: "15", y: "1", width: "32", height: "32", fill: "#FFCD00", stroke: "#636363", "stroke-opacity": "0.2", "stroke-width": "0.5" }),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "143",
          y: "1",
          width: "32",
          height: "32",
          fill: "#FFCD00",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "15",
          y: "33",
          width: "32",
          height: "32",
          fill: "#FFA400",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "47",
          y: "33",
          width: "32",
          height: "32",
          fill: "#FFA400",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "111",
          y: "33",
          width: "32",
          height: "32",
          fill: "#FFA400",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "143",
          y: "33",
          width: "32",
          height: "32",
          fill: "#FFA400",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "15",
          y: "65",
          width: "32",
          height: "32",
          fill: "#FF7100",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "47",
          y: "65",
          width: "32",
          height: "32",
          fill: "#FF7100",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "79",
          y: "65",
          width: "32",
          height: "32",
          fill: "#FF7100",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "111",
          y: "65",
          width: "32",
          height: "32",
          fill: "#FF7100",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "143",
          y: "65",
          width: "32",
          height: "32",
          fill: "#FF7100",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "15",
          y: "97",
          width: "32",
          height: "32",
          fill: "#FF4902",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "79",
          y: "97",
          width: "32",
          height: "32",
          fill: "#FF4902",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "143",
          y: "97",
          width: "32",
          height: "32",
          fill: "#FF4902",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "15",
          y: "129",
          width: "32",
          height: "32",
          fill: "#FF0006",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx(
        "rect",
        {
          x: "143",
          y: "129",
          width: "32",
          height: "32",
          fill: "#FF0006",
          stroke: "#636363",
          "stroke-opacity": "0.2",
          "stroke-width": "0.5"
        }
      ),
      /* @__PURE__ */ jsx("rect", { y: "1", width: "16", height: "160", fill: "black" }),
      /* @__PURE__ */ jsx("rect", { x: "63", y: "97", width: "16", height: "32", fill: "black" }),
      /* @__PURE__ */ jsx("rect", { x: "95", y: "33", width: "16", height: "32", fill: "black" }),
      /* @__PURE__ */ jsx("rect", { x: "127", y: "1", width: "16", height: "32", fill: "black" }),
      /* @__PURE__ */ jsx("rect", { x: "127", y: "97", width: "16", height: "64", fill: "black" })
    ]
  }
);

const providerMapToIcon = {
  "openai.chat": /* @__PURE__ */ jsx(OpenaiChatIcon, {}),
  "anthropic.chat": /* @__PURE__ */ jsx(AnthropicChatIcon, {}),
  "anthropic.messages": /* @__PURE__ */ jsx(AnthropicMessagesIcon, {}),
  AZURE: /* @__PURE__ */ jsx(AzureIcon, {}),
  AMAZON: /* @__PURE__ */ jsx(AmazonIcon, {}),
  GOOGLE: /* @__PURE__ */ jsx(GoogleIcon, {}),
  COHERE: /* @__PURE__ */ jsx(CohereIcon, {}),
  GROQ: /* @__PURE__ */ jsx(GroqIcon, {}),
  X_GROK: /* @__PURE__ */ jsx(XGroqIcon, {}),
  MISTRAL: /* @__PURE__ */ jsx(MistralIcon, {})
};

const NameCell = ({ row }) => {
  const { Link } = useLinkComponent();
  return /* @__PURE__ */ jsx(
    EntryCell,
    {
      icon: /* @__PURE__ */ jsx(AgentIcon, {}),
      name: /* @__PURE__ */ jsx(Link, { className: "w-full space-y-0", href: row.original.link, children: row.original.name }),
      description: row.original.instructions
    }
  );
};
const columns$2 = [
  {
    header: "Name",
    accessorKey: "name",
    cell: NameCell
  },
  {
    header: "Model",
    accessorKey: "model",
    size: 160,
    cell: ({ row }) => {
      return /* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx(
        Badge$1,
        {
          variant: "default",
          icon: providerMapToIcon[row.original.provider] || /* @__PURE__ */ jsx(OpenAIIcon, {}),
          className: "truncate",
          children: row.original.modelId || "N/A"
        }
      ) });
    }
  },
  {
    size: 160,
    header: "Tools",
    accessorKey: "tools",
    cell: ({ row }) => {
      const toolsCount = row.original.tools ? Object.keys(row.original.tools).length : 0;
      return /* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsxs(Badge$1, { variant: "default", icon: /* @__PURE__ */ jsx(ApiIcon, {}), children: [
        toolsCount,
        " tool",
        toolsCount > 1 ? "s" : ""
      ] }) });
    }
  }
];

function AgentsTable({ agents, isLoading, computeLink }) {
  const { navigate } = useLinkComponent();
  const projectData = useMemo(
    () => Object.keys(agents).map((key) => {
      const agent = agents[key];
      return {
        id: key,
        name: agent.name,
        instructions: agent.instructions,
        provider: agent.provider,
        branch: void 0,
        executedAt: void 0,
        repoUrl: void 0,
        tools: agent.tools,
        modelId: agent.modelId,
        link: computeLink(key)
      };
    }),
    [agents]
  );
  const table = useReactTable({
    data: projectData,
    columns: columns$2,
    getCoreRowModel: getCoreRowModel()
  });
  if (isLoading) return /* @__PURE__ */ jsx(AgentsTableSkeleton, {});
  const ths = table.getHeaderGroups()[0];
  const rows = table.getRowModel().rows.concat();
  if (rows.length === 0) {
    return /* @__PURE__ */ jsx(EmptyAgentsTable, {});
  }
  return /* @__PURE__ */ jsx(ScrollableContainer, { children: /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(Thead, { className: "sticky top-0", children: ths.headers.map((header) => /* @__PURE__ */ jsx(Th, { style: { width: header.index === 0 ? "auto" : header.column.getSize() }, children: flexRender(header.column.columnDef.header, header.getContext()) }, header.id)) }),
    /* @__PURE__ */ jsx(Tbody, { children: rows.map((row) => /* @__PURE__ */ jsx(Row, { onClick: () => navigate(row.original.link), children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(React__default.Fragment, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
  ] }) });
}
const AgentsTableSkeleton = () => /* @__PURE__ */ jsxs(Table, { children: [
  /* @__PURE__ */ jsxs(Thead, { children: [
    /* @__PURE__ */ jsx(Th, { children: "Name" }),
    /* @__PURE__ */ jsx(Th, { width: 160, children: "Model" }),
    /* @__PURE__ */ jsx(Th, { width: 160, children: "Tools" })
  ] }),
  /* @__PURE__ */ jsx(Tbody, { children: Array.from({ length: 3 }).map((_, index) => /* @__PURE__ */ jsxs(Row, { children: [
    /* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }) }),
    /* @__PURE__ */ jsx(Cell, { width: 160, children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }) }),
    /* @__PURE__ */ jsx(Cell, { width: 160, children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }) })
  ] }, index)) })
] });
const EmptyAgentsTable = () => /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsx(
  EmptyState,
  {
    iconSlot: /* @__PURE__ */ jsx(AgentCoinIcon, {}),
    titleSlot: "Configure Agents",
    descriptionSlot: "Mastra agents are not configured yet. You can find more information in the documentation.",
    actionSlot: /* @__PURE__ */ jsxs(
      Button,
      {
        size: "lg",
        className: "w-full",
        variant: "light",
        as: "a",
        href: "https://mastra.ai/en/docs/agents/overview",
        target: "_blank",
        children: [
          /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(AgentIcon, {}) }),
          "Docs"
        ]
      }
    )
  }
) });

const RuntimeContext = () => {
  const { runtimeContext, setRuntimeContext } = usePlaygroundStore();
  const [runtimeContextValue, setRuntimeContextValue] = useState("");
  const theme = useCodemirrorTheme();
  const { handleCopy } = useCopyToClipboard({ text: runtimeContextValue });
  const runtimeContextStr = JSON.stringify(runtimeContext);
  useEffect(() => {
    const run = async () => {
      if (!isValidJson(runtimeContextStr)) {
        toast.error("Invalid JSON");
        return;
      }
      const formatted = await formatJSON(runtimeContextStr);
      setRuntimeContextValue(formatted);
    };
    run();
  }, [runtimeContextStr]);
  const handleSaveRuntimeContext = () => {
    try {
      const parsedContext = JSON.parse(runtimeContextValue);
      setRuntimeContext(parsedContext);
      toast.success("Runtime context saved successfully");
    } catch (error) {
      console.error("error", error);
      toast.error("Invalid JSON");
    }
  };
  const buttonClass = "text-icon3 hover:text-icon6";
  const formatRuntimeContext = async () => {
    if (!isValidJson(runtimeContextValue)) {
      toast.error("Invalid JSON");
      return;
    }
    const formatted = await formatJSON(runtimeContextValue);
    setRuntimeContextValue(formatted);
  };
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-2", children: [
      /* @__PURE__ */ jsx(Txt, { as: "label", variant: "ui-md", className: "text-icon3", children: "Runtime Context (JSON)" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { onClick: formatRuntimeContext, className: buttonClass, children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(Braces, {}) }) }) }),
          /* @__PURE__ */ jsx(TooltipContent, { children: "Format the Runtime Context JSON" })
        ] }),
        /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { onClick: handleCopy, className: buttonClass, children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(CopyIcon, {}) }) }) }),
          /* @__PURE__ */ jsx(TooltipContent, { children: "Copy Runtime Context" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      CodeMirror,
      {
        value: runtimeContextValue,
        onChange: setRuntimeContextValue,
        theme,
        extensions: [jsonLanguage],
        className: "h-[400px] overflow-y-scroll bg-surface3 rounded-lg overflow-hidden p-3"
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsx(Button, { onClick: handleSaveRuntimeContext, children: "Save" }) })
  ] }) });
};
const RuntimeContextWrapper = ({ children }) => {
  const { Link } = useLinkComponent();
  return /* @__PURE__ */ jsxs("div", { className: "max-w-3xl p-5 overflow-y-scroll h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-lg p-4 pb-5 bg-surface4 shadow-md space-y-3 border border-border1 mb-5", children: [
      /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-lg", className: "text-icon3", children: "Mastra provides runtime context, which is a system based on dependency injection that enables you to configure your agents and tools with runtime variables. If you find yourself creating several different agents that do very similar things, runtime context allows you to combine them into one agent." }),
      /* @__PURE__ */ jsxs(Button, { as: Link, to: "https://mastra.ai/en/docs/agents/runtime-variables", target: "_blank", children: [
        /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(ExternalLink, {}) }),
        "See documentation"
      ] })
    ] }),
    children
  ] });
};

const AgentMetadataSection = ({ title, children, hint }) => {
  const { Link } = useLinkComponent();
  return /* @__PURE__ */ jsxs("section", { className: "space-y-2 pb-7 last:pb-0", children: [
    /* @__PURE__ */ jsxs(Txt, { as: "h3", variant: "ui-md", className: "text-icon3 flex items-center gap-1", children: [
      title,
      hint && /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
        /* @__PURE__ */ jsx(TooltipTrigger, { children: /* @__PURE__ */ jsx(Link, { href: hint.link, target: "_blank", rel: "noopener noreferrer", children: /* @__PURE__ */ jsx(Icon, { className: "text-icon3", size: "sm", children: /* @__PURE__ */ jsx(InfoIcon$1, {}) }) }) }),
        /* @__PURE__ */ jsx(TooltipContent, { children: hint.title })
      ] }) })
    ] }),
    children
  ] });
};

const AgentMetadataList = ({ children }) => {
  return /* @__PURE__ */ jsx("ul", { className: "flex flex-wrap gap-2", children });
};
const AgentMetadataListItem = ({ children }) => {
  return /* @__PURE__ */ jsx("li", { className: "shrink-0 font-medium", children });
};
const AgentMetadataListEmpty = ({ children }) => {
  return /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon6", children });
};

const AgentMetadataWrapper = ({ children }) => {
  return /* @__PURE__ */ jsx("div", { className: "py-2 overflow-y-auto h-full px-5", children });
};

const useScoresByEntityId = (entityId, entityType, page = 0) => {
  const client = useMastraClient();
  const [scores, setScores] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      try {
        const res = await client.getScoresByEntityId({
          entityId,
          entityType,
          page: page || 0,
          perPage: 10
        });
        setScores(res);
        setIsLoading(false);
      } catch (error) {
        setScores(null);
        setIsLoading(false);
      }
    };
    fetchScores();
  }, [entityId, entityType, page]);
  return { scores, isLoading };
};
const useScoresByScorerId = ({ scorerId, page = 0, entityId, entityType }) => {
  const client = useMastraClient();
  const [scores, setScores] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchScores = async () => {
      setIsLoading(true);
      try {
        const res = await client.getScoresByScorerId({
          scorerId,
          page: page || 0,
          entityId: entityId || void 0,
          entityType: entityType || void 0,
          perPage: 10
        });
        setScores(res);
        setIsLoading(false);
      } catch (error) {
        setScores(null);
        setIsLoading(false);
      }
    };
    fetchScores();
  }, [scorerId, page, entityId, entityType]);
  return { scores, isLoading };
};
const useScorer = (scorerId) => {
  const client = useMastraClient();
  const [scorer, setScorer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchScorer = async () => {
      setIsLoading(true);
      try {
        const res = await client.getScorer(scorerId);
        setScorer(res);
      } catch (error) {
        setScorer(null);
        console.error("Error fetching scorer", error);
        toast.error("Error fetching scorer");
      } finally {
        setIsLoading(false);
      }
    };
    fetchScorer();
  }, [scorerId]);
  return { scorer, isLoading };
};
const useScorers = () => {
  const client = useMastraClient();
  const [scorers, setScorers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchScorers = async () => {
      setIsLoading(true);
      try {
        const res = await client.getScorers();
        setScorers(res);
      } catch (error) {
        setScorers({});
        console.error("Error fetching agents", error);
        toast.error("Error fetching agents");
      } finally {
        setIsLoading(false);
      }
    };
    fetchScorers();
  }, []);
  return { scorers, isLoading };
};

const Entity = ({ children, className, onClick }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      tabIndex: onClick ? 0 : void 0,
      onKeyDown: (e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      },
      className: clsx(
        "flex gap-3 group/entity bg-surface3 rounded-lg border-sm border-border1 py-3 px-4",
        onClick && "cursor-pointer hover:bg-surface4 transition-all",
        className
      ),
      onClick,
      children
    }
  );
};
const EntityIcon = ({ children, className }) => {
  return /* @__PURE__ */ jsx(Icon, { size: "lg", className: clsx("text-icon3 mt-1", className), children });
};
const EntityName = ({ children, className }) => {
  return /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-lg", className: clsx("text-icon6 font-medium", className), children });
};
const EntityDescription = ({ children, className }) => {
  return /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-sm", className: clsx("text-icon3", className), children });
};
const EntityContent = ({ children, className }) => {
  return /* @__PURE__ */ jsx("div", { className, children });
};

const ScorerList = ({ entityId, entityType }) => {
  const { scorers, isLoading } = useScorers();
  if (isLoading) {
    return /* @__PURE__ */ jsx(ScorerSkeleton, {});
  }
  const scorerList = Object.keys(scorers).filter((scorerKey) => {
    const scorer = scorers[scorerKey];
    if (entityType === "AGENT") {
      return scorer.agentIds.includes(entityId);
    }
    return scorer.workflowIds.includes(entityId);
  }).map((scorerKey) => ({ ...scorers[scorerKey], id: scorerKey }));
  if (scorerList.length === 0) {
    return /* @__PURE__ */ jsx(EmptyScorerList, {});
  }
  return /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: scorerList.map((scorer) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(ScorerEntity, { scorer }) }, scorer.id)) });
};
const EmptyScorerList = () => {
  return /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-lg", className: "text-icon6", children: "No scorers were attached to this agent." });
};
const ScorerSkeleton = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-24" })
  ] });
};
const ScorerEntity = ({ scorer }) => {
  const { Link } = useLinkComponent();
  const linkRef = useRef(null);
  return /* @__PURE__ */ jsxs(Entity, { onClick: () => linkRef.current?.click(), children: [
    /* @__PURE__ */ jsx(EntityIcon, { children: /* @__PURE__ */ jsx(GaugeIcon, { className: "group-hover/entity:text-accent3" }) }),
    /* @__PURE__ */ jsxs(EntityContent, { children: [
      /* @__PURE__ */ jsx(EntityName, { children: /* @__PURE__ */ jsx(Link, { ref: linkRef, href: `/scorers/${scorer.id}`, children: scorer.scorer.config.name }) }),
      /* @__PURE__ */ jsx(EntityDescription, { children: scorer.scorer.config.description }),
      scorer.sampling?.type === "ratio" && /* @__PURE__ */ jsxs(Badge$1, { children: [
        /* @__PURE__ */ jsx("span", { className: "text-icon3", children: "Sample rate:" }),
        /* @__PURE__ */ jsx("span", { className: "text-icon6", children: scorer.sampling.rate })
      ] })
    ] })
  ] });
};

const AgentMetadata = ({
  agent,
  promptSlot,
  hasMemoryEnabled,
  computeToolLink,
  computeWorkflowLink
}) => {
  const providerIcon = providerMapToIcon[agent.provider || "openai.chat"];
  const agentTools = agent.tools ?? {};
  const tools = Object.keys(agentTools).map((key) => agentTools[key]);
  const agentWorkflows = agent.workflows ?? {};
  const workflows = Object.keys(agentWorkflows).map((key) => agentWorkflows[key]);
  return /* @__PURE__ */ jsxs(AgentMetadataWrapper, { children: [
    /* @__PURE__ */ jsx(AgentMetadataSection, { title: "Model", children: /* @__PURE__ */ jsx(Badge$1, { icon: providerIcon, className: "font-medium", children: agent.modelId || "N/A" }) }),
    /* @__PURE__ */ jsx(
      AgentMetadataSection,
      {
        title: "Memory",
        hint: {
          link: "https://mastra.ai/en/docs/agents/agent-memory",
          title: "Agent Memory documentation"
        },
        children: /* @__PURE__ */ jsx(Badge$1, { icon: /* @__PURE__ */ jsx(MemoryIcon, {}), variant: hasMemoryEnabled ? "success" : "error", className: "font-medium", children: hasMemoryEnabled ? "On" : "Off" })
      }
    ),
    /* @__PURE__ */ jsx(
      AgentMetadataSection,
      {
        title: "Tools",
        hint: {
          link: "https://mastra.ai/en/docs/agents/using-tools-and-mcp",
          title: "Using Tools and MCP documentation"
        },
        children: /* @__PURE__ */ jsx(AgentMetadataToolList, { tools, computeToolLink })
      }
    ),
    /* @__PURE__ */ jsx(
      AgentMetadataSection,
      {
        title: "Workflows",
        hint: {
          link: "https://mastra.ai/en/docs/workflows/overview",
          title: "Workflows documentation"
        },
        children: /* @__PURE__ */ jsx(AgentMetadataWorkflowList, { workflows, computeWorkflowLink })
      }
    ),
    /* @__PURE__ */ jsx(AgentMetadataSection, { title: "Scorers", children: /* @__PURE__ */ jsx(AgentMetadataScorerList, { entityId: agent.name }) }),
    /* @__PURE__ */ jsx(AgentMetadataSection, { title: "System Prompt", children: promptSlot })
  ] });
};
const AgentMetadataToolList = ({ tools, computeToolLink }) => {
  const { Link } = useLinkComponent();
  if (tools.length === 0) {
    return /* @__PURE__ */ jsx(AgentMetadataListEmpty, { children: "No tools" });
  }
  return /* @__PURE__ */ jsx(AgentMetadataList, { children: tools.map((tool) => /* @__PURE__ */ jsx(AgentMetadataListItem, { children: /* @__PURE__ */ jsx(Link, { href: computeToolLink(tool), children: /* @__PURE__ */ jsx(Badge$1, { icon: /* @__PURE__ */ jsx(ToolsIcon, { className: "text-[#ECB047]" }), children: tool.id }) }) }, tool.id)) });
};
const AgentMetadataScorerList = ({ entityId }) => {
  return /* @__PURE__ */ jsx("div", { className: "px-5 pb-5", children: /* @__PURE__ */ jsx(ScorerList, { entityId, entityType: "AGENT" }) });
};
const AgentMetadataWorkflowList = ({ workflows, computeWorkflowLink }) => {
  const { Link } = useLinkComponent();
  if (workflows.length === 0) {
    return /* @__PURE__ */ jsx(AgentMetadataListEmpty, { children: "No workflows" });
  }
  return /* @__PURE__ */ jsx(AgentMetadataList, { children: workflows.map((workflow) => /* @__PURE__ */ jsx(AgentMetadataListItem, { children: /* @__PURE__ */ jsx(Link, { href: computeWorkflowLink(workflow), children: /* @__PURE__ */ jsx(Badge$1, { icon: /* @__PURE__ */ jsx(WorkflowIcon, { className: "text-accent3" }), children: workflow.name }) }) }, workflow.name)) });
};

const AgentMetadataPrompt = ({ prompt }) => {
  return /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-md", className: "bg-surface4 text-icon6 whitespace-pre-wrap rounded-lg px-2 py-1.5 text-sm", children: prompt });
};

const EntityHeader = ({ icon, title, isLoading, children }) => {
  return /* @__PURE__ */ jsxs("div", { className: "p-5 w-full overflow-x-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-icon6 flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(Icon, { size: "lg", className: "bg-surface4 rounded-md p-1", children: icon }),
      isLoading ? /* @__PURE__ */ jsx(Skeleton, { className: "h-3 w-1/3" }) : /* @__PURE__ */ jsx("div", { className: "flex min-w-0 items-center gap-4", children: /* @__PURE__ */ jsx(Txt, { variant: "header-md", as: "h2", className: "truncate font-medium", children: title }) })
    ] }),
    children && /* @__PURE__ */ jsx("div", { className: "pt-2", children })
  ] });
};

const AgentEntityHeader = ({ agentId, isLoading, agentName }) => {
  const { handleCopy } = useCopyToClipboard({ text: agentId });
  return /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsx(EntityHeader, { icon: /* @__PURE__ */ jsx(AgentIcon, {}), title: agentName, isLoading, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { onClick: handleCopy, className: "h-badge-default shrink-0", children: /* @__PURE__ */ jsx(Badge$1, { icon: /* @__PURE__ */ jsx(CopyIcon, {}), variant: "default", children: agentId }) }) }),
    /* @__PURE__ */ jsx(TooltipContent, { children: "Copy Agent ID for use in code" })
  ] }) }) });
};

const Threads = ({ children }) => {
  return /* @__PURE__ */ jsx("nav", { className: "bg-surface2 border-r-sm border-border1 min-h-full overflow-hidden", children });
};
const ThreadLink = ({ children, as: Component = "a", href, className, prefetch, to }) => {
  return /* @__PURE__ */ jsx(
    Component,
    {
      href,
      prefetch,
      to,
      className: clsx("text-ui-sm flex h-full w-full flex-col justify-center font-medium", className),
      children
    }
  );
};
const ThreadList = ({ children }) => {
  return /* @__PURE__ */ jsx("ol", { children });
};
const ThreadItem = ({ children, isActive }) => {
  return /* @__PURE__ */ jsx(
    "li",
    {
      className: clsx(
        "border-b-sm border-border1 hover:bg-surface3 group flex h-[54px] items-center justify-between gap-2 pl-5 py-2",
        isActive && "bg-surface4"
      ),
      children
    }
  );
};
const ThreadDeleteButton = ({ onClick }) => {
  return /* @__PURE__ */ jsx(
    Button,
    {
      className: "shrink-0 border-none bg-transparent opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100",
      onClick,
      children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(X, { "aria-label": "delete thread", className: "text-icon3" }) })
    }
  );
};

const AlertDialogRoot = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
function AlertDialog({
  open,
  onOpenChange,
  children
}) {
  return /* @__PURE__ */ jsx(AlertDialogRoot, { open, onOpenChange, children });
}
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-[#141414] p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className), ...props });
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Title, { ref, className: cn("text-lg font-semibold", className), ...props }));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Description, { ref, className: cn("text-sm text-muted-foreground", className), ...props }));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(AlertDialogPrimitive.Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
AlertDialog.Trigger = AlertDialogTrigger;
AlertDialog.Portal = AlertDialogPortal;
AlertDialog.Overlay = AlertDialogOverlay;
AlertDialog.Content = AlertDialogContent;
AlertDialog.Header = AlertDialogHeader;
AlertDialog.Footer = AlertDialogFooter;
AlertDialog.Title = AlertDialogTitle;
AlertDialog.Description = AlertDialogDescription;
AlertDialog.Action = AlertDialogAction;
AlertDialog.Cancel = AlertDialogCancel;

const ChatThreads = ({
  computeNewThreadLink,
  computeThreadLink,
  threads,
  isLoading,
  threadId,
  onDelete
}) => {
  const { Link } = useLinkComponent();
  const [deleteId, setDeleteId] = useState(null);
  if (isLoading) {
    return /* @__PURE__ */ jsx(ChatThreadSkeleton, {});
  }
  const reverseThreads = [...threads].reverse();
  return /* @__PURE__ */ jsxs("div", { className: "overflow-y-auto h-full w-full", children: [
    /* @__PURE__ */ jsx(Threads, { children: /* @__PURE__ */ jsxs(ThreadList, { children: [
      /* @__PURE__ */ jsx(ThreadItem, { children: /* @__PURE__ */ jsx(ThreadLink, { as: Link, to: computeNewThreadLink(), children: /* @__PURE__ */ jsxs("span", { className: "text-accent1 flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Icon, { className: "bg-surface4 rounded-lg", size: "lg", children: /* @__PURE__ */ jsx(Plus, {}) }),
        "New Chat"
      ] }) }) }),
      reverseThreads.length === 0 && /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-sm", className: "text-icon3 py-3 px-5 max-w-[12rem]", children: "Your conversations will appear here once you start chatting!" }),
      reverseThreads.map((thread) => {
        const isActive = thread.id === threadId;
        return /* @__PURE__ */ jsxs(ThreadItem, { isActive, children: [
          /* @__PURE__ */ jsxs(ThreadLink, { as: Link, to: computeThreadLink(thread.id), children: [
            /* @__PURE__ */ jsx(ThreadTitle, { title: thread.title }),
            /* @__PURE__ */ jsx("span", { children: formatDay(thread.createdAt) })
          ] }),
          /* @__PURE__ */ jsx(ThreadDeleteButton, { onClick: () => setDeleteId(thread.id) })
        ] }, thread.id);
      })
    ] }) }),
    /* @__PURE__ */ jsx(
      DeleteThreadDialog,
      {
        open: !!deleteId,
        onOpenChange: () => setDeleteId(null),
        onDelete: () => {
          if (deleteId) {
            onDelete(deleteId);
          }
        }
      }
    )
  ] });
};
const DeleteThreadDialog = ({ open, onOpenChange, onDelete }) => {
  return /* @__PURE__ */ jsx(AlertDialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(AlertDialog.Content, { children: [
    /* @__PURE__ */ jsxs(AlertDialog.Header, { children: [
      /* @__PURE__ */ jsx(AlertDialog.Title, { children: "Are you absolutely sure?" }),
      /* @__PURE__ */ jsx(AlertDialog.Description, { children: "This action cannot be undone. This will permanently delete your chat and remove it from our servers." })
    ] }),
    /* @__PURE__ */ jsxs(AlertDialog.Footer, { children: [
      /* @__PURE__ */ jsx(AlertDialog.Cancel, { children: "Cancel" }),
      /* @__PURE__ */ jsx(AlertDialog.Action, { onClick: onDelete, children: "Continue" })
    ] })
  ] }) });
};
const ChatThreadSkeleton = () => /* @__PURE__ */ jsxs("div", { className: "p-4 w-full h-full space-y-2", children: [
  /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-9 w-9" }) }),
  /* @__PURE__ */ jsx(Skeleton, { className: "h-4" }),
  /* @__PURE__ */ jsx(Skeleton, { className: "h-4" }),
  /* @__PURE__ */ jsx(Skeleton, { className: "h-4" }),
  /* @__PURE__ */ jsx(Skeleton, { className: "h-4" }),
  /* @__PURE__ */ jsx(Skeleton, { className: "h-4" })
] });
function isDefaultThreadName(name) {
  const defaultPattern = /^New Thread \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
  return defaultPattern.test(name);
}
function ThreadTitle({ title }) {
  if (!title) {
    return null;
  }
  if (isDefaultThreadName(title)) {
    return /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: "Chat from" });
  }
  return /* @__PURE__ */ jsx("span", { className: "truncate max-w-[14rem]", children: title });
}
const formatDay = (date) => {
  const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  };
  return new Date(date).toLocaleString("en-us", options).replace(",", " at");
};

const convertMessage$1 = (message) => {
  return message;
};
function MastraNetworkRuntimeProvider({
  children,
  agentId,
  initialMessages,
  memory,
  threadId,
  modelSettings
}) {
  const [isRunning, setIsRunning] = useState(false);
  const [messages, setMessages] = useState(initialMessages || []);
  const [currentThreadId, setCurrentThreadId] = useState(threadId);
  const { frequencyPenalty, presencePenalty, maxRetries, maxSteps, maxTokens, temperature, topK, topP, instructions } = modelSettings;
  useEffect(() => {
    if (messages.length === 0 || currentThreadId !== threadId) {
      if (initialMessages && threadId && memory) {
        setMessages(initialMessages);
        setCurrentThreadId(threadId);
      }
    }
  }, [initialMessages, threadId, memory, messages]);
  const mastra = useMastraClient();
  const network = mastra.getNetwork(agentId);
  const onNew = async (message) => {
    if (message.content[0]?.type !== "text") throw new Error("Only text messages are supported");
    const input = message.content[0].text;
    setMessages((currentConversation) => [...currentConversation, { role: "user", content: input }]);
    setIsRunning(true);
    try {
      let updater = function() {
        setMessages((currentConversation) => {
          const message2 = {
            role: "assistant",
            content: [{ type: "text", text: content }]
          };
          if (!assistantMessageAdded) {
            assistantMessageAdded = true;
            return [...currentConversation, message2];
          }
          return [...currentConversation.slice(0, -1), message2];
        });
      };
      const response = await network.stream({
        messages: [
          {
            role: "user",
            content: input
          }
        ],
        runId: agentId,
        frequencyPenalty,
        presencePenalty,
        maxRetries,
        maxSteps,
        maxTokens,
        temperature,
        topK,
        topP,
        instructions,
        ...memory ? { threadId, resourceId: agentId } : {}
      });
      if (!response.body) {
        throw new Error("No response body");
      }
      const parts = [];
      let content = "";
      let currentTextPart = null;
      let assistantMessageAdded = false;
      await processDataStream({
        stream: response.body,
        onTextPart(value) {
          if (currentTextPart == null) {
            currentTextPart = {
              type: "text",
              text: value
            };
            parts.push(currentTextPart);
          } else {
            currentTextPart.text += value;
          }
          content += value;
          updater();
        },
        async onToolCallPart(value) {
          console.log("Tool call received:", value);
          setMessages((currentConversation) => {
            const lastMessage = currentConversation[currentConversation.length - 1];
            if (lastMessage && lastMessage.role === "assistant") {
              const updatedMessage = {
                ...lastMessage,
                content: Array.isArray(lastMessage.content) ? [
                  ...lastMessage.content,
                  {
                    type: "tool-call",
                    toolCallId: value.toolCallId,
                    toolName: value.toolName,
                    args: value.args
                  }
                ] : [
                  ...typeof lastMessage.content === "string" ? [{ type: "text", text: lastMessage.content }] : [],
                  {
                    type: "tool-call",
                    toolCallId: value.toolCallId,
                    toolName: value.toolName,
                    args: value.args
                  }
                ]
              };
              return [...currentConversation.slice(0, -1), updatedMessage];
            }
            const newMessage = {
              role: "assistant",
              content: [
                { type: "text", text: content },
                {
                  type: "tool-call",
                  toolCallId: value.toolCallId,
                  toolName: value.toolName,
                  args: value.args
                }
              ]
            };
            return [...currentConversation, newMessage];
          });
        },
        async onToolResultPart(value) {
          console.log("Tool call result received:", value);
          setMessages((currentConversation) => {
            const lastMessage = currentConversation[currentConversation.length - 1];
            if (lastMessage && lastMessage.role === "assistant" && Array.isArray(lastMessage.content)) {
              const updatedContent = lastMessage.content.map((part) => {
                if (typeof part === "object" && part.type === "tool-call" && part.toolCallId === value.toolCallId) {
                  return {
                    ...part,
                    result: value.result
                  };
                }
                return part;
              });
              const updatedMessage = {
                ...lastMessage,
                content: updatedContent
              };
              return [...currentConversation.slice(0, -1), updatedMessage];
            }
            return currentConversation;
          });
        },
        onErrorPart(error) {
          throw new Error(error);
        }
      });
      console.log(messages);
      setIsRunning(false);
    } catch (error) {
      console.error("Error occurred in MastraRuntimeProvider", error);
      setIsRunning(false);
    }
  };
  const runtime = useExternalStoreRuntime({
    isRunning,
    messages,
    convertMessage: convertMessage$1,
    onNew
  });
  return /* @__PURE__ */ jsxs(AssistantRuntimeProvider, { runtime, children: [
    " ",
    children,
    " "
  ] });
}

function MarkdownRenderer({ children }) {
  const processedText = children.replace(/\\n/g, "\n");
  return /* @__PURE__ */ jsx(Markdown, { remarkPlugins: [remarkGfm], components: COMPONENTS, className: "space-y-3", children: processedText });
}
const HighlightedPre = React__default.memo(({ children, language, ...props }) => {
  const [tokens, setTokens] = useState([]);
  useEffect(() => {
    highlight(children, language).then((tokens2) => {
      if (tokens2) setTokens(tokens2);
    });
  }, [children, language]);
  if (!tokens.length) {
    return /* @__PURE__ */ jsx("pre", { ...props, children });
  }
  return /* @__PURE__ */ jsx("pre", { ...props, children: /* @__PURE__ */ jsx("code", { children: tokens.map((line, lineIndex) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("span", { children: line.map((token, tokenIndex) => {
      const style = typeof token.htmlStyle === "string" ? void 0 : token.htmlStyle;
      return /* @__PURE__ */ jsx(
        "span",
        {
          className: "text-shiki-light bg-shiki-light-bg dark:text-shiki-dark dark:bg-shiki-dark-bg",
          style,
          children: token.content
        },
        tokenIndex
      );
    }) }, lineIndex),
    lineIndex !== tokens.length - 1 && "\n"
  ] })) }) });
});
HighlightedPre.displayName = "HighlightedCode";
const CodeBlock = ({ children, className, language, ...restProps }) => {
  const code = typeof children === "string" ? children : childrenTakeAllStringContents(children);
  const preClass = cn(
    "overflow-x-scroll rounded-md border bg-background/50 p-4 font-mono text-sm [scrollbar-width:none]",
    className
  );
  return /* @__PURE__ */ jsxs("div", { className: "group/code relative mb-4", children: [
    /* @__PURE__ */ jsx(
      Suspense,
      {
        fallback: /* @__PURE__ */ jsx("pre", { className: preClass, ...restProps, children }),
        children: /* @__PURE__ */ jsx(HighlightedPre, { language, className: preClass, children: code })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "invisible absolute right-2 top-2 flex space-x-1 rounded-lg p-1 opacity-0 transition-all duration-200 group-hover/code:visible group-hover/code:opacity-100", children: /* @__PURE__ */ jsx(CopyButton, { content: code, copyMessage: "Copied code to clipboard" }) })
  ] });
};
function childrenTakeAllStringContents(element) {
  if (typeof element === "string") {
    return element;
  }
  if (element?.props?.children) {
    let children = element.props.children;
    if (Array.isArray(children)) {
      return children.map((child) => childrenTakeAllStringContents(child)).join("");
    } else {
      return childrenTakeAllStringContents(children);
    }
  }
  return "";
}
const COMPONENTS = {
  h1: ({ children, ...props }) => /* @__PURE__ */ jsx("h1", { className: "text-2xl font-semibold", ...props, children }),
  h2: ({ children, ...props }) => /* @__PURE__ */ jsx("h2", { className: "font-semibold text-xl", ...props, children }),
  h3: ({ children, ...props }) => /* @__PURE__ */ jsx("h3", { className: "font-semibold text-lg", ...props, children }),
  h4: ({ children, ...props }) => /* @__PURE__ */ jsx("h4", { className: "font-semibold text-base", ...props, children }),
  h5: ({ children, ...props }) => /* @__PURE__ */ jsx("h5", { className: "font-medium", ...props, children }),
  strong: ({ children, ...props }) => /* @__PURE__ */ jsx("strong", { className: "font-semibold", ...props, children }),
  a: ({ children, ...props }) => /* @__PURE__ */ jsx("a", { className: "underline underline-offset-2", ...props, children }),
  blockquote: ({ children, ...props }) => /* @__PURE__ */ jsx("blockquote", { className: "border-l-2 border-primary pl-4", ...props, children }),
  code: ({ children, className, ...rest }) => {
    const match = /language-(\w+)/.exec(className || "");
    return match ? /* @__PURE__ */ jsx(CodeBlock, { className, language: match[1], ...rest, children }) : /* @__PURE__ */ jsx(
      "code",
      {
        className: cn(
          "font-mono [:not(pre)>&]:rounded-md [:not(pre)>&]:bg-background/50 [:not(pre)>&]:px-1 [:not(pre)>&]:py-0.5"
        ),
        ...rest,
        children
      }
    );
  },
  pre: ({ children }) => children,
  ol: ({ children, ...props }) => /* @__PURE__ */ jsx("ol", { className: "list-decimal space-y-2 pl-6", ...props, children }),
  ul: ({ children, ...props }) => /* @__PURE__ */ jsx("ul", { className: "list-disc space-y-2 pl-6", ...props, children }),
  li: ({ children, ...props }) => /* @__PURE__ */ jsx("li", { className: "my-1.5", ...props, children }),
  table: ({ children, ...props }) => /* @__PURE__ */ jsx("table", { className: "w-full border-collapse overflow-y-auto rounded-md border border-foreground/20", ...props, children }),
  th: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "th",
    {
      className: "border border-foreground/20 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
      ...props,
      children
    }
  ),
  td: ({ children, ...props }) => /* @__PURE__ */ jsx(
    "td",
    {
      className: "border border-foreground/20 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
      ...props,
      children
    }
  ),
  tr: ({ children, ...props }) => /* @__PURE__ */ jsx("tr", { className: "m-0 border-t p-0 even:bg-muted", ...props, children }),
  p: ({ children, ...props }) => /* @__PURE__ */ jsx("p", { className: "whitespace-pre-wrap leading-relaxed", ...props, children }),
  hr: ({ ...props }) => /* @__PURE__ */ jsx("hr", { className: "border-foreground/20", ...props })
};

const purpleClasses = {
  bg: "bg-[rgba(124,80,175,0.25)]",
  text: "text-[rgb(180,140,230)]",
  hover: "hover:text-[rgb(200,160,250)]"};
const ToolFallback = (props) => {
  const { toolCallId, toolName, args, argsText, result, status } = props;
  const [expandedAgents, setExpandedAgents] = useState({});
  const actions = args?.actions || [];
  if (actions.length === 0) {
    return null;
  }
  const toggleAgent = (agentId) => {
    setExpandedAgents((prev) => ({
      ...prev,
      [agentId]: !prev[agentId]
    }));
  };
  const extractUrls = (text) => {
    if (typeof text !== "string") return [];
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  };
  return /* @__PURE__ */ jsx("div", { className: "mb-4 w-full rounded-lg border border-gray-700 overflow-hidden shadow-md", children: actions.map((action, index) => {
    const agentId = `${toolCallId || "tool"}-${action.agent}-${index}`;
    const isExpanded = expandedAgents[agentId] || false;
    const urls = result ? extractUrls(result) : [];
    return /* @__PURE__ */ jsxs("div", { className: `border-b border-gray-700 ${index === actions.length - 1 ? "border-b-0" : ""}`, children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex items-center justify-between px-4 py-3 bg-gray-900 hover:bg-gray-800 cursor-pointer",
          onClick: () => toggleAgent(agentId),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx("div", { className: cn("flex h-6 w-6 items-center justify-center rounded-full", purpleClasses.bg), children: status?.type === "running" ? /* @__PURE__ */ jsx(LoaderCircle, { className: cn("h-4 w-4 animate-spin", purpleClasses.text) }) : /* @__PURE__ */ jsx(CheckIcon$1, { className: cn("h-4 w-4", purpleClasses.text) }) }),
              /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("p", { className: "font-medium text-sm text-gray-100", children: action.agent?.replaceAll("_", " ") }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: cn("text-xs px-2 py-1 rounded-full", purpleClasses.bg, purpleClasses.text), children: status?.type === "running" ? "Processing..." : "Complete" }),
              isExpanded ? /* @__PURE__ */ jsx(ChevronUpIcon, { className: "h-4 w-4 text-gray-300" }) : /* @__PURE__ */ jsx(ChevronDownIcon, { className: "h-4 w-4 text-gray-300" })
            ] })
          ]
        }
      ),
      isExpanded && /* @__PURE__ */ jsxs("div", { className: "px-4 py-3 bg-[#111]", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-gray-300 mb-1", children: "Query:" }),
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-gray-900 rounded border border-gray-700", children: /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-200 whitespace-pre-wrap", children: action.input }) })
        ] }),
        result && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-gray-300 mb-1", children: "Result:" }),
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-gray-900 rounded border border-gray-700 max-h-60 overflow-auto", children: typeof result === "string" ? /* @__PURE__ */ jsx("div", { className: "text-sm text-gray-200", children: /* @__PURE__ */ jsx(MarkdownRenderer, { children: result }) }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-200 whitespace-pre-wrap", children: JSON.stringify(result, null, 2) }) }),
          urls.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-gray-300 mb-1", children: "Sources:" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              urls.slice(0, 3).map((url, i) => /* @__PURE__ */ jsxs(
                "a",
                {
                  href: url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: cn(
                    "inline-flex items-center gap-1 text-xs hover:underline",
                    purpleClasses.text,
                    purpleClasses.hover
                  ),
                  children: [
                    /* @__PURE__ */ jsxs("span", { children: [
                      "Source ",
                      i + 1
                    ] }),
                    /* @__PURE__ */ jsx(ExternalLinkIcon, { className: "h-3 w-3" })
                  ]
                },
                i
              )),
              urls.length > 3 && /* @__PURE__ */ jsxs("span", { className: "text-xs text-gray-400", children: [
                "+",
                urls.length - 3,
                " more"
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }, agentId);
  }) });
};

const defaultModelSettings = {
  maxRetries: 2,
  maxSteps: 5,
  temperature: 0.5,
  topP: 1
};
const NetworkContext = createContext({});
function NetworkProvider({ children }) {
  const [modelSettings, setModelSettings] = useState(defaultModelSettings);
  const [chatWithLoop, setChatWithLoop] = useState(false);
  const [maxIterations, setMaxIterations] = useState(void 0);
  const resetModelSettings = () => {
    setModelSettings(defaultModelSettings);
    setChatWithLoop(false);
    setMaxIterations(void 0);
  };
  return /* @__PURE__ */ jsx(
    NetworkContext.Provider,
    {
      value: {
        modelSettings,
        setModelSettings,
        resetModelSettings,
        chatWithLoop,
        setChatWithLoop,
        maxIterations,
        setMaxIterations
      },
      children
    }
  );
}

const NetworkChat = ({ agentId, memory }) => {
  const { modelSettings } = useContext(NetworkContext);
  return /* @__PURE__ */ jsx(MastraNetworkRuntimeProvider, { agentId, memory, modelSettings, children: /* @__PURE__ */ jsx(Thread, { ToolFallback }) });
};

const VNextNetworkChatContext = createContext(void 0);
const VNextNetworkChatProvider = ({ children }) => {
  const [state, setState] = useState({});
  const { chatWithLoop } = useContext(NetworkContext);
  const handleStep = (uuid, record) => {
    const addFinishStep = chatWithLoop && record.type === "step-finish" && record.payload?.id === "final-step" || record.type === "error";
    let id = record?.type === "finish" ? "finish" : record.type === "start" ? "start" : record.payload?.id;
    if (id?.includes("mapping_")) return;
    setState((prevState) => {
      const current = prevState[uuid];
      if (record.type === "error") {
        id = current?.executionSteps?.[current?.executionSteps.length - 1];
      }
      const currentMetadata = current?.steps?.[id]?.metadata;
      let startTime = currentMetadata?.startTime;
      let endTime = currentMetadata?.endTime;
      if (record.type === "step-start") {
        startTime = Date.now();
      }
      if (record.type === "step-finish" || record.type === "error") {
        endTime = Date.now();
      }
      return {
        ...prevState,
        [uuid]: {
          ...current,
          runId: current?.runId || record?.payload?.runId,
          executionSteps: current?.steps?.[id] ? [...current?.executionSteps, ...addFinishStep ? ["finish"] : []] : [...current?.executionSteps || [], id],
          steps: {
            ...current?.steps,
            [id]: {
              ...current?.steps?.[id] || {},
              [record.type]: record.payload || record?.error,
              metadata: {
                startTime,
                endTime
              }
            }
          }
        }
      };
    });
  };
  return /* @__PURE__ */ jsx(VNextNetworkChatContext.Provider, { value: { state, handleStep, setState }, children });
};
const useVNextNetworkChat = () => {
  const context = useContext(VNextNetworkChatContext);
  if (context === void 0) {
    throw new Error("useVNextNetworkChat must be used within a VNextNetworkChatProvider");
  }
  return context;
};

const toSigFigs = (num, sigFigs) => {
  return Number(num.toPrecision(sigFigs));
};

const Clock = ({ startedAt, endedAt }) => {
  const [time, setTime] = useState(startedAt);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 100);
    return () => clearInterval(interval);
  }, [startedAt]);
  const timeDiff = endedAt ? endedAt - startedAt : time - startedAt;
  return /* @__PURE__ */ jsxs("span", { className: "text-xs text-icon3", children: [
    toSigFigs(timeDiff, 3),
    "ms"
  ] });
};

const lodashTitleCase = (str) => {
  const camelCased = str.replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : "").replace(/^(.)/, (char) => char.toLowerCase());
  return camelCased.replace(/([A-Z])/g, " $1").replace(/^./, (str2) => str2.toUpperCase()).trim();
};

function extractConditions(group, type) {
  let result = [];
  if (!group) return result;
  function recurse(group2, conj) {
    if (typeof group2 === "string") {
      result.push({ type, fnString: group2 });
    } else {
      const simpleCondition = Object.entries(group2).find(([key]) => key.includes("."));
      if (simpleCondition) {
        const [key, queryValue] = simpleCondition;
        const [stepId, ...pathParts] = key.split(".");
        const ref = {
          step: {
            id: stepId
          },
          path: pathParts.join(".")
        };
        result.push({
          type,
          ref,
          query: { [queryValue === true || queryValue === false ? "is" : "eq"]: String(queryValue) },
          conj
        });
      }
      if ("ref" in group2) {
        const { ref, query } = group2;
        result.push({ type, ref, query, conj });
      }
      if ("and" in group2) {
        for (const subGroup of group2.and) {
          recurse({ ...subGroup }, "and");
        }
      }
      if ("or" in group2) {
        for (const subGroup of group2.or) {
          recurse({ ...subGroup }, "or");
        }
      }
      if ("not" in group2) {
        recurse({ ...group2.not }, "not");
      }
    }
  }
  recurse(group);
  return result.reverse();
}
const getLayoutedElements = (nodes, edges) => {
  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: "TB" });
  edges.forEach((edge) => g.setEdge(edge.source, edge.target));
  nodes.forEach(
    (node) => g.setNode(node.id, {
      ...node,
      width: node.measured?.width ?? 274,
      height: node.measured?.height ?? (node?.data?.isLarge ? 260 : 100)
    })
  );
  Dagre.layout(g);
  const fullWidth = g.graph()?.width ? g.graph().width / 2 : 0;
  const fullHeight = g.graph()?.height ? g.graph().height / 2 : 0;
  return {
    nodes: nodes.map((node) => {
      const position = g.node(node.id);
      const positionX = position.x - (node.measured?.width ?? 274) / 2;
      const positionY = position.y - (node.measured?.height ?? (node?.data?.isLarge ? 260 : 100)) / 2;
      const x = positionX;
      const y = positionY;
      return { ...node, position: { x, y } };
    }),
    edges,
    fullWidth,
    fullHeight
  };
};
const defaultEdgeOptions = {
  animated: true,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: "#8e8e8e"
  }
};
const contructLegacyNodesAndEdges = ({
  stepGraph,
  stepSubscriberGraph,
  steps: mainSteps = {}
}) => {
  if (!stepGraph) {
    return { nodes: [], edges: [] };
  }
  const { initial, ...stepsList } = stepGraph;
  if (!initial.length) {
    return { nodes: [], edges: [] };
  }
  let nodes = [];
  let edges = [];
  let allSteps = [];
  for (const [_index, _step] of initial.entries()) {
    const step = _step.step;
    const stepId = step.id;
    const steps = [_step, ...stepsList?.[stepId] || []]?.reduce((acc, step2, i) => {
      const { stepGraph: stepWflowGraph, stepSubscriberGraph: stepWflowSubscriberGraph } = mainSteps[step2.step.id] || {};
      const hasGraph = !!stepWflowGraph;
      const nodeId = nodes.some((node) => node.id === step2.step.id) ? `${step2.step.id}-${i}` : step2.step.id;
      let newStep = {
        ...step2.step,
        label: step2.step.id,
        originalId: step2.step.id,
        type: hasGraph ? "nested-node" : "default-node",
        id: nodeId,
        stepGraph: stepWflowGraph,
        stepSubscriberGraph: stepWflowSubscriberGraph
      };
      let conditionType = "when";
      if (step2.config?.serializedWhen) {
        conditionType = step2.step.id?.endsWith("_if") ? "if" : step2.step.id?.endsWith("_else") ? "else" : "when";
        const conditions = extractConditions(step2.config.serializedWhen, conditionType);
        const conditionStep = {
          id: crypto.randomUUID(),
          conditions,
          type: "condition-node",
          isLarge: (conditions?.length > 1 || conditions.some(({ fnString }) => !!fnString)) && conditionType !== "else"
        };
        acc.push(conditionStep);
      }
      if (conditionType === "if" || conditionType === "else") {
        newStep = {
          ...newStep,
          label: conditionType === "if" ? "start if" : "start else"
        };
      }
      newStep = {
        ...newStep,
        label: step2.config?.loopLabel || newStep.label
      };
      acc.push(newStep);
      return acc;
    }, []);
    allSteps = [...allSteps, ...steps];
    const newNodes = [...steps].map((step2, index) => {
      const subscriberGraph = stepSubscriberGraph?.[step2.id];
      return {
        id: step2.id,
        position: { x: _index * 300, y: index * 100 },
        type: step2.type,
        data: {
          conditions: step2.conditions,
          label: step2.label,
          description: step2.description,
          withoutTopHandle: subscriberGraph?.[step2.id] ? false : index === 0,
          withoutBottomHandle: subscriberGraph ? false : index === steps.length - 1,
          isLarge: step2.isLarge,
          stepGraph: step2.stepGraph,
          stepSubscriberGraph: step2.stepSubscriberGraph
        }
      };
    });
    nodes = [...nodes, ...newNodes];
    const edgeSteps = [...steps].slice(0, -1);
    const newEdges = edgeSteps.map((step2, index) => ({
      id: `e${step2.id}-${steps[index + 1].id}`,
      source: step2.id,
      target: steps[index + 1].id,
      ...defaultEdgeOptions
    }));
    edges = [...edges, ...newEdges];
  }
  if (!stepSubscriberGraph || !Object.keys(stepSubscriberGraph).length) {
    const { nodes: layoutedNodes2, edges: layoutedEdges2 } = getLayoutedElements(nodes, edges);
    return { nodes: layoutedNodes2, edges: layoutedEdges2 };
  }
  for (const [connectingStepId, stepInfoGraph] of Object.entries(stepSubscriberGraph)) {
    const { initial: initial2, ...stepsList2 } = stepInfoGraph;
    let untilOrWhileConditionId;
    const loopResultSteps = [];
    let finishedLoopStep;
    let otherLoopStep;
    if (initial2.length) {
      for (const [_index, _step] of initial2.entries()) {
        const step = _step.step;
        const stepId = step.id;
        const steps = [_step, ...stepsList2?.[stepId] || []]?.reduce((acc, step2, i) => {
          const { stepGraph: stepWflowGraph, stepSubscriberGraph: stepWflowSubscriberGraph } = mainSteps[step2.step.id] || {};
          const hasGraph = !!stepWflowGraph;
          const nodeId = nodes.some((node) => node.id === step2.step.id) ? `${step2.step.id}-${i}` : step2.step.id;
          let newStep = {
            ...step2.step,
            originalId: step2.step.id,
            label: step2.step.id,
            type: hasGraph ? "nested-node" : "default-node",
            id: nodeId,
            stepGraph: stepWflowGraph,
            stepSubscriberGraph: stepWflowSubscriberGraph
          };
          let conditionType = "when";
          const isFinishedLoop = step2.config?.loopLabel?.endsWith("loop finished");
          if (step2.config?.serializedWhen && !isFinishedLoop) {
            conditionType = step2.step.id?.endsWith("_if") ? "if" : step2.step.id?.endsWith("_else") ? "else" : step2.config?.loopType ?? "when";
            const conditions = extractConditions(step2.config.serializedWhen, conditionType);
            const conditionStep = {
              id: crypto.randomUUID(),
              conditions,
              type: "condition-node",
              isLarge: (conditions?.length > 1 || conditions.some(({ fnString }) => !!fnString)) && conditionType !== "else"
            };
            if (conditionType === "until" || conditionType === "while") {
              untilOrWhileConditionId = conditionStep.id;
            }
            acc.push(conditionStep);
          }
          if (isFinishedLoop) {
            const loopResultStep = {
              id: crypto.randomUUID(),
              type: "loop-result-node",
              loopType: "finished",
              loopResult: step2.config.loopType === "until" ? true : false
            };
            loopResultSteps.push(loopResultStep);
            acc.push(loopResultStep);
          }
          if (!isFinishedLoop && step2.config?.loopType) {
            const loopResultStep = {
              id: crypto.randomUUID(),
              type: "loop-result-node",
              loopType: step2.config.loopType,
              loopResult: step2.config.loopType === "until" ? false : true
            };
            loopResultSteps.push(loopResultStep);
            acc.push(loopResultStep);
          }
          if (conditionType === "if" || conditionType === "else") {
            newStep = {
              ...newStep,
              label: conditionType === "if" ? "start if" : "start else"
            };
          }
          if (step2.config.loopType) {
            if (isFinishedLoop) {
              finishedLoopStep = newStep;
            } else {
              otherLoopStep = newStep;
            }
          }
          newStep = {
            ...newStep,
            loopType: isFinishedLoop ? "finished" : step2.config.loopType,
            label: step2.config?.loopLabel || newStep.label
          };
          acc.push(newStep);
          return acc;
        }, []);
        let afterStep = [];
        let afterStepStepList = connectingStepId?.includes("&&") ? connectingStepId.split("&&") : [];
        if (connectingStepId?.includes("&&")) {
          afterStep = [
            {
              id: connectingStepId,
              label: connectingStepId,
              type: "after-node",
              steps: afterStepStepList
            }
          ];
        }
        const newNodes = [...steps, ...afterStep].map((step2, index) => {
          const subscriberGraph = stepSubscriberGraph?.[step2.id];
          const withBottomHandle = step2.originalId === connectingStepId || subscriberGraph;
          return {
            id: step2.id,
            position: { x: _index * 300 + 300, y: index * 100 + 100 },
            type: step2.type,
            data: {
              conditions: step2.conditions,
              label: step2.label,
              description: step2.description,
              result: step2.loopResult,
              loopType: step2.loopType,
              steps: step2.steps,
              withoutBottomHandle: withBottomHandle ? false : index === steps.length - 1,
              isLarge: step2.isLarge,
              stepGraph: step2.stepGraph,
              stepSubscriberGraph: step2.stepSubscriberGraph
            }
          };
        });
        nodes = [...nodes, ...newNodes].map((node) => ({
          ...node,
          data: {
            ...node.data,
            withoutBottomHandle: afterStepStepList.includes(node.id) ? false : node.data.withoutBottomHandle
          }
        }));
        const edgeSteps = [...steps].slice(0, -1);
        const firstEdgeStep = steps[0];
        const lastEdgeStep = steps[steps.length - 1];
        const afterEdges = afterStepStepList?.map((step2) => ({
          id: `e${step2}-${connectingStepId}`,
          source: step2,
          target: connectingStepId,
          ...defaultEdgeOptions
        }));
        const finishedLoopResult = loopResultSteps?.find((step2) => step2.loopType === "finished");
        const newEdges = edgeSteps.map((step2, index) => ({
          id: `e${step2.id}-${steps[index + 1].id}`,
          source: step2.id,
          target: steps[index + 1].id,
          remove: finishedLoopResult?.id === steps[index + 1].id,
          //remove if target is a finished loop result
          ...defaultEdgeOptions
        }))?.filter((edge) => !edge.remove);
        const connectingEdge = connectingStepId === firstEdgeStep.id ? [] : [
          {
            id: `e${connectingStepId}-${firstEdgeStep.id}`,
            source: connectingStepId,
            target: firstEdgeStep.id,
            remove: finishedLoopResult?.id === firstEdgeStep.id,
            ...defaultEdgeOptions
          }
        ]?.filter((edge) => !edge.remove);
        const lastEdge = lastEdgeStep.originalId === connectingStepId ? [
          {
            id: `e${lastEdgeStep.id}-${connectingStepId}`,
            source: lastEdgeStep.id,
            target: connectingStepId,
            ...defaultEdgeOptions
          }
        ] : [];
        edges = [...edges, ...afterEdges, ...connectingEdge, ...newEdges, ...lastEdge];
        allSteps = [...allSteps, ...steps];
      }
      if (untilOrWhileConditionId && loopResultSteps.length && finishedLoopStep && otherLoopStep) {
        const loopResultStepsEdges = loopResultSteps.map((step) => ({
          id: `e${untilOrWhileConditionId}-${step.id}`,
          source: untilOrWhileConditionId,
          target: step.id,
          ...defaultEdgeOptions
        }));
        const finishedLoopResult = loopResultSteps?.find((res) => res.loopType === "finished");
        const otherLoopResult = loopResultSteps?.find((res) => res.loopType !== "finished");
        const otherLoopEdge = {
          id: `e${otherLoopResult?.id}-${otherLoopStep?.id}`,
          source: otherLoopResult?.id,
          target: otherLoopStep.id,
          ...defaultEdgeOptions
        };
        const finishedLoopEdge = {
          id: `e${finishedLoopResult?.id}-${finishedLoopStep?.id}`,
          source: finishedLoopResult?.id,
          target: finishedLoopStep.id,
          ...defaultEdgeOptions
        };
        edges = [...edges, ...loopResultStepsEdges, otherLoopEdge, finishedLoopEdge];
      }
    }
  }
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
  return { nodes: layoutedNodes, edges: layoutedEdges };
};
const getStepNodeAndEdge = ({
  stepFlow,
  xIndex,
  yIndex,
  prevNodeIds,
  prevStepIds,
  nextStepFlow,
  condition,
  allPrevNodeIds
}) => {
  let nextNodeIds = [];
  let nextStepIds = [];
  if (nextStepFlow?.type === "step" || nextStepFlow?.type === "foreach" || nextStepFlow?.type === "loop" || nextStepFlow?.type === "waitForEvent") {
    const nextStepId = allPrevNodeIds?.includes(nextStepFlow.step.id) ? `${nextStepFlow.step.id}-${yIndex + 1}` : nextStepFlow.step.id;
    nextNodeIds = [nextStepId];
    nextStepIds = [nextStepFlow.step.id];
  }
  if (nextStepFlow?.type === "sleep" || nextStepFlow?.type === "sleepUntil") {
    const nextStepId = allPrevNodeIds?.includes(nextStepFlow.id) ? `${nextStepFlow.id}-${yIndex + 1}` : nextStepFlow.id;
    nextNodeIds = [nextStepId];
    nextStepIds = [nextStepFlow.id];
  }
  if (nextStepFlow?.type === "parallel") {
    nextNodeIds = nextStepFlow?.steps.map((step) => {
      const stepId = step.step.id;
      const nextStepId = allPrevNodeIds?.includes(stepId) ? `${stepId}-${yIndex + 1}` : stepId;
      return nextStepId;
    }) || [];
    nextStepIds = nextStepFlow?.steps.map((step) => step.step.id) || [];
  }
  if (nextStepFlow?.type === "conditional") {
    nextNodeIds = nextStepFlow?.serializedConditions.map((cond) => cond.id) || [];
    nextStepIds = nextStepFlow?.steps?.map((step) => step.step.id) || [];
  }
  if (stepFlow.type === "step" || stepFlow.type === "foreach" || stepFlow.type === "waitForEvent") {
    const hasGraph = stepFlow.step.component === "WORKFLOW";
    const nodeId = allPrevNodeIds?.includes(stepFlow.step.id) ? `${stepFlow.step.id}-${yIndex}` : stepFlow.step.id;
    const nodes = [
      ...condition ? [
        {
          id: condition.id,
          position: { x: xIndex * 300, y: yIndex * 100 },
          type: "condition-node",
          data: {
            label: condition.id,
            previousStepId: prevStepIds[prevStepIds.length - 1],
            nextStepId: stepFlow.step.id,
            withoutTopHandle: false,
            withoutBottomHandle: !nextNodeIds.length,
            isLarge: true,
            conditions: [{ type: "when", fnString: condition.fn }]
          }
        }
      ] : [],
      {
        id: nodeId,
        position: { x: xIndex * 300, y: (yIndex + (condition ? 1 : 0)) * 100 },
        type: hasGraph ? "nested-node" : "default-node",
        data: {
          label: stepFlow.step.id,
          description: stepFlow.step.description,
          withoutTopHandle: condition ? false : !prevNodeIds.length,
          withoutBottomHandle: !nextNodeIds.length,
          stepGraph: hasGraph ? stepFlow.step.serializedStepFlow : void 0,
          mapConfig: stepFlow.step.mapConfig,
          ...stepFlow.type === "waitForEvent" ? { event: stepFlow.event } : {}
        }
      }
    ];
    const edges = [
      ...!prevNodeIds.length ? [] : condition ? [
        ...prevNodeIds.map((prevNodeId, i) => ({
          id: `e${prevNodeId}-${condition.id}`,
          source: prevNodeId,
          data: { previousStepId: prevStepIds[i], nextStepId: stepFlow.step.id },
          target: condition.id,
          ...defaultEdgeOptions
        })),
        {
          id: `e${condition.id}-${nodeId}`,
          source: condition.id,
          data: { previousStepId: prevStepIds[prevStepIds.length - 1], nextStepId: stepFlow.step.id },
          target: nodeId,
          ...defaultEdgeOptions
        }
      ] : prevNodeIds.map((prevNodeId, i) => ({
        id: `e${prevNodeId}-${nodeId}`,
        source: prevNodeId,
        data: { previousStepId: prevStepIds[i], nextStepId: stepFlow.step.id },
        target: nodeId,
        ...defaultEdgeOptions
      })),
      ...!nextNodeIds.length ? [] : nextNodeIds.map((nextNodeId, i) => ({
        id: `e${nodeId}-${nextNodeId}`,
        source: nodeId,
        data: { previousStepId: stepFlow.step.id, nextStepId: nextStepIds[i] },
        target: nextNodeId,
        ...defaultEdgeOptions
      }))
    ];
    return { nodes, edges, nextPrevNodeIds: [nodeId], nextPrevStepIds: [stepFlow.step.id] };
  }
  if (stepFlow.type === "sleep" || stepFlow.type === "sleepUntil") {
    const nodeId = allPrevNodeIds?.includes(stepFlow.id) ? `${stepFlow.id}-${yIndex}` : stepFlow.id;
    const nodes = [
      ...condition ? [
        {
          id: condition.id,
          position: { x: xIndex * 300, y: yIndex * 100 },
          type: "condition-node",
          data: {
            label: condition.id,
            previousStepId: prevStepIds[prevStepIds.length - 1],
            nextStepId: stepFlow.id,
            withoutTopHandle: false,
            withoutBottomHandle: !nextNodeIds.length,
            isLarge: true,
            conditions: [{ type: "when", fnString: condition.fn }]
          }
        }
      ] : [],
      {
        id: nodeId,
        position: { x: xIndex * 300, y: (yIndex + (condition ? 1 : 0)) * 100 },
        type: "default-node",
        data: {
          label: stepFlow.id,
          withoutTopHandle: condition ? false : !prevNodeIds.length,
          withoutBottomHandle: !nextNodeIds.length,
          ...stepFlow.type === "sleepUntil" ? { date: stepFlow.date } : { duration: stepFlow.duration }
        }
      }
    ];
    const edges = [
      ...!prevNodeIds.length ? [] : condition ? [
        ...prevNodeIds.map((prevNodeId, i) => ({
          id: `e${prevNodeId}-${condition.id}`,
          source: prevNodeId,
          data: { previousStepId: prevStepIds[i], nextStepId: stepFlow.id },
          target: condition.id,
          ...defaultEdgeOptions
        })),
        {
          id: `e${condition.id}-${nodeId}`,
          source: condition.id,
          data: { previousStepId: prevStepIds[prevStepIds.length - 1], nextStepId: stepFlow.id },
          target: nodeId,
          ...defaultEdgeOptions
        }
      ] : prevNodeIds.map((prevNodeId, i) => ({
        id: `e${prevNodeId}-${nodeId}`,
        source: prevNodeId,
        data: { previousStepId: prevStepIds[i], nextStepId: stepFlow.id },
        target: nodeId,
        ...defaultEdgeOptions
      })),
      ...!nextNodeIds.length ? [] : nextNodeIds.map((nextNodeId, i) => ({
        id: `e${nodeId}-${nextNodeId}`,
        source: nodeId,
        data: { previousStepId: stepFlow.id, nextStepId: nextStepIds[i] },
        target: nextNodeId,
        ...defaultEdgeOptions
      }))
    ];
    return { nodes, edges, nextPrevNodeIds: [nodeId], nextPrevStepIds: [stepFlow.id] };
  }
  if (stepFlow.type === "loop") {
    const { step: _step, serializedCondition, loopType } = stepFlow;
    const hasGraph = _step.component === "WORKFLOW";
    const nodes = [
      {
        id: _step.id,
        position: { x: xIndex * 300, y: yIndex * 100 },
        type: hasGraph ? "nested-node" : "default-node",
        data: {
          label: _step.id,
          description: _step.description,
          withoutTopHandle: !prevNodeIds.length,
          withoutBottomHandle: false,
          stepGraph: hasGraph ? _step.serializedStepFlow : void 0
        }
      },
      {
        id: serializedCondition.id,
        position: { x: xIndex * 300, y: (yIndex + 1) * 100 },
        type: "condition-node",
        data: {
          label: serializedCondition.id,
          // conditionStepId: _step.id,
          previousStepId: _step.id,
          nextStepId: nextStepIds[0],
          withoutTopHandle: false,
          withoutBottomHandle: !nextNodeIds.length,
          isLarge: true,
          conditions: [{ type: loopType, fnString: serializedCondition.fn }]
        }
      }
    ];
    const edges = [
      ...!prevNodeIds.length ? [] : prevNodeIds.map((prevNodeId, i) => ({
        id: `e${prevNodeId}-${_step.id}`,
        source: prevNodeId,
        data: { previousStepId: prevStepIds[i], nextStepId: _step.id },
        target: _step.id,
        ...defaultEdgeOptions
      })),
      {
        id: `e${_step.id}-${serializedCondition.id}`,
        source: _step.id,
        data: { previousStepId: _step.id, nextStepId: nextStepIds[0] },
        target: serializedCondition.id,
        ...defaultEdgeOptions
      },
      ...!nextNodeIds.length ? [] : nextNodeIds.map((nextNodeId, i) => ({
        id: `e${serializedCondition.id}-${nextNodeId}`,
        source: serializedCondition.id,
        data: { previousStepId: _step.id, nextStepId: nextStepIds[i] },
        target: nextNodeId,
        ...defaultEdgeOptions
      }))
    ];
    return { nodes, edges, nextPrevNodeIds: [serializedCondition.id], nextPrevStepIds: [_step.id] };
  }
  if (stepFlow.type === "parallel") {
    let nodes = [];
    let edges = [];
    let nextPrevStepIds = [];
    stepFlow.steps.forEach((_stepFlow, index) => {
      const {
        nodes: _nodes,
        edges: _edges,
        nextPrevStepIds: _nextPrevStepIds
      } = getStepNodeAndEdge({
        stepFlow: _stepFlow,
        xIndex: index,
        yIndex,
        prevNodeIds,
        prevStepIds,
        nextStepFlow,
        allPrevNodeIds
      });
      nodes.push(..._nodes);
      edges.push(..._edges);
      nextPrevStepIds.push(..._nextPrevStepIds);
    });
    return { nodes, edges, nextPrevNodeIds: nodes.map((node) => node.id), nextPrevStepIds };
  }
  if (stepFlow.type === "conditional") {
    let nodes = [];
    let edges = [];
    let nextPrevStepIds = [];
    stepFlow.steps.forEach((_stepFlow, index) => {
      const {
        nodes: _nodes,
        edges: _edges,
        nextPrevStepIds: _nextPrevStepIds
      } = getStepNodeAndEdge({
        stepFlow: _stepFlow,
        xIndex: index,
        yIndex,
        prevNodeIds,
        prevStepIds,
        nextStepFlow,
        condition: stepFlow.serializedConditions[index],
        allPrevNodeIds
      });
      nodes.push(..._nodes);
      edges.push(..._edges);
      nextPrevStepIds.push(..._nextPrevStepIds);
    });
    return {
      nodes,
      edges,
      nextPrevNodeIds: nodes.filter(({ type }) => type !== "condition-node").map((node) => node.id),
      nextPrevStepIds
    };
  }
  return { nodes: [], edges: [], nextPrevNodeIds: [], nextPrevStepIds: [] };
};
const constructNodesAndEdges = ({
  stepGraph
}) => {
  if (!stepGraph) {
    return { nodes: [], edges: [] };
  }
  if (stepGraph.length === 0) {
    return { nodes: [], edges: [] };
  }
  let nodes = [];
  let edges = [];
  let prevNodeIds = [];
  let prevStepIds = [];
  let allPrevNodeIds = [];
  for (let index = 0; index < stepGraph.length; index++) {
    const {
      nodes: _nodes,
      edges: _edges,
      nextPrevNodeIds,
      nextPrevStepIds
    } = getStepNodeAndEdge({
      stepFlow: stepGraph[index],
      xIndex: index,
      yIndex: index,
      prevNodeIds,
      prevStepIds,
      nextStepFlow: index === stepGraph.length - 1 ? void 0 : stepGraph[index + 1],
      allPrevNodeIds
    });
    nodes.push(..._nodes);
    edges.push(..._edges);
    prevNodeIds = nextPrevNodeIds;
    prevStepIds = nextPrevStepIds;
    allPrevNodeIds.push(...prevNodeIds);
  }
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges);
  return { nodes: layoutedNodes, edges: layoutedEdges };
};

const textVariants = cva("block", {
  variants: {
    variant: {
      primary: "text-text",
      secondary: "text-text-dim"
    },
    size: {
      default: "text-base",
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl"
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    }
  },
  defaultVariants: {
    variant: "primary",
    size: "default",
    weight: "normal"
  }
});
const Text = ({ className, weight, variant, as: Tag = "span", size, ...props }) => {
  return /* @__PURE__ */ jsx(Tag, { className: cn(textVariants({ size, variant, weight, className })), ...props });
};

const ScrollArea = React.forwardRef(
  ({ className, children, viewPortClassName, maxHeight, autoScroll = false, ...props }, ref) => {
    const areaRef = React.useRef(null);
    useAutoscroll(areaRef, { enabled: autoScroll });
    return /* @__PURE__ */ jsxs(ScrollAreaPrimitive.Root, { ref, className: cn("relative overflow-hidden", className), ...props, children: [
      /* @__PURE__ */ jsx(
        ScrollAreaPrimitive.Viewport,
        {
          ref: areaRef,
          className: cn("h-full w-full rounded-[inherit] [&>div]:!block", viewPortClassName),
          style: maxHeight ? { maxHeight } : void 0,
          children
        }
      ),
      /* @__PURE__ */ jsx(ScrollBar, {}),
      /* @__PURE__ */ jsx(ScrollAreaPrimitive.Corner, {})
    ] });
  }
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
const ScrollBar = React.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ jsx(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  {
    ref,
    orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
  }
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

function convertWorkflowRunStateToWatchResult(runState) {
  const runId = runState.runId;
  const steps = {};
  const context = runState.context || {};
  Object.entries(context).forEach(([stepId, stepResult]) => {
    if (stepId !== "input" && "status" in stepResult) {
      const result = stepResult;
      steps[stepId] = {
        status: result.status,
        output: "output" in result ? result.output : void 0,
        payload: "payload" in result ? result.payload : void 0,
        resumePayload: "resumePayload" in result ? result.resumePayload : void 0,
        error: "error" in result ? result.error : void 0,
        startedAt: "startedAt" in result ? result.startedAt : Date.now(),
        endedAt: "endedAt" in result ? result.endedAt : void 0,
        suspendedAt: "suspendedAt" in result ? result.suspendedAt : void 0,
        resumedAt: "resumedAt" in result ? result.resumedAt : void 0
      };
    }
  });
  const status = determineWorkflowStatus(steps);
  return {
    type: "watch",
    payload: {
      workflowState: {
        status,
        steps,
        result: runState.value,
        payload: context.input,
        error: void 0
      }
    },
    eventTimestamp: new Date(runState.timestamp),
    runId
  };
}
function determineWorkflowStatus(steps) {
  const stepStatuses = Object.values(steps).map((step) => step.status);
  if (stepStatuses.includes("failed")) {
    return "failed";
  }
  if (stepStatuses.includes("suspended")) {
    return "suspended";
  }
  if (stepStatuses.every((status) => status === "success")) {
    return "success";
  }
  return "running";
}

const WorkflowRunContext = createContext({});
function WorkflowRunProvider({
  children,
  snapshot
}) {
  const [legacyResult, setLegacyResult] = useState(null);
  const [result, setResult] = useState(
    () => snapshot ? convertWorkflowRunStateToWatchResult(snapshot) : null
  );
  const [payload, setPayload] = useState(null);
  const clearData = () => {
    setLegacyResult(null);
    setResult(null);
    setPayload(null);
  };
  useEffect(() => {
    if (snapshot?.runId) {
      setResult(convertWorkflowRunStateToWatchResult(snapshot));
    } else {
      setResult(null);
    }
  }, [snapshot?.runId ?? ""]);
  return /* @__PURE__ */ jsx(
    WorkflowRunContext.Provider,
    {
      value: {
        legacyResult,
        setLegacyResult,
        result,
        setResult,
        payload,
        setPayload,
        clearData,
        snapshot
      },
      children
    }
  );
}

const useCurrentRun = () => {
  const context = useContext(WorkflowRunContext);
  const workflowCurrentSteps = context.result?.payload?.workflowState?.steps ?? {};
  const steps = Object.entries(workflowCurrentSteps).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: {
        error: value.error,
        startedAt: value.startedAt,
        endedAt: value.endedAt,
        status: value.status,
        output: value.output,
        input: value.payload,
        resumeData: value.resumePayload
      }
    };
  }, {});
  return { steps, isRunning: Boolean(context.payload), runId: context.result?.runId };
};

const CodeDialogContent = ({ data }) => {
  const theme = useCodemirrorTheme();
  if (typeof data !== "string") {
    return /* @__PURE__ */ jsxs("div", { className: "max-h-[500px] overflow-auto relative p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute right-2 top-2 bg-surface4 rounded-full z-10", children: /* @__PURE__ */ jsx(CopyButton, { content: JSON.stringify(data, null, 2) }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-surface4 rounded-lg p-4", children: /* @__PURE__ */ jsx(CodeMirror, { value: JSON.stringify(data, null, 2), theme, extensions: [jsonLanguage] }) })
    ] });
  }
  try {
    const json = JSON.parse(data);
    return /* @__PURE__ */ jsxs("div", { className: "max-h-[500px] overflow-auto relative p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute right-2 top-2 bg-surface4 rounded-full z-10", children: /* @__PURE__ */ jsx(CopyButton, { content: data }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-surface4 rounded-lg p-4", children: /* @__PURE__ */ jsx(CodeMirror, { value: JSON.stringify(json, null, 2), theme, extensions: [jsonLanguage] }) })
    ] });
  } catch (error) {
    return /* @__PURE__ */ jsxs("div", { className: "max-h-[500px] overflow-auto relative p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute right-2 top-2 bg-surface4 rounded-full z-10", children: /* @__PURE__ */ jsx(CopyButton, { content: data }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-surface4 rounded-lg p-4", children: /* @__PURE__ */ jsx(CodeMirror, { value: data, theme, extensions: [] }) })
    ] });
  }
};

const WorkflowRunEventForm = ({ event, runId, onSendEvent }) => {
  const [eventData, setEventData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useCodemirrorTheme();
  const { handleCopy } = useCopyToClipboard({ text: eventData });
  const handleSendEvent = async () => {
    let data;
    setIsLoading(true);
    setError(null);
    try {
      setError(null);
      data = JSON.parse(eventData);
    } catch (error2) {
      setError("Invalid JSON");
      setIsLoading(false);
      return;
    }
    try {
      setError(null);
      const result = await onSendEvent({ event, data, runId });
      toast.success(result.message);
    } catch (error2) {
      console.error("Error sending event", error2);
      setError("Error sending event");
    } finally {
      setIsLoading(false);
    }
  };
  const buttonClass = "text-icon3 hover:text-icon6";
  const formatEventData = async () => {
    setError(null);
    if (!isValidJson(eventData)) {
      setError("Invalid JSON");
      return;
    }
    const formatted = await formatJSON(eventData);
    setEventData(formatted);
  };
  return /* @__PURE__ */ jsxs(TooltipProvider, { children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-2", children: [
        /* @__PURE__ */ jsx(Txt, { as: "label", variant: "ui-md", className: "text-icon3", children: "Event data (JSON)" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs(Tooltip, { children: [
            /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { onClick: formatEventData, className: buttonClass, children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(Braces, {}) }) }) }),
            /* @__PURE__ */ jsx(TooltipContent, { children: "Format the event data JSON" })
          ] }),
          /* @__PURE__ */ jsxs(Tooltip, { children: [
            /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { onClick: handleCopy, className: buttonClass, children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(CopyIcon, {}) }) }) }),
            /* @__PURE__ */ jsx(TooltipContent, { children: "Copy event data" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        CodeMirror,
        {
          value: eventData,
          onChange: setEventData,
          theme,
          extensions: [jsonLanguage],
          className: "h-[400px] overflow-y-scroll bg-surface3 rounded-lg overflow-hidden p-3"
        }
      ),
      error && /* @__PURE__ */ jsx(Txt, { variant: "ui-md", className: "text-accent2", children: error })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-end pt-4", children: /* @__PURE__ */ jsx(Button, { onClick: handleSendEvent, disabled: isLoading, children: isLoading ? /* @__PURE__ */ jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : "Send" }) })
  ] });
};

const WorkflowStepActionBar = ({
  input,
  output,
  resumeData,
  error,
  mapConfig,
  stepName,
  event,
  onShowTrace,
  onShowNestedGraph,
  onSendEvent,
  runId,
  status
}) => {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [isOutputOpen, setIsOutputOpen] = useState(false);
  const [isResumeDataOpen, setIsResumeDataOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isMapConfigOpen, setIsMapConfigOpen] = useState(false);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const dialogContentClass = "bg-surface2 rounded-lg border-sm border-border1 max-w-4xl w-full px-0";
  const dialogTitleClass = "border-b-sm border-border1 pb-4 px-6";
  const showEventForm = event && onSendEvent && runId;
  return /* @__PURE__ */ jsx(Fragment, { children: (input || output || error || mapConfig || resumeData || onShowNestedGraph || showEventForm) && /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "flex flex-wrap items-center bg-surface4 border-t-sm border-border1 px-2 py-1 gap-2 rounded-b-lg",
        status === "success" && "bg-accent1Dark",
        status === "failed" && "bg-accent2Dark",
        status === "suspended" && "bg-accent3Dark",
        status === "waiting" && "bg-accent5Dark",
        status === "running" && "bg-accent6Dark"
      ),
      children: [
        onShowNestedGraph && /* @__PURE__ */ jsx(Button, { onClick: onShowNestedGraph, children: "View nested graph" }),
        mapConfig && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Button, { onClick: () => setIsMapConfigOpen(true), children: "Map config" }),
          /* @__PURE__ */ jsx(Dialog, { open: isMapConfigOpen, onOpenChange: setIsMapConfigOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: dialogContentClass, children: [
            /* @__PURE__ */ jsxs(DialogTitle, { className: dialogTitleClass, children: [
              stepName,
              " map config"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "px-4 overflow-hidden", children: /* @__PURE__ */ jsx(CodeDialogContent, { data: mapConfig }) })
          ] }) })
        ] }),
        input && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Button, { onClick: () => setIsInputOpen(true), children: "Input" }),
          /* @__PURE__ */ jsx(Dialog, { open: isInputOpen, onOpenChange: setIsInputOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: dialogContentClass, children: [
            /* @__PURE__ */ jsxs(DialogTitle, { className: dialogTitleClass, children: [
              stepName,
              " input"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "px-4 overflow-hidden", children: /* @__PURE__ */ jsx(CodeDialogContent, { data: input }) })
          ] }) })
        ] }),
        resumeData && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Button, { onClick: () => setIsResumeDataOpen(true), children: "Resume data" }),
          /* @__PURE__ */ jsx(Dialog, { open: isResumeDataOpen, onOpenChange: setIsResumeDataOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: dialogContentClass, children: [
            /* @__PURE__ */ jsxs(DialogTitle, { className: dialogTitleClass, children: [
              stepName,
              " resume data"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "px-4 overflow-hidden", children: /* @__PURE__ */ jsx(CodeDialogContent, { data: resumeData }) })
          ] }) })
        ] }),
        output && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Button, { onClick: () => setIsOutputOpen(true), children: "Output" }),
          /* @__PURE__ */ jsx(Dialog, { open: isOutputOpen, onOpenChange: setIsOutputOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: dialogContentClass, children: [
            /* @__PURE__ */ jsxs(DialogTitle, { className: dialogTitleClass, children: [
              stepName,
              " output"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "px-4 overflow-hidden", children: /* @__PURE__ */ jsx(CodeDialogContent, { data: output }) })
          ] }) })
        ] }),
        error && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Button, { onClick: () => setIsErrorOpen(true), children: "Error" }),
          /* @__PURE__ */ jsx(Dialog, { open: isErrorOpen, onOpenChange: setIsErrorOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: dialogContentClass, children: [
            /* @__PURE__ */ jsxs(DialogTitle, { className: dialogTitleClass, children: [
              stepName,
              " error"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "px-4 overflow-hidden", children: /* @__PURE__ */ jsx(CodeDialogContent, { data: error }) })
          ] }) })
        ] }),
        onShowTrace && /* @__PURE__ */ jsx(Button, { onClick: onShowTrace, children: "Show trace" }),
        showEventForm && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Button, { className: "ring-1 ring-accent5 !text-accent5", onClick: () => setIsEventFormOpen(true), children: "Send event" }),
          /* @__PURE__ */ jsx(Dialog, { open: isEventFormOpen, onOpenChange: setIsEventFormOpen, children: /* @__PURE__ */ jsxs(DialogContent, { className: dialogContentClass, children: [
            /* @__PURE__ */ jsxs(DialogTitle, { className: dialogTitleClass, children: [
              "Send ",
              event,
              " event"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "px-4 overflow-hidden", children: /* @__PURE__ */ jsx(WorkflowRunEventForm, { event, runId, onSendEvent }) })
          ] }) })
        ] })
      ]
    }
  ) });
};

function WorkflowConditionNode({ data }) {
  const { conditions, previousStepId, nextStepId } = data;
  const [open, setOpen] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const type = conditions[0]?.type;
  const isCollapsible = (conditions.some((condition) => condition.fnString) || conditions?.length > 1) && type !== "else";
  const { steps } = useCurrentRun();
  const previousStep = steps[previousStepId];
  const nextStep = steps[nextStepId];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Handle, { type: "target", position: Position.Top, style: { visibility: "hidden" } }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "bg-surface3 rounded-lg w-[300px] border-sm border-border1",
          previousStep?.status === "success" && nextStep && "ring-2 ring-accent1 bg-accent1Darker",
          previousStep?.status === "failed" && nextStep && "ring-2 ring-accent2 bg-accent2Darker"
        ),
        children: [
          /* @__PURE__ */ jsxs(
            Collapsible,
            {
              open: !isCollapsible ? true : open,
              onOpenChange: (_open) => {
                if (isCollapsible) {
                  setOpen(_open);
                }
              },
              children: [
                /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex items-center justify-between w-full px-3 py-2", children: [
                  /* @__PURE__ */ jsx(Badge$1, { icon: type === "when" ? /* @__PURE__ */ jsx(Network, { className: "text-[#ECB047]" }) : null, children: type?.toUpperCase() }),
                  isCollapsible && /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(
                    ChevronDown,
                    {
                      className: cn("transition-transform text-icon3", {
                        "transform rotate-180": open
                      })
                    }
                  ) })
                ] }),
                type === "else" ? null : /* @__PURE__ */ jsx(CollapsibleContent, { className: "flex flex-col gap-2 pb-2", children: conditions.map((condition, index) => {
                  return condition.fnString ? /* @__PURE__ */ jsxs("div", { className: "px-3", children: [
                    /* @__PURE__ */ jsx(Highlight, { theme: themes.oneDark, code: String(condition.fnString).trim(), language: "javascript", children: ({ className, style, tokens, getLineProps, getTokenProps }) => /* @__PURE__ */ jsx(
                      "pre",
                      {
                        className: cn(
                          "relative font-mono p-3 w-full cursor-pointer rounded-lg text-xs !bg-surface4 overflow-scroll",
                          className,
                          previousStep?.status === "success" && nextStep && "!bg-accent1Dark",
                          previousStep?.status === "failed" && nextStep && "!bg-accent2Dark"
                        ),
                        onClick: () => setOpenDialog(true),
                        style,
                        children: tokens.map((line, i) => /* @__PURE__ */ jsxs("div", { ...getLineProps({ line }), children: [
                          /* @__PURE__ */ jsx("span", { className: "inline-block mr-2 text-muted-foreground", children: i + 1 }),
                          line.map((token, key) => /* @__PURE__ */ jsx("span", { ...getTokenProps({ token }) }, key))
                        ] }, i))
                      }
                    ) }),
                    /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: setOpenDialog, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-[30rem] bg-surface2 p-4", children: [
                      /* @__PURE__ */ jsx(DialogTitle, { className: "sr-only", children: "Condition Function" }),
                      /* @__PURE__ */ jsx(ScrollArea, { className: "w-full p-2 pt-4", maxHeight: "400px", children: /* @__PURE__ */ jsx(
                        Highlight,
                        {
                          theme: themes.oneDark,
                          code: String(condition.fnString).trim(),
                          language: "javascript",
                          children: ({ className, style, tokens, getLineProps, getTokenProps }) => /* @__PURE__ */ jsx(
                            "pre",
                            {
                              className: `${className} relative font-mono text-sm overflow-x-auto p-3 w-full rounded-lg mt-2 dark:bg-zinc-800`,
                              style: {
                                ...style,
                                backgroundColor: "#121212",
                                padding: "0 0.75rem 0 0"
                              },
                              children: tokens.map((line, i) => /* @__PURE__ */ jsxs("div", { ...getLineProps({ line }), children: [
                                /* @__PURE__ */ jsx("span", { className: "inline-block mr-2 text-muted-foreground", children: i + 1 }),
                                line.map((token, key) => /* @__PURE__ */ jsx("span", { ...getTokenProps({ token }) }, key))
                              ] }, i))
                            }
                          )
                        }
                      ) })
                    ] }) })
                  ] }, `${condition.fnString}-${index}`) : /* @__PURE__ */ jsx(Fragment$1, { children: condition.ref?.step ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                    index === 0 ? null : /* @__PURE__ */ jsx(Badge$1, { icon: /* @__PURE__ */ jsx(Network, { className: "text-[#ECB047]" }), children: condition.conj?.toLocaleUpperCase() || "WHEN" }),
                    /* @__PURE__ */ jsxs(Text, { size: "xs", className: " text-mastra-el-3 flex-1", children: [
                      condition.ref.step.id || condition.ref.step,
                      "'s ",
                      condition.ref.path,
                      " ",
                      Object.entries(condition.query).map(([key, value]) => `${key} ${String(value)}`)
                    ] })
                  ] }) : null }, `${condition.ref?.path}-${index}`);
                }) })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            WorkflowStepActionBar,
            {
              stepName: nextStepId,
              input: previousStep?.output,
              mapConfig: data.mapConfig,
              status: nextStep ? previousStep?.status : void 0
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(Handle, { type: "source", position: Position.Bottom, style: { visibility: "hidden" } })
  ] });
}

function WorkflowDefaultNode({
  data,
  onShowTrace,
  parentWorkflowName,
  onSendEvent
}) {
  const { steps, isRunning, runId } = useCurrentRun();
  const { label, description, withoutTopHandle, withoutBottomHandle, mapConfig, event, duration, date } = data;
  const fullLabel = parentWorkflowName ? `${parentWorkflowName}.${label}` : label;
  const step = steps[fullLabel];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !withoutTopHandle && /* @__PURE__ */ jsx(Handle, { type: "target", position: Position.Top, style: { visibility: "hidden" } }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "bg-surface3 rounded-lg w-[274px] border-sm border-border1 pt-2",
          step?.status === "success" && "ring-2 ring-accent1 bg-accent1Darker",
          step?.status === "failed" && "ring-2 ring-accent2 bg-accent2Darker",
          step?.status === "suspended" && "ring-2 ring-accent3 bg-accent3Darker",
          step?.status === "waiting" && "ring-2 ring-accent5 bg-accent5Darker",
          step?.status === "running" && "ring-2 ring-accent6 bg-accent6Darker"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2 px-3", !description && "pb-2"), children: [
            isRunning && /* @__PURE__ */ jsxs(Icon, { children: [
              step?.status === "failed" && /* @__PURE__ */ jsx(CrossIcon, { className: "text-accent2" }),
              step?.status === "success" && /* @__PURE__ */ jsx(CheckIcon, { className: "text-accent1" }),
              step?.status === "suspended" && /* @__PURE__ */ jsx(PauseIcon, { className: "text-accent3" }),
              step?.status === "waiting" && /* @__PURE__ */ jsx(HourglassIcon, { className: "text-accent5" }),
              step?.status === "running" && /* @__PURE__ */ jsx(Loader2, { className: "text-accent6 animate-spin" }),
              !step && /* @__PURE__ */ jsx(CircleDashed, { className: "text-icon2" })
            ] }),
            /* @__PURE__ */ jsxs(Txt, { variant: "ui-lg", className: "text-icon6 font-medium inline-flex items-center gap-1 justify-between w-full", children: [
              label,
              " ",
              step?.startedAt && /* @__PURE__ */ jsx(Clock, { startedAt: step.startedAt, endedAt: step.endedAt })
            ] })
          ] }),
          description && /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon3 px-3 pb-2", children: description }),
          event && /* @__PURE__ */ jsxs(Txt, { variant: "ui-sm", className: "text-icon3 px-3 pb-2", children: [
            "waits for event: ",
            /* @__PURE__ */ jsx("strong", { children: event })
          ] }),
          duration && /* @__PURE__ */ jsxs(Txt, { variant: "ui-sm", className: "text-icon3 px-3 pb-2", children: [
            "sleeps for ",
            /* @__PURE__ */ jsxs("strong", { children: [
              duration,
              "ms"
            ] })
          ] }),
          date && /* @__PURE__ */ jsxs(Txt, { variant: "ui-sm", className: "text-icon3 px-3 pb-2", children: [
            "sleeps until ",
            /* @__PURE__ */ jsx("strong", { children: new Date(date).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsx(
            WorkflowStepActionBar,
            {
              stepName: label,
              input: step?.input,
              resumeData: step?.resumeData,
              output: step?.output,
              error: step?.error,
              mapConfig,
              event: step?.status === "waiting" ? event : void 0,
              onShowTrace: runId && onShowTrace ? () => onShowTrace?.({ runId, stepName: fullLabel }) : void 0,
              runId,
              onSendEvent,
              status: step?.status
            }
          )
        ]
      }
    ),
    !withoutBottomHandle && /* @__PURE__ */ jsx(Handle, { type: "source", position: Position.Bottom, style: { visibility: "hidden", color: "red" } })
  ] });
}

function WorkflowAfterNode({ data }) {
  const { steps } = data;
  const [open, setOpen] = useState(true);
  return /* @__PURE__ */ jsxs(
    Collapsible,
    {
      open,
      onOpenChange: setOpen,
      className: cn("bg-mastra-bg-3 rounded-md w-[274px] flex flex-col p-2 gap-2"),
      children: [
        /* @__PURE__ */ jsx(Handle, { type: "target", position: Position.Top, style: { visibility: "hidden" } }),
        /* @__PURE__ */ jsxs(CollapsibleTrigger, { className: "flex items-center justify-between w-full", children: [
          /* @__PURE__ */ jsx(
            Text,
            {
              size: "xs",
              weight: "medium",
              className: "text-mastra-el-3 bg-mastra-bg-11 my-auto block rounded-[0.125rem] px-2 py-1 text-[10px] w-fit",
              children: "AFTER"
            }
          ),
          /* @__PURE__ */ jsx(
            ChevronDown,
            {
              className: cn("w-4 h-4 transition-transform", {
                "transform rotate-180": open
              })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(CollapsibleContent, { className: "flex flex-col gap-2", children: steps.map((step) => /* @__PURE__ */ jsxs("div", { className: "text-sm bg-mastra-bg-9 flex items-center gap-[6px] rounded-sm  p-2", children: [
          /* @__PURE__ */ jsx(Footprints, { className: "text-current w-4 h-4" }),
          /* @__PURE__ */ jsx(Text, { size: "xs", weight: "medium", className: "text-mastra-el-6 capitalize", children: step })
        ] }, step)) }),
        /* @__PURE__ */ jsx(Handle, { type: "source", position: Position.Bottom, style: { visibility: "hidden" } })
      ]
    }
  );
}

function WorkflowLoopResultNode({ data }) {
  const { result } = data;
  return /* @__PURE__ */ jsxs("div", { className: cn("bg-mastra-bg-8 rounded-md w-[274px]"), children: [
    /* @__PURE__ */ jsx(Handle, { type: "target", position: Position.Top, style: { visibility: "hidden" } }),
    /* @__PURE__ */ jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxs("div", { className: "text-sm bg-mastra-bg-9 flex items-center gap-[6px] rounded-sm  p-2", children: [
      result ? /* @__PURE__ */ jsx(CircleCheck, { className: "text-current w-4 h-4" }) : /* @__PURE__ */ jsx(CircleX, { className: "text-current w-4 h-4" }),
      /* @__PURE__ */ jsx(Text, { size: "xs", weight: "medium", className: "text-mastra-el-6 capitalize", children: String(result) })
    ] }) }),
    /* @__PURE__ */ jsx(Handle, { type: "source", position: Position.Bottom, style: { visibility: "hidden" } })
  ] });
}

const ZoomSlider = forwardRef(({ className, ...props }) => {
  const { zoom } = useViewport();
  const { zoomTo, zoomIn, zoomOut, fitView } = useReactFlow();
  return /* @__PURE__ */ jsxs(Panel, { className: cn("flex gap-1 rounded-md bg-primary-foreground p-1 text-foreground", className), ...props, children: [
    /* @__PURE__ */ jsx(Button$1, { variant: "ghost", size: "icon", onClick: () => zoomOut({ duration: 300 }), children: /* @__PURE__ */ jsx(Minus, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsx(
      Slider,
      {
        className: "w-[140px]",
        value: [zoom],
        min: 0.01,
        max: 1,
        step: 0.01,
        onValueChange: (values) => {
          zoomTo(values[0]);
        }
      }
    ),
    /* @__PURE__ */ jsx(Button$1, { variant: "ghost", size: "icon", onClick: () => zoomIn({ duration: 300 }), children: /* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxs(Button$1, { className: "min-w-20 tabular-nums", variant: "ghost", onClick: () => zoomTo(1, { duration: 300 }), children: [
      (100 * zoom).toFixed(0),
      "%"
    ] }),
    /* @__PURE__ */ jsx(Button$1, { variant: "ghost", size: "icon", onClick: () => fitView({ duration: 300, maxZoom: 1 }), children: /* @__PURE__ */ jsx(Maximize, { className: "h-4 w-4" }) })
  ] });
});
ZoomSlider.displayName = "ZoomSlider";

function WorkflowNestedGraph({
  stepGraph,
  open,
  workflowName,
  onShowTrace,
  onSendEvent
}) {
  const { nodes: initialNodes, edges: initialEdges } = constructNodesAndEdges({
    stepGraph
  });
  const [isMounted, setIsMounted] = useState(false);
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
  const { steps } = useCurrentRun();
  const nodeTypes = {
    "default-node": (props) => /* @__PURE__ */ jsx(
      WorkflowDefaultNode,
      {
        parentWorkflowName: workflowName,
        onShowTrace,
        onSendEvent,
        ...props
      }
    ),
    "condition-node": WorkflowConditionNode,
    "after-node": WorkflowAfterNode,
    "loop-result-node": WorkflowLoopResultNode,
    "nested-node": (props) => /* @__PURE__ */ jsx(
      WorkflowNestedNode,
      {
        parentWorkflowName: workflowName,
        onShowTrace,
        onSendEvent,
        ...props
      }
    )
  };
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setIsMounted(true);
      }, 500);
    }
  }, [open]);
  return /* @__PURE__ */ jsx("div", { className: "w-full h-full relative bg-surface1", children: isMounted ? /* @__PURE__ */ jsxs(
    ReactFlow,
    {
      nodes,
      edges: edges.map((e) => ({
        ...e,
        style: {
          ...e.style,
          stroke: steps[`${workflowName}.${e.data?.previousStepId}`]?.status === "success" && steps[`${workflowName}.${e.data?.nextStepId}`] ? "#22c55e" : void 0
        }
      })),
      fitView: true,
      fitViewOptions: {
        maxZoom: 1
      },
      minZoom: 0.01,
      maxZoom: 1,
      nodeTypes,
      onNodesChange,
      children: [
        /* @__PURE__ */ jsx(ZoomSlider, { position: "bottom-left" }),
        /* @__PURE__ */ jsx(MiniMap, { pannable: true, zoomable: true, maskColor: "#121212", bgColor: "#171717", nodeColor: "#2c2c2c" }),
        /* @__PURE__ */ jsx(Background, { variant: BackgroundVariant.Lines, gap: 12, size: 0.5 })
      ]
    }
  ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Spinner, {}) }) });
}

const WorkflowNestedGraphContext = createContext(
  {}
);
function WorkflowNestedGraphProvider({
  children,
  onShowTrace,
  onSendEvent
}) {
  const [stepGraph, setStepGraph] = useState(null);
  const [parentStepGraphList, setParentStepGraphList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [label, setLabel] = useState("");
  const [fullStep, setFullStep] = useState("");
  const closeNestedGraph = () => {
    if (parentStepGraphList.length) {
      const lastStepGraph = parentStepGraphList[parentStepGraphList.length - 1];
      setStepGraph(lastStepGraph.stepGraph);
      setLabel(lastStepGraph.label);
      setFullStep(lastStepGraph.fullStep);
      setParentStepGraphList(parentStepGraphList.slice(0, -1));
    } else {
      setOpenDialog(false);
      setStepGraph(null);
      setLabel("");
      setFullStep("");
    }
  };
  const showNestedGraph = ({
    label: newLabel,
    stepGraph: newStepGraph,
    fullStep: newFullStep
  }) => {
    if (stepGraph) {
      setParentStepGraphList([...parentStepGraphList, { stepGraph, label, fullStep }]);
    }
    setLabel(newLabel);
    setFullStep(newFullStep);
    setStepGraph(newStepGraph);
    setOpenDialog(true);
  };
  return /* @__PURE__ */ jsxs(
    WorkflowNestedGraphContext.Provider,
    {
      value: {
        showNestedGraph,
        closeNestedGraph
      },
      children: [
        children,
        /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: closeNestedGraph, children: /* @__PURE__ */ jsx(DialogPortal, { children: /* @__PURE__ */ jsxs(DialogContent, { className: "w-[45rem] h-[45rem] max-w-[unset] bg-[#121212] p-[0.5rem]", children: [
          /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-1.5 absolute top-3 left-3 z-50", children: [
            /* @__PURE__ */ jsx(Workflow, { className: "text-current w-4 h-4" }),
            /* @__PURE__ */ jsxs(Text, { size: "xs", weight: "medium", className: "text-mastra-el-6 capitalize", children: [
              label,
              " workflow"
            ] })
          ] }),
          /* @__PURE__ */ jsx(ReactFlowProvider, { children: /* @__PURE__ */ jsx(
            WorkflowNestedGraph,
            {
              stepGraph,
              open: openDialog,
              workflowName: fullStep,
              onShowTrace,
              onSendEvent
            }
          ) })
        ] }) }) }, `${label}-${fullStep}`)
      ]
    }
  );
}

function WorkflowNestedNode({
  data,
  parentWorkflowName,
  onShowTrace,
  onSendEvent
}) {
  const { steps, isRunning, runId } = useCurrentRun();
  const { showNestedGraph } = useContext(WorkflowNestedGraphContext);
  const { label, description, withoutTopHandle, withoutBottomHandle, stepGraph, mapConfig, event } = data;
  const fullLabel = parentWorkflowName ? `${parentWorkflowName}.${label}` : label;
  const step = steps[fullLabel];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    !withoutTopHandle && /* @__PURE__ */ jsx(Handle, { type: "target", position: Position.Top, style: { visibility: "hidden" } }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "bg-surface3 rounded-lg w-[274px] border-sm border-border1 pt-2",
          step?.status === "success" && "ring-2 ring-accent1 bg-accent1Darker",
          step?.status === "failed" && "ring-2 ring-accent2 bg-accent2Darker",
          step?.status === "suspended" && "ring-2 ring-accent3 bg-accent3Darker",
          step?.status === "waiting" && "ring-2 ring-accent5 bg-accent5Darker",
          step?.status === "running" && "ring-2 ring-accent6 bg-accent6Darker"
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: cn("flex items-center gap-2 px-3", !description && "pb-2"), children: [
            isRunning && /* @__PURE__ */ jsxs(Icon, { children: [
              step?.status === "failed" && /* @__PURE__ */ jsx(CrossIcon, { className: "text-accent2" }),
              step?.status === "success" && /* @__PURE__ */ jsx(CheckIcon, { className: "text-accent1" }),
              step?.status === "suspended" && /* @__PURE__ */ jsx(PauseIcon, { className: "text-accent3" }),
              step?.status === "waiting" && /* @__PURE__ */ jsx(HourglassIcon, { className: "text-accent5" }),
              step?.status === "running" && /* @__PURE__ */ jsx(Loader2, { className: "text-accent6 animate-spin" }),
              !step && /* @__PURE__ */ jsx(CircleDashed, { className: "text-icon2" })
            ] }),
            /* @__PURE__ */ jsxs(Txt, { variant: "ui-lg", className: "text-icon6 font-medium inline-flex items-center gap-1 justify-between w-full", children: [
              label,
              " ",
              step?.startedAt && /* @__PURE__ */ jsx(Clock, { startedAt: step.startedAt, endedAt: step.endedAt })
            ] })
          ] }),
          description && /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon3 px-3 pb-2", children: description }),
          /* @__PURE__ */ jsx(
            WorkflowStepActionBar,
            {
              stepName: label,
              input: step?.input,
              resumeData: step?.resumeData,
              output: step?.output,
              error: step?.error,
              mapConfig,
              onShowTrace: runId && onShowTrace ? () => onShowTrace?.({ runId, stepName: fullLabel }) : void 0,
              onShowNestedGraph: () => showNestedGraph({ label, fullStep: fullLabel, stepGraph }),
              onSendEvent,
              event: step?.status === "waiting" ? event : void 0,
              runId,
              status: step?.status
            }
          )
        ]
      }
    ),
    !withoutBottomHandle && /* @__PURE__ */ jsx(Handle, { type: "source", position: Position.Bottom, style: { visibility: "hidden" } })
  ] });
}

function WorkflowGraphInner({ workflow, onShowTrace, onSendEvent }) {
  const { nodes: initialNodes, edges: initialEdges } = constructNodesAndEdges(workflow);
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
  const { steps, runId } = useCurrentRun();
  const nodeTypes = {
    "default-node": (props) => /* @__PURE__ */ jsx(WorkflowDefaultNode, { onShowTrace, onSendEvent, ...props }),
    "condition-node": WorkflowConditionNode,
    "after-node": WorkflowAfterNode,
    "loop-result-node": WorkflowLoopResultNode,
    "nested-node": (props) => /* @__PURE__ */ jsx(WorkflowNestedNode, { onShowTrace, onSendEvent, ...props })
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-surface1", children: /* @__PURE__ */ jsxs(
    ReactFlow,
    {
      nodes,
      edges: edges.map((e) => ({
        ...e,
        style: {
          ...e.style,
          stroke: steps[e.data?.previousStepId]?.status === "success" && steps[e.data?.nextStepId] ? "#22c55e" : void 0
        }
      })),
      nodeTypes,
      onNodesChange,
      fitView: true,
      fitViewOptions: {
        maxZoom: 1
      },
      minZoom: 0.01,
      maxZoom: 1,
      children: [
        /* @__PURE__ */ jsx(ZoomSlider, { position: "bottom-left" }),
        /* @__PURE__ */ jsx(MiniMap, { pannable: true, zoomable: true, maskColor: "#121212", bgColor: "#171717", nodeColor: "#2c2c2c" }),
        /* @__PURE__ */ jsx(Background, { variant: BackgroundVariant.Dots, gap: 12, size: 0.5 })
      ]
    }
  ) });
}

function WorkflowGraph({ workflowId, onShowTrace, workflow, isLoading, onSendEvent }) {
  const { snapshot } = useContext(WorkflowRunContext);
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-full" }) });
  }
  if (!workflow) {
    return /* @__PURE__ */ jsx("div", { className: "grid h-full place-items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsx(AlertCircleIcon, {}),
      /* @__PURE__ */ jsxs("div", { children: [
        "We couldn't find ",
        lodashTitleCase(workflowId),
        " workflow."
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx(
    WorkflowNestedGraphProvider,
    {
      onShowTrace,
      onSendEvent,
      children: /* @__PURE__ */ jsx(ReactFlowProvider, { children: /* @__PURE__ */ jsx(
        WorkflowGraphInner,
        {
          workflow: snapshot?.serializedStepGraph ? { stepGraph: snapshot?.serializedStepGraph } : workflow,
          onShowTrace,
          onSendEvent
        }
      ) })
    },
    snapshot?.runId ?? workflowId
  );
}

const useWorkflowRuns = (workflowId) => {
  const [runs, setRuns] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const client = useMastraClient();
  useEffect(() => {
    const fetchWorkflow = async () => {
      setIsLoading(true);
      try {
        if (!workflowId) {
          setRuns(null);
          setIsLoading(false);
          return;
        }
        const res = await client.getWorkflow(workflowId).runs({ limit: 50 });
        setRuns(res);
      } catch (error) {
        setRuns(null);
        console.error("Error fetching workflow", error);
        toast.error("Error fetching workflow");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkflow();
  }, [workflowId]);
  return { runs, isLoading };
};

const useWorkflow = (workflowId) => {
  const [workflow, setWorkflow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const client = useMastraClient();
  useEffect(() => {
    const fetchWorkflow = async () => {
      setIsLoading(true);
      try {
        if (!workflowId) {
          setWorkflow(null);
          setIsLoading(false);
          return;
        }
        const res = await client.getWorkflow(workflowId).details();
        if (!res) {
          setWorkflow(null);
          console.error("Error fetching workflow");
          toast.error("Error fetching workflow");
          return;
        }
        setWorkflow(res);
      } catch (error) {
        setWorkflow(null);
        console.error("Error fetching workflow", error);
        toast.error("Error fetching workflow");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkflow();
  }, [workflowId]);
  return { workflow, isLoading };
};
const useLegacyWorkflow = (workflowId) => {
  const [legacyWorkflow, setLegacyWorkflow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const client = useMastraClient();
  useEffect(() => {
    const fetchWorkflow = async () => {
      setIsLoading(true);
      try {
        if (!workflowId) {
          setLegacyWorkflow(null);
          setIsLoading(false);
          return;
        }
        const res = await client.getLegacyWorkflow(workflowId).details();
        if (!res) {
          setLegacyWorkflow(null);
          console.error("Error fetching legacy workflow");
          toast.error("Error fetching legacy workflow");
          return;
        }
        const steps = res.steps;
        const stepsWithWorkflow = await Promise.all(
          Object.values(steps)?.map(async (step) => {
            if (!step.workflowId) return step;
            const wFlow = await client.getLegacyWorkflow(step.workflowId).details();
            if (!wFlow) return step;
            return { ...step, stepGraph: wFlow.stepGraph, stepSubscriberGraph: wFlow.stepSubscriberGraph };
          })
        );
        const _steps = stepsWithWorkflow.reduce((acc, b) => {
          return { ...acc, [b.id]: b };
        }, {});
        setLegacyWorkflow({ ...res, steps: _steps });
      } catch (error) {
        setLegacyWorkflow(null);
        console.error("Error fetching legacy workflow", error);
        toast.error("Error fetching legacy workflow");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkflow();
  }, [workflowId]);
  return { legacyWorkflow, isLoading };
};
const useExecuteWorkflow = () => {
  const client = useMastraClient();
  const createLegacyWorkflowRun = async ({ workflowId, prevRunId }) => {
    try {
      const workflow = client.getLegacyWorkflow(workflowId);
      const { runId: newRunId } = await workflow.createRun({ runId: prevRunId });
      return { runId: newRunId };
    } catch (error) {
      console.error("Error creating workflow run:", error);
      throw error;
    }
  };
  const startLegacyWorkflowRun = async ({
    workflowId,
    runId,
    input
  }) => {
    try {
      const workflow = client.getLegacyWorkflow(workflowId);
      await workflow.start({ runId, triggerData: input || {} });
    } catch (error) {
      console.error("Error starting workflow run:", error);
      throw error;
    }
  };
  return {
    startLegacyWorkflowRun,
    createLegacyWorkflowRun
  };
};
const useWatchWorkflow = () => {
  const [isWatchingLegacyWorkflow, setIsWatchingLegacyWorkflow] = useState(false);
  const [legacyWatchResult, setLegacyWatchResult] = useState(null);
  const client = useMastraClient();
  const debouncedSetLegacyWorkflowWatchResult = useDebouncedCallback((record) => {
    const formattedResults = Object.entries(record.results || {}).reduce(
      (acc, [key, value]) => {
        let output = value.status === "success" ? value.output : void 0;
        if (output) {
          output = Object.entries(output).reduce(
            (_acc, [_key, _value]) => {
              const val = _value;
              _acc[_key] = val.type?.toLowerCase() === "buffer" ? { type: "Buffer", data: `[...buffered data]` } : val;
              return _acc;
            },
            {}
          );
        }
        acc[key] = { ...value, output };
        return acc;
      },
      {}
    );
    const sanitizedRecord = {
      ...record,
      sanitizedOutput: record ? JSON.stringify({ ...record, results: formattedResults }, null, 2).slice(0, 5e4) : null
    };
    setLegacyWatchResult(sanitizedRecord);
  }, 100);
  const watchLegacyWorkflow = async ({ workflowId, runId }) => {
    try {
      setIsWatchingLegacyWorkflow(true);
      const workflow = client.getLegacyWorkflow(workflowId);
      await workflow.watch({ runId }, (record) => {
        try {
          debouncedSetLegacyWorkflowWatchResult(record);
        } catch (err) {
          console.error("Error processing workflow record:", err);
          setLegacyWatchResult({
            ...record
          });
        }
      });
    } catch (error) {
      console.error("Error watching workflow:", error);
      throw error;
    } finally {
      setIsWatchingLegacyWorkflow(false);
    }
  };
  return {
    watchLegacyWorkflow,
    isWatchingLegacyWorkflow,
    legacyWatchResult
  };
};
const useResumeWorkflow = () => {
  const [isResumingLegacyWorkflow, setIsResumingLegacyWorkflow] = useState(false);
  const client = useMastraClient();
  const resumeLegacyWorkflow = async ({
    workflowId,
    stepId,
    runId,
    context
  }) => {
    try {
      setIsResumingLegacyWorkflow(true);
      const response = await client.getLegacyWorkflow(workflowId).resume({ stepId, runId, context });
      return response;
    } catch (error) {
      console.error("Error resuming workflow:", error);
      throw error;
    } finally {
      setIsResumingLegacyWorkflow(false);
    }
  };
  return {
    resumeLegacyWorkflow,
    isResumingLegacyWorkflow
  };
};

const LabelMappings = {
  "Agent-Network-Outer-Workflow.routing-step": "Decision making process",
  "routing-step": "Decision making process",
  "agent-step": "Agent execution",
  "Agent-Network-Outer-Workflow.agent-step": "Agent execution",
  "workflow-step": "Workflow execution",
  "Agent-Network-Outer-Workflow.workflow-step": "Workflow execution",
  toolStep: "Tool execution",
  "Agent-Network-Outer-Workflow.toolStep": "Tool execution",
  "final-step": "Task completed"
};
const StepDropdown = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { state } = useVNextNetworkChat();
  const message = useMessage();
  const id = message?.metadata?.custom?.id;
  if (!id) return /* @__PURE__ */ jsx("div", { children: "Something is wrong" });
  const currentState = state[id];
  const latestStepId = currentState.executionSteps ? currentState.executionSteps?.[currentState.executionSteps.length - 1] : "";
  const hasFinished = latestStepId === "finish";
  const failed = Object.values(currentState?.steps || {}).some(
    (step) => step?.["error"] || step?.["step-result"]?.status === "failed"
  );
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 mb-2", children: [
    /* @__PURE__ */ jsxs(Button, { onClick: () => setIsExpanded(!isExpanded), children: [
      hasFinished ? /* @__PURE__ */ jsx(Fragment, { children: failed ? /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(CrossIcon, { className: "text-accent2" }) }),
        "Failed"
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "text-accent1" }) }),
        "Done"
      ] }) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(Spinner, { className: "animate-spin" }) }),
        "Thinking..."
      ] }),
      /* @__PURE__ */ jsx(Icon, { className: "ml-2", children: /* @__PURE__ */ jsx(ChevronDown, { className: clsx("transition-transform -rotate-90", isExpanded && "rotate-0") }) })
    ] }),
    isExpanded ? /* @__PURE__ */ jsx(Steps, { id }) : null
  ] });
};
const Steps = ({ id }) => {
  const { state } = useVNextNetworkChat();
  const currentState = state[id];
  return /* @__PURE__ */ jsx("ol", { className: "flex flex-col gap-px rounded-lg overflow-hidden", children: currentState.executionSteps?.filter((stepId) => stepId !== "start").map((stepId, index) => /* @__PURE__ */ jsx(StepEntry, { stepId, step: currentState.steps[stepId] || {}, runId: currentState.runId }, index)) });
};
const StepEntry = ({ stepId, step, runId }) => {
  const [expanded, setExpanded] = useState(false);
  let stepResult = step["step-result"];
  const stepError = step["error"];
  if (stepId === "workflow-step" || stepId === "Agent-Network-Outer-Workflow.workflow-step") {
    const parsedResult = JSON.parse(stepResult?.output?.result ?? "{}") ?? {};
    if (!parsedResult?.runResult && stepResult?.status === "success") {
      stepResult = {
        ...stepResult,
        status: "failed",
        error: "Something went wrong"
      };
    }
  }
  if (stepError) {
    stepResult = {
      ...stepResult,
      status: "failed",
      error: stepError?.data?.error?.message
    };
  }
  if (stepId === "finish") {
    return /* @__PURE__ */ jsx("div", { className: "bg-surface4 py-2 px-3 text-icon6 flex items-center gap-4 justify-between", children: /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon6", children: "Process completed" }) });
  }
  return /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        className: "bg-surface4 py-2 px-3 text-icon6 flex items-center gap-4 justify-between w-full text-left",
        onClick: () => setExpanded((s) => !s),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(StatusIcon, { status: stepResult ? stepResult?.status : "loading" }),
            /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon6", children: LabelMappings[stepId] || stepId })
          ] }),
          step.metadata?.startTime && /* @__PURE__ */ jsx(StepClock, { step })
        ]
      }
    ),
    (stepId === "routing-step" || stepId === "Agent-Network-Outer-Workflow.routing-step") && expanded && /* @__PURE__ */ jsxs("div", { className: "bg-surface1 p-3 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon3 font-medium", children: "Selection reason:" }),
        /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon6", children: stepResult?.output?.selectionReason || "N/A" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon3 font-medium", children: "Resource ID" }),
        /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon6", children: stepResult?.output?.resourceId || "N/A" })
      ] }),
      stepResult?.error ? /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon3 font-medium", children: "Error" }),
        /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon6", children: stepResult?.error || "N/A" })
      ] }) : null
    ] }),
    (stepId === "agent-step" || stepId === "Agent-Network-Outer-Workflow.agent-step") && (stepError || stepResult?.error) && expanded && /* @__PURE__ */ jsx("div", { className: "bg-surface1 p-3 space-y-4", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon3 font-medium", children: "Error" }),
      /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon6", children: stepError?.message || stepError?.data?.error?.message || stepResult?.error || "N/A" })
    ] }) }),
    (stepId === "toolStep" || stepId === "Agent-Network-Outer-Workflow.toolStep") && (stepError || stepResult?.error) && expanded && /* @__PURE__ */ jsx("div", { className: "bg-surface1 p-3 space-y-4", children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon3 font-medium", children: "Error" }),
      /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon6", children: stepError?.message || stepError?.data?.error?.message || stepResult?.error || "N/A" })
    ] }) }),
    stepId === "final-step" && expanded && /* @__PURE__ */ jsxs("div", { className: "bg-surface1 p-3 space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon3 font-medium", children: "Task:" }),
        /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon6", children: stepResult?.output?.task || "N/A" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon3 font-medium", children: "Number of iterations:" }),
        /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon6", children: stepResult?.output?.iteration || "N/A" })
      ] })
    ] }),
    (stepId === "workflow-step" || stepId === "Agent-Network-Outer-Workflow.workflow-step") && stepResult?.output?.resourceId ? /* @__PURE__ */ jsx(
      WorkflowStepResultDialog,
      {
        open: expanded,
        onOpenChange: setExpanded,
        workflowId: stepResult?.output?.resourceId,
        runId
      }
    ) : null
  ] });
};
const WorkflowStepResultDialog = ({ open, onOpenChange, workflowId, runId }) => {
  const { runs } = useWorkflowRuns(workflowId);
  const { workflow, isLoading } = useWorkflow(workflowId);
  const run = runs?.runs.find((run2) => run2.runId === runId);
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsx(DialogPortal, { children: /* @__PURE__ */ jsx(DialogContent, { className: "h-[90vh] w-[90%] max-w-[unset]", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 h-full", children: [
    /* @__PURE__ */ jsx(DialogTitle, { children: "Workflow details" }),
    /* @__PURE__ */ jsx(WorkflowRunProvider, { snapshot: typeof run?.snapshot === "object" ? run.snapshot : void 0, children: /* @__PURE__ */ jsx(WorkflowGraph, { workflowId, workflow, isLoading }) })
  ] }) }) }) });
};
const StatusIcon = ({ status }) => {
  if (status === "failed") {
    return /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(CrossIcon, { className: "text-accent2" }) });
  }
  if (status === "success") {
    return /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(CheckIcon, { className: "text-accent1" }) });
  }
  return /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(Spinner, { className: "animate-spin" }) });
};
const StepClock = ({ step }) => {
  return /* @__PURE__ */ jsx(Badge$1, { children: /* @__PURE__ */ jsx(Clock, { startedAt: step.metadata.startTime, endedAt: step.metadata?.endTime }) });
};

const NextAssistantMessage = ({
  ToolFallback: ToolFallbackCustom
}) => {
  const data = useMessage();
  const isSolelyToolCall = data.content.length === 1 && data.content[0].type === "tool-call";
  const content = data.content[0];
  if (!content) {
    return null;
  }
  const textContent = content.text;
  if (textContent === "start") {
    return /* @__PURE__ */ jsx(StepDropdown, {});
  }
  return /* @__PURE__ */ jsxs(MessagePrimitive.Root, { className: "max-w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "text-icon6 text-ui-lg leading-ui-lg", children: /* @__PURE__ */ jsx(
      MessagePrimitive.Content,
      {
        components: {
          Text: MarkdownText,
          tools: { Fallback: ToolFallbackCustom || ToolFallback$1 }
        }
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "h-6 pt-1", children: !isSolelyToolCall && /* @__PURE__ */ jsx(AssistantActionBar, {}) })
  ] });
};
const AssistantActionBar = () => {
  return /* @__PURE__ */ jsx(
    ActionBarPrimitive.Root,
    {
      hideWhenRunning: true,
      autohide: "always",
      autohideFloat: "single-branch",
      className: "flex gap-1 items-center transition-all",
      children: /* @__PURE__ */ jsx(ActionBarPrimitive.Copy, { asChild: true, children: /* @__PURE__ */ jsxs(TooltipIconButton, { tooltip: "Copy", className: "bg-transparent text-icon3 hover:text-icon6", children: [
        /* @__PURE__ */ jsx(MessagePrimitive.If, { copied: true, children: /* @__PURE__ */ jsx(CheckIcon$1, {}) }),
        /* @__PURE__ */ jsx(MessagePrimitive.If, { copied: false, children: /* @__PURE__ */ jsx(CopyIcon, {}) })
      ] }) })
    }
  );
};

const NetworkThread = ({ ToolFallback, networkName, hasMemory }) => {
  const areaRef = useRef(null);
  useAutoscroll(areaRef, { enabled: true });
  const WrappedAssistantMessage = (props) => {
    return /* @__PURE__ */ jsx(NextAssistantMessage, { ...props, ToolFallback });
  };
  return /* @__PURE__ */ jsxs(ThreadWrapper, { children: [
    /* @__PURE__ */ jsxs(ThreadPrimitive.Viewport, { className: "py-10 overflow-y-auto scroll-smooth h-full", ref: areaRef, autoScroll: false, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(ThreadWelcome, { networkName }),
        /* @__PURE__ */ jsx(
          ThreadPrimitive.Messages,
          {
            components: {
              UserMessage,
              EditComposer,
              AssistantMessage: WrappedAssistantMessage
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsx(ThreadPrimitive.If, { empty: false, children: /* @__PURE__ */ jsx("div", {}) })
    ] }),
    /* @__PURE__ */ jsx(Composer, { hasMemory })
  ] });
};
const ThreadWrapper = ({ children }) => {
  const hasAttachments = useHasAttachments();
  return /* @__PURE__ */ jsx(
    ThreadPrimitive.Root,
    {
      className: clsx(
        "max-w-[568px] w-full mx-auto px-4",
        hasAttachments ? "h-[calc(100%-208px)]" : "h-[calc(100%-112px)]"
      ),
      children
    }
  );
};
const ThreadWelcome = ({ networkName }) => {
  const safeNetworkName = networkName ?? "";
  const words = safeNetworkName.split(" ") ?? [];
  let initials = "A";
  if (words.length === 2) {
    initials = `${words[0][0]}${words[1][0]}`;
  } else if (safeNetworkName.length > 0) {
    initials = `${safeNetworkName[0]}`;
  } else {
    initials = "A";
  }
  return /* @__PURE__ */ jsx(ThreadPrimitive.Empty, { children: /* @__PURE__ */ jsxs("div", { className: "flex w-full flex-grow flex-col items-center justify-center", children: [
    /* @__PURE__ */ jsx(Avatar, { children: /* @__PURE__ */ jsx(AvatarFallback, { children: initials }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-4 font-medium", children: "How can I help you today?" })
  ] }) });
};
const Composer = ({ hasMemory }) => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(ComposerPrimitive.Root, { children: [
      /* @__PURE__ */ jsx(ComposerAttachments, {}),
      /* @__PURE__ */ jsxs("div", { className: "w-full bg-surface3 rounded-lg border-sm border-border1 px-3 py-4 mt-auto h-[100px]", children: [
        /* @__PURE__ */ jsx(ComposerPrimitive.Input, { asChild: true, className: "w-full", children: /* @__PURE__ */ jsx(
          "textarea",
          {
            className: "text-ui-lg leading-ui-lg placeholder:text-icon3 text-icon6 bg-transparent focus:outline-none resize-none",
            autoFocus: true,
            placeholder: "Enter your message...",
            name: "",
            id: ""
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
          /* @__PURE__ */ jsx(SpeechInput, {}),
          /* @__PURE__ */ jsx(ComposerAction, {})
        ] })
      ] })
    ] }),
    !hasMemory && /* @__PURE__ */ jsxs(Txt, { variant: "ui-sm", className: "text-icon3 flex items-center gap-2 pt-0.5", children: [
      /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(InfoIcon, {}) }),
      "Memory is not enabled. The conversation will not be persisted."
    ] })
  ] });
};
const SpeechInput = () => {
  const composerRuntime = useComposerRuntime();
  const { start, stop, isListening, transcript } = useSpeechRecognition({});
  useEffect(() => {
    if (!transcript) return;
    composerRuntime.setText(transcript);
  }, [composerRuntime, transcript]);
  return /* @__PURE__ */ jsx(
    TooltipIconButton,
    {
      type: "button",
      tooltip: isListening ? "Stop dictation" : "Start dictation",
      variant: "ghost",
      className: "rounded-full",
      onClick: () => isListening ? stop() : start(),
      children: isListening ? /* @__PURE__ */ jsx(CircleStopIcon, {}) : /* @__PURE__ */ jsx(Mic, { className: "h-6 w-6 text-[#898989] hover:text-[#fff]" })
    }
  );
};
const ComposerAction = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ComposerPrimitive.AddAttachment, { asChild: true, children: /* @__PURE__ */ jsx(TooltipIconButton, { tooltip: "Add attachment", variant: "ghost", className: "rounded-full", children: /* @__PURE__ */ jsx(PlusIcon, { className: "h-6 w-6 text-[#898989] hover:text-[#fff]" }) }) }),
    /* @__PURE__ */ jsx(ThreadPrimitive.If, { running: false, children: /* @__PURE__ */ jsx(ComposerPrimitive.Send, { asChild: true, children: /* @__PURE__ */ jsx(
      TooltipIconButton,
      {
        tooltip: "Send",
        variant: "default",
        className: "rounded-full border-sm border-[#363636] bg-[#292929]",
        children: /* @__PURE__ */ jsx(ArrowUp, { className: "h-6 w-6 text-[#898989] hover:text-[#fff]" })
      }
    ) }) }),
    /* @__PURE__ */ jsx(ThreadPrimitive.If, { running: true, children: /* @__PURE__ */ jsx(ComposerPrimitive.Cancel, { asChild: true, children: /* @__PURE__ */ jsx(TooltipIconButton, { tooltip: "Cancel", variant: "default", children: /* @__PURE__ */ jsx(CircleStopIcon, {}) }) }) })
  ] });
};
const EditComposer = () => {
  return /* @__PURE__ */ jsxs(ComposerPrimitive.Root, { children: [
    /* @__PURE__ */ jsx(ComposerPrimitive.Input, {}),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(ComposerPrimitive.Cancel, { asChild: true, children: /* @__PURE__ */ jsx(Button$1, { variant: "ghost", children: "Cancel" }) }),
      /* @__PURE__ */ jsx(ComposerPrimitive.Send, { asChild: true, children: /* @__PURE__ */ jsx(Button$1, { children: "Send" }) })
    ] })
  ] });
};
const CircleStopIcon = () => {
  return /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", fill: "currentColor", width: "16", height: "16", children: /* @__PURE__ */ jsx("rect", { width: "10", height: "10", x: "3", y: "3", rx: "2" }) });
};

const MessagesContext = createContext({
  messages: [],
  setMessages: () => {
  },
  appendToLastMessage: () => {
  }
});
const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const appendToLastMessage = (partial) => setMessages((msgs) => {
    const lastMsg = msgs[msgs.length - 1];
    const content = typeof lastMsg.content === "string" ? lastMsg.content : (lastMsg.content?.[0]).text;
    return [
      ...msgs.slice(0, -1),
      {
        ...lastMsg,
        content: [{ type: "text", text: content + partial }]
      }
    ];
  });
  return /* @__PURE__ */ jsx(MessagesContext.Provider, { value: { messages, setMessages, appendToLastMessage }, children });
};
const useMessages = () => useContext(MessagesContext);

const convertMessage = (message) => {
  return message;
};
function VNextMastraNetworkRuntimeProvider({
  children,
  networkId,
  memory,
  threadId,
  refreshThreadList,
  initialMessages,
  runtimeContext
}) {
  const runIdRef = useRef(void 0);
  const [isRunning, setIsRunning] = useState(false);
  const { messages, setMessages, appendToLastMessage } = useMessages();
  const [currentThreadId, setCurrentThreadId] = useState(threadId);
  const { handleStep, state, setState } = useVNextNetworkChat();
  const { chatWithLoop, maxIterations } = useContext(NetworkContext);
  const id = runIdRef.current;
  const currentState = id ? state[id] : void 0;
  const runtimeContextInstance = new RuntimeContext$2();
  Object.entries(runtimeContext ?? {}).forEach(([key, value]) => {
    runtimeContextInstance.set(key, value);
  });
  useEffect(() => {
    if (!currentState) return;
    const hasFinished = Boolean(currentState?.steps?.["finish"]);
    if (!hasFinished) return;
    const workflowStep = currentState?.steps?.["workflow-step"];
    const toolStep = currentState?.steps?.["toolStep"];
    if (!workflowStep && !toolStep) return;
    const workflowStepResult = workflowStep?.["step-result"];
    const toolStepResult = toolStep?.["step-result"];
    if (!workflowStepResult && !toolStepResult) return;
    const workflowStepResultOutput = workflowStepResult?.output;
    const toolStepResultOutput = toolStepResult?.output;
    if (!workflowStepResultOutput && !toolStepResultOutput) return;
    const run = async () => {
      const parsedResult = workflowStepResult ? JSON.parse(workflowStepResult?.output?.result ?? "{}") ?? {} : { runResult: toolStepResultOutput?.result ?? {} };
      if (parsedResult?.runResult) {
        const runResult = parsedResult?.runResult ?? {};
        const formatted = await formatJSON(JSON.stringify(runResult));
        setMessages((msgs) => [
          ...msgs,
          { role: "assistant", content: [{ type: "text", text: `\`\`\`json
${formatted}\`\`\`` }] }
        ]);
      }
    };
    run();
  }, [currentState]);
  useEffect(() => {
    if (messages.length === 0 || currentThreadId !== threadId) {
      const run = async (result, messageId) => {
        const formatted = await formatJSON(result);
        const finalResponse = `\`\`\`json
${formatted}\`\`\``;
        setMessages((currentConversation) => {
          return currentConversation.map((message) => {
            if (message.metadata?.custom?.id === messageId) {
              return { ...message, content: [{ type: "text", text: finalResponse }] };
            }
            return message;
          });
        });
      };
      if (initialMessages && threadId && memory) {
        let userMessage = "";
        let iteration = 1;
        const formattedMessages = [];
        let assistantStep = freshAssistantStep();
        for (let i = 0; i < initialMessages.length; i++) {
          const message = initialMessages[i];
          if (message.role === "user") {
            assistantStep = freshAssistantStep();
            userMessage = message.content;
            formattedMessages.push({
              role: "user",
              message
            });
            continue;
          }
          if (message.role === "assistant") {
            const responseArray = message.parts ?? [];
            let hasRoutingDecision = false;
            let hasTaskCompleteDecision = false;
            let directText = "";
            let jsonStringResponse = "";
            for (const part of responseArray) {
              if (part.type === "text" && part.text) {
                const parsed = safeParse(part.text);
                if (parsed?.resourceId && parsed?.resourceType) {
                  hasRoutingDecision = true;
                  assistantStep.routingDecision = parsed;
                }
                if (typeof parsed?.isComplete === "boolean") {
                  hasTaskCompleteDecision = true;
                  assistantStep.taskCompleteDecision = parsed;
                  if (parsed?.isComplete) {
                    assistantStep.finalResponse = parsed.finalResult;
                    formattedMessages.push({ role: "assistant", message: assistantStep });
                    assistantStep = freshAssistantStep();
                  }
                }
                if (!parsed || !parsed.resourceId && !parsed.runResult && typeof parsed.isComplete !== "boolean") {
                  directText = part.text;
                }
                if (parsed && !parsed.resourceId && typeof parsed.isComplete !== "boolean") {
                  jsonStringResponse = part.text;
                }
              }
            }
            if (!hasRoutingDecision && !hasTaskCompleteDecision) {
              assistantStep.finalResponse = directText || jsonStringResponse;
              if (assistantStep.routingDecision || assistantStep.finalResponse) {
                formattedMessages.push({ role: "assistant", message: assistantStep });
                assistantStep = freshAssistantStep();
              }
            }
          }
          if (i === initialMessages.length - 1 && (assistantStep.routingDecision || assistantStep.finalResponse)) {
            formattedMessages.push({ role: "assistant", message: assistantStep });
          }
        }
        for (const formattedMessage of formattedMessages) {
          const { role, message } = formattedMessage;
          if (role === "user") {
            iteration = 1;
            userMessage = message.content;
            setMessages((currentConversation) => {
              if (currentConversation.some((m) => m.id === message.id)) {
                return currentConversation;
              }
              return [...currentConversation, message];
            });
          }
          if (role === "assistant") {
            const { id: id2, formattedMessageId, finalStepId, routingDecision, finalResponse, taskCompleteDecision } = message;
            let resourceStepId = "";
            if (routingDecision?.resourceType === "agent") resourceStepId = "agent-step";
            if (routingDecision?.resourceType === "tool") resourceStepId = "toolStep";
            if (routingDecision?.resourceType === "workflow") resourceStepId = "workflow-step";
            let runId = "";
            let runResult = {};
            let finalStep = null;
            let finalResult = "";
            if (resourceStepId === "workflow-step" || resourceStepId === "toolStep") {
              const parsedResult = JSON.parse(finalResponse ?? "{}") ?? {};
              runResult = resourceStepId === "workflow-step" ? parsedResult?.runResult ?? {} : parsedResult ?? {};
              runId = parsedResult?.runId ?? "";
            }
            if (taskCompleteDecision?.isComplete) {
              finalStep = {
                executionSteps: ["start", "routing-step", "final-step", "finish"],
                runId: "",
                steps: {
                  start: {},
                  "routing-step": {
                    "step-result": {
                      output: {
                        selectionReason: taskCompleteDecision?.completionReason ?? ""
                      },
                      status: "success"
                    }
                  },
                  "final-step": {
                    "step-result": {
                      output: {
                        iteration,
                        task: userMessage
                      },
                      status: "success"
                    }
                  },
                  finish: {}
                }
              };
              finalResult = taskCompleteDecision?.finalResult;
            }
            const routingStepFailed = resourceStepId === "workflow-step" || resourceStepId === "toolStep" ? Object.keys(runResult).length === 0 : !finalResponse;
            setState((currentState2) => {
              return {
                ...currentState2,
                ...finalStep ? { [finalStepId]: finalStep } : {
                  [id2]: {
                    executionSteps: ["start", "routing-step", resourceStepId, "finish"],
                    runId,
                    steps: {
                      start: {},
                      "routing-step": {
                        "step-result": {
                          output: routingDecision,
                          status: routingDecision ? "success" : "failed",
                          ...routingDecision ? {} : { error: "Something went wrong" }
                        }
                      },
                      [resourceStepId]: {
                        "step-result": {
                          output: {
                            resourceId: routingDecision?.resourceId,
                            result: finalResponse ?? ""
                          },
                          status: routingStepFailed ? "failed" : "success",
                          ...routingStepFailed ? { error: "Something went wrong" } : {}
                        }
                      },
                      finish: {}
                    }
                  }
                }
              };
            });
            setMessages((currentConversation) => {
              const assistantRoutingMessageExist = currentConversation.some(
                (message2) => message2.metadata?.custom?.id === id2
              );
              const assistantResponseMessageExist = currentConversation.some(
                (message2) => message2.metadata?.custom?.id === formattedMessageId
              );
              return [
                ...currentConversation,
                ...finalResult ? [
                  {
                    role: "assistant",
                    metadata: {
                      custom: {
                        id: finalStepId
                      }
                    },
                    content: [
                      {
                        type: "text",
                        text: "start"
                      }
                    ]
                  },
                  {
                    role: "assistant",
                    content: [{ type: "text", text: finalResult }]
                  }
                ] : [
                  ...assistantRoutingMessageExist ? [] : [
                    {
                      role: "assistant",
                      metadata: {
                        custom: {
                          id: id2
                        }
                      },
                      content: [
                        {
                          type: "text",
                          text: "start"
                        }
                      ]
                    }
                  ],
                  ...assistantResponseMessageExist ? [] : [
                    {
                      role: "assistant",
                      content: [
                        {
                          type: "text",
                          text: resourceStepId === "workflow-step" || resourceStepId === "toolStep" ? "" : finalResponse
                        }
                      ],
                      metadata: {
                        custom: {
                          id: formattedMessageId
                        }
                      }
                    }
                  ]
                ]
              ];
            });
            if ((resourceStepId === "workflow-step" || resourceStepId === "toolStep") && !routingStepFailed) {
              run(JSON.stringify(runResult), formattedMessageId);
            }
            iteration++;
          }
        }
        setCurrentThreadId(threadId);
      }
    }
  }, [initialMessages, threadId, memory, messages]);
  const mastra = useMastraClient();
  const network = mastra.getVNextNetwork(networkId);
  const onNew = async (message) => {
    runIdRef.current = void 0;
    if (message.content[0]?.type !== "text") throw new Error("Only text messages are supported");
    const input = message.content[0].text;
    setMessages((currentConversation) => [...currentConversation, { role: "user", content: input }]);
    setIsRunning(true);
    try {
      if (chatWithLoop) {
        const run = async (result, messageId) => {
          const formatted = await formatJSON(result);
          const finalResponse = `\`\`\`json
${formatted}\`\`\``;
          setMessages((currentConversation) => {
            return currentConversation.map((message2) => {
              if (message2.metadata?.custom?.id === messageId) {
                return { ...message2, content: [{ type: "text", text: finalResponse }] };
              }
              return message2;
            });
          });
        };
        let isAgentNetworkOuterWorkflowCompleted = false;
        await network.loopStream(
          {
            message: input,
            threadId,
            resourceId: networkId,
            maxIterations,
            runtimeContext: runtimeContextInstance
          },
          async (record) => {
            if (record.type === "step-start" && record.payload?.id === "Agent-Network-Outer-Workflow") {
              const id2 = v4();
              runIdRef.current = id2;
              setMessages((currentConversation) => {
                return [
                  ...currentConversation,
                  {
                    role: "assistant",
                    metadata: {
                      custom: {
                        id: id2
                      }
                    },
                    content: [
                      {
                        type: "text",
                        text: "start"
                      }
                    ]
                  }
                ];
              });
            } else if (runIdRef.current) {
              if (record.type === "tool-call-delta") {
                appendToLastMessage(record.argsTextDelta);
              } else if (record.type === "tool-call-streaming-start") {
                setMessages((msgs) => [...msgs, { role: "assistant", content: [{ type: "text", text: "" }] }]);
                setTimeout(() => {
                  refreshThreadList?.();
                }, 500);
                return;
              } else {
                if (record.type === "step-finish" && record.payload?.id === "Agent-Network-Outer-Workflow") {
                  if (!isAgentNetworkOuterWorkflowCompleted) {
                    handleStep(runIdRef.current, { ...record, type: "finish" });
                    runIdRef.current = void 0;
                  }
                } else if (record.type === "step-result" && (record.payload?.id === "Agent-Network-Outer-Workflow.workflow-step" || record.payload?.id === "Agent-Network-Outer-Workflow.toolStep")) {
                  handleStep(runIdRef.current, record);
                  const result = record?.payload?.output?.result;
                  const parsedResult = typeof result === "string" ? JSON.parse(record?.payload?.output?.result ?? "{}") ?? {} : { runResult: result };
                  const runResult = parsedResult?.runResult ?? {};
                  const formatedOutputId = v4();
                  setMessages((msgs) => [
                    ...msgs,
                    {
                      role: "assistant",
                      content: [
                        {
                          type: "text",
                          text: ""
                        }
                      ],
                      metadata: {
                        custom: {
                          id: formatedOutputId
                        }
                      }
                    }
                  ]);
                  run(JSON.stringify(runResult), formatedOutputId);
                } else if (record.payload?.id === "Agent-Network-Outer-Workflow" || record.payload?.id === "finish-step") {
                  if (record.type === "step-result" && record.payload?.id === "Agent-Network-Outer-Workflow") {
                    isAgentNetworkOuterWorkflowCompleted = record?.payload?.output?.isComplete;
                  }
                } else {
                  handleStep(runIdRef.current, record);
                }
              }
            }
            if (record.type === "step-result" && record.payload?.id === "final-step") {
              setMessages((msgs) => [
                ...msgs,
                { role: "assistant", content: [{ type: "text", text: record.payload?.output?.result }] }
              ]);
            }
            if (record.type === "step-finish" && record.payload?.id === "final-step") {
              runIdRef.current = void 0;
            }
            if (record.type === "start" || record.type === "step-start" || record.type === "finish") {
              setTimeout(() => {
                refreshThreadList?.();
              }, 500);
            }
          }
        );
      } else {
        await network.stream(
          {
            message: input,
            threadId,
            resourceId: networkId,
            runtimeContext: runtimeContextInstance
          },
          (record) => {
            if (runIdRef.current) {
              if (record.type === "tool-call-delta") {
                appendToLastMessage(record.argsTextDelta);
              } else if (record.type === "tool-call-streaming-start") {
                setMessages((msgs) => [...msgs, { role: "assistant", content: [{ type: "text", text: "" }] }]);
                return;
              } else {
                handleStep(runIdRef.current, record);
              }
            } else if (record.type === "start") {
              const id2 = v4();
              runIdRef.current = id2;
              setMessages((currentConversation) => {
                return [
                  ...currentConversation,
                  {
                    role: "assistant",
                    metadata: {
                      custom: {
                        id: id2
                      }
                    },
                    content: [
                      {
                        type: "text",
                        text: "start"
                      }
                    ]
                  }
                ];
              });
            }
            if (record.type === "start" || record.type === "step-start" || record.type === "finish") {
              setTimeout(() => {
                refreshThreadList?.();
              }, 500);
            }
          }
        );
      }
      setIsRunning(false);
    } catch (error) {
      console.error("Error occurred in VNextMastraNetworkRuntimeProvider", error);
      setIsRunning(false);
    }
  };
  const runtime = useExternalStoreRuntime({
    isRunning,
    messages,
    convertMessage,
    onNew
  });
  return /* @__PURE__ */ jsxs(AssistantRuntimeProvider, { runtime, children: [
    " ",
    children,
    " "
  ] });
  function safeParse(str) {
    try {
      return JSON.parse(str);
    } catch {
      return void 0;
    }
  }
  function freshAssistantStep() {
    return {
      id: v4(),
      formattedMessageId: v4(),
      finalStepId: v4(),
      finalResponse: ""
    };
  }
}

const VNextNetworkChat = ({
  networkId,
  networkName,
  threadId,
  initialMessages,
  memory,
  refreshThreadList
}) => {
  const { runtimeContext } = usePlaygroundStore();
  return /* @__PURE__ */ jsx(MessagesProvider, { children: /* @__PURE__ */ jsx(VNextNetworkChatProvider, { children: /* @__PURE__ */ jsx(
    VNextMastraNetworkRuntimeProvider,
    {
      networkId,
      initialMessages: initialMessages ?? [],
      threadId,
      memory,
      refreshThreadList,
      runtimeContext,
      children: /* @__PURE__ */ jsx("div", { className: "h-full pb-4", children: /* @__PURE__ */ jsx(NetworkThread, { hasMemory: memory, networkName }) })
    },
    threadId
  ) }, threadId) }, threadId);
};

const columns$1 = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const { Link } = useLinkComponent();
      return /* @__PURE__ */ jsx(
        EntryCell,
        {
          icon: /* @__PURE__ */ jsx(AgentIcon, {}),
          name: /* @__PURE__ */ jsx(
            Link,
            {
              className: "w-full space-y-0",
              href: `/networks${row.original.isVNext ? "/v-next" : ""}/${row.original.id}/chat`,
              children: row.original.name
            }
          ),
          description: row.original.instructions
        }
      );
    },
    meta: {
      width: "auto"
    }
  },
  {
    id: "agents",
    header: "Agents",
    cell: ({ row }) => /* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx(Badge$1, { icon: /* @__PURE__ */ jsx(Users, {}), children: row.original.agentsSize }) })
  },
  {
    id: "workflows",
    header: "Workflows",
    cell: ({ row }) => /* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx(Badge$1, { icon: /* @__PURE__ */ jsx(WorkflowIcon, {}), children: row.original.workflowsSize }) })
  },
  {
    id: "tools",
    header: "Tools",
    cell: ({ row }) => /* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx(Badge$1, { icon: /* @__PURE__ */ jsx(ToolsIcon, {}), children: row.original.toolsSize }) })
  },
  {
    id: "model",
    header: "Routing Models",
    cell: ({ row }) => /* @__PURE__ */ jsxs(Cell, { className: "truncate", children: [
      /* @__PURE__ */ jsx(Badge$1, { variant: "default", icon: /* @__PURE__ */ jsx(Brain, {}), children: row.original.routingModel }),
      row.original.isVNext ? /* @__PURE__ */ jsx(Badge$1, { className: "!text-accent1 ml-2", children: "vNext" }) : null
    ] })
  }
];

const NetworkTable = ({ legacyNetworks, networks, isLoading, computeLink }) => {
  const { navigate } = useLinkComponent();
  const allNetworks = useMemo(
    () => [
      ...legacyNetworks?.map((network) => ({
        ...network,
        routingModel: network.routingModel.modelId,
        agentsSize: network.agents.length,
        isVNext: false
      })) ?? [],
      ...networks?.map((network) => ({
        ...network,
        routingModel: network.routingModel.modelId,
        agentsSize: network.agents.length,
        workflowsSize: network.workflows.length,
        toolsSize: network.tools.length,
        isVNext: true
      })) ?? []
    ],
    [networks, legacyNetworks]
  );
  const table = useReactTable({
    data: allNetworks,
    columns: columns$1,
    getCoreRowModel: getCoreRowModel()
  });
  if (isLoading) return /* @__PURE__ */ jsx(NetworkTableSkeleton, {});
  const ths = table.getHeaderGroups()[0];
  const rows = table.getRowModel().rows.concat();
  if (rows.length === 0) {
    return /* @__PURE__ */ jsx(NetworkTableEmpty, {});
  }
  return /* @__PURE__ */ jsx(ScrollableContainer, { children: /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(Thead, { className: "sticky top-0", children: ths.headers.map((header) => /* @__PURE__ */ jsx(Th, { style: { width: header.index === 0 ? "auto" : header.column.getSize() }, children: flexRender(header.column.columnDef.header, header.getContext()) }, header.id)) }),
    /* @__PURE__ */ jsx(Tbody, { children: rows.map((row) => /* @__PURE__ */ jsx(
      Row,
      {
        onClick: () => navigate(computeLink(row.original.id, row.original.isVNext || false)),
        className: "cursor-pointer",
        children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(React__default.Fragment, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))
      },
      row.id
    )) })
  ] }) });
};
const NetworkTableEmpty = () => {
  return /* @__PURE__ */ jsx(
    EmptyState,
    {
      iconSlot: /* @__PURE__ */ jsx(AgentNetworkCoinIcon, {}),
      titleSlot: "Configure Agent Networks",
      descriptionSlot: "Mastra agent networks are not configured yet. You can find more information in the documentation.",
      actionSlot: /* @__PURE__ */ jsxs(
        Button,
        {
          size: "lg",
          className: "w-full",
          variant: "light",
          as: "a",
          href: "https://mastra.ai/en/reference/networks/agent-network",
          target: "_blank",
          children: [
            /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(NetworkIcon, {}) }),
            "Docs"
          ]
        }
      )
    }
  );
};
const NetworkTableSkeleton = () => {
  return /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsxs(Thead, { children: [
      /* @__PURE__ */ jsx(Th, { children: "Name" }),
      /* @__PURE__ */ jsx(Th, { width: 160, children: "Agents" }),
      /* @__PURE__ */ jsx(Th, { width: 160, children: "Workflows" }),
      /* @__PURE__ */ jsx(Th, { width: 160, children: "Tools" }),
      /* @__PURE__ */ jsx(Th, { width: 160, children: "Routing Models" })
    ] }),
    /* @__PURE__ */ jsx(Tbody, { children: Array.from({ length: 3 }).map((_, index) => /* @__PURE__ */ jsxs(Row, { children: [
      /* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }) }),
      /* @__PURE__ */ jsx(Cell, { width: 160, children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }) }),
      /* @__PURE__ */ jsx(Cell, { width: 160, children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }) }),
      /* @__PURE__ */ jsx(Cell, { width: 160, children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }) }),
      /* @__PURE__ */ jsx(Cell, { width: 160, children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }) })
    ] }, index)) })
  ] });
};

const ToolList = ({ tools, agents, isLoading, computeLink, computeAgentLink }) => {
  const toolsWithAgents = useMemo(() => prepareAgents(tools, agents), [tools, agents]);
  if (isLoading)
    return /* @__PURE__ */ jsx("div", { className: "max-w-5xl w-full mx-auto px-4 pt-8", children: /* @__PURE__ */ jsx(ToolListSkeleton, {}) });
  return /* @__PURE__ */ jsx(ToolListInner, { toolsWithAgents, computeLink, computeAgentLink });
};
const ToolListInner = ({
  toolsWithAgents,
  computeLink,
  computeAgentLink
}) => {
  const [filteredTools, setFilteredTools] = useState(toolsWithAgents);
  const [value, setValue] = useState("");
  if (filteredTools.length === 0 && !value) return /* @__PURE__ */ jsx(ToolListEmpty, {});
  const handleSearch = (e) => {
    const value2 = e.target.value;
    setValue(value2);
    startTransition(() => {
      setFilteredTools(
        toolsWithAgents.filter(
          (tool) => tool.id.toLowerCase().includes(value2.toLowerCase()) || tool.description.toLowerCase().includes(value2.toLowerCase()) || tool.agents.some(
            (agent) => agent.name.toLowerCase().includes(value2.toLowerCase()) || agent.id.toLowerCase().includes(value2.toLowerCase())
          )
        )
      );
    });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-5xl w-full mx-auto px-4 pt-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-4 flex items-center gap-2 rounded-lg bg-surface5 focus-within:ring-2 focus-within:ring-accent3", children: [
        /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(SearchIcon, {}) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Search for a tool",
            className: "w-full py-2 bg-transparent text-icon3 focus:text-icon6 placeholder:text-icon3 outline-none",
            value,
            onChange: handleSearch
          }
        )
      ] }),
      filteredTools.length === 0 && /* @__PURE__ */ jsx(Txt, { as: "p", className: "text-icon3 py-2", children: "No tools found matching your search." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "grid md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-5xl mx-auto py-8", children: filteredTools.map((tool) => /* @__PURE__ */ jsx(ToolEntity, { tool, computeLink, computeAgentLink }, tool.id)) })
  ] });
};
const ToolEntity = ({ tool, computeLink, computeAgentLink }) => {
  const linkRef = useRef(null);
  const { Link } = useLinkComponent();
  return /* @__PURE__ */ jsxs(Entity, { onClick: () => linkRef.current?.click(), children: [
    /* @__PURE__ */ jsx(EntityIcon, { children: /* @__PURE__ */ jsx(ToolsIcon, { className: "group-hover/entity:text-[#ECB047]" }) }),
    /* @__PURE__ */ jsxs(EntityContent, { children: [
      /* @__PURE__ */ jsx(EntityName, { children: /* @__PURE__ */ jsx(Link, { ref: linkRef, href: computeLink(tool.id, tool.agents[0]?.id), children: tool.id }) }),
      /* @__PURE__ */ jsx(EntityDescription, { children: tool.description }),
      /* @__PURE__ */ jsx("div", { className: "inline-flex flex-wrap gap-2 pt-4", children: tool.agents.map((agent) => {
        return /* @__PURE__ */ jsx(
          Link,
          {
            href: computeAgentLink(tool.id, agent.id),
            onClick: (e) => e.stopPropagation(),
            className: "group/link",
            children: /* @__PURE__ */ jsx(Badge$1, { icon: /* @__PURE__ */ jsx(AgentIcon, { className: "group-hover/link:text-accent3" }), className: "bg-surface5 ", children: agent.name })
          },
          agent.id
        );
      }) })
    ] })
  ] });
};
const ToolListSkeleton = () => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { className: "max-w-5xl w-full mx-auto px-4 pt-8", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full" }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-5xl mx-auto py-8", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-40 w-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-40 w-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-40 w-full" })
    ] })
  ] });
};
const ToolListEmpty = () => {
  return /* @__PURE__ */ jsx(
    EmptyState,
    {
      iconSlot: /* @__PURE__ */ jsx(ToolCoinIcon, {}),
      titleSlot: "Configure Tools",
      descriptionSlot: "Mastra tools are not configured yet. You can find more information in the documentation.",
      actionSlot: /* @__PURE__ */ jsxs(
        Button,
        {
          size: "lg",
          className: "w-full",
          variant: "light",
          as: "a",
          href: "https://mastra.ai/en/docs/agents/using-tools-and-mcp",
          target: "_blank",
          children: [
            /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(ToolsIcon, {}) }),
            "Docs"
          ]
        }
      )
    }
  );
};
const prepareAgents = (tools, agents) => {
  const toolsWithAgents = /* @__PURE__ */ new Map();
  const agentsKeys = Object.keys(agents);
  for (const k of agentsKeys) {
    const agent = agents[k];
    const agentToolsDict = agent.tools;
    const agentToolsKeys = Object.keys(agentToolsDict);
    for (const key of agentToolsKeys) {
      const tool = agentToolsDict[key];
      if (!toolsWithAgents.has(tool.id)) {
        toolsWithAgents.set(tool.id, {
          ...tool,
          agents: []
        });
      }
      toolsWithAgents.get(tool.id).agents.push({ id: k, name: agent.name });
    }
  }
  for (const [_, tool] of Object.entries(tools)) {
    if (!toolsWithAgents.has(tool.id)) {
      toolsWithAgents.set(tool.id, {
        ...tool,
        agents: []
      });
    }
  }
  return Array.from(toolsWithAgents.values());
};

function LegacyWorkflowNestedGraph({
  stepGraph,
  stepSubscriberGraph,
  open
}) {
  const { nodes: initialNodes, edges: initialEdges } = contructLegacyNodesAndEdges({
    stepGraph,
    stepSubscriberGraph
  });
  const [isMounted, setIsMounted] = useState(false);
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
  const nodeTypes = {
    "default-node": WorkflowDefaultNode,
    "condition-node": WorkflowConditionNode,
    "after-node": WorkflowAfterNode,
    "loop-result-node": WorkflowLoopResultNode
  };
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setIsMounted(true);
      }, 500);
    }
  }, [open]);
  return /* @__PURE__ */ jsx("div", { className: "w-full h-full relative", children: isMounted ? /* @__PURE__ */ jsxs(
    ReactFlow,
    {
      nodes,
      edges,
      fitView: true,
      fitViewOptions: { maxZoom: 0.85 },
      nodeTypes,
      onNodesChange,
      children: [
        /* @__PURE__ */ jsx(Controls, {}),
        /* @__PURE__ */ jsx(MiniMap, { pannable: true, zoomable: true, maskColor: "#121212", bgColor: "#171717", nodeColor: "#2c2c2c" }),
        /* @__PURE__ */ jsx(Background, { variant: BackgroundVariant.Lines, gap: 12, size: 0.5 })
      ]
    }
  ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsx(Spinner, {}) }) });
}

const LegacyWorkflowNestedGraphContext = createContext(
  {}
);
function LegacyWorkflowNestedGraphProvider({ children }) {
  const [stepGraph, setStepGraph] = useState(null);
  const [stepSubscriberGraph, setStepSubscriberGraph] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [label, setLabel] = useState("");
  const closeNestedGraph = () => {
    setOpenDialog(false);
    setStepGraph(null);
    setStepSubscriberGraph(null);
    setLabel("");
  };
  const showNestedGraph = ({
    label: label2,
    stepGraph: stepGraph2,
    stepSubscriberGraph: stepSubscriberGraph2
  }) => {
    setLabel(label2);
    setStepGraph(stepGraph2);
    setStepSubscriberGraph(stepSubscriberGraph2);
    setOpenDialog(true);
  };
  return /* @__PURE__ */ jsxs(
    LegacyWorkflowNestedGraphContext.Provider,
    {
      value: {
        showNestedGraph,
        closeNestedGraph
      },
      children: [
        children,
        /* @__PURE__ */ jsx(Dialog, { open: openDialog, onOpenChange: closeNestedGraph, children: /* @__PURE__ */ jsx(DialogPortal, { children: /* @__PURE__ */ jsxs(DialogContent, { className: "w-[40rem] h-[40rem] bg-[#121212] p-[0.5rem]", children: [
          /* @__PURE__ */ jsxs(DialogTitle, { className: "flex items-center gap-1.5 absolute top-2.5 left-2.5", children: [
            /* @__PURE__ */ jsx(Workflow, { className: "text-current w-4 h-4" }),
            /* @__PURE__ */ jsxs(Text, { size: "xs", weight: "medium", className: "text-mastra-el-6 capitalize", children: [
              label,
              " workflow"
            ] })
          ] }),
          /* @__PURE__ */ jsx(ReactFlowProvider, { children: /* @__PURE__ */ jsx(
            LegacyWorkflowNestedGraph,
            {
              stepGraph,
              open: openDialog,
              stepSubscriberGraph
            }
          ) })
        ] }) }) })
      ]
    }
  );
}

function LegacyWorkflowNestedNode({ data }) {
  const { label, withoutTopHandle, withoutBottomHandle, stepGraph, stepSubscriberGraph } = data;
  const { showNestedGraph } = useContext(LegacyWorkflowNestedGraphContext);
  return /* @__PURE__ */ jsxs("div", { className: cn("bg-[rgba(29,29,29,0.5)] rounded-md h-full overflow-scroll w-[274px]"), children: [
    !withoutTopHandle && /* @__PURE__ */ jsx(Handle, { type: "target", position: Position.Top, style: { visibility: "hidden" } }),
    /* @__PURE__ */ jsx("div", { className: "p-2 cursor-pointer", onClick: () => showNestedGraph({ label, stepGraph, stepSubscriberGraph }), children: /* @__PURE__ */ jsxs("div", { className: "text-sm bg-mastra-bg-9 flex items-center gap-1.5 rounded-sm p-2 cursor-pointer", children: [
      /* @__PURE__ */ jsx(Workflow, { className: "text-current w-4 h-4" }),
      /* @__PURE__ */ jsx(Text, { size: "xs", weight: "medium", className: "text-mastra-el-6 capitalize", children: label })
    ] }) }),
    !withoutBottomHandle && /* @__PURE__ */ jsx(Handle, { type: "source", position: Position.Bottom, style: { visibility: "hidden" } })
  ] });
}

function LegacyWorkflowGraphInner({ workflow }) {
  const { nodes: initialNodes, edges: initialEdges } = contructLegacyNodesAndEdges({
    stepGraph: workflow.serializedStepGraph || workflow.stepGraph,
    stepSubscriberGraph: workflow.serializedStepSubscriberGraph || workflow.stepSubscriberGraph,
    steps: workflow.steps
  });
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);
  const nodeTypes = {
    "default-node": WorkflowDefaultNode,
    "condition-node": WorkflowConditionNode,
    "after-node": WorkflowAfterNode,
    "loop-result-node": WorkflowLoopResultNode,
    "nested-node": LegacyWorkflowNestedNode
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full h-full", children: /* @__PURE__ */ jsxs(
    ReactFlow,
    {
      nodes,
      edges,
      nodeTypes,
      onNodesChange,
      fitView: true,
      fitViewOptions: {
        maxZoom: 0.85
      },
      children: [
        /* @__PURE__ */ jsx(Controls, {}),
        /* @__PURE__ */ jsx(MiniMap, { pannable: true, zoomable: true, maskColor: "#121212", bgColor: "#171717", nodeColor: "#2c2c2c" }),
        /* @__PURE__ */ jsx(Background, { variant: BackgroundVariant.Dots, gap: 12, size: 0.5 })
      ]
    }
  ) });
}

function LegacyWorkflowGraph({ workflowId }) {
  const { legacyWorkflow, isLoading } = useLegacyWorkflow(workflowId);
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-[600px]" }) });
  }
  if (!legacyWorkflow) {
    return /* @__PURE__ */ jsx("div", { className: "grid h-full place-items-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsx(AlertCircleIcon, {}),
      /* @__PURE__ */ jsxs("div", { children: [
        "We couldn't find ",
        lodashTitleCase(workflowId),
        " workflow."
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx(LegacyWorkflowNestedGraphProvider, { children: /* @__PURE__ */ jsx(ReactFlowProvider, { children: /* @__PURE__ */ jsx(LegacyWorkflowGraphInner, { workflow: legacyWorkflow }) }) });
}

const Form = React__default.forwardRef(({ children, ...props }, ref) => {
  return /* @__PURE__ */ jsx("form", { ref, className: "space-y-4", ...props, children });
});

const DISABLED_LABELS = ["boolean", "object", "array"];
const FieldWrapper = ({ label, children, id, field, error }) => {
  const isDisabled = DISABLED_LABELS.includes(field.type);
  return /* @__PURE__ */ jsxs("div", { className: "pb-4 last:pb-0", children: [
    !isDisabled && /* @__PURE__ */ jsxs(Txt, { as: "label", variant: "ui-sm", className: "text-icon3 pb-1 block", htmlFor: id, children: [
      label,
      field.required && /* @__PURE__ */ jsx("span", { className: "text-accent2", children: " *" })
    ] }),
    children,
    field.fieldConfig?.description && /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-sm", className: "text-icon6", children: field.fieldConfig.description }),
    error && /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-sm", className: "text-accent2", children: error })
  ] });
};

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
const Alert = React.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props }));
Alert.displayName = "Alert";
const AlertTitle = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("h5", { ref, className: cn("mb-1 font-medium leading-none tracking-tight", className), ...props })
);
AlertTitle.displayName = "AlertTitle";
const AlertDescription = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("text-sm [&_p]:leading-relaxed", className), ...props })
);
AlertDescription.displayName = "AlertDescription";

const ErrorMessage = ({ error }) => /* @__PURE__ */ jsxs(Alert, { variant: "destructive", children: [
  /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4" }),
  /* @__PURE__ */ jsx(AlertTitle, { children: error })
] });

const SubmitButton = ({ children }) => /* @__PURE__ */ jsx(Button$1, { type: "submit", children });

const StringField = ({ inputProps, error, field, id }) => {
  const { key, ...props } = inputProps;
  return /* @__PURE__ */ jsx(Input, { id, className: error ? "border-destructive" : "", ...props, defaultValue: field.default });
};

const NumberField = ({ inputProps, error, field, id }) => {
  const { key, ...props } = inputProps;
  useEffect(() => {
    if (field.default !== void 0) {
      props.onChange({
        target: { value: Number(field.default), name: inputProps.name }
      });
    }
  }, [field.default]);
  return /* @__PURE__ */ jsx(
    Input,
    {
      id,
      type: "number",
      className: error ? "border-destructive" : "",
      ...props,
      defaultValue: field.default !== void 0 ? Number(field.default) : void 0,
      onChange: (e) => {
        const value = e.target.value;
        if (value !== "" && !isNaN(Number(value))) {
          props.onChange({
            target: { value, name: inputProps.name }
          });
        }
      },
      onBlur: (e) => {
        const value = e.target.value;
        if (value !== "" && !isNaN(Number(value))) {
          props.onChange({
            target: { value: Number(value), name: inputProps.name }
          });
        }
      }
    }
  );
};

const Checkbox = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  CheckboxPrimitive.Root,
  {
    ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsx(CheckboxPrimitive.Indicator, { className: cn("flex items-center justify-center text-current"), children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const BooleanField = ({ field, label, id, inputProps, value }) => /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
  /* @__PURE__ */ jsx(
    Checkbox,
    {
      id,
      onCheckedChange: (checked) => {
        const event = {
          target: {
            name: inputProps.name,
            value: checked
          }
        };
        inputProps.onChange(event);
      },
      defaultChecked: field.default,
      disabled: inputProps.disabled || inputProps.readOnly
    }
  ),
  /* @__PURE__ */ jsxs(Txt, { as: "label", variant: "ui-sm", className: "text-icon3", htmlFor: id, children: [
    label,
    field.required && /* @__PURE__ */ jsx("span", { className: "text-accent2", children: " *" })
  ] })
] });

function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  return /* @__PURE__ */ jsx(
    DayPicker,
    {
      showOutsideDays,
      className: cn("p-3", className),
      classNames: {
        months: "flex flex-col space-y-4 sm:space-y-0",
        month: "space-y-4",
        // month_caption: 'flex justify-center pt-1 relative items-center',
        caption_label: "text-sm text-text font-medium",
        nav: "space-x-1 flex items-center",
        nav_button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "absolute left-4 top-[56px] z-10"
        ),
        nav_button_next: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "absolute right-4 top-[56px] z-10"
        ),
        dropdown_month: "w-full border-collapse space-y-1",
        weeknumber: "flex",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md",
          "h-8 w-8 p-0 hover:bg-lightGray-7/50 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "!bg-primary !text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-lightGray-7/50 text-accent-foreground",
        day_outside: "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames
      },
      components: {
        // IconDropdown: ({  }) => (
        //   <CalendarIcon
        //     className={cn('h-4 w-4', {
        //       'rotate-180': orientation === 'up',
        //       'rotate-90': orientation === 'left',
        //       '-rotate-90': orientation === 'right',
        //     })}
        //   />
        // ),
      },
      ...props
    }
  );
}
Calendar.displayName = "Calendar";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverContent = React.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  PopoverPrimitive.Content,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

const DatePicker = ({
  value,
  setValue,
  children,
  className,
  placeholder,
  ...props
}) => {
  const [openPopover, setOpenPopover] = React.useState(false);
  return /* @__PURE__ */ jsxs(Popover, { open: openPopover, onOpenChange: setOpenPopover, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: children ? children : /* @__PURE__ */ jsx(
      DefaultButton,
      {
        value,
        placeholder,
        className,
        "data-testid": "datepicker-button"
      }
    ) }),
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        className: "backdrop-blur-4xl w-auto p-0 bg-[#171717]",
        align: "start",
        "data-testid": "datepicker-calendar",
        children: /* @__PURE__ */ jsx(
          DatePickerOnly,
          {
            value,
            setValue,
            clearable: props.clearable,
            setOpenPopover,
            ...props
          }
        )
      }
    )
  ] });
};
const DatePickerOnly = ({
  value,
  setValue,
  setOpenPopover,
  clearable,
  placeholder,
  className,
  ...props
}) => {
  const [inputValue, setInputValue] = React.useState(value ? format(value, "PP") : "");
  const [selected, setSelected] = React.useState(value ? new Date(value) : void 0);
  const debouncedDateUpdate = useDebouncedCallback((date) => {
    if (isValid(date)) {
      setSelected(date);
      setValue?.(date);
      setOpenPopover?.(false);
    }
  }, 2e3);
  const handleInputChange = (e) => {
    setInputValue(e.currentTarget.value);
    const date = new Date(e.target.value);
    debouncedDateUpdate(date);
  };
  const handleDaySelect = (date) => {
    setSelected(date);
    setValue?.(date);
    setOpenPopover?.(false);
    if (date) {
      setInputValue(format(date, "PP"));
    } else {
      setInputValue("");
    }
  };
  const handleMonthSelect = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, "PP"));
    } else {
      setInputValue("");
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "aria-label": "Choose date",
      className: "relative mt-2 flex flex-col gap-2",
      onKeyDown: (e) => {
        e.stopPropagation();
        if (e.key === "Escape") {
          setOpenPopover?.(false);
        }
      },
      children: [
        /* @__PURE__ */ jsx("div", { className: "w-full px-3", children: /* @__PURE__ */ jsx(
          Input,
          {
            type: "text",
            value: inputValue,
            onChange: handleInputChange,
            placeholder,
            className
          }
        ) }),
        /* @__PURE__ */ jsx(
          Calendar,
          {
            mode: "single",
            month: selected,
            selected,
            onMonthChange: handleMonthSelect,
            onSelect: handleDaySelect,
            ...props
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "px-3 pb-2", children: clearable && /* @__PURE__ */ jsx(
          Button$1,
          {
            variant: "outline",
            tabIndex: 0,
            className: "w-full !opacity-50 duration-200 hover:!opacity-100",
            onClick: () => {
              setValue(null);
              setSelected(void 0);
              setInputValue("");
              setOpenPopover?.(false);
            },
            children: "Clear"
          }
        ) })
      ]
    }
  );
};
const DefaultButton = React.forwardRef(
  ({ value, placeholder, className, ...props }, ref) => {
    return /* @__PURE__ */ jsxs(
      Button$1,
      {
        ref,
        variant: "outline",
        className: cn(
          "bg-neutral-825 border-neutral-775 w-full justify-start whitespace-nowrap rounded-md border px-2 py-0 text-left flex items-center gap-1",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx(CalendarIcon, { className: "h-4 w-4" }),
          value ? /* @__PURE__ */ jsx("span", { className: "text-white", children: format(value, "PPP") }) : /* @__PURE__ */ jsx("span", { className: "text-gray", children: placeholder ?? "Pick a date" })
        ]
      }
    );
  }
);
DefaultButton.displayName = "DefaultButton";

const DateField = ({ inputProps, field, error, id }) => {
  const { key, ...props } = inputProps;
  const [value, setValue] = useState(null);
  useEffect(() => {
    if (field.default) {
      const date = new Date(field.default);
      if (isValid(date)) {
        setValue(date);
      }
    }
  }, [field]);
  return /* @__PURE__ */ jsx(
    DatePicker,
    {
      id,
      className: error ? "border-destructive" : "",
      value,
      setValue: (date) => {
        const newDate = date ? new Date(date).toISOString() : date;
        if (newDate) {
          props.onChange({
            target: { value: newDate?.toString(), name: inputProps.name }
          });
          setValue(new Date(newDate));
        }
      },
      clearable: true
    }
  );
};

const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: /* @__PURE__ */ jsx(
      SelectPrimitive.Viewport,
      {
        className: cn(
          "p-1",
          position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        ),
        children
      }
    )
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-mastra-el-5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectField = ({ field, inputProps, error, id, value }) => {
  const { key, ...props } = inputProps;
  return /* @__PURE__ */ jsxs(
    Select,
    {
      ...props,
      onValueChange: (value2) => {
        const syntheticEvent = {
          target: {
            value: value2,
            name: inputProps.name
          }
        };
        props.onChange(syntheticEvent);
      },
      defaultValue: field.default,
      children: [
        /* @__PURE__ */ jsx(SelectTrigger, { id, className: error ? "border-destructive" : "", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select an option" }) }),
        /* @__PURE__ */ jsx(SelectContent, { children: (field.options || []).map(([key2, label]) => /* @__PURE__ */ jsx(SelectItem, { value: key2, children: label }, key2)) })
      ]
    }
  );
};

const ObjectWrapper = ({ label, children }) => {
  const hasLabel = label !== "​" && label !== "";
  return /* @__PURE__ */ jsxs("div", { className: "", children: [
    hasLabel && /* @__PURE__ */ jsxs(Txt, { as: "h3", variant: "ui-sm", className: "text-icon3 flex items-center gap-1 pb-2", children: [
      /* @__PURE__ */ jsx(Icon, { size: "sm", children: /* @__PURE__ */ jsx(Braces, {}) }),
      label
    ] }),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: hasLabel ? "flex flex-col gap-1 [&>*]:border-dashed [&>*]:border-l [&>*]:border-l-border1 [&>*]:pl-4" : "",
        children
      }
    )
  ] });
};

const ArrayWrapper = ({ label, children, onAddItem }) => {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 justify-between", children: [
      /* @__PURE__ */ jsxs(Txt, { as: "h3", variant: "ui-sm", className: "text-icon3 pb-2 flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Icon, { size: "sm", children: /* @__PURE__ */ jsx(Brackets, {}) }),
        label
      ] }),
      /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { delayDuration: 0, children: [
        /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onAddItem,
            type: "button",
            className: "text-icon3 bg-surface3 rounded-md p-1 hover:bg-surface4 hover:text-icon6 h-icon-sm w-icon-sm",
            children: /* @__PURE__ */ jsx(Icon, { size: "sm", children: /* @__PURE__ */ jsx(PlusIcon, {}) })
          }
        ) }),
        /* @__PURE__ */ jsx(TooltipContent, { children: "Add item" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children })
  ] });
};

const ArrayElementWrapper = ({ children, onRemove }) => {
  return /* @__PURE__ */ jsxs("div", { className: "pl-4 border-l border-border1", children: [
    children,
    /* @__PURE__ */ jsxs(Button, { onClick: onRemove, type: "button", children: [
      /* @__PURE__ */ jsx(Icon, { size: "sm", children: /* @__PURE__ */ jsx(TrashIcon, {}) }),
      "Delete"
    ] })
  ] });
};

const RecordField = ({ inputProps, field, error, id }) => {
  const { key, onChange, ...props } = inputProps;
  const [pairs, setPairs] = React.useState(
    () => Object.entries(field.default || {}).map(([key2, val]) => ({
      id: key2 || v4(),
      key: key2,
      value: val
    }))
  );
  React.useEffect(() => {
    if (pairs.length === 0) {
      setPairs([{ id: v4(), key: "", value: "" }]);
    }
  }, [pairs]);
  const updateForm = React.useCallback(
    (newPairs) => {
      const newValue = newPairs.reduce(
        (acc, pair) => {
          if (pair.key) {
            acc[pair.key] = pair.value;
          }
          return acc;
        },
        {}
      );
      onChange?.({
        target: { value: newValue, name: inputProps.name }
      });
    },
    [onChange, inputProps.name]
  );
  const handleChange = (id2, field2, newValue) => {
    setPairs((prev) => prev.map((pair) => pair.id === id2 ? { ...pair, [field2]: newValue } : pair));
  };
  const handleBlur = () => {
    updateForm(pairs);
  };
  const addPair = () => {
    const newPairs = [...pairs, { id: v4(), key: "", value: "" }];
    setPairs(newPairs);
    updateForm(newPairs);
  };
  const removePair = (id2) => {
    const newPairs = pairs.filter((p) => p.id !== id2);
    if (newPairs.length === 0) {
      newPairs.push({ id: v4(), key: "", value: "" });
    }
    setPairs(newPairs);
    updateForm(newPairs);
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
    pairs.map((pair) => /* @__PURE__ */ jsxs("div", { className: "relative space-y-2 rounded-lg border p-4", children: [
      /* @__PURE__ */ jsx(
        Button$1,
        {
          type: "button",
          variant: "ghost",
          size: "icon",
          className: "absolute right-2 top-2",
          onClick: () => removePair(pair.id),
          children: /* @__PURE__ */ jsx(TrashIcon, { className: "h-4 w-4" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-6", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Key",
            value: pair.key,
            onChange: (e) => handleChange(pair.id, "key", e.target.value),
            onBlur: handleBlur
          }
        ),
        /* @__PURE__ */ jsx(
          Input,
          {
            placeholder: "Value",
            value: pair.value,
            onChange: (e) => handleChange(pair.id, "value", e.target.value),
            onBlur: handleBlur
          }
        )
      ] })
    ] }, pair.id)),
    /* @__PURE__ */ jsxs(Button$1, { type: "button", variant: "outline", size: "sm", className: "w-full", onClick: addPair, children: [
      /* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
      "Add Key-Value Pair"
    ] })
  ] });
};

const ShadcnUIComponents = {
  Form,
  FieldWrapper,
  ErrorMessage,
  SubmitButton,
  ObjectWrapper,
  ArrayWrapper,
  ArrayElementWrapper
};
function AutoForm({
  uiComponents,
  formComponents,
  readOnly,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    AutoForm$1,
    {
      ...props,
      uiComponents: { ...ShadcnUIComponents, ...uiComponents },
      formComponents: {
        string: (props2) => /* @__PURE__ */ jsx(StringField, { ...props2, inputProps: { ...props2.inputProps, readOnly } }),
        number: (props2) => /* @__PURE__ */ jsx(NumberField, { ...props2, inputProps: { ...props2.inputProps, readOnly } }),
        boolean: (props2) => /* @__PURE__ */ jsx(BooleanField, { ...props2, inputProps: { ...props2.inputProps, readOnly } }),
        date: (props2) => /* @__PURE__ */ jsx(DateField, { ...props2, inputProps: { ...props2.inputProps, readOnly } }),
        select: (props2) => /* @__PURE__ */ jsx(SelectField, { ...props2, inputProps: { ...props2.inputProps, readOnly } }),
        record: (props2) => /* @__PURE__ */ jsx(RecordField, { ...props2, inputProps: { ...props2.inputProps, readOnly } }),
        ...formComponents
      }
    }
  );
}

buildZodFieldConfig();

function inferFieldType(schema, fieldConfig) {
  if (fieldConfig?.fieldType) {
    return fieldConfig.fieldType;
  }
  if (schema instanceof z.ZodObject) return "object";
  if (schema instanceof z.ZodNumber) return "number";
  if (schema instanceof z.ZodBoolean) return "boolean";
  if (schema instanceof z.ZodDate || schema?.isDatetime || schema?.isDate) return "date";
  if (schema instanceof z.ZodString) return "string";
  if (schema instanceof z.ZodEnum) return "select";
  if (schema instanceof z.ZodNativeEnum) return "select";
  if (schema instanceof z.ZodArray) return "array";
  if (schema instanceof z.ZodRecord) return "record";
  return "string";
}

function parseField(key, schema) {
  const baseSchema = getBaseSchema(schema);
  const fieldConfig = getFieldConfigInZodStack(schema);
  const type = inferFieldType(baseSchema, fieldConfig);
  const defaultValue = getDefaultValueInZodStack(schema);
  const options = baseSchema._def?.values;
  let optionValues = [];
  if (options) {
    if (!Array.isArray(options)) {
      optionValues = Object.entries(options);
    } else {
      optionValues = options.map((value) => [value, value]);
    }
  }
  let subSchema = [];
  if (baseSchema instanceof z.ZodObject) {
    subSchema = Object.entries(baseSchema.shape).map(([key2, field]) => parseField(key2, field));
  }
  if (baseSchema instanceof z.ZodArray) {
    subSchema = [parseField("0", baseSchema._def.type)];
  }
  return {
    key,
    type,
    required: !schema.isOptional(),
    default: defaultValue,
    description: baseSchema.description,
    fieldConfig,
    options: optionValues,
    schema: subSchema
  };
}
function getBaseSchema(schema) {
  if ("innerType" in schema._def) {
    return getBaseSchema(schema._def.innerType);
  }
  if ("schema" in schema._def) {
    return getBaseSchema(schema._def.schema);
  }
  return schema;
}
function parseSchema(schema) {
  const objectSchema = schema instanceof z.ZodEffects ? schema.innerType() : schema;
  const shape = objectSchema.shape;
  const fields = Object.entries(shape).map(([key, field]) => parseField(key, field));
  return { fields };
}
class CustomZodProvider extends ZodProvider {
  _schema;
  constructor(schema) {
    super(schema);
    this._schema = schema;
  }
  parseSchema() {
    return parseSchema(this._schema);
  }
}

function isEmptyZodObject(schema) {
  if (schema instanceof ZodObject) {
    return Object.keys(schema.shape).length === 0;
  }
  return false;
}
function DynamicForm({
  schema,
  onSubmit,
  defaultValues,
  isSubmitLoading,
  submitButtonLabel,
  className,
  readOnly
}) {
  const isNotZodObject = !(schema instanceof ZodObject);
  if (!schema) {
    console.error("no form schema found");
    return null;
  }
  const normalizedSchema = (schema2) => {
    if (isEmptyZodObject(schema2)) {
      return z$1.object({});
    }
    if (isNotZodObject) {
      return z$1.object({
        "​": schema2
      });
    }
    return schema2;
  };
  const schemaProvider = new CustomZodProvider(normalizedSchema(schema));
  const formProps = {
    schema: schemaProvider,
    onSubmit: async (values) => {
      await onSubmit?.(isNotZodObject ? values["​"] || {} : values);
    },
    defaultValues: isNotZodObject ? defaultValues ? { "​": defaultValues } : void 0 : defaultValues,
    formProps: {
      className
    },
    uiComponents: {
      SubmitButton: ({ children }) => onSubmit ? /* @__PURE__ */ jsx(Button, { variant: "light", className: "w-full", size: "lg", disabled: isSubmitLoading, children: isSubmitLoading ? /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) }) : submitButtonLabel || children }) : null
    },
    formComponents: {
      Label: ({ value }) => /* @__PURE__ */ jsx(Label, { className: "text-sm font-normal", children: value })
    },
    withSubmit: true
  };
  return /* @__PURE__ */ jsx(AutoForm, { ...formProps, readOnly });
}

function resolveSerializedZodOutput(obj) {
  return Function("z", `"use strict";return (${obj});`)(z);
}

function CodeBlockDemo({
  code = "",
  language = "ts",
  filename,
  className
}) {
  return /* @__PURE__ */ jsxs(CodeBlock$1, { code, language, theme: themes.oneDark, children: [
    filename ? /* @__PURE__ */ jsx("div", { className: "absolute w-full px-6 py-2 pl-4 text-sm rounded bg-mastra-bg-2 text-mastra-el-6/50", children: filename }) : null,
    /* @__PURE__ */ jsx(
      CodeBlock$1.Code,
      {
        className: cn("bg-transparent h-full p-6 rounded-xl whitespace-pre-wrap", filename ? "pt-10" : "", className),
        children: /* @__PURE__ */ jsx("div", { className: "table-row", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(CodeBlock$1.LineNumber, { className: "table-cell pr-4 text-sm text-right select-none text-gray-500/50" }),
          /* @__PURE__ */ jsx(CodeBlock$1.LineContent, { className: "flex", children: /* @__PURE__ */ jsx(CodeBlock$1.Token, { className: "font-mono text-sm mastra-token" }) })
        ] }) })
      }
    )
  ] });
}

const WorkflowCard = ({ header, children, footer }) => {
  const [expanded, setExpanded] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "rounded-lg border-sm border-border1 bg-surface4", children: [
    /* @__PURE__ */ jsxs("button", { className: "py-1 px-2 flex items-center gap-3 justify-between w-full", onClick: () => setExpanded((s) => !s), children: [
      /* @__PURE__ */ jsx("div", { className: "w-full", children: header }),
      /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(ChevronDownIcon, { className: cn("text-icon3 transition-transform -rotate-90", expanded && "rotate-0") }) })
    ] }),
    children && expanded && /* @__PURE__ */ jsx("div", { className: "border-t-sm border-border1", children }),
    footer && /* @__PURE__ */ jsx("div", { className: "py-1 px-2 border-t-sm border-border1", children: footer })
  ] });
};

const LegacyWorkflowStatus = ({ stepId, pathStatus, path }) => {
  const status = pathStatus === "completed" ? "Completed" : stepId === path ? pathStatus.charAt(0).toUpperCase() + pathStatus.slice(1) : pathStatus === "executing" ? "Executing" : "Completed";
  return /* @__PURE__ */ jsx(
    WorkflowCard,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(Icon, { children: [
          status === "Completed" && /* @__PURE__ */ jsx(CheckIcon, { className: "text-accent1" }),
          status === "Failed" && /* @__PURE__ */ jsx(CrossIcon, { className: "text-accent2" }),
          status === "Executing" && /* @__PURE__ */ jsx(Loader2, { className: "text-icon3 animate-spin" })
        ] }),
        /* @__PURE__ */ jsx(Txt, { as: "span", variant: "ui-lg", className: "text-icon6 font-medium", children: path })
      ] })
    }
  );
};

const WorkflowResult = ({ jsonResult, sanitizedJsonResult }) => {
  const { handleCopy } = useCopyToClipboard({ text: jsonResult });
  const [expanded, setExpanded] = useState(false);
  return /* @__PURE__ */ jsx(
    WorkflowCard,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 justify-between w-full", children: [
        /* @__PURE__ */ jsxs(Txt, { variant: "ui-lg", className: "text-icon6 flex items-center gap-3 font-medium", children: [
          /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(DeploymentIcon, {}) }),
          "Workflow Execution (JSON)"
        ] }),
        /* @__PURE__ */ jsxs(Tooltip, { children: [
          /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "p-2 rounded-lg hover:bg-surface5 transition-colors duration-150 ease-in-out text-icon3 hover:text-icon6",
              onClick: () => handleCopy(),
              children: /* @__PURE__ */ jsx(Icon, { size: "sm", children: /* @__PURE__ */ jsx(CopyIcon, {}) })
            }
          ) }),
          /* @__PURE__ */ jsx(TooltipContent, { children: "Copy result" })
        ] })
      ] }),
      footer: /* @__PURE__ */ jsx(
        "button",
        {
          className: "w-full h-full text-center text-icon2 hover:text-icon6 text-ui-md",
          onClick: () => setExpanded((s) => !s),
          children: expanded ? "collapse" : "expand"
        }
      ),
      children: expanded ? /* @__PURE__ */ jsx(CodeBlockDemo, { className: "w-full overflow-x-auto", code: sanitizedJsonResult || jsonResult, language: "json" }) : null
    }
  );
};

function LegacyWorkflowTrigger({
  workflowId,
  setRunId
}) {
  const { legacyResult: result, setLegacyResult: setResult, payload, setPayload } = useContext(WorkflowRunContext);
  const { isLoading, legacyWorkflow: workflow } = useLegacyWorkflow(workflowId);
  const { createLegacyWorkflowRun: createWorkflowRun, startLegacyWorkflowRun: startWorkflowRun } = useExecuteWorkflow();
  const {
    watchLegacyWorkflow: watchWorkflow,
    legacyWatchResult: watchResult,
    isWatchingLegacyWorkflow: isWatchingWorkflow
  } = useWatchWorkflow();
  const { resumeLegacyWorkflow: resumeWorkflow, isResumingLegacyWorkflow: isResumingWorkflow } = useResumeWorkflow();
  const [suspendedSteps, setSuspendedSteps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const triggerSchema = workflow?.triggerSchema;
  const handleExecuteWorkflow = async (data) => {
    try {
      if (!workflow) return;
      setIsRunning(true);
      setResult(null);
      const { runId } = await createWorkflowRun({ workflowId });
      setRunId?.(runId);
      watchWorkflow({ workflowId, runId });
      startWorkflowRun({ workflowId, runId, input: data });
    } catch (err) {
      setIsRunning(false);
      toast.error("Error executing workflow");
    }
  };
  const handleResumeWorkflow = async (step) => {
    if (!workflow) return;
    const { stepId, runId: prevRunId, context } = step;
    const { runId } = await createWorkflowRun({ workflowId, prevRunId });
    watchWorkflow({ workflowId, runId });
    await resumeWorkflow({
      stepId,
      runId,
      context,
      workflowId
    });
  };
  const watchResultToUse = result ?? watchResult;
  const workflowActivePaths = watchResultToUse?.activePaths ?? {};
  useEffect(() => {
    setIsRunning(isWatchingWorkflow);
  }, [isWatchingWorkflow]);
  useEffect(() => {
    if (!watchResultToUse?.activePaths || !result?.runId) return;
    const suspended = Object.entries(watchResultToUse.activePaths).filter(([_, { status }]) => status === "suspended").map(([stepId, { suspendPayload }]) => ({
      stepId,
      runId: result.runId,
      suspendPayload
    }));
    setSuspendedSteps(suspended);
  }, [watchResultToUse, result]);
  useEffect(() => {
    if (watchResult) {
      setResult(watchResult);
    }
  }, [watchResult]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(ScrollArea, { className: "h-[calc(100vh-126px)] pt-2 px-4 pb-4 text-xs", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10" })
    ] }) });
  }
  if (!workflow) return null;
  const isSuspendedSteps = suspendedSteps.length > 0;
  const zodInputSchema = triggerSchema ? resolveSerializedZodOutput(jsonSchemaToZod(parse(triggerSchema))) : null;
  const { sanitizedOutput, ...restResult } = result ?? {};
  const hasWorkflowActivePaths = Object.values(workflowActivePaths).length > 0;
  return /* @__PURE__ */ jsx("div", { className: "h-full px-5 pt-3 pb-12", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    isResumingWorkflow && /* @__PURE__ */ jsxs("div", { className: "py-2 px-5 flex items-center gap-2 bg-surface5 -mx-5 -mt-5 border-b-sm border-border1", children: [
      /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-icon6" }) }),
      /* @__PURE__ */ jsx(Txt, { children: "Resuming workflow" })
    ] }),
    !isSuspendedSteps && /* @__PURE__ */ jsx(Fragment, { children: zodInputSchema ? /* @__PURE__ */ jsx(
      DynamicForm,
      {
        schema: zodInputSchema,
        defaultValues: payload,
        isSubmitLoading: isWatchingWorkflow,
        submitButtonLabel: "Run",
        onSubmit: (data) => {
          setPayload(data);
          handleExecuteWorkflow(data);
        }
      }
    ) : /* @__PURE__ */ jsx(
      Button,
      {
        className: "w-full",
        variant: "light",
        disabled: isRunning,
        onClick: () => handleExecuteWorkflow(null),
        children: isRunning ? /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) }) : "Trigger"
      }
    ) }),
    isSuspendedSteps && suspendedSteps?.map((step) => {
      const stepDefinition = workflow.steps[step.stepId];
      const stepSchema = stepDefinition?.inputSchema ? resolveSerializedZodOutput(jsonSchemaToZod(parse(stepDefinition.inputSchema))) : z.record(z.string(), z.any());
      return /* @__PURE__ */ jsxs("div", { className: "flex flex-col px-4", children: [
        /* @__PURE__ */ jsx(Text, { variant: "secondary", className: "text-mastra-el-3", size: "xs", children: step.stepId }),
        step.suspendPayload && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
          CodeBlockDemo,
          {
            className: "w-full overflow-x-auto p-2",
            code: JSON.stringify(step.suspendPayload, null, 2),
            language: "json"
          }
        ) }),
        /* @__PURE__ */ jsx(
          DynamicForm,
          {
            schema: stepSchema,
            isSubmitLoading: isResumingWorkflow,
            submitButtonLabel: "Resume",
            onSubmit: (data) => {
              handleResumeWorkflow({
                stepId: step.stepId,
                runId: step.runId,
                suspendPayload: step.suspendPayload,
                context: data
              });
            }
          }
        )
      ] });
    }),
    hasWorkflowActivePaths && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("hr", { className: "border-border1 border-sm my-5" }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4", children: Object.entries(workflowActivePaths)?.map(([stepId, { status: pathStatus, stepPath }]) => {
        return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1", children: stepPath?.map((path, idx) => {
          return /* @__PURE__ */ jsx(LegacyWorkflowStatus, { stepId, pathStatus, path }, idx);
        }) }, stepId);
      }) })
    ] }),
    result && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("hr", { className: "border-border1 border-sm my-5" }),
      /* @__PURE__ */ jsx(WorkflowResult, { sanitizedJsonResult: sanitizedOutput, jsonResult: JSON.stringify(restResult, null, 2) })
    ] })
  ] }) });
}

const WorkflowStatus = ({ stepId, status, result }) => {
  return /* @__PURE__ */ jsx(
    WorkflowCard,
    {
      header: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxs(Icon, { children: [
          status === "success" && /* @__PURE__ */ jsx(CheckIcon, { className: "text-accent1" }),
          status === "failed" && /* @__PURE__ */ jsx(CrossIcon, { className: "text-accent2" }),
          status === "suspended" && /* @__PURE__ */ jsx(CirclePause, { className: "text-accent3" }),
          status === "waiting" && /* @__PURE__ */ jsx(HourglassIcon, { className: "text-accent5" }),
          status === "running" && /* @__PURE__ */ jsx(Loader2, { className: "text-accent6 animate-spin" })
        ] }),
        /* @__PURE__ */ jsx(Txt, { as: "span", variant: "ui-lg", className: "text-icon6 font-medium", children: stepId.charAt(0).toUpperCase() + stepId.slice(1) })
      ] }),
      children: /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-surface4 p-1 font-mono relative", children: [
        /* @__PURE__ */ jsx(CopyButton, { content: JSON.stringify(result, null, 2), className: "absolute top-2 right-2 z-10" }),
        /* @__PURE__ */ jsx(SyntaxHighlighter$1, { data: result })
      ] })
    }
  );
};

const WorkflowInputData = ({
  schema,
  defaultValues,
  isSubmitLoading,
  submitButtonLabel,
  onSubmit
}) => {
  const [type, setType] = useState("form");
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      RadioGroup,
      {
        disabled: isSubmitLoading,
        value: type,
        onValueChange: (value) => setType(value),
        className: "pb-4",
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(RadioGroupItem, { value: "form", id: "form" }),
            /* @__PURE__ */ jsx(Label, { htmlFor: "form", className: "!text-icon3 text-ui-sm", children: "Form" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx(RadioGroupItem, { value: "json", id: "json" }),
            /* @__PURE__ */ jsx(Label, { htmlFor: "json", className: "!text-icon3 text-ui-sm", children: "JSON" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn({
          "opacity-50 pointer-events-none": isSubmitLoading
        }),
        children: type === "form" ? /* @__PURE__ */ jsx(
          DynamicForm,
          {
            schema,
            defaultValues,
            isSubmitLoading,
            submitButtonLabel,
            onSubmit
          }
        ) : /* @__PURE__ */ jsx(
          JSONInput,
          {
            schema,
            defaultValues,
            isSubmitLoading,
            submitButtonLabel,
            onSubmit
          }
        )
      }
    )
  ] });
};
const JSONInput = ({ schema, defaultValues, isSubmitLoading, submitButtonLabel, onSubmit }) => {
  const [errors, setErrors] = useState([]);
  const [inputData, setInputData] = useState(JSON.stringify(defaultValues ?? {}, null, 2));
  const handleSubmit = () => {
    setErrors([]);
    try {
      const result = schema.safeParse(JSON.parse(inputData));
      if (!result.success) {
        setErrors(result.error.issues.map((e) => `[${e.path.join(".")}] ${e.message}`));
      } else {
        onSubmit(result.data);
      }
    } catch (e) {
      setErrors(["Invalid JSON provided"]);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-4", children: [
    errors.length > 0 && /* @__PURE__ */ jsxs("div", { className: "border-sm border-accent2 rounded-lg p-2", children: [
      /* @__PURE__ */ jsxs(Txt, { as: "p", variant: "ui-md", className: "text-accent2 font-semibold", children: [
        errors.length,
        " errors found"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "list-disc list-inside", children: errors.map((error, idx) => /* @__PURE__ */ jsx("li", { className: "text-ui-sm text-accent2", children: error }, idx)) })
    ] }),
    /* @__PURE__ */ jsx(SyntaxHighlighter, { data: inputData, onChange: setInputData }),
    /* @__PURE__ */ jsx(Button, { variant: "light", onClick: handleSubmit, className: "w-full", size: "lg", children: isSubmitLoading ? /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) : submitButtonLabel })
  ] });
};
const SyntaxHighlighter = ({ data, onChange }) => {
  const theme = useCodemirrorTheme$1();
  return /* @__PURE__ */ jsxs("div", { className: "rounded-md bg-[#1a1a1a] p-1 font-mono", children: [
    /* @__PURE__ */ jsx(CopyButton, { content: data, className: "absolute top-2 right-2 z-10" }),
    /* @__PURE__ */ jsx(CodeMirror, { value: data, theme, extensions: [jsonLanguage], onChange })
  ] });
};

function WorkflowTrigger({
  workflowId,
  setRunId,
  workflow,
  isLoading,
  createWorkflowRun,
  resumeWorkflow,
  streamWorkflow,
  isStreamingWorkflow,
  streamResult,
  isResumingWorkflow,
  isCancellingWorkflowRun,
  cancelWorkflowRun
}) {
  const { runtimeContext } = usePlaygroundStore();
  const { result, setResult, payload, setPayload } = useContext(WorkflowRunContext);
  const [suspendedSteps, setSuspendedSteps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [innerRunId, setInnerRunId] = useState("");
  const [cancelResponse, setCancelResponse] = useState(null);
  const triggerSchema = workflow?.inputSchema;
  const handleExecuteWorkflow = async (data) => {
    try {
      if (!workflow) return;
      setIsRunning(true);
      setCancelResponse(null);
      setResult(null);
      const { runId } = await createWorkflowRun({ workflowId });
      setRunId?.(runId);
      setInnerRunId(runId);
      streamWorkflow({ workflowId, runId, inputData: data, runtimeContext });
    } catch (err) {
      setIsRunning(false);
      toast.error("Error executing workflow");
    }
  };
  const handleResumeWorkflow = async (step) => {
    if (!workflow) return;
    setCancelResponse(null);
    const { stepId, runId: prevRunId, resumeData } = step;
    const { runId } = await createWorkflowRun({ workflowId, prevRunId });
    await resumeWorkflow({
      step: stepId,
      runId,
      resumeData,
      workflowId,
      runtimeContext
    });
  };
  const handleCancelWorkflowRun = async () => {
    const response = await cancelWorkflowRun({ workflowId, runId: innerRunId });
    setCancelResponse(response);
  };
  const streamResultToUse = result ?? streamResult;
  useEffect(() => {
    setIsRunning(isStreamingWorkflow);
  }, [isStreamingWorkflow]);
  useEffect(() => {
    if (!streamResultToUse?.payload?.workflowState?.steps || !result?.runId) return;
    const suspended = Object.entries(streamResultToUse.payload.workflowState.steps).filter(([_, { status }]) => status === "suspended").map(([stepId, { payload: payload2 }]) => ({
      stepId,
      runId: result.runId,
      suspendPayload: payload2,
      isLoading: false
    }));
    setSuspendedSteps(suspended);
  }, [streamResultToUse, result]);
  useEffect(() => {
    if (streamResult) {
      setResult(streamResult);
    }
  }, [streamResult]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(ScrollArea, { className: "h-[calc(100vh-126px)] pt-2 px-4 pb-4 text-xs", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-10" })
    ] }) });
  }
  if (!workflow) return null;
  const isSuspendedSteps = suspendedSteps.length > 0;
  const zodInputSchema = triggerSchema ? resolveSerializedZodOutput(jsonSchemaToZod(parse(triggerSchema))) : null;
  const workflowActivePaths = streamResultToUse?.payload?.workflowState?.steps ?? {};
  const hasWorkflowActivePaths = Object.values(workflowActivePaths).length > 0;
  const doneStatuses = ["success", "failed", "canceled"];
  return /* @__PURE__ */ jsxs("div", { className: "h-full pt-3 pb-12", children: [
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 px-5 pb-5 border-b-sm border-border1", children: [
      (isResumingWorkflow || isSuspendedSteps && isStreamingWorkflow) && /* @__PURE__ */ jsxs("div", { className: "py-2 px-5 flex items-center gap-2 bg-surface5 -mx-5 -mt-5 border-b-sm border-border1", children: [
        /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin text-icon6" }) }),
        /* @__PURE__ */ jsx(Txt, { children: "Resuming workflow" })
      ] }),
      !isSuspendedSteps && /* @__PURE__ */ jsx(Fragment, { children: zodInputSchema ? /* @__PURE__ */ jsx(
        WorkflowInputData,
        {
          schema: zodInputSchema,
          defaultValues: payload,
          isSubmitLoading: isStreamingWorkflow,
          submitButtonLabel: "Run",
          onSubmit: (data) => {
            setPayload(data);
            handleExecuteWorkflow(data);
          }
        }
      ) : /* @__PURE__ */ jsx(
        Button,
        {
          className: "w-full",
          variant: "light",
          disabled: isRunning,
          onClick: () => handleExecuteWorkflow(null),
          children: isRunning ? /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) }) : "Trigger"
        }
      ) }),
      !isStreamingWorkflow && isSuspendedSteps && suspendedSteps?.map((step) => {
        const stepDefinition = workflow.allSteps[step.stepId];
        if (!stepDefinition || stepDefinition.isWorkflow) return null;
        const stepSchema = stepDefinition?.resumeSchema ? resolveSerializedZodOutput(jsonSchemaToZod(parse(stepDefinition.resumeSchema))) : z.record(z.string(), z.any());
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-col px-4", children: [
          /* @__PURE__ */ jsx(Text, { variant: "secondary", className: "text-mastra-el-3", size: "xs", children: step.stepId }),
          step.suspendPayload && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
            CodeBlockDemo,
            {
              className: "w-full overflow-x-auto p-2",
              code: JSON.stringify(step.suspendPayload, null, 2),
              language: "json"
            }
          ) }),
          /* @__PURE__ */ jsx(
            WorkflowInputData,
            {
              schema: stepSchema,
              isSubmitLoading: isResumingWorkflow,
              submitButtonLabel: "Resume",
              onSubmit: (data) => {
                const stepIds = step.stepId?.split(".");
                handleResumeWorkflow({
                  stepId: stepIds,
                  runId: step.runId,
                  suspendPayload: step.suspendPayload,
                  resumeData: data});
              }
            }
          )
        ] }, step.stepId);
      }),
      result?.runId && /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "light",
          className: "w-full",
          size: "lg",
          onClick: handleCancelWorkflowRun,
          disabled: !!cancelResponse?.message || isCancellingWorkflowRun || result?.payload?.workflowState?.status && doneStatuses.includes(result?.payload?.workflowState?.status),
          children: [
            isCancellingWorkflowRun ? /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(Loader2, { className: "animate-spin" }) }) : /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(StopCircle, {}) }),
            cancelResponse?.message || "Cancel Workflow Run"
          ]
        }
      ),
      hasWorkflowActivePaths && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx("hr", { className: "border-border1 border-sm my-5" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsx(Text, { variant: "secondary", className: "px-4 text-mastra-el-3", size: "xs", children: "Status" }),
          /* @__PURE__ */ jsx("div", { className: "px-4 flex flex-col gap-4", children: Object.entries(workflowActivePaths).filter(([key, _]) => key !== "input" && !key.endsWith(".input")).map(([stepId, { status, output }]) => {
            return /* @__PURE__ */ jsx(WorkflowStatus, { stepId, status, result: output ?? {} }, stepId);
          }) })
        ] })
      ] })
    ] }),
    result && /* @__PURE__ */ jsx("div", { className: "p-5 border-b-sm border-border1", children: /* @__PURE__ */ jsx(WorkflowJsonDialog, { result }) })
  ] });
}
const WorkflowJsonDialog = ({ result }) => {
  const [open, setOpen] = useState(false);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Button, { variant: "light", onClick: () => setOpen(true), className: "w-full", size: "lg", children: [
      /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(Braces, { className: "text-icon3" }) }),
      "Open Workflow Execution (JSON)"
    ] }),
    /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsx(DialogPortal, { children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-6xl max-h-[90vh] overflow-y-auto overflow-x-hidden bg-surface2", children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Workflow Execution (JSON)" }),
      /* @__PURE__ */ jsx("div", { className: "w-full h-full overflow-x-scroll", children: /* @__PURE__ */ jsx(SyntaxHighlighter$2, { data: result, className: "p-4" }) })
    ] }) }) })
  ] });
};

const WorkflowRuns = ({ workflowId, runId, isLoading, runs, onPressRun }) => {
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-[600px]" }) });
  }
  if (runs.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "p-4", children: /* @__PURE__ */ jsx(Txt, { variant: "ui-md", className: "text-icon6 text-center", children: "No previous run" }) });
  }
  return /* @__PURE__ */ jsx("ol", { className: "pb-10", children: runs.map((run) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: () => onPressRun({ workflowId, runId: run.runId }),
      className: clsx("px-3 py-2 border-b-sm border-border1 block w-full hover:bg-surface4 text-left", {
        "bg-surface4": run.runId === runId
      }),
      children: [
        /* @__PURE__ */ jsx(Txt, { variant: "ui-lg", className: "font-medium text-icon6 truncate", as: "p", children: run.runId }),
        /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "font-medium text-icon3 truncate", as: "p", children: typeof run?.snapshot === "string" ? "" : run?.snapshot?.timestamp ? formatDate(run?.snapshot?.timestamp, "MMM d, yyyy h:mm a") : "" })
      ]
    }
  ) }, run.runId)) });
};

const columns = [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const { Link } = useLinkComponent();
      return /* @__PURE__ */ jsx(
        EntryCell,
        {
          icon: /* @__PURE__ */ jsx(WorkflowIcon, {}),
          name: /* @__PURE__ */ jsx(Link, { href: row.original.link, children: row.original.name }),
          description: void 0,
          meta: void 0
        }
      );
    },
    meta: {
      width: "auto"
    }
  },
  {
    id: "stepsCount",
    header: "Steps",
    size: 300,
    cell: ({ row }) => /* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end items-center gap-2", children: [
      /* @__PURE__ */ jsxs(Badge$1, { icon: /* @__PURE__ */ jsx(Footprints, {}), className: "!h-button-md", children: [
        row.original.stepsCount,
        " step",
        row.original.stepsCount > 1 ? "s" : ""
      ] }),
      row.original.isLegacy ? /* @__PURE__ */ jsx(Badge$1, { className: "!text-foreground/80 !h-button-md", children: "Legacy" }) : null
    ] }) })
  }
];

function WorkflowTable({ workflows, legacyWorkflows, isLoading, computeLink }) {
  const { navigate } = useLinkComponent();
  const workflowData = useMemo(() => {
    const _workflowsData = Object.keys(workflows ?? {}).map((key) => {
      const workflow = workflows?.[key];
      return {
        id: key,
        name: workflow?.name || "N/A",
        stepsCount: Object.keys(workflow?.steps ?? {})?.length,
        isLegacy: false,
        link: computeLink(key)
      };
    });
    const legacyWorkflowsData = Object.keys(legacyWorkflows ?? {}).map((key) => {
      const workflow = legacyWorkflows?.[key];
      return {
        id: key,
        name: workflow?.name || "N/A",
        stepsCount: Object.keys(workflow?.steps ?? {})?.length,
        isLegacy: true,
        link: computeLink(key)
      };
    });
    return [..._workflowsData, ...legacyWorkflowsData];
  }, [workflows, legacyWorkflows]);
  const table = useReactTable({
    data: workflowData,
    columns,
    getCoreRowModel: getCoreRowModel()
  });
  if (isLoading) return /* @__PURE__ */ jsx(WorkflowTableSkeleton, {});
  const ths = table.getHeaderGroups()[0];
  const rows = table.getRowModel().rows.concat();
  if (rows.length === 0) {
    return /* @__PURE__ */ jsx(EmptyWorkflowsTable, {});
  }
  return /* @__PURE__ */ jsx(ScrollableContainer, { children: /* @__PURE__ */ jsxs(Table, { children: [
    /* @__PURE__ */ jsx(Thead, { className: "sticky top-0", children: ths.headers.map((header) => /* @__PURE__ */ jsx(Th, { style: { width: header.index === 0 ? "auto" : header.column.getSize() }, children: flexRender(header.column.columnDef.header, header.getContext()) }, header.id)) }),
    /* @__PURE__ */ jsx(Tbody, { children: rows.map((row) => /* @__PURE__ */ jsx(Row, { onClick: () => navigate(row.original.link), children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(React__default.Fragment, { children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id)) }, row.id)) })
  ] }) });
}
const WorkflowTableSkeleton = () => /* @__PURE__ */ jsxs(Table, { children: [
  /* @__PURE__ */ jsxs(Thead, { children: [
    /* @__PURE__ */ jsx(Th, { children: "Name" }),
    /* @__PURE__ */ jsx(Th, { width: 300, children: "Steps" })
  ] }),
  /* @__PURE__ */ jsx(Tbody, { children: Array.from({ length: 3 }).map((_, index) => /* @__PURE__ */ jsxs(Row, { children: [
    /* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }) }),
    /* @__PURE__ */ jsx(Cell, { width: 300, children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }) })
  ] }, index)) })
] });
const EmptyWorkflowsTable = () => /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center", children: /* @__PURE__ */ jsx(
  EmptyState,
  {
    iconSlot: /* @__PURE__ */ jsx(WorkflowCoinIcon, {}),
    titleSlot: "Configure Workflows",
    descriptionSlot: "Mastra workflows are not configured yet. You can find more information in the documentation.",
    actionSlot: /* @__PURE__ */ jsxs(
      Button,
      {
        size: "lg",
        className: "w-full",
        variant: "light",
        as: "a",
        href: "https://mastra.ai/en/docs/workflows/overview",
        target: "_blank",
        children: [
          /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(WorkflowIcon, {}) }),
          "Docs"
        ]
      }
    )
  }
) });

const TraceContext = createContext({});
function TraceProvider({
  children,
  initialTraces: traces = []
}) {
  const [open, setOpen] = useState(false);
  const [trace, setTrace] = useState(null);
  const [currentTraceIndex, setCurrentTraceIndex] = useState(0);
  const [span, setSpan] = useState(null);
  const nextTrace = () => {
    if (currentTraceIndex < traces.length - 1) {
      const nextIndex = currentTraceIndex + 1;
      setCurrentTraceIndex(nextIndex);
      const nextTrace2 = traces[nextIndex].trace;
      setTrace(nextTrace2);
      const parentSpan = nextTrace2.find((span2) => span2.parentSpanId === null) || nextTrace2[0];
      setSpan(parentSpan);
    }
  };
  const prevTrace = () => {
    if (currentTraceIndex > 0) {
      const prevIndex = currentTraceIndex - 1;
      setCurrentTraceIndex(prevIndex);
      const prevTrace2 = traces[prevIndex].trace;
      setTrace(prevTrace2);
      const parentSpan = prevTrace2.find((span2) => span2.parentSpanId === null) || prevTrace2[0];
      setSpan(parentSpan);
    }
  };
  const clearData = () => {
    setOpen(false);
    setTrace(null);
    setSpan(null);
  };
  return /* @__PURE__ */ jsx(
    TraceContext.Provider,
    {
      value: {
        isOpen: open,
        setIsOpen: setOpen,
        trace,
        setTrace,
        traces,
        currentTraceIndex,
        setCurrentTraceIndex,
        nextTrace,
        prevTrace,
        span,
        setSpan,
        clearData
      },
      children
    }
  );
}

const useOpenTrace = () => {
  const {
    setTrace,
    isOpen: open,
    setIsOpen: setOpen,
    trace: currentTrace,
    setSpan,
    setCurrentTraceIndex
  } = useContext(TraceContext);
  const openTrace = (trace, traceIndex) => {
    setTrace(trace);
    const parentSpan = trace.find((span) => span.parentSpanId === null) || trace[0];
    setSpan(parentSpan);
    setCurrentTraceIndex(traceIndex);
    if (open && currentTrace?.[0]?.id !== trace[0].id) return;
    setOpen((prev) => !prev);
  };
  return { openTrace };
};

const TracesTableEmpty = ({ colsCount }) => {
  return /* @__PURE__ */ jsx(Tbody, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Cell, { colSpan: colsCount, className: "text-center py-4", children: /* @__PURE__ */ jsx(Txt, { children: "No traces found" }) }) }) });
};
const TracesTableError = ({ error, colsCount }) => {
  return /* @__PURE__ */ jsx(Tbody, { children: /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Cell, { colSpan: colsCount, className: "text-center py-4", children: /* @__PURE__ */ jsx(Txt, { children: error.message }) }) }) });
};
const TraceRow = ({ trace, index, isActive }) => {
  const { openTrace } = useOpenTrace();
  const hasFailure = trace.trace.some((span) => span.status.code === 2);
  return /* @__PURE__ */ jsxs(Row, { className: isActive ? "bg-surface4" : "", onClick: () => openTrace(trace.trace, index), children: [
    /* @__PURE__ */ jsx(DateTimeCell, { dateTime: new Date(trace.started / 1e3) }),
    /* @__PURE__ */ jsxs(TxtCell, { title: trace.traceId, children: [
      trace.traceId.substring(0, 7),
      "..."
    ] }),
    /* @__PURE__ */ jsx(UnitCell, { unit: "ms", children: toSigFigs(trace.duration / 1e3, 3) }),
    /* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx("button", { onClick: () => openTrace(trace.trace, index), children: /* @__PURE__ */ jsx(Badge$1, { icon: /* @__PURE__ */ jsx(TraceIcon, {}), children: trace.trace.length }) }) }),
    /* @__PURE__ */ jsx(Cell, { children: hasFailure ? /* @__PURE__ */ jsx(Badge$1, { variant: "error", icon: /* @__PURE__ */ jsx(X, {}), children: "Failed" }) : /* @__PURE__ */ jsx(Badge$1, { icon: /* @__PURE__ */ jsx(Check, {}), variant: "success", children: "Success" }) })
  ] });
};
const TracesTable = ({ traces, error }) => {
  const hasNoTraces = !traces || traces.length === 0;
  const { currentTraceIndex } = useContext(TraceContext);
  const colsCount = 4;
  return /* @__PURE__ */ jsxs(Table, { size: "small", children: [
    /* @__PURE__ */ jsxs(Thead, { children: [
      /* @__PURE__ */ jsx(Th, { width: 120, children: "Time" }),
      /* @__PURE__ */ jsx(Th, { width: "auto", children: "Trace Id" }),
      /* @__PURE__ */ jsx(Th, { width: 120, children: "Duration" }),
      /* @__PURE__ */ jsx(Th, { width: 120, children: "Spans" }),
      /* @__PURE__ */ jsx(Th, { width: 120, children: "Status" })
    ] }),
    error ? /* @__PURE__ */ jsx(TracesTableError, { error, colsCount }) : hasNoTraces ? /* @__PURE__ */ jsx(TracesTableEmpty, { colsCount }) : /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Tbody, { children: traces.map((trace, index) => /* @__PURE__ */ jsx(
      TraceRow,
      {
        trace,
        index,
        isActive: index === currentTraceIndex
      },
      trace.traceId + index
    )) }) })
  ] });
};

const useResizeColumn = ({
  defaultWidth,
  minimumWidth,
  maximumWidth,
  setCurrentWidth
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(defaultWidth);
  const containerRef = useRef(null);
  const dragStartXRef = useRef(0);
  const initialWidthRef = useRef(0);
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    initialWidthRef.current = sidebarWidth;
  };
  useEffect(() => {
    setSidebarWidth(defaultWidth);
    setCurrentWidth?.(defaultWidth);
  }, [defaultWidth]);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || !containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const deltaX = dragStartXRef.current - e.clientX;
      const deltaPercentage = deltaX / containerWidth * 100;
      const newWidth = Math.min(Math.max(initialWidthRef.current + deltaPercentage, minimumWidth), maximumWidth);
      setSidebarWidth(newWidth);
      setCurrentWidth?.(newWidth);
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  return { sidebarWidth, isDragging, handleMouseDown, containerRef };
};

const MastraResizablePanel = ({
  children,
  defaultWidth,
  minimumWidth,
  maximumWidth,
  className,
  disabled = false,
  setCurrentWidth,
  dividerPosition = "left"
}) => {
  const { sidebarWidth, isDragging, handleMouseDown, containerRef } = useResizeColumn({
    defaultWidth: disabled ? 100 : defaultWidth,
    minimumWidth,
    maximumWidth,
    setCurrentWidth
  });
  return /* @__PURE__ */ jsxs("div", { className: cn("w-full h-full relative", className), ref: containerRef, style: { width: `${sidebarWidth}%` }, children: [
    !disabled && dividerPosition === "left" ? /* @__PURE__ */ jsx(
      "div",
      {
        className: `w-px bg-border1 h-full cursor-col-resize hover:w-1.5 hover:bg-mastra-border-2 hover:bg-[#424242] active:bg-mastra-border-3 active:bg-[#3e3e3e] transition-colors absolute inset-y-0 z-10
          ${isDragging ? "bg-border2 w-1.5 cursor- col-resize" : ""}`,
        onMouseDown: handleMouseDown
      }
    ) : null,
    children,
    !disabled && dividerPosition === "right" ? /* @__PURE__ */ jsx(
      "div",
      {
        className: `w-px bg-border1 h-full cursor-col-resize hover:w-1.5 hover:bg-border2 active:bg-border3 transition-colors absolute inset-y-0 z-10
          ${isDragging ? "bg-border2 w-1.5 cursor- col-resize" : ""}`,
        onMouseDown: handleMouseDown
      }
    ) : null
  ] });
};

const TraceTree = ({ children }) => {
  return /* @__PURE__ */ jsx("ol", { children });
};

const variantClasses = {
  agent: "bg-accent1"
};
const Time = ({ durationMs, tokenCount, variant, progressPercent, offsetPercent }) => {
  const variantClass = variant ? variantClasses[variant] : "bg-accent3";
  const percent = Math.min(100, progressPercent);
  return /* @__PURE__ */ jsxs("div", { className: "w-[80px] xl:w-[166px] shrink-0", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-surface4 relative h-[6px] w-full rounded-full p-px overflow-hidden", children: /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx("absolute h-1 rounded-full", variantClass),
        style: { width: `${percent}%`, left: `${offsetPercent}%` }
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 pt-0.5", children: [
      /* @__PURE__ */ jsxs(Txt, { variant: "ui-sm", className: "text-icon2 font-medium", children: [
        toSigFigs(durationMs, 3),
        "ms"
      ] }),
      tokenCount && /* @__PURE__ */ jsxs(Txt, { variant: "ui-sm", className: "text-icon2 font-medium", children: [
        tokenCount,
        "t"
      ] })
    ] })
  ] });
};

const spanIconMap = {
  tool: ToolsIcon,
  agent: AgentIcon,
  workflow: WorkflowIcon,
  memory: MemoryIcon,
  rag: TraceIcon,
  storage: DbIcon,
  eval: ScoreIcon,
  other: TraceIcon
};
const spanVariantClasses = {
  tool: "text-[#ECB047]",
  agent: "text-accent1",
  workflow: "text-accent3",
  memory: "text-accent2",
  rag: "text-accent2",
  storage: "text-accent2",
  eval: "text-accent4",
  other: "text-icon6"
};
const Span = ({
  children,
  durationMs,
  variant,
  tokenCount,
  spans,
  isRoot,
  onClick,
  isActive,
  offsetMs,
  totalDurationMs
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const VariantIcon = spanIconMap[variant];
  const variantClass = spanVariantClasses[variant];
  const progressPercent = durationMs / totalDurationMs * 100;
  const offsetPercent = offsetMs / totalDurationMs * 100;
  const TextEl = onClick ? "button" : "div";
  return /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsxs("div", { className: clsx("flex justify-between items-center gap-2 rounded-md pl-2", isActive && "bg-surface4"), children: [
      /* @__PURE__ */ jsxs("div", { className: "flex h-8 items-center gap-1 min-w-0", children: [
        spans ? /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": isExpanded ? "Collapse span" : "Expand span",
            "aria-expanded": isExpanded,
            className: "text-icon3 flex h-4 w-4",
            onClick: () => setIsExpanded(!isExpanded),
            children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(ChevronIcon, { className: clsx("transition-transform -rotate-90", { "rotate-0": isExpanded }) }) })
          }
        ) : /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "h-full w-4", children: !isRoot && /* @__PURE__ */ jsx("div", { className: "ml-[7px] h-full w-px rounded-full" }) }),
        /* @__PURE__ */ jsxs(TextEl, { className: "flex items-center gap-2 min-w-0", onClick, children: [
          /* @__PURE__ */ jsx("div", { className: clsx("bg-surface4 flex items-center justify-center rounded-md p-[3px]", variantClass), children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(VariantIcon, {}) }) }),
          /* @__PURE__ */ jsx(Txt, { variant: "ui-md", className: "text-icon6 truncate", children })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Time,
        {
          durationMs,
          tokenCount,
          variant: variant === "agent" ? "agent" : void 0,
          progressPercent,
          offsetPercent
        }
      )
    ] }),
    isExpanded && spans && /* @__PURE__ */ jsx("div", { className: "ml-4", children: spans })
  ] });
};

const Spans = ({ children }) => {
  return /* @__PURE__ */ jsx("ol", { children });
};

const Trace = ({
  name,
  spans,
  durationMs,
  tokenCount,
  onClick,
  variant,
  isActive,
  totalDurationMs
}) => {
  return /* @__PURE__ */ jsx(
    Span,
    {
      isRoot: true,
      durationMs,
      variant,
      spans: /* @__PURE__ */ jsx(Spans, { children: spans }),
      onClick,
      isActive,
      offsetMs: 0,
      totalDurationMs,
      children: name
    }
  );
};

const getSpanVariant = (span) => {
  const attributes = Object.keys(span.attributes || {}).map((k) => k.toLowerCase());
  const lowerCaseName = span.name.toLowerCase();
  const isAiSpan = lowerCaseName.startsWith("ai.");
  if (isAiSpan) {
    const isAiAboutTool = lowerCaseName.includes("tool");
    if (isAiAboutTool) return "tool";
    return "other";
  }
  const hasMemoryRelatedAttributes = attributes.some((key) => key.includes("memory") || key.includes("storage"));
  if (hasMemoryRelatedAttributes) return "memory";
  const hasToolRelatedAttributes = attributes.some((key) => key.includes("tool"));
  if (hasToolRelatedAttributes) return "tool";
  const hasAgentRelatedAttributes = attributes.some((key) => key.includes("agent."));
  if (hasAgentRelatedAttributes) return "agent";
  if (lowerCaseName.includes(".insert")) {
    const evalRelatedAttribute = attributes.find((key) => String(span.attributes?.[key])?.includes("mastra_evals"));
    if (evalRelatedAttribute) return "eval";
  }
  return "other";
};

function buildTree(spans, minStartTime, totalDurationMs, parentSpanId = null) {
  return spans.filter((span) => span.parentSpanId === parentSpanId).map((span) => {
    return {
      ...span,
      children: buildTree(spans, minStartTime, totalDurationMs, span.id),
      offset: (span.startTime - minStartTime) / 1e3,
      // ns to ms
      duration: span.duration / 1e3,
      totalDurationMs
    };
  });
}
const createSpanTree = (spans) => {
  if (spans.length === 0) return [];
  let minStartTime;
  let maxEndTime;
  const orderedTree = [];
  const listSize = spans.length;
  for (let i = listSize - 1; i >= 0; i--) {
    const span = spans[i];
    if (!minStartTime || span.startTime < minStartTime) {
      minStartTime = span.startTime;
    }
    if (!maxEndTime || span.endTime > maxEndTime) {
      maxEndTime = span.endTime;
    }
    if (span.name !== ".insert" && span.name !== "mastra.getStorage") {
      orderedTree.push(span);
    }
  }
  if (!minStartTime || !maxEndTime) return [];
  const totalDurationMs = (maxEndTime - minStartTime) / 1e3;
  return buildTree(orderedTree, minStartTime, totalDurationMs);
};

const NestedSpans = ({ spanNodes }) => {
  const { span: activeSpan, setSpan } = useContext(TraceContext);
  return /* @__PURE__ */ jsx(Spans, { children: spanNodes.map((spanNode) => {
    const isActive = spanNode.id === activeSpan?.id;
    return /* @__PURE__ */ jsx(
      Span,
      {
        spans: spanNode.children.length > 0 && /* @__PURE__ */ jsx(NestedSpans, { spanNodes: spanNode.children }),
        durationMs: spanNode.duration,
        offsetMs: spanNode.offset,
        variant: getSpanVariant(spanNode),
        isActive,
        onClick: () => setSpan(spanNode),
        totalDurationMs: spanNode.totalDurationMs,
        children: spanNode.name
      },
      spanNode.id
    );
  }) });
};
function SpanView({ trace }) {
  const { span: activeSpan, setSpan } = useContext(TraceContext);
  const tree = createSpanTree(trace);
  return /* @__PURE__ */ jsx(TraceTree, { children: tree.map((node) => /* @__PURE__ */ jsx(
    Trace,
    {
      name: node.name,
      durationMs: node.duration,
      totalDurationMs: node.totalDurationMs,
      spans: /* @__PURE__ */ jsx(NestedSpans, { spanNodes: node.children }),
      variant: getSpanVariant(node),
      isActive: node.id === activeSpan?.id,
      onClick: () => setSpan(node)
    }
  )) });
}

const Header = ({ children, border = true }) => {
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: clsx("h-header-default z-50 flex w-full items-center gap-[18px] bg-transparent px-5", {
        "border-b-sm border-border1": border
      }),
      children
    }
  );
};
const HeaderTitle = ({ children }) => {
  return /* @__PURE__ */ jsx(Txt, { as: "h1", variant: "ui-lg", className: "font-medium text-white", children });
};
const HeaderAction = ({ children }) => {
  return /* @__PURE__ */ jsx("div", { className: "ml-auto", children });
};
const HeaderGroup = ({ children }) => {
  return /* @__PURE__ */ jsx("div", { className: "gap-lg flex items-center", children });
};

function TraceDetails() {
  const { trace, currentTraceIndex, prevTrace, nextTrace, traces } = useContext(TraceContext);
  const actualTrace = traces[currentTraceIndex];
  if (!actualTrace || !trace) return null;
  const hasFailure = trace.some((span) => span.status.code === 2);
  return /* @__PURE__ */ jsxs("aside", { children: [
    /* @__PURE__ */ jsxs(Header, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Button, { className: "bg-transparent border-none", onClick: prevTrace, disabled: currentTraceIndex === 0, children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(ChevronUp, {}) }) }),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "bg-transparent border-none",
            onClick: nextTrace,
            disabled: currentTraceIndex === traces.length - 1,
            children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(ChevronDown, {}) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 justify-between w-full", children: [
        /* @__PURE__ */ jsxs(Txt, { variant: "ui-lg", className: "font-medium text-icon5 shrink-0", children: [
          "Trace ",
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-icon3", children: actualTrace.traceId.substring(0, 7) })
        ] }),
        hasFailure && /* @__PURE__ */ jsx(Badge$1, { variant: "error", icon: /* @__PURE__ */ jsx(X, {}), children: "Failed" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "p-5", children: /* @__PURE__ */ jsx(SpanView, { trace }) })
  ] });
}

function formatDuration(duration, fixedPoint = 2) {
  const durationInSecs = duration / 1e3;
  return durationInSecs.toFixed(fixedPoint);
}
function formatOtelTimestamp(otelTimestamp) {
  const date = new Date(otelTimestamp / 1e3);
  return new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  }).format(date);
}
function formatOtelTimestamp2(otelTimestamp) {
  const date = new Date(otelTimestamp / 1e6);
  return new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  }).format(date);
}
function transformKey(key) {
  if (key.includes(".argument.")) {
    return `Input`;
  }
  if (key.includes(".result")) {
    return "Output";
  }
  const newKey = key.split(".").join(" ").split("_").join(" ").replaceAll("ai", "AI");
  return newKey.substring(0, 1).toUpperCase() + newKey.substring(1);
}
function cleanString(string) {
  return string.replace(/\\n/g, "").replace(/\n/g, "").replace(/\s+/g, " ").trim();
}
const allowedAiSpanAttributes = [
  "operation.name",
  "ai.operationId",
  "ai.model.provider",
  "ai.model.id",
  "ai.prompt.format",
  "ai.prompt.messages",
  "ai.prompt.tools",
  "ai.prompt.toolChoice",
  "ai.settings.toolChoice",
  "ai.schema",
  "ai.settings.output",
  "ai.response.object",
  "ai.response.text",
  "ai.response.timestamp",
  "componentName",
  "ai.usage.promptTokens",
  "ai.usage.completionTokens"
];

function SpanDetail() {
  const { span, setSpan, trace, setIsOpen } = useContext(TraceContext);
  if (!span || !trace) return null;
  const prevSpan = () => {
    const currentIndex = trace.findIndex((t) => t.id === span.id);
    if (currentIndex !== -1 && currentIndex < trace.length - 1) {
      setSpan(trace[currentIndex + 1]);
    }
  };
  const nextSpan = () => {
    const currentIndex = trace.findIndex((t) => t.id === span.id);
    if (currentIndex !== -1 && currentIndex > 0) {
      setSpan(trace[currentIndex - 1]);
    }
  };
  const SpanIcon = spanIconMap[getSpanVariant(span)];
  const variantClass = spanVariantClasses[getSpanVariant(span)];
  return /* @__PURE__ */ jsxs("aside", { children: [
    /* @__PURE__ */ jsxs(Header, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Button, { className: "bg-transparent border-none", onClick: prevSpan, children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(ChevronUp, {}) }) }),
        /* @__PURE__ */ jsx(Button, { className: "bg-transparent border-none", onClick: nextSpan, children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(ChevronDown, {}) }) })
      ] }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(Txt, { variant: "ui-lg", className: "font-medium text-icon5", as: "h2", children: [
        "Span ",
        /* @__PURE__ */ jsx("span", { className: "ml-2 text-icon3", children: span.id.substring(0, 7) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "ml-auto flex items-center gap-2", children: /* @__PURE__ */ jsx(Button, { className: "bg-transparent border-none", onClick: () => setIsOpen(false), children: /* @__PURE__ */ jsx(Icon, { children: /* @__PURE__ */ jsx(X, {}) }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-5", children: [
      /* @__PURE__ */ jsxs(Txt, { variant: "header-md", as: "h3", className: "text-icon-6 flex items-center gap-4 pb-3", children: [
        /* @__PURE__ */ jsx(Icon, { size: "lg", className: "bg-surface4 p-1 rounded-md", children: /* @__PURE__ */ jsx(SpanIcon, { className: variantClass }) }),
        span.name
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-row gap-2 items-center", children: span.status.code === 2 ? /* @__PURE__ */ jsxs(Badge$1, { variant: "error", icon: /* @__PURE__ */ jsx(X, {}), children: [
        "Failed in ",
        toSigFigs(span.duration, 3),
        "ms"
      ] }) : /* @__PURE__ */ jsxs(Badge$1, { icon: /* @__PURE__ */ jsx(LatencyIcon, {}), variant: "success", children: [
        toSigFigs(span.duration, 3),
        "ms"
      ] }) }),
      /* @__PURE__ */ jsx("hr", { className: "border-border1 border-sm my-5" }),
      /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-2 justify-between gap-2", children: [
        /* @__PURE__ */ jsx("dt", { className: "font-medium text-ui-md text-icon3", children: "ID" }),
        /* @__PURE__ */ jsx("dd", { className: "text-ui-md text-icon6", children: span.id }),
        /* @__PURE__ */ jsx("dt", { className: "font-medium text-ui-md text-icon3", children: "Created at" }),
        /* @__PURE__ */ jsx("dd", { className: "text-ui-md text-icon6", children: span.startTime ? formatOtelTimestamp(span.startTime) : "" })
      ] }),
      span.attributes && /* @__PURE__ */ jsx(Attributes, { attributes: span.attributes }),
      span.events?.length > 0 && /* @__PURE__ */ jsx(Events, { span })
    ] })
  ] });
}
function Attributes({ attributes }) {
  if (!attributes) return null;
  const entries = Object.entries(attributes);
  if (entries.length === 0) return null;
  const keysToHide = ["http.request_id", "componentName"];
  return /* @__PURE__ */ jsx("div", { children: entries.filter(([key]) => !keysToHide.includes(key)).map(([key, val]) => {
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("hr", { className: "border-border1 border-sm my-5" }),
      /* @__PURE__ */ jsx(Txt, { as: "h4", variant: "ui-md", className: "text-icon3 pb-2", children: transformKey(key) }),
      /* @__PURE__ */ jsx(AttributeValue, { value: val })
    ] }, key);
  }) });
}
const AttributeValue = ({ value }) => {
  if (!value)
    return /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-md", className: "text-icon6", children: "N/A" });
  if (typeof value === "number" || typeof value === "boolean") {
    return /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-md", className: "text-icon6", children: String(value) });
  }
  if (typeof value === "object") {
    return /* @__PURE__ */ jsx(SyntaxHighlighter$1, { data: value });
  }
  try {
    return /* @__PURE__ */ jsx(SyntaxHighlighter$1, { data: JSON.parse(value) });
  } catch {
    return /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-md", className: "text-icon6", children: String(value) });
  }
};
function Events({ span }) {
  if (!span.events) return null;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("hr", { className: "border-border1 border-sm my-5" }),
    /* @__PURE__ */ jsx(Txt, { as: "p", variant: "ui-md", className: "text-icon6 pb-2", children: "Events" }),
    span.events.map((event) => {
      const isLast = event === span.events[span.events.length - 1];
      return /* @__PURE__ */ jsxs(React__default.Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-2 justify-between gap-2 pb-2", children: [
            /* @__PURE__ */ jsx("dt", { className: "font-medium text-ui-md text-icon3", children: "Name" }),
            /* @__PURE__ */ jsx("dd", { className: "text-ui-md text-icon6", children: event.name }),
            /* @__PURE__ */ jsx("dt", { className: "font-medium text-ui-md text-icon3", children: "Time" }),
            /* @__PURE__ */ jsx("dd", { className: "text-ui-md text-icon6", children: event.timeUnixNano ? formatOtelTimestamp2(Number(event.timeUnixNano)) : "N/A" })
          ] }),
          event.attributes?.length > 0 ? /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: event.attributes.filter((attribute) => attribute !== null).map((attribute) => /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsx(Txt, { as: "h4", variant: "ui-md", className: "text-icon3 pb-2", children: transformKey(attribute.key) }),
            /* @__PURE__ */ jsx(AttributeValue, { value: attribute.value })
          ] }, attribute.key)) }) : null
        ] }, event.name),
        !isLast && /* @__PURE__ */ jsx("hr", { className: "border-border1 border-sm my-5" })
      ] }, event.name);
    })
  ] });
}

const TracesSidebar = ({ onResize }) => {
  return /* @__PURE__ */ jsx(
    MastraResizablePanel,
    {
      className: "h-full absolute right-0 inset-y-0 bg-surface2",
      defaultWidth: 80,
      minimumWidth: 50,
      maximumWidth: 80,
      setCurrentWidth: onResize,
      children: /* @__PURE__ */ jsxs("div", { className: "h-full grid grid-cols-2", children: [
        /* @__PURE__ */ jsx("div", { className: "overflow-x-scroll w-full h-[calc(100%-40px)]", children: /* @__PURE__ */ jsx(TraceDetails, {}) }),
        /* @__PURE__ */ jsx("div", { className: "h-[calc(100%-40px)] overflow-x-scroll w-full border-l border-border1", children: /* @__PURE__ */ jsx(SpanDetail, {}) })
      ] })
    }
  );
};

function TracesView({
  isLoading,
  error,
  traces,
  runId,
  stepName,
  className,
  setEndOfListElement
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsx(TracesViewSkeleton, {});
  }
  return /* @__PURE__ */ jsx(TraceProvider, { initialTraces: traces || [], children: /* @__PURE__ */ jsx(
    TracesViewInner,
    {
      traces,
      error,
      runId,
      stepName,
      className,
      setEndOfListElement
    }
  ) });
}
function TracesViewInner({ traces, error, runId, stepName, className, setEndOfListElement }) {
  const hasRunRef = useRef(false);
  const [sidebarWidth, setSidebarWidth] = useState(100);
  const { isOpen: open, setTrace, setIsOpen, setSpan } = useContext(TraceContext);
  useEffect(() => {
    if (hasRunRef.current) return;
    if (!runId || !stepName) return;
    const matchingTrace = traces.find((trace) => trace.runId === runId);
    if (!matchingTrace) return;
    const matchingSpan = matchingTrace.trace.find((span) => span.name.includes(stepName));
    if (!matchingSpan) return;
    setTrace(matchingTrace.trace);
    setSpan(matchingSpan);
    setIsOpen(true);
    hasRunRef.current = true;
  }, [runId, traces, setTrace]);
  return /* @__PURE__ */ jsxs("div", { className: clsx("h-full relative overflow-hidden flex", className), children: [
    /* @__PURE__ */ jsxs("div", { className: "h-full overflow-y-scroll w-full", children: [
      /* @__PURE__ */ jsx(TracesTable, { traces, error }),
      /* @__PURE__ */ jsx("div", { "aria-hidden": true, ref: setEndOfListElement })
    ] }),
    open && /* @__PURE__ */ jsx(TracesSidebar, { width: sidebarWidth, onResize: setSidebarWidth })
  ] });
}
const TracesViewSkeleton = () => {
  return /* @__PURE__ */ jsx("div", { className: "h-full relative overflow-hidden flex", children: /* @__PURE__ */ jsx("div", { className: "h-full overflow-y-scroll w-full", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-10" }) }) });
};

const DataTable = ({
  columns,
  data,
  pagination,
  gotoNextPage,
  gotoPreviousPage,
  getRowId,
  selectedRowId,
  isLoading,
  emptyText,
  onClick
}) => {
  const [sorting, setSorting] = useState([]);
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: pagination ? Math.floor(pagination.offset / pagination.limit) : 0,
    pageSize: pagination?.limit ?? 10
  });
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pagination ? Math.ceil(pagination.total / pagination.limit) : -1,
    state: {
      sorting,
      pagination: {
        pageIndex,
        pageSize
      },
      rowSelection
    },
    getRowId,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection
  });
  const emptyNode = /* @__PURE__ */ jsx(Row, { children: /* @__PURE__ */ jsx(Cell, { colSpan: columns.length, children: /* @__PURE__ */ jsxs("div", { className: "py-12 text-center w-full", children: [
    "No ",
    emptyText || "results"
  ] }) }) });
  const ths = table.getHeaderGroups()[0];
  const rows = table.getRowModel().rows;
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(Thead, { className: "sticky top-0 bg-surface2", children: ths.headers.map((header) => {
        const size = header.column.getSize();
        const meta = header.column.columnDef.meta;
        return /* @__PURE__ */ jsx(Th, { style: { width: meta?.width || size || "auto" }, children: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext()) }, header.id);
      }) }),
      /* @__PURE__ */ jsx(Tbody, { children: isLoading ? /* @__PURE__ */ jsx(Fragment, { children: Array.from({ length: 3 }).map((_, rowIndex) => /* @__PURE__ */ jsx(Row, { onClick: () => {
      }, children: Array.from({ length: columns.length }).map((_2, cellIndex) => /* @__PURE__ */ jsx(Cell, { children: /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-1/2" }) }, `row-${rowIndex}-cell-${cellIndex}`)) }, rowIndex)) }) : rows?.length > 0 ? rows.map((row) => /* @__PURE__ */ jsx(
        Row,
        {
          "data-state": (row.getIsSelected() || row.id === selectedRowId) && "selected",
          onClick: () => onClick?.(row.original),
          children: row.getVisibleCells().map((cell) => flexRender(cell.column.columnDef.cell, cell.getContext()))
        },
        row.id
      )) : emptyNode })
    ] }),
    pagination && /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between px-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-muted-foreground text-sm", children: [
        "Showing ",
        pagination.offset + 1,
        " to ",
        Math.min(pagination.offset + data.length, pagination.total),
        " of",
        " ",
        pagination.total,
        " results"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-6 lg:space-x-8", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsx(Button$1, { variant: "outline", size: "sm", onClick: gotoPreviousPage, disabled: !pagination.offset, children: "Previous" }),
        /* @__PURE__ */ jsx(Button$1, { variant: "outline", size: "sm", onClick: gotoNextPage, disabled: !pagination.hasMore, children: "Next" })
      ] }) })
    ] })
  ] });
};

function MainContentLayout({
  children,
  className,
  style
}) {
  const devStyleRequested = devUIStyleRequested("MainContentLayout");
  return /* @__PURE__ */ jsx(
    "main",
    {
      className: cn(`grid grid-rows-[auto_1fr] h-full items-start content-start`, className),
      style: { ...style, ...devStyleRequested ? { border: "3px dotted red" } : {} },
      children
    }
  );
}
function MainContentContent({
  children,
  className,
  isCentered = false,
  isDivided = false,
  hasLeftServiceColumn = false,
  style
}) {
  const devStyleRequested = devUIStyleRequested("MainContentContent");
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        `grid overflow-y-auto h-full `,
        `overflow-x-auto min-w-[min-content]`,
        {
          "items-start content-start": !isCentered && !isDivided && !hasLeftServiceColumn,
          "grid place-items-center": isCentered,
          "grid-cols-[1fr_1fr]": isDivided && !hasLeftServiceColumn,
          "grid-cols-[auto_1fr_1fr]": isDivided && hasLeftServiceColumn,
          "grid-cols-[auto_1fr]": !isDivided && hasLeftServiceColumn
        },
        className
      ),
      style: { ...style, ...devStyleRequested ? { border: "3px dotted orange" } : {} },
      children
    }
  );
}
function devUIStyleRequested(name) {
  try {
    const raw = localStorage.getItem("add-dev-style-to-components");
    if (!raw) return false;
    const components = raw.split(",").map((c) => c.trim()).filter(Boolean);
    return components.includes(name);
  } catch (error) {
    console.error("Error reading or parsing localStorage:", error);
    return false;
  }
}

const Breadcrumb = ({ children, label }) => {
  return /* @__PURE__ */ jsx("nav", { "aria-label": label, children: /* @__PURE__ */ jsx("ol", { className: "gap-sm flex items-center", children }) });
};
const Crumb = ({ className, as, isCurrent, ...props }) => {
  const Root = as || "span";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("li", { className: "flex h-full items-center", children: /* @__PURE__ */ jsx(
      Root,
      {
        "aria-current": isCurrent ? "page" : void 0,
        className: clsx("text-ui-lg leading-ui-lg font-medium", isCurrent ? "text-white" : "text-icon3", className),
        ...props
      }
    ) }),
    !isCurrent && /* @__PURE__ */ jsx("li", { role: "separator", className: "flex h-full items-center", children: /* @__PURE__ */ jsx(Icon, { className: "text-icon3", children: /* @__PURE__ */ jsx(SlashIcon, {}) }) })
  ] });
};

const DarkLogo = (props) => /* @__PURE__ */ jsxs("svg", { width: "100", height: "100", viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props, children: [
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M49.9996 13.1627C29.6549 13.1627 13.1622 29.6553 13.1622 50.0001C13.1622 70.3449 29.6549 86.8375 49.9996 86.8375C70.3444 86.8375 86.8371 70.3449 86.8371 50.0001C86.8371 29.6553 70.3444 13.1627 49.9996 13.1627ZM10 50.0001C10 27.9089 27.9084 10.0005 49.9996 10.0005C72.0908 10.0005 89.9992 27.9089 89.9992 50.0001C89.9992 72.0913 72.0908 89.9997 49.9996 89.9997C27.9084 89.9997 10 72.0913 10 50.0001Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M43.3709 19.4582C35.493 17.9055 28.4985 19.4076 23.954 23.9521C19.4094 28.4967 17.9073 35.4911 19.46 43.3691C21.0103 51.235 25.5889 59.7924 32.8993 67.1028C40.2097 74.4132 48.7671 78.9918 56.633 80.5421C64.511 82.0948 71.5054 80.5927 76.05 76.0481C80.5945 71.5036 82.0966 64.5091 80.5439 56.6312C78.9936 48.7653 74.415 40.2079 67.1046 32.8975C59.7942 25.5871 51.2368 21.0085 43.3709 19.4582ZM43.9824 16.3557C52.5432 18.043 61.6476 22.9685 69.3406 30.6615C77.0336 38.3545 81.9591 47.4589 83.6464 56.0197C85.3313 64.5685 83.8044 72.7657 78.286 78.2841C72.7675 83.8026 64.5704 85.3295 56.0216 83.6446C47.4607 81.9573 38.3563 77.0317 30.6633 69.3388C22.9704 61.6458 18.0448 52.5414 16.3575 43.9805C14.6726 35.4317 16.1995 27.2346 21.718 21.7161C27.2364 16.1977 35.4336 14.6708 43.9824 16.3557Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M65.8864 51.719H34.314V48.5568H65.8864V51.719Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M59.2351 43.2352L43.194 59.2763L40.958 57.0403L56.9991 40.9992L59.2351 43.2352Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M43.1969 40.9992L59.2379 57.0403L57.002 59.2763L40.9609 43.2352L43.1969 40.9992Z",
      fill: "currentColor"
    }
  ),
  /* @__PURE__ */ jsx(
    "path",
    {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M23.7151 33.0924C17.0466 37.565 13.1629 43.573 13.1629 49.9999C13.1629 56.4269 17.0466 62.4349 23.7151 66.9075C30.3734 71.3733 39.662 74.1867 50.0004 74.1867C60.3388 74.1867 69.6274 71.3733 76.2857 66.9075C82.9541 62.4349 86.8378 56.4269 86.8378 49.9999C86.8378 43.573 82.9541 37.565 76.2857 33.0924C69.6274 28.6266 60.3388 25.8132 50.0004 25.8132C39.662 25.8132 30.3734 28.6266 23.7151 33.0924ZM21.9537 30.4662C29.2002 25.6059 39.1209 22.651 50.0004 22.651C60.8799 22.651 70.8006 25.6059 78.0471 30.4662C85.2834 35.3197 90 42.1957 90 49.9999C90 57.8042 85.2834 64.6802 78.0471 69.5337C70.8006 74.394 60.8799 77.3489 50.0004 77.3489C39.1209 77.3489 29.2002 74.394 21.9537 69.5337C14.7174 64.6802 10.0008 57.8042 10.0008 49.9999C10.0008 42.1957 14.7174 35.3197 21.9537 30.4662Z",
      fill: "currentColor"
    }
  )
] });

function usePolling({
  fetchFn,
  interval = 3e3,
  enabled = false,
  onSuccess,
  onError,
  shouldContinue = () => true,
  restartPolling = false
}) {
  const [isPolling, setIsPolling] = useState(enabled);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [firstCallLoading, setFirstCallLoading] = useState(false);
  const timeoutRef = useRef(null);
  const mountedRef = useRef(true);
  const [restart, setRestart] = useState(restartPolling);
  const cleanup = useCallback(() => {
    console.log("cleanup");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);
  const stopPolling = useCallback(() => {
    console.log("stopPolling");
    setIsPolling(false);
    cleanup();
  }, [cleanup]);
  const startPolling = useCallback(() => {
    console.log("startPolling");
    setIsPolling(true);
    setError(null);
  }, []);
  const executePoll = useCallback(
    async (refetch2 = true) => {
      if (!mountedRef.current) return;
      setIsLoading(true);
      try {
        const result = await fetchFn();
        setData(result);
        setError(null);
        onSuccess?.(result);
        if (shouldContinue(result) && refetch2) {
          timeoutRef.current = setTimeout(executePoll, interval);
        } else {
          stopPolling();
        }
      } catch (err) {
        if (!mountedRef.current) return;
        setError(err);
        onError?.(err);
        stopPolling();
      } finally {
        if (mountedRef.current) {
          setFirstCallLoading(false);
          setIsLoading(false);
        }
      }
    },
    [fetchFn, interval, onSuccess, onError, shouldContinue, stopPolling]
  );
  const refetch = useCallback(
    (withPolling = false) => {
      console.log("refetch", { withPolling });
      if (withPolling) {
        setIsPolling(true);
      } else {
        executePoll(false);
      }
      setError(null);
    },
    [executePoll]
  );
  useEffect(() => {
    mountedRef.current = true;
    if (enabled && isPolling) {
      executePoll(true);
    }
    return () => {
      console.log("cleanup poll");
      mountedRef.current = false;
      cleanup();
    };
  }, [enabled, isPolling, executePoll, cleanup]);
  useEffect(() => {
    setRestart(restartPolling);
  }, [restartPolling]);
  useEffect(() => {
    if (restart && !isPolling) {
      setIsPolling(true);
      executePoll();
      setRestart(false);
    }
  }, [restart]);
  return {
    isPolling,
    isLoading,
    error,
    data,
    startPolling,
    stopPolling,
    firstCallLoading,
    refetch
  };
}

const useInView = () => {
  const [inView, setInView] = useState(false);
  const setRef = useCallback((node) => {
    if (node) {
      const observer = new IntersectionObserver(([entry]) => {
        setInView(entry.isIntersecting);
      });
      observer.observe(node);
      return () => observer.disconnect();
    }
  }, []);
  return { inView, setRef };
};

const PlaygroundQueryClient = ({ children }) => {
  const queryClient = new QueryClient();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children });
};

const formatRelativeTime = (date) => {
  const now = /* @__PURE__ */ new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1e3);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
};
const MemorySearch = ({
  searchMemory,
  onResultClick,
  className,
  currentThreadId,
  chatInputValue
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const searchTimeoutRef = useRef(void 0);
  const dropdownRef = useRef(null);
  const prevThreadIdRef = useRef(currentThreadId);
  const lastSearchTimeRef = useRef(0);
  const pendingSearchRef = useRef(null);
  const handleSearch = useCallback(
    async (searchQuery) => {
      if (!searchQuery.trim()) {
        setError(null);
        return;
      }
      setIsSearching(true);
      setError(null);
      try {
        const response = await searchMemory(searchQuery);
        setResults(response.results);
        setIsOpen((prev) => prev || response.results.length > 0);
      } catch (err) {
        setError("Failed to search memory");
        console.error("Memory search error:", err);
      } finally {
        setIsSearching(false);
      }
    },
    [searchMemory]
  );
  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setQuery(value);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (value.trim()) {
        const now = Date.now();
        const timeSinceLastSearch = now - lastSearchTimeRef.current;
        if (timeSinceLastSearch >= 500) {
          setIsSearching(true);
          handleSearch(value);
          lastSearchTimeRef.current = now;
        } else {
          setIsSearching(true);
          pendingSearchRef.current = value;
          const remainingTime = 500 - timeSinceLastSearch;
          searchTimeoutRef.current = setTimeout(() => {
            if (pendingSearchRef.current) {
              handleSearch(pendingSearchRef.current);
              lastSearchTimeRef.current = Date.now();
              pendingSearchRef.current = null;
            }
          }, remainingTime);
        }
      } else {
        setResults([]);
        setIsOpen(false);
        setIsSearching(false);
        pendingSearchRef.current = null;
      }
    },
    [handleSearch]
  );
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (searchTimeoutRef.current) {
          clearTimeout(searchTimeoutRef.current);
        }
        handleSearch(query);
      }
    },
    [query, handleSearch]
  );
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (prevThreadIdRef.current !== currentThreadId && query.trim()) {
      handleSearch(query);
    }
    prevThreadIdRef.current = currentThreadId;
  }, [currentThreadId, query, handleSearch]);
  useEffect(() => {
    if (chatInputValue !== void 0 && chatInputValue !== query) {
      setQuery(chatInputValue);
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (chatInputValue.trim()) {
        const now = Date.now();
        const timeSinceLastSearch = now - lastSearchTimeRef.current;
        if (timeSinceLastSearch >= 500) {
          setIsSearching(true);
          handleSearch(chatInputValue);
          lastSearchTimeRef.current = now;
        } else {
          setIsSearching(true);
          pendingSearchRef.current = chatInputValue;
          const remainingTime = 500 - timeSinceLastSearch;
          searchTimeoutRef.current = setTimeout(() => {
            if (pendingSearchRef.current) {
              handleSearch(pendingSearchRef.current);
              lastSearchTimeRef.current = Date.now();
              pendingSearchRef.current = null;
            }
          }, remainingTime);
        }
      } else {
        setResults([]);
        setIsOpen(false);
        setIsSearching(false);
        pendingSearchRef.current = null;
      }
    }
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [chatInputValue]);
  const handleResultClick = (messageId, threadId) => {
    onResultClick?.(messageId, threadId);
  };
  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setError(null);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
  };
  const truncateContent = (content, maxLength = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };
  return /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col h-full", className), ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs("div", { className: "relative shrink-0", children: [
      /* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-icon3" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          type: "text",
          value: query,
          onChange: handleInputChange,
          onKeyDown: handleKeyDown,
          placeholder: "Search memory...",
          className: "pl-10 pr-10 bg-surface3 border-border1"
        }
      ),
      query && /* @__PURE__ */ jsx(
        Button$1,
        {
          onClick: clearSearch,
          variant: "ghost",
          size: "sm",
          className: "absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0",
          children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
        }
      )
    ] }),
    (isOpen || query && (isSearching || results.length === 0)) && /* @__PURE__ */ jsx("div", { className: "mt-2 flex-1 bg-surface3 border border-border1 rounded-lg shadow-lg overflow-y-auto", children: error ? /* @__PURE__ */ jsx("div", { className: "p-4 text-center", children: /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-red-500", children: error }) }) : isSearching && results.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-4 text-center", children: /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon3", children: "Searching..." }) }) : results.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-4 text-center", children: /* @__PURE__ */ jsxs(Txt, { variant: "ui-sm", className: "text-icon3", children: [
      'No results found for "',
      query,
      '"'
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "py-2", children: results.map((result) => /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handleResultClick(result.id, result.threadId),
        className: cn(
          "w-full px-4 py-3 hover:bg-surface4 transition-colors duration-150 text-left border-b border-border1 last:border-b-0",
          result.threadId !== currentThreadId && "border-l-2 border-l-blue-400"
        ),
        children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
          result.context?.before && result.context.before.length > 0 && /* @__PURE__ */ jsx("div", { className: "opacity-50 text-xs space-y-1", children: result.context.before.map((msg, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              msg.role,
              ":"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-icon3", children: truncateContent(msg.content, 50) })
          ] }, idx)) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: cn(
                    "text-xs font-medium px-2 py-0.5 rounded",
                    result.role === "user" ? "bg-blue-500/20 text-blue-400" : "bg-green-500/20 text-green-400"
                  ),
                  children: result.role
                }
              ),
              /* @__PURE__ */ jsx(Txt, { variant: "ui-xs", className: "text-icon3", children: formatRelativeTime(new Date(result.createdAt)) }),
              result.threadTitle && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxs(
                  Txt,
                  {
                    variant: "ui-xs",
                    className: cn(
                      "truncate max-w-[150px]",
                      result.threadId !== currentThreadId ? "text-blue-400 font-medium" : "text-icon3"
                    ),
                    title: result.threadTitle,
                    children: [
                      "• ",
                      result.threadTitle
                    ]
                  }
                ),
                result.threadId !== currentThreadId && /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3 text-blue-400" })
              ] })
            ] }),
            /* @__PURE__ */ jsx(Txt, { variant: "ui-sm", className: "text-icon5 break-words", children: truncateContent(result.content) })
          ] }) }),
          result.context?.after && result.context.after.length > 0 && /* @__PURE__ */ jsx("div", { className: "opacity-50 text-xs space-y-1", children: result.context.after.map((msg, idx) => /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "font-medium", children: [
              msg.role,
              ":"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-icon3", children: truncateContent(msg.content, 50) })
          ] }, idx)) })
        ] })
      },
      result.id
    )) }) })
  ] });
};

export { AgentChat, AgentCoinIcon, AgentEntityHeader, AgentEvals, AgentIcon, AgentMetadata, AgentMetadataList, AgentMetadataListEmpty, AgentMetadataListItem, AgentMetadataPrompt, AgentMetadataScorerList, AgentMetadataSection, AgentMetadataToolList, AgentMetadataWorkflowList, AgentMetadataWrapper, AgentNetworkCoinIcon, AgentSettings, AgentSettingsContext, AgentSettingsProvider, AgentsTable, AgentsTableSkeleton, AiIcon, AlertDialog, ApiIcon, Badge$1 as Badge, BranchIcon, Breadcrumb, Button, Cell, ChatThreads, CheckIcon, ChevronIcon, CommitIcon, CrossIcon, Crumb, DarkLogo, DataTable, DateTimeCell, DbIcon, DebugIcon, DeploymentIcon, DividerIcon, DocsIcon, DynamicForm, EmptyAgentsTable, EmptyScorerList, EmptyState, EmptyWorkflowsTable, Entity, EntityContent, EntityDescription, EntityHeader, EntityIcon, EntityName, Entry, EntryCell, EnvIcon, EvaluatorCoinIcon, FiltersIcon, FolderIcon, GithubCoinIcon, GithubIcon, GoogleIcon, Header, HeaderAction, HeaderGroup, HeaderTitle, HomeIcon, Icon, InfoIcon, JudgeIcon, LatencyIcon, LegacyWorkflowGraph, LegacyWorkflowTrigger, LinkComponentProvider, LogsIcon, MainContentContent, MainContentLayout, MastraClientProvider, MastraResizablePanel, McpCoinIcon, McpServerIcon, MemoryIcon, MemorySearch, NetworkChat, NetworkContext, NetworkProvider, NetworkTable, NetworkTableEmpty, NetworkTableSkeleton, OpenAIIcon, PlaygroundQueryClient, PlaygroundTabs, PromptIcon, RadioGroup, RadioGroupItem, RepoIcon, Row, RuntimeContext, RuntimeContextWrapper, ScoreIcon, ScorerList, ScorerSkeleton, SettingsIcon, SlashIcon, Tab, TabContent, TabList, Table, Tbody, Th, Thead, ThreadDeleteButton, ThreadItem, ThreadLink, ThreadList, Threads, ToolCoinIcon, ToolList, ToolListEmpty, ToolListSkeleton, ToolsIcon, TraceIcon, TracesView, TracesViewSkeleton, TsIcon, Txt, TxtCell, UnitCell, VNextNetworkChat, VariablesIcon, WorkflowCoinIcon, WorkflowGraph, WorkflowIcon, WorkflowRunContext, WorkflowRunProvider, WorkflowRuns, WorkflowTable, WorkflowTableSkeleton, WorkflowTrigger, WorkingMemoryContext, WorkingMemoryProvider, allowedAiSpanAttributes, cleanString, formatDuration, formatOtelTimestamp, formatOtelTimestamp2, providerMapToIcon, transformKey, useAgentSettings, useCurrentRun, useInView, useLinkComponent, useMastraClient, usePlaygroundStore, usePolling, useScorer, useScorers, useScoresByEntityId, useScoresByScorerId, useSpeechRecognition, useWorkingMemory };
//# sourceMappingURL=index.es.js.map
