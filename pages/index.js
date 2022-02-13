import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

import { useEffect, useState } from 'react';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  const [word, setWord] = useState('');

  // handles given key press
  function handleKey(key) {
    if (/^[A-Z]$/.test(key) && word.length < 5) setWord(val => val + key);
    if (key === 'ENTER' && word.length == 5) setWord('');
    if (key === 'BACKSPACE' && word.length > 0) setWord(val => val.slice(0, -1));
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
          Array(5).fill(0).map((val, i) =>
            <div
              className={
                word[i] ?
                `${styles.tile} ${styles.filled}` :
                styles.tile
              }
              key={i}
            >
              {word[i]}
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
