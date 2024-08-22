import { WordShape } from "@/types";
import axios from "axios";


class AppFetcher {

  private URL = ''

  async getCars() {
    return axios.get(`${this.URL}/api/words`)
  }

  async getCar(id: string) {
    return axios.get(`${this.URL}/api/words/${id}`)
  }

  async createCar(word: WordShape) {
    await axios.post(`${this.URL}/api/words`, word);
  }

  async updateCar(word: WordShape) {
    await axios.put(`${this.URL}/api/cars/${word._id}`, word); 
  }

  async deleteCar(id: string) {
    await axios.delete(`${this.URL}/api/cars/${id}`); 
  }
}

export default new AppFetcher();