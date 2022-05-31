const form = document.querySelector('#form');
const titleIn = document.querySelector('.title');
const authorIn = document.querySelector('.author');

// intialize array to get books from localStorage.If no books return an empty string.
const collection = JSON.parse(localStorage.getItem('Book List')) || [];
function removeBook(bookTitle, bookAuthor, book) {
  book.remove();
  for (let i = 0; i < collection.length; i += 1) {
    if (collection[i].title === bookTitle && collection[i].author === bookAuthor) {
      collection.splice(i, 1);
      localStorage.setItem('Book List', JSON.stringify(collection));
    }
  }
}

// create func to add books to the collection and display the books.
function addBook() {
  const bookList = document.querySelector('.book-list');
  const bookTitle = titleIn.value;
  const bookAuthor = authorIn.value;
  if (bookTitle !== '' || bookAuthor !== '') {
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

    rvmBtn.addEventListener('click', () => {
      removeBook(bookTitle, bookAuthor, book);
    });

    // create object to store book data and then store it in localStorage
    const books = {};
    books.title = bookTitle;
    books.author = bookAuthor;
    collection.push(books);
    localStorage.setItem('Book List', JSON.stringify(collection));
    titleIn.value = '';
    authorIn.value = '';
  }
}

// An eventListener for the Add button
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBook();
});

//please comment the code below as it does not work
document .addEventListener('DOMContentLoaded', () =>{
    
  document.getElementById('submit').addEventListener('click', addBook);
});