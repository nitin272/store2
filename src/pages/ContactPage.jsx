import React from "react";
import { Footer, Navbar } from "../components";

const ContactPage = () => {
  const handleSendMessage = () => {
    const whatsappNumber = process.env.REACT_APP_WHATSAPP_NUMBER || "9462404021";
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    console.log('WhatsApp Link:', whatsappLink);

    window.open(whatsappLink, '_blank');
  };

  const handleDirections = () => {
    // Replace YOUR_SHOP_ADDRESS with your actual shop address
    const shopAddress = "Sarkari Darwaja, Railway station road, Bhopal-Ganj, Bhilwara, Rajasthan, 311001";
    
    // Open Google Maps with directions to the shop address
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(shopAddress)}`, '_blank');
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Contact Us</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-6 col-lg-6 col-sm-12 mx-auto">
            <h2 className="text-center mb-4">Shop Address</h2>
            <p className="text-center">
              Sarkari Darwaja, Railway station road, Bhopal-Ganj
              <br />
              Bhilwara, Rajasthan, 311001
            </p>
            <div className="text-center">
              {/* Instead of the map, display a message or any other content */}
              
            </div>
            <div className="text-center mt-4">
              <button
                className="my-2 px-4 btn btn-dark"
                type="button"
                onClick={handleSendMessage}
              >
                Contact on WhatsApp
              </button>
              <button
                className="my-2 mx-2 px-4 btn btn-primary"
                type="button"
                onClick={handleDirections}
              >
                Directions on Map
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
