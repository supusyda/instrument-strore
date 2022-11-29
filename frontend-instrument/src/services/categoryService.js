import axios from "../axios";
const updateCategory = (data) => {
  return axios.put(`/api/allCode/update`, data); //tim dc all va tim dc one nguoi
};
const createNewCategory = (data) => {
  return axios.post(`/api/allCode/create`, data); //tim dc all va tim dc one nguoi
};
const getAllCategory = () => {
  return axios.get(`/api/allCode/get?type=TYPE`); //tim dc all va tim dc one nguoi
};
export { createNewCategory, updateCategory, getAllCategory };
