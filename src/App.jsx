import { useEffect, useState } from 'react';
import quote from "./assets/quotes.json"
import './App.css';

function App() {
  const [sentence, setSentence] = useState("");
  const [senArr, setSenArr] = useState([]);
  const [inp, setInp] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [totalTyped, setTotalTyped] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(()=>{
    console.log(quote.length)
    const ind = Math.floor(Math.random()*quote.length);
    console.log(quote[ind])
    setSentence(quote[ind].quote || "")
  }, [])


  useEffect(() => {
    setSenArr(sentence.split(''));
  }, [sentence]);

  const handleChange = (e) => {
    if (!isTyping) {
      setIsTyping(true);
      setStartTime(Date.now());
      setIsFinished(false);
    }

    const value = e.target.value;
    setInp(value);
    setTotalTyped(value.length);

    const currentIndex = value.length - 1;
    if (currentIndex >= 0 && currentIndex < sentence.length) {
      if (value[currentIndex] === sentence[currentIndex]) {
        setCorrectCount(correctCount + 1);
      }
    }

    if (value.length === sentence.length) {
      const elapsedTime = (Date.now() - startTime) / 60000;
      const wordsTyped = Math.ceil(correctCount / 5);
      setWpm(Math.floor(wordsTyped / elapsedTime));

      setIsFinished(true);  
    }
  };

  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center min-w-full space-y-6">
      <h1 className="text-3xl font-bold">Typing Test</h1>

      <div className="border-white border-2 rounded-lg p-4 w-1/2 text-center bg-gray-800">
        <div className="flex flex-wrap justify-center">
          {senArr.map((sen, ind) => {
            let textColor = "text-gray-500"; // Default for untyped letters

            // Applying colors for typed letters
            if (ind < inp.length) {
              if (inp[ind] === sen) {
                textColor = "text-green-500"; // Correct character
              } else {
                textColor = "text-red-500"; // Incorrect character
              }
            }

            return (
              <span key={ind} className={`text-xl font-mono ${textColor}`}>
                {sen === ' ' ? '\u00A0' : sen}
              </span>
            );
          })}
        </div>
      </div>

      <input 
        type="text" 
        value={inp} 
        onChange={handleChange} 
        className="text-black p-4 text-lg  w-1/2 rounded-md border-2 border-gray-400 focus:outline-none focus:border-gray-600" 
        placeholder="Start typing..." 
      />

      {isFinished && (
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-xl font-semibold">WPM: {wpm}</h2>
        </div>
      )}

      <button
        onClick={handleReset}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Reset
      </button>
    </div>
  );
}

export default App;
