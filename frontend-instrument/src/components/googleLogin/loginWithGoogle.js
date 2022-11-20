import GoogleLogin from "react-google-login";
import React from "react";
import jwtDecode from "jwt-decode";
const clientID =
  "865988452655-41c4rohrrp90fc36u48178sibfakisqt.apps.googleusercontent.com";
const responseGoogleSuccess = (respone) => {
  // let userGoogleData = jwtDecode(respone.credential);
  console.log(respone);
};
const LoginWithGoogle = () => {
  return (
    <div className="signInbt">
      <GoogleLogin
        client_id="331150503536-q89agkvat7da939thk7ugn0q7fva7og2.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogleSuccess}
        onFailure={responseGoogleSuccess}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </div>
  );
};
export default LoginWithGoogle;
