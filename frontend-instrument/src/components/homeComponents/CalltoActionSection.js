import React from "react";
import { Link } from "react-router-dom";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Subscribe now !!!</h2>
              <p>Sign up free and become a member.</p>
              <Link to="/register" > 
                <button>Sign up now</button>
              </Link>
              {/* <form className="form-section">
                <input className="signup-buttton" value="Sign up now" name="subscribe" type="submit" />
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
