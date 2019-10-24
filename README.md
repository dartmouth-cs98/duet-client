# Duet Client

We're using React Slingshot as a starterpack. Read about it [here](https://github.com/coryhouse/react-slingshot) or look in `docs/FAQ.md`.

## Getting Setup on your Local Machine
1. **Initial Machine Setup**

    [Initial Machine Setup](#initial-machine-setup).

2. **Clone this repo**

## Explanation of File Structure
1. **Actions**
    This is where we'll put our Redux actions. If you don't know what that is, we'll all know very soon!
2. **Components**
    This is where we'll put our React Components.  Components create a a place of the view. They render DOM elements and put content on the screen. 
3. **Containers**
    The containers participate in the data elaboration. They "talk" with Redux, because they will need to modify the state. So, we should include connect (react-redux) which makes the connection and the functions mapStateToProps and mapDispatchToProps.
4. **Constants**
    This is where we can keep constant variables that are used throughout the codebase. It's nice to have them in one place.
5. **Reducers**
    This is where we'll keep our Redux reducers. 
6. **Store**
    This is where we'll keep our stores for Redux. Shouldn't have to do much more here!
7. **Styles**
    This is where we'll keep our .sass files which are a fancier version of CSS. If you've ever worked with CSS, you'll pick up .sass in a second. I think it'd be nice instead of having one style file with everything we break up style sheets by component.
8. **types**
    If we end up wanting to create our own types, we can put them here.
9. **utils**
    This is where we can put utility functions.
10. **tools**
    We don't need to worry about this. It came with the starter pack.

## To run locally
Run `npm start` and a window in your browser should open up. If not, navigate to `localhost:3000`.

## Technologies

Slingshot offers a rich development experience using the following technologies:

| **Tech** | **Description** |**Learn More**|
|----------|-------|---|
|  [React](https://facebook.github.io/react/)  |   Fast, composable client-side components.    | [Pluralsight Course](https://www.pluralsight.com/courses/react-flux-building-applications)  |
|  [Redux](http://redux.js.org) |  Enforces unidirectional data flows and immutable, hot reloadable store. Supports time-travel debugging. Lean alternative to [Facebook's Flux](https://facebook.github.io/flux/docs/overview.html).| [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux), [Building React Applications with Idiomatic Redux](https://egghead.io/courses/building-react-applications-with-idiomatic-redux), [Pluralsight Course](http://www.pluralsight.com/courses/react-redux-react-router-es6)|
|  [React Router](https://github.com/reactjs/react-router) | A complete routing library for React | [Pluralsight Course](https://www.pluralsight.com/courses/react-flux-building-applications) |
|  [Babel](http://babeljs.io) |  Compiles ES6 to ES5. Enjoy the new version of JavaScript today.     | [ES6 REPL](https://babeljs.io/repl/), [ES6 vs ES5](http://es6-features.org), [ES6 Katas](http://es6katas.org), [Pluralsight course](https://www.pluralsight.com/courses/javascript-fundamentals-es6)    |
| [Webpack](https://webpack.js.org) | Bundles npm packages and our JS into a single file. Includes hot reloading via [react-transform-hmr](https://www.npmjs.com/package/react-transform-hmr). | [Quick Webpack How-to](https://github.com/petehunt/webpack-howto) [Pluralsight Course](https://www.pluralsight.com/courses/webpack-fundamentals)|
| [Browsersync](https://www.browsersync.io/) | Lightweight development HTTP server that supports synchronized testing and debugging on multiple devices. | [Intro vid](https://www.youtube.com/watch?time_continue=1&v=heNWfzc7ufQ)|
| [Jest](https://facebook.github.io/jest/) | Automated tests with built-in expect assertions and [Enzyme](https://github.com/airbnb/enzyme) for DOM testing without a browser using Node. | [Pluralsight Course](https://www.pluralsight.com/courses/testing-javascript) |
| [TrackJS](https://trackjs.com/) | JavaScript error tracking. | [Free trial](https://my.trackjs.com/signup)|  
| [ESLint](http://eslint.org/)| Lint JS. Reports syntax and style issues. Using [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) for additional React specific linting rules. | |
| [SASS](http://sass-lang.com/) | Compiled CSS styles with variables, functions, and more. | [Pluralsight Course](https://www.pluralsight.com/courses/better-css)|
| [PostCSS](https://github.com/postcss/postcss) | Transform styles with JS plugins. Used to autoprefix CSS |
| [Editor Config](http://editorconfig.org) | Enforce consistent editor settings (spaces vs tabs, etc). | [IDE Plugins](http://editorconfig.org/#download) |
| [npm Scripts](https://docs.npmjs.com/misc/scripts)| Glues all this together in a handy automated build. | [Pluralsight course](https://www.pluralsight.com/courses/npm-build-tool-introduction), [Why not Gulp?](https://medium.com/@housecor/why-i-left-gulp-and-grunt-for-npm-scripts-3d6853dd22b8#.vtaziro8n)  |

The starter kit includes a working example app that puts all of the above to use.

---

