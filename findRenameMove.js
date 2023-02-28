const fs = require('fs');
const readline = require('readline');
const path = require('path');

// create interface for getting user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// specify the path to the directory where the files are located
const dirpath = '//dia-dc01/DFSHARE/Labscans';

// specify the path to the directory where the new file should be moved to
const newdirpath = '/Users/dhenry/Desktop/Q4 COMPLIANCE BATCH LOGS';

// get user input for file name without extension
rl.question('Enter the file name: ', (filename) => {

  // add .pdf extension to filename
  const searchname = `${filename}.pdf`;

  // create the full path to the file
  const filepath = path.join(dirpath, searchname);

  // check if file exists
  fs.access(filepath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`${searchname} does not exist`);
      rl.close();
      return;
    }

    // create a copy of the file
    const copyname = `${filename}_copy.pdf`;
    fs.copyFile(filepath, copyname, (err) => {
      if (err) {
        console.error(err);
        rl.close();
        return;
      }

      // get user input for new file name without extension
      rl.question('Enter the new file name: ', (newname) => {

        // add .pdf extension to new name
        const newfilename = `${newname}.pdf`;

        // create the new path for the file
        const newpath = path.join(newdirpath, newfilename);

        // move the copy to the new folder with the new name
        fs.rename(copyname, newpath, (err) => {
          if (err) {
            console.error(err);
            rl.close();
            return;
          }

          console.log(`${searchname} copied and renamed to ${newfilename} in ${newdirpath}`);
          rl.close();
        });

      });

    });

  });

});


