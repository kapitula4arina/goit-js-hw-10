import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDates = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const timerDay = document.querySelector('span[data-days]');
const timerHour = document.querySelector('span[data-hours]');
const timerMinute = document.querySelector('span[data-minutes]');
const timerSecond = document.querySelector('span[data-seconds]'); 

inputDates.classList.add('date');
startButton.classList.add('button-start');
startButton.disabled = true;
let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= options.defaultDate) {
            startButton.disabled = true;

            iziToast.error({
                message: 'Please choose a date in the future',   
                messageColor: 'white',
                position: 'topRight',
                backgroundColor: 'rgb(255, 76, 76)',
                close: false,
                progressBar: false,
                theme: 'dark',
                timeout: 3000,
            });
        } else {
            startButton.disabled = false;
            
            userSelectedDate = selectedDates[0];
        };
    },
};

flatpickr(inputDates, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};

startButton.addEventListener('click', StartTimer);

const addLeadingZero = value => value.toString().padStart(2, '0');

function StartTimer() {
    startButton.disabled = true;
    inputDates.disabled = true;
    
    const timer = setInterval(() => {
        let nowDate = new Date();
        let selectedDate = userSelectedDate;
        let dateDifference = selectedDate - nowDate;

        const { days, hours, minutes, seconds } = convertMs(dateDifference);

        timerDay.textContent = addLeadingZero(days);
        timerHour.textContent = addLeadingZero(hours);
        timerMinute.textContent = addLeadingZero(minutes);
        timerSecond.textContent = addLeadingZero(seconds);
    
        const finishTimer = [days, hours, minutes, seconds].every((value) => value === 0);

        if(finishTimer) {
            clearInterval(timer);

            inputDates.disabled = false;
        }
    }, 1000);
};

