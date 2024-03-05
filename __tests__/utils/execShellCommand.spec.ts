import { execShellCommand } from "@/utils";

describe("execShellCommand", () => {
  it("must execute the ifconfig command successfully", async () => {
    const result = await execShellCommand("ifconfig");

    expect(result).resolves;
    expect(result).toEqual(expect.stringContaining("inet"));
  });

  it("should return an error when executing a non-existent command", async () => {
    try {
      await execShellCommand("whatscommand");
      fail("the promise should have returned an error");
    } catch (error) {
      expect(error.message).toContain("Command failed:");
    }
  });
});
