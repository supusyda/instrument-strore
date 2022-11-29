import React, { useEffect, useState } from "react";

import "./userModal.css";
import useFetch from "../../../customize/useFetch";
import Select from "react-select";
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
import {
  updateCategory,
  createNewCategory,
} from "../../../services/categoryService";
const CreateCategoryModal = (props) => {
  let [open, setOpen] = useState(true);
  let [allCode, setAllCode] = useState();

  let { res, loading } = useFetch(
    "http://localhost:8080/api/allCode/get?type=ALL"
  );
  useEffect(() => {
    console.log(res);
    if (res.data) {
      if (res.data.length > 0) {
        setAllCode(res.data);
      }
    }
  }, [res]);

  let initUserData = {
    keyMap: "",
    valueEN: "",
    isActive: 0,
  };

  let [typeData, setTypeData] = useState(
    props.isEdit ? props.editData : initUserData
  );

  const handleOnChageInput = (e, idAtr) => {
    let copyUserdata = { ...typeData };
    copyUserdata[idAtr] = e.target.value;
    console.log(copyUserdata);
    setTypeData(copyUserdata);
  };

  const toggle = () => {
    setOpen(!open);
    props.setOpen(!open);
    setTypeData({});
    props.setIsEdit(false);
    props.refesh();
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let data = typeData;
    console.log("data=>", data);
    if (checkValidate(data) === true) {
      if (props.isEdit) {
        let res = await updateCategory(data);
        console.log("res", res);
        if (res.data.errCode == -2) {
          alert("keyMap or Name already exist ");
        } else if (res.data.errCode == 0) {
          toggle();
        }
      } else {
        let res = await createNewCategory(data);
        console.log("res", res);
        if (res.data.errCode == -2) {
          alert("keyMap or Name already exist ");
        } else if (res.data.errCode == 0) {
          toggle();
        }
      }
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
      <Modal isOpen={open} toggle={toggle} backdrop="static" size="sm">
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <Row>
              <Col md="12">
                <FormGroup>
                  <Label>KeyMap</Label>
                  <Input
                    className="form-control-alternative"
                    placeholder="PIA"
                    type="text"
                    onChange={(e) => {
                      handleOnChageInput(e, "keyMap");
                    }}
                    value={typeData.keyMap}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Label>Category Name</Label>
                  <Input
                    className="form-control-alternative"
                    placeholder="Piano"
                    type="text"
                    onChange={(e) => {
                      handleOnChageInput(e, "valueEN");
                    }}
                    value={typeData.valueEN}
                  ></Input>
                </FormGroup>
              </Col>
            </Row>

            <Button type="submit">{props.isEdit ? "Edit" : "Sumit"}</Button>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};
export default CreateCategoryModal;
