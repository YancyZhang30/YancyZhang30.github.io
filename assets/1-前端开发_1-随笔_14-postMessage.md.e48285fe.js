import{_ as s,v as a,b as n,R as l}from"./chunks/framework.caa0fbaf.js";const C=JSON.parse('{"title":"postMessage","description":"","frontmatter":{},"headers":[],"relativePath":"1-前端开发/1-随笔/14-postMessage.md","filePath":"1-前端开发/1-随笔/14-postMessage.md","lastUpdated":1697361767000}'),p={name:"1-前端开发/1-随笔/14-postMessage.md"},e=l(`<h1 id="postmessage" tabindex="-1">postMessage <a class="header-anchor" href="#postmessage" aria-label="Permalink to &quot;postMessage&quot;">​</a></h1><p>在前端开发中，跨域是一个常见的问题，由于同源策略的限制，浏览器不允许在不同源的页面之间直接进行通信。</p><p>解决跨域问题有多种方式，其中一种常用的方式是使用postMessage。</p><p>postMessage是HTML5引入的一种跨文档通信的机制，可以在不同的窗口或框架之间传递数据，即使这些窗口或框架<code>不属于同一个源</code>。</p><h2 id="发送消息" tabindex="-1">发送消息 <a class="header-anchor" href="#发送消息" aria-label="Permalink to &quot;发送消息&quot;">​</a></h2><p>要发送消息，需要调用postMessage函数，并将消息数据以及目标窗口的源和窗口对象作为参数传递。以下是postMessage函数的语法：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">otherWindow</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">postMessage</span><span style="color:#A6ACCD;">(message</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> targetOrigin</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [transfer])</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>参数说明：</p><ul><li>otherWindow：目标窗口的引用，可以是iframe或window对象。</li><li>message：要发送的数据。可以是任何可以序列化的JavaScript对象。</li><li>targetOrigin：消息的目标源。只有目标窗口与指定的源相同才会接收到消息。可以是字符串“*”，表示发送到所有源的消息。</li><li>transfer：要转移的对象，如Blob和ArrayBuffer。</li></ul><h2 id="接收消息" tabindex="-1">接收消息 <a class="header-anchor" href="#接收消息" aria-label="Permalink to &quot;接收消息&quot;">​</a></h2><p>要接收postMessage发送的消息，您需要添加一个事件侦听器来侦听message事件。以下是添加事件侦听器的语法：</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">message</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> handleMessage</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> [useCapture])</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>参数说明：</p><ul><li>handleMessage：当接收到消息时要调用的函数。</li><li>useCapture：指定事件是否在捕获或冒泡阶段处理。</li></ul><h2 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h2><p>使用postMessage解决跨域问题的基本思路是，在源A的页面中嵌入一个IFrame，该IFrame加载源B的页面。当源A需要向源B发送数据时，它可以通过postMessage方法将数据发送到IFrame，IFrame再将数据发送给源B页面。源B页面接收到数据后，可以对数据进行处理，然后通过postMessage方法将处理结果发送回IFrame，IFrame再将结果发送给源A页面。</p><p>A页面</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> iframe </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">createElement</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">iframe</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">iframe</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">src </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://www.sourceB.com</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">body</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">appendChild</span><span style="color:#A6ACCD;">(iframe)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 发送数据给IFrame</span></span>
<span class="line"><span style="color:#A6ACCD;">iframe</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">contentWindow</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">postMessage</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Hello, IFrame!</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://www.sourceB.com</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 接收来自IFrame的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">message</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">event</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">origin</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://www.sourceB.com</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Received data from IFrame:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><p>B页面</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// 接收来自源A的数据</span></span>
<span class="line"><span style="color:#A6ACCD;">window</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">addEventListener</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">message</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">event</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#F07178;"> (</span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">origin</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">===</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">http://www.sourceA.com</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">) </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">Received data from sourceA:</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 处理数据</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">result</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">data</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">+</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;"> I am from sourceB.</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 发送数据回源A</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">source</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">postMessage</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">result</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">event</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">origin</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>需要注意的是，使用postMessage进行跨域通信时，需要在接收数据的页面中对消息来源进行验证，以避免来自恶意站点的攻击。</p><p>另外，由于postMessage是异步的，不能保证数据的实时性和可靠性，需要谨慎使用。</p><h2 id="注意" tabindex="-1">注意 <a class="header-anchor" href="#注意" aria-label="Permalink to &quot;注意&quot;">​</a></h2><ol><li>不要泄露敏感信息：在发送消息时，不要包含敏感信息，例如密码、用户名等。因为postMessage是一种公开的通信方式，可能会被其他网站窃取。</li><li>避免滥用：在使用postMessage时，需要避免滥用。过多的postMessage通信可能会影响网站的性能，并增加安全风险。</li><li>跨浏览器兼容性：postMessage在不同的浏览器中的实现方式可能有所不同。在使用postMessage时，需要测试兼容性，并提供替代方案。</li><li>避免死循环：在使用postMessage时，需要避免死循环。例如，A网站向B网站发送消息，B网站接收到消息后，又向A网站发送消息，这可能会导致死循环。</li><li>避免被劫持：在使用postMessage时，需要防止被点击劫持攻击。点击劫持攻击是指攻击者利用iframe或其他技术，将目标网站覆盖在一个透明的iframe中，然后诱导用户点击，以达到攻击的目的。为了防止点击劫持攻击，需要在网站中使用X-Frame-Options头，以限制网站在iframe中的显示。</li></ol>`,24),o=[e];function t(r,c,D,F,y,i){return a(),n("div",null,o)}const m=s(p,[["render",t]]);export{C as __pageData,m as default};
