# this和原型

## 一、关于this
this 关键字是 JavaScript 中最复杂的机制之一。它是一个很特别的关键字，被自动定义在
所有函数的作用域中。但是即使是非常有经验的 JavaScript 开发者也很难说清它到底指向
什么。

需要明确的是，this 在任何情况下都不指向函数的词法作用域。在 JavaScript 内部，作用
域确实和对象类似，可见的标识符都是它的属性。但是作用域“对象”无法通过 JavaScript
代码访问，它存在于 JavaScript 引擎内部。

```js
function foo() {
  var a = 2;
  this.bar();
}
function bar() {
  console.log( this.a );
}
foo(); // ReferenceError: a is not defined
```
这段代码中的错误不止一个。虽然这段代码看起来好像是我们故意写出来的例子，但是实
际上它出自一个公共社区中互助论坛的精华代码。这段代码非常完美（同时也令人伤感）
地展示了 this 多么容易误导人。

首先，这段代码试图通过 this.bar() 来引用 bar() 函数。这是绝对不可能成功的，我们之
后会解释原因。调用 bar() 最自然的方法是省略前面的 this，直接使用词法引用标识符。

此外，编写这段代码的开发者还试图使用 this 联通 foo() 和 bar() 的词法作用域，从而让
bar() 可以访问 foo() 作用域里的变量 a。这是不可能实现的，你不能使用 this 来引用一
个词法作用域内部的东西。

之前我们说过 this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调
用时的各种条件。this 的绑定和函数声明的位置没有任何关系，只取决于**函数的调用方式。**

当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包
含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。this 就是记录的
其中一个属性，会在函数执行的过程中用到。

## 二、this全面解析
在理解 this 的绑定过程之前，首先要理解调用位置：调用位置就是函数在代码中被调用的
位置（而不是声明的位置）。只有仔细分析调用位置才能回答这个问题：这个 this 到底引
用的是什么？

通常来说，寻找调用位置就是寻找“函数被调用的位置”，但是做起来并没有这么简单，
因为某些编程模式可能会隐藏真正的调用位置。

### 2.1 绑定规则

#### 2.1.1 默认绑定
首先要介绍的是最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用
其他规则时的默认规则。

```js
function foo() {
  console.log( this.a );
}
var a = 2;
foo(); // 2

```
函数调用时应用了 this 的默认绑定，因此 this 指向全局对象。

#### 2.1.2 隐式绑定
```js
function foo() {
  console.log( this.a );
}
var obj = {
  a: 2,
  foo: foo
};
obj.foo(); // 2
```
当 foo() 被调用时，它的落脚点确实指向 obj 对象。当函数引
用有上下文对象时，隐式绑定规则会把函数调用中的 this 绑定到这个上下文对象。因为调
用 foo() 时 this 被绑定到 obj，因此 this.a 和 obj.a 是一样的。

对象属性引用链中只有最顶层或者说最后一层会影响调用位置。
```js
function foo() {
  console.log( this.a );
}
var obj2 = {
  a: 42,
  foo: foo
};
var obj1 = {
  a: 2,
  obj2: obj2
};
obj1.obj2.foo(); // 42
```

隐式丢失
```js
function foo() {
  console.log( this.a );
}
var obj = {
  a: 2,
  foo: foo
};
var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global"
```
虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身，因此此时的
bar() 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。
#### 2.1.3 显式绑定
就像我们刚才看到的那样，在分析隐式绑定时，我们必须在一个对象内部包含一个指向函
数的属性，并通过这个属性间接引用函数，从而把 this 间接（隐式）绑定到这个对象上。

说，可以使用函数的 call(..) 和
apply(..) 方法。严格来说，JavaScript 的宿主环境有时会提供一些非常特殊的函数，它们
并没有这两个方法。但是这样的函数非常罕见，JavaScript 提供的绝大多数函数以及你自
己创建的所有函数都可以使用 **call(..)** 和 **apply(..)** 方法。

```js
function foo() {
  console.log( this.a );
}
var obj = {
  a:2
};
foo.call( obj ); // 2
```
通过 foo.call(..)，我们可以在调用 foo 时强制把它的 this 绑定到 obj 上。

如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作 this 的绑定对
象，这个原始值会被转换成它的对象形式（也就是 new String(..)、new Boolean(..) 或者
new Number(..)）。这通常被称为“装箱”。

:::tip
call的参数，除了第一个，后面可以是n个参数。

apply的参数，除了第一个，后面是一个其他参数组成的数组。
:::

ES5 中提供了内置的方法 Function.prototype.bind，它的用法如下：
```js
function foo(something) {
  console.log( this.a, something );
  return this.a + something;
}
var obj = {
  a:2
};
var bar = foo.bind( obj );
var b = bar( 3 ); // 2 3
console.log( b ); // 5
```
bind(..) 会返回一个硬编码的新函数，它会把参数设置为 this 的上下文并调用原始函数。

