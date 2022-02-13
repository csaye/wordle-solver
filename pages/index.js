import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

import { useEffect, useState } from 'react';

import styles from '../styles/pages/Index.module.css';

let currRow = 0;

export default function Index() {
  const [words, setWords] = useState(Array(6).fill(''));

  // handles given key press
  function handleKey(key) {
    let word = words[currRow];
    const newWords = words.slice();
    if (/^[A-Z]$/.test(key) && word.length < 5) word += key;
    if (key === 'BACKSPACE' && word.length > 0) word = word.slice(0, -1);
    newWords[currRow] = word;
    setWords(newWords);
    if (key === 'ENTER' && word.length == 5) currRow += 1;
  }

  // called when key pressed
  function onKeydown(e) {
    const key = e.key.toUpperCase();
    handleKey(key);
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
                      (row < currRow ? styles.green : '') + ' ' +
                      (words[row][col] ? styles.filled : '') + ' ' +
                      styles.tile
                    }
                    key={col}
                  >
                    {words[row][col]}
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
            'QWERTYUIOP'.split('').map((char, i) =>
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
            'ASDFGHJKL'.split('').map((char, i) =>
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
            onClick={() => handleKey('ENTER')}
          >
            ENTER
          </button>
          {
            'ZXCVBNM'.split('').map((char, i) =>
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
            onClick={() => handleKey('BACKSPACE')}
          >
            <BackspaceOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
