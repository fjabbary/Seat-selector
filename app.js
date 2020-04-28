const seats = document.querySelectorAll('.seat')
const container = document.querySelector('.container')
const count = document.getElementById('count')
const priceSpan = document.getElementById('total')
const selectTag = document.getElementById('movie-list');

let moviePrice = parseInt(selectTag.value)

populateUI();

function updateTotalPrice() {
    const selectedSeats = container.querySelectorAll('.selected').length
    count.innerText = selectedSeats;
    const totalPrice = moviePrice * selectedSeats
    priceSpan.innerText = totalPrice
}

function saveSelectedSeats(selectedSeats) {
    const seatsArr = [...selectedSeats]

    const indexes = seatsArr.map((item) => {
        return [...seats].indexOf(item)
    })

    localStorage.setItem('indexes', JSON.stringify(indexes))
}

function saveToLocalStorage(index, val) {
    localStorage.setItem('movieIndex', index)
    localStorage.setItem('moviePrice', val)
}

function populateUI() {
    const selectedIndexes = JSON.parse(localStorage.getItem('indexes')) || []
    const seatsArr = [...seats]

    seatsArr.forEach((item, index) => {
        selectedIndexes.forEach(el => {
            if (index == el) {
                item.classList.add('selected')
            }
        })
    })

    const movieIndex = parseInt(localStorage.getItem('movieIndex'))
    const savedPrice = parseInt(localStorage.getItem('moviePrice'))
    moviePrice = savedPrice
    selectTag.selectedIndex = movieIndex
}


//Event Listener for Select Tag
selectTag.addEventListener('change', e => {
    moviePrice = parseInt(e.target.value)
    updateTotalPrice();
    saveToLocalStorage(e.target.selectedIndex, e.target.value);
})

//Event Listener for Seat
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')
        const selectedSeats = container.querySelectorAll('.selected')

        saveSelectedSeats(selectedSeats);
        updateTotalPrice();
    }
})

updateTotalPrice()