import { Component } from 'react';
import {
  Spinner,
  ErrorMessage,
 } from '../index';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  }

  componentDidMount() {
    this.updateChar();
  }

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    fetch(`${process.env.SERVER_BASE}getCharacter/?id=${id}`)
      .then(result => result.json())
      .then(this.onCharLoaded)
      .catch(this.onError)
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    })
  }

  onError = (err) => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  render() {
    const {
      char,
      loading,
      error,
    } = this.state;

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(error || loading) ? <View char={char} /> : null;

    return (
      <div className="randomchar">
          {spinner}
          {errorMessage}
          {content}

          <div className="randomchar__static">
              <p className="randomchar__title">
                Random character for today!<br/>
                Do you want to get to know him better?
              </p>
              <p className="randomchar__title">
                Or choose another one
              </p>
              <button
                className="button button__main"
                type='button'
                onClick={this.updateChar}
              >
                <div className="inner">try it</div>
              </button>
              <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
          </div>
      </div>
    )
  }
}

const View = ({char}) => {
  const {
    thumbnail,
    name,
    description,
    homepage,
    wiki,
  } = char;

  return (
    <div className="randomchar__block">
      <img
        className="randomchar__img"
        src={thumbnail}
        alt="Random character"
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <div className="randomchar__descr"><p>{description || 'Description not found'}</p></div>
        <div className="randomchar__btns">
          <a
            className="button button__main"
            href={homepage}
            rel='noreferrer'
            target='_blank'
          >
            <div className="inner">homepage</div>
          </a>
          <a
            className="button button__secondary"
            href={wiki}
            rel='noreferrer'
            target='_blank'
          >
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar;
