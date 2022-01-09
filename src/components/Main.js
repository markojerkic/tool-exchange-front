import React from "react";
import {Switch} from "react-router-dom";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";
import Login from "./auth/login/Login";
import Registration from "./auth/registration/Registration.js";
import Home from "./Home";
import UserInfo from "./user/UserInfo";
import Error404 from "./error/Error404";
import NewAd from "./advert/NewAdvert";
import Category from "./new-entry/Category"
import NewRequest from "./request/NewRequest";
import AdView from "./advert/AdView";
import ReqView from "./request/ReqView";
import OfferList from "./offer/OfferList";
import Offer from "./offer/Offer";
import UserList from "./user/UserList";
import RequestList from "./request/RequestList";
import AdvertList from "./advert/AdvertList";
import UserInfoPublic from "./UserInfoPublic";

const Main = () => {
	return (
		<main>
			<Switch>
				<PublicRoute restricted={false} exact path="/" component={Home}/>
				<PublicRoute restricted={false} exact path="/login" component={Login}/>
				<PublicRoute restricted={false} exact path="/register" component={Registration}/>
				<PublicRoute restricted={false} exact path="/requests" component={RequestList}/>
				<PublicRoute restricted={false} exact path="/tools" component={AdvertList}/>
				<PublicRoute exact path="/advert/:id" component={AdView}/>
				<PublicRoute exact path="/user/:username" component={UserInfoPublic}/>
				<PublicRoute restricted={false} exact path="/req/:id" component={ReqView}/>
				<PrivateRoute exact path="/user" component={UserInfo}/>
				<PrivateRoute exact path="/users" component={UserList} />
				<PrivateRoute exact path="/offers" component={OfferList}/>
				<PrivateRoute exact path="/offer/:id" component={Offer}/>
				<PrivateRoute exact path="/new-ad" component={Category}/>
				<PrivateRoute exact path="/new-ad/tool" component={NewAd}/>
				<PrivateRoute exact path="/new-ad/request" component={NewRequest}/>
				<PublicRoute exaxt path="/advert" component={AdvertList}/>
				<PublicRoute exaxt path="/req" component={RequestList}/>
				<PublicRoute component={Error404}/>
			</Switch>
		</main>
	)
}

export default Main;
