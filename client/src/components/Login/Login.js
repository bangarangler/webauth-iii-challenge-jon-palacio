import React from "react";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
    };
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/login", this.state)
      .then(res => {
        localStorage.setItem("tokenKey", res.data.token);
        this.props.addUser(this.state)
        this.setState({
          message: "You have Logged in",
          username: "",
          password: ""
        });
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err);
        this.setState({ message: "Login Failed", username: "", password: "" });
      });
  };
  render() {
    return (
      <React.Fragment>
        <h1>{this.state.message}</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            value={this.state.username}
            name="username"
            required
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Enter Password"
            value={this.state.password}
            name="password"
            required
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
