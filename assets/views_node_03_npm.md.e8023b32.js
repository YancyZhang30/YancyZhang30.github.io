import{_ as e,v as a,b as l,R as n}from"./chunks/framework.caa0fbaf.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"简介","slug":"简介","link":"#简介","children":[]},{"level":2,"title":"安装配置","slug":"安装配置","link":"#安装配置","children":[]},{"level":2,"title":"nrm","slug":"nrm","link":"#nrm","children":[]},{"level":2,"title":"常用命令","slug":"常用命令","link":"#常用命令","children":[{"level":3,"title":"项目初始化和配置","slug":"项目初始化和配置","link":"#项目初始化和配置","children":[]},{"level":3,"title":"包安装和卸载","slug":"包安装和卸载","link":"#包安装和卸载","children":[]},{"level":3,"title":"脚本执行","slug":"脚本执行","link":"#脚本执行","children":[]},{"level":3,"title":"包发布和管理","slug":"包发布和管理","link":"#包发布和管理","children":[]},{"level":3,"title":"安装源管理和配置","slug":"安装源管理和配置","link":"#安装源管理和配置","children":[]},{"level":3,"title":"其他常用命令","slug":"其他常用命令","link":"#其他常用命令","children":[]}]},{"level":2,"title":"package.json","slug":"package-json","link":"#package-json","children":[{"level":3,"title":"常见字段","slug":"常见字段","link":"#常见字段","children":[]},{"level":3,"title":"依赖版本","slug":"依赖版本","link":"#依赖版本","children":[]},{"level":3,"title":"package-lock.json","slug":"package-lock-json","link":"#package-lock-json","children":[]}]}],"relativePath":"views/node/03_npm.md","filePath":"views/node/03_npm.md","lastUpdated":1691317825000}'),o={name:"views/node/03_npm.md"},i=n(`<h2 id="简介" tabindex="-1">简介 <a class="header-anchor" href="#简介" aria-label="Permalink to &quot;简介&quot;">​</a></h2><p>npm 最初它只是被称为 Node Package Manager，用来作为Node.js的包管理器。</p><p>但是随着其它构建工具(webpack、browserify)的发展，npm已经变成了 &quot;the package manager for JavaScript&quot;，它用来安装、管理和分享JavaScript包，同时会自动处理多个包之间的依赖。</p><h2 id="安装配置" tabindex="-1">安装配置 <a class="header-anchor" href="#安装配置" aria-label="Permalink to &quot;安装配置&quot;">​</a></h2><p>新版的nodejs已经集成了npm，所以不需要额外的手动安装npm。</p><p>默认npm时使用的国外的服务器地址，所以下载包可能会非常慢，我们可以修改镜像地址为国内的。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm config set registry https://registry.npm.taobao.org/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>或者临时使用：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install --registry=https://registry.npm.taobao.org/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="nrm" tabindex="-1">nrm <a class="header-anchor" href="#nrm" aria-label="Permalink to &quot;nrm&quot;">​</a></h2><p>可以使用nrm管理npm的registry镜像地址。</p><p>nrm是一个Node.js的npm镜像源管理工具，可以帮助开发者快速切换和管理npm的镜像源。</p><ol><li><p>安装nrm：使用npm全局安装nrm工具。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">npm install -g nrm</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>查看可用的镜像源列表：执行以下命令查看当前可用的镜像源列表。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">nrm ls</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>切换镜像源：使用以下命令切换到指定的镜像源。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">nrm use &lt;registry&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其中，<code>&lt;registry&gt;</code>为要切换的镜像源名称，比如<code>nrm use taobao</code>。</p></li><li><p>添加自定义的镜像源：如果需要添加自定义的镜像源，可以使用以下命令进行添加。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">nrm add &lt;registry&gt; &lt;registry_url&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其中，<code>&lt;registry&gt;</code>为要添加的镜像源的名称，<code>&lt;registry_url&gt;</code>为镜像源的URL地址。</p></li><li><p>删除已有的镜像源：如果需要删除已有的镜像源，可以使用以下命令进行删除。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">nrm del &lt;registry&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其中，<code>&lt;registry&gt;</code>为要删除的镜像源的名称。</p></li><li><p>测试镜像源的响应时间：执行以下命令可以测试各个镜像源的响应时间。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">nrm test</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>显示当前正在使用的镜像源：执行以下命令可以显示当前正在使用的镜像源。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">nrm current</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ol><p>或者项目根目录下的<code>.npmrc</code>文件并添加 <code>registry = https://registry.npm.taobao.org</code>，比系统配置优先级更高。</p><h2 id="常用命令" tabindex="-1">常用命令 <a class="header-anchor" href="#常用命令" aria-label="Permalink to &quot;常用命令&quot;">​</a></h2><h3 id="项目初始化和配置" tabindex="-1">项目初始化和配置 <a class="header-anchor" href="#项目初始化和配置" aria-label="Permalink to &quot;项目初始化和配置&quot;">​</a></h3><ul><li><code>npm init</code>: 初始化一个新的npm包，创建并配置<code>package.json</code>文件。</li><li><code>npm set</code>: 设置npm配置变量的值。</li><li><code>npm get</code>: 获取当前npm配置变量的值。</li><li><code>npm config</code>: 配置管理命令。</li><li><code>npm prune</code>: 移除<code>package.json</code>文件中未列出的依赖。</li></ul><h3 id="包安装和卸载" tabindex="-1">包安装和卸载 <a class="header-anchor" href="#包安装和卸载" aria-label="Permalink to &quot;包安装和卸载&quot;">​</a></h3><ul><li><code>npm install</code>: 安装项目所需的依赖包，根据<code>package.json</code>中的<code>dependencies</code>字段进行安装。</li><li><code>npm install &lt;package&gt;</code>: 安装指定的包，可以通过包名或URL来指定。</li><li><code>npm uninstall &lt;package&gt;</code>: 卸载指定的包。</li><li><code>npm update</code>: 更新项目的依赖包。</li><li><code>npm outdated</code>: 检查存在过时的依赖包。</li><li><code>npm ls</code>: 查看已安装的包及其依赖关系树。</li></ul><h3 id="脚本执行" tabindex="-1">脚本执行 <a class="header-anchor" href="#脚本执行" aria-label="Permalink to &quot;脚本执行&quot;">​</a></h3><ul><li><code>npm run</code>: 运行在<code>package.json</code>中定义的脚本命令。</li><li><code>npm test</code>: 运行在<code>package.json</code>中定义的测试命令。</li><li><code>npm start</code>: 运行在<code>package.json</code>中定义的启动命令。</li><li><code>npm stop</code>: 停止运行在<code>package.json</code>中定义的服务。</li></ul><h3 id="包发布和管理" tabindex="-1">包发布和管理 <a class="header-anchor" href="#包发布和管理" aria-label="Permalink to &quot;包发布和管理&quot;">​</a></h3><ul><li><code>npm publish</code>: 将项目发布到npm仓库，供其他人使用。</li><li><code>npm unpublish</code>: 从npm仓库撤销已发布的包。</li><li><code>npm version</code>: 更新项目的版本号，并自动生成对应的git标签。</li><li><code>npm deprecate</code>: 发布更新的版本时，声明当前版本已过时。</li><li><code>npm owner</code>: 管理包的所有者。</li></ul><h3 id="安装源管理和配置" tabindex="-1">安装源管理和配置 <a class="header-anchor" href="#安装源管理和配置" aria-label="Permalink to &quot;安装源管理和配置&quot;">​</a></h3><ul><li><code>npm config</code>: 配置管理命令，用于设置npm的配置。</li><li><code>npm adduser</code>: 添加用户身份以发布和维护包。</li><li><code>npm whoami</code>: 显示当前登录的用户信息。</li><li><code>npm logout</code>: 注销当前用户。</li><li><code>npm adduser</code>: 添加用户身份。</li><li><code>npm token</code>: 创建、列出和撤销访问令牌。</li><li><code>npm install &lt;package&gt; --registry &lt;registry&gt;</code>: 通过指定镜像源地址来安装包。</li></ul><h3 id="其他常用命令" tabindex="-1">其他常用命令 <a class="header-anchor" href="#其他常用命令" aria-label="Permalink to &quot;其他常用命令&quot;">​</a></h3><ul><li><code>npm search &lt;keyword&gt;</code>: 搜索与关键字匹配的npm包。</li><li><code>npm docs &lt;package&gt;</code>: 打开指定包的文档。</li><li><code>npm view &lt;package&gt;</code>: 查看指定包的详细信息。</li><li><code>npm init &lt;preset&gt;</code>: 使用预设值初始化项目<code>package.json</code>文件。</li><li><code>npm rebuild</code>: 重新构建已安装的包。</li></ul><h2 id="package-json" tabindex="-1">package.json <a class="header-anchor" href="#package-json" aria-label="Permalink to &quot;package.json&quot;">​</a></h2><p><code>package.json</code>是一个存储项目元数据的文件，位于项目的根目录下。它是使用npm初始化项目时自动生成的，并在项目开发过程中逐步被填充和更新。</p><h3 id="常见字段" tabindex="-1">常见字段 <a class="header-anchor" href="#常见字段" aria-label="Permalink to &quot;常见字段&quot;">​</a></h3><p>下面是<code>package.json</code>文件中常见的字段：</p><ol><li><code>name</code>：项目的名称。必须唯一，且符合npm包名的命名规则。</li><li><code>version</code>：项目的版本号。采用语义化版本控制（Semantic Versioning）规范，格式为<code>major.minor.patch</code>。</li><li><code>description</code>：项目的描述信息。简要介绍项目的功能、特点等。</li><li><code>main</code>：指定项目的入口文件。当其他人引入该包时，默认加载的文件路径。</li><li><code>keywords</code>：关键字数组，用于描述和搜索项目的标签。</li><li><code>author</code>：项目的作者信息。</li><li><code>contributors</code>：项目的贡献者列表。</li><li><code>license</code>：项目的许可证信息。明确说明项目的开源许可协议。</li><li><code>dependencies</code>：项目所依赖的==生产环境==包列表，以包名和版本号的形式列出。</li><li><code>devDependencies</code>：项目所依赖的==开发环境==包列表，只在开发和构建过程中使用。</li><li><code>scripts</code>：定义一系列可以通过<code>npm run</code>执行的脚本命令。</li><li><code>repository</code>：项目的代码托管仓库信息。</li><li><code>bugs</code>：项目的错误报告地址。</li><li><code>homepage</code>：项目的主页地址。</li><li>其他自定义字段：您可以在<code>package.json</code>中添加自定义字段，用于存储其他与项目相关的信息。</li></ol><p><code>package.json</code>文件对于管理和构建项目非常重要，在开发过程中，您可以使用npm命令来安装、更新和删除依赖包，运行脚本命令等。同时，通过<code>npm init</code>命令可以初始化一个新的<code>package.json</code>文件，也可以手动编辑<code>package.json</code>文件来添加或修改其中的字段信息。</p><h3 id="依赖版本" tabindex="-1">依赖版本 <a class="header-anchor" href="#依赖版本" aria-label="Permalink to &quot;依赖版本&quot;">​</a></h3><p>在<code>package.json</code>文件中，依赖版本号采用语义化版本控制（Semantic Versioning）规范。该规范定义了三个基本的版本号：主版本号（major）、次版本号（minor）和修订版本号（patch），它们之间使用点号分隔。</p><p>版本号的格式如下：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&lt;major&gt;.&lt;minor&gt;.&lt;patch&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><ul><li>主版本号（Major）：当进行不兼容的API修改或功能重构时递增。如果某个版本的主版本号为0，则表示该代码处于起步阶段，可能会有较大改动。</li><li>次版本号（Minor）：当添加新功能，但是保持向后兼容时递增。</li><li>修订版本号（Patch）：当进行向后兼容的问题修正时递增。</li></ul><p>除了基本的版本号规则，还可以使用==预发布标识符（pre-release identifiers）==来表示在当前版本之前的开发或测试版本，以及元数据（metadata）来提供更多信息。预发布标识符位于版本号之后，使用短横线进行分隔，而元数据位于版本号之后，使用加号进行分隔。</p><p>示例：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">&quot;dependencies&quot;: {</span></span>
<span class="line"><span style="color:#A6ACCD;">  &quot;package-name&quot;: &quot;^1.2.3&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p>在上述示例中，<code>^1.2.3</code>表示对&quot;package-name&quot;包的依赖版本应该==大于等于==1.2.3，并且在次版本号更新时保持向后兼容。符号<code>^</code>表示符合这个范围的最新版本。</p><p>其他常用的版本约束符号包括：</p><ul><li><code>&gt;</code>：大于指定版本</li><li><code>&gt;=</code>：大于等于指定版本</li><li><code>&lt;</code>：小于指定版本</li><li><code>&lt;=</code>：小于等于指定版本</li><li><code>=</code>：精确匹配指定版本</li><li><code>~</code>：适用于次版本号和修订版本号，表示兼容更新（不修改主版本号）</li></ul><p>通过遵守这些版本号命名规范，可以确保项目中的依赖包在升级时能够正确处理==向前兼容性==，并且可以方便地管理和维护项目的依赖关系。</p><h3 id="package-lock-json" tabindex="-1">package-lock.json <a class="header-anchor" href="#package-lock-json" aria-label="Permalink to &quot;package-lock.json&quot;">​</a></h3><blockquote><p>package-lock.json它会在npm更改node_modules目录树或者package.json时自动生成的，它准确的描述了当前项目npm包的依赖树，并且在随后的安装中会根据package-lock.json来安装，保证是相同的一个依赖树，不考虑这个过程中是否有某个依赖有小版本的更新。</p></blockquote><p>它的作用有以下几个方面：</p><ol><li>精确锁定版本：<code>package-lock.json</code>文件记录了当前项目所依赖的每个包的准确版本号，包括直接依赖和间接依赖。这样可以确保每次安装相同的包版本，以避免由于包的更新引入不兼容或意外的行为变化。</li><li>提升安装速度：当执行<code>npm install</code>命令时，npm会首先检查<code>package-lock.json</code>文件并下载其中列出的特定版本的包，而不需要重新计算依赖树。这种方式通常比简单地从头计算整个依赖树要快得多，从而加快了包的安装速度。</li><li>锁定依赖树：<code>package-lock.json</code>还记录了完整的依赖树信息，包括各个包之间的关系和版本。这样可以确保项目在不同环境中（例如开发、构建、部署）使用相同的依赖树结构，提升项目的可重现性和一致性。</li></ol><p>需要注意的是，<code>package-lock.json</code>文件应该与代码版本一起管理，并且只在修改项目依赖关系时才应该更新。同时，在将项目从一个环境迁移到另一个环境时，确保使用相同的<code>package-lock.json</code>文件来安装依赖，以保持一致性。</p>`,50),s=[i];function c(p,d,t,r,m,u){return a(),l("div",null,s)}const b=e(o,[["render",c]]);export{h as __pageData,b as default};