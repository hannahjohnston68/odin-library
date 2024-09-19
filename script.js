const myLibrary = [];

function Book(title, author, year) {
    this.title = title; 
    this.author = author; 
    this.year = year;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

addBookToLibrary(new Book('To Kill a Mockingbird', 'Harper Lee', 1960));
addBookToLibrary(new Book('1984', 'George Orwell', 1949));
addBookToLibrary(new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925));

function displayBooks() {
    const container = document.getElementById('library-container');
    container.innerHTML = ''; 

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <p>${book.year}</p>
            <button type="button" class="delete-button button">Delete</button><br>
        `;

        const deleteButton = bookCard.querySelector('.delete-button');
        deleteButton.addEventListener('click', () => {
            removeBookFromLibrary(index);
            displayBooks(); 
        });
            
        container.appendChild(bookCard);
    });
}

function displayForm() {
    const newBookButton = document.getElementById('new-book');
    const inputForm = document.getElementById('input-form');
    const overlay = document.getElementById('overlay');
    const cancelButton = document.getElementById('cancel');

    newBookButton.addEventListener('click', () => {
        if (inputForm.style.display === 'none' || inputForm.style.display === '') {
            inputForm.style.display = 'block';
            overlay.style.display = 'block';
        } else {
            inputForm.style.display = 'none';
            overlay.style.display = 'none';
        }
    });

    inputForm.addEventListener('submit', (event) => {
        event.preventDefault(); 

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = document.getElementById('year').value;

        if (title && author && year) {
            const newBook = new Book(title, author, year);
            addBookToLibrary(newBook);

            inputForm.reset();

            inputForm.style.display = 'none';
            overlay.style.display = 'none';

            displayBooks(); 
        } else {
            alert('Please fill in all fields.');
        }
    });

    cancelButton.addEventListener('click', () => {
        inputForm.style.display = 'none';
        overlay.style.display = 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayBooks(); 
    displayForm(); 
});
