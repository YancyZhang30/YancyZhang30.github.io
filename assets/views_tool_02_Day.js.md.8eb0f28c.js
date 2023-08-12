import{_ as s,v as a,b as n,R as l}from"./chunks/framework.caa0fbaf.js";const C=JSON.parse('{"title":"Dayjs","description":"","frontmatter":{},"headers":[{"level":1,"title":"Dayjs","slug":"dayjs","link":"#dayjs","children":[{"level":2,"title":"安装&使用","slug":"安装-使用","link":"#安装-使用","children":[]},{"level":2,"title":"格式化","slug":"格式化","link":"#格式化","children":[]},{"level":2,"title":"取值/赋值","slug":"取值-赋值","link":"#取值-赋值","children":[{"level":3,"title":"秒","slug":"秒","link":"#秒","children":[]},{"level":3,"title":"分钟","slug":"分钟","link":"#分钟","children":[]},{"level":3,"title":"小时","slug":"小时","link":"#小时","children":[]},{"level":3,"title":"天","slug":"天","link":"#天","children":[]},{"level":3,"title":"星期","slug":"星期","link":"#星期","children":[]},{"level":3,"title":"月","slug":"月","link":"#月","children":[]},{"level":3,"title":"年","slug":"年","link":"#年","children":[]}]},{"level":2,"title":"比较","slug":"比较","link":"#比较","children":[{"level":3,"title":"时间差","slug":"时间差","link":"#时间差","children":[]},{"level":3,"title":"是否之前/后","slug":"是否之前-后","link":"#是否之前-后","children":[]}]}]}],"relativePath":"views/tool/02_Day.js.md","filePath":"views/tool/02_Day.js.md","lastUpdated":1691830962000}'),p={name:"views/tool/02_Day.js.md"},e=l(`<h1 id="dayjs" tabindex="-1">Dayjs <a class="header-anchor" href="#dayjs" aria-label="Permalink to &quot;Dayjs&quot;">​</a></h1><h2 id="安装-使用" tabindex="-1">安装&amp;使用 <a class="header-anchor" href="#安装-使用" aria-label="Permalink to &quot;安装&amp;使用&quot;">​</a></h2><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">dayjs</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> dayjs </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">dayjs</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">())</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="格式化" tabindex="-1">格式化 <a class="header-anchor" href="#格式化" aria-label="Permalink to &quot;格式化&quot;">​</a></h2><p>Day.js对象是不可变的，也就是说，以某种方式改变Day.js对象的所有API操作都将返回它的一个新实例。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> now </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>等同于 dayjs(new Date()) 的调用，获取当前时间。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 默认返回的是 ISO8601 格式字符串 &#39;2020-04-02T08:02:17-05:00&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2019-01-25</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// &#39;YYYYescape 2019-01-25T00:00:00-02:00Z&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2019-01-25</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">DD/MM/YYYY</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// &#39;25/01/2019&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">format</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">YYYY-MM-DD HH:mm:ss</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 2019-01-25 00:00:00</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>HH代表24小时格式得消失，hh代表12小时格式的小时。</p></div><h2 id="取值-赋值" tabindex="-1">取值/赋值 <a class="header-anchor" href="#取值-赋值" aria-label="Permalink to &quot;取值/赋值&quot;">​</a></h2><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">second</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">30</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">valueOf</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// =&gt; new Date().setSeconds(30)</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">second</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// =&gt; new Date().getSeconds()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="秒" tabindex="-1">秒 <a class="header-anchor" href="#秒" aria-label="Permalink to &quot;秒&quot;">​</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#676E95;font-style:italic;">// dayjs().millisecond()</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">millisecond</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">millisecond</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// dayjs().millisecond()</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">second</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">30</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">valueOf</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// =&gt; new Date().setSeconds(30)</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">second</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// =&gt; new Date().getSeconds()</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="分钟" tabindex="-1">分钟 <a class="header-anchor" href="#分钟" aria-label="Permalink to &quot;分钟&quot;">​</a></h3><p>传入0到59的数字。 如果超出这个范围，它会进位到小时。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">minute</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">minute</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">59</span><span style="color:#A6ACCD;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="小时" tabindex="-1">小时 <a class="header-anchor" href="#小时" aria-label="Permalink to &quot;小时&quot;">​</a></h3><p>传入0到23的数字。 如果超出这个范围，它会进位到天数。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hour</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">hour</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">12</span><span style="color:#A6ACCD;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="天" tabindex="-1">天 <a class="header-anchor" href="#天" aria-label="Permalink to &quot;天&quot;">​</a></h3><p>接受1到31的数字。 如果超出这个范围，它会进位到月份。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">date</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">date</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="星期" tabindex="-1">星期 <a class="header-anchor" href="#星期" aria-label="Permalink to &quot;星期&quot;">​</a></h3><p>传入 number 从0(星期天)到6(星期六)。 如果超出这个范围，它会进位到其他周。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">day</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">day</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="月" tabindex="-1">月 <a class="header-anchor" href="#月" aria-label="Permalink to &quot;月&quot;">​</a></h3><p>获取或设置月份。</p><p>传入0到11的 number。 如果超出这个范围，它会进位到年份。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">month</span><span style="color:#A6ACCD;">()</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">month</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="年" tabindex="-1">年 <a class="header-anchor" href="#年" aria-label="Permalink to &quot;年&quot;">​</a></h3><p>获取或设置年份里第几天。</p><p>传入1到366的数字。</p><p>如果超出这个范围，它会进位到下一年。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">dayjs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">extend</span><span style="color:#A6ACCD;">(dayOfYear)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2010-01-01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dayOfYear</span><span style="color:#A6ACCD;">() </span><span style="color:#676E95;font-style:italic;">// 1</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2010-01-01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">dayOfYear</span><span style="color:#A6ACCD;">(</span><span style="color:#F78C6C;">365</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 2010-12-31</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="比较" tabindex="-1">比较 <a class="header-anchor" href="#比较" aria-label="Permalink to &quot;比较&quot;">​</a></h2><h3 id="时间差" tabindex="-1">时间差 <a class="header-anchor" href="#时间差" aria-label="Permalink to &quot;时间差&quot;">​</a></h3><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight has-diff"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> date1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2019-01-25</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> date2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2018-06-05</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">date1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">diff</span><span style="color:#A6ACCD;">(date2) </span><span style="color:#676E95;font-style:italic;">// 20214000000 默认单位是毫秒</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">date1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">diff</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2018-06-05</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">month</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 7</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">date1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">diff</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2018-06-05</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">month</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FF9CAC;">true</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">// 7.645161290322581</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><ul><li>week w 周</li><li>day d 星期(星期日0，星期六6)</li><li>month M 月份(0-11)</li><li>quarter Q 季度，依赖 QuarterOfYear 插件</li><li>year y 年</li><li>hour h 小时</li><li>minute m 分钟</li><li>second s 秒</li><li>millisecond ms 毫秒</li></ul><h3 id="是否之前-后" tabindex="-1">是否之前/后 <a class="header-anchor" href="#是否之前-后" aria-label="Permalink to &quot;是否之前/后&quot;">​</a></h3><p>这表示 Day.js 对象是否在另一个提供的日期时间之前。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isBefore</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2011-01-01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span><span style="color:#676E95;font-style:italic;">// 默认毫秒</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isBefore</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2011-01-01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">year</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#676E95;font-style:italic;">// 毫秒以外的单位</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>是否之后。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isAfter</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2011-01-01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;font-style:italic;">// 默认毫秒</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isAfter</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2011-01-01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">year</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>是否相同。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isSame</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2011-01-01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;font-style:italic;">// 默认毫秒</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isSame</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2011-01-01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">year</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">) </span><span style="color:#676E95;font-style:italic;">//同理</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>相同或之前/后。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isSameOrBefore</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2011-01-01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;font-style:italic;">// 默认毫秒</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isSameOrBefore</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2011-01-01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">year</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isSameOrAfter</span><span style="color:#A6ACCD;">(</span><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2011-01-01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)) </span><span style="color:#676E95;font-style:italic;">// 默认毫秒</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>是否两者之间。</p><div class="language-js line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">dayjs</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">extend</span><span style="color:#A6ACCD;">(isBetween)</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2010-10-20</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isBetween</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2010-10-19</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2010-10-25</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">))</span></span>
<span class="line"><span style="color:#82AAFF;">dayjs</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">isBetween</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2010-10-19</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2010-10-25</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">year</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,50),o=[e];function t(r,c,i,y,A,D){return a(),n("div",null,o)}const d=s(p,[["render",t]]);export{C as __pageData,d as default};