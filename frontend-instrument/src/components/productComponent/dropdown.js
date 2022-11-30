import React from "react";
import Select from "react-select";

const Dropdown = (props) => {
  const { sort, option } = props.dropDownData.action;
  const handleOnClick = (e) => {
    console.log(e.value);
    let dropdownData;
    if (sort === "between") {
      dropdownData = { between: e.value };
    } else if (sort === "value") {
      dropdownData = { value: e.value };
    }

    props.onChangeAllFilterData(dropdownData);
  };

  return (
    <>
      {/* <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {props.dropDownData.display}
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {option.map((item) => {
            return (
              <a
                className="dropdown-item"
                value={item.value}
                onClick={(e) => {
                  handleOnClick(e);
                }}
              >
                {item.lable}
              </a>
            );
          })}
        </div>
      </div> */}
      {console.log(option)}
      <Select
        options={option}
        defaultValue={{ value: null, label: "default" }}
        onChange={(e) => handleOnClick(e)}
      />
    </>
  );
};

export default Dropdown;