:::tip
注意，call和apply是直接运行的，但是bind是返回了一个新函数。
:::

#### 2.1.4 new绑定
在传统的面向类的语言中，“构造函数”是类中的一些特殊方法，使用 new 初始化类时会调用类中的构造函数。通常的形式是这样的：
```js
something = new MyClass(..);
```
JavaScript 也有一个 `new` 操作符，使用方法看起来也和那些面向类的语言一样，绝大多数开
发者都认为 JavaScript 中 new 的机制也和那些语言一样。然而，JavaScript 中 new 的机制实
际上和面向类的语言完全不同。

包括内置对象函数（比如 `Number(..)`）在内的所有函数都可以用 new 来调用，这种函数调用被称为构造函数调用。这里有一个重要但是非常细微的区别：实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”`。

使用 new 来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。
1. 创建（或者说构造）一个全新的对象。
2. 这个新对象会被执行 [[ 原型 ]] 连接。
3. 这个新对象会绑定到函数调用的 this。

```js
function foo(a) {
  this.a = a;
}
var bar = new foo(2);
console.log( bar.a ); // 2
```
使用 new 来调用 foo(..) 时，我们会构造一个新对象并把它绑定到 foo(..) 调用中的 this上。new 是最后一种可以影响函数调用时 this 绑定行为的方法，我们称之为 new 绑定。

### 2.2 优先级
函数调用中 this 绑定的四条规则，你需要做的就是找到函数的调用位
置并判断应当应用哪条规则。但是，如果某个调用位置可以应用多条规则该怎么办？为了
解决这个问题就必须给这些规则设定`优先级`。

毫无疑问，默认绑定的优先级是四条规则中最低的，所以我们可以先不考虑它。

```js
function foo() {
  console.log( this.a );
}
var obj1 = {
  a: 2,
  foo: foo
};
var obj2 = {
  a: 3,
  foo: foo
};

obj1.foo(); // 2
obj2.foo(); // 3
obj1.foo.call( obj2 ); // 3
obj2.foo.call( obj1 ); // 2
```
可以看到，显式绑定优先级更高，也就是说在判断时应当先考虑是否可以应用显式绑定。

现在我们需要搞清楚 new 绑定和隐式绑定的优先级谁高谁低：
```js
function foo(something) {
  this.a = something;
}

var obj1 = {
  foo: foo
};

var obj2 = {};
obj1.foo( 2 );
console.log( obj1.a ); // 2
obj1.foo.call( obj2, 3 );
console.log( obj2.a ); // 3

var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a ); // 4
```
可以看到 new 绑定比隐式绑定优先级高。但是 new 绑定和显式绑定谁的优先级更高呢？

:::tip
new 和 call/apply 无法一起使用，因此无法通过 new foo.call(obj1) 来直接进行测试。但是我们可以使用硬绑定来测试它俩的优先级。

Function.prototype.bind(..) 会创建一个新的包装函数，这个函数会忽略它当前的 this 绑定（无论绑定的对象是什么），并把我们提供的对象绑定到 this 上。

这样看起来硬绑定（也是显式绑定的一种）似乎比 new 绑定的优先级更高，无法使用 new来控制 this 绑定。
:::
```js
function foo(something) {
  this.a = something;
}

var obj1 = {};
var bar = foo.bind( obj1 );
bar( 2 );
console.log( obj1.a ); // 2

var baz = new bar(3);
console.log( obj1.a ); // 2
console.log( baz.a ); // 3
```
出乎意料！ bar 被硬绑定到 obj1 上，但是 new bar(3) 并没有像我们预计的那样把 obj1.a修改为 3。相反，new 修改了硬绑定（到 obj1 的）调用 bar(..) 中的 this。因为使用了new 绑定，我们得到了一个名字为 baz 的`新对象`，并且 baz.a 的值是 3。

### 2.3 判断this
现在我们可以根据优先级来判断函数在某个调用位置应用的是哪条规则。可以按照下面的顺序来进行判断：
1. 函数是否在 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
```js
var bar = new foo()
```
2. 函数是否通过 call、apply（显式绑定）或者硬绑定调用？如果是的话，this 绑定的是
指定的对象。
```js
var bar = foo.call(obj2)
```
3. 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上
下文对象。
```js
var bar = obj1.foo()
```
4. 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到
全局对象。
```js
var bar = foo()
```

:::tip
new > 显式绑定 > 隐式绑定 > 默认绑定
:::

### 2.4 箭头函数
箭头函数并不是使用 function 关键字定义的，而是使用被称为“胖箭头”的操作符 `=>` 定义的。箭头函数不使用 this 的四种标准规则，而是根据`外层（函数或者全局）作用域`来决定 this。
```js
function foo() {
  // 返回一个箭头函数
  return (a) => {
    //this 继承自 foo()
    console.log( this.a );
  };
}
var obj1 = {
  a:2
};
var obj2 = {
  a:3
};
var bar = foo.call( obj1 );
bar.call( obj2 ); // 2, 不是 3 ！
```
实际上，在 ES6 之前我们就已经在使用一种几乎和箭头函数完全一样的模式。
```js
function foo() {
  var self = this; // lexical capture of this
  setTimeout( function(){
    console.log( self.a );
  }, 100 );
}
var obj = {
  a: 2
};
foo.call( obj ); // 2
```
虽然 self = this 和箭头函数看起来都可以取代 bind(..)，但是从本质上来说，它们想替代的是 this 机制。
## 三、原型

### 3.1 [[prototype]]
JavaScript 中的对象有一个特殊的 `[[Prototype]]` 内置属性，其实就是对于其他对象的引用。几乎所有的对象在创建时`[[Prototype]]` 属性都会被赋予一个非空的值。
:::tip
注意：很快我们就可以看到，对象的 [[Prototype]] 链接可以为空，虽然很少见。
:::

如果访问一个当前对象上不存在的属性，就会继续访问对象的 [[Prototype]] 链。

使用 for..in 遍历对象时原理和查找 [[Prototype]] 链类似，任何可以通过原型链访问到（并且是 enumerable）的属性都会被枚举。使用 in 操作符来检查属性在对象中是否存在时，同样会查找对象的整条原型链（无论属性是否可枚举）：
```js
var anotherObject = {
  a:2
};
// 创建一个关联到 anotherObject 的对象
var myObject = Object.create( anotherObject );

