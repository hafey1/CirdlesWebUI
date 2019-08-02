# CirdlesWebUI

This project consists of the frontend for the CIRDLES web services. It is mainly made with [React](https://reactjs.org) and [Redux](https://redux.js.org). More info on each of the projects can be found in the [Wiki](https://github.com/CIRDLES/CirdlesWebUI/wiki).

## Development

The project is setup so that Flow and ESLint can be easily used for static type checking and debugging. We followed [this tutorial](https://hackernoon.com/configure-eslint-prettier-and-flow-in-vs-code-for-react-development-c9d95db07213) for setting up [Visual Studio Code](https://code.visualstudio.com) so that this can work properly.

## Project Structure

The outer directory of the project contains the main files that are used for setting up the dependencies and configurations. Some important ones include the following:
* `package.json` - lists all required dependencies for development and production environments, along with providing relevant commands for running and building the project
* `webpack.config.js` - configuration for how the development and production environments should be built
* `.flowconfig` - contains rules that are used with Flow's static type checking
* `.eslintrc` - contains rules for ESLint to use when linting code for errors
* `.babelrc` - handles module and dependency resolution

The React and Redux code that is displayed on the frontend lives in the `src/` directory. This code consists of the following subfolders that make up the various pieces of the project.
* `actions` - actions that are used to perform state-changing tasks (such as retrieving data from the server)
* `components` - React components that are meant to be shared across multiple other screens/components
* `constants` - JavaScript constants that can be used in any of the React files
* `img` - where static images are stored
* `reducers` - contains the reducers that handle how the state is changed when actions are called
* `scenes` - React components that represent individual pages on the site, which may contain custom components in their own `components` folder
* `styles` - SASS files for styling pages (Note: this is only used for the HTML `body` element since moving to [Radium](http://formidable.com/open-source/radium/) for inline React styling)

## Updating the Server

There is a simple bash script on the server that updates and deploys both the frontend and backend projects. When this file is run, it pulls in any changes that have been made on the master branch in each of the CIRDLES repositories. Once the changes are pulled, the projects are built and deployed.

This repository is deployed by copying the contents of the `dist/` folder (which is created after running `npm run build`) into the `/var/www/cirdlesserver/` directory on the server.

This script is run every night via a cron job (more can be read about this at the [CirdlesWebServices](https://github.com/CIRDLES/CirdlesWebServices) repository)

To run this script manually:
1. ssh into [cirdlesserver.cs.cofc.edu](http://cirdlesserver.cs.cofc.edu)
2. Execute the following command (Note: you must have root privileges):

    ```
    sudo /usr/local/bin/deploy
    ```

## Built With

* [React](https://reactjs.org) - Frontend web framework
* [Redux](https://redux.js.org) - State Management
* [Radium](http://formidable.com/open-source/radium/) - Inline styling for React
* [npm](https://www.npmjs.com) - Dependency Management
* [webpack](https://webpack.js.org) - Tool for building/bundling the project
* [Babel](https://babeljs.io) - JavaScript Compiler
* [Flow](https://flow.org) - Static Type Checker for React/JavaScript
* [ESLint](https://eslint.org) - JavaScript linter for displaying errors and warnings
* [Sass](https://sass-lang.com) - More advanced CSS styling
