import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";

const Checkout = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.handleCart);

  const redirectToWhatsApp = () => {
    const orderDetails = formatOrderDetails(cartItems);
    const whatsappURL = `https://wa.me/9413262126?text=${encodeURIComponent(
      orderDetails
    )}`;
    window.location.href = whatsappURL;
  };

  const formatOrderDetails = (items) => {
    return items
      .map((item) => {
        if (item && item.name && item.qty && item.price) {
          return `${item.name} - Qty: ${item.qty} - Price: ${item.price.toFixed(2)}`;
        } else {
          return 'Invalid item';A
        }
      })
      .join("\n");
  };

  const ShowCheckout = () => {
    const { subtotal, totalItems } = calculateOrderTotals(cartItems);

    return (
      <div className="container py-5">
        <div className="row my-4">
          {/* ... Your existing order summary and form ... */}
        </div>
        <hr className="my-4" />
        <button
          className="w-100 btn btn-primary"
          type="button"
          onClick={redirectToWhatsApp}
        >
          Continue to WhatsApp
        </button>
      </div>
    );
  };

  const EmptyCart = () => (
    <div className="container">
      {/* ... Your existing EmptyCart component ... */}
    </div>
  );

  const calculateOrderTotals = (items) => {
    let subtotal = 0;
    let totalItems = 0;

    items.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return { subtotal, totalItems };
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {cartItems.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
