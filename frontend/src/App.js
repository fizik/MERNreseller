import Header from "./components/Header";
import Footer from "./components/Footer";
import Homescreen from "./screens/Homescreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

import { BrowserRouter as Router, Route } from "react-router-dom";
import "./bootstrap.min.css";

import { Container } from "react-bootstrap";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProfileScreen from "./screens/ProfileScreens";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductListScreen from "./screens/ProductlistScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import VendorOrderListScreen from "./screens/VendorOrderListScreen";
import VendorRegistrationScreen from "./screens/VendorRegistrationScreen";
import VendorWiseOrderScreen from "./screens/VendorWiseOrderScreen";
import OrderListScreen from "./screens/OrderLstScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={Homescreen} exact />
          <Route path="/search/:keyword" component={Homescreen} exact />
          <Route path="/page/:pageNumber" component={Homescreen} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={Homescreen}
            exact
          />

          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/shipping" component={ShippingScreen} />
          <Route path="/payment" component={PaymentScreen} />
          <Route path="/placeorder" component={PlaceOrderScreen} />
          <Route path="/order/:id" component={OrderScreen} exact />
          <Route path="/order/vendor/:id" component={VendorWiseOrderScreen} />

          <Route
            path="/admin/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/vendor/productlist"
            component={ProductListScreen}
            exact
          />
          <Route
            path="/vendor/productlist/:pageNumber"
            component={ProductListScreen}
            exact
          />

          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/admin/userlist" component={UserListScreen} />
          <Route path="/admin/user/:id/edit" component={UserEditScreen} />

          <Route path="/admin/orderlist" component={OrderListScreen} />

          <Route path="/vendor/orderlist" component={VendorOrderListScreen} />
          <Route
            path="/vendor/registration"
            component={VendorRegistrationScreen}
          />

          <Route
            path="/admin/product/:id/:userId/edit"
            component={ProductEditScreen}
          />
          <Route
            path="/vendor/product/:id/:userId/edit"
            component={ProductEditScreen}
          />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
