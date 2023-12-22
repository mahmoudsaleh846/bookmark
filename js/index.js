var siteName = document.getElementById("bookmarkname");
var siteURL = document.getElementById("bookmarkurl");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var bookMarks = [];

// Load bookmarks from local storage on page load
window.onload = function () {
    loadBookmarks();
};

function addBookmark() {
    var websiteName = siteName.value.trim();
    var websiteURL = siteURL.value.trim();

    // Validate inputs
    if (websiteName === "" || websiteURL === "" || !isValidURL(websiteURL)) {
        console.log("Invalid input. Please enter a valid name and URL.");
        return;
    }

    var website = {
        name: websiteName,
        url: websiteURL
    };

    bookMarks.push(website);
    saveBookmarks();
    displayBookmark(bookMarks);
    clearInputs();
}

function displayBookmark(blist) {
    var cartoona = "";
    for (var i = 0; i < blist.length; i++) {
        cartoona += `
        <tr>
        <td>${i + 1}</td>
        <td>${blist[i].name}</td>              
        <td>
          <button class="btn btn-primary" onclick="visitBookmark('${blist[i].url}')">
            <i class="fa-solid fa-eye pe-2"></i>Visit
          </button>
        </td>
        <td>
          <button class="btn btn-danger pe-2" onclick="deleteBookmark(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
    </tr> `;
    }
    tableContent.innerHTML = cartoona;
}

function clearInputs() {
    siteName.value = "";
    siteURL.value = "";
}

function deleteBookmark(index) {
    bookMarks.splice(index, 1);
    saveBookmarks();
    displayBookmark(bookMarks);
}

function visitBookmark(url) {
    window.location.href = url;
}

function isValidURL(url) {
    var urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w]{2,}(\/[^ "]+)?$/;
    return urlRegex.test(url);
}

function saveBookmarks() {

    localStorage.setItem("bookmarks", JSON.stringify(bookMarks));
}

function loadBookmarks() {

    var storedBookmarks = localStorage.getItem("bookmarks");
    if (storedBookmarks) {
        bookMarks = JSON.parse(storedBookmarks);
        displayBookmark(bookMarks);
    }
}

//design