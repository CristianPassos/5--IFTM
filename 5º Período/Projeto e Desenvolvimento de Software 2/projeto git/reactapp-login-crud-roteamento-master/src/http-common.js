import axios from "axios";

export default axios.create({
  baseURL: "https://projeto-integrador-4.herokuapp.com/",
  headers: {
    "Content-type": "application/json"
  }
});