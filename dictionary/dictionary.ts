import * as fs from "fs";
import * as readline from "readline";

export async function createDictionary(filePath: string) {
  const anagrams = new Map<string, string[]>();

  await readLineByLine(filePath, (word) => {
    const key = createKey(word);
    if (anagrams.has(key)) {
      anagrams.get(key).push(word);
    } else {
      anagrams.set(key, [word]);
    }
  });

  return {
    find: (word: string) => {
      return anagrams.get(createKey(word));
    },
  };
}

export async function readLineByLine(path: string, cb: (line: string) => void) {
  if (!fs.existsSync(path)) {
    console.error(`Can't open wordlist.`);
    process.exit(1);
  }

  const fileStream = fs.createReadStream(path);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    cb(line);
  }
}

export function createKey(word: string): string {
  return word.toLowerCase().replace(/\s/g, "").split("").sort().join("");
}
