import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_WORKOUT } from "../../utils/mutations";

import Auth from "../../utils/auth";

const WorkoutForm = ({ sessionId }) => {
  const [workoutText, setWorkoutText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addWorkout, { error }] = useMutation(ADD_WORKOUT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addWorkout({
        variables: {
          sessionId,
          workoutText,
          workoutAuthor: Auth.getProfile().data.username,
        },
      });

      setWorkoutText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "workoutText" && value.length <= 280) {
      setWorkoutText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h4>Workouts</h4>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? "text-danger" : ""
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="workoutText"
                placeholder="Add your workout"
                value={workoutText}
                className="form-input w-100"
                style={{ lineHeight: "1.5", resize: "vertical" }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Workout
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to post your sessions. Please{" "}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default WorkoutForm;
