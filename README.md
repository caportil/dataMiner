Data Miner

Overview
-My data miner consists of several components:
1) The primary function SearchData, which takes in a JSON file, a command, and a command parameter as its arguments. Exported within SearchData.js
2) A node file, dataMiner.js, which ingests a JSON file and calls SearchData using this information
3) Jasmine testing components, found within lib -> jasmine-2.6.1, as well as a SpecRunner.html, Spec.js, and mockData.js files that check to see if the function is working properly

Instructions
-Although the program itself is not OS-specific, Node must be installed in order to run. From the command line, simply use 'node dataMiner.js' followed by:
1) The name of your JSON file
2) A command (supported commands below)
3) A command parameter

For example, running 'node dataMiner.js data.json locate CA' will return a count and list of companies based in California, while running 'node dataMiner.js data.json find_companies_between_size "1,001-5,000"' will search for companies with the specified number of employees.

Testing
-Simply open SpecRunner.html to view the tests, and modify/add additional ones within Spec.js

Design
1) dataMiner.js first checks to see if the user has provided sufficient information, then uses the File System module to read the specified JSON data and pass it into the SearchData function along with the specified command/parameters
2) SearchData standardizes the user's input and checks if the specified command is supported. If so, it iterates through the data array and pushes matching results into an output, which it then uses to return the requested information in the format presented. It throws an error if the command is not supported, or if the parameter is invalid
3) SearchData is defined in its own separate file to allow Jasmine to test against it properly, while still being exported to allow Node to import into dataMiner.js
