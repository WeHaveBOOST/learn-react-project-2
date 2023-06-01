function transformCharacter (obj) {
  const {
    name,
    description,
    thumbnail,
    urls
  } = obj;

  return {
    name,
    description,
    thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
    homepage: urls[0].url,
    wiki: urls[1].url,
  }
}

export default transformCharacter;
