const { JSDOM } = require('jsdom')

function crawlPage(){

}


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