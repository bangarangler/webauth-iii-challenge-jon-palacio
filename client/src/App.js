import React, { Component } from "react";
import styles from "./App.module.scss";
import { Route, Link, Switch } from "react-router-dom";
import axios from "axios";
import SignUp from "./components/SignUp/SignUp.js";
import Login from "./components/Login/Login.js";
import Users from "./components/Users/Users.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  addUser = newUser => {
    this.setState(prevState => ({
      users: [...prevState.users, newUser]
    }));
    //this.postUser(newUser);
    console.log(newUser);
    //console.log(this.state.users);
  };

  postUser = newUser => {
    axios
      .post("http://localhost:4000/api/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };
  render() {
    return (
      <div className={styles.App}>
        <h1>Please Login or SignUp</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route
            exact
            path="/signup"
            render={props => {
              return <SignUp {...props} addUser={this.addUser} />;
            }}
          />
          <Route
            exact
            path="/login"
            render={props => {
              return <Login {...props} addUser={this.addUser} />;
            }}
          />
          <Route
            exact
            path="/users"
            render={props => {
              return <Users {...props} addUser={this.addUser} />;
            }}
          />

          <Route
            path="/"
            render={props => {
              return (
                <React.Fragment>
                  <h2>Here are the Users</h2>
                  {this.state.users.map((u, index) => {
                    return (
                      <React.Fragment key={index}>
                        <p>{u.username}</p>
                        <p>{u.department}</p>
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              );
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
