const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')


async function main(){
    if (process.argv.length < 3) {
         console.log("Error: No URL was provided")
    
          
    }
    if (process.argv.length > 4) {
        
        console.log("Error: only two arguments can entered (a URL and a limit of iterative crawls)")
          
    }

    const base_url = process.argv[2]

    let limit = null
    if (!process.argv.length < 4) {
        limit = process.argv[3]
    }
    
    console.log(`crawler is starting at that ${base_url} with a limit of ${limit} iterations`) 
    const pages = await crawlPage(base_url, base_url, {}, limit)
    printReport(pages)

   
  }
  
  main()
