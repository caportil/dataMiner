describe('Formats Correctly', function() {
  let locateCAdata = SearchData(mockData, 'LOCATE', 'CA');
  it('Logs a response', function() {
    expect(locateCAdata.length).toBeDefined();
  });
  it('Lists company names from search results in required format', function() {
    expect(locateCAdata.slice(0,14)).toEqual('Company Names:');
  });
  it('Lists number of found companies in required format', function() {
    expect(locateCAdata.indexOf(`\nNumber of Companies:`)).toBeGreaterThan(-1);
  });
  it('Accepts parameters in upper or lower case', function() {
    expect(() => SearchData(mockData, 'locate', 'cA')).not.toThrow();
  })
});

describe('Accepts Supported Instructions', function() {
  it('Does not accept insufficient parameters', function() {
    expect(() => SearchData(mockData)).toThrow();
    expect(() => SearchData(mockData, 'find_before')).toThrow();
  });
  it('Accepts "locate" command', function() {
    expect(() => SearchData(mockData, 'LOCATE', 'AL')).not.toThrow();
  });
  let randomYear = (Math.floor(Math.random()*10000)).toString();
  it('Accepts "find_before" command', function() {
    expect(() => SearchData(mockData, 'find_before', randomYear)).not.toThrow();
  });
  it('Accepts "find_after" command', function() {
    expect(() => SearchData(mockData, 'find_after', randomYear)).not.toThrow();
  });
  it('Accepts "find_companies_between_size" command with correct parameters', function() {
    expect(() => SearchData(mockData, 'find_companies_between_size', '1-10')).not.toThrow();
  });
  it('Does not run find_companies_between_size using incorrect parameters', function() {
    expect(() => SearchData(mockData, 'find_companies_between_size', '2-9')).toThrow();
  });
  it('Accepts "find_type" command with correct parameters', function() {
    expect(() => SearchData(mockData, 'find_type', 'Geospatial/Mapping')).not.toThrow();
  });
  it('Does not run find_type using incorrect parameters', function() {
    expect(() => SearchData(mockData, 'find_type', 'foobar')).toThrow();
  });
  it('Does not accept unknown commands', function() {
    expect(() => SearchData(mockData, 'null', 'foobar')).toThrow();
  });
});

describe('Runs provided examples', function() {
  it('Locates correct companies based in MD', function() {
    let marylandResults = SearchData(mockData, 'locate', 'MD');
    expect(marylandResults.indexOf('Computer Packages Inc')).toBeGreaterThan(-1);
    expect(marylandResults.indexOf('Number of Companies: 8')).toBeGreaterThan(-1);

  });
  it('Finds companies established after 2002', function() {
    let findAfterResults = SearchData(mockData, 'find_after', '2002');
    expect(findAfterResults.indexOf('Department of Better Technology')).toBeGreaterThan(-1);
    expect(findAfterResults.indexOf('Number of Companies: 187')).toBeGreaterThan(-1);
  });
  it('Finds employees between size "1,001-5,000"', function() {
    let employeeResults = SearchData(mockData, 'find_companies_between_size', '1,001-5,000');
    expect(employeeResults.indexOf('Morningstar, Inc.')).toBeGreaterThan(-1);
    expect(employeeResults.indexOf('Number of Companies: 17')).toBeGreaterThan(-1);
  });
  it('Finds Geospatial/Mapping companies', function() {
    let typeResults = SearchData(mockData, 'find_type', 'Geospatial/Mapping');
    expect(typeResults.indexOf('Liquid Robotics')).toBeGreaterThan(-1);
    expect(typeResults.indexOf('Number of Companies: 21')).toBeGreaterThan(-1);
  });
});
