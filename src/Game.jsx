import { useState } from 'react'

function WordInput({onWordBankChange, wordBank, onWordInputClick}) {

        if (wordBank.length < 24){
            return (
        <>
            <input
                className="word"
                type="text"
                value={wordBank}
                onChange={(e) => onWordBankChange(e.target.value)}
                placeholder="Enter a word for a bingo tile." 
            />
            <button type='button' onClick={() => onWordInputClick()}>Add word</button>
        </>)}
        else {
            return (
                <>
                <div className='word-bank'>
                    <ul>
                    {wordBank.map((word) => {
                        return <li key={word}>{word}</li>;
                        })}
                    </ul>
                </div>
                </>
            )
        }
    
}

function Square({text}) {

    return <button className="square">{text}</button>
}

function Board({ boardWords }) {
    if (boardWords.length < 25){
        return (
            <>
        <div className='board'>
        {[...Array(5)].map((_, rowIndex) => (
            <div className="board-row" key={rowIndex}>
            {[...Array(5)].map((_, colIndex) => {
                const squareIndex = rowIndex * 5 + colIndex;
                const text = squareIndex === 12 ? "FREE SPACE" : "-";
                return (
                <Square key={squareIndex} text={text} />
                );
            })}
            </div>
        ))}
        </div>
        </>
        )
    } else {
        return (
            <>
        <div className='board'>
        {[...Array(5)].map((_, rowIndex) => (
            <div className="board-row" key={rowIndex}>
            {[...Array(5)].map((_, colIndex) => {
                const squareIndex = rowIndex * 5 + colIndex;
                const text = squareIndex === 12 ? "FREE SPACE" : boardWords[squareIndex];
                return (
                <Square key={squareIndex} text={text} />
                );
            })}
            </div>
        ))}
        </div>
        </>
        )
    }
}

function GenerateBoard({ onGenerateBoardClick }) {
    return (
        <>
        <form>
            <button type='button' onClick={() => onGenerateBoardClick()}>Generate Board</button>
        </form>
        </>
    )
}


function Game() {
    //const [wordBank, setWordBank] = useState(WORDS);
    //const [boardWords, setBoardWords] = useState(Array(25).fill("-"));
    const [wordBank, setWordBank] = useState([]);
    //const [inputValue, setInputValue] = useState("");

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

    function addWord(event, newWord) {
        if (wordBank.length < 24){
            event?.preventDefault();
            let prevWordBank = wordBank;
            console.log(prevWordBank);

            // future randomizer here
            setWordBank(prevWordBank => [...prevWordBank, newWord]);
            //setInputValue("");
        }
    }

  return (
    <>
      <h1>My Custom Bingo Board</h1>
      <div className='window'>
        <Board boardWords={wordBank} />
        <WordInput
            wordBank={wordBank}
            onWordBankChange={setWordBank}
            onWordInputClick={() => addWord()}
        />
       </div>
       <GenerateBoard onGenerateBoardClick={() => handleClick()} />
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
