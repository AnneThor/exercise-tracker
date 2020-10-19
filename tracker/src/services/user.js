import axios from "axios";

export default {
  getAll: async () => {
    let res = await axios.get(`/api/exercise/user`);
    return res.data || [];
  }
  
}
