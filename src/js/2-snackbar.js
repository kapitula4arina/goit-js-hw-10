import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[type="number"]');
inputDelay.classList.add('inputDelay');

form.addEventListener('submit', addPromise);

function addPromise(e) {
    e.preventDefault();

    const delay = form.elements.delay.value;
    const state = form.elements.state.value;

    form.reset();

    const makePromise = ( delay, state ) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (state === 'fulfilled') {
                    resolve(delay);
                } else {
                    reject(delay);
                }
            }, delay);
        });;
    };

    makePromise(delay, state)
        .then(delay => {
            iziToast.success({
                message: `✅ Fulfilled promise in ${delay}ms`,
                messageColor: 'white',
                position: "topRight",
                icon: false,
                backgroundColor: 'rgb(76, 255, 76, 0.7)',
            });
        })
        .catch(delay => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                messageColor: 'white',
                position: "topRight",
                icon: false,
                backgroundColor: 'rgb(255, 76, 76, 0.7)',
            });
        });
}