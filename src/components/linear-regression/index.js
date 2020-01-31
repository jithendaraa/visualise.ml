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

// const data_points = [
//   { x: 1, y: 1 },
//   { x: 2, y: 2 },
//   { x: 3, y: 1 },
//   { x: 4, y: 3 },
//   { x: 5, y: 2 }
// ];

export default class LinearRegression extends React.Component {
  constructor() {
    super();
    this.intercept = 0;
    this.iterations = 0;
    this.state = {
      m: 1,
      learningRate: 0.001,
      lineDataPoints: [],
      dataPoints: []
    };
  }

  componentDidMount() {
    this.generateRandomPoints();
  }
  applyLinearRegression = () => {
    let count = 0;
    let evaluation = 0;
    let step_size = 0;
    let newIntercept = this.intercept;

    do {
      console.log("inside do...");
      this.state.dataPoints.forEach(coordinate => {
        evaluation +=
          -2 * (coordinate.y - (this.state.m * coordinate.x + this.intercept));
      });
      step_size = evaluation * this.state.learningRate;
      newIntercept = this.intercept - step_size;
      console.log("new intercept", newIntercept);
      console.log("old interncept", this.intercept);
      console.log("abs difference", newIntercept - this.intercept);
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
      // if (newIntercept - this.intercept >= 0) {
      //   console.log("breaking...");
      //   break;
      // }
      this.intercept = newIntercept;
      this.drawLine();
    } while (count !== 200);
  };

  drawLine = () => {
    let datapoints = [];
    for (let i = 0; i < 10; i++) {
      datapoints.push({
        x: i,
        y: this.state.m * i + this.intercept
      });
    }
    this.setState({
      lineDataPoints: datapoints
    });
  };

  getGaussianRandomNumber = () => {
    let u = 0,
      v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    num = num / 10.0 + 0.5; // Translate to 0 -> 1
    if (num > 1 || num < 0) return this.getGaussianRandomNumber(); // resample between 0 and 1
    return num;
  };

  generateRandomPoints = () => {
    let count = 150;
    let noise = 0.3;
    let theta = Math.tanh(this.state.m);
    let perpendicularIntercept = 0;
    let randomPointsMap = [];
    let noiseMap = [];
    for (let i = 0; i < count; i++) {
      let randomNumber = this.getGaussianRandomNumber();
      randomPointsMap.push({
        x: randomNumber,
        y: this.state.m * randomNumber + this.intercept
      });
    }
    console.log(randomPointsMap);
    // mapping for noise
    for (let i = 0; i < count; i++) {
      noiseMap.push(this.getGaussianRandomNumber() / (noise * noise));
    }
    console.log("noiseMap", noiseMap);

    // calculate perpendicular line intercept
    perpendicularIntercept =
      randomPointsMap[0].y + randomPointsMap[0].x / this.state.m;

    // logic for geneeration of random data points by solving equation of circle and perpendicular line
    for (let i = 0; i < count; i++) {
      let point1 = {
        x: randomPointsMap[i].x - noiseMap[i] * Math.sin(theta),
        y: randomPointsMap[i].y + noiseMap[i] * Math.cos(theta)
      };
      let point2 = {
        x: randomPointsMap[i].x + noiseMap[i] * Math.sin(theta),
        y: Math.abs(randomPointsMap[i].y - noiseMap[i] * Math.cos(theta))
      };

      if (noiseMap[i] < 0) {
        this.state.dataPoints.push(point1);
      } else {
        this.state.dataPoints.push(point2);
      }
    }
    this.setState({
      dataPoints: this.state.dataPoints
    });
  };

  render() {
    console.log(`equation:- y=${this.state.m}x + ${this.intercept}`);
    return (
      <div>
        <h1>Linear regression </h1>
        <div className="regression-wrapper">
          <div>
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
                data={this.state.dataPoints}
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
            <DataPointsTable datapoints={this.state.dataPoints} />
          </div>
          <div>
            <RegressionStatistics
              iterations={this.iterations}
              slope={this.state.m}
              intercept={this.intercept}
            />
          </div>
        </div>
      </div>
    );
  }
}
