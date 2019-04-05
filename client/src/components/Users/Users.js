import React from "react";
import axios from "axios";

class Users extends React.Component {
  state = {
    users: []
  };
  render() {
    return (
      <>
        <h2>List of Users</h2>
        <ul>
          {this.state.users.map(u => (
            <React.Fragment key={u.id}>
              <li>{u.username}</li>
              <li>{u.department}</li>
            </React.Fragment>
          ))}
        </ul>
      </>
    );
  }

  componentDidMount() {
    const endpoint = "http://localhost:4000/api/users";
    const token = localStorage.getItem("tokenKey");
    const requestConfig = {
      headers: {
        authorization: token
      }
    };
    axios
      .get(endpoint, requestConfig)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.error("USER ERROR", err);
      });
  }
}

export default Users;
