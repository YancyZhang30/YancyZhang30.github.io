## 层叠
CSS层叠规则指的是当多个CSS规则应用于同一元素时，决定哪些规则将被应用的一套规则。这些规则按优先级排序，通常从高到低包括以下几个方面：

1. 重要性（Importance）：通过!important声明的样式具有最高优先级，会覆盖其他样式。

2. 特殊性（Specificity）：指选择器的具体程度。通常来说，ID选择器的特殊性大于类选择器和标签选择器的特殊性，而内联样式的特殊性最大。

3. 源代码次序（Source Order）：如果两条规则具有相同的重要性和特殊性，则最后出现的规则将会覆盖之前的规则。

通过理解这些层叠规则，开发人员可以更好地控制各种样式规则的应用顺序，确保所期望的样式能够正确地被应用到页面元素上。

叠加计算：
 0 0 0 0
四位分别代表：!important、ID选择器、类选择器、标签选择器

行内样式和!important都具有最高优先级，但是!important的优先级比行内样式更高，因此!important声明的样式会覆盖行内样式。
## 继承
如果一个元素的某个属性没有层叠值，则可能会继承某个祖先元素的值。

比如通常会给`<body>`元素加上font-family，里面的所有祖先元素都会继承这个字体，就不必给页面的每个元素明确指定字体了。

但不是所有的属性都能被继承。默认情况下，只有特定的一些属性能被继承，通常是我们希望被继承的那些。它们主要是跟`文本相关`的属性：color、font、font-family、font-size、font-weight、font-variant、font-style、line-height、letter-spacing、text-align、text-indent、text-transform、white-space以及word-spacing。

还有一些其他的属性也可以被继承，比如列表属性：list-style、list-style-type、list-style-position以及list-style-image。表格的边框属性border-collapse和border-spacing也能被继承。注意，这些属性控制的是表格的边框行为，而不是常用于指定非表格元素边框的属性。（恐怕没人希望将一个`<div>`的边框传递到每一个后代元素。）

### 特殊值
我们想用继承代替一个层叠值。这时候可以用inherit关键字。可以用它来覆盖另一个值，这样该元素就会继承其父元素的值。

有时，你需要撤销作用于某个元素的样式。这可以用initial关键字来实现。每一个CSS属性都有初始（默认）值。如果将initial值赋给某个属性，那么就会有效地将其重置为默认值，这种操作相当于硬复位了该值。

但是要注意，auto不是所有属性的默认值，对很多属性来说甚至不是合法的值。比如border-width: auto和padding: auto是非法的，因此不会生效。可以花点时间研究一下这些属性的初始值，不过使用initial更简单。

> 说明声明display: initial等价于display: inline。不管应用于哪种类型的元素，它都不会等于display: block。这是因为initial重置为`属性的初始值`，而不是`元素的初始值`。inline才是display属性的初始值。

以下是一些常见CSS属性的默认值：

- display: 默认值为inline（行内元素的默认显示方式）或block（块级元素的默认显示方式）。
- position: 默认值为static。
- color: 默认值为继承自父元素的颜色，通常为黑色。
- font-size: 默认值通常为浏览器的默认设置，一般为16px。
- margin和padding: 默认值为0。
- text-align: 默认值为left。
- float: 默认值为none。
- border: 默认值为medium none color（宽度为medium、无样式、颜色为继承自父元素的颜色）

## 属性简写
上、右、左、下
上下、左右
上、左右、下

通常情况下，建议按照以下顺序书写`<a>`标签的伪类：

1. 链接未被访问前的状态（:link）
2. 链接已被访问后的状态（:visited）
3. 鼠标悬停在链接上时的状态（:hover）
4. 链接获得焦点时的状态（:focus）
5. 链接被激活时的状态（:active）

## 相对单位

rem是相对于html元素的字体大小的，而em是相对于父元素的字体大小的。

❑vh：视口高度的1/100。
❑ vw：视口宽度的1/100。
❑ vmin：视口宽、高中较小的一方的1/100（IE9中叫vm，而不是vmin）。
❑ vmax：视口宽、高中较大的一方的1/100（本书写作时IE和Edge均不支持vmax）。


## CSS变量

```css
:root {
  --main-font: 'Noto Sans SC', sans-serif;
}


p {
  font-family: var(--main-font);
}
```
这个代码清单定义了一个名叫--main-font的变量。将其值设置为一些常见的sans-serif字体。变量名前面必须有两个连字符（--），用来跟CSS属性区分，剩下的部分可以随意命名。

