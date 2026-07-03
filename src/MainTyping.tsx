
import data from '../data.json';
import iconRestart from '/assets/images/icon-restart.svg';

import { useState, useRef, useEffect } from 'react'

type difficultyType = "easy" | "medium" | "hard";

const MainTyping = () => {

    const randomNum = useRef(Math.floor(Math.random() * 10));
    console.log(randomNum);

    const [difficulty, setDifficulty] = useState<difficultyType>("easy");
    const [restart, setRestart] = useState(randomNum.current);
    const [timerCountdown, setTimerCountdown] = useState<number>(60);



    const handleDifficulty = (difficultyMode: difficultyType) => {
        setDifficulty(difficultyMode);
    }

    const handleRestart = () => {
        let randNum = Math.floor(Math.random() * 10);
        setRestart(randNum);
    }

    const handleTimer60 = () => {
        setTimerCountdown(60);
    }
    
    const handlePassageTime = () => {
        setTimerCountdown(0);
    }

    // This is 60s timer
    useEffect(() => { // this is for the 60 second timer countodwn
      const id = setInterval(() => {
        if(timerCountdown !== null && timerCountdown > 0){
            setTimerCountdown(prevTime => prevTime - 1);
        }
      }, 1000);  

      return () => clearInterval(id);
    }, [handleTimer60]);


    // This is Passage timer
    useEffect(() => {
        const id = setInterval(() => {
            setTimerCountdown(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(id);
    }, [handlePassageTime]);

    return(
        <>
        <header>
            <img src="../assets/images/logo-large.svg" alt="Typing Speed Logo" />
        </header>

        <main>
            <div className="stats-bar">
                
                <div className='stats-left'>
                    <span>WPM:</span>
                    <span>Accuracy:</span>
                    <span>Time:{timerCountdown}</span>
                </div>
                

                <div className='stats-right'>
                    <span>Difficulty:
                        <button onClick={() => handleDifficulty("easy")}>Easy</button>
                        <button onClick={() => handleDifficulty("medium")}>Medium</button>
                        <button onClick={() => handleDifficulty("hard")}>Hard</button>
                    </span>

                    <span>Mode:
                        <button onClick={handleTimer60}>Timed (60s)</button>
                        <button onClick={handlePassageTime}>Passage</button>
                    </span>
                </div>
               
            </div>

            <hr />

            <div className="main-typing-area">
                {/* <p>{data.easy[randomNum.current].id}</p> */}
                <p>{data[difficulty][restart].text}</p>

            </div>

            <button onClick={handleRestart}>
                Restart Test 
                <img src={iconRestart} alt="restart-icon" />
            </button>

            <hr />

        </main>
        

        </>
    );
}

export default MainTyping;