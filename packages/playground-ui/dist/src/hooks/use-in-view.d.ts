/**
 * Tracks whether or not the given element is currently in view.
 * This is to replace framer-motion's `useInView` which has issues
 * tracking a ref that is set at a time other than mount.
 */
export declare const useInView: () => {
    inView: boolean;
    setRef: (node: HTMLDivElement | null) => (() => void) | undefined;
};
