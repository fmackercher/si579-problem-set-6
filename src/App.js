import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';

export default function App() {
  const [search, setSearch] = useState('');
  const [wordList, setWordList] = useState({});

  const [savedWords, setSavedWords] = useState('');
  const getRhymes = () => {
    axios
      .get(`https://api.datamuse.com/words?rel_rhy=${search}`)
      .then(response => {
        setWordList(response.data);
        //console.log(response.data);
      })
      .catch(error => {
        console.log("error", error);
      });
  };
  const finalArray = []
  const resultList = Object.values(wordList);

  const groupedList = groupBy(resultList, 'numSyllables');
  //console.log(groupedList);

  for (let i in groupedList) {
    finalArray.push(<h3>{i} syllable words</h3>);
    //console.log(groupedList[i]);
    finalArray.push(<ul>
      {groupedList[i].map(rhymes => {
        return (
          <li className="list-item">{rhymes.word}    <button type='button' className="btn', 'btn-outline-success', 'btn-sm, 'save" onClick={() => setSavedWords(savedWords + rhymes.word + ', ')}>Save</button></li>
        )
      })}
    </ul>)
  };

  console.log(finalArray);
  console.log(savedWords);

  const upperDiv = [];
  if (savedWords.length) {
    upperDiv.push('Saved words: ')
  }

  const getSyns = () => {
    axios
      .get(`https://api.datamuse.com/words?rel_syn=${search}`)
      .then(response => {
        setWordList(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  return (
    <>
      <div>
        <div><p>'https://github.com/fmackercher/si579-problem-set-6'</p></div>
        <h1>Rhyme Finder</h1>
        <div className="saved-words">{upperDiv}{savedWords}</div>
        <input className="form-control" type="text" onChange={e => setSearch(e.target.value)} placeholder="enter a word" />
        <div><button type="button" className="btn', 'btn-outline-success', 'btn-sm" onClick={getRhymes}>Find Rhymes</button>
          <span>               </span>
          <button type="button" className="btn', 'btn-outline-success', 'btn-sm" onClick={getSyns}>Find Synonyms</button></div>
      </div>
      <span></span>
      <div>
        <h2>Words that rhyme with {search}</h2>
        <div>
          {finalArray}
        </div>
      </div>
    </>
  );
}

function groupBy(objects, property) {
  // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
  // value for property (obj[property])
  if (typeof property !== 'function') {
    const propName = property;
    property = (obj) => obj[propName];
  }

  const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
  for (const object of objects) {
    const groupName = property(object);
    //Make sure that the group exists
    if (!groupedObjects.has(groupName)) {
      groupedObjects.set(groupName, []);
    }
    groupedObjects.get(groupName).push(object);
  }

  // Create an object with the results. Sort the keys so that they are in a sensible "order"
  const result = {};
  for (const key of Array.from(groupedObjects.keys()).sort()) {
    result[key] = groupedObjects.get(key);
  }
  return result;
}
