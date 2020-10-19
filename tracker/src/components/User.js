import React, {useState} from 'react';
// import userServices from "../services/user.js";
import axios from "axios";
import UserList from "./UserList";
import '../style/User.css';

function User() {

  const [user, setUser] = useState({ name: "" });

  const handleChange = (event) => {
    setUser({name: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("/api/exercise/new-user", user)
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err) {
      console.log(err);
    })
    setUser({name: ""});
  }

  return (
    <div id="user-container">
      <form id="user-form"
            onSubmit={handleSubmit}>
        <h2>Create a new user:</h2>
        <input id="user-name"
               type="text"
               name="name"
               placeholder="Enter the user name"
               value={user.name}
               onChange={handleChange}
               required />
        <br />
        <input type="submit"/>

        <p>Usernames should follow the below guidelines:</p>
        <ul>
          <li>No special characters</li>
          <li>No whitespace in the user name</li>
        </ul>
        </form>
        <UserList />
    </div>
  );
}

export default User;
