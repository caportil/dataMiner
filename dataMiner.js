let fs = require('fs'),
  path = require('path'),
  SearchData = require('./SearchData.js').SearchData,
  args = process.argv.slice(2),
  output = [],
  filePath, command, parameter;

{/* Ingest data and apply parser */}

if (args.length < 2) {
  console.log('Please enter both a file and valid command!')

} else {
  filePath = path.join(__dirname, args[0]);
  command = args[1];
  parameter = args[2];

  fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) => {
    data = JSON.parse(data);
    if (!err) {
      console.log(SearchData(data, command, parameter));
    } else {
      console.log('Error parsing data:', err);
    }
  })
}