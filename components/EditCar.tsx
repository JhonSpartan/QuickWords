
import { useGetCar } from "@/libs/hooks";
import EditForm from "./form/EditForm";
import { LinearProgress } from "@mui/material";
import { NotifyData, WordShape } from "@/types";

const URL = '';

async function getWord(id: string) {
  const res = await fetch(`/api/words/${id}`, {
    cache: "no-cache",
    next: {
      tags: ["words"]
    }
  });

  const searchedWord = await res.json();
  const word: WordShape = searchedWord.word;
  return word;
}

const EditCar = async (props: {setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>, id: string, setNotify: React.Dispatch<React.SetStateAction<NotifyData>>}) => {

  const { setOpenPopup, id, setNotify } = props;

  const word = await getWord(id);

  return <EditForm setOpenPopup={setOpenPopup} word={word} id={id} setNotify={setNotify} />

}

export default EditCar