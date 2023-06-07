function transformCharacter (obj) {
  const {
    id,
    name,
    description,
    thumbnail,
    urls
  } = obj;

  return {
    id,
    name,
    description,
    thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
    homepage: urls[0].url,
    wiki: urls[1].url,
  }
}

export default transformCharacter;
