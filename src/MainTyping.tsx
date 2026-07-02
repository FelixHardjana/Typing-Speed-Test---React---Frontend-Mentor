
import data from '../data.json';
import iconRestart from '/assets/images/icon-restart.svg';

import { useState, useRef } from 'react'

const MainTyping = () => {

    const randomNum = Math.floor(Math.random() * 10);
    console.log(randomNum);

    const [difficulty, setDifficulty] = useState("");

    const handleDifficulty = (difficultyMode: string) => {
        setDifficulty(difficultyMode);
    }

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
                    <span>Time:</span>
                </div>
                

                <div className='stats-right'>
                    <span>Difficulty:
                        <button onClick={() => handleDifficulty("easy")}>Easy</button>
                        <button onClick={() => handleDifficulty("medium")}>Medium</button>
                        <button onClick={() => handleDifficulty("hard")}>Hard</button>
                    </span>
                    <span>Mode:</span>
                </div>
               
            </div>

            <hr />

            <div className="main-typing-area">
                <p>{data.easy[randomNum].id}</p>
            </div>

            <button>
                Restart Test 
                <img src={iconRestart} alt="restart-icon" />
            </button>

            <hr />

        </main>
        

        </>
    );
}

export default MainTyping;