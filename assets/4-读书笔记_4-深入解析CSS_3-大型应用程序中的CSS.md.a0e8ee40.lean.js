import{_ as e,v as a,b as t,R as r}from"./chunks/framework.caa0fbaf.js";const u=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"4-读书笔记/4-深入解析CSS/3-大型应用程序中的CSS.md","filePath":"4-读书笔记/4-深入解析CSS/3-大型应用程序中的CSS.md","lastUpdated":1719037263000}'),o={name:"4-读书笔记/4-深入解析CSS/3-大型应用程序中的CSS.md"},s=r('<h2 id="模块化css" tabindex="-1">模块化CSS <a class="header-anchor" href="#模块化css" aria-label="Permalink to &quot;模块化CSS&quot;">​</a></h2><p>模块化CSS（Modular CSS）是指把页面分割成不同的组成部分，这些组成部分可以在多种上下文中重复使用，并且互相之间没有依赖关系。最终目的是，当我们修改其中一部分CSS时，不会对其他部分产生意料之外的影响。</p><p>CSS中没有数据和传统函数的概念，但是有选择器及其命中的页面元素。为了达到封装的目的，这些会成为模块的组成部分，并且每个模块都只负责少量的DOM元素的样式。</p><h3 id="基础样式" tabindex="-1">基础样式 <a class="header-anchor" href="#基础样式" aria-label="Permalink to &quot;基础样式&quot;">​</a></h3><p>开始写模块化样式之前，需要先配置好环境。每个样式表的开头都要写一些给整个页面使用的通用规则，模块化CSS也不例外。这些规则通常被称为基础样式，其他的样式是构建在这些基础样式之上的。基础样式本身并不是模块化的，但它会为后面编写模块化样式打好基础。</p><blockquote><p>这里推荐一个叫作normalize.css的库，这个小样式表可以协助消除不同的客户端浏览器渲染上的不一致。可以从<a href="https://necolas.github.io/normalize.css/" target="_blank" rel="noreferrer">https://necolas.github.io/normalize.css/</a> 下载该库，然后添加到自己的样式表前面作为基础样式的一部分。</p></blockquote><p>通过定义一个以模块名称开头的新类名来创建一个修饰符。</p><p>例如，消息模块的error修饰符应该叫作message-error。通过包含模块名称，可以清楚地表明这个类属于消息模块。</p><blockquote><p>常用的写法是使用两个连字符来表示修饰符，比如message--error。</p></blockquote><p><img src="https://res.weread.qq.com/wrepub/epub_31594821_338" alt="css模块"></p><h3 id="工具类" tabindex="-1">工具类 <a class="header-anchor" href="#工具类" aria-label="Permalink to &quot;工具类&quot;">​</a></h3><p>有时候，我们需要用一个类来对元素做一件简单明确的事，比如让文字居中、让元素左浮动，或者清除浮动。这样的类被称为工具类（utility class）。</p><p><img src="https://res.weread.qq.com/wrepub/epub_31594821_353" alt="工具类"></p><p>这里用到了两次！important。工具类是唯一应该使用important注释的地方。</p><p>事实上，工具类应该优先使用它。这样的话，不管在哪里用到工具类，都可以生效。我敢肯定，任何时候为元素添加text-center类，都是想让文本居中，不想让其他样式覆盖它。用了important注释就可以确保这一点。</p><h2 id="模式库" tabindex="-1">模式库 <a class="header-anchor" href="#模式库" aria-label="Permalink to &quot;模式库&quot;">​</a></h2><p>因为模块是可复用的，所以我们在编写页面里相关部分的时候，就不需要向样式表里添加新样式了。不同于以往的先写HTML再写样式，只需要使用这些已经存在的模块，组装在一起，就可以生成一个新页面。项目进行得越深入，我们需要写的新CSS就越少。这时候我们需要关注的就不是新CSS，而是样式表里所有可用的模块清单了。</p><p>把模块清单整合成<code>一组文档</code>，在大型项目中已经成为通用做法。这组文档被称为<code>模式库（pattern library）</code>或者<code>样式指南（style guide）</code>。模式库不是网站或者应用程序的一部分，它是单独的一组HTML页面，用来展示每个CSS模块。模式库是你和你的团队在建站的时候使用的一个开发工具。</p><p>// TODO</p>',19),p=[s];function c(i,l,n,d,S,h){return a(),t("div",null,p)}const m=e(o,[["render",c]]);export{u as __pageData,m as default};
