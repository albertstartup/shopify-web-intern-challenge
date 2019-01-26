import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import request from 'request-promise-native';
import 'semantic-ui-css/semantic.min.css'
import _ from 'underscore';
import {Icon, Button, Input} from 'semantic-ui-react';

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
      if (keywords.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) !== -1 ||
          title.toLowerCase().indexOf(this.state.searchInput.toLowerCase()) !== -1) {
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
    const newFaves = _.union(this.state.faves, [item]);
    this.setState({faves: newFaves});
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
      <div style={{display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '6rem',
        marginTop: '1rem',
        marginBottom: '1rem',
        backgroundImage: 'linear-gradient(to right, rgb(0, 89, 151), rgb(0, 153, 88)'}}>
        <h2 style={{color: 'white'}}>Toronto Waste Lookup</h2>
      </div>
      <form
          onChange={(e) => {
            this.onChangeSearch(e);
          }}
          style={{display: 'flex', paddingLeft: '1rem', paddingRight: '1rem'}}>
        <Input style={{flex: '2'}} type='text'/>
        <Button style={{marginLeft: '1rem', backgroundColor: '#009c55'}} onClick={(e) => {
          e.preventDefault();
          this.onSubmitSearch();
        }} type='submit' icon>
          <Icon style={{color: 'white'}} name='search'/>
        </Button>
      </form>
      {_.map(this.state.itemsToDisplay, (item) => {
        return <div key={item.title} style={{display: 'flex', paddingLeft: '1rem', paddingRight: '1rem'}}>
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

      {this.state.faves && this.state.faves.length !== 0 &&
      <h3 style={{paddingLeft: '1rem', paddingRight: '1rem', backgroundColor: '#f5fefa', margin: '0rem', marginTop: '3rem', paddingTop: '1rem', color: '#009c55'}}>Favourites</h3>
      }
      {_.map(this.state.faves, (item) => {
        return  <div key={item.title} style={{display: 'flex', backgroundColor: '#f5fefa', }}>
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
