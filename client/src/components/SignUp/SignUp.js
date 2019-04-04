import React from "react";
//import axios from "axios";
//const uuid4 = require("uuid4");

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //username: "",
      //password: "",
      //department: ""
    };
  }

  componentDidMount() {}

  handleChange = e => {
    e.persist();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let newUser = { ...this.state };
    //newUser.id = uuid4();
    this.props.addUser(newUser);
    this.setState({ username: "", password: "", department: "" });
    this.props.history.push("/");
  };
  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter a Username..."
            name="username"
            value={this.state.username || ""}
            required
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Enter a Password..."
            name="password"
            value={this.state.password || ""}
            required
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Enter a Department..."
            name="department"
            value={this.state.department || ""}
            required
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </React.Fragment>
    );
  }
}

export default SignUp;
