import React from "react";

const Rating = ({ like, dislike }) => {
  return (
    <div className="rating">
      <div className="rating-icon">
        <i class="fal fa-thumbs-up"></i>
      <span>{like && like}</span>
      <i class="fal fa-thumbs-down"></i>
      <span>{dislike && dislike}</span>
      </div>

    </div>
  );
};

export default Rating;
