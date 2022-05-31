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

    rvmBtn.addEventListener('click',()=>{
      removeBook(bookTitle,bookAuthor,book);
    })

    // create and object to store book data to push into the collection array and then store it in localStorage
    let books= new Object();
    books.title = bookTitle;
    books.author = bookAuthor;
    collection.push(books);
    localStorage.setItem('Book List',JSON.stringify(collection));
    
    titleIn.value = "";
    authorIn.value = "";
    
  }
}

// create a function to remove the books from the collection array using values from addBook() passed into the three parameters 
function removeBook (bookTitle,bookAuthor,book){
  book.remove();
  for (let i = 0; i < collection.length; i += 1) {
    if (collection[i].title === bookTitle && collection[i].author === bookAuthor) {
      collection.splice(i, 1);
      localStorage.setItem('Book List', JSON.stringify(collection));
    }
}
}

// An eventListener for the Add button
form.addEventListener('submit',(e)=> {
  e.preventDefault();
  addBook();
})