import React, { useEffect, useState } from 'react';
import './style.css';

const Wordbox = ({ word, onFinish, active, handleMistake }) => {
  const [lettersLeft, setLettersLeft] = useState(word); 
  const [mistake, setMistake] = useState(false);
  
  useEffect(() => {
    const handleKeyUp = (e) => {
      if(lettersLeft.charAt(0) === e.key) {
        setLettersLeft(prevState => prevState.substring(1));
        setMistake(false)
        console.log(lettersLeft)
      } else {
        setMistake(true)
        onMistake();
      }

      if(lettersLeft === e.key) {
        onFinish();
        console.log('poslední písmenko')
      }
    }
    if(active === true) {
      document.addEventListener("keyup", handleKeyUp);
      return () => document.removeEventListener("keyup", handleKeyUp);  
    }

  }, [lettersLeft, active, onMistake]);

  const onMistake = () => {
    handleMistake();
  };

  const wordboxClass =
    mistake === true ? "wordbox wordbox--mistake" : "wordbox";
  
  return (
    <div className={wordboxClass}>{lettersLeft}</div>
  );
};

export default Wordbox;
