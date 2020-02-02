import React from "react";

export default class InputParameter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log(this.props.noOfDataPoints);
    return (
      <div>
        <div class="card mt-2" style={{ width: "18rem" }}>
          <div class="card-header">Input Parameters</div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <div class="form-group">
                <label for="exampleFormControlSelect1">Learning Rate</label>
                <input
                  type="number"
                  value={this.props.learningRate}
                  name="learningrate"
                  placeholder="enter a learning rate"
                  onChange={e =>
                    this.props.handlers.onLearningRateChange(e.target.value)
                  }
                />
              </div>
            </li>
            <li class="list-group-item">
              Noise:-{" "}
              <input
                type="number"
                value={this.props.noise}
                name="noise"
                placeholder="enter noise"
                onChange={e =>
                  this.props.handlers.onNoiseChange(e.target.value)
                }
              />
            </li>
            {/* <li className="list-group-item">
              <div class="form-group">
                 Select no of data points:-{" "}
                <input
                  type="number"
                  name="noofdatapoints"
                  value={this.props.noOfDataPoints}
                  placeholder="enter no of data points to generate"
                  onChange={e =>
                    this.props.handlers.onNoOfDataPointsChange(e.target.value)
                  }
                />
              </div>
            </li> */}
          </ul>
        </div>
      </div>
    );
  }
}
