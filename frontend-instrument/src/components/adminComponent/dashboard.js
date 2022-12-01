import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import "./dashboard.css";
import "@progress/kendo-theme-default/dist/all.css";
import useFetch from "../../customize/useFetch";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { UserData as dummyData } from "./dummyData";
import { UserAmount } from "../../services/userService";
import { getIncomeInWeek } from "../../services/recieptService";
import { bestSellerProduct } from "../../services/instrumentService";
const Dashboard = (props) => {
  let [userCount, setUserCount] = useState();
  let [inComeWeek, setInComeWeek] = useState();
  let [bestSeller, setBestSeller] = useState();
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
  useEffect(() => {
    let data = async () => {
      try {
        let amount = await UserAmount();
        let IncomeWeek = await getIncomeInWeek();
        let bestSellerRes = await bestSellerProduct();
        // console.log("amount", amount);
        setUserCount(amount.data.data);
        let total = 0;
        IncomeWeek.data.data.map((item) => {
          total = total + item.total;
        });
        setInComeWeek(total);
        setBestSeller(bestSellerRes.data.data);

        // setInstrument(respones.data.data);
      } catch (error) {
        // console.log(error);
      }
    };
    data();
  }, []);

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
                    <h2 class="card-text">{userCount}</h2>
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
                    <h5 class="card-title">Best Seller</h5>

                    {bestSeller && (
                      <>
                        <h2 class="card-text">{bestSeller.instrument.name}</h2>
                        <h2 class="card-text">Total : {bestSeller.total}</h2>
                      </>
                    )}
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
