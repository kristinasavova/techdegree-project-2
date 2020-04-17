// Treehouse Techdegree:
// FSJS project 2 - List Filter and Pagination

// A global variable for the list of students and amount of items per page   

const studentsList = document.querySelectorAll('li.student-item'); 
const itemPerPage = 10; 

// A function that shows only ten students on each page 

function showPage (list, page) {
   const startIndex = (page * itemPerPage) - itemPerPage; 
   const endIndex = page * itemPerPage; 
   for (let i = 0; i < list.length; i ++) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = 'block'; 
      } else {
         list[i].style.display = 'none'; 
      }
   }
}

// A function that creates pagination buttons and make them functinal

function appendPageLinks (list) {
   const pagesNumber = Math.ceil(list.length / itemPerPage);
   const pagDiv = document.querySelector('div.pagination'); 
   if (pagDiv) {
      pagDiv.remove();
   } // remove additional rows of buttons which appear each time the search is made 
   const div = document.querySelector('div.page'); 
   const divPagination = document.createElement('div'); // create a new div 
   divPagination.className = 'pagination'; 
   div.appendChild(divPagination); // append the new div to the DOM 
   const ul = document.createElement('ul'); // create a list of buttons
   divPagination.appendChild(ul); 
   for (let i = 1; i <= pagesNumber; i ++) { // create and append button items for the buttons' list
      li = document.createElement('li');
      li.className = 'pagination'; 
      ul.appendChild(li); 
      const a = document.createElement('a'); // create and append links for each button
      li.appendChild(a);  
      a.setAttribute('href', '#'); 
      a.textContent = i; 
      if (i === 1) {
         a.className = 'active'; // make the first button active
      } 
      a.addEventListener('click', (e) => {
         let activeLink = document.querySelector('a.active'); 
         activeLink.classList.remove('active'); // remove the active class from the active button
         e.target.classList.add('active'); // make a clicked button active
         showPage(list, a.textContent); 
      })
   }
} 

// Call functions for showing the list with ten items on one page and pagination

showPage (studentsList, 1); 
appendPageLinks (studentsList);

// Create and append the elements of searchbar

const pageDiv = document.querySelector('.page');
const pageheaderDiv = document.querySelector('div.page-header'); 
const searchbarDiv = document.createElement('div'); 
pageheaderDiv.appendChild(searchbarDiv); 
searchbarDiv.className = 'student-search'; 
const searchbarInput = document.createElement('input'); // create input
searchbarInput.type = 'text'; 
searchbarInput.setAttribute('id', 'input'); 
searchbarInput.placeholder = 'Search...'; 
searchbarDiv.appendChild(searchbarInput);  
const searchbarButton = document.createElement('button'); // create button 
searchbarButton.textContent = 'Search'; 
searchbarDiv.appendChild(searchbarButton); 
const message = document.createElement('h1'); // if search has no results, this message will be displayed 
pageDiv.appendChild(message); 
message.textContent = 'Sorry, but no matches are found by the search.';
message.style.display = 'none'; // hide message and reveal only when the search has no results

// A function for searching by the searchbar 

function searchStudent (name) {
   let searchedList = []; // an empty array to get filtered list items in
   for (let i = 0; i < studentsList.length; i ++) { // looping through students' names 
     const studentName = studentsList[i].children[0].children[1].innerText; 
     if (studentName.indexOf(name) > -1) { // check if the name is equal to the searched one 
      searchedList.push(studentsList[i]);   
     } else {
      studentsList[i].style.display = 'none'; // hide list items that don't match
     }
   }
   return searchedList; 
}

// A function that shows the list of students depending on use of the searchbar

function showSearch (list) {
   if (list.length > 0) { // if the name is found
      showPage (list, 1); // show the list of searched names 
      appendPageLinks (list);
   }
   else { // if the name is not found
      message.style.display = 'block'; // message if the name is not found
   } 
}

// A handler for the input 

searchbarInput.addEventListener('keyup', () => {
   message.style.display = 'none'; 
   const searchedName = searchbarInput.value.toLowerCase(); 
   const foundName = searchStudent(searchedName); 
   showSearch(foundName); 
});

// A handler for the button 

searchbarButton.addEventListener('click', () => {
   message.style.display = 'none'; 
   const searchedName = searchbarInput.value.toLowerCase(); 
   const foundName = searchStudent(searchedName);
   showSearch(foundName); 
});

