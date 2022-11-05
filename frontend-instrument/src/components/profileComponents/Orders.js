import React, { useEffect, useState } from "react";
import useFetch from "../../customize/useFetch";
import { Link } from "react-router-dom";
import moment from "moment/moment";
const Orders = (props) => {
  let [receipts, SetReceipts] = useState({});
  let [userID, setUserID] = useState(props.userID ? props.userID : "");
  let { res } = useFetch(
    `http://localhost:8080/api/receipt/get?userID=${userID}`
  );
  useEffect(() => {
    SetReceipts(res);

    return () => {};
  }, [res]);

  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {console.log(receipts.data)}
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
                    <tr className={"alert-success"}>
                      <td>
                        <a href={`/`} className="link">
                          {index + 1}
                        </a>
                      </td>
                      <td>Paid</td>
                      <td>{moment(item.createdAt).format("MM/DD/YYYY")}</td>
                      <td>{item.totalMoney}</td>
                    </tr>
                  </>
                );
              })}

              {/* <tr className={"alert-danger"}>
                  <td>
                    <a href={`/`} className="link">
                      2
                    </a>
                  </td>
                  <td>Not Paid</td>
                  <td>Dec 12 2021</td>
                  <td>$34</td>
                </tr> */}
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
      {/* <div className="col-12 alert alert-info text-center mt-3">
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
      </div> */}

      {/* <div className="table-responsive">
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
            <tr className={"alert-success"}>
              <td>
                <a href={`/`} className="link">
                  1
                </a>
              </td>
              <td>Paid</td>
              <td>Dec 12 2021</td>
              <td>$234</td>
            </tr>

            <tr className={"alert-danger"}>
              <td>
                <a href={`/`} className="link">
                  2
                </a>
              </td>
              <td>Not Paid</td>
              <td>Dec 12 2021</td>
              <td>$34</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default Orders;
