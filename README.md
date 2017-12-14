# JS-Paint

Simple paint app made with front-end technologies.
This project uses plain [Typescript](https://www.typescriptlang.org/), [Webpack](https://webpack.js.org/), [Paper.js](http://paperjs.org/) and [Jest](https://facebook.github.io/jest/) for testing.

## Requirements

Just [Node LTS](https://facebook.github.io/jest/), and (optional) i personally use [Yarn](https://yarnpkg.com/lang/en/) as package manager.


## Usage

Install all dependencies:  
```
yarn install // `npm install`
```

Run the application (at http://localhost:8080):  
```
yarn start // or `npm start` for initialize the app
```

Run the test bundle:  
```
yarn test // or `npm test` execute the unit-tests.
```

Run the lint bundle:  
```
yarn lint // or `npm run lint` lints the src code included tests.
```

Run the build bundle (no compress,optimization or gzip applied):  
```
yarn build // or `npm run build` compiles everything to /dist.
```