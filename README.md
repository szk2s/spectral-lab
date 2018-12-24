# spectral-mpe-editor

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

![mock](https://user-images.githubusercontent.com/31060964/50388623-9aafa280-075f-11e9-94ec-818233d36be4.gif)

> Electron app for generating and editing MIDI files which is compatible with MPE applications.

TODO: Fill out this long description.

## Table of Contents

- [spectral-mpe-editor](#spectral-mpe-editor)
  - [Table of Contents](#table-of-contents)
  - [Install](#install)
  - [Usage](#usage)
  - [Development](#development)
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
Then install electron-react-devtools.  
Execute the following from the Console tab of your running Electron app's developer tools:  

```
require('electron-react-devtools').install()
```
And than refresh or restart the renderer process, you can see a React tab added.

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
