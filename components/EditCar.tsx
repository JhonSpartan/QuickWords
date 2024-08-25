"use client"

// import { useGetCar } from "@/libs/hooks";
import EditForm from "./form/EditForm";
import { LinearProgress } from "@mui/material";
import { NotifyData, WordShape } from "@/types";
import { useCars, useGetCar } from "@/libs/hooks";

// const URL = '';

// async function getWord(id: string) {
//   const res = await fetch(`https://quick-words.vercel.app/api/words/${id}`, {
//     cache: "no-cache",
//     next: {
//       tags: ["words"]
//     }
//   });

//   const searchedWord = await res.json();
//   const word: WordShape = searchedWord.word;
//   return word;
// }



const EditCar = (props: {setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>, id: string, setNotify: React.Dispatch<React.SetStateAction<NotifyData>>}) => {


  const { setOpenPopup, id, setNotify } = props;

  const { status, isFetching, error, data} = useGetCar(id);

  if (isFetching) return (
    <div>
      <h1>Loading...</h1>
      <LinearProgress />
    </div>
  )
  if (status === 'error') return <h1>{JSON.stringify(error)}</h1>
  if (!data) return <h1>Word not found</h1>

  // const word = await getWord(id);

  return <EditForm setOpenPopup={setOpenPopup} word={data.word} id={id} setNotify={setNotify} />

}

export default EditCar