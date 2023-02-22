import "./Countdown.css";
import { useState, useEffect } from "react";

const Countdown = ({SelCountDownDate}) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    let countDownDate = new Date(SelCountDownDate).getTime();
    console.log(countDownDate);
    let x = setInterval(() => {
      //getTime devuelve milisegundos
      let now = new Date().getTime();
      let distance = countDownDate - now;
      //Math.floor devuelve número redondeado hacia abajo
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime(`D-${days}`);

      if (distance < 0) {
        //Cancela el intervalo
        clearInterval(x);
        setTime("COUNTDOWN FINISHED");
      }
    }, 1000);
    console.log(x);
  }, [SelCountDownDate]);

  return (
    <div className="countdown">
      <h2>{time}</h2>
    </div>
  );
};

export default Countdown;
