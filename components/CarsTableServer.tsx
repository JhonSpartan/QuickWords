import { WordShape } from "@/types";
import CarsTableClient from "./CarsTableClient";

async function getWords() {
  const res = await fetch(`http://localhost:3000/api/words`, {
    cache: "no-cache",
    next: {
      tags: ["words"]
    }
  });

  const wordsList = await res.json();
  const words: WordShape[] = wordsList.words;
  return words;
}

const CarsTableServer = async () => {
  
  const words = await getWords();

  return (
    <CarsTableClient words={words}/>
  )
}

export default CarsTableServer;