import { OcrMyPdf } from "@/lib";
import { resolve } from "path";

describe("OcrMyPdf", () => {
  describe("execute", () => {
    let ocrMyPdf: OcrMyPdf;

    beforeEach(() => {
      ocrMyPdf = new OcrMyPdf({});
    });

    it("should be defined", () => {
      expect(ocrMyPdf).toBeDefined();
    });

    it("should return an error if inputPath outputPath does not exist", async () => {
      await expect(ocrMyPdf.execute()).rejects.toThrow("is not defined");
    });

    it("should pass the arguments successfully", async () => {
      const inputPath = resolve("./public/pdf.test.pdf");
      const outputPath = resolve("./public/pdf-ocr.test.pdf");

      const result = await ocrMyPdf.execute({
        inputPath,
        outputPath,
        args: ["--force-ocr", "-l por"],
      });

      expect(result).resolves;
      expect(result).toEqual({ outputPath });
    });

    it("should OCR the PDF successfully", async () => {
      const inputPath = resolve("./public/pdf.test.pdf");
      const outputPath = resolve("./public/pdf-ocr.test.pdf");

      const result = await ocrMyPdf.execute({
        inputPath,
        outputPath,
        args: ["--force-ocr"],
      });
      expect(result).resolves;
      expect(result).toEqual({ outputPath });
    });
  });

  describe("executeRaw", () => {
    let ocrMyPdf: OcrMyPdf;

    beforeEach(() => {
      ocrMyPdf = new OcrMyPdf();
    });

    it("should be defined", () => {
      expect(ocrMyPdf).toBeDefined();
    });

    it("should OCR the PDF successfully", async () => {
      const inputPath = resolve("./public/pdf.test.pdf");
      const outputPath = resolve("./public/pdf-ocr.test.pdf");

      const rawCommand = `ocrmypdf --force-ocr -l por ${inputPath} ${outputPath}`;

      const result = await ocrMyPdf.executeRaw(rawCommand);
      expect(result).resolves;
    });
  });
});
