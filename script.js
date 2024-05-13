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

// Store Bookamrk Function
function storeBookmark(e){
    e.preventDefault()
    console.log(e, 'Form has been submitted');
}

// Event Listener
bookmarkForm.addEventListener('submit', storeBookmark)