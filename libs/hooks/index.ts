
import { useQuery } from "react-query";
import axios from "axios";

const URL = 'http://localhost:3000';

export const useGetCar = (id: string) => {
  return useQuery(
    ["word", parseInt(id)],
    () => axios.get(`${URL}/api/words/${id}`),
    {
      select: ({ data }) => data,
    } 
  );
}
