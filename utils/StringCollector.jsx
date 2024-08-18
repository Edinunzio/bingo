import { useState } from 'react';

function StringCollector() {
  const [inputValue, setInputValue] = useState('');
  const [strings, setStrings] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== '' && strings.length < 24) {
      setStrings([...strings, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add String</button>
      </form>
      
      <div>
        <h3>Collected Strings:</h3>
        <ul>
          {strings.map((str, index) => (
            <li key={index}>{str}</li>
          ))}
        </ul>
        {strings.length === 24 && <p>Maximum limit of 24 strings reached!</p>}
      </div>
    </div>
  );
}

export default StringCollector;
