let SearchData = (data, command, parameter) => {
  let notification, output = [];

  // standardize input
  command = command.toUpperCase();
  parameter = parameter.toUpperCase();
  
  // search for matching records
  if (command === 'LOCATE') {
    data.forEach(item => {
      if (item.state === parameter) output.push(item.company_name);
    });
  } else if (command === 'FIND_BEFORE') {
    if (!Number(parameter)) {
      console.log('Please enter a valid year!');
      return;
    }
    data.forEach(item => {
      if (item.year_founded <= Number(parameter)) output.push(item.company_name);
    });
  } else if (command === 'FIND_AFTER') {
    if (!Number(parameter)) {
      console.log('Please enter a valid year!');
      return;
    }
    data.forEach(item => {
      if (item.year_founded >= Number(parameter)) output.push(item.company_name);
    });
  } else if (command === 'FIND_COMPANIES_BETWEEN_SIZE') {
    let options = ['1-10', '11-50', '51-200', '201-500', '501-1,000', '1,001-5,000', '5,001-10,000', '10,001+'];
    if (options.indexOf(parameter) < 0) {
      notification = `Please enter a valid company size! Supported options: ${options.join(', ')}`;
      throw new Error(notification);
    }
    data.forEach(item => {
      if (item.full_time_employees === parameter) output.push(item.company_name);
    });
  } else if (command === 'FIND_TYPE') {
    let options = ['N/A', 'Aerospace and Defense', 'Business & Legal Services', 'Data/Technology', 'Education', 'Energy', 'Environment & Weather', 'Finance & Investment', 'Food & Agriculture', 'Geospatial/Mapping', 'Governance', 'Healthcare', 'Housing/Real Estate', 'Insurance', 'Lifestyle & Consumer', 'Media', 'Research & Consulting', 'Scientific Research', 'Transportation'].map(el => el.toUpperCase());
    if (options.indexOf(parameter) < 0) {
      notification = `Please enter a valid company company_category! Your entry: ${parameter}. Supported options: ${options.join(', ')}`;
      throw new Error(notification);
    }
    data.forEach(item => {
      if (item.company_category.toUpperCase() === parameter) output.push(item.company_name);
    })
  } else {
    notification = 'Please enter a valid command!';
    throw new Error(notification);
  }   

  return(`Company Names:\n${output.join(', ')}\n\nNumber of Companies: ${output.length}`);
};

exports.SearchData = SearchData;
