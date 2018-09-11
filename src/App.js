import React, { Component } from 'react';
import './App.css';
import BarChart from './component/BarChart';
import Configuration from './component/Configuration';
//import { range as d3Range } from "d3";
import Axios from 'axios';
//import { Card, CardContent }  from "carbon-addons-cloud-react";
import {
  Loading
} from 'carbon-components-react';

class App extends Component {

  state = {
    data: [],
    hideConfiguration: false,
    currentIndex: null,
    restURL: '',
    xAxis: '',
    yAxis: '',
    isDataLoaded: false,
  };

  xAxis = (e) => {
    this.setState({ xAxis: e.target.value });
  }

  yAxis = (e) => {
    this.setState({ yAxis: e.target.value });
  }

  chartRestURL = (e) => {
    this.setState({ restURL: e });
    this.setState({hideConfiguration: true});
    // this.getData();
  }

  setCurrentIndex = currentIndex =>
    this.setState({
      currentIndex
    });

  getData = (url) => {
    this.setState({ isDataLoaded: false });
    console.log(url);
    Axios.get(url)
      .then(response => {
        this.setState({ data: response.data.results });
        this.setState({ isDataLoaded: true });
      })
  }

  componentDidMount() {
    if (this.state.restURL.length !== 0) {
      this.getData();
    }
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.restURL !== this.state.restURL && nextState.xAxis && nextState.yAxis)
      this.getData(nextState.restURL);
  }

  getCardInfo = () => {
    const { data, currentIndex } = this.state;
    return this.state.restURL === '' ? (
      null
    ) : (!this.state.isDataLoaded ? (<Loading />) :
      (<BarChart
        data={data}
        width={500}
        height={400}
        margin={{ top: 30, right: 20, bottom: 60, left: 65 }}
        x={0}
        y={0}
        highlightBar={this.setCurrentIndex}
        highlightedBar={currentIndex}
        selectedXAxis={this.state.xAxis}
        selectedYAxis={this.state.yAxis}
      />)
      )
  }


  render() {
    //const { data, currentIndex } = this.state;
    return (
      <div className="app-main">
      <h2 className="bx--graph-header"> Graph</h2>
      <div className="graph-container">
        <svg width='565' height='500' className="graph">
          {this.getCardInfo()}
        </svg>
        {/* {!this.state.hideConfiguration ? (<Configuration xAxisSelection={this.xAxis} yAxisSelection={this.yAxis} chartRestURL={this.chartRestURL}></Configuration>) : null} */}
        <Configuration xAxisSelection={this.xAxis} yAxisSelection={this.yAxis} chartRestURL={this.chartRestURL}></Configuration>
        <div className="tooltip"></div>
      </div>
      </div>
    );
  }
}

export default App;
