const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')


async function main(){
    if (process.argv.length < 3) {
         console.log("Error: No URL was provided")
    
          
    }
    if (process.argv.length > 3) {
        
        console.log("Error: only one argument can entered (a URL)")
          
    }

    const base_url = process.argv[2]
    console.log(`crawler is starting at that ${base_url}`) 
    const pages = await crawlPage(base_url, base_url, {})
    printReport(pages)

   
  }
  
  main()
