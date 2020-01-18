import React from "react";
import "./index.css";

const DataPointsTable = ({ datapoints }) => {
  return (
    <div style={{ width: "650px" }}>
      <h1>Regression Statistics </h1>
      <div />
      <table style={{ border: "1px solid black" }} border="1">
        <thead>
          <tr>
            <th>SNO</th>
            <th>X</th>
            <th>Y</th>
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
