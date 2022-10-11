import React, { useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

const generateWord = (size) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const initialWords = [generateWord(6), generateWord(6), generateWord(6)];
  const [words, setWords] = useState(initialWords);
  const [mistake, setMistake] = useState(0);

  const handleFinish = () => {
    setWords(prevWords => {
        const remaingWords = prevWords.slice(1);
        remaingWords.push(generateWord(6));
        return remaingWords;
      });
  };

  const handleMistake = (mistake) => {
    setMistake(prevMistake => prevMistake += 1);
  };
  
  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistake}</div>
      <div className="stage__words">
        {words.map((word, id) =>
          id === 0 ? (
            <Wordbox
              id={id}
              word={word}
              key={word}
              onFinish={handleFinish}
              active={true}
              handleMistake={handleMistake}
            />
          ) : (
            <Wordbox
              id={id}
              word={word}
              key={word}
              onFinish={handleFinish}
              active={false}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Stage;
