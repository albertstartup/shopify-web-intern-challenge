import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'request-promise-native';
import 'semantic-ui-css/semantic.min.css'
import { Input } from 'semantic-ui-react';
import _ from 'underscore';
import {Icon} from 'semantic-ui-react';

window._ = _;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      searchInput: '',
      favItems: [],
      itemsToDisplay: [],
      faves: []
    };

    window.findme = this;
  }

  onChangeSearch(e) {
    if (e.target.value === '') {
      this.setState({itemsToDisplay: []});
    }
    this.setState({searchInput: e.target.value});
    console.log()
  }

  async getItems() {
    return await request.get('https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000', {json: true});
  }

  async componentDidMount() {
    this.setState({faves: JSON.parse(localStorage.getItem("faves")) || []});
  }

  async onSubmitSearch() {
    console.log('seach submited');
    const items = await this.getItems();
    this.setState({items: items});
    console.log(items);
    const itemsToDisplay = _.filter(items, (item) => {
      const keywords = item.keywords;
      const title = item.title;
      if (keywords.indexOf(this.state.searchInput) !== -1 || title.indexOf(this.state.searchInput) !== -1) {
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

  onClickStar(item) {
    const newFaves = this.state.faves.concat(item);
    this.setState({faves: newFaves})
    localStorage.setItem("faves", JSON.stringify(newFaves))
  }

  onClickFavStar(item) {
    const newFaves = _.without(this.state.faves, item);
    this.setState({faves: newFaves});
    localStorage.setItem("faves", JSON.stringify(newFaves))
  }

  getStarColor(title) {
    return _.includes(this.state.faves, title) ? 'green' : 'grey';
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
        return <div key={item.id} style={{display: 'flex'}}>
          <div style={{flex: 1, padding: '1rem'}}>
            <div style={{display: 'flex', alignItems: 'baseline'}}>
              <Icon onClick={() => {
                this.onClickStar(item);
              }} color={this.getStarColor(item)} size='small' name='star'/>{item.title}
              </div>
            </div>
          <div style={{flex: 1, padding: '1rem'}} dangerouslySetInnerHTML={{__html: this.getDecodedString(item.body)}}>
          </div>
        </div>
      })}

      {_.map(this.state.faves, (item) => {
        return <div key={item.id} style={{display: 'flex'}}>
          <div style={{flex: 1, padding: '1rem'}}>
            <div style={{display: 'flex', alignItems: 'baseline'}}>
              <Icon onClick={() => {
                this.onClickFavStar(item);
              }} color='green' size='small' name='star'/>{item.title}
            </div>
          </div>
          <div style={{flex: 1, padding: '1rem'}} dangerouslySetInnerHTML={{__html: this.getDecodedString(item.body)}}>
          </div>
        </div>
      })}

    </div>
  }
}

export default App;
