
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import AppFetcher from '@/libs/fetcher';
import { NotifyData, WordShape } from "@/types";

// const URL = 'http://localhost:3000';

// export const useGetCar = (id: string) => {
//   return useQuery(
//     ["word", parseInt(id)],
//     () => axios.get(`${URL}/api/words/${id}`),
//     {
//       select: ({ data }) => data,
//     } 
//   );
// }

export const useCars = () => {
  return useQuery(
    ["words"],
    () => AppFetcher.getCars(),
    {
      select: ({ data }) => data,
    }
  );
}

// export const useGetCar = (id: string) => {
//   return useQuery(
//     ["word", parseInt(id)],
//     () => AppFetcher.getCar(id),
//     {
//       select: ({ data }) => data,
//     } 
//   );
// }

export function useCreateCar(setNotify: React.Dispatch<React.SetStateAction<NotifyData>>) {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (word: WordShape) => AppFetcher.createCar(word),
    onMutate: () => {
      console.log("mutate");
    },

    onError: () => {
      console.log("error");
    },

    onSuccess: () => {
      console.log("success");
      
      
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["words"] });
        setNotify({
          isOpen: true,
          message: 'New word successfully added',
          type: 'success'
        });
      }
    },
  });
}

export const useUpdateCar = (setNotify: React.Dispatch<React.SetStateAction<NotifyData>>) => {

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (word: WordShape) => AppFetcher.updateCar(word),
    onSettled: async(_, error) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ['words'] });
        setNotify({
          isOpen: true,
          message: 'Word successfully edited',
          type: 'success'
        })
      }
    },
  });
}

export function useDeleteCar(setNotify: React.Dispatch<React.SetStateAction<NotifyData>>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => AppFetcher.deleteCar(id),
  
    onError: () => {
      console.log("error");
    },

    onSuccess: () => {
      console.log("success");
    },

    onSettled: async (_, error) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["words"] });
        setNotify({
          isOpen: true,
          message: 'Word successfully deleted',
          type: 'success'
        })
      }
      
    },
  });
}
