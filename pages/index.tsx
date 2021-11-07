import React from "react"
import styles from "../styles/Home.module.css";

const {
  container,
  timer,
  buttonContainer,
  button,
} = styles;

const { useState, useEffect, useRef } = React;

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [start, setStart] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | number | undefined>();
  useEffect(() => {
    if (start) {
      timerRef.current = window.setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    }

    return () => { clearInterval(timerRef.current! as number); };
  }, [start, timerRef.current]);

  const startTimer = () => {
    setStart(true);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current! as number);
    setStart(false);
  };

  const resetTimer = () => {
    setCounter(900);
  };

  const addStartTime = () => {
    setCounter(counter + 1);
  };

  const reduceStartTime = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };


  const renderActions = () => {
    if (start) {
      return (
        <React.Fragment>
          <div className={button} onClick={stopTimer}>Stop</div>
          <div className={button} onClick={resetTimer}>Reset</div>
        </React.Fragment>
      )
    }

    return (
      <React.Fragment>
        <div className={button} onClick={addStartTime}>+</div>
        <div className={button} onClick={reduceStartTime}>-</div>
        <div className={button} onClick={startTimer}>Start</div>
      </React.Fragment>
    )

  }

  return (
    <div className={container}>
      <div className={timer}>{counter}</div>
      <div className={buttonContainer}>
        {renderActions()}
      </div>
    </div>
  )
}
