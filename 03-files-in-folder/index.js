const fs = require('fs').promises;
const path = require('path');

const directory = `${__dirname}/secret-folder`;

// fs.readdir(directory, { withFileTypes: true }, (err, files) => {
//   if (err) {
//     console.log(err);
//     return;
//   } else {
//     console.log('Files in directory:\n');
//     files.forEach((file) => {
//       if (!file.isDirectory()) {
//         const filePath = `${directory}/${file.name}`;
//         fs.stat(filePath, (err, stats) => {
//           if (err) {
//             console.log(err);
//             return;
//           }
//           const ext = path.extname(file.name).slice(1);
//           const name = path.basename(file.name, path.extname(file.name));
//           console.log(`${name} - ${ext} - ${stats.size} bytes`);
//         });
//       }
//     });
//   }
// });

const showFiles = async () => {
  try {
    const files = await fs.readdir(directory, { withFileTypes: true });
    // if (err) {
    //   console.log(err);
    //   return;
    // } else {

    // console.log(files);
    console.log('Files in directory:\n');
    for (const file of files) {
      // console.log(file.name);

      if (!file.isDirectory()) {
        const filePath = `${directory}/${file.name}`;
        // await fs.stat(filePath, (err, stats) => {
        //   if (err) {
        //     console.log(err);
        //     return;
        //   }
        const ext = path.extname(file.name).slice(1);
        const name = path.basename(file.name, path.extname(file.name));
        console.log(`${name} - ${ext} - ${'stats.size'} bytes`);
        // });
      }
    }
    // files.forEach((file) => {
    //   if (!file.isDirectory()) {
    //     const filePath = `${directory}/${file.name}`;
    //     fs.stat(filePath, (err, stats) => {
    //       if (err) {
    //         console.log(err);
    //         return;
    //       }
    //       const ext = path.extname(file.name).slice(1);
    //       const name = path.basename(file.name, path.extname(file.name));
    //       console.log(`${name} - ${ext} - ${stats.size} bytes`);
    //     });
    //   }
    // });
    // }
    // });
  } catch (error) {
    console.log(error);
  }
};

showFiles();
