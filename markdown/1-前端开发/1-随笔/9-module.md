# 模块化
## JS模块化历史在
JavaScript这门语言最初的阶段，是没有模块化方法的，从它的名字就可以看出，这门语言的设计初衷是作为Web小脚本使用。

后来随着其在网页应用中的大规模使用，不能模块化开始限制了它的发展。这个时候社区中出现了一些模块化规范，比较著名的有CommonJS、AMD和CMD等。通过遵守这些规范，JS就可以进行模块化使用。社区的模块化规范可以解决大部分JS模块化的问题，但各种模块化规范并不统一，有学习和兼容成本。

于是，JS在制定ES6语言标准的时候，提出了自己的模块化方案，也就是现在的ES6 Module（ES6模块化）。ES6 Module经过多年的发展，已经广泛应用于JS开发领域。目前，JS模块化使用的主要是ES6 Module和CommonJS这两种，后者在Node.js开发领域非常流行。

## Es6 Modele
ES6 模块化是 JavaScript 的一项新特性，是在 ECMAScript 2015 (ES2015) 中引入的。它使用 import 和 export 语句来导入和导出模块中的内容。

```js
// module1.js
export function sayHello(name) {
  console.log(`Hello, ${name}!`);
}

// module2.js
import { sayHello } from './module1';

sayHello('Alice'); // outputs "Hello, Alice!"
```

## CommonJS
CommonJS 是一种早期的模块系统，主要用于服务器端 JavaScript。它使用 require 和 module.exports 语句来导入和导出模块中的内容。

```js
// module1.js
function sayHello(name) {
  console.log(`Hello, ${name}!`);
}
module.exports = { sayHello };

// module2.js
const { sayHello } = require('./module1');

sayHello('Alice'); // outputs "Hello, Alice!"
```

## 区别
- CommonJS导入的是值的拷贝，ES6 Module导入的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
- 总的来说，ES6 模块化更加现代化，语法更加简洁，功能也更加强大。它在浏览器端和服务器端都可以使用，而 CommonJS 只能在服务器端使用。
