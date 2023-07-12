const capitalize = (word) => {
  let newWord = word.charAt(0).toUpperCase() + word.slice(1);

  return newWord;
};

export { capitalize };
