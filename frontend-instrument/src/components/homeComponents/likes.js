import React, { useState } from "react";
import "./vcl.css";
import { updateInteract } from "../../services/instrumentService";
import Cookies from "universal-cookie";

const LikeButtonCompoent = ({ interact, instrumentID }) => {
  const cookies = new Cookies();
  const checkIsLiked = (interact, userID) => {
    let check = false;
    interact.interactDetails.map((item) => {
      console.log("item.userID", item.userID, "userID", userID);
      if (item.userID == userID) {
        console.log("why not true");
        check = true;
      }
    });
    console.log(check);
    return check;
  };
  let userID = cookies.get("userID");
  const [like, setLike] = useState(interact.likes);
  const [isLike, setIsLike] = useState(checkIsLiked(interact, userID));

  // const [interactData,setInteractData] = {instrumentID:instrumentID,action:""}
  const action = {
    like: "like",
    unlike: "unlike",
  };
  const onLikeButtonClick = async () => {
    console.log(interact);
    setLike(like + (isLike ? -1 : 1));
    updateInteract();
    setIsLike(!isLike);
    let interactData = {
      instrumentID: instrumentID,
      action: !isLike ? action.like : action.unlike,
      userID: userID,
    };
    let res = await updateInteract(interactData);
    console.log(res);
  };
  return (
    <>
      <button
        className={"like-button " + (isLike ? "liked" : "")}
        onClick={onLikeButtonClick}
      >
        {"Like"} | {like}
      </button>
    </>
  );
};

export default LikeButtonCompoent;
