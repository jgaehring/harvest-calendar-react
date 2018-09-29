import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
                  <tr key={`crop-${index}`}>
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
      </div>
    );
  }
}

export default App;
