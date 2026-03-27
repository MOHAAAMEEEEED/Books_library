const myLibrary = [];

const form = document.querySelector('form');
const dialog = document.getElementById('my-dialog');
const libraryContainer = document.createElement('div');
libraryContainer.id = 'library';
document.body.appendChild(libraryContainer);

// Book Constructor
function Book(name, author, pages) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = Number(pages);
    this.read = false;           // default: not read
}

// Toggle read status (prototype method)
Book.prototype.toggleRead = function() {
    this.read = !this.read;
};

// Add book to library
function addBookToLibrary(name, author, pages) {
    const book = new Book(name, author, pages);
    myLibrary.push(book);
    displayBooks();
}

// Display all books
function displayBooks() {
    libraryContainer.innerHTML = '';

    myLibrary.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.setAttribute('data-id', book.id);

        const readClass = book.read ? 'read' : 'not-read';
        const readText = book.read ? 'Read ✅' : 'Not Read';

        card.innerHTML = `
            <h3>${book.name}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Pages:</strong> ${book.pages}</p>
            
            <div class="read-status ${readClass}">${readText}</div>
            
            <div class="card-actions">
                <button class="btn success toggle-read">Toggle Read</button>
                <button class="btn danger remove-book">Remove</button>
            </div>
        `;

        // Toggle Read button
        card.querySelector('.toggle-read').addEventListener('click', () => {
            book.toggleRead();
            displayBooks();
        });

        // Remove button
        card.querySelector('.remove-book').addEventListener('click', () => {
            if (confirm(`Delete "${book.name}"?`)) {
                const index = myLibrary.findIndex(b => b.id === book.id);
                if (index !== -1) {
                    myLibrary.splice(index, 1);
                    displayBooks();
                }
            }
        });

        libraryContainer.appendChild(card);
    });
}

// Form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const author = document.getElementById('author').value.trim();
    const pages = document.getElementById('pages').value;

    if (!name || !author || !pages) {
        alert("Please fill all fields");
        return;
    }

    addBookToLibrary(name, author, pages);

    // Reset form and close dialog
    form.reset();
    dialog.close();
});

// Optional: Make the "New book" button open the dialog properly
document.querySelector('button[popovertarget="my-dialog"]').addEventListener('click', () => {
    dialog.showModal();   // Better than just popover for forms
});

// add some starter books for testing
// addBookToLibrary("Atomic Habits", "James Clear", 320);
// addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310);
// displayBooks();