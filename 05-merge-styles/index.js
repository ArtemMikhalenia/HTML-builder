const fs = require('fs').promises;
const path = require('path');

const pathToCssFiles = path.join(__dirname, 'styles');
const finalCssFile = path.join(__dirname, 'project-dist', 'bundle.css');

const mergeCssFiles = async () => {
  try {
    const files = await fs.readdir(pathToCssFiles);

    await fs.writeFile(finalCssFile, '');

    for (const file of files) {
      const extension = path.extname(file);
      const filePath = path.join(pathToCssFiles, file);
      const content = await fs.readFile(filePath, 'utf-8');

      if (extension === '.css') {
        await fs.appendFile(finalCssFile, content);
      }
    }
    console.log('Merge completed');
  } catch (error) {
    console.error('Error:', error);
  }
};

mergeCssFiles();
