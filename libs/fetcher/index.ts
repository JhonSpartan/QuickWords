import { WordShape } from "@/types";
import axios from "axios";


class AppFetcher {

  private URL = ''

  async getCars() {
    // return axios.get(`${this.URL}/api/words`)
    const res = await axios.get(`${this.URL}/api/words`);
    return res.data;
  }

  async getCar(id: string) {
    const res = await axios.get(`${this.URL}/api/words/${id}`);
    return res.data;

  }

  async createCar(word: WordShape) {
    await axios.post(`${this.URL}/api/words`, word);
  }

  async updateCar(word: WordShape) {
    await axios.put(`${this.URL}/api/words/${word._id}`, word); 
  }

  async deleteCar(id: string) {
    await axios.delete(`${this.URL}/api/words/${id}`); 
  }
}

export default new AppFetcher();