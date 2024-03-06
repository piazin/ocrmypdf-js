import { execShellCommand } from "@/utils";

/**
 * Represents a class for executing OCR on PDF files using the ocrmypdf command-line tool.
 */
export class OcrMyPdf {
  private readonly args?: string[];
  private readonly inputPath?: string;
  private readonly outputPath?: string;

  /**
   * Creates an instance of the OcrMyPdf class.
   * @param params  - Optional parameters for configuring the OcrMyPdf instance.
   */
  constructor(params?: OcrMyPdfParams) {
    Object.assign(this, params);
  }

  /**
   * Executes OCR on the PDF file.
   * @param params - Optional parameters for executing OCR.
   * @throws Throws an error if the execution fails.
   */
  async execute(params?: OcrMyPdfMethodsParams) {
    try {
      return await this.executeOcrMyPdfInShell(params);
    } catch (error) {
      throw error;
    }
  }

  async executeRaw(args: string) {
    try {
      return await execShellCommand(`ocrmypdf ${args}`);
    } catch (error) {
      throw error;
    }
  }

  private async executeOcrMyPdfInShell(params: OcrMyPdfMethodsParams) {
    try {
      const args = [].concat(params?.args || "").concat(this?.args || "");
      const inputPath = params?.inputPath || this.inputPath;
      const outputPath = params?.outputPath || this.outputPath;

      if (!inputPath || !outputPath)
        throw new Error("inputPath or outputPath is not defined!");

      await execShellCommand(
        `ocrmypdf ${args?.join("")} ${inputPath} ${outputPath}`
      );

      return {
        outputPath,
      };
    } catch (error) {
      throw error;
    }
  }
}
