import React, { Component } from 'react';
import LineTooltip from 'react-d3-tooltip';

export default class Sample extends Component {

    componentDidMount() {
        console.log(this.generalChartData);
    }

     data = [
        {
            "age": 39,
            "index": 0
        },
        {
            "age": 38,
            "index": 1
        },
        {
            "age": 34,
            "index": 2
        },
        {
            "age": 12,
            "index": 3
        }
    ];

     chartSeries = [
        {
          field: 'age',
          name: 'Age',
          color: '#ff7f0e',
          style: {
            "stroke-width": 2,
            "stroke-opacity": .2,
            "fill-opacity": .2
          }
        }
      ];
      x =(d) => {
        return d.index;
      };

    render() {
        return (
            <div>
                <LineTooltip width= {600} height= {500} data= {this.data} chartSeries= {this.chartSeries} x= {this.x} />
            </div>
        )
    }
}