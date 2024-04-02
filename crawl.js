function normalizeURL(url) {
    const myURL = new URL(url); 
    let domain = myURL.host
    let path = myURL.pathname

   if (path.charAt(path.length - 1) === "/") {
        path = path.slice(0, -1);
    }

    return (`${domain}${path}`)
}

module.exports = {
    normalizeURL
}