var()函数接受第二个参数，它指定了备用值。如果第一个参数指定的变量未定义，那么就会使用第二个值。

```css
p {
  font-family: var(--main-font, 'Noto Sans SC', sans-serif);
}
```
如果var()函数算出来的是一个非法值，对应的属性就会设置为其初始值。

### 动态修改CSS变量
```css
.dark {
  --font-color: #fff;
  --bg-color: #333;
}

.light {
  --font-color: #333;
  --bg-color: #fff;
}
```
通过修改类名来实现动态修改CSS变量。

还可以通过JavaScript修改css变量。
```js
var rootElement = document.documentElement;
rootElement.style.setProperty('--font-color', 'red');
```
利用这种技术，就可以用JavaScript实时切换网站主题，或者在网页中突出显示某些元素，或者实时改变任意多个元素。只需要几行JavaScript代码，就可以进行更改，从而影响网页上的大量元素。

## 盒模型

默认盒模型：box-sizing: content-box;
![盒模型](https://res.weread.qq.com/wrepub/epub_31594821_103)

当给一个元素设置宽或高的时候，指定的是内容的宽或高，所有内边距、边框、外边距都是追加到该宽度上的。

box-sizing的默认值为content-box，这意味任何指定的宽或高都只会设置内容盒子的大小。将box-sizing设置为`border-box`后，height和width属性会设置内容、内边距以及`边框的大小`总和，这刚好符合示例的要求。
![border-box](https://res.weread.qq.com/wrepub/epub_31594821_104)

### 溢出控制
用overflow属性可以控制溢出内容的行为，该属性支持以下4个值。

❑ visible（默认值）——所有内容可见，即使溢出容器边缘。

❑ hidden——溢出容器内边距边缘的内容被裁剪，无法看见。

❑ scroll——容器出现滚动条，用户可以通过滚动查看剩余内容。在一些操作系统上，会出现水平和垂直两种滚动条，即使所有内容都可见（不溢出）。不过，在这种情况下，滚动条不可滚动（置灰）。

❑ auto——只有内容溢出时容器才会出现滚动条。

![overflow](https://res.weread.qq.com/wrepub/epub_31594821_114)


### 为什么vertical-align不生效

> 如果开发人员期望给块级元素设置vertical-align: middle后，块级元素里的内容就能垂直居中，那么他们通常会失望，因为浏览器会忽略这个声明。vertical-align声明只会影响行内元素或者table-cell元素。对于行内元素，它控制着该元素跟同一行内其他元素之间的对齐关系。比如，可以用它控制一个行内的图片跟相邻的文字对齐。

### 水平垂直居中方案
1. flex布局
```css
display: flex;
align-items: center;
justify-content: center;
```
2. margin
```css
margin: 0 auto;
```

3. 绝对定位
```css
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```
4. grid布局
```css
display: grid;
place-items: center;
```

### 负外边距
不同于内边距和边框宽度，外边距可以设置为负值。负外边距有一些特殊用途，比如让元素重叠或者拉伸到比容器还宽。

![负外边距](https://res.weread.qq.com/wrepub/epub_31594821_124)

### 外边距折叠
当顶部和/或底部的外边距相邻时，就会重叠，产生单个外边距。这种现象被称作折叠。

即使两个元素`不是相邻的兄弟节点`也会产生外边距折叠。即使将这个段落用一个额外的div包裹起来。

总之，所有相邻的顶部和底部外边距会折叠到一起。如果在页面中添加一个空的、无样式的div（没有高度、边框和内边距），它自己的顶部和底部外边距就会折叠。

> 只有上下外边距会产生折叠，左右外边距不会折叠。

如何防止外边距折叠？

❑ 对容器使用overflow: auto（或者非visible的值），防止内部元素的外边距跟容器外部的外边距折叠。这种方式副作用最小。

❑ 在两个外边距之间加上边框或者内边距，防止它们折叠。

❑ 如果容器为浮动元素、内联块、绝对定位或固定定位时，外边距不会在它外面折叠。

❑ 当使用Flexbox布局时，弹性布局内的元素之间不会发生外边距折叠。

❑ 当元素显示为table-cell时不具备外边距属性，因此它们不会折叠。此外还有table-row和大部分其他表格显示类型，但不包括table、table-inline、table-caption。

