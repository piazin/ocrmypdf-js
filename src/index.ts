import { execShellCommand } from "@/utils";
import path from "path";

class OCR {
  /**
   * @description Adicione uma camada de OCR e converta para PDF/A
   * @param inputPath - Caminho do arquivo de entrada
   * @param outputPath - Caminho do arquivo de saída
   * @returns {Promise<void>}
   */
  async convertToPdfA({
    inputPath,
    outputPath,
  }: DefaultPropsOfOCRMethods): Promise<void> {
    try {
      const result = await this.exec(inputPath, outputPath);
      console.info(result);
    } catch (error) {
      console.error(error);
    }
  }

  private async exec(input: string, output: string) {
    const { inputPath, outputPath } = this.resolveInputAndOutputPath(
      input,
      output
    );

    console.info(outputPath);

    return await execShellCommand(`ocrmypdf ${inputPath} ${outputPath}`);
  }

  resolveInputAndOutputPath(input: string, output: string) {
    const inputPath = path.resolve(input);
    const outputPath = path.resolve(output);

    return { inputPath, outputPath };
  }
}

(async () => {
  const ocr = new OCR();
  const inputPath = "./public/teste1.pdf";
  const outputPath = "./public/teste1-ocr.pdf";

  await ocr.convertToPdfA({ inputPath: path.resolve(inputPath), outputPath });
})();
