import React from "react";

const RegressionStatistics = ({ iterations, slope, intercept }) => {
  return (
    <div style={{ width: "650px" }} className="mt-3">
      <div class="card" style={{ width: "18rem" }}>
        <div class="card-header">Regression Statistics</div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Iterations:- {iterations}</li>
          <li class="list-group-item">Slope:- {slope}</li>
          <li class="list-group-item">intercept:- {intercept}</li>
          <li class="list-group-item">
            Equation Obtained:- y = {slope}x + {intercept}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RegressionStatistics;
