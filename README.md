# photogram

> Photogram web app - Diwanee project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Clarifications and Coding Approach

``` bash
Used techs: HTML, SASS, jQuery, JS, Vue.js, Axios, Webpack, NPM.

Routes are lazy loaded.

Modules imported in Vuex store are namespaced.

SASS code is scoped accross all components. There is also some styles that are shared accross all App and is imported in App.vue (main.scss). Classes with styles that are shared have prefix 'c-' for component so be very careful if you decide to change them. All others that are scoped have prefixes: 'a-' for atom, 'm-' for molecule and 'o-' for organism (Atomic Design Methodology). Changes on them will reflect only on specific component. There is also settings.scss (variables, functions and mixins) which are imported in every component so it can be used.

# PWA implementation is in progress.
```

## API documentation

``` bash
http://54.37.227.57/documentation
```

## Live App

``` bash
http://54.37.227.57:83/
# it's currently hardcoded on my account for testing purposes but feel free to register your own account 
```
