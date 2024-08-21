export type WordShape = { 
  text: string;
  color: string;
  fontSize: string;
  uniqueKey?: string;
  _id?: string;
  __v?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type ParamsShape = {
  params: {id: string}
}

export type NotifyData = {
  isOpen: boolean;
  message: string;
  type: string | any;
}

export type DialogConformation = {
  isOpen: boolean;
  title: string;
  subTitle: string;
  onConfirm?: ()=> void;
}


       


