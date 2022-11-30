import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userModal.css";
import useFetch from "../../../customize/useFetch";
import { createUser, editUser } from "../../../services/userService";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
 
  Row,
  Col,
} from "reactstrap";

const CreateUserModal = (props) => {
  let [open, setOpen] = useState(true);
  let [allCode, setAllCode] = useState();

  let { res, loading } = useFetch(
    "http://localhost:8080/api/allCode/get?type=ALL"
  );
  useEffect(() => {
    setAllCode(res.data);
  }, [res]);
  useEffect(() => {
    if (props.isEdit === true) {
      let copyState = userData;
      copyState.preViewimg = copyState.image;
      console.log("copyState", copyState);
      setUserData(copyState);
    }
  }, []);
  let initUserData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    position: "",
    phoneNumber: "",
    image: "",
    preViewimg: "",
  };

  let [userData, setUserData] = useState(
    props.isEdit ? props.editData : initUserData
  );
  const encodeImageFileAsURL = async (e) => {
    var file = e;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleChangeAvatar = async (e) => {
    let file = e.target.files;
    if (file.length !== 0) {
      let data = file[0];
      let toBase64 = await encodeImageFileAsURL(data);
      const ojbUrl = URL.createObjectURL(data);
      let copyUserdata = { ...userData, image: toBase64, preViewimg: ojbUrl };

      setUserData(copyUserdata);
      console.log(copyUserdata);
    }
  };
  const handleOnChageInput = (e, idAtr) => {
    let copyUserdata = { ...userData };
    copyUserdata[idAtr] = e.target.value;
    console.log(copyUserdata[idAtr]);
    setUserData(copyUserdata);
  };

  const toggle = () => {
    setOpen(!open);
    props.setOpen(!open);
    setUserData({});
    props.setIsEdit(false);
    props.refesh();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let data = userData;
    console.log("data=>", data);
    if (checkValidate(data) === true) {
      if (props.isEdit) {
        let res = await editUser(data);
        console.log("res", res);
      } else {
        data.roleCreate = "admin";
        let res = await createUser(data);
      }
      console.log(res);
      toggle();
    } else {
      alert("not full info");
    }
  };
  const checkValidate = (data) => {
    for (let k in data) {
      if (data[k] === "") {
        return false;
      }
    }
    return true;
  };

  return (
    <>
      <Modal isOpen={open} toggle={toggle} backdrop="static" size="lg">
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <Row>
              <Col md="3">
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    className="form-control-alternative"
                    placeholder="Nguyen"
                    type="text"
                    onChange={(e) => {
                      handleOnChageInput(e, "firstName");
                    }}
                    value={userData.firstName}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    className="form-control-alternative"
                    placeholder="Duy"
                    type="text"
                    onChange={(e) => {
                      handleOnChageInput(e, "lastName");
                    }}
                    value={userData.lastName}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    className=" form-control-alternative"
                    placeholder="name@example.com"
                    type="email"
                    onChange={(e) => {
                      handleOnChageInput(e, "email");
                    }}
                    value={userData.email}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input
                    className=" form-control-alternative"
                    id="exampleFormControlInput1"
                    placeholder="09xxxxxxxxxxxx"
                    type="text"
                    onChange={(e) => {
                      handleOnChageInput(e, "phoneNumber");
                    }}
                    value={userData.phoneNumber}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Address</Label>
                  <Input
                    className=" form-control-alternative"
                    placeholder="Broklen NewYork"
                    type="text"
                    onChange={(e) => {
                      handleOnChageInput(e, "address");
                    }}
                    value={userData.address}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              {props.isEdit === false && (
                <Col md="6">
                  <FormGroup className=" has-success">
                    {/* <Input
                  className=" form-control-alternative is-valid"
                  placeholder="Success"
                  type="text"
                ></Input> */}
                    <Label>Password</Label>
                    <Input
                      className=" form-control-alternative"
                      placeholder="************"
                      type="password"
                      onChange={(e) => {
                        handleOnChageInput(e, "password");
                      }}
                      value={userData.password}
                    ></Input>
                  </FormGroup>
                </Col>
              )}

              <Col md="3" className="">
                <FormGroup className=" has-danger border border-dark ">
                  <Label>Gender</Label>
                  {/* <Input
                  className=" form-control-alternative is-invalid"
                  placeholder="Error Input"
                  type="email"
                ></Input> */}
                  {allCode &&
                    allCode.map((item) => {
                      if (item.type === "GENDER")
                        return (
                          <div className="custom-control custom-radio mb-3 ">
                            <input
                              type="radio"
                              id={item.id}
                              name={item.type}
                              value={item.keyMap}
                              className="custom-control-input"
                              onChange={(e) => {
                                handleOnChageInput(e, "gender");
                              }}
                              checked={
                                item.keyMap === userData.gender ? "checked" : ""
                              }
                            />
                            <label
                              className="custom-control-label"
                              for={item.id}
                            >
                              {item.valueVN}
                            </label>
                          </div>
                        );
                    })}
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup className=" has-danger border border-dark">
                  <Label>Role</Label>

                  {allCode &&
                    allCode.map((item) => {
                      if (item.type === "ROLE")
                        return (
                          <div className="custom-control custom-radio mb-3 ">
                            <input
                              type="radio"
                              id={item.id}
                              name={item.type}
                              value={item.keyMap}
                              className="custom-control-input"
                              onChange={(e) => {
                                handleOnChageInput(e, "position");
                              }}
                              checked={
                                item.keyMap === userData.position
                                  ? "checked"
                                  : ""
                              }
                            />
                            <label
                              className="custom-control-label"
                              for={item.id}
                            >
                              {item.valueVN}
                            </label>
                          </div>
                        );
                    })}
                </FormGroup>
              </Col>
            </Row>
            <Row className="preViewImg-contain">
              <Col md="6">
                <FormGroup>
                  <div className=" custom-file">
                    <input
                      className=" custom-file-input"
                      id="customFileLang"
                      lang="en"
                      type="file"
                      onChange={(e) => {
                        handleChangeAvatar(e);
                      }}
                    ></input>
                    <label
                      className=" custom-file-label"
                      htmlFor="customFileLang"
                    >
                      Select file
                    </label>
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <div
                  className="preViewImg h-100 rounded-circle"
                  style={{
                    backgroundImage: `url(${
                      userData.preViewimg ? userData.preViewimg : ""
                    })`,
                    background: "round",
                  }}
                ></div>
              </Col>
            </Row>
            <Button type="submit">{props.isEdit ? "Edit" : "Sumit"}</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default CreateUserModal;
