import Header from "./Header";
import Footer from "./Footer";
import React from "react";
import ReactDOM from "react-dom/client";
import background from "../Components/oilchange1.jpg";

const OilChange = () => {
    return (
        <>
        <Header />
        <div style={{backgroundImage: `url(${background})`, backgroundSize: "stretch", height: "100vh", color: "Black", textAlign: "center"}}>
            <h1>Oil Change Services</h1>
            <p>Welcome to our oil change services page. We offer a variety of oil change options to keep your vehicle running smoothly.</p>
            {/* Add more content and components as needed */}
        </div>
            <Footer />
            </>
            );
        };


export default OilChange;