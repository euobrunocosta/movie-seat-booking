const contaier = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.ocuppied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

let ticketPrice = movieSelect.value

const updateSelectedCountAndTotal = () => {

  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice

  const seatsIndexes = [...selectedSeats].map(seat => [...seats].indexOf(seat))
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndexes))

}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
  if (selectedMovieIndex != null) {
    movieSelect.selectedIndex = selectedMovieIndex
  }
}

movieSelect.addEventListener('change', e => {
  ticketPrice = e.target.value
  updateSelectedCountAndTotal()
  localStorage.setItem('selectedMovieIndex', e.target.selectedIndex)
})

contaier.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
    updateSelectedCountAndTotal()
  }
})

updateSelectedCountAndTotal()