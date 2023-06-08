import { Component } from 'react';
import classNames from 'classnames';

import {
  Skeleton,
  Spinner,
} from '../index';

import './charInfo.scss';

class CharInfo extends Component {
  state = {
    loading: false,
  }

  componentDidUpdate(prevProps) {
    const {id: prevId} = prevProps.char || {};
    const {char: {id: nextId}} = this.props;

    if (prevId !== nextId) {
      this.setState({
        loading: true
      })
      setTimeout(() => {
        this.setState({
          loading: false
        })
      }, 350);
    }
  }

  render() {
    const {char} = this.props;
    const {loading} = this.state;

    const skeleton = char ? null : <Skeleton/>;
    const spinner = loading ? <Spinner/> : null;
    const content = loading || !char ? null : <View char={char}/>

    return (
      <div className="char__info">
        {skeleton}
        {spinner}
        {content}
      </div>
    )
  }
}

const View = ({char}) => {
  const {
    name,
    description,
    thumbnail,
    homepage,
    wiki,
    comics
  } = char;

  const imgClassName = classNames({'not-available': thumbnail.search(/image_not_available/) > 0})
  const emptyDesc = 'Description not found';

  return (
    <>
      <div className="char__basics">
        <img className={imgClassName} src={thumbnail} alt={name}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
                <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
                <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description.length ? description : emptyDesc}</div>
      <div className="char__comics">Comics:</div>
      {
      comics.length > 0 ?
        <Comics comics={comics}/> :
        <p style={{marginTop: '5px'}} className='char__descr'>Comics not found</p>
      }
    </>
  )
}

const Comics = ({comics}) => (
  <ul className="char__comics-list">
    {comics.map((comic, i) => {
      if (i > 9) return null;
      return <li key={i} className="char__comics-item">{comic.name}</li>;
    })}
  </ul>
)

export default CharInfo;
