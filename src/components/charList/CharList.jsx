import { Component } from 'react';
import classNames from 'classnames';
import {
  Spinner,
  ErrorMessage,
 } from '../index';

import './charList.scss';

class CharList extends Component {
  state = {
    chars: [],
    loading: true,
    error: false
  }

  componentDidMount() {
    this.loadChars();
  }

  loadChars = () => {
    const {loading} = this.state;

    if (!loading) {
      this.setState({
        loading: true,
        error: false
      })
    }

    fetch(`${process.env.SERVER_BASE}getAllCharacters/`)
      .then(result => result.json())
      .then(this.onCharsLoaded)
      .catch(this.onError)
  }

  onCharsLoaded = (arr) => {
    this.setState({
      chars: arr,
      loading: false,
      error: false
    })
  }

  onError = (err) => {
    this.setState({
      loading: false,
      error: true
    })
  }

  render() {
    const {
      chars,
      loading,
      error,
    } = this.state;
    const {onCharSelected} = this.props;

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(error || loading) ? <View chars={chars} onCharSelected={onCharSelected} /> : null;

    return (
      <div className="char__list">
          {spinner}
          {errorMessage}
          {content}
          <button
            className="button button__main button__long"
            type="button"
            disabled={loading}
          >
              <div className="inner">load more</div>
          </button>
      </div>
    )
  }
}

const View = ({chars, onCharSelected}) => (
  <ul className="char__grid">
    {chars.map(char => {
      const {
        id,
        name,
        thumbnail
      } = char;
      const imgClassName = classNames(
        'char__img',
        {'not-available': thumbnail.search(/image_not_available/) > 0}
      )

      return (
        <li
          key={id}
          className="char__item"
          onClick={() => onCharSelected(char)}
        >
          <img className={imgClassName} src={thumbnail} alt={name}/>
          <div className="char__name">{name}</div>
        </li>
      )
    })}
</ul>
)

export default CharList;
