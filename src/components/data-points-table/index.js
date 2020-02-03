import React from "react";
import "./index.css";

const DataPointsTable = ({ datapoints }) => {
  return (
    <div style={{ width: "445px" }}>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            Data Points
          </li>
        </ol>
      </nav>

      <div />
      <table class="table table-responsive">

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
