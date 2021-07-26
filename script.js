let myLibrary = [];

const table = document.getElementById('display');

function Book(title, author, year, pages, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
}

function addBook(book) {
    myLibrary.push(book);
}


function readBooks() {
    myLibrary.forEach(book => {
        let row = document.createElement('tr');
        let tr1 = document.createElement('td');
        tr1.textContent = book.title;
        let tr2 = document.createElement('td');
        tr2.textContent = book.author;
        let tr3 = document.createElement('td');
        tr3.textContent = book.year;
        let tr4 = document.createElement('td');
        tr4.textContent = book.pages;
        let tr5 = document.createElement('td');
        tr5.textContent = book.read;
        row.appendChild(tr1);
        row.appendChild(tr2);
        row.appendChild(tr3);
        row.appendChild(tr4);
        row.appendChild(tr5);
        table.appendChild(row);
    });
}

let example1 = new Book("agot", "grrm", "1999", "1096", true);
addBook(example1);
let example2 = new Book("acok", "grrm", "2001", "1152", true);
addBook(example2);
let example3 = new Book("asos", "grrm", "2003", "1378", true);
addBook(example3);
readBooks();