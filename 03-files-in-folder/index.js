const fs = require('fs').promises;
const path = require('path');

const directory = `${__dirname}/secret-folder`;

const showFiles = async () => {
  try {
    const files = await fs.readdir(directory, { withFileTypes: true });
    console.log('Files in secret-folder:\n');

    for (const file of files) {
      if (!file.isDirectory()) {
        const filePath = `${directory}/${file.name}`;
        const stats = await fs.stat(filePath);
        const ext = path.extname(file.name).slice(1);
        const name = path.basename(file.name, path.extname(file.name));
        console.log(`${name} - ${ext} - ${stats.size} bytes`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

showFiles();
