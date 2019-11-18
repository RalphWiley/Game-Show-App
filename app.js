const letters = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const start = document.querySelector('.btn__reset');
const missed = 0;
console.log(start);
start.addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    console.log(overlay);
});


if (missed === 5){
    console.log('Game Over');
}