import React, {useState} from 'react';
import axios from "axios";
import '../style/Exercise.css';

function Exercise() {

  const [exercise, setExercise] = useState({
    name: "",
    description: "",
    duration: "",
    date: ""
  })

  const handleChange = (event) => {
    setExercise({...exercise, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`/api/exercise/add`, exercise)
    .then(function(res) {
      console.log(res);
    })
    .catch(function(err){
      console.log(err);
    })
    setExercise({name: "", description: "", duration: "", date: ""})
  }

  return (
    <div id="exercise-container">
      <form id="exercise-form"
            onSubmit={handleSubmit}>
        <h2>Add Exercise:</h2>
        <input id="exercise-user-name"
               type="text"
               name="name"
               placeholder="username"
               value={exercise.name}
               onChange={handleChange}
               required/>
        <br />
        <input id="exercise-description"
               type="text"
               name="description"
               placeholder="Describe the exercise"
               value={exercise.description}
               onChange={handleChange}
               required/>
        <br />
        <input id="exercise-duration"
               type="number"
               name="duration"
               placeholder="Duration (minutes)"
               value={exercise.duration}
               onChange={handleChange}
               required/>
        <br />
        <input id="exercise-date"
               type="date"
               name="date"
               placeholder="Date (YYYY-MM-DD)"
               value={exercise.date}
               onChange={handleChange}
               required/>
        <br />
        <input type="submit" value="Log Exercise" />
        </form>
    </div>
  );
}

export default Exercise;
