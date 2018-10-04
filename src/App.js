import React, { Component } from 'react';
import Form from './Form';
import Calendar from './Calendar';
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
        },
        {
          name: "Apples",
          seasons: [
            { start: "2018-07-15", end: "2018-12-31" },
            { start: "2018-01-01", end: "2018-03-01" },
          ]
        },
      ],
      svgLink: "#"
    }
  }
  
  addCrop() {
    this.setState({
      crops: [
        ...this.state.crops,
        {
          name: "",
          seasons: [
            { start: "2018-01-01", end: "2018-01-01" },
            { start: "2018-01-01", end: "2018-01-01" },
          ],
        }
      ]
    })
  }
  
  deleteCrop(index) {
    this.setState({
      crops: [
        ...this.state.crops.slice(0, index),
        ...this.state.crops.slice(index + 1),
      ]
    })
  }
  
  downloadSvg() {
    const svg = document.getElementById("svg-container").innerHTML;
    this.setState({
      svgLink: `data:application/octet-stream;base64,${btoa(svg)}`
    })
  }
  
  updateCrop(index, {
    name,
    startOne,
    endOne,
    startTwo,
    endTwo,
  }) {
    const crops = this.state.crops
    if (name) {
      this.setState({
        crops: [
          ...crops.slice(0, index),
          {
            ...crops[index],
            name,
          },
          ...crops.slice(index + 1),
        ]
      })
    }
    if (startOne) {
      this.setState({
        crops: [
          ...crops.slice(0, index),
          {
            ...crops[index],
            seasons: [
              {
                ...crops[index].seasons[0],
                start: startOne,
              },
              crops[index].seasons[1],
            ]
          },
          ...crops.slice(index + 1),
        ]
      })
    }
    if (endOne) {
      this.setState({
        crops: [
          ...crops.slice(0, index),
          {
            ...crops[index],
            seasons: [
              {
                ...crops[index].seasons[0],
                end: endOne,
              },
              crops[index].seasons[1],
            ]
          },
          ...crops.slice(index + 1),
        ]
      })
    }
    if (startTwo) {
      this.setState({
        crops: [
          ...crops.slice(0, index),
          {
            ...crops[index],
            seasons: [
              crops[index].seasons[0],
              {
                ...crops[index].seasons[1],
                start: startTwo,
              },
            ]
          },
          ...crops.slice(index + 1),
        ]
      })
    }
    if (endTwo) {
      this.setState({
        crops: [
          ...crops.slice(0, index),
          {
            ...crops[index],
            seasons: [
              crops[index].seasons[0],
              {
                ...crops[index].seasons[1],
                end: endTwo,
              },
            ]
          },
          ...crops.slice(index + 1),
        ]
      })
    }
  }
  
  render() {
    return (
      <div>
        <Form 
          crops={this.state.crops}
          updateCrop={this.updateCrop.bind(this)}
          deleteCrop={this.deleteCrop.bind(this)}
        />
        <button onClick={() => this.addCrop()}>Add Crop</button>
        <a 
          href={this.state.svgLink}
          download="harvest-calendar.svg"
          onClick={() => this.downloadSvg()}
        >
          Download
        </a>
        <Calendar crops={this.state.crops} />
      </div>
    );
  }
}

export default App;
