import React, { useContext } from "react";

const Home = () => {


    return (
        <div>
            <h1 className="p-text-center" style={{ fontSize: "9.5rem", marginBottom: "0" }}>404</h1>
            <h4 className="p-text-center" style={{ fontSize: "2.5rem", marginTop: "0", marginBottom: "2%" }}>Page not found</h4>
            <p className="p-text-center" style={{ fontSize: "1.3rem", marginTop: "2%" }} > The requested URL {window.location.pathname} was not found on this server.</p>
        </div>
    )
}

export default Home;
