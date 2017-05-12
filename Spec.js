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
});
