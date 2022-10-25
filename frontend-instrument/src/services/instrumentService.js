import axios from "../axios";
const getAllInstrument = (id) => {
  return axios.get(`/api/instrument/get?instrumentID=${id}`); //tim dc all va tim dc one nguoi
};
export { getAllInstrument };
