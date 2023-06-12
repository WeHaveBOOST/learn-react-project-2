import { Component } from 'react';
import {
  AppHeader,
  RandomChar,
  CharList,
  CharInfo,
  ErrorBoundary,
 } from '../index';

import decoration from '../../resources/img/vision.png';

class App extends Component {
  state = {
    selectedChar: null,
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {selectedChar} = this.state;
    if (!selectedChar) return true;

    const {id: nextId} = nextState.selectedChar;
    const {id: prevId} = selectedChar;
    if (nextId !== prevId) return true;

    return false;
  }

  onCharSelected = (char) => {
    this.setState({
      selectedChar: char
    })
  }

  render() {
    const {selectedChar} = this.state;

    return (
      <div className="app">
          <AppHeader/>
          <main>
              <ErrorBoundary>
                <RandomChar/>
              </ErrorBoundary>
              <div className="char__content">
                  <ErrorBoundary>
                    <CharList onCharSelected={this.onCharSelected} selectedChar={selectedChar}/>
                  </ErrorBoundary>
                  <CharInfo char={selectedChar}/>
              </div>
              <img className="bg-decoration" src={decoration} alt="vision"/>
          </main>
      </div>
    )
  }
}

export default App;
