const gallery = document.querySelector('.gallery'); 
const cards = document.getElementsByClassName('card');


//Fetch function gets data from API

fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => generateProfile(data.results))


//Function that loops through the data from the API and inserts it into employee profiles

function generateProfile(data) {
    for(let i = 0; i < data.length; i++) {
        let profileHTML = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${data[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
                <p class="card-text">${data[i].email}</p>
                <p class="card-text cap">${data[i].location.city}</p>
            </div>
        </div>
        `;
        gallery.insertAdjacentHTML("beforeend", profileHTML);
        
    }
    //Event Listener for bringing up more informaiton on employees
    for(let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", () => generateModal(data[i]));
    }
}

//generates the employee more information popup
function generateModal(employee) {
    let modalHTML = `<div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${employee.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="modal-text">${employee.email}</p>
            <p class="modal-text cap">${employee.location.city}</p>
            <hr>
            <p class="modal-text">${employee.cell}</p>
            <p class="modal-text">${employee.location.street.number} ${employee.location.street.name} ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}</p>
            <p class="modal-text">Birthday: ${convertDateString(employee.dob.date)}</p>
        </div>
    </div>`;
    gallery.insertAdjacentHTML("afterend", modalHTML);

    const modalButton = document.getElementById("modal-close-btn");
//Listenes for a click on the X button to exit the employee popup
    modalButton.addEventListener('click', (e) => {
        document.getElementsByClassName('modal-container')[0].remove();
    })
}

//converts DOB to the desired format
//Got some of this code from here: https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd 
function convertDateString(dateStr) {
    const d = new Date(dateStr);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [month, day, year].join('/');
}

