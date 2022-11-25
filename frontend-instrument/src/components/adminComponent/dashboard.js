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
          <div className="card-list col-12 d-flex flex-wrap">
            <div className="col-md-4 d-flex justify-content-center">
              <div
                class="card  shadow p-3  bg-body rounded"
                style={{
                  width: "18rem",
                }}
              >
                <div class="row no-gutters">
                  <div
                    class="card-icon col-md-4"
                    style={{
                      background: "round",
                    }}
                  >
                    <i class="fas fa-users"></i>
                  </div>
                  <div class="col-md-8">
                    <h5 class="card-title">Clients</h5>
                    <h2 class="card-text">519</h2>
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
                    class="card-icon col-md-4"
                    style={{
                      background: "round",
                    }}
                  >
                    <i class="fas fa-coins"></i>
                  </div>
                  <div class="col-md-8">
                    <h5 class="card-title">Sale</h5>
                    <h2 class="card-text">$ 7567</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              <div
                class="card  shadow p-3 bg-body rounded"
                style={{
                  width: "18rem",
                }}
              >
                <div class="row no-gutters">
                  <div
                    class="card-icon col-md-4"
                    style={{
                      background: "round",
                    }}
                  >
                    <i class="fas fa-chart-line"></i>
                  </div>
                  <div class="col-md-8">
                    <h5 class="card-title">Performance</h5>
                    <h2 class="card-text">234%</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12 ">
            <div class="card w-100 mb-3 shadow mb-5 bg-body rounded">
              <div class="card-header">Quote</div>
              <div class="card-body">
                <Line data={userData} />
              </div>
            </div>
          </div>
          <div className="col-12">
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
