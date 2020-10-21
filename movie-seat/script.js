const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const container = document.querySelector('.container');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie = document.getElementById('movie');

let ticketPrice = +movie.value;

populateUI();

function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  
  seats.forEach((seat, index) => {
    if(selectedSeats.indexOf(index) > -1)
      seat.classList.add('selected');
  })

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  
}

movie.addEventListener('change', e => {
  ticketPrice = +e.target.value;

  localStorage.setItem('selectedMovieIndex', e.target.selectedIndex);
  localStorage.setItem('selectedMoviePrice', e.target.value);
  updateAmount();
})

function updateAmount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const seatsIndex = [ ...selectedSeats ].map(seat => [ ...seats ].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}

container.addEventListener('click', e => {
  if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')){
      e.target.classList.toggle('selected');

      updateAmount();
    }
})

updateAmount();