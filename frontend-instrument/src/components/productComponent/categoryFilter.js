import React from "react";
import { useState } from "react";

const CategoryFilter = (props) => {
  const handleOnClick = (e) => {
    let CategoryFilter = { type: e.target.value };
    props.onChangeAllFilterData(CategoryFilter);
  };
  return (
    <>
      <button
        type="button"
        class="btn btn-outline-dark btn-lg"
        name="type"
        value={props.keyMap ? props.keyMap : ""}
        onClick={(e) => {
          handleOnClick(e);
        }}
      >
        {props.children}
      </button>

      {/* <input
        type="radio"
        class="btn-check"
        name="options-outlined"
        id={props.keyMap}
        autocomplete="off"
        value={props.keyMap}
      />
      <label class="btn btn-outline-success" for={props.keyMap}>
        Checked success radio
      </label> */}
    </>
  );
};

export default CategoryFilter;
