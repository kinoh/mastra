import { RefinedTrace } from '../types';
export interface TracesViewProps {
    isLoading: boolean;
    error: Error | null;
    traces: RefinedTrace[];
    runId?: string;
    stepName?: string;
    className?: string;
    setEndOfListElement: (element: HTMLDivElement | null) => void;
}
export declare function TracesView({ isLoading, error, traces, runId, stepName, className, setEndOfListElement, }: TracesViewProps): import("react/jsx-runtime").JSX.Element;
export declare const TracesViewSkeleton: () => import("react/jsx-runtime").JSX.Element;
