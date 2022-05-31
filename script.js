const form = document.querySelector('#form');
const titleIn = document.querySelector('.title');
const authorIn = document.querySelector('.author');

// intialize an array to fetch books from localStorage. If no books are available should return an empty string.
let collection = JSON.parse(localStorage.getItem('Book List'))  || [];

// create a function to add books to the collection array and display the books also.
function addBook(){
  const bookList = document.querySelector('.book-list');
  let bookTitle = titleIn.value;
  let bookAuthor = authorIn.value;
  if(bookTitle != "" || bookAuthor != ""){
    
  // create and append all necessary elements of the book list to the div with a book-list class
    const book = document.createElement('div');
    book.innerHTML = `
    <h2>
      ${bookTitle}
    </h2>
    <p>
      ${bookAuthor}
    </p>
    `;
    const rvmBtn = document.createElement('button');
    rvmBtn.type = 'button';
    rvmBtn.innerText = 'Remove';
    book.appendChild(rvmBtn);

    const divider = document.createElement('hr');
    book.appendChild(divider);
    bookList.appendChild(book);

    
  }
}