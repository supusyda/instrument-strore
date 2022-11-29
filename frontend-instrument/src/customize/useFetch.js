import { useEffect, useState, CSSProperties } from "react";
import { useHistory } from "react-router-dom";

import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";

const useFetch = (url) => {
  let [res, setRes] = useState([]);
  let [loading, setLoading] = useState(true);
  let refreshTokenURL = "http://localhost:8080/refreshToken";


  const refreshToken = async (refresh) => {
    let res = await axios.post(refreshTokenURL, {
      refreshToken: refresh,
    });
    console.log(res);
    if (res.data.errCode === 0) {
      console.log("newAccessToken", res);
      return res.data.accessToken;
    }
  };
  const cookies = new Cookies();
  const refesh = () => {
    const ourRequest = axios.CancelToken.source();
    let data = async () => {
      try {
        const axiosJWT = axios.create();
        let token = cookies.get("token");
        let refresh = cookies.get("refresh");
        let newAccessToken;
        axiosJWT.interceptors.request.use(
          async (config) => {
            let currentDate = new Date();
            const decodeToken = jwtDecode(token);
            if (decodeToken.exp * 1000 < currentDate.getTime()) {
              newAccessToken = await refreshToken(refresh);
              config.headers["authorization"] = `Bearer ${newAccessToken}`;
              cookies.set("token", newAccessToken, { path: "/" });
            }
            return config;
          },
          (error) => {
            return Promise.reject(error);
          }
        );
        let respones = await axiosJWT.get(url, {
          cancelToken: ourRequest.token,
          headers: {
            authorization: `Bearer ${cookies.get("token")}`,
          },
        });
        setRes(respones.data);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("request has been " + error.message);
        } else {
          console.log(error);
        }
      }
    };
    data();
  };
  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    let data = async () => {
      try {
        if (cookies.get("refresh")) {
          const axiosJWT = axios.create();
          let token = cookies.get("token");
          let refresh = cookies.get("refresh");
          let newAccessToken;
          axiosJWT.interceptors.request.use(
            async (config) => {
              let currentDate = new Date();
              const decodeToken = jwtDecode(token);
              if (decodeToken.exp * 1000 < currentDate.getTime()) {
                newAccessToken = await refreshToken(refresh);
                config.headers["authorization"] = `Bearer ${newAccessToken}`;
                cookies.set("token", newAccessToken, { path: "/" });
              }
              return config;
            },
            (error) => {
              return Promise.reject(error);
            }
          );
          let respones = await axiosJWT.get(url, {
            cancelToken: ourRequest.token,
            headers: {
              authorization: `Bearer ${cookies.get("token")}`,
            },
          });
          if (respones.data.errCode == 0) {
            console.log("respones", respones);
            setRes(respones.data);
            setLoading(false);
          }
          // else {
          //   alert("login session expired");
          //   history.push("/login");
          // }
        }
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
  return { res, loading, refesh };
};
export default useFetch;
