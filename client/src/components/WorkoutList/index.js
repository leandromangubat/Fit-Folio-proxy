import React from "react";

const WorkoutList = ({ workouts = [] }) => {
  if (!workouts.length) {
    return <h3>No Workouts Yet</h3>;
  }

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: "1px dotted #1a1a1a" }}
      >
        Workouts
      </h3>
      <div className="flex-row my-4">
        {workouts &&
          workouts.map((workout) => (
            <div key={workout._id} className="col-12 mb-3 pb-3">
              <div className="p-3 bg-dark text-light">
                <h5 className="card-header">
                  {workout.workoutAuthor} created
                  <span style={{ fontSize: "0.825rem" }}>
                    on {workout.createdAt}
                  </span>
                </h5>
                <p className="card-body">{workout.workoutText}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default WorkoutList;