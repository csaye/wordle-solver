import { useEffect, useState } from 'react';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  const [word, setWord] = useState('');

  // called when key pressed
  function onKeydown(e) {
    const key = e.key.toUpperCase();
    if (/^[A-Z]$/.test(key)) setWord(val => val + key);
    if (key === 'ENTER') setWord('');
    if (key === 'BACKSPACE') setWord(val => val.slice(0, -1));
  }

  // listen for keypresses
  useEffect(() => {
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, []);

  return (
    <div>
      <h1>{word}</h1>
    </div>
  );
}
