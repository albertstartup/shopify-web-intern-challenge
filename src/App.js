import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'request-promise-native';
import { Input } from 'semantic-ui-react';
import _ from 'underscore';
window._ = _;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searchInput: '',
      favItems: [],
      itemsToDisplay: []
    };

    window.findme = this;
  }

  onChangeSearch(e) {
    this.setState({searchInput: e.target.value});
    console.log()
  }

  async getItems() {
    return await request.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000', {json: true});
  }

  async componentDidMount() {

  }

  async onSubmitSearch() {
    console.log('seach submited');
    const items = await this.getItems();
    this.setState({items: items});
    console.log(items);
    const itemsToDisplay = _.filter(items, (item) => {
      const keywords = item.keywords;
      if (keywords.indexOf(this.state.searchInput) !== -1) {
        return true;
      }
    });
    this.setState({itemsToDisplay: itemsToDisplay});
  }

  getDecodedString(encodedString) {
    const textarea  = document.createElement("textarea");
    textarea.innerHTML = encodedString;
    return textarea.value;
  }

  render() {
    return <div>
      <form
          onChange={(e) => {
            this.onChangeSearch(e);
          }}
          style={{display: 'flex'}}>
        <input style={{flex: '2'}}type='text'/>
        <input onClick={(e) => {
          e.preventDefault();
          this.onSubmitSearch();
        }} type='submit'/>
      </form>

        {_.map(this.state.itemsToDisplay, (item) => {
          return <div style={{display: 'flex'}}>
            <div style={{flex: 1}}>{item.keywords}</div>
            <div style={{flex: 1}} dangerouslySetInnerHTML={{__html: this.getDecodedString(item.body)}}>

            </div>
        </div>
        })}

    </div>
  }
}

export default App;
