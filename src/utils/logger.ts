import cli from "cli-color";

export const logger = {
  info: (message: string) => {
    const date = new Date().toLocaleTimeString();
    console.log(cli.white(`[${date}] `) + cli.green(message));
  },
  warn: (message: string) => {
    const date = new Date().toLocaleTimeString();
    console.log(cli.yellow(`[${date}] ${message}`));
  },
  error: (message: string, locale?: string) => {
    const date = new Date().toLocaleTimeString();
    console.info(
      `${cli.white(`[${date}] `)} ${cli.red(message)} origin:${cli.white(
        locale || ""
      )}`
    );
  },
};
