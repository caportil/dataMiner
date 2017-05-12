describe('Test Format', function() {
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
