import React from "react";
import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryLine
} from "victory";

const data_points = [
  { x: 1, y: 2 },
  { x: 7, y: 3 },
  { x: 3, y: 3 },
  { x: 7, y: 3 }
];

export default class LinearRegression extends React.Component {
  constructor() {
    super();
    this.state = {
      m: 0.64,
      intercept: 0,
      learningRate: 0.001,
      lineDataPoints: []
    };
  }
  applyLinearRegression = () => {
    let count = 0;
    let evaluation = 0;
    let step_size = 0;
    let newIntercept = this.state.intercept;

    do {
      console.log("inside do...");
      data_points.forEach(coordinate => {
        evaluation +=
          -2 *
          (coordinate.y - (this.state.m * coordinate.x + this.state.intercept));
      });
      step_size = evaluation * this.state.learningRate;
      newIntercept = this.state.intercept - step_size;
      console.log("new intercept", newIntercept);
      count++;
      this.setState(
        {
          intercept: newIntercept
        },
        () => {
          this.drawLine();
        }
      );
    } while (count !== 100);
  };

  drawLine = () => {
    let datapoints = [];
    for (let i = 0; i < 20; i++) {
      datapoints.push({
        x: i,
        y: this.state.m * i + this.state.intercept
      });
    }
    this.setState({
      lineDataPoints: datapoints
    });
  };

  render() {
    console.log("slope:-", this.state.m);
    console.log("intercept", this.state.intercept);
    return (
      <div style={{ width: 400, height: 400 }}>
        <h1>Linear regression </h1>
        <div>
          <VictoryChart
            // domain={{x: [0, 20], y: [0, 20]}}
            theme={VictoryTheme.material}
            animate={{ duration: 2000 }}
          >
            <VictoryScatter
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              data={data_points}
              width={70}
              height={70}
            />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              data={this.state.lineDataPoints}
            />
          </VictoryChart>
          <button onClick={this.applyLinearRegression}>
            apply LinearRegression
          </button>
        </div>
      </div>
    );
  }
}
