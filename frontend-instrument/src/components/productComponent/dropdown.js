import React from "react";
import Select from "react-select";

const Dropdown = (props) => {
  const { sort, option } = props.dropDownData.action;

  return (
    <>
      <div className="dropdown">
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
              <a className="dropdown-item" href="#">
                Action
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
