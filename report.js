function printReport(pages){
   
   const sortedPages = sortReport(pages)
   console.log("Report starting...")
   for (page of sortedPages){
    url = page[0]
    count = page[1]
    console.log(`Found ${count} internal links to ${url}`)
   }
   
    
}

function sortReport(pages){
    pagesArray = Object.entries(pages)
    pagesArray.sort((a, b) => {
        aHits = a[1],
        bHits = b[1]
        return b[1] - a[1]
    })
    return pagesArray
}

module.exports = {
    printReport,
    sortReport
}