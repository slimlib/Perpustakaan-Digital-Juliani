function closeWelcome() {
    document.getElementById("welcome-overlay").style.display = "none";
}
function toggleMenu() {
    document.querySelector("nav").classList.toggle("show");
}
function toggleLampuTidur() {
    document.body.classList.toggle("lampu-tidur");
}
window.onload = function () {
    if (!document.cookie.includes("visited=yes")) {
        document.getElementById("welcome-overlay").style.display = "flex";
    }
    loadBooks();
};

function searchBooks() {
    const keyword = document.getElementById("search-input").value.toLowerCase();
    const books = document.querySelectorAll(".book");
    let found = false;
    books.forEach(book => {
        const text = book.innerText.toLowerCase();
        if (text.includes(keyword)) {
            book.style.display = "block";
            found = true;
        } else {
            book.style.display = "none";
        }
    });
    if (!found) alert("Buku tidak ditemukan!");
}

function toggleSynopsis(el) {
    const syn = el.querySelector(".synopsis");
    syn.style.display = syn.style.display === "block" ? "none" : "block";
}

function loadBooks() {
    fetch('books.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("book-container");
            data.forEach(book => {
                const div = document.createElement("div");
                div.className = "book";
                div.onclick = () => toggleSynopsis(div);
                div.innerHTML = `
                    <img src="${book.img}" alt="${book.title}">
                    <p>${book.title}</p>
                    <span>Penulis: ${book.author}</span>
                    <p class="synopsis">${book.synopsis}</p>
                    <a href="${book.link}" target="_blank">Baca di Google Books</a>
                `;
                container.appendChild(div);
            });
        });
}
