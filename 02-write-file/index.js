const fs = require('fs');
const { stdin, stdout } = process;

stdout.write('Hello!\n');

const directory = `${__dirname}/text.txt`;

fs.truncate(directory, 0, (err) => {
  if (err) {
    fs.writeFile(directory, '', (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  }
});

stdin.on('data', (data) => {
  const dataStringified = data.toString().trim();
  if (dataStringified === 'exit') {
    console.log('Goodbye!');
    process.exit();
  } else {
    fs.writeFile(directory, dataStringified + '\n', { flag: 'a' }, (err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        console.log('Data written successfully!');
      }
    });
  }
});

process.on('SIGINT', () => {
  console.log('Goodbye!');
  process.exit();
});
