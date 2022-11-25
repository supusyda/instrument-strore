import axios from "../axios";
const getPaymentCode = () => {
  return axios.get(`/api/allCode/get?type=PAYMENT`); //tim dc all va tim dc one nguoi
};
const createReceipt = (receiptData) => {
  return axios.post(`/api/receipt/create?type=PAYMENT`, receiptData); //tim dc all va tim dc one nguoi
};

export { getPaymentCode, createReceipt };
