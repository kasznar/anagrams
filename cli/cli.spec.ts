import { startCLI } from "./cli";
import readline, { Interface } from "readline";

describe("cli", () => {
  describe("startCLI", () => {
    it("should return cli object", () => {
      const cli = startCLI();
      expect(cli).not.toBeUndefined(); //
      cli.close();
    });
  });

  describe("question", () => {
    it("should call readline.question with text", () => {
      const mockReadLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      mockReadLine.question = jest.fn();
      const cli = startCLI(mockReadLine as Interface);

      const text = "question text";
      cli.question(text);
      expect(mockReadLine.question).toBeCalledWith(text, expect.any(Function));
    });
  });
});
