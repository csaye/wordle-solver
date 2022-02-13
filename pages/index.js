import { useEffect } from 'react';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  // called when key pressed
  function onKeydown(e) {
    const key = e.key.toLowerCase();
    console.log(key);
  }

  // listen for keypresses
  useEffect(() => {
    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, []);

  return (
    <div>
    </div>
  );
}
