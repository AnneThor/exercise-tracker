import React, {useState} from 'react';
import axios from "axios";
import '../style/UserLog.css';

function UserLog() {
  // const [userName, setUserName] = useState({name: ""});
  const [searchParam, setSearchParam] = useState({
    userId: "",
    startDate: "",
    endDate: "",
    limit: ""
  })
  const [exercises, setExercises] = useState(null);
  const [displayEntries, setDisplayEntries] = useState({currentUser: "", state: false});

  const handleChange = (event) => {
    setDisplayEntries({state: false});
    setSearchParam({...searchParam, [event.target.name]: event.target.value})
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    let res = await axios.get(`/api/exercise/log`, {params: searchParam});
    setExercises(res.data);
    setDisplayEntries({currentUser: searchParam.userId, state: true});
    setSearchParam({userId: "", startDate: "", endDate: "", limit: ""})
    }

  const renderExercise = exercise => {
    return (
      <li key={exercise._id} className="exercise-list-item">
        <p>{exercise.description} for {exercise.duration} minutes on {exercise.date.slice(0,10)}</p>
      </li>
    );
  };

  return (
    <div id="user-log-container">
      <div className="exercise-search">
        <form id="exercise-lookup-form"
              onSubmit={handleSubmit}>
          <h2>Find exercises by user:</h2>
          <input id="find-exercise-user-name"
                 type="text"
                 name="userId"
                 placeholder="Enter the user name"
                 value={searchParam.userId}
                 onChange={handleChange}
                 required />
          <br />
          <input id="exercise-start-date"
                 type="date"
                 name="startDate"
                 placeholder="Enter the start date (optional)"
                 value={searchParam.startDate}
                 onChange={handleChange} />
          <br />
          <input id="exercise-end-date"
                 type="date"
                 name="endDate"
                 placeholder="Enter the end date (optional)"
                 value={searchParam.endDate}
                 onChange={handleChange} />
          <br />
          <input id="exercise-number"
                 type="number"
                 name="limit"
                 placeholder="Number of exercises"
                 value={searchParam.limit}
                 onChange={handleChange} />
          <br />
          <input type="submit"/>
        </form>
      </div>
      { displayEntries.state ?
      ( (exercises.length === 0) ? (<p id="exercise-log-title">No exercises logged for {searchParam.userId}</p>) :

        <ul className="exercise-list">Logged exercises for {displayEntries.currentUser}
        {(exercises && exercises.length > 0) ?
          ( exercises.map(exercise => renderExercise(exercise))) :
          (<p>No logged activities</p>)}
      </ul>)
    : "" }
    </div>
  );
}

export default UserLog;
