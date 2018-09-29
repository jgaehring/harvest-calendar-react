import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barHeight: 20,
      barFill: "#90ddbb",
      chartWidth: 875,
      marginLeft: 175,
      marginRight: 20,
      crops: [
        {
          name: "Winter Squash",
          seasons: [
            { start: "2018-01-01", end: "2018-02-01" },
            { start: "2018-09-01", end: "2018-12-31" },
          ]
        },
        {
          name: "Strawberries",
          seasons: [
            { start: "2018-04-01", end: "2018-07-01" },
          ]
        }
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    }
  }
  render() {
    const bgFill = (index) => index % 2 === 0 ? "#ffffe0" : "#fffac9";
    const calcDate = (date) => {
      const month = date.split("-")[1]
      const day = date.split("-")[2]
      if (day >= 20) {
        return month;
      } else if (day > 10) {
        return month - 0.5;
      } else if (day <= 10) {
        return month - 1;
      } else {
        throw new Error(`"${date}" is not a properly formatted date.`);
      }
    }
    const calcBarWidth = (start, end) => {
      return (
        (calcDate(end) - calcDate(start))
        * (this.state.chartWidth 
          - this.state.marginLeft 
          - this.state.marginRight)
        / 12
      )
    }
    const calcBarStart = (date) => {
      return calcDate(date)
      * (this.state.chartWidth 
        - this.state.marginLeft 
        - this.state.marginRight)
      / 12
    }
    return (
      <div className="App">
        <form>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Season One Starts</th>
                <th>Season One Ends</th>
                <th>Season Two Starts</th>
                <th>Season Two Ends</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.crops.map((crop, index) => (
                  <tr key={`crop-input-${index}`}>
                    <td>
                      <input
                        type="text" 
                        name="0-name" 
                        defaultValue={crop.name ? crop.name : null} 
                      />
                    </td>
                    <td>
                      <input
                        type="date" 
                        name="0-start-one" 
                        defaultValue={
                          crop.seasons[0]
                            ? crop.seasons[0].start
                            : null 
                        } 
                      />
                    </td>
                    <td>
                      <input
                        type="date" 
                        name="0-end-one" 
                        defaultValue={
                          crop.seasons[0]
                            ? crop.seasons[0].end
                            : null 
                        } 
                      />
                    </td>
                    <td>
                      <input
                        type="date" 
                        name="0-start-two" 
                        defaultValue={
                          crop.seasons[1]
                            ? crop.seasons[1].start
                            : null 
                        } 
                      />
                    </td>
                    <td>
                      <input
                        type="date" 
                        name="0-end-two" 
                        defaultValue={
                          crop.seasons[1]
                            ? crop.seasons[1].end
                            : null 
                        } 
                      />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </form>
        <div className="svg-container">
          <svg 
            className="chart" 
            xmlns="http://www.w3.org/2000/svg"
            height="1000"
            width="875"
          >
            <g className="chart-body">
              {
                this.state.crops.map((crop, index) => (
                  <g
                    key={`crop-row-${index}`}
                    className="crop"
                    transform={`translate(0, ${index * this.state.barHeight})`}
                  >
                    <rect 
                      className="bg-bar"
                      fill={bgFill(index)}
                      height={this.state.barHeight}
                      width={680}
                    />
                    <rect 
                      className="bar season-one"
                      fill={this.state.barFill}
                      height={this.state.barHeight}
                      width={
                        calcBarWidth(
                          crop.seasons[0].start,
                          crop.seasons[0].end,
                        )}
                      x={calcBarStart(crop.seasons[0].start)}
                    />
                    { crop.seasons[1]
                      ? (
                        <rect 
                          className="bar season-two"
                          fill={this.state.barFill}
                          height={this.state.barHeight}
                          width={
                            calcBarWidth(
                              crop.seasons[1].start,
                              crop.seasons[1].end,
                            )}
                          x={calcBarStart(crop.seasons[1].start)}
                        />
                      )
                      : null
                    }
                  </g>
                ))
              }
            </g>
          </svg>
        </div>
      </div>
    );
  }
}

export default App;
