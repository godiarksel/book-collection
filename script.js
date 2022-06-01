const form = document.querySelector('#form');
const titleIn = document.querySelector('.title');
const authorIn = document.querySelector('.author');
const collection = JSON.parse(localStorage.getItem('Book List')) || [];

class Book {
  constructor(title, author) {
    this.title = title;
    this.author =  author;
  }
  
   addBook() {
    const bookList = document.querySelector('.book-list');
    if (this.title !== '' || this.author !== '') {
      const book = document.createElement('div');
      book.classList.add('oneBook');
      book.innerHTML = `
      <p>
       "${this.title}" by ${this.author}
      </p>
      `;
      const rvmBtn = document.createElement('button');
      rvmBtn.type = 'button';
      rvmBtn.innerText = 'Remove';
      book.appendChild(rvmBtn);
      bookList.appendChild(book);
  
      rvmBtn.addEventListener('click', () => {
          book.remove();
          for (let i = 0; i < collection.length; i += 1) {
            if (collection[i].title === this.title && collection[i].author === this.author) {
              collection.splice(i, 1);
              localStorage.setItem('Book List', JSON.stringify(collection));
            }
        }
      });
      const myBooks = {};
      myBooks.title = this.title;
      myBooks.author = this.author;
      collection.push(myBooks);
      localStorage.setItem('Book List', JSON.stringify(collection));
      // localStorage.clear();
      titleIn.value = '';
      authorIn.value = '';
    }
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let oneBook = new Book(titleIn.value, authorIn.value);
  oneBook.addBook();
});

// console.log(oneBook);