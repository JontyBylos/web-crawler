const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')


async function main(){
    if (process.argv.length < 3) {
         console.log("Error: No URL was provided")
    
          
    }
    if (process.argv.length > 4) {
        
        console.log("Error: only max of 3 arguments can entered (a URL and a limit of iterative crawls)")
          
    }

    const base_url = process.argv[2]

    let totalLimit = 0
    if (!process.argv.length < 4) {
        totalLimit = process.argv[3]
    }
    
    console.log(`Crawler is starting at that ${base_url} with a total limit of ${totalLimit} iterations`) 
    const pages = await crawlPage(base_url, base_url, {}, totalLimit)
    printReport(pages)

   
  }
  
  main()
