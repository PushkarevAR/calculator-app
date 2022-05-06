## Description
The Calculator application is part of an interface designer's test task:

As a test task, we propose to develop a calculator [interface](https://www.figma.com/proto/D5OltlIPKtozs1ib4bBuP4/Untitled?node-id=1%3A4&scaling=min-zoom).

### Requirements

1. The calculator's input accepts a string with a mathematical expression.
2. A mathematical expression can consist of addition, subtraction, multiplication and division operations, as well as parentheses.
3. Mathematical expression can be typed both from the keyboard and by pressing the corresponding buttons on the calculator. The calculation of the expression must be performed by pressing the "=" button of the calculator or by pressing the Enter key of the keyboard.
4. Parsing and calculation of a mathematical expression must be done independently, without using third-party libraries.
5. The architecture of the solution should ensure the expansion of the list of supported operations with minimal changes for the existing functionality.
6. The solution involves self-assembly of the application using webpack or analogues.
7. The calculator should take up the entire browser screen when viewed from a mobile phone.
8. Calculator source code must be covered by tests.
9. Calculator source code must be covered with typing (flow or typescript).
10. The project must have static code analysis (eslint, stylelint).
11. The project repository must contain the file [readme.md] with a description of the calculator's installation,
running and testing.

## Technology stack:
- React 17.0.2
- SCSS 1.49.9
- Jest 27.4.1
- TypeScript 4.6.2
- ESlint 8.11.0


## Build
To build and run this application locally, you'll need the latest versions of Git installed on your computer. From your
command line:
```
# Clone this repository
$ git clone https://github.com/PushkarevAR/calculator-app.git

# Go into the repository
$ cd calculator-app

# Test
$ npm test

# Run
$ npm start

# Deploy
$ npm run deploy
```
Deploy available via [gh-pages](https://pushkarevar.github.io/calculator-app/)

## Showcase
<img src="https://user-images.githubusercontent.com/85485508/167120543-8bcdd422-70ca-46a4-8b11-6371465fdbd5.png" alt="calculator-app-showcase"/>
