import React, { Component } from "react";
import "./Welcome.css";
import Home from "./Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  

class Welcome extends Component {

    constructor(props) {
        super(props)
        this.state = {
            authenticated: false,

          }
          this.goTo=this.goTo.bind(this);
    }
    
 goTo(){
    this.setState({authenticated:true});

 }
    render() {
        return(
            <Router>
          <Switch>
            <Route exact path="/">
              {this.state.authenticated === true
                ? <Redirect to='/chat' />
                : <div style={{color:"black"}}>
                <div>
                <h1 class="black-lives-matter">Welcome {this.props.user.userName}</h1>
                {/* <h1 class="black-lives-matter"></h1> */}
</div>

<label> 
                            <a className="btn btn-google text-uppercase form-control button" href="#" onClick={this.goTo}><i className="fab fa-google"></i>&nbsp;Proceed</a>  
                            </label>
                            <div className="dropdown">
  <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
    Dropdown button
  </button>
  <div className="dropdown-menu">
    <a className="dropdown-item" href="#">Andhra Pradesh</a>
    <a className="dropdown-item" href="#">Arunachal Pradesh</a>
    <a className="dropdown-item" href="#">Assam</a>
<a className="dropdown-item" href="#">Bihar</a>
    <a className="dropdown-item" href="#">Chattisgarh</a>
<a className="dropdown-item" href="#">Chandigarh</a>
    <a className="dropdown-item" href="#">Goa</a>
<a className="dropdown-item" href="#">Gujarat</a>
    <a className="dropdown-item" href="#">Haryana</a>
    <a className="dropdown-item" href="#">Himachal Pradesh</a>
<a className="dropdown-item" href="#">Jharkhand</a>
    <a className="dropdown-item" href="#">Karnataka</a>
    <a className="dropdown-item" href="#">Kerala</a>
<a className="dropdown-item" href="#">Madhya Pradesh</a>
    <a className="dropdown-item" href="#">Maharashtra</a>
    <a className="dropdown-item" href="#">Manipur</a>
<a className="dropdown-item" href="#">Meghalaya</a>
    <a className="dropdown-item" href="#">Mizoram</a>
    <a className="dropdown-item" href="#">Nagaland</a>
<a className="dropdown-item" href="#">Odhisa</a>
    <a className="dropdown-item" href="#">Punjab</a>
    <a className="dropdown-item" href="#">Rajasthan</a>
<a className="dropdown-item" href="#">Sikkim</a>
    <a className="dropdown-item" href="#">Tamil Nadu</a>
    <a className="dropdown-item" href="#">Telangana</a>
 <a className="dropdown-item" href="#">Uttar Pradesh</a>
<a className="dropdown-item" href="#">UttaraKhand</a>
<a className="dropdown-item" href="#">West Bengal</a>

  </div>
</div>
</div>
              }
            </Route>
            <PrivateRoute
              path="/chat"
              authenticated={this.state.authenticated}
              component={() => <Home user={this.props.user} logout={this.props.logout} />}
            //   component={() => <Welcome user={this.state.user} logout={this.isLogout} authenticated={this.state.authenticated}/>}

            />
          </Switch>
        </Router>

        );
    }
}

function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) => authenticated === true
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
      />
    )
  }
export default Welcome;

