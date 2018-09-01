import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Add Event Listener for submit
searchForm.addEventListener('submit', e => {
    // Get Search Term
    const searchTerm = searchInput.value;
    // Get Sort By radio buttons
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    // Get Limit
    const searchLimit = document.getElementById('limit').value;

    // Check input
    if (searchTerm === '') {
        // Show Error Message
        showMessage('Please add a search term', 'alert-danger')
    }
    // Clear input
    searchInput.value = '';

    // Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
        .then(results => {
            // HTML display
            let output = '<div class="card-columns">';
            results.forEach(post => {
                const image = post.preview ? post.preview.images[0].source.url : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg'
                output += `<div class="card">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${truncateText(post.selftext, 100)}</p>
                  <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                  <hr>
                  <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span>
                  <span class="badge badge-dark">Score: ${post.score}</span>
                </div>
              </div>`;
            })
            output += '<div>';
            document.getElementById('results').innerHTML = output;
        })

    e.preventDefault();
})

function showMessage(msg, className) {
    // Create empty div
    const div = document.createElement('div');
    // Add class name
    div.className = `alert ${className}`;
    // Create element that will display text
    div.appendChild(document.createTextNode(msg));
    // Get parent, and first element after place where we wanna insert text 
    const searchContainer = document.getElementById('search-container');
    const search = document.getElementById('search');
    // Insert text, first paramether is what are we inserting, second is first element after 
    searchContainer.insertBefore(div, search);
    // Set timeout to remove our msg after 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);

}

function truncateText(text, limit) {
    const shortened = text.indexOf(' ', limit);
    if (shortened == -1) return text;
    return text.substring(0, shortened) + "...";
}