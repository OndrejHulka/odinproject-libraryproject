let body = document.body;
let gridContainer = document.getElementById('grid-container');
const myLibrary = [];

function Book(name, author, pages, status) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary(name, author, pages, status) {
  const newBook = new Book(name, author, pages, status);
  myLibrary.push(newBook);
  console.log(myLibrary);
  addBookToDisplay(newBook); // Zobrazení knihy na stránce
}

function displayEdit() {
  let formContainer = document.getElementById('formContainer');

  if (!formContainer) {
    formContainer = document.createElement('div');
    formContainer.id = 'formContainer';
    body.appendChild(formContainer);
  }

  formContainer.innerHTML = '';

  const form = document.createElement('form');
  form.id = 'myForm';

  // Přidání prvků formuláře
  let titleLabel = document.createElement('label');
  titleLabel.setAttribute('for', 'title');
  titleLabel.textContent = 'Title: ';

  let titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.id = 'title';
  titleInput.name = 'title';
  titleInput.required = true;

  let authorLabel = document.createElement('label');
  authorLabel.setAttribute('for', 'author');
  authorLabel.textContent = 'Author: ';

  let authorInput = document.createElement('input');
  authorInput.type = 'text';
  authorInput.id = 'author';
  authorInput.name = 'author';
  authorInput.required = true;

  let pagesLabel = document.createElement('label');
  pagesLabel.setAttribute('for', 'pages');
  pagesLabel.textContent = 'Pages: ';

  let pagesInput = document.createElement('input');
  pagesInput.type = 'number';
  pagesInput.name = 'pages';
  pagesInput.id = 'pages';
  pagesInput.required = true;

  let statusLabel = document.createElement('label');
  statusLabel.setAttribute('for', 'status');
  statusLabel.textContent = 'Finished: ';

  let statusInput = document.createElement('input');
  statusInput.type = 'checkbox';
  statusInput.name = 'status';
  statusInput.id = 'status';

  let buttonSubmit = document.createElement('button');
  buttonSubmit.type = 'submit';
  buttonSubmit.textContent = 'Add Book';

  // Zavírací tlačítko
  let buttonClose = document.createElement('button');
  buttonClose.type = 'button'; // Typ button pro zavírací tlačítko
  buttonClose.id = 'closebtn';
  buttonClose.textContent = 'Close';

  buttonClose.addEventListener('click', function () {
    formContainer.style.display = 'none'; // Skryje formContainer
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const status = isCheckbox(statusInput);

    addBookToLibrary(title, author, pages, status);

    formContainer.style.display = 'none'; // Skryje formContainer po odeslání
  });

  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(authorLabel);
  form.appendChild(authorInput);
  form.appendChild(pagesLabel);
  form.appendChild(pagesInput);
  form.appendChild(statusLabel);
  form.appendChild(statusInput);
  form.appendChild(buttonSubmit);
  form.appendChild(buttonClose); // Přidání zavíracího tlačítka

  formContainer.appendChild(form);
  formContainer.style.display = 'flex';
}

function addBookToDisplay(newBook) {
  let box = document.createElement('div');
  box.className = 'box';
  let name = document.createElement('h2');
  name.textContent = `title: ${newBook.name}`;
  let title = document.createElement('h2');
  title.textContent = `author: ${newBook.author}`;
  let pages = document.createElement('h2');
  pages.textContent = `pages: ${newBook.pages}`;
  let status = document.createElement('h2');
  status.textContent = `status: ${newBook.status}`
  let closeButton = document.createElement('button');
  closeButton.textContent = 'delete'
  let changeStatusButton = document.createElement('button');
  changeStatusButton.textContent = 'change status'
  
  closeButton.addEventListener('click', function () {
    // Najdi index odpovídajícího objektu v poli myLibrary
    const index = myLibrary.findIndex(function (book) {
      return (
        book.name === newBook.name &&
        book.author === newBook.author &&
        book.pages === newBook.pages &&
        book.status === newBook.status
      );
    });

    // Pokud kniha existuje, odstraň ji
    if (index !== -1) {
      myLibrary.splice(index, 1); // Odstranění z pole
      console.log(`Kniha "${newBook.name}" byla odstraněna z knihovny.`);
    }

    // Odstranění odpovídajícího DOM elementu
    box.remove();
  });

  changeStatusButton.addEventListener('click', function () {
    if (newBook.status === '✅') {
        newBook.status = '❌'; // Změna hodnoty status v objektu
        status.textContent = `status: ${newBook.status}`; // Aktualizace DOM
    } else {
        newBook.status = '✅'; // Změna hodnoty status v objektu
        status.textContent = `status: ${newBook.status}`; // Aktualizace DOM
    }
  });

  box.appendChild(name);
  box.appendChild(title);
  box.appendChild(pages);
  box.appendChild(status);
  box.appendChild(closeButton);
  box.appendChild(changeStatusButton);

  gridContainer.appendChild(box);
}

// Funkce pro kontrolu checkboxu
function isCheckbox(value) {
  return value.checked ? '✅' : '❌';
}

