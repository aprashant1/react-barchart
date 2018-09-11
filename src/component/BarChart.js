import React from "react";
import * as d3 from "d3";
import './BarChart.css';

class BarChart extends React.Component {
  state = {
    widthScale: d3
      .scaleLinear()
      .domain(d3.extent(this.props.data, d => d[this.props.selectedXAxis]))
      ,

    heightScale: d3
      .scaleLinear()
      .range([this.props.height, 0])
      .domain([0, d3.max(this.props.data, (d) => d[this.props.selectedYAxis])]),

      xAxis : d3.axisBottom()
              .tickSize(0),

      yAxis : d3.axisLeft()
	            .ticks(4) 
              .tickSize(-this.props.width)
              
  };

  showTooltip =(i) => {
    this.props.highlightBar(i);
    const tooltip = d3.select('.tooltip');
    const d = this.props.data[i];
    tooltip
			.style('display', 'inherit')
			.text(`${d[this.props.selectedYAxis]}`)
			.style('top', `${this.state.heightScale(d[this.props.selectedYAxis]) - 16}px`);
		
		let bandwidth = this.state.widthScale.bandwidth();
		let tooltipWidth = tooltip.nodes()[0].getBoundingClientRect().width;
		let offset = (tooltipWidth - bandwidth) / 2;
		
		tooltip
      .style('left', `${this.state.widthScale(d[this.props.selectedXAxis]) + 65 - offset}px`);
  }

  hideTooltip = (i) => {
    this.props.highlightBar(null);
    const tooltip = d3.select('.tooltip');
    tooltip
			.style('display', 'none');
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let { widthScale, heightScale, xAxis, yAxis } = prevState;

    widthScale.domain(nextProps.data.map(d => d[nextProps.selectedXAxis]));
    heightScale.domain([0, d3.max(nextProps.data, (d) => d[nextProps.selectedYAxis])]);
    xAxis.scale(widthScale);
    yAxis.scale(heightScale.nice());

    prevState = { ...prevState, widthScale, heightScale, xAxis, yAxis };
    return prevState;
  }

  render() {
    const { width, height, highlightBar, highlightedBar } = this.props,
      { widthScale, heightScale , xAxis, yAxis} = this.state;

    return (
      <g
        transform={`translate(65, 65)`}
        onMouseOut={() => highlightBar(null)}
        fontFamily='ibm-plex-sans'
        className="graph-container"
      >
      <g className="axis x" 
      ref={node => d3.select(node).call(xAxis)} 
      style={{
        transform: `translateY(${height}px)`,
      }}
      transform={`translate(0, ${height})`}
      y='16'
      />
       <g className="label" 
      ref={node => d3.select(node).append('text').text(this.props.selectedXAxis.toUpperCase())
      .attr('transform', `translate(${width / 2}, ${height+30})`)
      .attr('font-family', 'ibm-plex-sans')}
      />

      <g className="axis y" 
      ref={node => d3.select(node).call(yAxis)}
      strokeDasharray='4'
      x='-16'
      />
      <g className="label" 
      ref={node => d3.select(node).append('text').text(this.props.selectedYAxis.toUpperCase())
      .attr('transform', `translate(-50, 85) rotate(-90)`)
      .attr('font-family', 'ibm-plex-sans')}
      />
      <g className="bar-container">
        {this.props.data.map((d, i) => (
          <rect 
            x={widthScale(d[this.props.selectedXAxis])}
            y={heightScale(d[this.props.selectedYAxis])}
            width={widthScale.bandwidth()}
            height={this.props.height -heightScale(d[this.props.selectedYAxis])}
            style={{
              fill: i === highlightedBar ? d3.color('#00A78F').darker() : d3.color('#00A78F')
            }}
            onMouseOver={() => this.showTooltip(i)}
            onMouseLeave={() => {this.hideTooltip(i)}}
            key={i}
          />
        ))}
        </g>
        <g>
          {this.props.data.map((d, i) => (
          <line 
          x={widthScale(d[this.props.selectedYAxis])} 
          y={heightScale(d[this.props.selectedYAxis])}
          width={widthScale.bandwidth()}
          height={this.props.height -heightScale(d[this.props.selectedYAxis])}
          />))}
        </g>
      </g>
    );
  }
}

export default BarChart;
