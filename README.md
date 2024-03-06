# ocrmypdf-js

A JavaScript library that adds “layers” of text to images in PDFs, making scanned image PDFs searchable using [ocrmypdf](https://ocrmypdf.readthedocs.io/en/latest/introduction.html), which is a Python application and library.

## Prerequisites

For everything to work correctly, you need to have it installed on your OS [ocrmypdf](https://ocrmypdf.readthedocs.io/en/latest/installation.html).

#### Example

Debian or Ubuntu users can simply use the following:

```
sudo apt install ocrmypdf
```

For more information on how to install on different OS, see the installation [documents](https://ocrmypdf.readthedocs.io/en/latest/installation.html).

## Installation

Install ocrmypdf-js with your preferred package manager

```bash
  npm i ocrmypdf-js
  // or
  yarn add ocrmypdf-js
  // or
  pnpm add ocrmypdf-js
```

## Usage/Examples

#### Basic example [ref](https://ocrmypdf.readthedocs.io/en/latest/cookbook.html#add-an-ocr-layer-and-convert-to-pdf-a).

```typescript
import { OcrMyPdf } from "ocrmypdf-js";

(async () => {
  const ocrmypdf = new OcrMyPdf();

  await ocrmypdf.execute({
    inputPath: "path/to/input.pdf",
    outputPath: "path/to/output.pdf",
  });
})();
```
