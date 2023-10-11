# requestAnimationFrame

window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

requestAnimationFrame回调函数执行次数通常是每秒 60 次，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。

为了提高性能和电池寿命，在大多数浏览器里，当 requestAnimationFrame() 运行在后台标签页或者隐藏的 `<iframe>` 里时，requestAnimationFrame() 会被暂停调用以提升性能和电池寿命。

```js
const id = requestAnimationFrame(callback)
```

callback：当你的动画需要更新时，为下一次重绘所调用的函数。该回调函数会传入 DOMHighResTimeStamp 参数，该参数与 performance.now() 的返回值相同，它表示 requestAnimationFrame() 开始执行回调函数的时刻。

:::tip
DOMHighResTimeStamp 是一个 double 类型，用于存储毫秒级的时间值。这种类型可以用来描述离散的时间点或者一段时间（两个离散时间点之间的时间差）。

这种基于毫秒精度的时间，应该精确到 5 微秒级别，其数值的小数部分代表了一个毫秒的小数（也就是微秒）。但是，如果浏览器不能提供精确到 5 微秒的时间值 (例如，由于硬件或软件的限制)，浏览器可以在表示一个以毫秒为单位的时间值时，精确到毫秒级别。

此外，如果用户代理运行所在的设备或操作系统不具备精确到微秒级别的时钟，那么他们只能精确到毫秒。
:::

返回值id一个 long 整数，请求 ID，是回调列表中唯一的标识。是个非零值，没有别的意义。你可以传这个值给 window.cancelAnimationFrame() 以取
消回调函数请求。

```ts
const element = document.getElementById("some-element-you-want-to-animate");
let start, previousTimeStamp;
let done = false;

function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    // 这里使用 Math.min() 确保元素在恰好位于 200px 时停止运动
    const count = Math.min(0.1 * elapsed, 200);
    element.style.transform = `translateX(${count}px)`;
    if (count === 200) done = true;
  }

  if (elapsed < 2000) {
    // 2 秒之后停止动画
    previousTimeStamp = timestamp;
    if (!done) {
      window.requestAnimationFrame(step);
    }
  }
}

window.requestAnimationFrame(step);
```