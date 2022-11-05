import React from "react";

const Rating = ({ text }) => {
  return (
    <div className="rating">
      <i class="fal fa-thumbs-up"></i>
      <span>{text && text}</span>
      <i class="fal fa-thumbs-down"></i>
      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
