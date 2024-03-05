import { exec } from "node:child_process";

/**
 * @description Execute a shell command and return the output
 * @param command The command to execute
 * @returns The output of the command
 * @throws If the command fails
 */
export async function execShellCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, sterr) => {
      if (err) {
        return reject(err);
      }

      return resolve(stdout || sterr);
    });
  });
}

/*
import { promisify } from "node:util";
export const execShellCommand = promisify(exec);
*/
