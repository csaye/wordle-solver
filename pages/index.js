import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

import { answers } from '../data/answers';
import { words } from '../data/words';
import { useEffect, useState } from 'react';

import styles from '../styles/pages/Index.module.css';

// get random answer
const answerIndex = Math.floor(Math.random() * answers.length);
const answer = answers[answerIndex];

let greens = Array(5).fill('');
let yellows = [];
let grays = [];

export default function Index() {
  const [words, setWords] = useState(Array(6).fill(''));
  const [currRow, setCurrRow] = useState(0);

  const guesses = answers;

  // handles given key press
  function handleKey(key) {
    let word = words[currRow];
    const newWords = words.slice();
    if (/^[a-z]$/.test(key) && word.length < 5) word += key;
    if (key === 'backspace' && word.length > 0) word = word.slice(0, -1);
    newWords[currRow] = word;
    setWords(newWords);
    // enter word
    if (key === 'enter' && word.length == 5) {
      // return if invalid
      if (!answers.includes(word) && !words.includes(word)) return;
      // update rules
      for (let i = 0; i < 5; i++) {
        if (word[i] === answer[i]) greens[i] = answer[i];
        else if (answer.includes(word[i])) yellows.push(word[i]);
        else grays.push(word[i]);
      }
      // increment row
      setCurrRow(val => val + 1);
    }
  }

  // called when key pressed
  function onKeydown(e) {
    const key = e.key.toLowerCase();
    handleKey(key);
  }

  // returns style for word at given index
  function getStyle(word, index) {
    if (word[index] === answer[index]) return styles.green;
    if (answer.includes(word[index])) return styles.yellow;
    return styles.gray;
  }

  // returns whether given word is valid
  function validWord(word) {
    // validate greens
    for (let i = 0; i < 5; i++) {
      if (greens[i] && (greens[i] !== word[i])) return false;
    }
    // validate yellows
    for (const char of yellows) {
      if (!word.includes(char)) return false;
    }
    // validate grays
    for (const char of grays) {
      if (word.includes(char)) return false;
    }
    return true;
  }

  // returns match score between given words
  function matchScore(a, b) {
    let score = 0;
    for (let i = 0; i < 5; i++) {
      if (a[i] === b[i]) score += 1;
      else if (b.includes(a[i])) score += 0.5;
    }
    return score;
  }

  // returns score for given guess
  function guessScore(word) {
    let score = 0;
    for (const ans of answers) {
      score += matchScore(word, ans);
    }
    return score;
  }

  // listen for keypresses
  useEffect(() => {
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [onKeydown]);

  return (
    <div className={styles.container}>
      <div className={styles.tiles}>
        {
          Array(6).fill(0).map((val, row) =>
            <div
              className={styles.tilerow}
              key={row}
            >
              {
                Array(5).fill(0).map((val, col) =>
                  <div
                    className={
                      (words[row][col] ? styles.filled : '') + ' ' +
                      (row < currRow ? getStyle(words[row], col) : '') + ' ' +
                      styles.tile
                    }
                    key={col}
                  >
                    {words[row][col]?.toUpperCase()}
                  </div>
                )
              }
            </div>
          )
        }
      </div>
      <div className={styles.keyboard}>
        <div className={styles.row}>
          {
            'qwertyuiop'.split('').map((char, i) =>
              <button
                onClick={() => handleKey(char)}
                key={i}
              >
                {char}
              </button>
            )
          }
        </div>
        <div className={styles.row}>
          {
            'asdfghjkl'.split('').map((char, i) =>
              <button
                onClick={() => handleKey(char)}
                key={i}
              >
                {char}
              </button>
            )
          }
        </div>
        <div className={styles.row}>
          <button
            className={styles.wide}
            onClick={() => handleKey('enter')}
          >
            ENTER
          </button>
          {
            'zxcvbnm'.split('').map((char, i) =>
              <button
                onClick={() => handleKey(char)}
                key={i}
              >
                {char}
              </button>
            )
          }
          <button
            className={styles.wide}
            onClick={() => handleKey('backspace')}
          >
            <BackspaceOutlinedIcon />
          </button>
        </div>
      </div>
      <div className={styles.guesses}>
        {
          guesses
          .slice()
          .sort((a, b) => guessScore(b) - guessScore(a))
          .slice(0, 10)
          .map((word, i) =>
            <div key={i}>
              {word}
            </div>
          )
        }
      </div>
    </div>
  );
}
