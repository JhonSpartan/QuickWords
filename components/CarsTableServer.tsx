import { WordShape } from "@/types";
import CarsTableClient from "./CarsTableClient";
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getWords } from "@/libs/services";


// async function getWords() {
//   const res = await fetch(`https://quick-words.vercel.app/api/words`, {
    
//     cache: "no-cache",
//     next: {
//       tags: ["words"]
//     }
//   });

//   const wordsList = await res.json();
//   const words: WordShape[] = wordsList.words;
//   return words;
// }

const CarsTableServer = async () => {

  // const proba = await getWords();
  // console.log(proba)

  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["words"],
  //   queryFn: getWords,
  // })

  // console.log(data)
  
  // const words = await getWords();

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
      <CarsTableClient />
    // </HydrationBoundary>
  )
}

export default CarsTableServer;