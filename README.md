# arch [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url]

[travis-image]: https://img.shields.io/travis/feross/arch/master.svg
[travis-url]: https://travis-ci.org/feross/arch
[npm-image]: https://img.shields.io/npm/v/arch.svg
[npm-url]: https://npmjs.org/package/arch
[downloads-image]: https://img.shields.io/npm/dm/arch.svg
[downloads-url]: https://npmjs.org/package/arch

### `os.arch()` for node and the browser

[![Sauce Test Status](https://saucelabs.com/browser-matrix/arch.svg)](https://saucelabs.com/u/arch)

This module is used by [WebTorrent Desktop](http://webtorrent.io/desktop) to
determine if the user is on a 32-bit vs. 64-bit operating system to offer the
right app installer.

The `os.arch()` method returns a string identifying the operating system CPU
architecture *for which the Node.js binary was compiled*. **In the browser, the
operating system CPU architecture itself is returned, as opposed to merely the
architecture of the browser.**

## install

```
npm install arch
```

## usage

In the browser, there is no spec that defines where this information lives, so we
check all known locations including `navigator.userAgent`, `navigator.platform`,
and `navigator.cpuClass` to make a best guess.

If there is no *affirmative indication* that the architecture is 64-bit, then
32-bit will be assumed. This makes this package perfect for determining what
installer exectuable to offer to desktop app users. If there is ambiguity, then
the user will get the 32-bit installer, which will work fine even for a user with
a 64-bit OS.

```js
var cpus = require('arch')
console.log(arch()) // always returns 'x64' or 'x86'
```

## license

MIT. Copyright (c) [Feross Aboukhadijeh](http://feross.org).
