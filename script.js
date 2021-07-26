let myLibrary = [];

const body = document.body;

let index = 0;

const addButton = document.getElementById('add');
addButton.addEventListener('click', function() {
    let form = document.createElement('form');
    let titleLabel = document.createElement('label');
    titleLabel.htmlFor = 'title';
    titleLabel.textContent = 'Title';
    form.appendChild(titleLabel);
    let titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.id = 'title';
    titleInput.name = 'title';
    titleInput.required = true;
    form.appendChild(titleInput);

    let authorLabel = document.createElement('label');
    authorLabel.htmlFor = 'author';
    authorLabel.textContent = 'Author';
    form.appendChild(authorLabel);
    let authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.id = 'author';
    authorInput.name = 'author';
    authorInput.required = true;
    form.appendChild(authorInput);

    let pageLabel = document.createElement('label');
    pageLabel.htmlFor = 'pages';
    pageLabel.textContent = 'Pages';
    form.appendChild(pageLabel);
    let pageInput = document.createElement('input');
    pageInput.type = 'text';
    pageInput.id = 'pages';
    pageInput.name = 'pages';
    pageInput.required = true;;
    form.appendChild(pageInput);

    let readLabel = document.createElement('label');
    readLabel.htmlFor = 'read';
    readLabel.textContent = 'Read?';
    form.appendChild(readLabel);
    let readInput = document.createElement('input');
    readInput.type = 'checkbox';
    readInput.id = 'read';
    readInput.name = 'read';
    readInput.value = 'Read';
    form.appendChild(readInput);

    let submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'Submit';
    form.appendChild(submit);

    body.appendChild(form);


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let titleData = document.getElementById('title').value;
        let authorData = document.getElementById('author').value;
        let pageData = document.getElementById('pages').value;
        let readData = document.getElementById('read').value;
        let newBook = new Book(titleData, authorData, pageData, readData, index);
        addBook(newBook);
        index++;
        body.removeChild(form);
        //addBook
    });
});

const table = document.getElementById('display');

function Book(title, author, pages, read, index) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = index;
}

function addBook(book) {
    myLibrary.push(book);
    displayBooks();
}


function displayBooks() {
    clearDisplay();
    myLibrary.forEach(book => {
        let row = document.createElement('tr');
        row.setAttribute('class', 'aBook');
        let tr1 = document.createElement('td');
        tr1.textContent = book.title;
        let tr2 = document.createElement('td');
        tr2.textContent = book.author;
        let tr3 = document.createElement('td');
        tr3.textContent = book.pages;
        let tr4 = document.createElement('td');
        tr4.textContent = book.read;
        row.appendChild(tr1);
        row.appendChild(tr2);
        row.appendChild(tr3);
        row.appendChild(tr4);
        table.appendChild(row);
    });
}

function clearDisplay() {
    let books = document.querySelectorAll('.aBook');
    books.forEach(book => {
        table.removeChild(book);
    });
}

function removeBook(id) {
    myLibrary.splice(id, 1);
    displayBooks();
}

