import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Link } from "react-router-dom";
import { process } from "@progress/kendo-data-query";
import "@progress/kendo-theme-default/dist/all.css";
import "./product.css";

import { updateProduct } from "../../services/instrumentService";

import {
  getReceipt,
  getAllcode,
  updateReceipt,
} from "../../services/recieptService";
const Receipt = () => {
  let [receiptsData, setReceiptsData] = useState();
  const [dataState, setDataState] = useState({ skip: 0, take: 10 });
  const [result, setResult] = useState(null);
  let [openModal, setopenModal] = useState(false);
  let [isEdit, setIsEdit] = useState(false);
  let [editData, setEditData] = useState();
  let [allCode, setAllcode] = useState();

  // let { res, refesh } = useFetch(
  //   "http://localhost:8080/api/receipt/get?receiptID=ALL"
  // );

  const onDataStateChange = (event) => {
    setDataState(event.dataState);
    setResult(process(receiptsData, event.dataState));
  };
  const handleEditproduct = (receiptsData) => {
    setopenModal(true);
    setEditData(receiptsData);
    setIsEdit(true);
  };

  const editCell = (props) => {
    let receiptsData = props.dataItem;
    return (
      <td>
        <button
          type="button"
          class="btn btn-info"
          onClick={() => {
            handleEditproduct(receiptsData);
          }}
        >
          <span>&#9997;</span>
        </button>
      </td>
    );
  };

  useEffect(() => {
    // console.log(res);
    // if (res.data && res.data.length > 0) {
    //   setReceiptsData(res.data);
    //   setResult(process(res.data, dataState));
    // }
    let data = async () => {
      try {
        let allCodeData = await getAllcode();

        let receipt = await getReceipt();

        if (receipt.data && receipt.data.data.length > 0) {
          console.log("wtf");
          setReceiptsData(receipt.data.data);
          setResult(process(receipt.data.data, dataState));
        }
        console.log("allCodeData", allCodeData);
        if (allCodeData.data && allCodeData.data.data.length > 0) {
          setAllcode(allCodeData.data.data);
        }
      } catch (error) {}
    };
    data();
  }, []);

  const handleChangeStatus = async (e, receiptID) => {
    let datasend = {
      receiptID: receiptID,
      status: e.target.value,
    };
    let res = await updateReceipt(datasend);
    let receipt = await getReceipt();

    setReceiptsData(receipt.data.data);
    setResult(process(receipt.data.data, dataState));
  };
  const statusCell = (props) => {
    let status = allCode.filter((item) => {
      if (item.type == "STATUS") {
        return item;
      }
    });

    let ReceiptStatus = status.filter((item) => {
      if (item.keyMap == props.dataItem.status) {
        return item.valueEN;
      }
    });
    let classStatus = {
      S2: "btn btn-outline-secondary",
      S3: "btn btn-outline-success",
      S4: "btn btn-outline-danger",
    };
    let active = {
      S2: "btn btn-outline-secondary active",
      S3: "btn btn-outline-success active",
      S4: "btn btn-outline-danger active",
    };
    let dataShow = [];
    Object.keys(classStatus).forEach(function (key, index) {
      console.log(key);
      let showButton = (
        <button
          type="button"
          className={
            ReceiptStatus[0].keyMap == key ? active[key] : classStatus[key]
          }
          value={key}
          data-bs-toggle="button"
          autocomplete="off"
          onClick={(e) => {
            handleChangeStatus(e, props.dataItem.id);
          }}
        >
          {status.map((item) => {
            if (item.keyMap === key) {
              return item.valueEN;
            }
          })}
        </button>
      );
      dataShow.push(showButton);
    });

    return (
      <td>
        <div className="d-flex">
          {dataShow.map((item) => {
            return item;
          })}
        </div>
      </td>
    );
  };
  const handleCreteProduct = () => {
    setopenModal(true);
  };
  const paymentCell = (props) => {
    if (props.dataItem.payment == "PAY2") {
      return (
        <td>
          <h1>
            <i class="fab fa-paypal"></i>
          </h1>
        </td>
      );
    } else if (props.dataItem.payment == "PAY1") {
      return (
        <td>
          <h1>
            <i class="fad fa-money-bill"></i>
          </h1>
        </td>
      );
    }
  };
  return (
    <>
      <div className="container">
        {/* {openModal ? (
          <CreateProductModal
            isOpen={openModal}
            setOpen={setopenModal}
            refesh={refesh}
            editData={editData}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          ></CreateProductModal>
        ) : (
          ""
        )} */}

        {allCode && result !== null
          ? receiptsData &&
            receiptsData.length > 0 && (
              <Grid
                data={result}
                filterable={true}
                onDataStateChange={(e) => {
                  onDataStateChange(e);
                }}
                pageable={true}
                total={receiptsData.length}
                {...dataState}
              >
                <GridColumn field="id" title="id" />

                <GridColumn
                  field="totalMoney"
                  title="totalMoney"
                  filterable={false}
                />

                <GridColumn
                  field="payment"
                  title="payment"
                  cell={paymentCell}
                  filterable={false}
                />
                <GridColumn field="deliverAdress" title="deliverAdress" />
                <GridColumn
                  field="status"
                  title="status"
                  cell={statusCell}
                  filterable={false}
                />

                {/* <GridColumn title="Has Sold" cell={hello} filterable={false} /> */}

                {/* <GridColumn
                  title="Active"
                  cell={deleteCell}
                  filterable={false}
                /> */}
                {/* <GridColumn title="Edit" cell={editCell} filterable={false} /> */}
              </Grid>
            )
          : ""}
      </div>
    </>
  );
};

export default Receipt;
