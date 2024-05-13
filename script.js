const modal = document.getElementById('modal')
const modalShow = document.getElementById('show-modal')
const modalClose = document.getElementById('close-modal')
const bookmarkForm = document.getElementById('bookmark-form')
const websiteNameEl = document.getElementById('website-name')
const websiteUrlEl = document.getElementById('website-url')
const bookmarksContainer = document.getElementById('bookmarks-container')

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

// Store Bookamrk Function
function storeBookmark(e){
    e.preventDefault()
    const nameValue = websiteNameEl.value
    let urlValue = websiteUrlEl.value
    if(!urlValue.includes('https://') && !urlValue.includes('http://')) {
        urlValue = `https://${urlValue}`
    }

    console.log(nameValue, urlValue);
    validate(nameValue, urlValue)
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark)