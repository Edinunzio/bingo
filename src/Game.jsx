import { useState } from 'react';

// Shuffling function using the Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function WordInput({ onWordInputChange, inputValue, onWordInputClick }) {
    return (
        <>
            <input
                className="word"
                type="text"
                value={inputValue}
                onChange={(e) => onWordInputChange(e.target.value)}
                placeholder="Enter a word for a bingo tile." 
            />
            <button type="button" onClick={() => onWordInputClick()}>Add word</button>
        </>
    );
}

function Square({ text }) {
    return <button className="square">{text}</button>;
}

function Board({ boardWords }) {
    return (
        <div className="board">
            {[...Array(5)].map((_, rowIndex) => (
                <div className="board-row" key={rowIndex}>
                    {[...Array(5)].map((_, colIndex) => {
                        const squareIndex = rowIndex * 5 + colIndex;
                        return <Square key={squareIndex} text={boardWords[squareIndex]} />;
                    })}
                </div>
            ))}
        </div>
    );
}

function Game() {
    const [wordBank, setWordBank] = useState([]);
    const [inputValue, setInputValue] = useState("");
    //const [heading, setHeading] = useState("My Custom Bingo Board");
    const [boardWords, setBoardWords] = useState([]);
    //const [isVisible, setIsVisible] = useState(false);

    function addWord(event) {
        if (wordBank.length < 24 && inputValue.trim()) {
            event?.preventDefault();

            setWordBank(prevWordBank => [...prevWordBank, inputValue.trim()]);
            setInputValue("");
        }
        if (wordBank.length === 23) {
            generateBoard([...wordBank, inputValue.trim()]);
        }
    }

    function generateBoard(finalWordBank) {
        const shuffledWords = shuffleArray(finalWordBank);
        
        // Create a new board array and place "FREE SPACE" at index 12
        const newBoardWords = [...shuffledWords.slice(0, 12), "FREE SPACE", ...shuffledWords.slice(12)];

        setBoardWords(newBoardWords);
    }

    /*function showInput() {
        setIsVisible(true);
    }*/

    return (
        <>
            {/* <button className='edit-icon float-right' onClick={showInput}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
            </button>
            <h1>{heading}</h1>*/}
            

            {/* <div className={`edit-container ${!isVisible ? 'invisible' : ''}`} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 float-right" onClick={showInput}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                <input
                    className={`edit-input`}
                    type="text"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder="Enter your board title"
                />
            </div>*/}

            <h1>Custom Bingo Game</h1>
            <div className='game-container'>
                
                <div className="window w-4/5">
                    {boardWords.length === 0 ? (
                            <WordInput
                                inputValue={inputValue}
                                onWordInputChange={setInputValue}
                                onWordInputClick={addWord}
                            />
                    ) : (
                        <Board boardWords={boardWords} />
                    )}
                </div>
                <div className='word-bank w-1/5'>
                    <h2>Word Bank</h2>
                    <ul>
                        {wordBank.map((word, index) => (
                            <li key={index} className='text-sm'>{word}</li>
                        ))}
                    </ul>
                </div>
            </div>

            
            
            
            
        </>
    );
}

export default Game;
