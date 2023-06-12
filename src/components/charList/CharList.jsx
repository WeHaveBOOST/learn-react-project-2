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
    loading: false,
    error: false,
    offset: 210,
    charEnded: false,
  }

  componentDidMount() {
    this.loadChars();

    window.addEventListener('scroll', this.getEndOfpage);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.getEndOfpage);
  }

  loadChars = () => {
    const {
      loading,
      offset,
    } = this.state;

    if (loading) return;

    this.setState({
      loading: true,
      error: false
    })

    fetch(`${process.env.SERVER_BASE}getAllCharacters/?offset=${offset}`)
      .then(result => result.json())
      .then(this.onCharsLoaded)
      .catch(this.onError)
  }

  onCharsLoaded = (newChars) => {
    const ended = newChars.length < 9;

    this.setState(({chars, offset}) => ({
      chars: [...chars, ...newChars],
      loading: false,
      error: false,
      offset: offset + 9,
      charEnded: ended,
    }))
  }

  getEndOfpage = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
      this.loadChars();
    }
  }

  onError = (err) => {
    this.setState({
      loading: false,
      error: true
    })
  }

  render() {
    const {
      onCharSelected,
      selectedChar
    } = this.props;
    const {
      chars,
      loading,
      error,
      charEnded
    } = this.state;

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !error ?
      <View
        chars={chars}
        onCharSelected={onCharSelected}
        selectedChar={selectedChar}
      /> :
      null;

    return (
      <div className="char__list">
        {errorMessage}
        {content}
        {spinner}
        <button
          className='button button__main button__long'
          type="button"
          disabled={loading}
          hidden={charEnded}
          onClick={this.loadChars}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

const View = ({chars, onCharSelected, selectedChar}) => (
  <ul className="char__grid">
    {chars.map(char => {
      const {
        id,
        name,
        thumbnail,
      } = char;

      const liClassName = classNames(
        'char__item',
        {'char__item_selected': selectedChar && id === selectedChar.id}
      );

      const imgClassName = classNames(
        'char__img',
        {'not-available': thumbnail.search(/image_not_available/) > 0}
      );

      return (
        <li
          key={id}
          className={liClassName}
        >
          <button
            type='button'
            onClick={() => onCharSelected(char)}
          >
            <span className="char__name">{name}</span>
            <img className={imgClassName} src={thumbnail} alt={name}/>
          </button>
        </li>
      )
    })}
</ul>
)

export default CharList;
