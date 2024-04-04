const { emitWarning } = require('node:process');




function main(){
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
    if (process.argv.length === 3) {
        console.log(`crawler is starting at that ${base_url}`) // process.argv[2] will be the BaseURL
          
    }
  }
  
  main()
