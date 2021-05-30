const date = document.getElementById('date').dataset.date;
const poop = (date) => {
  return date.toLocaleDateString();
};

console.log(poop);