// Treehouse Techdegree:
// FSJS project 2 - List Filter and Pagination

// A global variable for the list items of students   

const list = document.querySelectorAll('li.student-item'); 

// A function that shows only ten students on each page 

function showPage (list, page) {
   const itemPerPage = 10;  
   const startIndex = (page * itemPerPage) - itemPerPage; 
   const endIndex = page * itemPerPage; 
   for (let i = 0; i < list.length; i ++) {
      if (i >= startIndex && i < endIndex) {
         list[i].style.display = ''; 
      } else {
         list[i].style.display = 'none'; 
      }
   }
}

// A function that counts the amount of pages for the list

function pagesNumber () {
   const itemPerPage = 10; 
   const pagesNumber = Math.ceil(list.length / itemPerPage); 
   return pagesNumber;
}

// A function that creates pagination buttons and make them functinal

function appendPageLinks () {
   const div = document.querySelector('div.page'); 
   const divPagination = document.createElement('div'); // create a new div 
   divPagination.className = 'pagination'; 
   div.appendChild(divPagination); // append the new div to the DOM 
   const ul = document.createElement('ul'); // create a list of buttons
   divPagination.appendChild(ul); 
   for (let i = 1; i <= pagesNumber(); i ++) { // create and append button items for the buttons' list
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

// Call functions for showing a page and list pagination 

showPage (list, 1); 
appendPageLinks (list); 

// Create and append the elements of searchbar

const pageheaderDiv = document.querySelector('div.page-header'); 
const searchbarDiv = document.createElement('div'); 
pageheaderDiv.appendChild(searchbarDiv); 
searchbarDiv.className = 'student-search'; 
const searchbarInput = document.createElement('input'); // create input
searchbarInput.type = 'text'; 
searchbarInput.setAttribute('id', 'input'); 
searchbarInput.placeholder = 'search...'; 
searchbarDiv.appendChild(searchbarInput);  
const searchbarButton = document.createElement('button'); // create button 
searchbarButton.textContent = 'Search'; 
searchbarDiv.appendChild(searchbarButton); 
const searchedName = searchbarInput.value.toLowerCase(); // input value

// A function for searching 

function searchbar (searchedName) {
   let searchbarList = []; // an empty array to get filtered list items in
   for (let i = 0; i < list.length; i ++) { // looping through students' names 
     const studentNameElement = list[i].getElementsByTagName('h3'); 
     const studentName = studentNameElement.innerHTML;
     if (searchedName.indexOf(studentName)) { // check if the name is equal to the searched one
       searchbarList.push(list[i]); 
     } 
   }
   if (searchbarList.length === 0) { // message if the name is not found
   let message = document.createElement('p'); 
   pageheaderDiv.appendChild(message); 
   message.innerHTML = `No matches are found by the search.`;
   } else {
      showPage(searchbarList, 1); // if the name is found, show it
      appendPageLinks(searchbarList);
   }
}

// A handler for the input 

searchbarInput.addEventListener('keyup', () => {
   searchbar (searchedName);
});

// A handler for the button 

searchbarButton.addEventListener('click', () => {
   searchbar (searchedName);
});

