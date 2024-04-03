const { JSDOM } = require('jsdom')



function normalizeURL(url) {
    const myURL = new URL(url); 
    let domain = myURL.host
    let path = myURL.pathname

   if (path.charAt(path.length - 1) === "/") {
        path = path.slice(0, -1);
    }

    return (`${domain}${path}`)
}

function getURLsFromHTML(htmlBody, baseURL){
    const { JSDOM } = require('jsdom')
    const dom = new JSDOM(htmlBody) 
    const nodelist = dom.window.document.querySelectorAll('a')
    const nodelistarr = Array.from(nodelist)
    
    
    function urlIsRelative(url) {
        return !(url.startsWith('http://') || url.startsWith('https://'));
    }

    function getHrefs(element){
        let url = element.href; 
        if (urlIsRelative(url)) {
            url = baseURL + url;
        }
        if (url.charAt(url.length - 1) === "/") {
            url = url.slice(0, -1);
        }
        return url;
    }
    
    
    console.log(nodelistarr.map(getHrefs))
    
    return nodelistarr.map(getHrefs)
}

const htmlBody = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a><a href="/about/"><span>About</span></a></body></html>'
getURLsFromHTML(htmlBody, 'https://blog.boot.dev')


module.exports = {
    normalizeURL,
    getURLsFromHTML
}