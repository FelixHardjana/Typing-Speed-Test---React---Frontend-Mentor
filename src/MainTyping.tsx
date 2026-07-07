
import data from '../data.json';
import iconRestart from '/assets/images/icon-restart.svg';
import trophy from '/assets/images/icon-personal-best.svg';

import { useState, useRef, useEffect } from 'react'

type difficultyType = "easy" | "medium" | "hard";

const MainTyping = () => {

    const randomNum = useRef(Math.floor(Math.random() * 10));
    console.log(randomNum);

    const [difficulty, setDifficulty] = useState<difficultyType>("easy");
    const [restart, setRestart] = useState(randomNum.current);

    const [timerMode, setTimerMode] = useState<string>("");
    const [timerCountdown, setTimerCountdown] = useState<number>(0);

    const [pressedDifficulty, setPressedDifficulty] = useState<string>("");
    const [pressedMode, setPressedMode] = useState<string>("");

    const [accuracy, setAccuracy] = useState<number>(100);


    // Selecting Difficulty
    const handleDifficulty = (difficultyMode: difficultyType) => {
        setDifficulty(difficultyMode);
        setPressedDifficulty(`${difficultyMode}-pressed`);
    }

    // Restart Button
    const handleRestart = () => {
        let randNum = Math.floor(Math.random() * 10);
        setRestart(randNum);
    }

    // 60s timer
    const handleTimer60 = () => {
        setTimerMode("timer60");
        setTimerCountdown(60);
        setPressedMode(`timer60-pressed`);
    }
    
    // Passage timer
    const handlePassageTime = () => {
        setTimerMode("passage");
        setTimerCountdown(0);
        setPressedMode(`passage-pressed`);
    }

    // Timer format
    const timeConverter = (prevTime: number) => {
        const minutes = Math.floor(prevTime / 60);
        const seconds = Math.floor(prevTime % 60);

        return `${minutes}:` + `${seconds}`.padStart(2, "0");
    }

    const handleAcc = () => {
        
    }

    const accuracyConverter = (prevAcc: number) => {
        
        return `${prevAcc}%`;
    }

    // Time useEffect
    useEffect(() => { // this is for the 60 second timer countodwn
      const id = setInterval(() => {
        if(timerMode === "timer60"){ // 60s timer
            setTimerCountdown(prevTime => {
                return prevTime > 0 ? prevTime - 1 : 0;     
            });
        }

        if(timerMode === "passage"){ // passage timer
            setTimerCountdown(prevTime => prevTime + 1);
        }
      }, 1000);  

      return () => clearInterval(id);
    }, [timerMode]);



    // This is for onChange
    const [typed, setTyped] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    
    const handleTyped = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTyped(e.target.value);
    }

    // This focus on the input element when the page first loads
    useEffect(() => {
        inputRef.current?.focus();
    }, []);


   

    const typing_check = () => {

        const text = data[difficulty][restart].text;
        const textArray = [...text];
        
        let correctChar = 0;
        let incorrectChar = 0;

        const coloredText = (
            <span>
                {
                    textArray.map((char, i) => {

                        let color = "hsl(240, 1%, 59%)";
                        let highlightBlock = " ";

                        // previous colored in
                        if(i < typed.length){
                            // color = (char === typed[i]) ? "green" : "red";             
                            if(char == typed[i]){
                                color = "green";
                                correctChar++;
                            }                 
                            else{
                                color = "red";
                                incorrectChar++;
                            } 
                        }

                        // current index highlighted
                        if(i === typed.length){
                            highlightBlock = "hsl(240, 3%, 26%)";

                        }
                        

                        return (
                        <span key={i} style={{color: color, backgroundColor: highlightBlock, borderRadius: "2px"}}>{ char }</span>
                        );
                    })
                }    
            </span>
        )
        
        return { coloredText, correctChar, incorrectChar };
        
    }

    const { coloredText, correctChar, incorrectChar } = typing_check();


    const[correctCount, setCorrectCount] = useState(0);
    const[incorrectCount, setIncorrectCount] = useState(0);
    
    const prevTyped = useRef("");

    useEffect(() => {
        if(typed.length > prevTyped.current.length){
            const index = typed.length - 1;

            if(typed[index] === data[difficulty][restart].text[index]){
                if(correctCount < typed.length){
                    setCorrectCount(count => count + 1);
                }
            }
            else{
                if(incorrectCount < typed.length){
                    setIncorrectCount(count => count + 1);
                }
            }
        }

        prevTyped.current = typed;
        
    }, [typed]);
    


    return(
        <>
        <header className='main-header'>
            <img src="../assets/images/logo-large.svg" alt="Typing Speed Logo" />
            <p>
                <img src={trophy} alt="trophy-icon" />
                <span>Personal best: <span className='personal-best-text'>92 WPM</span></span> 
            </p>
        </header>

        <main>
            <div className="stats-bar">
                
                <div className='stats-left'>
                    <span>WPM: <b className='wpm-text'>0</b></span>
                    <span>Accuracy: <b className='accuracy-text'>{ accuracyConverter(accuracy) }</b></span>
                    <span>Time: <b className='time-text'>{ timeConverter(timerCountdown) }</b></span>
                </div>
                

                <div className='stats-right'>
                    <span>Difficulty:
                        <button className={pressedDifficulty === "easy-pressed" ? "pressed" : ""} onClick={() => handleDifficulty("easy")}>Easy</button>
                        <button className={pressedDifficulty === "medium-pressed" ? "pressed" : ""} onClick={() => handleDifficulty("medium")}>Medium</button>
                        <button className={pressedDifficulty === "hard-pressed" ? "pressed" : ""} onClick={() => handleDifficulty("hard")}>Hard</button>
                    </span>

                    <span>Mode:
                        <button className={pressedMode === "timer60-pressed" ? "pressed" : ""} onClick={handleTimer60}>Timed (60s)</button>
                        <button className={pressedMode === "passage-pressed" ? "pressed" : ""} onClick={handlePassageTime}>Passage</button>
                    </span>
                </div>
               
            </div>

            <hr />

            <div className="main-typing-area">
                {/* <p>{data.easy[randomNum.current].id}</p> */}      {/* <p>{data[difficulty][restart].text}</p> */}
                <p>{ coloredText }</p>
                <p>Correct: {correctCount}</p>
                <p>Incorrect: {incorrectCount}</p>
                <input id="text-input" ref={inputRef} value={typed} onChange={(e) => handleTyped(e)} onBlur={() => inputRef.current?.focus()}/>
                















            </div>

            <hr />

            <div className='restart-container'>
                <button className='restartButton' onClick={handleRestart}>
                    Restart Test 
                    <img src={iconRestart} alt="restart-icon" />
                </button>
            </div>

        </main>
        

        </>
    );
}

export default MainTyping;