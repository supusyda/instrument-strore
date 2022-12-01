import axios from "../axios";
const getPaymentCode = () => {
  return axios.get(`/api/allCode/get?type=PAYMENT`); //tim dc all va tim dc one nguoi
};
const getIncomeInWeek = () => {
  return axios.get(`/api/receipt/getIncomeWeek`); //tim dc all va tim dc one nguoi
};
const createReceipt = (receiptData) => {
  return axios.post(`/api/receipt/create?type=PAYMENT`, receiptData); //tim dc all va tim dc one nguoi
};
const getReceipt = () => {
  return axios.get(`/api/receipt/get?receiptID=ALL`); //tim dc all va tim dc one nguoi
};
const updateReceipt = (newData) => {
  return axios.put(`/api/receipt/update`, newData); //tim dc all va tim dc one nguoi
};
const getAllcode = () => {
  return axios.get(`/api/allCode/get?type=ALL`); //tim dc all va tim dc one nguoi
};

export {
  getPaymentCode,
  createReceipt,
  getIncomeInWeek,
  getReceipt,
  getAllcode,
  updateReceipt,
};
