import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";
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

  const [dataState, setDataState] = useState({ skip: 0, take: 4 });
  const [result, setResult] = useState(null);
  useEffect(() => {
    setUserData(res.data);
    if (res.data && res.data.length > 0) {
      setResult(process(res.data, dataState));
    }
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
  const onDataStateChange = (event) => {
    setDataState(event.dataState);
    setResult(process(userData, event.dataState));
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
        {console.log(result)}
        {result !== null
          ? userData &&
            userData.length > 0 && (
              <Grid
                data={result}
                filterable={true}
                onDataStateChange={(e) => {
                  onDataStateChange(e);
                }}
                pageable={true}
                total={userData.length}
                {...dataState}
              >
                <GridColumn
                  field="image"
                  title="Image"
                  cell={imageCell}
                  filterable={false}
                />
                <GridColumn field="firstName" title="First Name" />
                <GridColumn field="lastName" title="Last Name" />

                <GridColumn field="position" title="Role" />
                <GridColumn title="Del" cell={deleteCell} filterable={false} />
                <GridColumn title="Edit" cell={editCell} filterable={false} />
              </Grid>
            )
          : ""}

        {/* <GridColumn field="Category.CategoryName" title="CategoryName" />
        <GridColumn field="UnitPrice" title="Price" />
        <GridColumn field="UnitsInStock" title="In stock" /> */}
      </div>
    </>
  );
};

export default Users;
