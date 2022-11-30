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
          { value: null, label: "Default" },
          { value: { smallNum: 1, bigNum: 100 }, label: "Under 100$" },
          {
            value: { smallNum: 101, bigNum: 200 },
            label: "Between 100$ and 200$",
          },
          {
            value: { smallNum: 201, bigNum: 500 },
            label: "Between 201$ and 500$",
          },
          {
            value: { smallNum: 500, bigNum: 1000 },
            label: "Between 500$ and 1000$",
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
            value: null,
            label: "Default",
          },
          {
            value: {
              field: "price",
              order: "ASC",
            },
            label: "Price Ascending ",
          },
          {
            value: {
              field: "price",
              order: "DESC",
            },
            label: "Price Descending  ",
          },
          {
            value: {
              field: "name",
              order: "DESC",
            },
            label: "Name From A - Z ",
          },
          {
            value: {
              field: "name",
              order: "DESC",
            },
            label: "Name From Z - A ",
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
      } catch (error) {}
    };
    data();
  }, []);

  return (
    <div className="filter container">
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
      <Row>
        {dropDown.map((item) => {
          console.log(item);

          return (
            <Col md="2">
              <Dropdown
                dropDownData={item}
                onChangeAllFilterData={onChangeAllFilterData}
              ></Dropdown>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Filter;
