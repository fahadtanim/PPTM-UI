import Axios from "axios";

export const LabelApi = {
  getLabels: async () => {
    let response = await Axios.get(`${window.API_URL}/labels`);
    return response.data;
  },
  filterLabels: async (query) => {
    let response = await Axios.get(`${window.API_URL}/labels${query}`);
    return response.data;
  },
  addLabel: async (label) => {
    let response = await Axios.post(`${window.API_URL}/labels`, label);
    return response.data;
  },
  updateLabel: async (label) => {
    let response = await Axios.put(`${window.API_URL}/labels`, label);
    return response.data;
  },
};
