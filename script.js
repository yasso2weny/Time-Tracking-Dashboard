const freqButtons = document.querySelectorAll('.freq');
const currentTimeEls = document.querySelectorAll('.tf-current');
const previousTimeEls = document.querySelectorAll('.tf-prev');

// Load the data once and use it later
let timeData = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    timeData = data;

    // Optional: load weekly data by default
    updateDashboard('weekly');
  })
  .catch(error => console.error('Error loading JSON:', error));

// Add event listeners
freqButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all, then add to clicked one
    freqButtons.forEach(btn => btn.classList.remove('active-freq'));
    button.classList.add('active-freq');

    const selected = button.textContent.toLowerCase(); // daily, weekly, monthly
    updateDashboard(selected);
  });
});

// Function to update all time entries based on selected frequency
function updateDashboard(frequency) {
  timeData.forEach((item, index) => {
    const current = item.timeframes[frequency].current;
    const previous = item.timeframes[frequency].previous;

    currentTimeEls[index].textContent = `${current}hrs`;
    previousTimeEls[index].textContent = `Last ${frequency} - ${previous}hrs`;
  });
}
