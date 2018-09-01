export default {
    search: function (searchTerm, searchLimit, sortBy) {
        // URL with our paramethers
        return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
            // We request results in JSON format
            .then(res => res.json())
            // We use map method to get only data
            .then(data => data.data.children.map(item => item.data))
            // In case of error log it
            .catch(err => console.log(err));
    }
}