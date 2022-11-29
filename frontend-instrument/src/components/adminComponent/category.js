import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Link } from "react-router-dom";
import { process } from "@progress/kendo-data-query";
import "@progress/kendo-theme-default/dist/all.css";
import "./product.css";
import useFetch from "../../customize/useFetch";
import { createNewCategory,updateCategory } from "../../services/categoryService";
import CreateCategoryModal from "./modal/createCategory.js";

const Category = () => {
  let [categoryData, setCategoryData] = useState([]);
  const [dataState, setDataState] = useState({ skip: 0, take: 4 });
  const [result, setResult] = useState(null);
  let [openModal, setopenModal] = useState(false);
  let [isEdit, setIsEdit] = useState(false);
  let [editData, setEditData] = useState({});

  let { res, loading, refesh } = useFetch(
    "http://localhost:8080/api/allCode/get?type=TYPE"
  );
  const onDataStateChange = (event) => {
    setDataState(event.dataState);
    setResult(process(categoryData, event.dataState));
  };
  const handleToggelCategory = async (typeKeyMap, isActive) => {
    let dataSend = {
      typeKeyMap,
      isActive,
    };
    let res = await updateCategory(dataSend);
    console.log(res);
    refesh();
  };
  const handleEditCateGory = (categoryData) => {
    setopenModal(true);
    setEditData(categoryData);
    setIsEdit(true);
  };
  const deleteCell = (props) => {
    let id = props.dataItem.id;
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
              handleToggelCategory(id, true);
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
              handleToggelCategory(id, false);
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
    let categoryData = props.dataItem;
    return (
      <td>
        <button
          type="button"
          class="btn btn-info"
          onClick={() => {
            handleEditCateGory(categoryData);
          }}
        >
          <span>&#9997;</span>
        </button>
      </td>
    );
  };

  useEffect(() => {
    if (res.data && res.data.length > 0) {
      setCategoryData(res.data);
      setResult(process(res.data, dataState));
    }
  }, [res]);

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
          <CreateCategoryModal
            isOpen={openModal}
            setOpen={setopenModal}
            refesh={refesh}
            editData={editData}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          ></CreateCategoryModal>
        ) : (
          ""
        )}
        {result !== null
          ? categoryData &&
            categoryData.length > 0 && (
              <Grid
                data={result}
                filterable={true}
                onDataStateChange={(e) => {
                  onDataStateChange(e);
                }}
                pageable={true}
                total={categoryData.length}
                {...dataState}
              >
                <GridColumn field="keyMap" title="KeyMap" />
                <GridColumn field="valueEN" title="valueEN" />

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

export default Category;
