import React from "react";

const Rating = ({ like, dislike }) => {
  return (
    <div className="rating">
      <i class="fal fa-thumbs-up"></i>
      <span>{like && like}</span>
      <i class="fal fa-thumbs-down"></i>
      <span>{dislike && dislike}</span>
    </div>
  );
};

export default Rating;
