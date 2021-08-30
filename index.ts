import { createDictionary } from "./dictionary";
import { startCLI } from "./cli";

const indexing = "Indexed in";
const lookup = "Lookup took";

(async () => {
  const cli = startCLI();
  console.log("Indexing...");
  console.time(indexing);

  const dict = await createDictionary("data/wordlist.txt");
  console.timeEnd(indexing);

  async function searchQuestion() {
    const word = await cli.question("Search anagrams: ");

    console.time(lookup);
    const result = dict.find(word);
    console.timeEnd(lookup);

    console.log(result);
  }

  while (true) {
    await searchQuestion();
  }
})();
