import React, { useEffect, useState } from "react";
import useFetch from "../../customize/useFetch";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import OrderScreen from "../../screens/OrderScreen";
const Orders = (props) => {
  let [receipts, SetReceipts] = useState({});
  let [userID, setUserID] = useState(props.userID ? props.userID : "");
  let { res } = useFetch(
    `http://localhost:8080/api/receipt/get?receiptID=${userID}`
  );
  let [receiptDetailID, setReceiptDetailID] = useState(null);
  const handleOnClick = (id) => {
    setReceiptDetailID(id);
  };
  useEffect(() => {
    console.log(res);
    SetReceipts(res);
    setReceiptDetailID(null);

    return () => {};
  }, [res]);

  return (
    <>
      <div className=" d-flex justify-content-center align-items-center flex-column">
        {receipts.data && receipts.data.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>STATUS</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {receipts.data.map((item, index) => {
                  return (
                    <>
                      {item.status === "S2" && (
                        <tr className={"alert-secondary"}>
                          <td>
                            <a
                              href={`#`}
                              className="link"
                              onClick={() => {
                                handleOnClick(item.id);
                              }}
                            >
                              {index + 1}
                            </a>
                          </td>
                          <td>Confirmed</td>
                          <td>{moment(item.createdAt).format("MM/DD/YYYY")}</td>
                          <td>{item.totalMoney} USD</td>
                        </tr>
                      )}
                      {item.status === "S3" && (
                        <tr className={"alert-success"}>
                          <td>
                            <a
                              href={`#`}
                              className="link"
                              onClick={() => {
                                handleOnClick(item.id);
                              }}
                            >
                              {index + 1}
                            </a>
                          </td>
                          <td>Paid</td>
                          <td>{moment(item.createdAt).format("MM/DD/YYYY")}</td>
                          <td>{item.totalMoney}USD</td>
                        </tr>
                      )}
                      {item.status === "S4" && (
                        <tr className={"alert-danger"}>
                          <td>
                            <a
                              href={`#`}
                              className="link"
                              onClick={() => {
                                handleOnClick(item.id);
                              }}
                            >
                              {index + 1}
                            </a>
                          </td>
                          <td>Cancel</td>
                          <td>{moment(item.createdAt).format("MM/DD/YYYY")}</td>
                          <td>{item.totalMoney}USD</td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="col-12 alert alert-info text-center mt-3">
            No Orders
            <Link
              className="btn btn-success mx-2 px-3 py-2"
              to="/"
              style={{
                fontSize: "12px",
              }}
            >
              START SHOPPING
            </Link>
          </div>
        )}
      </div>
      {receiptDetailID && (
        <OrderScreen
          receiptDetailID={receiptDetailID}
          userData={props.userData}
        ></OrderScreen>
      )}
    </>
  );
};

export default Orders;
