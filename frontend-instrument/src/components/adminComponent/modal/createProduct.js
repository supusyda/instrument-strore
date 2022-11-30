import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userModal.css";
import useFetch from "../../../customize/useFetch";
import Select from "react-select";
import { editUser } from "../../../services/userService";
import { createProduct } from "../../../services/instrumentService";
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

const CreateProductModal = (props) => {
  let [open, setOpen] = useState(true);
  let [allCode, setAllCode] = useState();
  let [selectData, setSelectData] = useState([]);

  let { res, loading } = useFetch(
    "http://localhost:8080/api/allCode/get?type=ALL"
  );
  useEffect(() => {
    let temp = [];
    console.log(res);
    if (res.data) {
      if (res.data.length > 0) {
        setAllCode(res.data);
        console.log("res", res);
        res.data.map((item) => {
          if (item.type === "TYPE") {
            let obj = {
              value: item.keyMap,
              label: item.valueVN,
            };
            temp.push(obj);
          }
        });
        setSelectData(temp);
      }
    }
  }, [res]);
  useEffect(() => {
    if (props.isEdit === true) {
      let copyState = productData;
      copyState.preViewimg = copyState.image;
      console.log("copyState", copyState);
      setProductData(copyState);
    }
  }, []);
  let initUserData = {
    name: "",
    price: "",
    inStock: "",
    type: "",
    image: "",
    musicalInstrumentDetail: "",
  };

  let [productData, setProductData] = useState(
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
      let copyUserdata = {
        ...productData,
        image: toBase64,
        preViewimg: ojbUrl,
      };

      setProductData(copyUserdata);
      console.log(copyUserdata);
    }
  };
  const handleOnChageInput = (e, idAtr) => {
    let copyUserdata = { ...productData };
    console.log(productData);
    copyUserdata[idAtr] = e.target.value;
    console.log(copyUserdata[idAtr]);
    setProductData(copyUserdata);
  };

  const toggle = () => {
    setOpen(!open);
    props.setOpen(!open);
    setProductData({});
    props.setIsEdit(false);
    props.refesh();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let data = productData;
    console.log("data=>", data);
    if (checkValidate(data) === true) {
      if (props.isEdit) {
        let res = await editUser(data);
        console.log("res", res);
      } else {
        data.roleCreate = "admin";
        let res = await createProduct(data);
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
              <Col md="12">
                <FormGroup>
                  <Label>Name</Label>
                  <Input
                    className="form-control-alternative"
                    placeholder="something"
                    type="text"
                    onChange={(e) => {
                      handleOnChageInput(e, "name");
                    }}
                    value={productData.name}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                {" "}
                <Col>
                  <FormGroup>
                    <Label>Price</Label>
                    <Input
                      className=" form-control-alternative"
                      id="exampleFormControlInput1"
                      placeholder=""
                      type="text"
                      onChange={(e) => {
                        handleOnChageInput(e, "price");
                      }}
                      value={productData.price}
                    ></Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>Instock</Label>
                    <Input
                      className=" form-control-alternative"
                      placeholder="Broklen NewYork"
                      type="text"
                      onChange={(e) => {
                        handleOnChageInput(e, "inStock");
                      }}
                      value={productData.inStock}
                    ></Input>
                  </FormGroup>
                </Col>
              </Col>
              <Col md="8">
                <FormGroup>
                  <label for="exampleFormControlTextarea1">Description</label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="7"
                    defaultValue={
                      productData.musicalInstrumentDetail.description
                    }
                    onChange={(e) => {
                      handleOnChageInput(e, "musicalInstrumentDetail");
                    }}
                    // value={productData.description}
                  ></textarea>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="3" className="">
                <Label>Type</Label>
                <FormGroup className=" has-danger border border-dark ">
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    name="color"
                    options={selectData}
                    onChange={(e) => {
                      let copyUserdata = { ...productData };
                      console.log(productData);
                      copyUserdata.type = e.value;
                      console.log(copyUserdata);
                      setProductData(copyUserdata);
                    }}
                  ></Select>
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
                      productData.preViewimg ? productData.preViewimg : ""
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
export default CreateProductModal;
