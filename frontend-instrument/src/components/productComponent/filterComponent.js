import React from "react";
import { Row, Col } from "react-bootstrap";
import Dropdown from "./dropdown";
import CategoryFilter from "./categoryFilter";
import { useState } from "react";
import { useEffect } from "react";
import { getAllCategory } from "../../services/categoryService";

const Filter = (props) => {
  let [categoryData, SetCategoryData] = useState();
  let [allFilterData, setAllFilterData] = useState({});
  let onChangeAllFilterData = (data) => {
    let temp = { ...allFilterData, ...data };
    setAllFilterData(temp);
    props.setDataFromFilter(temp);
    console.log(temp);
  };
  const dropDown = [
    {
      display: "Price",
      action: {
        sort: "between",
        option: [
          { value: { smallNum: 0, bigNum: 100 }, lable: "Under 200$" },
          {
            value: { smallNum: 101, bigNum: 200 },
            lable: "between 100$ and 200$",
          },
          {
            value: { smallNum: 201, bigNum: 500 },
            lable: "between 201$ and 500$",
          },
          {
            value: { smallNum: 500, bigNum: 1000 },
            lable: "between 500$ and 1000$",
          },
        ],
      },
    },
    {
      display: "Sorted by",

      action: {
        sort: "value",
        option: [
          {
            value: {
              field: "price",
              order: "ASC",
            },
            lable: "price ascending ",
          },
          {
            value: {
              field: "price",
              order: "DESC",
            },
            lable: "price descending  ",
          },
          {
            value: {
              field: "name",
              order: "DESC",
            },
            lable: "name from A - Z ",
          },
          {
            value: {
              field: "name",
              order: "DESC",
            },
            lable: "name from Z - A ",
          },
        ],
      },
    },
  ];
  useEffect(() => {
    let data = async () => {
      try {
        let category = await getAllCategory();
        console.log("category", category);
        if (category) {
          SetCategoryData(category.data.data);
        }
      } catch (error) { }
    };
    data();
  }, []);

  return (
    <div className="filter container">
      <div>
        <Row>
          {" "}
          <Col className="d-flex flex-row justify-content-around ">
            <CategoryFilter
              // keyMap={item.keyMap}
              onChangeAllFilterData={onChangeAllFilterData}
            >
              ALL
            </CategoryFilter>
            {categoryData &&
              categoryData.length > 0 &&
              categoryData.map((item) => {
                return (
                  <CategoryFilter
                    keyMap={item.keyMap}
                    onChangeAllFilterData={onChangeAllFilterData}
                  >
                    {item.valueEN}
                  </CategoryFilter>
                );
              })}
          </Col>
        </Row>
      </div>
      <div className="mt-4">
        <Row>
          {dropDown.map((item) => {
            console.log(item);

            return (
              <Col md="2">
                <Dropdown dropDownData={item}></Dropdown>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Filter;
