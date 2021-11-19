import React from "react";
import { Link } from "react-router-dom";

const Home = () => {


    return (
        <div>
            <h1 className="p-text-center" style={{ fontSize: "9.5rem", marginBottom: "0" }}>404</h1>
            <h4 className="p-text-center" style={{ fontSize: "2.5rem", marginTop: "0", marginBottom: "2%" }}>Ups! Nešto se dogodilo.</h4>
            <p className="p-text-center" style={{ fontSize: "1.3rem", marginTop: "2%" }} > Pokušavate pristupiti stranici {window.location.pathname} koja nije
                pronađena na serveru. <br />
                Možete se vratiti nazad ili posjetiti <Link to="/"> početnu stranicu</Link>.
            </p>
        </div>
    )
}

export default Home;
