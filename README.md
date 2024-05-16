# Trade Report Engine - TypeScript Code Challenge

## Overview

This is a TypeScript project that loads a set of event XML messages into a database, and then displays a custom subset of them through a REST API.

## Requirements

For building and running the application you need:

- Node.js
- npm

## Project setup instructions

To start using this project use the following commands:

```shell
git clone https://github.com/leighbrunner/ts-trade-reporting-engine.git
cd ts-trade-reporting-engine
npm install
npm start
```

You can then view the API with the required report at http://localhost:3000/

Some additional endpoints to demo the services can be found here:
- http://localhost:3000/event/all
- http://localhost:3000/event/currency/aud
- http://localhost:3000/event/currency/usd

## Configuration

The directory that contains the XML files to be loaded can be configured by the XML_DIRECTORY environment variable. New event XML files can be added to this directory.  The application will need to be restarted to load them in.

The port that the app runs on can be configured by the PORT environment variable.

## Testing the application

```shell
npm test
```

## License info
MIT License

Copyright (c) 2024 Leigh Brunner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.