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
         list[i].style.display = 'block'; 
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

// Call functions for showing the list with ten items on one page and pagination

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
const message = document.createElement('p'); // if search has no results, this message will be displayed 
searchbarDiv.appendChild(message); 
message.innerHTML = `<p>Sorry, but no matches are found by the search.<p>`;
message.style.display = 'none'; // hide message and reveal only when the search has no results

// A function for searching by the searchbar 

function searching (searchName) {
   let searchList = []; // an empty array to get filtered list items in
   for (let i = 0; i < list.length; i ++) { // looping through students' names 
     const studentName = list[i].children[0].children[1].innerText; 
     if (studentName.indexOf(searchName) > -1) { // check if the name is equal to the searched one
       searchList.push(list[i]); //  
     } 
   }
   return searchList; 
}

// A function that shows the list of students depending on use of the searchbar

function showing (searchList) {
   if (searchList.length > 0) { // if the name is found
      showPage (searchList, 1); // show the list of searched names 
      appendPageLinks (searchList);
   }
   else { // if the name is not found
      message.style.display = ''; // message if the name is not found
   } 
}

// A handler for the input 

searchbarInput.addEventListener('keyup', () => {
   const searchName = searchbarInput.value.toLowerCase(); 
   showing (searching (searchName)); 
});

// A handler for the button 

searchbarButton.addEventListener('click', () => {
   const searchName = searchbarInput.value.toLowerCase(); 
   showing (searching (searchName));
});

