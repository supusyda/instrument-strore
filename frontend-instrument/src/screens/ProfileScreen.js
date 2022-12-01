import React from "react";
import Header from "../components/Header";
import ProfileTabs from "../components/profileComponents/ProfileTabs";
import Orders from "./../components/profileComponents/Orders";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import moment from "moment";
import { editUser } from "../services/userService";

const ProfileScreen = () => {
  const cookies = new Cookies();
  const history = useHistory();
  let [userData, setUserData] = useState(null);
  let [updateSuccess, setUpdateSuccess] = useState(false);
  const encodeImageFileAsURL = async (e) => {
    var file = e;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleChangeAvatar = async (e) => {
    let file = e.target.files;
    if (file.length !== 0) {
      let data = file[0];
      let toBase64 = await encodeImageFileAsURL(data);

      let copyUserdata = { ...userData, image: toBase64 };
      let res = await editUser(copyUserdata);
      setUserData(copyUserdata);
      froceRerender();
    }
  };
  const getUserFormHeader = (dataFromHeader) => {
    setUserData(dataFromHeader);
  };
  const froceRerender = () => {
    setUpdateSuccess(!updateSuccess);
  };

  useEffect(() => {
    if (!cookies.get("token")) {
      history.push("/login");
    }
  }, []);

  window.scrollTo(0, 0);
  return (
    <>
      <Header
        getUserFormHeader={getUserFormHeader}
        // updateSuccess={updateSuccess}
        // setUpdateSuccess={setUpdateSuccess}
        froceRerender={froceRerender}
        updateSuccess={updateSuccess}
      />
      {userData && (
        <div className="container mt-lg-5 mt-3">
          <div className="row align-items-start">
            <div className="col-lg-4 p-0 shadow ">
              <div className="author-card pb-0 pb-md-3">
                <div className="author-card-cover"></div>
                <div className="author-card-profile row">
                  <div className="author-card-avatar col-md-5">
                    <div className="custom-file">
                      <input
                        className=" custom-file-input"
                        id="customFileLang"
                        lang="en"
                        type="file"
                        style={{ color: "transparent", visibility: "hidden" }}
                        onChange={(e) => {
                          handleChangeAvatar(e);
                        }}
                      ></input>
                      <label
                        className=" custom-file-label"
                        htmlFor="customFileLang"
                      >
                        {userData && !userData.image ? (
                          <img src="./images/user.png" alt="userprofileimage" />
                        ) : (
                          <img src={userData.image} alt="userprofileimage" />
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="author-card-details col-md-7">
                    <h5 className="author-card-name mb-2">
                      <strong>{userData && userData.lastName}</strong>
                    </h5>
                    <span className="author-card-position">
                      <>
                        Join at{" "}
                        {moment(userData.createdAt).format("MM/DD/YYYY")}
                      </>
                    </span>
                  </div>
                </div>
              </div>
              <div className="wizard pt-3 ">
                <div class="d-flex align-items-start">
                  <div
                    class="nav align-items-start flex-column col-12 nav-pills me-3 "
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      class="nav-link active"
                      id="v-pills-home-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-home"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-home"
                      aria-selected="true"
                    >
                      Profile Settings
                    </button>
                    <button
                      class="nav-link d-flex justify-content-between"
                      id="v-pills-profile-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#v-pills-profile"
                      type="button"
                      role="tab"
                      aria-controls="v-pills-profile"
                      aria-selected="false"
                    >
                      Orders List
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* panels */}
            <div className="col-lg-8">
              <input type="checkbox" name="open-bar" id="open-bar" />
              <label for="open-bar" class="open-bar">
                <i class="fas fa-bars"></i>
              </label>
              <div
                class="receipt tab-content col-lg-12"
                id="v-pills-tabContent"
              >
                <div
                  class="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <ProfileTabs
                    userData={userData}
                    froceRerender={froceRerender}
                  />
                </div>
                <div
                  class="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  {userData && (
                    <Orders userID={userData.id} userData={userData} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileScreen;
