import { useEffect, useState } from 'react';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  const [word, setWord] = useState('');

  // called when key pressed
  function onKeydown(e) {
    const key = e.key.toUpperCase();
    if (/^[A-Z]$/.test(key) && word.length < 5) setWord(val => val + key);
    if (key === 'ENTER' && word.length == 5) setWord('');
    if (key === 'BACKSPACE' && word.length > 0) setWord(val => val.slice(0, -1));
  }

  // listen for keypresses
  useEffect(() => {
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [onKeydown]);

  return (
    <div className={styles.container}>
      <div className={styles.center}>
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
    </div>
  );
}
