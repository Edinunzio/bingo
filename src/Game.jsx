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
                        let text;

                        if (squareIndex === 12) {
                            text = "FREE SPACE";
                        } else {
                            const adjustedIndex = squareIndex > 12 ? squareIndex - 1 : squareIndex;
                            text = boardWords[adjustedIndex] || "-";
                        }

                        return <Square key={squareIndex} text={text} />;
                    })}
                </div>
            ))}
        </div>
    );
}

function Game() {
    const [wordBank, setWordBank] = useState([]);
    const [inputValue, setInputValue] = useState("");

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

export default Game
