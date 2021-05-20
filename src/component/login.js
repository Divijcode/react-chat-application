import React, { Component } from "react";
import { auth, database } from "firebase";
import { Button, Image} from "@chakra-ui/core";
import "./login.css";

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
      <React.Fragment>
      <div>
        <div bg="red.200" flexDirection="column" justifyContent="center" alignItems="center" textAlign="center" h="100vh">
         <div>
          <div
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            bg="red"
            padding="50px"
            shadow="md"
            rounded="md"
          >
            <img width="400px"
              src="/logo4.png"
              alt="logo"
            />
            <p marginTop={2} fontWeight={600} fontSize="2.5rem" color="orange.300">
              Cat Chat
            </p>
            <Button
              onClick={this.loginWithGmail}
              variantColor="teal"
              size="lg"
              marginTop={5}
            >
              <Image
                src="https://developers.google.com/identity/images/btn_google_signin_light_normal_web.png"
                alt="signin-google"
              />
            </Button>
          </div>

          <div className="col-sm-6 forms-right-icons">
						<div className="row">
							<div className="col-sm-2 icon"><i className="fas fa-users"></i></div>
							<div className="col-sm-10">
								<h3 className="Text">New Features</h3>
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
                    </div>
        </div>
        
                </div>
      </React.Fragment >
    );
  }
}
export default Login;
