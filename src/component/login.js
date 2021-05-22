import React, { Component } from "react";
import * as firebase from "firebase/app";
import {database,auth} from "firebase/app";
import { Button, Image} from "@chakra-ui/core";
import GoogleButton from 'react-google-button'
import 'bootstrap/dist/css/bootstrap.css';

import "./login.css";
// require('firebase/auth');
// // import "firebase\auth";
// require('firebase/database');

// import "firebase\database";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: ""
    }
  }
  loginWithGmail = e => {
    e.preventDefault();
    let provider = new auth.GoogleAuthProvider();
    auth()
      .signInWithPopup(provider)
      .then(result => {
        let additionalUserInfo = result.additionalUserInfo;
        let user = {
          userName: result.additionalUserInfo.profile.given_name,
          profile_picture: result.user.photoURL,
          fullName: result.user.displayName,
          email: result.user.email,
          uid: result.user.uid
        }
        if (additionalUserInfo.isNewUser) {
          this.addUserList(result);
          this.props.isLogin(user);
        } else {
          let userRef = database().ref().child("usersTable").child(result.user.uid);
          userRef.once("value", snapshot => {
            var isAvailable = snapshot.val();
            if (!isAvailable) {
              this.addUserList(result);
            } else {
              userRef.update({ profile_picture: result.user.photoURL, uid: result.user.uid });
            }
          });
          this.props.isLogin(user);
        }
      })
      .catch(error => {
        var errorMessage = error.message;
        this.setState({ error: true, errorMessage })
      });
  };

  addUserList = result => {
    database()
      .ref()
      .child("usersTable")
      .child(result.user.uid)
      .set({
        userName: result.additionalUserInfo.profile.given_name,
        profile_picture: result.user.photoURL,
        fullName: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid
      });
  };

  render() {
    return (
      <div>
      <div  classNameName="align-middle">
        <div  classNameName="bg mt-2 col-md-12 align-middle" style={{
  height: '100vh',
      
      }} bg="red.200" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" h="300vh">
         <div classNameName="container" >
         
            <img style={{float:'right'}} width="400px"
              src="/logo4.png"
              alt="logo"
            />
             <img width="400px"
              src="/login.png"
              alt="logo"
            />
           
         
         
          <div classNameName="col-sm-6 forms-right-icons" align="bottom">
						<div classNameName="row">
							<div classNameName="col-sm-2 icon"><i classNameName="fas fa-users"></i></div>
							<div classNameName="col-sm-10">
								<h3>New Features</h3>
								<p>Seeing the current situation of COVID-19 in the country, we formed a group of volunteers that will help you in any possible way.</p>
							</div>
						</div>
						<div classNameName="row">
							<div classNameName="col-sm-2 icon"><i classNameName="far fa-eye"></i></div>
							<div classNameName="col-sm-10">
								<h3>Easy To Use</h3>
								<p>A user-friendly and simple application through which one could easily ask for help and chat with anyone.</p>
							</div>
						</div>
						<div classNameName="row">
							<div classNameName="col-sm-2 icon"><i classNameName="fab fa-twitter"></i></div>
							<div classNameName="col-sm-10">
								<h3>Social Integrated</h3>
							</div>
						</div>
            <GoogleButton
 onClick={this.loginWithGmail}
/>
            </div>
                    </div>
        </div>
        
                </div>
                {/* <div className="container">
        <div className="card">
            <div className="card-body">
                <div className="circle"></div>
                <header className="myHed text-center">
                    <i className="far fa-user"></i>
                    <p>LOGIN</p>
                </header>
                <form className="main-form text-center">
                    <div className="form-group my-0">
                        <label className="my-0">
                            <i className="fas fa-user"></i>
                            <input type="text" className="myInput" placeholder="Username"/> 
                        </label>
                    </div>
                    <div className="form-group my-0">
                        <label className="my-0">
                            <i className="fas fa-lock"></i>
                            <input type="password" className="myInput" placeholder="Password"/> 
                        </label>
                    </div>
                    <label className="check_1">
                        <input type="checkbox" checked/>
                        Remember Me
                    </label>
                    <div className="form-group">
                        <label> 
                            <input type="button" className="form-control button" value="LOGIN"/> 
                        </label>
                    </div>
					<div className="form-group">
                        <label> 
                         <a className="btn btn-google text-uppercase form-control button" href="#"><i className="fab fa-google"></i>&nbsp;Sign In Using Google</a>  
                        </label>
                    </div>
                </form>
            </div>
        </div>
    </div>
	<div className="container-text">
		<div className="col-sm-6 forms-right-icons">
						<div className="row">
							<div className="col-sm-2 icon"><i className="fab fa-font-awesome-flag"></i></div>
							<div className="col-sm-10">
								<h3>New Features</h3>
								<p>Seeing the current situation of COVID-19 in the country, we formed a group of volunteers that will help you in any possible way.</p>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-2 icon"><i className="far fa-eye"></i></div>
							<div className="col-sm-10">
								<h3>Easy To Use</h3>
								<p>A user-friendly and simple application through which one could easily ask for help and chat with anyone.</p>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-2 icon"><i className="fab fa-twitter"></i></div>
							<div className="col-sm-10">
								<h3>Social Integrated</h3>
							</div>
						</div>
                    </div>
	</div> */}
               
      </div >
    );
  }
}
export default Login;
