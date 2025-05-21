export interface OcrMyPdfParams {
  args?: string[];
  outputPath?: string;
  inputPath?: string;
}

export interface OcrMyPdfReturn {
  outputPath: string;
  outputText?: string;
}

export interface OcrMyPdfMethodsParams extends OcrMyPdfParams {}
