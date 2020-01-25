import React from "react";
import {
  VictoryChart,
  VictoryScatter,
  VictoryTheme,
  VictoryLine
} from "victory";
import RegressionStatistics from "../regression-statistics/index";
import DataPointsTable from "../data-points-table/index";
import "./index.css";

const data_points = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 1 },
  { x: 4, y: 3 },
  { x: 5, y: 2 }
];

export default class LinearRegression extends React.Component {
  constructor() {
    super();
    this.intercept = 0;
    this.iterations = 0;
    this.state = {
      m: 0.64,
      learningRate: 0.001,
      lineDataPoints: []
    };
  }
  applyLinearRegression = () => {
    let count = 0;
    let evaluation = 0;
    let step_size = 0;
    let newIntercept = this.intercept;

    do {
      console.log("inside do...");
      data_points.forEach(coordinate => {
        evaluation +=
          -2 * (coordinate.y - (this.state.m * coordinate.x + this.intercept));
      });
      step_size = evaluation * this.state.learningRate;
      newIntercept = this.intercept - step_size;
      console.log("new intercept", newIntercept);
      console.log("old interncept", this.intercept);
      console.log("abs difference", Math.abs(newIntercept - this.intercept));
      count++;
      this.iterations = count;
      // this.setState(
      //   {
      //     intercept: newIntercept
      //   },
      //   () => {
      //     console.log('new intercept state after updTE', this.intercept);
      //     this.drawLine();
      //   }
      // );
      if (Math.abs(newIntercept - this.intercept) <= 0.0001) {
        console.log("breaking...");
        break;
      }
      this.intercept = newIntercept;
      this.drawLine();
    } while (true);
  };

  drawLine = () => {
    let datapoints = [];
    for (let i = 0; i < 20; i++) {
      datapoints.push({
        x: i,
        y: this.state.m * i + this.intercept
      });
    }
    this.setState({
      lineDataPoints: datapoints
    });
  };

  render() {
    console.log(`equation:- y=${this.state.m}x + ${this.intercept}`);
    return (
      <div style={{ width: 400, height: 400 }} className="regression-wrapper">
        <div>
          <h1>Linear regression </h1>
          <input
            type="number"
            placeholder="Enter the learning rate for the algorithm"
            className="input input-control"
            value={this.state.learningRate}
            onChange={e => this.setState({ learningRate: e.target.value })}
          />
          <VictoryChart
            // domain={{x: [0, 20], y: [0, 20]}}
            theme={VictoryTheme.material}
            animate={{ duration: 2000 }}
            events={[
              {
                target: "parent",
                childName: "scatter",
                eventHandlers: {
                  onClick: (evt, clickedProps) => {
                    console.log("evt", evt);
                    console.log("clickedProps", clickedProps);
                  }
                }
              }
            ]}
          >
            <VictoryScatter
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              name="scatter"
              data={data_points}
              width={50}
              height={50}
            />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" }
              }}
              data={this.state.lineDataPoints}
            />
          </VictoryChart>
          <button
            onClick={this.applyLinearRegression}
            className="btn btn-success"
          >
            apply LinearRegression
          </button>
        </div>
        <div>
          <DataPointsTable datapoints={data_points} />
        </div>
        <div>
          <RegressionStatistics
            iterations={this.iterations}
            slope={this.state.m}
            intercept={this.intercept}
          />
        </div>
      </div>
    );
  }
}
