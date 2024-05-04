由于工作中很少用到React，所以记录的可能详细一点，但是我看书里面很多是按照
类组件来举例的，16.8之后，应该很少使用类组件了吧，所以主要把几个hooks再回
顾一遍。

## 一、Hooks

为什么使用Hooks（函数式组件）代替类组件？

(1)针对优化类组件的三大问题：状态逻辑难复用、趋向复杂难以维护、this指向问题。

(2)在无须修改组件结构的情况下复用状态逻辑（自定义Hook）。

(3)将组件中相互关联的部分拆分成更小的函数（例如设置订阅或请求数据）。

(4)副作用的关注点分离：副作用指那些没有发生在数据向视图转换过程中的逻辑，如Ajax请求、访问原生DOM元素、本地持久化缓存、绑定／解绑事件、添加订阅、设置定时器、记录日志等。这些`副作用`都写在类组件生命周期函数中。

React会保持对当前渲染组件的追踪，每个组件内部都有一个`记忆单元格`，用于存储JS对象数据。当调用Hook时就可读取当前Hook所在组件的记忆单元格里面的数据。

### useState

useState()用于为函数式组件引入状态(state)。因为纯函数不能有状态，所以把状态放在钩子里面。

### 初始化state

[![useState](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P553_26593.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P553_26593.jpg)

上面的代码会返回一个num和num的更新函数，num和setNum名称是自己定义的。在初始渲染期间，返回的状态(num)与传入的第1个参数(initialState)的值相同。setNum()函数用于更新num，它接收一个新的num值并将组件的一次重新渲染加入队列。

### 惰性初始化state

initialState参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始num需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的num，此函数只在初始渲染时被调用。

它应该是纯函数，不应该接受任何参数，并且应该返回一个任何类型的值。当初始化组件时，React 将调用你的初始化函数，并将其返回值存储为初始状态。

[![惰性state](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P554_26604.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P554_26604.jpg)

useState用法：
[![state](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P554_26616.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P554_26616.jpg)

### 更新state

如果新的state需要通过先前的state计算得出，则可以将`函数`传递给setState()。该`函数将接收先前的state`，并返回一个更新后的值。

[![更新state](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P555_26786.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P555_26786.jpg)

因为被更新的state需要基于之前的state，但是“重置”按钮则采用普通形式，因为它总是把count设置回初始值。

### useEffect

useEffect()用来引入具有副作用的操作，最常见的就是向服务器请求数据。以前放在componentDidMount里面的代码，现在可以放在useEffect()里。

[![useEffect](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P556_26860.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P556_26860.jpg)

useEffect()接收两个参数。第1个参数是一个函数，异步操作的代码放在里面。第2个参数是一个数组，用于给出effect的依赖项，只要这个数组发生变化，useEffect()就会执行。第2个参数可以省略，这时每次组件渲染时，都会执行useEffect()。

[![useEffect](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P556_26872.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P556_26872.jpg)

组件卸载时需要清除effect创建的诸如订阅或计时器ID等资源。要实现这一点，useEffect()函数需返回一个清除函数。

#### 关注点分离

使用Hook其中的一个目的就是要解决class中生命周期函数经常包含不相关的逻辑，但又把相关逻辑分离到了几个不同方法中的问题。Hook允许按照代码的用途分离它们，而不是像生命周期函数那样。React将按照effect声明的顺序依次调用组件中的每个effect。

[![useEffect](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P559_27128.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P559_27128.jpg)

### useLayoutEffect

useLayoutEffect()函数签名与useEffect()类似，但它会在所有的DOM变更之后同步调用effect。可以使用它来读取DOM布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect()内部的更新计划将被同步刷新。

[![useLayoutEffect](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P560_27153.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P560_27153.jpg)

运行上面的组件，单击div按钮，页面会更新一串随机数，当连续单击此按钮时，会发现这串数字在发生抖动。造成抖动原因在于，每次单击div按钮时，count会更新为0(`setCount(0)`)，之后`useEffect()`内又把count改为一串随机数，所以页面会`先渲染成0`，然后`渲染成随机数`，由于更新很快，所以出现了`闪烁`。

接下来将useEffect()改为useLayoutEffect()后闪烁消失了。相比使用useEffect()，当单击div按钮时，count更新为0，此时页面并不会渲染，而是等待`useLayoutEffect()内部状态修改后才会去更新页面`，所以页面不会闪烁。

[![浏览器渲染](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P560_27177.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P560_27177.jpg)

useLayoutEffect()：会在浏览器layout之后，painting(绘制)之前执行。如果需要改变DOM或者DOM需要获取测量数值，除非要修改DOM并且不让用户看到修改DOM的过程，才考虑用它来读取DOM布局并同步触发重渲染，否则应当使用useEffect()。在浏览器执行绘制之前，useLayoutEffect()内部的更新计划将被同步刷新。尽可能使用标准的useEffect()以避免阻塞视图更新。

useEffect()：useEffect()在全部渲染完毕后才会执行。如果根本不需要与DOM交互或者DOM更改是不可观察的，那就用useEffect()。

### useRef

(1)useRef()返回一个可变的ref对象，并且只有current属性，初始值为传入的参数(initialValue)。

(2)返回的ref对象在组件的整个生命周期内保持不变。

(3)当更新current值时并不会渲染，而useState()新值时会触发页面渲染。

(4)更新useRef()是Side Effect（副作用），所以一般写在useEffect()或Event Handler里。

(5)useRef()类似于类组件的this。

[![useRef](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P561_27189.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P561_27189.jpg)

#### 获取子组件属性或方法

综合使用useRef()、forwardRef()、useImperativeHandle()获取子组件数据。

[![获取子组件属性或方法](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T562_27293.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T562_27293.jpg)

子组件：

[![子组件](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P562_27273.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P562_27273.jpg)

父组件：

[![父组件](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P563_27319.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P563_27319.jpg)

#### 使用useRef()获取上一次的值

[![useRef](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P564_27375.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P564_27375.jpg)

useRef()函数在渲染过程中总是返回上一次的值，因为ref.current变化不会触发组件的重新渲染，所以需要等到下次渲染时才能显示到页面上。

#### 使用useRef保存不需要变化的值

因为useRef()的返回值在组件的每次调用render()之后都是同一个，所以它可以用来保存一些在组件整个生命周期都不需要变化的值。最常见的就是定时器的清除场景。

全局变量设置定时器的不足:

[![全局变量定时器](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P564_27387.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P564_27387.jpg)

上面的写法存在一个问题，如果这个App组件里有state变化或者它的父组件重新渲染等原因导致这个App组件重新渲染时会发现，单击“停止”按钮，定时器依然会不断地在控制台输出，这样定时器清除事件就无效了。因为组件重新渲染之后，这里的timer()及clearTimer()方法都会重新创建，所以timer已经不是定时器的变量了

使用useRef优化：

[![useRef](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P565_27437.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P565_27437.jpg)

### useCallback、useMemo与React.memo

React中当组件的props或state变化时，会重新渲染视图，在实际开发中会遇到不必要的渲染场景。

#### 不必要渲染子组件

[![不必要渲染](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P565_27485.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P565_27485.jpg)

子组件中有条console语句，每当子组件被渲染时，都会在控制台看到一条输出信息。当单击父组件中按钮时会修改count变量的值，进而导致父组件重新渲染，此时子组件却没有任何变化(props、state)，但在控制台中仍然可看到子组件被渲染的输出信息。

我们期待的是：当子组件的props和state没有变化时，即便父组件渲染，也不要渲染子组件。

#### React.memo()

为了解决上面的问题，需要修改子组件，用React.memo()包裹一层。这种写法是React的高阶组件写法，将组件作为函数(memo)的参数，函数的返回值(ChildComp)是一个新的组件。

[![React.memo()](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P566_27567.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P566_27567.jpg)

此时再次单击按钮，可以看到控制台没有输出子组件被渲染的信息了。

#### useCallBack()

在上面的例子中，父组件只是简单地调用了子组件，并未给子组件传递任何属性。接下来看一个父组件给子组件传递属性的例子，子组件仍然用React.memo()包裹一层。

[![useCallback()](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P567_27595.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P567_27595.jpg)

父组件在调用子组件时传递了name属性和onClick属性，此时单击父组件的按钮，可以看到控制台中输出了子组件被渲染的信息。

在上面的代码中，子组件通过React.memo()包裹了，但是子组件还是重新渲染了。

分析下原因：

(1)单击父组件按钮，改变了父组件中count变量值（父组件的state值），进而导致父组件重新渲染。

(2)父组件重新渲染时，会重新创建changeName()函数，即传给子组件的onClick属性发生了变化，从而导致子组件重新渲染。只是单击了父组件的按钮，并未对子组件做任何操作，并且不希望子组件的props有变化。

为了解决这个问题，可以使用useCallback()钩子完善代码。首先修改父组件的changeName()方法，用useCallback()钩子函数包裹一层。

[![useCallback()](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P568_27687.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P568_27687.jpg)

上面的代码修改后，此时单击父组件按钮，控制台不会输出子组件被渲染的信息了。

useCallback()起到了`缓存的作用`，即便父组件渲染了，useCallback()包裹的函数也不会重新生成，只会返回上一次的函数引用。

useCallback的第二个参数，是一个dependencies数组，参考useEffcet的第二个参数。

#### useMemo

前面父组件调用子组件时传递的name属性是个字符串，如果换成`传递对象`会怎样？

[![传递属性为对象](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P569_27741.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P569_27741.jpg)

父组件在调用子组件时传递info属性，info的值是个对象字面量，单击父组件按钮时，发现控制台输出子组件被渲染的信息。

分析原因跟调用函数是一样的：当单击父组件按钮时，触发父组件重新渲染；父组件渲染，代码const info={name,age}会`重新生成一个新对象`，导致传递给子组件的`info属性值`变化，进而导致子组件重新渲染。

针对这种情况，可以使用useMemo()对对象属性包裹一层。

[![useMemo](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P569_27784.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P569_27784.jpg)

useMemo()有两个参数：

(1)第1个参数是个函数，返回的对象指向同一个引用，不会创建新对象。

(2)第2个参数是个数组，只有`数组中的变量改变`时，第1个参数的函数才会`返回一个新的对象`。

当再次单击父组件按钮时，控制台中不再输出子组件被渲染的信息了。

### useContext

在Hook诞生之前，React已经有了在组件树中共享数据的解决方案：Context。

在类组件中，可以通过Class.contextType属性获取最近的Context Provider，那么在函数式组件中，该怎么获取呢？

答案就是使用`useContext()`钩子

[![useContext](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P571_27893.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P571_27893.jpg)

useContext()的使用步骤如下。

(1)封装公共上下文对象文件。

[![useContext用法](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P571_27902.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P571_27902.jpg)

(2)在父组件中通过myContext`提供器Provider为子组件提供value数据`。

[![myContext](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P571_27910.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P571_27910.jpg)

(3)在子组件中`导入myContext对象`，使用`useContext()`获取共享数据。

[![子组件共享context](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P572_27998.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P572_27998.jpg)

### useReducer()

useReducer()函数可提供类似Redux的功能，可以理解为轻量级的Redux。useReducer()接收一个reducer()函数作为参数和一个初始化的状态值。

[![useReducer](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P572_28046.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P572_28046.jpg)

去react官网看了一下，这个useReducer其实可以有第三个参数。

```tsx
useReducer(reducer, initialArg, init?)
```

reducer：用于更新 state 的纯函数。参数为 state 和 action，返回值是更新后的 state。state 与 action 可以是任意合法值。

initialArg：用于初始化 state 的任意值。初始值的计算逻辑取决于接下来的 init 参数。

可选参数 init：用于计算初始值的函数。如果存在，使用 init(initialArg) 的执行结果作为初始值，否则使用 initialArg。

useReducer()函数返回一个数组，数组的第一项为状态变量，dispatch是发送事件的方法，用法与Redux是一样的。

reducer()是一个函数，该函数根据动作类型处理状态。

[![reducer](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P573_28057.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P573_28057.jpg)

完整useReducer()用法：
[![useReducer](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P573_28065.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P573_28065.jpg)

在React中，如果你想在使用useReducer时传递额外的参数给dispatch函数以修改state，你可以通过创建一个带有参数的函数，然后将其传递给dispatch。以下是一种方法：

```jsx
import React, { useReducer } from 'react';

// 定义 reducer 函数
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + action.value };
    default:
      return state;
  }
};

const Counter = () => {
  // 初始 state
  const initialState = { count: 0 };

  // 使用 useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // 定义一个函数，用于传递额外的参数给 dispatch
  const incrementCount = (value) => {
    dispatch({ type: 'INCREMENT', value });
  };

  return (
    <div>
      Count: {state.count}
      {/* 调用函数并传递额外的参数 */}
      <button onClick={() => incrementCount(5)}>Increment</button>
    </div>
  );
};

export default Counter;
```

### 自定义Hooks

自定义Hook的主要目的是重用组件中使用的逻辑。构建自己的Hook可以让开发者将组件逻辑提取到可重用的函数中。

自定义Hook是常规的JavaScript函数，可以使用任何其他Hook，只要它们遵循Hook的规则。

此外，自定义Hook的名称必须以单词use开头。

#### useCounter

实现一个计数器应用，它的值可以递增、递减或重置。

[![custom hooks](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P574_28231.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P574_28231.jpg)

使用useCounter:

[![使用useCounter](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P575_28267.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P575_28267.jpg)

通过这种方式可以将App组件的状态及其操作完全提取到useCounter Hook中，管理计数器状态和逻辑现在是自定义Hook的责任。

#### useField

[![useField](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P577_28498.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P577_28498.jpg)

使用useField:

[![使用useField](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P578_28516.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P578_28516.jpg)

简化：

[![简化](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P578_28559.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P578_28559.jpg)

表单中使用：

[![表单中使用useField](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P578_28591.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P578_28591.jpg)

当与同步表单状态有关的恼人的细节被封装在自定义Hook中时，表单的处理就大大简化了。自定义Hook显然不仅是一种可重用的工具，它们还为将代码划分为更小的模块提供了一种更好的方式。

## 二、路由React Router

React Router库是React官方配套的路由模块，目前最新的版本是v6,v6版本和之前的版本比较有了较大的改进。在v6版本的路由中在外层统一配置路由结构，让路由结构更清晰，通过Outlet实现子代路由的渲染，在一定程度上有点类似于Vue中的view-router。

React Router中包含3个不同的模块，每个包都有不同的用途。官方网址为https://reactrouter.com/docs/en/v6/api

[![React Router](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T579_43460.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T579_43460.jpg)

[![React Router模块](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P580_28708.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P580_28708.jpg)

#### 安装

```bash
npm install react-router-dom@6

yarn add react-router-dom@6

pnpm add react-router-dom@6
```

### 路由模式

react-router-dom支持两种模式路由：HashRouter和BrowserRouter。

[![react router](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T580_43464.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T580_43464.jpg)

使用React Router:

[![react router](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P581_28755.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P581_28755.jpg)

v6版本路由采用了Router→Routes→Route结构，路由本质在于Routes组件，当location上下文改变时，Routes重新渲染，重新形成渲染分支，然后通过Provider方式逐层传递Outlet，进行匹配渲染。

[![react router](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T581_43468.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T581_43468.jpg)

为了更好地支持Hook用法，v6版本中提供了路由Hook:

[![react router hook](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T582_29037.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-T582_29037.jpg)

#### 使用

[![react router使用](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P582_28971.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P582_28971.jpg)

[![App.js](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P582_29011.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P582_29011.jpg)

[![Home.jsAbount.js](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P583_29121.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P583_29121.jpg)

### 嵌套路由

嵌套模式路由是一个很重要的概念，当路由被嵌套时，一般认为网页的某一部分保持不变，只有网页的子部分发生变化。

例如，如果访问一个简单的用户管理页面，则始终显示该用户的标题，然后在其下方显示用户的详细信息，但是，当单击修改用户时，用户详情页将替换为用户修改页面。在React Router v5中，必须明确定义嵌套模式路由，React Router v6更加简单。React Router库中的Outlet组件可以为特定路由呈现任何匹配的子元素。首先，从react-router-dom库中导入Outlet，代码如下：

```tsx
import { Outlet } from "react-router-dom";
```

在父组件(User.js)中使用Outlet组件，该组件用来显示匹配子路由的页面。

User.js:

```jsx
function User() {
  return (
    <div>
      <h1>User</h1>
      <Outlet />
    </div>
  )
}
```

定义嵌套模式路由(Route中嵌套Route组件)，在嵌套模式路由中，如果URL仅匹配了父级URL，则Outlet中会显示带有index属性的路由。

[![嵌套路由](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P585_29304.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P585_29304.jpg)

当URL为/user时，User中的Outlet会显示Default组件。

当URL为/user/create时，User中的Outlet会显示NewUser组件。

### 路由参数

下面介绍两种获取路由参数的方式，即获取params参数的方式和获取search参数的方式。

#### param参数

在Route组件的path属性中定义路径参数，在组件内通过useParams钩子访问路径参数。

[![useParam](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P585_29421.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P585_29421.jpg)

#### search参数

和vue router中的query差不多。

查询参数不需要在路由中定义。使用useSearchParams钩子访问查询参数，其用法和useState类似，会返回当前对象和更改它的方法。更改searchParams时，必须传入所有的查询参数，否则会覆盖已有参数。

[![useSearch](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P586_29490.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P586_29490.jpg)

### 编程式路由导航

在React Router v6中，编程式路由导航用`useNavigate`代替`useHistory`，将`history.push()`替换为`navigation()`。

[![编程式路由导航](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P586_29513.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P586_29513.jpg)

### 多个 `<Routes />`

以前只能在React App中使用一个路由，但是现在可以在React App中使用多个路由，这将帮助我们基于不同的路由管理多个应用程序逻辑。

[![多个Routes](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P587_29543.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P587_29543.jpg)

## 三、Redux

随着React开发的组件的结构越来越复杂，深层的组件嵌套和组件树中的状态流动会变得难以控制，跟踪和测试节点的state流动到子节点时产生的变化越发困难。这个时候就需要进行状态管理了。为了解决组件树的状态管理的问题，React推出了Flux数据流管理框架。

Flux本身是一个架构思想，它最重要的概念是单向数据流，是将应用中的state进行统一管理，通过发布／订阅模式进行状态的更新与传递。

[![Flux](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P588_29646.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P588_29646.jpg)

Flux带来一些问题，如一个应用可以拥有多个Store，多个Store之间可能有依赖关系，也可能相互引用，Store封装了数据和处理数据的逻辑。

[![Flux](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P588_29649.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P588_29649.jpg)

目前社区出现了一系列的前端状态管理解决方案，如遵循Flux思想的状态管理方案主要有Redux、Vuex、Zustand及React自带的useReducer+Context。

### Redux介绍

Redux是目前最热门的状态管理库之一，它受到Elm的启发，是从Flux单项数据流架构演变而来的。

Redux的核心基于发布和订阅模式。View订阅了Store的变化，一旦Store状态发生改变就会通知所有的订阅者，View接收到通知之后会进行重新渲染。

[![Redux](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P588_29654.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P588_29654.jpg)

Redux遵循Flux思想，Redux将状态以一个可JSON序列化的对象的形式存储在单个Store中，也就是说Redux将状态集中存储。Redux采用单向数据流的形式，如果要修改Store中的状态，则必须通过Store的dispatch()方法。调用store.dispatch()之后，Store中的rootReducer()会被调用，进而调用所有的Reducer()函数生成一个新的state。

### Redux的基本原则

(1)单一数据源：整个应用的state被储存在一棵对象树中，并且这个对象树只存在于唯一一个Store中。

(2)state是只读的：唯一改变state的方法就是`触发Action`,Action是一个用于描述已发生事件的普通对象。

(3)使用纯函数来执行修改：为了描述Action如何改变状态树，需要编写`Reducer()函数`。

### 核心组成

Redux的核心组成部分包括Action、Reducer、Store。

(1)Action:Action就是一个描述发生什么的对象。

(2)Reducer：形式为(state,action)=>state的纯函数，功能是根据Action修改state并将其转变成下一个state。

(3)Store：用于存储state，可以把它看成一个容器，整个应用只能有一个Store。

Redux应用中所有的state都以一个对象树的形式储存在一个单一的Store中。唯一改变state的办法是触发Action,Action就是一个描述发生什么的对象。为了描述Action如何改变state树，需要编写Reducer()函数。

### Redux基本用法

#### 安装

Redux是通用的状态框架，如果在React中使用Redux，则需要单独安装react-redux插件:

```bash
npm i --save redux
npm i --save react-redux
npm i --save--dev redux-devtools
```

Redux的官方网站为https://github.com/reduxjs/redux和https://redux.js.org/。

#### 创建Store

创建状态管理仓库是Redux的第一步，在Redux的API中提供一个createStore()方法，该方法接收一个reducer和一个可选middleware中间件参数。

如果把Store比作一个仓库，则Reducer就是这个仓库的管理中心，一个仓库可以根据不同的状态类型(state)设置多个不同的状态管理中心(Reducer)，每个Reducer负责根据开发者的业务需求来处理仓库中的原始状态，并返回新的状态。Reducer实际上就是一个处理state的函数，该函数中设置了很多条件，这些条件是开发者根据具体的业务设置的，不同的条件请求处理不同的状态更新。

[![创建store](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P590_29681.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P590_29681.jpg)

#### 提交Action和订阅Store

创建好状态管理仓库后，创建一个React组件，在组件中订阅仓库的状态，组件中通过dispatch()方法给仓库发送事件以便更新仓库状态。

[![使用store](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P590_29695.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P590_29695.jpg)

在上面的代码中，在useEffect()方法中，订阅获取Store中最新的状态，单击按钮，通过store.dispatch({type:'ADD'})将动作类型发送给Store中的Reducer处理，并返回最新的状态。

#### 使用react-redux绑定store

在上面的步骤中，手动订阅了仓库，但是这样比较麻烦，Redux官方提供了一个react-redux库，帮助我们在React中使用Redux。

react-redux提供一个高阶组件Connect,connect()方法接收一个木偶组件（无状态组件）并通过mapStateToProps（把store的状态绑定到木偶组件的props上）和mapDispatchToProps（把dispatch绑定到木偶组件中的props上）把组件和仓库进行绑定，无须开发者进行手动订阅和取消订阅。

首先，需要把ReduxDemo组件改造为木偶组件，将里面的num和单击事件更改为从外部传入props，保证组件是无状态的。

把reduxdemo组件改为木偶组件：

[![木偶组件](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P591_29769.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P591_29769.jpg)

通过Connect高阶组件将上面的组件转换为连接Store的智能组件。mapStateToProps把仓库中的state映射到num上，mapDispatchToProps把onAddClick映射到dispatch()方法上：

[![connect](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P591_29813.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P591_29813.jpg)

修改render入口，需要添加react-redux提供的一个组件`Provider`，通过Provider`属性store`绑定`创建的仓库`:

[![render入口](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P592_29843.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P592_29843.jpg)

### Redux核心对象

#### Action

动作对象，用来描述一个动作，一般包含以下两个属性。

(1)type：标识属性，值为字符串，唯一、必要属性。

(2)data：数据属性，值类型任意，可选属性。

[![action](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P592_29883.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P592_29883.jpg)

#### Action Creators

考虑到对它的复用，Action可以通过生成器(ActionCreators)来创建。其实它就是返回Action对象的函数（自定义的函数）。

[![actionCreators](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P593_29895.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P593_29895.jpg)

#### Reducer

Reducer的本质就是一个纯函数，它用来响应发送过来的Actions，然后经过处理把state发送给Store。在Reducer函数中通过return返回值，这样Store才能接收到数据，Reducer会接收到两个参数，一个是初始化的state，另一个则是发送过来的Action。

[![reducer](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P593_29903.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P593_29903.jpg)

#### combineReducers()

真正开发项目时state涉及很多功能，在一个Reducer中处理所有逻辑会非常混乱，所以需要拆分成多个小Reducer，每个Reducer只处理它管理的那部分state数据，然后再由一个主rootReducers来专门管理这些小Reducer。

Redux提供了一种方法combineReducers()专门来管理这些小Reducer。

[![combineReducers()](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P594_29914.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P594_29914.jpg)

#### Store

Store用于存储应用中所有组件的state状态，也代表着组件状态的数据模型，它提供统一的API方法来对state进行读取、更新、监听等操作。

Store本身是一个对象，在Redux应用中Store具有单一性，并且通过向createStore()函数中传入Reducer来创建Store。其另一个重要作用就是作为连接Action与Reducer的桥梁。

[![store](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P594_29922.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P594_29922.jpg)

### Redux中间件

Redux的中间件(Middleware)遵循了即插即用的设计思想，出现在Action到达Reducer之前的位置。

中间件是一个具有固定模式的独立函数，当把多个中间件像管道那样串联在一起时，前一个中间件不但能将其输出传给下一个中间件作为输入，还能中断整条管道。

在引入中间件后，既能扩展Redux的功能，也能增强dispatch()函数的功能，以适应不同的业务需求，例如通过中间件记录日志、报告奔溃或处理异步请求等。

[![中间件](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P594_29927.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P594_29927.jpg)

#### 中间件接口

在设计中间件函数时，会遵循一个固定的模式，下面的代码使用了柯里化、高阶函数等函数式编程的概念：

[![中间件](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P594_29935.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P594_29935.jpg)

ES6语法：

[![中间件](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P595_29945.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P595_29945.jpg)

middleware()函数接收一个Store实例，返回值是一个接收next参数的函数，其中next也是一个函数，用来将控制权转移给下一个中间件，从而实现中间件之间的串联，它会返回一个处理Action对象的函数。

由于闭包的作用，在这最内层的函数中，依然能调用外层的对象和函数，例如访问Action所携带的数据、执行`Store中的dispatch()或getState()方法`等。

示例中的middleware()函数只是单纯地将接收的action对象`转交`给后面的中间件，而没有对其做额外的处理。

#### 创建一个日志中间件

该中间件，打印组件发送过来的Action，延迟1s，重构一个新的Action交给Reducer处理。

[![日志中间件](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P595_29963.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P595_29963.jpg)

#### 注册中间件

中间件在开发完成以后只有被注册才能在Redux的工作流程中生效，Redux中有个applyMiddleware，其作用是注册中间件。

[![注册中间件](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P595_29984.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P595_29984.jpg)

### Redux中间件（redux-thunk）

如果要在Redux中处理异步请求，则可以借助中间件实现。目前市面上已有很多封装好的中间件可供使用，例如redux-thunk、redux-promise或redux-saga等。redux-thunk是一个非常简单的中间件。

[![redux-thunk](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P596_29996.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P596_29996.jpg)

首先检测Action的类型，如果是函数，就直接调用并将dispatch、getState和extraArgument作为参数传入，否则就调用next参数，转移控制权。redux-thunk其实扩展了dispatch()方法，使其参数既可以是JavaScript对象，也可以是函数。

```bash
npm install redux-thunk --save
```

[![使用redux-thunk](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P596_30022.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P596_30022.jpg)

派发异步事件：

[![派发异步事件](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P597_30050.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P597_30050.jpg)

index.js

[![index.js](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P598_30128.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P598_30128.jpg)

### Redux中间件（redux-saga）

redux-saga是一个用于管理应用程序Side Effect（副作用，如异步获取数据、访问浏览器缓存等）的库，它的目标是让副作用管理更容易，执行更高效，测试更简单，在处理故障时更容易。

[![redux-saga](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P599_30166.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P599_30166.jpg)

redux-saga是一个用于管理Redux应用异步操作的中间件（又称异步Action）。

redux-saga通过创建Saga将所有的异步操作逻辑收集在一个地方集中处理，用来代替redux-thunk中间件。通过redux-saga库来处理副作用相关操作，Redux的各部分的协作更明确：

(1)Reducer负责处理Action的state更新。

(2)Saga负责协调那些复杂或异步的操作。

Saga不同于Thunk,Thunk是在Action被创建时调用，而Saga只会在应用启动时调用，初始启动的Saga可能会动态调用其他Saga,Saga可以被看作在后台运行的进程，Saga监听发起Action，然后决定基于这个Action来做什么：是发起一个异步调用（如一个fetch请求），还是发起其他的Action到Store，甚至是调用其他的Saga。

Saga是通过Generator()函数来创建的，所有的任务都通用Yield Effect来完成。Effect可以看作redux-saga的任务单元，Effects都是简单的JavaScript对象，包含要被Saga Middleware执行的信息，redux-saga为各项任务提供了各种Effect创建器，例如调用一个异步函数，发起一个Action到Store，启动一个后台任务或者等待一个满足某些条件的未来的Action。

内部是使用了yield函数，有点看不懂这部分的内容，gannerator函数用的也比较少，暂时不了解了。

可以参考[redux-saga](https://github.com/redux-saga/redux-saga)。

// TODO

### Redux Toolkit

Redux Toolkit包是Redux的工具集，旨在解决以下问题：

(1)Store的配置复杂。

(2)想让Redux更加好用，不需要安装大量的额外包。

(3)Redux要求写很多模板代码。

#### configureStore

提供简化的配置选项和良好的默认值。它可以自动组合众多的Reducer()，添加用户提供的任何Redux中间件，默认情况下包括redux-thunk（处理异步Action的中间件），并支持使用Redux DevTools扩展。

#### createReducer

创建reducer()的Action映射表而不必编写switch语句。

自动使用`Immer库`让开发者用正常的代码编写更简单的不可变更新，例如state.todos[3].completed=true。

#### createAction

为给定的操作类型字符串生成action Creator()函数。

#### createSlice

为给定的操作类型字符串生成action Creator()函数。

[![createSlice](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P607_30447.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P607_30447.jpg)

#### createAsyncThunk

接收Action字符串和返回Promise的函数，并生成分派的thunk()函数。

#### createEntityAdapter

生成可重用的Reducer和Selector来管理Store中的数据，执行CRUD操作。

#### createSlector

来自Reselect库，被重新导出，用于state缓存，防止不必要的计算。

#### redux-toolkit用法

[![redux-toolkit](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P608_30498.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P608_30498.jpg)

1. 创建一个src/app/store.js文件，从Redux Toolkit里引入configureStore，将从创建和导出一个空的Redux Store开始:

[![redux-toolkit](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P609_30513.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P609_30513.jpg)

2. 一旦Store创建完成，就可以在src/index.js文件中用react-redux提供的`<Provider>`包裹应用，这样就可以在React组件中使用React Store了。具体操作就是先引入刚刚创建的Redux Store，然后用`<Provider>`包裹`<App>`，再将Store作为一个props传入:

[![index.js](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P609_30539.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P609_30539.jpg)

3. 创建一个src/features/counter/counterSlice.js文件，在文件里从Redux Toolkit中引入createSlice API。Slice需要一个Name作为唯一标识，需要有初始化State值，还需要至少一个reducer方法来定义State如何变化。

一旦Slice创建完成就可以导出生成的Redux actioncreators和整个Slice的reducer方法。

Redux需要通过制作数据副本和更新副本来不可变地更新State，然而Redux Toolkit的createSlice和createReducer API内部使用了Immer，这允许可以直接更新逻辑，不必制作副本，它将自动成为正确的不可变更新。

[![redux](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P610_30570.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P610_30570.jpg)

4. 将Slice Reducer()添加进Store

接下来需要引入Counter Slice的`reducer()`方法并把它添加到Store中。通过在reducer()方法中定义一个属性，告诉Store使用这个Slice Reducer()方法去处理所有的state更新。

[![reducer](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P610_30593.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P610_30593.jpg)

5. 在React组件中使用Redux State和Action
   现在可以使用react-redux钩子在React组件中操作ReduxStore。可以使用`useSelector`从Store中读取数据，也可以使用`useDispatch`来派发Action。

使用useSelector()和useDispatch()Hook来替代connect()。

传统的React应用在与Redux进行连接时通过react-redux库的connect()函数来传入mapState()和mapDispatch()函数以便将Redux中的State和Action存储到组件的props中。

react-redux新版已经支持useSelector()和useDispatchHook()，可以使用它们替代connect()的写法。通过它们可以在纯函数式组件中获取Store中的值并监测变化。

创建一个`src/features/counter/Counter.js`文件，并且在其中开发Counter组件，然后在App.js文件中引入这个组件，并且在`<App>`里渲染它。

[![app.js](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P611_30610.jpg)](https://res.weread.qq.com/wrepub/CB_3300054198_Figure-P611_30610.jpg)

## 四、状态管理（Recoil）
不看了，这个react的生态未免有点太`丰富`了吧？😵

在React Europe 2020 Conference上，Facebook内部开源了一种状态管理库Recoil。Recoil是Facebook推出的一个全新的、实验性的JavaScript状态管理库，它解决了使用现有Context API在构建较大应用时所面临的很多问题。

还是大致看了一下，emmmm…… 感觉和pinia的原子化思想一样，然后2020才开源，感觉，唉，前端真的迭代也太快了，总是有更好的解决方法，但是你用redux时，难道没有感觉到很难用吗，额，八股文写完了，又有新的概念出现……

看了这个redux，才知道pinia有多香啊！！！！！

## React Native
毕设用这个写的移动端，当时也没有深入了解，感觉主要是打包到原生的配置比较复杂，暂时不记录了，简单了解一下吧……