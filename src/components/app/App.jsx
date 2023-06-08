import { Component } from 'react';
import {
  AppHeader,
  RandomChar,
  CharList,
  CharInfo,
 } from '../index';

import decoration from '../../resources/img/vision.png';

class App extends Component {
  state = {
    selectedChar: null,
  }

  onCharSelected = (char) => {
    const {selectedChar} = this.state;

    if (!selectedChar || char.id !== selectedChar.id) {
      this.setState({
        selectedChar: char
      })
    }
  }

  render() {
    const {selectedChar} = this.state;

    return (
      <div className="app">
          <AppHeader/>
          <main>
              <RandomChar/>
              <div className="char__content">
                  <CharList onCharSelected={this.onCharSelected}/>
                  <CharInfo char={selectedChar}/>
              </div>
              <img className="bg-decoration" src={decoration} alt="vision"/>
          </main>
      </div>
    )
  }
}

export default App;
