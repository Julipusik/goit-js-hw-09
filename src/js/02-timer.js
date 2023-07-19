import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const inputEl = document.querySelector('input#datetime-picker');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      
      if (selectedDate <= new Date()) {
          startBtn.disabled = true;
          Notiflix.Notify.failure('Please choose a date in the future');
      } else {
          startBtn.addEventListener('click', startTimer);
          startBtn.disabled = false;
      }
  },
};

const flatpickrInstance = flatpickr(inputEl, options);

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
}

function addLeadingZero(value) {
      return String(value).padStart(2, '0');
}

function startTimer() {
  startBtn.disabled = true;
  const timerFields = document.querySelectorAll('.timer .value');
  const endDate = flatpickrInstance.selectedDates[0].getTime();

  function updateTimer() {
    const currentDate = new Date().getTime();
    const remainingTime = endDate - currentDate;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      timerFields.forEach(field => (field.textContent = '00'));
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(remainingTime);

    timerFields[0].textContent = addLeadingZero(days);
    timerFields[1].textContent = addLeadingZero(hours);
    timerFields[2].textContent = addLeadingZero(minutes);
    timerFields[3].textContent = addLeadingZero(seconds);
  }

  const timerInterval = setInterval(updateTimer, 1000);
}