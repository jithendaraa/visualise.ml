import React from "react";
import { VictoryChart, VictoryScatter, VictoryTheme } from "victory";

const data_points = [
  { x: 3, y: 2 },
  { x: 4, y: 9 },
  { x: 5, y: 12 },
  { x: 7, y: 15 }
];

export default class LinearRegression extends React.Component {
  render() {
    return (
      <div style={{ width: 400, height: 400 }}>
        <h1>Linear regression </h1>
        <div>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryScatter
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              data={data_points}
              width={70}
              height={70}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}
