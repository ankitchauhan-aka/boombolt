import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Header1 from "./components/Header1";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";
import DashboardScreen from "./screens/DashboardScreen";
import AddressBook from "./screens/addressBook";
import ChangePassword from "./screens/ChangePassword";
import UploadImage from "./screens/UploadImage";
import Address from "./screens/Address";
import Cart from "./screens/Cart";
import Wishlist from "./screens/Wishlist";
import Payment from "./screens/Payment";
import ProductCatalouge from "./screens/ProductCatalouge";
import ProductDetail from "./screens/ProductDetail";
import CategoryProductScreen from "./screens/CategoryProductScreen";
import ContactUs from "./screens/ContactUs";
import EditDetail from "./screens/EditDetail";
import SearchScreen from "./screens/SearchScreen";
import EmailValidationScreen from "./screens/EmailValidation";
import AllEventScreen from "./screens/allEvent";
import SingleEventScreen from "./screens/SingleEvent";
import RatingsReview from "./components/RatingsReview";
import ScrollToTop from "./components/scrollToTop";
import OrderConfirmation from "./screens/OrderConfirmation";
import AllOrders from "./screens/allOrders";
import CommPreference from "./screens/CommunicationPreference";
import JoinWolfPack from "./screens/Wolfpack";
import WolfPackOrderConfirmation from "./screens/WolfpackOrderConfirmation";
import ForgotPassword from "./screens/ForgotPassword";
import TrackOrder from "./screens/TrackOrder";

const App = ({ history }) => {
  return (
    <Router>
      <ScrollToTop />
      {/* <Header /> */}
      {/* <Header1 /> */}
      <main className="">
        <div>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/signup" component={SignUpScreen} exact />
          <Route path="/login" component={SignInScreen} exact />
          <Route path="/dashboard" component={DashboardScreen} exact />
          <Route path="/address-book" component={AddressBook} exact />
          <Route path="/address-book/:addressId" component={Address} exact />
          <Route path="/changePassword" component={ChangePassword} exact />
          <Route path="/forgotPassword" component={ForgotPassword} exact />

          <Route path="/editDetail/:id" component={EditDetail} exact />
          <Route path="/allProducts" component={SearchScreen} exact />
          <Route path="/allProducts/:slug" component={SearchScreen} exact />
          <Route path="/cart/" component={Cart} exact />
          <Route path="/wishlist" component={Wishlist} exact />
          <Route path="/address" component={Address} exact />
          <Route path="/emailValidation" component={EmailValidationScreen} />
          <Route path="/productcatalouge" component={ProductCatalouge} exact />
          <Route path="/search/:keyword" component={ProductCatalouge} exact />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={ProductCatalouge}
            exact
          />
          <Route path="/allEvent" component={AllEventScreen} exact />
          <Route path="/singleEvent/:id" component={SingleEventScreen} exact />
          <Route
            path="/writereview/:order/:product"
            component={RatingsReview}
            exact
          />
          <Route
            path="/orderConfirmation/:id"
            component={OrderConfirmation}
            exact
          />
          <Route path="/allOrders/" component={AllOrders} exact />
          <Route
            path="/communication_preference/"
            component={CommPreference}
            exact
          />
          <Route path="/wolfpack/" component={JoinWolfPack} exact />
          <Route
            path="/wolfpackOrderConfirmation/:id"
            component={WolfPackOrderConfirmation}
            exact
          />
          <Route
            path="/productcatalouge/:slug"
            component={ProductCatalouge}
            exact
          />
          <Route path="/productdetail" component={ProductDetail} exact />
          <Route path="/productdetail/:slug" component={ProductDetail} exact />
          <Route
            path="/productcatalouge/:slug/page/:pageNumber"
            component={ProductCatalouge}
            exact
          />
          <Route
            path="/productcatalouge/page/:pageNumber"
            component={ProductCatalouge}
            exact
          />
          <Route path="/contact-us" component={ContactUs} exact />
          <Route path="/TrackOrder/:awb" component={TrackOrder} exact />
          <Route path="/payment" component={Payment} exact />
          <Route
            path="/category/:slug"
            component={CategoryProductScreen}
            exact
          />
          <Route path="/uploadImage" component={UploadImage} exact />
        </div>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
