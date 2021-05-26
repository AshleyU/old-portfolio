/*
Data Pagination and Filtering: Student List
*/

/*
The "showPage" function first shows "no students found" 
if the list is empty. If the list is not empty it creates 
and inserts the elements needed to display the page of nine students.
*/

function showPage (list, page) {
	if ( list === undefined || list.length == 0 ) {
		const studentList = document.querySelector(".student-list");
		studentList.innerHTML = "<h2>No students found.</h2>";
		return;
	}
	const startIndex = (page * 9) - 9;
	let endIndex = page * 9;
	let studentLeft = list.length - startIndex;

	if ( studentLeft < 9 ) {
		endIndex = list.length;
	}

	const studentList = document.querySelector(".student-list");
	studentList.innerHTML = "";
	for (let i = 0; i < list.length; i++) {
		if ( i >= startIndex && i < endIndex ) {
			let studentItem = list[i];
			let studentTemplate = getStudentTemplate(studentItem);
			studentList.insertAdjacentHTML("beforeend", studentTemplate);
		}
	}
}

/*
The "getStudentTemplate" function puts together the template for each
student's information and returns the template. 
Added this just to keep my code more organized.
*/

function getStudentTemplate (studentItem) {
	let studentTemplate = ` <li class="student-item cf">
    	<div class="student-details">
			<img class="avatar" src="${studentItem.picture.medium}" alt="Profile Picture">
			<h3>${studentItem.name.title} ${studentItem.name.first} ${studentItem.name.last}</h3>
			<span class="email">${studentItem.email}</span>
		</div>
		<div class="joined-details">
			<span class="date">Joined ${studentItem.registered.date}</span>
		</div>
		</li>`;
	return studentTemplate;
}

/*
The "addPagination" function creates and inserts the elements 
needed for the pagination buttons. The addEventListener inside the function
listens for button clicks to show the page which was clicked.
*/

function addPagination (list) {
	const numOfButtons = Math.ceil(list.length / 9);
	const linkList = document.querySelector(".link-list");
	linkList.innerHTML = "";
	for ( let i = 1; i <= numOfButtons; i++ ) {
		let pageNumButtons = list[i];
		let buttonTemplate = `<li>
   		<button type="button">${i}</button>
 		</li>`
 		linkList.insertAdjacentHTML("beforeend", buttonTemplate);
	}
	
	if ( list.length > 0 ) {
	
	const firstButton = linkList.querySelector('button');
    firstButton.className = 'active';
    
	}
	
	linkList.addEventListener('click', (e) => {
		if ( e.target.tagName === 'BUTTON') {
			const activeButton = document.querySelector(".active");
			activeButton.className = "";
			e.target.className = "active";
			showPage(list, e.target.textContent);
		}
	}); 
}

/*
The "addSearchBar" function creates and inserts the elements 
needed for the search bar and then uses an addEventListener to listen
for input into the search bar or button clicks. When an event happens
they call the performSearch function.
*/

function SearchBar (list) {
	const pageHeader = document.querySelector(".header");
	const searchBar = `<label for="search" class="student-search">
  					   <input id="search" placeholder="Search by name...">
  					   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
					   </label>`		
 	pageHeader.insertAdjacentHTML("beforeend", searchBar);
	const searchInput = document.querySelector("#search");
	const searchButton = searchInput.nextElementSibling;
	searchInput.addEventListener('keyup', (e) => {
		if ( e.target.tagName === 'INPUT') {
			performSearch(searchInput.value);
		}
	});
	searchButton.addEventListener('click', (e) => {
		if ( e.target.tagName === 'BUTTON') {
			performSearch(searchInput.value);
		}
	});
}

/* 
The "performSearch" function loops through the student data array
and then, using a conditional statement, makes sure the input matches
a student's first or last name. Then, the matching student displays
on the page.
*/

function performSearch (inputText) {
	let filteredStudents = [];
	for (let i = 0; i < data.length; i++) {
		const firstIncludesInput = data[i].name.first.toLowerCase().includes(inputText.toLowerCase());
		const lastIncludesInput = data[i].name.last.toLowerCase().includes(inputText.toLowerCase());
		if ( firstIncludesInput || lastIncludesInput ) {
			filteredStudents.push(data[i]);
		}
	}
	showPage(filteredStudents, 1);
	addPagination(filteredStudents);
}

// Calling functions

SearchBar(data);

showPage(data, 1);

addPagination(data);




