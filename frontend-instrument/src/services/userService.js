import axios from "../axios";
const createUser = (userData) => {
  return axios.post(`/api/user/create`, userData); //tim dc all va tim dc one nguoi
};
const deleUser = (userID) => {
  return axios.delete(`/api/user/delete?userID=${userID}`); //tim dc all va tim dc one nguoi
};
const editUser = (userData) => {
  return axios.put(`/api/user/update`,userData); //tim dc all va tim dc one nguoi
};
export { createUser, deleUser,editUser };
