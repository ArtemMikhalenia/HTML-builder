const fs = require('fs').promises;
const path = require('path');

const pathToFilesFolder = path.join(__dirname, 'files');
const pathToFilesCopyFolder = path.join(__dirname, 'files-copy');

const createFilesCopyFolder = async () => {
  try {
    await fs.mkdir(pathToFilesCopyFolder, { recursive: true });
    console.log('Created folder File-Copy');
  } catch (err) {
    console.log('No such folder');
  }
};

const deleteFilesInCopyFolder = async () => {
  try {
    const files = await fs.readdir(pathToFilesCopyFolder);
    for (const item of files) {
      await fs.unlink(path.join(pathToFilesCopyFolder, item));
    }
  } catch (err) {
    console.log('No files in directory');
  }
};

const copyFilesToCopyFolder = async () => {
  try {
    const files = await fs.readdir(pathToFilesFolder);
    for (const item of files) {
      await fs.copyFile(
        path.join(pathToFilesFolder, item),
        path.join(pathToFilesCopyFolder, item),
      );
    }
  } catch (err) {
    console.log('Error:', err);
  }
};

const mainFunc = async () => {
  try {
    await createFilesCopyFolder();
    await deleteFilesInCopyFolder();
    await copyFilesToCopyFolder();
  } catch (error) {
    console.log('Error:', error);
  }
};

mainFunc();
