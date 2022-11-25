import { useState } from "react";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";

export default function useAuth() {
  const cookies = new Cookies();
  
let checkLogin=()=>{
   
   if(cookies.get("token")) return true;
   else return false;
   
}
  const [isAuth, setIsAuth] = useState(checkLogin);
  function login() {
    setTimeout(() => {
      setIsAuth(true);
    }, 0);
    console.log("login",isAuth);
  }
  function logout() {
    setTimeout(() => {
      setIsAuth(false);
    }, 0);
    console.log(isAuth);
  }
  return [isAuth, login, logout];
}
