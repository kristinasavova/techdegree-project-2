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

// create and append the elements of searchbar
const div = document.querySelector('div.page-header'); 
const button = document.createElement('button'); 
button.className = 'student-search'; 
button.textContent = 'Search'; 
div.appendChild(button); 
const input = document.createElement('input'); 
input.className = 'student-search';
div.appendChild(input);  
const searchedName = input.value.toLowerCase();

// make searchbar funtional
function searchBar () {
   for (let i = 0; i < list.length; i ++) {
      const listDiv = list.firstElementChild; 
      const span = listDiv.lastElementChild; 
      const h3 = span.previousElementSibling; 
      const studentName = h3.textContent || h3.innerHTML;  
      if (studentName.indexOf(searchedName) > -1) {
         list.style.display = ''; 
      } else {
         list.style.display = 'none'; 
      }
   }
}

showPage(list, 1); 
appendPageLinks(list); 
searchBar();
