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

// Build Bookmarks DOM
function buildBookmarks(){
    // Remove bookmarks element
    bookmarksContainer.textContent = ''
    // Build Items
    bookmarks.forEach((bookmark) => {
        const {name, url} = bookmark
        // item
        const item = document.createElement('div')
        item.classList.add('item')
        // Close Icon
        const closeIcon = document.createElement('i')
        closeIcon.classList.add('fas', 'fa-times')
        closeIcon.setAttribute('title', 'Delete bookmark')
        closeIcon.setAttribute('onclick', `deleteBookmark('${url})`)
        // Favicon / Link Container
        const linkInfo = document.createElement('div')
        linkInfo.classList.add('name')
        // Favicon
        const favicon = document.createElement('img')
        favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`)
        // favicon.setAttribute('alt', 'Favicon')
        // Link
        const link = document.createElement('a')
        link.setAttribute('href', `${url}`)
        link.setAttribute('target', '_blank')
        link.textContent = name;
        // Append to bookmark container
        linkInfo.append(favicon, link)
        item.append(closeIcon, linkInfo)
        bookmarksContainer.appendChild(item)
    })
}

// Fetch bookmark from local storage
function fetchBookmarks(){
    // Get bookmarks from local storage if available
    if(localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        // Create bookmarks array in local storage
        bookmarks = [
            {
                "name": "Tiktok",
                "url": "https://tiktok.com",
            }
        ]
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }
    buildBookmarks()
}

// Delete Bookmark
function deleteBookmark(url){
    bookmarks.forEach((bookmark, i) => {
        if(bookmark.url === url) {
            bookmarks.splice(i, 1);
        }
    })
    // Update Bookmarks Agai in local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    fetchBookmarks()
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

    console.log(nameValue, urlValue);
    if(!validate(nameValue, urlValue)){
        return false;
    }
    
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark)