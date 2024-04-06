const { JSDOM } = require('jsdom')


async function crawlPage(baseURL, currentURL, pages) {
    
    const currentUrlObj = new URL(currentURL)
    const baseUrlObj = new URL(baseURL)

    if (currentUrlObj.hostname !== baseUrlObj.hostname) {
        return pages
    }
    const normURL = normalizeURL(currentURL)

    if (pages[normURL] > 0) {
        pages[normURL]++
        return pages
    }
    pages[normURL] = 1

    console.log(`crawling ${currentURL}`)
    let htmlBody = ''
   
    try {
    const response = await fetch(currentURL)
    if (response.status > 399) {
        console.log(`Error: ${response.status} level status code returned`)
        return pages
    }
    const contentType = response.headers.get('content-type')
    if (!contentType.includes('text/html')){
        console.log('Error: content-type is not text/html')
        return pages
    }

    htmlBody = await response.text()
    const nextURLs = getURLsFromHTML(htmlBody, baseURL)

    for(const nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages)
    }

    return pages

   } catch (err) {
    console.log(err.message)
   }
   
}


function normalizeURL(url) {
    const myURL = new URL(url); 
    let domain = myURL.host
    let path = myURL.pathname

   if (path.length > 0 && path.charAt(path.length - 1) === "/") {
        path = path.slice(0, -1);
    }

    return (`${domain}${path}`)
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody) 
    const anchorElements = dom.window.document.querySelectorAll('a')
    
    for (const aElement of anchorElements){
        if (aElement.href.slice(0,1) === '/'){
          try {
            urls.push(new URL(aElement.href, baseURL).href)
          } catch (err){
            console.log(`${err.message}: ${aElement.href}`)
          }
        } else {
          try {
            urls.push(new URL(aElement.href).href)
          } catch (err){
            console.log(`${err.message}: ${aElement.href}`)
          }
        }
      }
      return urls
}

const htmlBody = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a><a href="/about/"><span>About</span></a></body></html>'
getURLsFromHTML(htmlBody, 'https://blog.boot.dev')


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}