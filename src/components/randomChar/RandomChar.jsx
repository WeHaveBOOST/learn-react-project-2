import { Component } from 'react';
import Spinner from '../spinner/Spinner';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
  }

  componentDidMount() {
    this.updateChar();
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    })
  }

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    fetch(`${process.env.SERVER_BASE}getCharacter/?id=${id}`)
      .then(result => result.json())
      .then(this.onCharLoaded)
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const {
      char: {
        name,
        description,
        thumbnail,
        homepage,
        wiki
      },
      loading,
    } = this.state;

    if (loading) return <Spinner/>;

    return (
      <div className="randomchar">
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
          <div className="randomchar__static">
              <p className="randomchar__title">
                  Random character for today!<br/>
                  Do you want to get to know him better?
              </p>
              <p className="randomchar__title">
                  Or choose another one
              </p>
              <button className="button button__main" type='button'>
                  <div className="inner">try it</div>
              </button>
              <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
          </div>
      </div>
    )
  }
}

export default RandomChar;
