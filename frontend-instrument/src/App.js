import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import AdminPage from "./admin/adminHome";
import ForgotPass from "./screens/ForgotPass";
import ResetPass from "./screens/resetPass";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ProductScreen from "./screens/ProductScreen";
import { ProtectedRoute } from "./protected.route";
import useAuth from "./customize/useAuth";
const App = () => {
  // const [isAuth, login, logout] = useAuth();
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AWYPe8jSULQnrvMhGWSnFsnGGOrDOMt4ce8lRh2ijcR4E22WkcIopi1i6u9I2AZQ8WZV7sr4tfmcA7-w",
      }}
    >
      <Router>
        <Switch>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/products/:id" component={SingleProduct} />
          <Route
            path="/login"
            render={(props) => {
              return <Login {...props}></Login>;
            }}
          />
          <Route path="/register" component={Register} />
          {/* <ProtectedRoute
            path="/profile"
            component={ProfileScreen}
            isAuth={isAuth}
          /> */}
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          {/* <Route path="/payment" component={PaymentScreen} /> */}
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order" component={OrderScreen} />
          <Route path="/shopsection/:q?" component={ProductScreen} />

          {/* <ProtectedRoute
            exact
            path="/admin"            component={AdminPage}
            isAuth={isAuth}
          /> */}
          <Route path="/forgotpass" component={ForgotPass} />
          <Route path="/resetpass/:id/:token" component={ResetPass} />

          <Route path="/admin" component={AdminPage} />
          <Route path="*" component={NotFound} />
          {/* <Route path="/allproducts" component={ProductScreen} /> */}
          {/* <Route path="/about" component={AboutSection}/> */}
          {/* <Route path="/review" component={Review} /> */}
        </Switch>
      </Router>
    </PayPalScriptProvider>
  );
};

export default App;
