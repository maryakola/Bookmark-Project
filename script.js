const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

let bookmarks = []

// Show Modal, Focus on input
function showModal(){
    modal.classList.add('show-modal')
    websiteNameEl.focus()
}

// Hide MOdal
function closeModal(){
    modal.classList.remove('show-modal')
}

// Event listeners
modalShow.addEventListener('click', showModal)
modalClose.addEventListener('click', closeModal)
// Close MOdal by clicking outside
window.addEventListener('click', (e) => {
    e.target === modal ? modal.classList.remove('show-modal') : false
})

// Validate Form
function validate(nameValue, urlValue){
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression)
    if(!nameValue || !urlValue){
        alert('Please submit values for both fields')
        return false;
    }
    if(!urlValue.match(regex)){
        alert('Please enter a valid web address')
        return false;
    }
    // Valid
    return true;
}

// Fetch Bookmarks
function fetchBookmarks(){
    // Get bookmark from local storage if available
    if(localStorage.getItem('bookmarks')){
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
    // Create a bookmarks array in local storage
    bookmarks = [
        {
            name: 'Tiktok',
            url: 'https://titktok.com',
        },
    ];
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    console.log(bookmarks);
}

// Store Bookamark Function
function storeBookmark(e){
    e.preventDefault()
    const nameValue = websiteNameEl.value
    let urlValue = websiteUrlEl.value
    if(!urlValue.includes('https://') && !urlValue.includes('http://')) {
        urlValue = `https://${urlValue}`
    }
    if(!validate(nameValue, urlValue)){
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark)
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks()
    bookmarkForm.reset();
    websiteNameEl.focus()
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark)

// Fetch bookmarks on load
fetchBookmarks()