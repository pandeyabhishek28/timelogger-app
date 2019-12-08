import axios from "axios";

const baseURL = "https://localhost:44357/api";

export default axios.create({
  baseURL,json: true
});