for (var k in myObject) {
  console.log("found: " + k); //found: a
}

// found: a
("a" in myObject); // true
```

#### 3.1.1 尽头
但是到哪里是 [[Prototype]] 的“尽头”呢？

所有普通的 [[Prototype]] 链最终都会指向内置的 Object.prototype。由于所有的“普通”（内置，不是特定主机的扩展）对象都“源于”（或者说把 [[Prototype]] 链的顶端设置为）这个 `Object.prototype` 对象，所以它包含 JavaScript 中许多通用的功能。 比如说 .toString() 和 .valueOf()、.hasOwnProperty(..)等。

### 3.1.2 Object.create()
调用`Object.create(..) `会凭空创建一个“新”对象并把新对象内部的 [[Prototype]] 关联到你指定的对象。
```js
var foo = {
  something: function() {
    console.log( "Tell me something good..." );
  }
};
var bar = Object.create( foo );
bar.something(); // Tell me something good...
```
Object.create(..) 会创建一个新对象（bar）并把它关联到我们指定的对象（foo），这样
我们就可以充分发挥 [[Prototype]] 机制的威力（委托）并且避免不必要的麻烦（比如使
用 new 的构造函数调用会生成 .prototype 和 .constructor 引用）

### 3.1.3 instanceof
instanceof 操作符的左操作数是一个普通的对象，右操作数是一个函数。instanceof 回答的问题是：在 a 的整条 [[Prototype]] 链中是否有指向 Foo.prototype 的对象？

```js
a instanceof Foo; // true
```
### 3.1.4 `__proto__`
我们也可以直接获取一个对象的 [[Prototype]] 链。在 ES5 中，标准的方法是：
```js
Object.getPrototypeOf( a );
```
可以验证一下，这个对象引用是否和我们想的一样：
```js
Object.getPrototypeOf( a ) === Foo.prototype; // true
```
绝大多数（不是所有！）浏览器也支持一种非标准的方法来访问内部 [[Prototype]] 属性：
```js
a.__proto__ === Foo.prototype; // true
```
这个奇怪的 `.__proto__`（在 ES6 之前并不是标准！）属性“神奇地”引用了内部的[[Prototype]] 对象，如果你想直接查找（甚至可以通过 `.__proto__.__ptoto__`... 来遍历）原型链的话，这个方法非常有用。
:::tip
JavaScript 社区中对于双下划线有一个非官方的称呼，他们会把类似 __proto__
的属性称为“笨蛋（dunder）”。所以，JavaScript 潮人会把 __proto__ 叫作
“笨蛋 proto”。
:::

```js
Foo = {
  init: function(who) {
    this.me = who;
  },
  identify: function() {
    return "I am " + this.me;
  }
};
Bar = Object.create( Foo );
Bar.speak = function() {
  alert( "Hello, " + this.identify() + "." );
};
var b1 = Object.create( Bar );
b1.init( "b1" );
var b2 = Object.create( Bar );
b2.init( "b2" );
b1.speak();
b2.speak();
```
这段代码中我们同样利用 [[Prototype]] 把 b1 委托给 Bar 并把 Bar 委托给 Foo，和上一段代码一模一样。我们仍然实现了三个对象之间的关联。

![prototype](https://z1.ax1x.com/2023/10/15/pi90ww9.png)

:::tip
构造函数具有prototype属性。

对象具有[[Prototype]]或者__proto__属性。

可以通过 Object.getPrototypeOf() 方法来获取一个对象的原型，或者使用 Object.setPrototypeOf() 方法来设置一个对象的原型。
:::