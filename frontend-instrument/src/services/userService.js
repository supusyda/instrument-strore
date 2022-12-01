import axios from "../axios";
const createUser = (userData) => {
  return axios.post(`/api/user/create`, userData); //tim dc all va tim dc one nguoi
};
const deleUser = (userID) => {
  return axios.delete(`/api/user/delete?userID=${userID}`); //tim dc all va tim dc one nguoi
};
const editUser = (userData) => {
  return axios.put(`/api/user/update`, userData); //tim dc all va tim dc one nguoi
};
const UserAmount = () => {
  return axios.get(`/api/user/amount`); //tim dc all va tim dc one nguoi
};
const login = (userData) => {
  return axios.post(`/api/user/login`, userData); //tim dc all va tim dc one nguoi
};
const logout = (userData) => {
  return axios.post(`/api/user/logout`, userData); //tim dc all va tim dc one nguoi
};
const forgot = (email) => {
  return axios.post(`/api/user/forgot`, email); //tim dc all va tim dc one nguoi
};
const updatePass = (data) => {
  return axios.post(`/api/user/comfirmResetPass`, data); //tim dc all va tim dc one nguoi
};
export {
  createUser,
  deleUser,
  editUser,
  login,
  logout,
  UserAmount,
  forgot,
  updatePass,
};
