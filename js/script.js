/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const list = document.querySelectorAll('li.student-item'); 



/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/
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

function pagesNumber () {
   const itemPerPage = 10; 
   const pagesNumber = Math.ceil(list.length / itemPerPage); 
   return pagesNumber;
}



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks () {
   const div = document.querySelector('div.page'); 
   const divPagination = document.createElement('div'); 
   divPagination.className = 'pagination'; 
   div.appendChild(divPagination); 
   const ul = document.createElement('ul');
   divPagination.appendChild(ul); 
   for (let i = 1; i <= pagesNumber(); i ++) {
      li = document.createElement('li');
      li.className = 'pagination'; 
      ul.appendChild(li); 
      const a = document.createElement('a'); 
      li.appendChild(a);  
      a.setAttribute('href', '#'); 
      a.textContent = i; 
      ul.addEventListener('click', (e) => {
      for (let j = 1; j <= pagesNumber(); j ++) {
         a.classList.remove('active'); 
           
      e.target.classList.add('active'); 
      showPage(list, j);
      }
      })
   }
   } 


showPage(list, 1); 
appendPageLinks(list); 




// Remember to delete the comments that came with this file, and replace them with your own code comments.