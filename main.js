const { emitWarning } = require('node:process');
const { crawlPage } = require('./crawl.js')


async function main(){
    if (process.argv.length < 3) {
        emitWarning('Error', {
            detail: 'No URL was provided',
          });
          
    }
    if (process.argv.length > 3) {
        emitWarning('Error', {
            detail: 'Only one argument can entered (a URL)',
          });
          
    }

    const base_url = process.argv[2]
    console.log(`crawler is starting at that ${base_url}`) 
    await crawlPage(base_url)
        

   
  }
  
  main()
