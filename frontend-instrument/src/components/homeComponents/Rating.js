import React from "react";

const Rating = ({ text }) => {
  return (
    <div className="rating">
      <div className="rating-icon">
        <i class="fal fa-thumbs-up"></i>
        <span>{text && text}</span>
      </div>
      <div className="rating-icon">
        <i class="fal fa-thumbs-down"></i>
        <span>{text && text}</span>
      </div>
    </div>
  );
};

export default Rating;
