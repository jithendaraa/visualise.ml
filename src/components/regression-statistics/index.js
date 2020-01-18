import React from "react";

const RegressionStatistics = ({ iterations, slope, intercept }) => {
  return (
    <div style={{ width: "650px" }}>
      <h1>Regression Statistics </h1>
      <div />
      <div>
        <h2>Iterations:- {iterations}</h2>
      </div>
      <div>
        <h2>Slope:- {slope}</h2>
      </div>
      <div>
        <h2>intercept:- {intercept}</h2>
      </div>
      <div>
        <h2>
          Equation Obtained:- y = {slope}x + {intercept}
        </h2>
      </div>
    </div>
  );
};

export default RegressionStatistics;
