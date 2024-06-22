import{_ as t,v as a,b as e,R as o}from"./chunks/framework.caa0fbaf.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"4-读书笔记/4-深入解析CSS/5-附录.md","filePath":"4-读书笔记/4-深入解析CSS/5-附录.md","lastUpdated":1719037263000}'),p={name:"4-读书笔记/4-深入解析CSS/5-附录.md"},r=o('<h2 id="选择器" tabindex="-1">选择器 <a class="header-anchor" href="#选择器" aria-label="Permalink to &quot;选择器&quot;">​</a></h2><h3 id="基础选择器" tabindex="-1">基础选择器 <a class="header-anchor" href="#基础选择器" aria-label="Permalink to &quot;基础选择器&quot;">​</a></h3><p>❑ tagname——类型选择器或者标签选择器。该选择器匹配目标元素的标签名。它的优先级是0,0,1。例如：p、h1、strong。</p><p>❑ .class——类选择器。该选择器匹配class属性中有指定类名的元素。它的优先级是0,1,0。例如：.media、.nav-menu。</p><p>❑ #id——ID选择器。该选择器匹配拥有指定ID属性的元素。它的优先级是1,0,0。例如：#sidebar。</p><p>❑ ＊——通用选择器。该选择器匹配所有元素。它的优先级是0,0,0。</p><h3 id="组合选择器" tabindex="-1">组合选择器 <a class="header-anchor" href="#组合选择器" aria-label="Permalink to &quot;组合选择器&quot;">​</a></h3><p>组合器将多个基础选择器连接起来组成一个复杂选择器。例如，在．nav-menu li选择器中，两个基础选择器之间的空格被称作后代组合器（descendant combinator）。它表示目标元素<code>&lt;li&gt;</code>是一个拥有nav-menu类的元素的后代。后代组合器是最常见的组合器。不过还存在其他几个组合器，它们分别代表了元素的某种特定关系。</p><p>❑ 子组合器（&gt;）——匹配的目标元素是其他元素的直接后代。例如：.parent &gt; .child。</p><p>❑ 相邻兄弟组合器（+）——匹配的目标元素紧跟在其他元素后面。例如：p + h2。</p><p>❑ 通用兄弟组合器（~）——匹配所有跟随在指定元素之后的兄弟元素。注意，它不会选中目标元素之前的兄弟元素。例如：li.active ~li。</p><p>多个基础选择器可以连起来（<code>不使用空格或者其他组合器</code>）组成一个复合（compound）选择器（例如：h1.page-header）。复合选择器选中的元素将匹配其全部基础选择器。例如，.dropdown.is-active能够选中<code>&lt;div class=&quot;dropdown is-active&quot;&gt;</code>，但是无法选中<code>&lt;div class=&quot;dropdown&quot;&gt;</code>。</p><h3 id="伪类选择器" tabindex="-1">伪类选择器 <a class="header-anchor" href="#伪类选择器" aria-label="Permalink to &quot;伪类选择器&quot;">​</a></h3><p>伪类选择器用于选中处于某个特定状态的元素。这种状态可能是由于用户交互，也可能是由于元素相对于其父级或兄弟元素的位置。伪类选择器始终以一个冒号（:）开始。优先级等于一个类选择器（0,1,0）。</p><p>❑ :first-child——匹配的元素是其父元素的第一个子元素。</p><p>❑ :last-child——匹配的元素是其父元素的最后一个子元素。</p><p>❑ :only-child——匹配的元素是其父元素的唯一一个子元素（没有兄弟元素）。</p><p>❑ :nth-child(an+b)——匹配的元素在兄弟元素中间有特定的位置。公式an+b里面的a和b是整数，该公式指定要选中哪个元素。要了解一个公式的工作原理，请从0开始代入n的所有整数值。公式的计算结果指定了目标元素的位置。下表给出了一些例子。</p><p><img src="https://res.weread.qq.com/wrepub/epub_31594821_576" alt="伪类选择器"></p><p>❑ :nth-last-child(an+b)——类似于：nth-child()，但不是从第一个元素往后数，而是从最后一个元素往前数。括号内的公式与：nth-child()里的公式的规则相同。</p><p>❑ :first-of-type——类似于：first-child，但不是根据在全部子元素中的位置查找元素，而是根据拥有相同标签名的子元素中的数字顺序查找第一个元素。</p><p>❑ :last-of-type——匹配每种类型的最后一个子元素。</p><p>❑ :only-of-type——该选择器匹配的元素是满足该类型的唯一一个子元素。</p><p>❑ :nth-of-type(an+b)——根据目标元素在特定类型下的数字顺序以及特定公式选择元素，类似于：nth-child。</p><p>❑ nth-last-of-type(an+b)——根据元素类型以及特定公式选择元素，从其中最后一个元素往前算，类似于：nth-last-child。</p><p>❑ :not(<code>&lt;selector&gt;</code>)——匹配的元素不匹配括号内的选择器。括号内的选择器必须是基础选择器，它只能指定元素本身，无法用于排除祖先元素，同时不允许包含另一个排除选择器。</p><p>❑ :empty——匹配的元素必须没有子元素。注意，如果元素包含空格就无法由该选择器匹配，因为空格在DOM中属于文本节点。写作本书时，W3C正在考虑：blank伪类选择器，它跟：empty的行为类似，但是能选中仅包含空格的元素，目前还没有浏览器支持：blank。</p><p>❑ :focus——匹配通过鼠标点击、触摸屏幕或者按Tab键导航而获得焦点的元素。</p><p>❑ :hover——匹配鼠标指针正悬停在其上方的元素。</p><p>❑ :root——匹配文档根元素。对HTML来说，这是<code>&lt;html&gt;</code>元素，但是CSS还可以应用到XML或者类似于XML的文档上，比如SVG。在这些情况下，该选择器的选择范围更广。还有一些表单域相关的伪类选择器。其中一些是在选择器Level4版本的规范中提出或者修订的，因此在IE10以及其他一些浏览器中不受支持。请在Can I Use网站上查看兼容情况。</p><p>❑ :disabled——匹配已禁用的元素，包括input、select以及button元素。</p><p>❑ :enabled——匹配已启用的元素，即那些能够被激活或者接受焦点的元素。</p><p>❑ :checked——匹配已经针对选定的复选框、单选按钮或选择框选项。</p><p>❑ :invalid——根据输入类型中的定义，匹配有非法输入值的元素。例如，当&lt;inputtype=&quot;email&quot;&gt;的值不是一个合法的邮箱地址时，该元素会被匹配（Level4）。</p><p>❑ :valid——匹配有合法值的元素</p><p>❑ :required——匹配设置了required属性的元素（Level4）。</p><p>❑ :optional——匹配没有设置required属性的元素（Level4）。</p><h3 id="伪元素选择器" tabindex="-1">伪元素选择器 <a class="header-anchor" href="#伪元素选择器" aria-label="Permalink to &quot;伪元素选择器&quot;">​</a></h3><p>伪元素类似于伪类，但是它不匹配特定状态的元素，而是匹配在文档中没有直接对应HTML元素的特定部分。伪元素选择器可能只匹配元素的一部分，甚至向HTML标记中未定义的地方插入内容。</p><p>这些选择器以双冒号（::）开头，尽管大多数浏览器也支持单冒号的语法以便向后兼容。伪元素选择器的优先级与类型选择器（0,0,1）相等。</p><p>❑ ::before——创建一个伪元素，使其成为匹配元素的第一个子元素。该元素默认是行内元素，可用于插入文字、图片或其他形状。必须指定content属性才能让元素出现，例如：.menu::before。</p><p>❑ ::after——创建一个伪元素，使其成为匹配元素的最后一个子元素。该元素默认是行内元素，可用于插入文字、图片或其他形状。必须指定content属性才能让元素出现，例如：.menu::after。</p><p>❑ ::first-letter——用于指定匹配元素的第一个文本字符的样式，例如：h2::first-letter。</p><p>❑ ::first-line——用于指定匹配元素的第一行文本的样式。</p><p>❑ ::selection——用于指定用户使用鼠标高亮选择的任意文本的样式。通常用于改变选中文本的background-color。只有少数属性可以使用，包括color、background-color、cursor、text-decoration。</p><h3 id="属性选择器" tabindex="-1">属性选择器 <a class="header-anchor" href="#属性选择器" aria-label="Permalink to &quot;属性选择器&quot;">​</a></h3><p>属性选择器用于根据HTML属性匹配元素。其优先级与一个类选择器（0,1,0）相等。</p><p>❑ [attr]——匹配的元素拥有指定属性attr，无论属性值是什么，例如：input[disabled]。</p><p>❑ [attr=&quot;value&quot;]——匹配的元素拥有指定属性attr，且属性值等于指定的字符串值，例如：input[type=&quot;radio&quot;]。</p><p>❑ [attr^=&quot;value&quot;]——“开头”属性选择器。该选择器匹配的元素拥有指定属性attr，且属性值的开头是指定的字符串值，例如：a[href^=&quot;https&quot;]。</p><p>❑ [attr$=&quot;value&quot;]——“结尾”属性选择器。该选择器匹配的元素拥有指定属性attr，且属性值的结尾是指定的字符串值，例如：a[href$= &quot;.pdf&quot;]。</p><p>❑ [attr＊=&quot;value&quot;]——“包含”属性选择器。该选择器匹配的元素拥有指定属性attr，且属性值包含指定的字符串值，例如：[class＊=&quot;sprite-&quot;]。</p><p>❑ [attr~=&quot;value&quot;]——“空格分隔的列表”属性选择器。该选择器匹配的元素拥有指定属性attr，且属性值是一个空格分隔的值列表，列表中的某个值等于指定的字符串值，例如：a[rel=&quot;author&quot;]。</p><p>❑ [attr|=&quot;value&quot;]——匹配的元素拥有指定属性attr，且属性值要么等于指定的字符串值，要么以该字符串开头且紧跟着一个连字符（-）。适用于语言属性，因为该属性有时候会指定一种语言的子集（比如墨西哥西班牙语，es-MX，或者普通的西班牙语，es），例如：[lang|=&quot;es&quot;]。</p><h2 id="预处理器" tabindex="-1">预处理器 <a class="header-anchor" href="#预处理器" aria-label="Permalink to &quot;预处理器&quot;">​</a></h2><h3 id="sass" tabindex="-1">SASS <a class="header-anchor" href="#sass" aria-label="Permalink to &quot;SASS&quot;">​</a></h3><h3 id="postcss" tabindex="-1">PostCSS <a class="header-anchor" href="#postcss" aria-label="Permalink to &quot;PostCSS&quot;">​</a></h3>',57),l=[r];function i(n,s,d,c,h,u){return a(),e("div",null,l)}const f=t(p,[["render",i]]);export{b as __pageData,f as default};
