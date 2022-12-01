import axios from "../axios";
const getAllInstrument = (id) => {
  return axios.get(`/api/instrument/get?instrumentID=${id}`); //tim dc all va tim dc one nguoi
};
const getSpecificInstrument = (ids) => {
  return axios.post(`/api/instrument/getSpecific`, ids); //tim dc all va tim dc one nguoi
};
const updateProduct = (id) => {
  return axios.put(`/api/instrument/update`, id); //tim dc all va tim dc one nguoi
};

const deleInstrument = (id) => {
  return axios.delete(`/api/instrument/dele?instrumentID=${id}`); //tim dc all va tim dc one nguoi
};
const updateInteract = (InteractData) => {
  return axios.post(`/api/react/update`, InteractData); //tim dc all va tim dc one nguoi
};
const updateInstrument = (data) => {
  return axios.put(`/api/instrument/update`, data); //tim dc all va tim dc one nguoi
};
const getWithAction = (action) => {
  return axios.post(`/api/instrument/getWithAction`, action); //tim dc all va tim dc one nguoi
};
const createProduct = (data) => {
  return axios.post(`/api/instrument/create`, data); //tim dc all va tim dc one nguoi
};
const bestSellerProduct = () => {
  return axios.get(`/api/instrument/bestSeller`); //tim dc all va tim dc one nguoi
};
export {
  getAllInstrument,
  getSpecificInstrument,
  updateInteract,
  getWithAction,
  deleInstrument,
  createProduct,
  updateProduct,
  updateInstrument,
  bestSellerProduct,
};
