import React from "react";
import BottomNav from "../../components/BottomNav/BottomNav";
import Cart from "../../components/Cart/Cart";
import Footer from "../../components/Footer/Footer";
import LandingSidebar from "../../components/LandingSidebar/LandingSidebar";
import Nav from "../../components/Nav/Nav";

const CartPage = () => {
  return (
    <div>
      <LandingSidebar />
      <Nav />
      {/* <BottomNav /> */}
      <Cart />
      <Footer />
    </div>
  );
};

export default CartPage;
