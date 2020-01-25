import React from "react";
import "./index.css";

const DataPointsTable = ({ datapoints }) => {
  return (
    <div style={{ width: "650px" }}>
      <h1>Regression Statistics </h1>
      <div />
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">X coordinate</th>
            <th scope="col">Y coordinate</th>
          </tr>
        </thead>
        <tbody>
          {datapoints.map((coordinate, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{coordinate.x}</td>
                <td>{coordinate.y}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataPointsTable;
