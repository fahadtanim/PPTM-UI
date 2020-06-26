import Axios from "axios";

export const ClientsApi = {
  getClients: async () => {
    let response = await Axios.get(`${window.API_URL}/clients`);
    return response.data;
  },
  getByCid: async (cid) => {
    let response = await Axios.get(`${window.API_URL}/clients/cid/${cid}`);
    return response.data;
  },
  filterClients: async (query) => {
    let response = await Axios.get(`${window.API_URL}/clients${query}`);
    return response.data;
  },
  addClient: async (client) => {
    let response = await Axios.post(`${window.API_URL}/clients`, client);
    return response.data;
  },
  updateClient: async (client) => {
    let response = await Axios.put(`${window.API_URL}/clients`, client);
    return response.data;
  },
};
