import React, { useEffect, useState } from "react";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { Link } from "react-router-dom";

import "./product.css";
import "@progress/kendo-theme-default/dist/all.css";
import useFetch from "../../customize/useFetch";
const Product = () => {
  return (
    <>
      <div class="container">
        <div class="row tm-content-row">
          <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 tm-block-col">
            <div class="table-container">
              <div class="tm-product-table-container">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">&nbsp;</th>
                      <th scope="col">PRODUCT NAME</th>
                      <th scope="col">UNIT SOLD</th>
                      <th scope="col">IN STOCK</th>
                      <th scope="col">EXPIRE DATE</th>
                      <th scope="col">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"><input type="checkbox" /></th>
                      <td class="tm-product-name">Lorem Ipsum Product 1</td>
                      <td>1,450</td>
                      <td>550</td>
                      <td>28 March 2019</td>
                      <td>
                        <a href="#">
                          <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><input type="checkbox" /></th>
                      <td class="tm-product-name">Lorem Ipsum Product 2</td>
                      <td>1,250</td>
                      <td>750</td>
                      <td>21 March 2019</td>
                      <td>
                        <a href="#">
                          <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><input type="checkbox" /></th>
                      <td class="tm-product-name">Lorem Ipsum Product 3</td>
                      <td>1,100</td>
                      <td>900</td>
                      <td>18 Feb 2019</td>
                      <td>
                        <a href="#">
                          <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><input type="checkbox" /></th>
                      <td class="tm-product-name">Lorem Ipsum Product 4</td>
                      <td>1,400</td>
                      <td>600</td>
                      <td>24 Feb 2019</td>
                      <td>
                        <a href="#">
                          <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><input type="checkbox" /></th>
                      <td class="tm-product-name">Lorem Ipsum Product 5</td>
                      <td>1,800</td>
                      <td>200</td>
                      <td>22 Feb 2019</td>
                      <td>
                        <a href="#">
                          <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><input type="checkbox" /></th>
                      <td class="tm-product-name">Lorem Ipsum Product 6</td>
                      <td>1,000</td>
                      <td>1,000</td>
                      <td>20 Feb 2019</td>
                      <td>
                        <a href="#">
                          <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><input type="checkbox" /></th>
                      <td class="tm-product-name">Lorem Ipsum Product 7</td>
                      <td>500</td>
                      <td>100</td>
                      <td>10 Feb 2019</td>
                      <td>
                        <a href="#">
                          <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><input type="checkbox" /></th>
                      <td class="tm-product-name">Lorem Ipsum Product 8</td>
                      <td>1,000</td>
                      <td>600</td>
                      <td>08 Feb 2019</td>
                      <td>
                        <a href="#">
                          <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><input type="checkbox" /></th>
                      <td class="tm-product-name">Lorem Ipsum Product 9</td>
                      <td>1,200</td>
                      <td>800</td>
                      <td>24 Jan 2019</td>
                      <td>
                        <a href="#">
                          <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><input type="checkbox" /></th>
                      <td class="tm-product-name">Lorem Ipsum Product 10</td>
                      <td>1,600</td>
                      <td>400</td>
                      <td>22 Jan 2019</td>
                      <td>
                        <a href="#">
                          <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><input type="checkbox" /></th>
                      <td class="tm-product-name">Lorem Ipsum Product 11</td>
                      <td>2,000</td>
                      <td>400</td>
                      <td>21 Jan 2019</td>
                      <td>
                        <a href="#">
                          <i class="far fa-trash-alt tm-product-delete-icon"></i>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* <!-- table container --> */}
              <div className="option-product-bar">
                <a
                  href="add-product.html"
                  class="btn btn-primary btn-block text-uppercase">Add new product</a>
                <button class="btn btn-primary btn-block text-uppercase">
                  Delete selected products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Product;
