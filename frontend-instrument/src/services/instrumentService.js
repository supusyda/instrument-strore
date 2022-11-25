import axios from "../axios";
const getAllInstrument = (id) => {
  return axios.get(`/api/instrument/get?instrumentID=${id}`); //tim dc all va tim dc one nguoi
};
const getSpecificInstrument = (ids) => {
  return axios.post(`/api/instrument/getSpecific`, ids); //tim dc all va tim dc one nguoi
};
const updateInteract = (InteractData) => {
  return axios.post(`/api/react/update`, InteractData); //tim dc all va tim dc one nguoi
};
const getWithAction = (action) => {
  return axios.post(`/api/instrument/getWithAction`, action); //tim dc all va tim dc one nguoi
};

export {
  getAllInstrument,
  getSpecificInstrument,
  updateInteract,
  getWithAction,
};
