import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";

import "@progress/kendo-theme-default/dist/all.css";
import useFetch from "../../customize/useFetch";
import CreateUserModal from "./modal/createUserModal";
import "./user.css";
import { deleUser } from "../../services/userService";
const Users = () => {
  let [userData, setUserData] = useState([]);
  let [openModal, setopenModal] = useState(false);
  let [isEdit, setIsEdit] = useState(false);
  let [editData, setEditData] = useState({});
  let { res, loading, refesh } = useFetch(
    "http://localhost:8080/api/user/get?userID=ALL"
  );
  useEffect(() => {
    setUserData(res.data);
  }, [res]);
  const handleDeleUser = async (id) => {
    let res = await deleUser(id);
    refesh();
    console.log("deleUser=>", res);
  };
  const handleEditUser = (userData) => {
    setopenModal(true);
    setEditData(userData);
    setIsEdit(true);
  };
  const deleteCell = (props) => {
    let userID = props.dataItem.id;
    return (
      <td>
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => {
            handleDeleUser(userID);
          }}
        >
          <span>&#10060;</span>
        </button>
      </td>
    );
  };
  const editCell = (props) => {
    let userData = props.dataItem;
    return (
      <td>
        <button
          type="button"
          class="btn btn-info"
          onClick={() => {
            handleEditUser(userData);
          }}
        >
          <span>&#9997;</span>
        </button>
      </td>
    );
  };
  const imageCell = (props) => {
    // let userIMG = "";
    // if (props.dataItem.image) {
    //   userIMG = new Buffer(props.dataItem.image, "base64").toString("binary");
    //   // console.log(userIMG);
    // }
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
  const handleCreteUser = () => {
    setopenModal(true);
  };
  return (
    <>
      <div className="container">
        <div className="create btn">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              handleCreteUser();
            }}
          >
            <span>Create user</span>
          </button>
          {openModal ? (
            <CreateUserModal
              isOpen={openModal}
              setOpen={setopenModal}
              refesh={refesh}
              editData={editData}
              isEdit={isEdit}
              setIsEdit={setIsEdit}
            ></CreateUserModal>
          ) : (
            ""
          )}
        </div>
        {userData && (
          <Grid data={userData}>
            <GridColumn field="image" title="Image" cell={imageCell} />
            <GridColumn field="firstName" title="First Name" />
            <GridColumn field="lastName" title="Last Name" />

            <GridColumn field="position" title="Role" />
            <GridColumn title="Del" cell={deleteCell} />
            <GridColumn title="Edit" cell={editCell} />
          </Grid>
        )}

        {/* <GridColumn field="Category.CategoryName" title="CategoryName" />
        <GridColumn field="UnitPrice" title="Price" />
        <GridColumn field="UnitsInStock" title="In stock" /> */}
      </div>
    </>
  );
};

export default Users;
