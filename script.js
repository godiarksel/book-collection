const form = document.querySelector('form');
const bookList = document.querySelector('.book-list');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Math.random();
  }
}

function getBooks() {
  let bookCollection;
  if (localStorage.getItem('bookApp') === null) {
    bookCollection = [];
  } else {
    bookCollection = JSON.parse(localStorage.getItem('bookApp'));
  }
  return bookCollection;
}

function addBookToLocalStorage(book) {
  const bookCollection = getBooks();
  bookCollection.push(book);
  localStorage.setItem('bookApp', JSON.stringify(bookCollection));
}

function removeBook(id) {
  const bookCollection = getBooks();
  bookCollection.forEach((book, index) => {
    if (book.id === id) {
      bookCollection.splice(index, 1);
    }
    localStorage.setItem('bookApp', JSON.stringify(bookCollection));
  });
}

function addBookToList(book) {
  const newBook = document.createElement('div');
  newBook.classList.add('oneBook');
  newBook.innerHTML += `
  <span hidden>${book.id}</span>
  <p>"${book.title}" by ${book.author}</p>
  <button type="button" class="remove">Remove</button>`;
  bookList.appendChild(newBook);
}

function displayBooks() {
  const books = getBooks();
  books.forEach((book) => {
    addBookToList(book);
  });
}

document.addEventListener('DOMContentLoaded', displayBooks);

bookList.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const currentBook = e.target.closest('.oneBook');
    currentBook.remove();
    const id = currentBook.querySelector('span').textContent;
    removeBook(Number(id));
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const titleInput = document.querySelector('.title');
  const authorInput = document.querySelector('.author');
  if (titleInput.value.length > 0 && authorInput.value.length > 0) {
    const newBook = new Book(titleInput.value, authorInput.value);
    addBookToList(newBook);
    addBookToLocalStorage(newBook);
    titleInput.value = '';
    authorInput.value = '';
    titleInput.focus();
  }
});