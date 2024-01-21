const fs = require('fs').promises;
const path = require('path');

const pathToProjectDist = path.join(__dirname, 'project-dist');

const pathToAssetsFolder = path.join(__dirname, 'assets');
const pathToAssetsCopyFolder = path.join(__dirname, 'project-dist', 'assets');

const pathToCssFiles = path.join(__dirname, 'styles');
const finalCssFile = path.join(__dirname, 'project-dist', 'style.css');
const pathToTemplateFile = path.join(__dirname, 'template.html');
const pathToIndexFile = path.join(__dirname, 'project-dist', 'index.html');

const pathToComponents = path.join(__dirname, 'components');

const createProjectDistFolder = async () => {
  try {
    await fs.mkdir(pathToProjectDist, { recursive: true });
    console.log('Created folder project-dist');
  } catch (err) {
    console.log('No such folder');
  }
};

const createIndexAndStyleFiles = async () => {
  try {
    const indexFile = path.join(pathToProjectDist, 'index.html');
    const cssFile = path.join(pathToProjectDist, 'style.css');
    await fs.writeFile(indexFile, '');
    await fs.writeFile(cssFile, '');
    console.log('Created index.html and style.css in project-dist folder');
  } catch (err) {
    console.log('Cannot create files');
  }
};

const createAssetsCopyFolder = async () => {
  try {
    await fs.mkdir(pathToAssetsCopyFolder, { recursive: true });
    console.log('Created folder assets');
  } catch (err) {
    console.log('No such folder');
  }
};

const copyFilesToAssetsFolder = async (source, dist) => {
  try {
    const files = await fs.readdir(source, { withFileTypes: true });
    await fs.mkdir(dist, { recursive: true });

    for (const file of files) {
      const srcPath = path.join(source, file.name);
      const distPath = path.join(dist, file.name);

      if (file.isDirectory()) {
        await copyFilesToAssetsFolder(srcPath, distPath);
      } else {
        await fs.copyFile(srcPath, distPath);
      }
    }
  } catch (error) {
    console.error('Copy error:', error);
  }
};

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
    console.log('Merge of css files is completed.');
  } catch (error) {
    console.error('Error:', error);
  }
};

const mergeIndexFiles = async () => {
  try {
    await fs.writeFile(pathToIndexFile, '');
    const content = await fs.readFile(pathToTemplateFile, 'utf-8');
    await fs.appendFile(pathToIndexFile, content);
    console.log('Merge of html files is completed.');
  } catch (error) {
    console.error('Error:', error);
  }
};

const renderComponents = async () => {
  try {
    const componentsFiles = await fs.readdir(pathToComponents, {
      withFileTypes: true,
    });

    let content = await fs.readFile(pathToTemplateFile, 'utf8');

    for (const file of componentsFiles) {
      const extension = path.extname(file.name);
      const name = path.basename(file.name, path.extname(file.name));
      const fileToRender = await fs.readFile(
        path.join(pathToComponents, file.name),
        'utf8',
      );

      if (extension === '.html') {
        content = content.replace(`{{${name}}}`, fileToRender);
      } else {
        console.log(`Wrong file type: ${file.name}`);
      }
    }

    await fs.writeFile(pathToIndexFile, content, 'utf8');

    console.log('Render completed!');
  } catch (error) {
    console.error('Error:', error);
  }
};

const mainFunc = async () => {
  try {
    await createProjectDistFolder();
    await createIndexAndStyleFiles();
    await createAssetsCopyFolder();
    await copyFilesToAssetsFolder(pathToAssetsFolder, pathToAssetsCopyFolder);
    await mergeCssFiles();
    await mergeIndexFiles();
    await renderComponents();
  } catch (error) {
    console.log('Error:', error);
  }
};

mainFunc();
