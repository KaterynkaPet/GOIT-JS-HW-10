import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


let intervalId = null;
let featureTime = null;
const startBtn = document.querySelector(`button`);

const clockFace = document.querySelectorAll(`.value`);
const inputTime = document.querySelector(`#datetime-picker`);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    featureTime = selectedDates[0];
    intervalId = featureTime - new Date();
    if (intervalId < 1) {
      iziToast.error({
        color: `red`,
        position: `topRight`,
        message: `Please choose a date in the future`,
      });
    } else {
      startBtn.disabled = false;
      inputTime.disabled = true;
      startBtn.classList.add(`btn-active`);
      }
    },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const calendar = flatpickr(`#datetime-picker`, options);

console.log(clockFace);

//----------------------------------------------------------
startBtn.disabled = true;

startBtn.addEventListener(`click`, event => {
  intervalId = setInterval(() => {
    const deltaTime = featureTime - new Date();
    startBtn.classList.remove(`btn-active`);

    if (deltaTime < 1) {
      startBtn.disabled = true;
      clearInterval(intervalId);
      return;
    }
    const timer = convertMs(deltaTime);
    clockFace[0].innerText = timer.days.toString().padStart(2, '0');
    clockFace[1].innerText = timer.hours.toString().padStart(2, '0');
    clockFace[2].innerText = timer.minutes.toString().padStart(2, '0');
    clockFace[3].innerText = timer.seconds.toString().padStart(2, '0');
    
}, 1000);

});


