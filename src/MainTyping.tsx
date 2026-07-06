
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


    const handleDifficulty = (difficultyMode: difficultyType) => {
        setDifficulty(difficultyMode);
        setPressedDifficulty(`${difficultyMode}-pressed`);
    }

    const handleRestart = () => {
        let randNum = Math.floor(Math.random() * 10);
        setRestart(randNum);
    }

    const handleTimer60 = () => {
        setTimerMode("timer60");
        setTimerCountdown(60);
        setPressedMode(`timer60-pressed`);
    }
    
    const handlePassageTime = () => {
        setTimerMode("passage");
        setTimerCountdown(0);
        setPressedMode(`passage-pressed`);
    }

    const timeConverter = (prevTime: number) => {
        const minutes = Math.floor(prevTime / 60);
        const seconds = Math.floor(prevTime % 60);

        return `${minutes}:` + `${seconds}`.padStart(2, "0");

    }

    // This is 60s timer
    useEffect(() => { // this is for the 60 second timer countodwn
      const id = setInterval(() => {
        if(timerMode === "timer60"){
            setTimerCountdown(prevTime => {
                return prevTime > 0 ? prevTime - 1 : 0;
                
            });
        }

        if(timerMode === "passage"){
            setTimerCountdown(prevTime => prevTime + 1);
        }
    
      }, 1000);  

      return () => clearInterval(id);
    }, [timerMode]);


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
                    <span>Accuracy: <b className='accuracy-text'>100%</b></span>
                    <span>Time: <b className='time-text'>{timeConverter(timerCountdown)}</b></span>
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
                {/* <p>{data.easy[randomNum.current].id}</p> */}
                <p>{data[difficulty][restart].text}</p>

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