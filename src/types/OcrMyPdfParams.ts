export interface OcrMyPdfParams {
  args?: string[];
  outputPath?: string;
  inputPath?: string;
  options?: OcrMyPdfOptions;
}

export interface OcrMyPdfOptions {
  returnText?: boolean;
}

export interface OcrMyPdfReturn {
  outputPath: string;
  outputText?: string;
}

export interface OcrMyPdfMethodsParams extends OcrMyPdfParams {}
