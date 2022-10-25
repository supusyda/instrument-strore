import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import "./dashboard.css";
import "@progress/kendo-theme-default/dist/all.css";
import useFetch from "../../customize/useFetch";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData as dummyData } from "./dummyData";

const Dashboard = (props) => {
  let [userData, setUserData] = useState({
    labels: dummyData.map((data) => data.year),
    datasets: [
      {
        label: "cc",
        data: dummyData.map((data) => data.userGain),
        borderColor: "pink",
      },
    ],
  });
  return (
    <>
      <div className="dashboard container">
        <div className="row ">
          <div className="col-6 d-flex flex-wrap justify-content-space-evenly gap-2">
            <div className="col-md-4 d-flex justify-content-center">
              <div
                class="card  shadow p-3  bg-body rounded"
                style={{
                  width: "18rem",
                }}
              >
                <div class="row no-gutters">
                  <div
                    class="col-md-4 bg-success p-2 text-white bg-opacity-75"
                    style={{
                      background: "round",
                    }}
                  ></div>
                  <div class="col-md-8">
                    <h5 class="card-title">Top Seller</h5>
                    <h2 class="card-text">19</h2>
                    <p class="card-text">
                      <small class="text-muted text-wrap">
                        Last updated 3 mins ago
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <div
                class="card  shadow p-3  bg-body rounded"
                style={{
                  width: "18rem",
                }}
              >
                <div class="row no-gutters">
                  <div
                    class="col-md-4 bg-success p-2 text-white bg-opacity-75"
                    style={{
                      background: "round",
                    }}
                  ></div>
                  <div class="col-md-8">
                    <h5 class="card-title">Card title</h5>
                    <h2 class="card-text">19</h2>
                    <p class="card-text">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-100"></div>
            <div className="col-md-4 d-flex justify-content-center">
              <div
                class="card  shadow p-3 bg-body rounded"
                style={{
                  width: "18rem",
                }}
              >
                <div class="row no-gutters">
                  <div
                    class="col-md-4 bg-success p-2 text-white bg-opacity-75"
                    style={{
                      background: "round",
                    }}
                  ></div>
                  <div class="col-md-8">
                    <h5 class="card-title">Card title</h5>
                    <h2 class="card-text">19</h2>
                    <p class="card-text">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <div
                class="card  shadow p-3  bg-body rounded"
                style={{
                  width: "18rem",
                }}
              >
                <div class="row no-gutters">
                  <div
                    class="col-md-4 bg-success p-2 text-white bg-opacity-75"
                    style={{
                      background: "round",
                    }}
                  ></div>
                  <div class="col-md-8">
                    <h5 class="card-title">Card title</h5>
                    <h2 class="card-text">19</h2>
                    <p class="card-text">
                      <small class="text-muted">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col ">
            <div class="card w-100 mb-3 shadow mb-5 bg-body rounded">
              <div class="card-header">Quote</div>
              <div class="card-body">
                <Line data={userData} />
              </div>
            </div>
          </div>
          <div className="col">
            <div class="card w-100 mb-3 shadow  mb-5 bg-body rounded">
              <div class="card-header">Quote</div>
              <div class="card-body">
                <Bar data={userData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
