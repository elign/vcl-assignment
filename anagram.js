function anagram(str1, str2) {
  if (str1.length != str2.length) return false;
  const map = [];
  // code to create a map which stores the character and the number of times it appears in the str1
  for (let i = 0; i < str1.length; i++) {
    let currentChar = str1[i];
    let foundInMap = false;
    for (let j = 0; j < map.length; j++) {
      if (currentChar === map[i]?.character) {
        map[i].count = map[i].count + 1;
        foundInMap = true;
        break;
      }
    }
    if (foundInMap === false) {
      map.push({ character: currentChar, count: 1 });
    }
  }
  // removing all the characters from the map
  for (let i = 0; i < str2.length; i++) {
    let currentChar = str2[i];
    for (let j = 0; j < map.length; j++) {
      if (currentChar === map[i]?.character) {
        if (map[i].count === 1) {
          map.remove(i);
        } else {
          map[i].count = map[i].count - 1;
        }
      }
    }
  }
  if (map.length != 0) {
    return false;
  }
  return true;
}

console.log(anagram("LISTEN", "SILENT"));
