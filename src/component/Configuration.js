import React from 'react';
import {
    TextInput,
    Loading,
    SelectItem,
    Select,
    Switch,
    ContentSwitcher,
    Button
} from 'carbon-components-react';
import Axios from 'axios';

export default class Configuration extends React.Component {
    tabs = {
        tabOne: {
            index: 0,
            name: "one",
            text: "First section"
        },
        tabTwo: {
            index: 1,
            name: "two",
            text: "Second section"
        }
    }
    state = {
        isURLLoaded: false,
        URL: '',
        selectedTab: {
            index: 0,
            name: "one",
            text: "First section"
        },
        availableAxis: []
    }

    passURLToParent = () => {
    this.props.chartRestURL(this.state.URL);
    }

    loadData = () => {
        if(this.state.URL && this.state.availableAxis.length === 0){
            this.setState({isURLLoaded : false});
        Axios.get(this.state.URL)
        .then(response => {
          this.setState({availableAxis: Object.keys(response.data.results[1])});
          this.setState({isURLLoaded: true});  
        })
    }
    }
    switchContext = () => {
        if(this.state.selectedTab.index === 0) {
        return (<TextInput
            className="some-class"
            id="test2"
            labelText="URL"
            placeholder={this.state.URL || "URL to fetch data"}
            required
            onChange= {(e) => {
                this.setState({URL: e.target.value});
               // this.props.chartRestURL(e.target.value);
            }
        }
        />) 
        }
        else if (this.state.selectedTab.index === 1) {
            return ( !this.state.isURLLoaded ? (
                <div>
                <p>** enter URL first</p>
            <Loading withOverlay={false} className="some-class" />
            </div>
        )
            :(  <div>
            <Select className="some-class-X" id="select-1" defaultValue="placeholder-item" onChange={e => this.props.xAxisSelection(e)}>
            <SelectItem
                disabled
                hidden
                value="placeholder-item"
                text="Choose X Axis"
            />
           {/* TO_DO use map here   */}
          { this.state.availableAxis.map(element => (
              <SelectItem value={element} text={element} key={element}/>
          ))}
        </Select>
        <Select className="some-class-Y" id="select-2" defaultValue="placeholder-item" onChange={e => this.props.yAxisSelection(e)}>
            <SelectItem
                disabled
                hidden
                value="placeholder-item"
                text="Choose Y Axis"
            />
            {/* TO_DO use map here   */}
            { this.state.availableAxis.map(element => (
              <SelectItem value={element} text={element} key={element} />
          ))}
        </Select>
        <Button type="submit" className="some-class" onClick={this.passURLToParent}>
            Submit
          </Button>
          </div>)) ;
        }
    }
    render() {
        return (
         <div>
        <ContentSwitcher onChange={(e) => { this.setState({selectedTab: e}) }}>
            <Switch name="one" text="First section" onClick={(e) => { this.setState({selectedTab: e}) }}/>
            <Switch name="two" disabled="true" text="Second section" onClick={(e) => { 
                this.setState({selectedTab: e}) ;
                this.loadData();
                }}/>  
        </ContentSwitcher>
        {this.switchContext()}
        </div>
        )
    }
}