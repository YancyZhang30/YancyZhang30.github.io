# postMessage

在前端开发中，跨域是一个常见的问题，由于同源策略的限制，浏览器不允许在不同源的页面之间直接进行通信。

解决跨域问题有多种方式，其中一种常用的方式是使用postMessage。

postMessage是HTML5引入的一种跨文档通信的机制，可以在不同的窗口或框架之间传递数据，即使这些窗口或框架`不属于同一个源`。

## 发送消息
要发送消息，需要调用postMessage函数，并将消息数据以及目标窗口的源和窗口对象作为参数传递。以下是postMessage函数的语法：

```js
otherWindow.postMessage(message, targetOrigin, [transfer]);
```
参数说明：
- otherWindow：目标窗口的引用，可以是iframe或window对象。
- message：要发送的数据。可以是任何可以序列化的JavaScript对象。
- targetOrigin：消息的目标源。只有目标窗口与指定的源相同才会接收到消息。可以是字符串“*”，表示发送到所有源的消息。
- transfer：要转移的对象，如Blob和ArrayBuffer。

## 接收消息
要接收postMessage发送的消息，您需要添加一个事件侦听器来侦听message事件。以下是添加事件侦听器的语法：
```js
window.addEventListener('message', handleMessage, [useCapture]);
```
参数说明：
- handleMessage：当接收到消息时要调用的函数。
- useCapture：指定事件是否在捕获或冒泡阶段处理。

## 示例
使用postMessage解决跨域问题的基本思路是，在源A的页面中嵌入一个IFrame，该IFrame加载源B的页面。当源A需要向源B发送数据时，它可以通过postMessage方法将数据发送到IFrame，IFrame再将数据发送给源B页面。源B页面接收到数据后，可以对数据进行处理，然后通过postMessage方法将处理结果发送回IFrame，IFrame再将结果发送给源A页面。

A页面
```js
var iframe = document.createElement('iframe');
iframe.src = 'http://www.sourceB.com';
document.body.appendChild(iframe);

// 发送数据给IFrame
iframe.contentWindow.postMessage('Hello, IFrame!', 'http://www.sourceB.com');

// 接收来自IFrame的数据
window.addEventListener('message', function (event) {
  if (event.origin === 'http://www.sourceB.com') {
    console.log('Received data from IFrame:', event.data);
  }
});
```
B页面
```js
// 接收来自源A的数据
window.addEventListener('message', function (event) {
  if (event.origin === 'http://www.sourceA.com') {
    console.log('Received data from sourceA:', event.data);

    // 处理数据
    var result = event.data + ' I am from sourceB.';

    // 发送数据回源A
    event.source.postMessage(result, event.origin);
  }
});
```
需要注意的是，使用postMessage进行跨域通信时，需要在接收数据的页面中对消息来源进行验证，以避免来自恶意站点的攻击。

另外，由于postMessage是异步的，不能保证数据的实时性和可靠性，需要谨慎使用。
## 注意
1. 不要泄露敏感信息：在发送消息时，不要包含敏感信息，例如密码、用户名等。因为postMessage是一种公开的通信方式，可能会被其他网站窃取。
2. 避免滥用：在使用postMessage时，需要避免滥用。过多的postMessage通信可能会影响网站的性能，并增加安全风险。
3. 跨浏览器兼容性：postMessage在不同的浏览器中的实现方式可能有所不同。在使用postMessage时，需要测试兼容性，并提供替代方案。
4. 避免死循环：在使用postMessage时，需要避免死循环。例如，A网站向B网站发送消息，B网站接收到消息后，又向A网站发送消息，这可能会导致死循环。
5. 避免被劫持：在使用postMessage时，需要防止被点击劫持攻击。点击劫持攻击是指攻击者利用iframe或其他技术，将目标网站覆盖在一个透明的iframe中，然后诱导用户点击，以达到攻击的目的。为了防止点击劫持攻击，需要在网站中使用X-Frame-Options头，以限制网站在iframe中的显示。