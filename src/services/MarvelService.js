function transformCharacter (obj) {
  const {
    id,
    name,
    description,
    thumbnail,
    urls,
    comics,
  } = obj;

  return {
    id,
    name,
    description,
    thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
    homepage: urls[0].url,
    wiki: urls[1].url,
    comics: comics.items,
  }
}

export default transformCharacter;
