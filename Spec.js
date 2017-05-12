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
});
