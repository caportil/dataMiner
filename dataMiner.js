let fs = require('fs'),
  path = require('path'),
  SearchData = require('./SearchData.js').SearchData,
  args = process.argv.slice(2),
  output = [],
  filePath, command, parameter;

{/* Main function for processing ingested JSON */}

// let parse = (data, command, parameter) => {
//   // standardize input
//   command = command.toUpperCase();
//   parameter = parameter.toUpperCase();
  
//   // search for matching records
//   if (command === 'LOCATE') {
//     data.forEach(item => {
//       if (item.state === parameter) output.push(item.company_name);
//     });
//   } else if (command === 'FIND_BEFORE') {
//     if (!Number(parameter)) {
//       console.log('Please enter a valid year!');
//       return;
//     }
//     data.forEach(item => {
//       if (item.year_founded <= Number(parameter)) output.push(item.company_name);
//     });
//   } else if (command === 'FIND_AFTER') {
//     if (!Number(parameter)) {
//       console.log('Please enter a valid year!');
//       return;
//     }
//     data.forEach(item => {
//       if (item.year_founded >= Number(parameter)) output.push(item.company_name);
//     });
//   } else if (command === 'FIND_COMPANIES_BETWEEN_SIZE') {
//     let options = ['1-10', '11-50', '51-200', '201-500', '501-1,000', '1,001-5,000', '5,001-10,000', '10,001+'];
//     if (options.indexOf(parameter) < 0) {
//       console.log(`Please enter a valid company size! Supported options: ${options.join(', ')}`);
//       return;
//     }
//     data.forEach(item => {
//       if (item.full_time_employees === parameter) output.push(item.company_name);
//     });
//   } else if (command === 'FIND_TYPE') {
//     let options = ['N/A', 'Aerospace and Defense', 'Business & Legal Services', 'Data/Technology', 'Education', 'Energy', 'Environment & Weather', 'Finance & Investment', 'Food & Agriculture', 'Geospatial/Mapping', 'Governance', 'Healthcare', 'Housing/Real Estate', 'Insurance', 'Lifestyle & Consumer', 'Media', 'Research & Consulting', 'Scientific Research', 'Transportation'].map(el => el.toUpperCase());
//     if (options.indexOf(parameter) < 0) {
//       console.log(`Please enter a valid company company_category! Your entry: ${parameter}. Supported options: ${options.join(', ')}`);
//       return;
//     }
//     data.forEach(item => {
//       if (item.company_category.toUpperCase() === parameter) output.push(item.company_name);
//     })
//   } else {
//     console.log('Please enter a valid command!');
//     return;
//   }   

//   return(`Company Names: \n${output.join(', ')}\n\nNumber of Companies: ${output.length}`);
// };




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