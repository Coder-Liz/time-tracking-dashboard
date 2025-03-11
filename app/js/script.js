const buttons = document.querySelectorAll('.dashboard__btn');
const timecards = document.querySelectorAll('.dashboard__timecard');

let timeframe = 'weekly'; // Default timeframe

async function fetchData() {
  const response = await fetch('/app/js/data.json');
  const data = await response.json();
  updateUI(data);
}

function updateUI(data) {
  data.forEach((item) => {
    const card = [...timecards].find(
      (card) => card.querySelector('h3').textContent === item.title
    );
    if (card) {
      const currentTime = item.timeframes[timeframe].current;
      const previousTime = item.timeframes[timeframe].previous;
      const currentUnit = currentTime === 1 ? 'hr' : 'hrs';
      const previousUnit = previousTime === 1 ? 'hr' : 'hrs';

      card.querySelector(
        '.dashboard__timecard-current'
      ).textContent = `${currentTime}${currentUnit}`;
      card.querySelector(
        '.dashboard__timecard-previous'
      ).textContent = `Previous - ${previousTime}${previousUnit}`;
    }
  });
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    buttons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    timeframe = button.textContent.toLowerCase();
    fetchData();
  });
});

fetchData();
