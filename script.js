let storage = true;
let myLibrary = [];
let hasArray;
let formActive = false;
let index;

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
        index = myLibrary.length;
    }
}
else {
    storage = false;
}

const body = document.body;

const addButton = document.getElementById('add');
addButton.addEventListener('click', function() {
    if (!formActive) {
        formActive = true;
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

        let readDiv = document.createElement('div');
        readDiv.setAttribute('id', 'read-div');
        let readLabel = document.createElement('label');
        readLabel.htmlFor = 'read';
        readLabel.textContent = 'Read';
        readLabel.setAttribute('id', 'read-label');
        readDiv.appendChild(readLabel);
        let readInput = document.createElement('input');
        readInput.type = 'checkbox';
        readInput.setAttribute('id', 'read-input');
        readInput.name = 'read';
        readInput.value = 'Read';
        readDiv.appendChild(readInput);
        form.appendChild(readDiv);

        let buttonDiv = document.createElement('div');
        buttonDiv.setAttribute('id','button-div');
        let submit = document.createElement('input');
        submit.type = 'submit';
        submit.value = 'Submit';
        buttonDiv.appendChild(submit);
        let cancel = document.createElement('button');
        cancel.textContent = "Cancel";
        cancel.setAttribute('id', 'cancel-button');
        cancel.addEventListener('click', function() {
            formActive = false;
            body.removeChild(form);
        });
        buttonDiv.appendChild(cancel);

        form.appendChild(buttonDiv);

        body.appendChild(form);

        titleInput.focus();


        form.addEventListener('submit', function(event) {
            event.preventDefault();
            let isRead = false;
            let titleData = document.getElementById('title').value;
            let authorData = document.getElementById('author').value;
            let pageData = document.getElementById('pages').value;
            let readData = document.getElementById('read-input');
            if (readData.checked) {
                isRead = true;
            }
            let newBook = new Book(titleData, authorData, pageData, isRead, index);
            index++;
            addBook(newBook);
            body.removeChild(form);
            formActive = false;
        });
    }
});

const deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', deleteLibrary);

document.addEventListener('keyup', function(event) {
    if (!formActive) {
        if (event.code == 'Space') {
            addButton.click();
        }
    }
});



function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
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
        readChange.setAttribute('id', 'read-switch');
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
        remove.setAttribute('id', 'remove-button');
        remove.textContent = "Remove";
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
    for (let i = id; i < myLibrary.length; i++) {
        myLibrary[i].id = myLibrary[i].id - 1;
    }
    index--;
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
    index = 0;
    displayBooks();
}