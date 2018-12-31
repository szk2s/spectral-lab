# spectral-mpe-editor

![mock_20181228](https://user-images.githubusercontent.com/31060964/50502309-a1ad1c80-0aa1-11e9-8884-f60d0bf6da1b.gif)

> Electron app for generating and editing MIDI files which is compatible with MPE applications.

## Table of Contents

- [spectral-mpe-editor](#spectral-mpe-editor)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
  - [Development](#development)
    - [Install electron-react-devtools.](#install-electron-react-devtools)
    - [Linting](#linting)
  - [Application Distribution](#application-distribution)
  - [References](#references)
  - [Maintainers](#maintainers)
  - [Contributing](#contributing)
  - [License](#license)

## Install

git clone or download zip 

Then install dependencies
```
npm i
```

## Usage

```
npm start
```

## Development  

**Note**  
*Please refresh your app with `cmd + r` after launching electron with `npm start`.   
If you don't refresh, you will see the previous version.*

### Install electron-react-devtools.  
Execute the following from the Console tab of your running Electron app's developer tools:  

```
require('electron-react-devtools').install()
```
And than refresh with `cmd + r`, you can see a React tab added.  
  
### Linting
You can run both ESLint and Prettier with one command.  
```
npm run lint
```  

## Application Distribution
You can package your code and build app with following command.
```
npm run build
```  
It may take 2 or 3 minuites. Please be patient.  

## References
[What's MPE?](http://mpe.js.org/ "mpe.js")  
[Spear (recommended spectral analysis tool)](http://www.klingbeil.com/spear/ "Spear")  
[How to make spectrum data with MATLAB?](https://github.com/szk2s/Spectral-Analysis "Spectral-Analysis")  
[The format of text file (Spear export)](https://sites.google.com/view/hintjam-frontier-of-music/%E3%83%9B%E3%83%BC%E3%83%A0 "Hint-Jam")  

## Maintainers

[@szk2s](https://github.com/szk2s)

## Contributing

PRs welcome.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2018 Satoshi Suzuki
