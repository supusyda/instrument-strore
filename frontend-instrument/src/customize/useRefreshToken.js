import { useEffect, useState, CSSProperties } from "react";
import axios from "axios";
import React from "react";

const RefreshToken = (refresh) => {
  let [accessToken, setAccessToken] = useState("");
  let [refreshToken, setRefreshToken] = useState(refresh);

  let refreshTokenURL = "http://localhost:8080/refreshToken";

  useEffect(() => {
    const ourRequest = axios.CancelToken.source();
    let data = async () => {
      try {
        let respones = await axios.get(refreshTokenURL, refreshToken, {
          cancelToken: ourRequest.token,
        });
        setAccessToken(respones.data.accessToken);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("request has been " + error.message);
        } else {
          console.log(error);
        }
      }
    };
    data();
    return () => {
      ourRequest.cancel(); // <-- 3rd step
    };
  }, []);
  return { accessToken };
};
export default RefreshToken;
