import React from "react";
import {Card} from "primereact/card";
import { useState } from "react";
import { useEffect } from "react";
import {useHistory} from 'react-router-dom';

function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
	  width,
	  height
	};
  }
  
  export function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
	useEffect(() => {
	  function handleResize() {
		setWindowDimensions(getWindowDimensions());
	  }
  
	  window.addEventListener('resize', handleResize);
	  return () => window.removeEventListener('resize', handleResize);
	}, []);
  
	return windowDimensions;
  }

const Home = () => {
	const history = useHistory();
	const {width, height} = useWindowDimensions();
	return (
		// <div className="mainView shape">
			<Card className="ad-container">

				<div className="flex justify-content-center align-self-center grid">
					<div className="lg:col-2 md:col-2 sm:col-12">
						tu bi ja filtere
					</div>

					<div className="lg:col-8 md:col-8 sm:col-12">
						<h1 className="title p-mb-5" >Odaberite kategoriju</h1>
						{width > 700 &&
						<div className="p-grid center">
							<div className="p-col-4">
								<h3>Forum</h3>
								<i className="pi pi-users buttonHome" onClick={() => history.push('/forum') }></i>
							</div>
							<div className="p-col-4">
								<h3>Alati</h3>
								<i className="pi pi-briefcase buttonHome" onClick={() => history.push('/tools')}></i>
							</div>
							<div className="p-col-4">
								<h3>Zahtjevi</h3>
								<i className="pi pi-bookmark buttonHome" onClick={() => history.push('/requests')}></i>
							</div>
						</div>
						}

						{width < 700 &&
						<div className="p-grid center">
							<div className="p-col-12">
								<h3>Forum</h3>
								<i className="pi pi-users buttonHome" onClick={() => history.push('/forum') }></i>
							</div>
							<div className="p-col-12">
								<h3>Alati</h3>
								<i className="pi pi-briefcase buttonHome" onClick={() => history.push('/tools')}></i>
							</div>
							<div className="p-col-12">
								<h3>Zahtjevi</h3>
								<i className="pi pi-bookmark buttonHome" onClick={() => history.push('/requests')}></i>
							</div>
						</div>
						}
					</div>

					<div className="lg:col-2 md:col-2 sm:col-12"/>
				</div>

			</Card>
		// </div>
	)
}

export default Home;
