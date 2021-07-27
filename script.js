let storage = true;
let myLibrary = [];
let hasArray;

const table = document.getElementById('display');

if (storageAvailable('localStorage')) {
    storage = true;
    if(!localStorage.getItem('library')) {
    } 
    else {
        let retrieved = localStorage.getItem('library');
        retrieved = JSON.parse(retrieved);
        myLibrary = [...retrieved];
        if (myLibrary.length != 0) {
            displayBooks();
        }
    }
}
else {
    storage = false;
}

const body = document.body;

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
    pageInput.type = 'number';
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
        let isRead = false;
        let titleData = document.getElementById('title').value;
        let authorData = document.getElementById('author').value;
        let pageData = document.getElementById('pages').value;
        let readData = document.getElementById('read');
        if (readData.checked) {
            isRead = true;
        }
        let newBook = new Book(titleData, authorData, pageData, isRead);
        addBook(newBook);
        body.removeChild(form);
    });
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = title+author+pages;
}

function addBook(book) {
    myLibrary.push(book);
    updateLocal();
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

        let readChange = document.createElement('input');
        readChange.setAttribute('type', 'checkbox');
        readChange.setAttribute('class', 'readButton');
        if (book.read) {
            readChange.checked = true;
        }
        readChange.addEventListener('click', function() {
            book.read = !book.read;
            updateLocal();
            clearDisplay;
            displayBooks();
        })
        let tr4 = document.createElement('td');
        tr4.appendChild(readChange);

        let remove = document.createElement('button');
        remove.setAttribute('class', 'removeButton');
        remove.addEventListener('click', function() {
            removeBook(book.id);
        })
        let tr5 = document.createElement('td');
        tr5.appendChild(remove);
        row.appendChild(tr1);
        row.appendChild(tr2);
        row.appendChild(tr3);
        row.appendChild(tr4);
        row.appendChild(tr5);
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
    updateLocal();
    displayBooks();
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function updateLocal() {
    if (storage) {
        localStorage.clear();
        localStorage.setItem('library', JSON.stringify(myLibrary));
    }
}

function deleteLibrary() {
    myLibrary = []
    localStorage.clear();
    displayBooks();
}