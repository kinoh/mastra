interface PdfEntryProps {
    data: string;
}
export declare const PdfEntry: ({ data }: PdfEntryProps) => import("react/jsx-runtime").JSX.Element;
interface PdfPreviewDialogProps {
    data: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export declare const PdfPreviewDialog: ({ data, open, onOpenChange }: PdfPreviewDialogProps) => import("react/jsx-runtime").JSX.Element;
interface ImageEntryProps {
    src: string;
}
export declare const ImageEntry: ({ src }: ImageEntryProps) => import("react/jsx-runtime").JSX.Element;
interface ImagePreviewDialogProps {
    src: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export declare const ImagePreviewDialog: ({ src, open, onOpenChange }: ImagePreviewDialogProps) => import("react/jsx-runtime").JSX.Element;
interface TxtEntryProps {
    data: string;
}
export declare const TxtEntry: ({ data }: TxtEntryProps) => import("react/jsx-runtime").JSX.Element;
interface TxtPreviewDialogProps {
    data: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}
export declare const TxtPreviewDialog: ({ data, open, onOpenChange }: TxtPreviewDialogProps) => import("react/jsx-runtime").JSX.Element;
export {};
