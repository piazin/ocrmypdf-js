import os from "os";
import fs from "fs/promises";
import { execShellCommand, logger } from "@/utils";
import {
  OcrMyPdfMethodsParams,
  OcrMyPdfOptions,
  OcrMyPdfParams,
  OcrMyPdfReturn,
} from "@/types";

/**
 * Represents a class for executing OCR on PDF files using the ocrmypdf command-line tool.
 */
export class OcrMyPdf {
  private readonly args?: string[];
  private readonly inputPath?: string;
  private readonly outputPath?: string;
  private readonly options?: OcrMyPdfOptions;

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
    logger.info("Executing OCR on the PDF file...");

    try {
      return await this.executeOcrMyPdfInShell(params);
    } catch (error) {
      logger.error(
        `Failed to execute OCR on the PDF file: ${error.message}`,
        this.execute.name
      );
      throw error;
    } finally {
      logger.info("Finished executing OCR on the PDF file.");
    }
  }

  /**
   * Executes a raw command in the shell.
   * @param args - The command to execute.
   * @throws Throws an error if the execution fails.
   * @returns The output of the command.
   */
  async executeRaw(args: string) {
    logger.info("Executing a raw command in the shell...");
    try {
      return await execShellCommand(args);
    } catch (error) {
      logger.error(
        `Failed to execute a raw command in the shell: ${error.message}`
      );
      throw error;
    } finally {
      logger.info("Finished executing a raw command in the shell.");
    }
  }

  private async executeOcrMyPdfInShell(params: OcrMyPdfMethodsParams) {
    try {
      let text = "",
        outputTempFilePath = `${os.tmpdir()}/output.txt`;

      const args = [].concat(params?.args || "").concat(this?.args || ""),
        inputPath = params?.inputPath || this.inputPath,
        outputPath = params?.outputPath || this.outputPath,
        options = params?.options || this.options,
        returnText = options?.returnText
          ? `--sidecar ${outputTempFilePath}`
          : "";

      let result = {} as OcrMyPdfReturn;

      if (!inputPath || !outputPath)
        throw new Error("inputPath or outputPath is not defined!");

      await execShellCommand(
        `ocrmypdf ${returnText} ${args?.join(" ")} ${inputPath} ${outputPath}`
      );

      result["outputPath"] = outputPath;

      if (options?.returnText) {
        text = await this.returnTextOcrMyPdf(outputTempFilePath);
        result["outputText"] = text;
      }

      return {
        ...result,
      };
    } catch (error) {
      throw error;
    }
  }

  private async returnTextOcrMyPdf(
    temporaryTextFilePath: string
  ): Promise<string> {
    try {
      const text = await fs.readFile(`${temporaryTextFilePath}`, "utf-8");
      return text;
    } catch (error) {
      throw new Error(`Failed to read the output text file: ${error.message}`);
    } finally {
      await fs.unlink(`${temporaryTextFilePath}`);
    }
  }
}
