import React, { useEffect, useState } from "react";
import { Form } from "reactstrap";
import { editUser } from "../../services/userService";
const ProfileTabs = (props) => {
  let [userData, setUserData] = useState(props.userData ? props.userData : {});

  const handleInput = (index, data) => {
    let tempData = { ...userData };
    tempData[index] = data;
    setUserData(tempData);
    console.log("tempData", tempData);
  };
  let handleUpdate = async (event) => {
    event.preventDefault();
    let res = await editUser(userData);
    if (res.data.errCode === 0) {
      props.froceRerender();
      alert("Success update");
    } else {
      console.log("fail", res.data);
    }
  };
  useEffect(() => {
    setUserData(props.userData);

    return () => {};
  }, [props.userData]);

  return (
    <>
      <Form className="row  form-container" onSubmit={handleUpdate}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">UserName</label>
            <input
              className="form-control"
              type="text"
              required
              onChange={(e) => {
                handleInput("lastName", e.target.value);
              }}
              value={userData && userData.lastName}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail </label>
            <input
              className="form-control"
              type="email"
              onChange={(e) => {
                handleInput("email", e.target.value);
              }}
              value={userData && userData.email}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Address</label>
            <input
              className="form-control"
              type="text"
              required
              onChange={(e) => {
                handleInput("address", e.target.value);
              }}
              value={userData && userData.address}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Phone Number</label>
            <input
              className="form-control"
              type="text"
              required
              onChange={(e) => {
                handleInput("phoneNumber", e.target.value);
              }}
              value={userData && userData.phoneNumber}
            />
          </div>
        </div>

        <button type="submit">Update Profile</button>
      </Form>
    </>
  );
};

export default ProfileTabs;
