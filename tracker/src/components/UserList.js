import React, {useState, useEffect} from 'react';
import user from "../services/user.js";
import '../style/UserList.css';

function UserList() {
  const [users, setUsers] = useState(null);
  const [showUsers, setShowUsers] = useState(false);

  useEffect( ()=> {
    if(!users) {
      getUsers();
    }
  })

  const getUsers = async() => {
    let res = await user.getAll();
    setUsers(res);
  }

  const renderUser = user => {
    return (
      <li key={user._id} className="user-list-item">
        <h3 className="user-list-name">{user.name}</h3>
      </li>
    );
  };

  return (
    <div id="user-display">
      <div className="toggle-switch">
        <input type="checkbox"
               className="toggle-switch-checkbox"
               name="toggleSwitch"
               id="toggleSwitch"
               onChange={e => {setShowUsers(showUsers ? false : true); getUsers();}} />
        <label className="toggle-switch-label"
               htmlFor="toggleSwitch" >
               {showUsers ? "Hide User List" : "Display User List"}
        </label>
      </div>

      {showUsers ? (
              <ul className="user-list">
                {(users && users.length > 0) ? (users.map(user => renderUser(user))) :
                  (<p>No users</p>)}
              </ul>) : ""}
    </div>
  );
}

export default UserList;
