import { useState } from 'react'

function WordInput({onWordInputChange, inputValue, onWordInputClick}) {
    return (
        <>
            <input
                className="word"
                type="text"
                value={inputValue}
                onChange={(e) => onWordInputChange(e.target.value)}
                placeholder="Enter a word for a bingo tile." 
            />
            <button type='button' onClick={() => onWordInputClick()}>Add word</button>
        </>
    );
}

function Square({text}) {
    return <button className="square">{text}</button>;
}

function Board({ boardWords }) {
    return (
        <div className='board'>
            {[...Array(5)].map((_, rowIndex) => (
                <div className="board-row" key={rowIndex}>
                    {[...Array(5)].map((_, colIndex) => {
                        const squareIndex = rowIndex * 5 + colIndex;
                        const text = squareIndex === 12 ? "FREE SPACE" : boardWords[squareIndex] || "-";
                        return <Square key={squareIndex} text={text} />;
                    })}
                </div>
            ))}
        </div>
    );
}

function GenerateBoard({ onGenerateBoardClick }) {
    return (
        <button type='button' onClick={() => onGenerateBoardClick()}>Generate Board</button>
    );
}


function Game() {
    const [wordBank, setWordBank] = useState([]);
    const [inputValue, setInputValue] = useState("");

    function handleClick(event) {
        if (wordBank.length === 24){
            event?.preventDefault();
            const firstHalf = wordBank.slice(0, 12);
            const secondHalf = wordBank.slice(12);

            // future randomizer here
            const newBoardWords = [...firstHalf, "FREE SPACE", ...secondHalf];
            setWordBank(newBoardWords);
        }
    }

    function addWord(event) {
        if (wordBank.length < 24 && inputValue.trim()){
            event?.preventDefault();

            // future randomizer here
            setWordBank(prevWordBank => [...prevWordBank, inputValue.trim()]);
            setInputValue("");
        }
    }

  return (
    <>
      <h1>My Custom Bingo Board</h1>
      
      <div className='window'>
        <Board boardWords={wordBank} />
        <WordInput
            inputValue={inputValue}
            onWordInputChange={setInputValue}
            onWordInputClick={addWord}
        />
       </div>
       <GenerateBoard onGenerateBoardClick={handleClick} />

       <div className='word-bank'>
            <h2>Word Bank</h2>
            <ul>
                {wordBank.map((word, index) => (
                    <li key={index}>{word}</li>
                ))}
            </ul>
        </div>
    </>
  )
}

const WORDS = [
    "Apple",
    "Banana",
    "Orange",
    "Mango",
    "Grapes",
    "Strawberry",
    "Pineapple",
    "Blueberry",
    "Watermelon",
    "Peach",
    "Pear",
    "Cherry",
    "Kiwi",
    "Lemon",
    "Lime",
    "Papaya",
    "Plum",
    "Pomegranate",
    "Raspberry",
    "Blackberry",
    "Cantaloupe",
    "Dragonfruit",
    "Guava",
    "Passionfruit"
  ];

export default Game
