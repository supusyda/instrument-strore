import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Link } from "react-router-dom";
import { process } from "@progress/kendo-data-query";
import "@progress/kendo-theme-default/dist/all.css";
import "./product.css";
import useFetch from "../../customize/useFetch";
import { updateProduct } from "../../services/instrumentService";
import CreateProductModal from "./modal/createProduct";

const Product = () => {
  let [productData, setProductData] = useState([]);
  const [dataState, setDataState] = useState({ skip: 0, take: 4 });
  const [result, setResult] = useState(null);
  let [openModal, setopenModal] = useState(false);
  let [isEdit, setIsEdit] = useState(false);
  let [editData, setEditData] = useState({});

  let { res, loading, refesh } = useFetch(
    "http://localhost:8080/api/instrument/get?instrumentID=ALL"
  );
  const onDataStateChange = (event) => {
    setDataState(event.dataState);
    setResult(process(productData, event.dataState));
  };
  const handleToggelproduct = async (instrumentID, isActive) => {
    let dataSend = {
      instrumentID,
      isActive,
    };
    let res = await updateProduct(dataSend);
    console.log(res);
    refesh();
  };
  const handleEditproduct = (productData) => {
    setopenModal(true);
    setEditData(productData);
    setIsEdit(true);
  };
  const deleteCell = (props) => {
    let productID = props.dataItem.id;
    let isActive = props.dataItem.isActive;
    console.log(props.dataItem);
    if (isActive == null) {
      isActive = false;
    }
    return (
      <td>
        {isActive === false && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              handleToggelproduct(productID, true);
            }}
          >
            <span>
              <i className="fas fa-times-octagon"></i>
            </span>
          </button>
        )}
        {isActive === true && (
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              handleToggelproduct(productID, false);
            }}
          >
            <span>
              <i class="fas fa-check"></i>
            </span>
          </button>
        )}
      </td>
    );
  };
  const editCell = (props) => {
    let productData = props.dataItem;
    return (
      <td>
        <button
          type="button"
          class="btn btn-info"
          onClick={() => {
            handleEditproduct(productData);
          }}
        >
          <span>&#9997;</span>
        </button>
      </td>
    );
  };
  const imageCell = (props) => {
    return (
      <td>
        <div
          className="avatar"
          style={{
            backgroundImage: `url(${
              props.dataItem.image ? props.dataItem.image : ""
            })`,
          }}
        ></div>
      </td>
    );
  };
  useEffect(() => {
    if (res.data && res.data.length > 0) {
      setProductData(res.data);
      setResult(process(res.data, dataState));
    }
  }, [res]);
  const hello = (props) => {
    let sold;
    if (props.dataItem.receiptsDetail.length > 0) {
      sold = props.dataItem.receiptsDetail[0].total;
    } else if (props.dataItem.receiptsDetail.length === 0) {
      sold = 0;
    }
    return <td>{sold}</td>;
  };
  const handleCreteProduct = () => {
    setopenModal(true);
  };
  return (
    <>
      <div className="container">
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            handleCreteProduct();
          }}
        >
          <span>Create Product</span>
        </button>
        {openModal ? (
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
        )}
        {result !== null
          ? productData &&
            productData.length > 0 && (
              <Grid
                data={result}
                filterable={true}
                onDataStateChange={(e) => {
                  onDataStateChange(e);
                }}
                pageable={true}
                total={productData.length}
                {...dataState}
              >
                <GridColumn
                  field="image"
                  title="Image"
                  cell={imageCell}
                  filterable={false}
                />
                <GridColumn field="name" title="Instrument Name" />
                <GridColumn field="price" title="Price" filterable={false} />

                <GridColumn field="typeOfInstrument.valueEN" title="Type" />
                <GridColumn field="inStock" title="Amount" />
                <GridColumn title="Has Sold" cell={hello} filterable={false} />

                <GridColumn
                  title="Active"
                  cell={deleteCell}
                  filterable={false}
                />
                <GridColumn title="Edit" cell={editCell} filterable={false} />
              </Grid>
            )
          : ""}
      </div>
    </>
  );
};

export default Product;
