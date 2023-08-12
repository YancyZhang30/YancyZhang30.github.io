import{_ as s,v as n,b as a,R as e}from"./chunks/framework.caa0fbaf.js";const m=JSON.parse('{"title":"Nginx学习整理","description":"","frontmatter":{},"headers":[{"level":1,"title":"Nginx学习整理","slug":"nginx学习整理","link":"#nginx学习整理","children":[]},{"level":1,"title":"Nginx安装配置","slug":"nginx安装配置","link":"#nginx安装配置","children":[{"level":2,"title":"安装","slug":"安装","link":"#安装","children":[]},{"level":2,"title":"命令","slug":"命令","link":"#命令","children":[{"level":3,"title":"查看版本","slug":"查看版本","link":"#查看版本","children":[]},{"level":3,"title":"启动","slug":"启动","link":"#启动","children":[]},{"level":3,"title":"快速停止","slug":"快速停止","link":"#快速停止","children":[]},{"level":3,"title":"完整有序停止","slug":"完整有序停止","link":"#完整有序停止","children":[]},{"level":3,"title":"重载","slug":"重载","link":"#重载","children":[]}]}]},{"level":1,"title":"配置","slug":"配置","link":"#配置","children":[{"level":2,"title":"全局块","slug":"全局块","link":"#全局块","children":[]},{"level":2,"title":"events块","slug":"events块","link":"#events块","children":[]},{"level":2,"title":"http块","slug":"http块","link":"#http块","children":[]},{"level":2,"title":"server块（属于http块）","slug":"server块-属于http块","link":"#server块-属于http块","children":[]},{"level":2,"title":"location块（属于server块）","slug":"location块-属于server块","link":"#location块-属于server块","children":[]}]},{"level":1,"title":"常用功能-实战","slug":"常用功能-实战","link":"#常用功能-实战","children":[{"level":2,"title":"虚拟主机","slug":"虚拟主机","link":"#虚拟主机","children":[{"level":3,"title":"基于域名","slug":"基于域名","link":"#基于域名","children":[]},{"level":3,"title":"基于ip","slug":"基于ip","link":"#基于ip","children":[]},{"level":3,"title":"基于端口","slug":"基于端口","link":"#基于端口","children":[]}]},{"level":2,"title":"反向代理","slug":"反向代理","link":"#反向代理","children":[{"level":3,"title":"为什么需要反向代理？","slug":"为什么需要反向代理","link":"#为什么需要反向代理","children":[]},{"level":3,"title":"nginx反向代理配置","slug":"nginx反向代理配置","link":"#nginx反向代理配置","children":[]}]},{"level":2,"title":"负载均衡","slug":"负载均衡","link":"#负载均衡","children":[]},{"level":2,"title":"正向代理","slug":"正向代理","link":"#正向代理","children":[]},{"level":2,"title":"rewrite","slug":"rewrite","link":"#rewrite","children":[]},{"level":2,"title":"日志","slug":"日志","link":"#日志","children":[]}]}],"relativePath":"views/nginx/01_NginxStart.md","filePath":"views/nginx/01_NginxStart.md","lastUpdated":1691317825000}'),l={name:"views/nginx/01_NginxStart.md"},p=e(`<h1 id="nginx学习整理" tabindex="-1">Nginx学习整理 <a class="header-anchor" href="#nginx学习整理" aria-label="Permalink to &quot;Nginx学习整理&quot;">​</a></h1><p>Nginx(engine x)是一个高性能的<strong>HTTP和反向代理web服务器</strong>，同时也提供了IMAP/POP3/SMTP服务。</p><p>Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，在BSD-like 协议下发行。其特点是占有内存少，并发能力强，事实上nginx的并发能力在同类型的网页服务器中表现较好。</p><p>由塞索耶夫为俄罗斯访问量第二的Rambler.ur站点开发的，nginx是Apache服务不错的替代品。</p><p>大学尝试过使用apache，但是公司是使用的Nginx，并且感觉Nginx也更加的轻量，所以准备学习一下Nginx。</p><h1 id="nginx安装配置" tabindex="-1">Nginx安装配置 <a class="header-anchor" href="#nginx安装配置" aria-label="Permalink to &quot;Nginx安装配置&quot;">​</a></h1><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><p>windows</p><p>官网下载安装：<a href="http://nginx.org/en/download.html" target="_blank" rel="noreferrer">http://nginx.org/en/download.html</a></p><p>linux</p><div class="language-bash line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">bash</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">yum</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">-y</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">install</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">make</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">zlib</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">zlib-devel</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">gcc-c++</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">libtool</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">openssl</span><span style="color:#A6ACCD;"> </span><span style="color:#C3E88D;">openssl-devel</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="命令" tabindex="-1">命令 <a class="header-anchor" href="#命令" aria-label="Permalink to &quot;命令&quot;">​</a></h2><p>在根目录下，打开cmd。</p><h3 id="查看版本" tabindex="-1">查看版本 <a class="header-anchor" href="#查看版本" aria-label="Permalink to &quot;查看版本&quot;">​</a></h3><p><code>nginx -v</code></p><h3 id="启动" tabindex="-1">启动 <a class="header-anchor" href="#启动" aria-label="Permalink to &quot;启动&quot;">​</a></h3><p><code>start nginx</code>获取<code>nginx.exe</code></p><p>Nginx默认监听的端口号是80，因此需要确保80端口没有被其他程序占用。</p><p>在浏览器中输入<code>localhost</code>或<code>127.0.0.1</code>，会出现一个页面提示<code>Welcome to nginx!</code>，即表示Nginx安装并启动成功。</p><h3 id="快速停止" tabindex="-1">快速停止 <a class="header-anchor" href="#快速停止" aria-label="Permalink to &quot;快速停止&quot;">​</a></h3><p><code>nginx -s stop</code></p><h3 id="完整有序停止" tabindex="-1">完整有序停止 <a class="header-anchor" href="#完整有序停止" aria-label="Permalink to &quot;完整有序停止&quot;">​</a></h3><p><code>nginx -s quit</code></p><h3 id="重载" tabindex="-1">重载 <a class="header-anchor" href="#重载" aria-label="Permalink to &quot;重载&quot;">​</a></h3><p><code>nginx -s reload</code></p><h1 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h1><p><img src="https://pic1.zhimg.com/80/v2-a07d2e7ca774044a61629d6121f27a1c_720w.webp" alt=""></p><p>nginx.conf由多个块组成，最外面的块是main，main包含Events和HTTP，HTTP包含upstream和多个Server，Server又包含多个location。</p><h2 id="全局块" tabindex="-1">全局块 <a class="header-anchor" href="#全局块" aria-label="Permalink to &quot;全局块&quot;">​</a></h2><p>该部分配置主要影响Nginx全局，通常包括下面几个部分：</p><ol><li><p>配置运行Nginx服务器用户（组）<code>user user [group];</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">user：指定可以运行Nginx服务器的用户</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">group：可选项，可以运行Nginx服务器的用户组</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">如果user指令不配置或者配置为 user nobody nobody ，则默认所有用户都可以启动Nginx进程</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li><li><p>worker process数 <code>worker_processes number | auto;</code></p></li><li><p>Nginx进程PID存放路径 <code>pid file;</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">file：指定存放路径和文件名称</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">如果不指定默认置于路径 logs/nginx.pid</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li><li><p>错误日志的存放路径 <code>error_log file | stderr;</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">file：日志输出到某个文件file</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">stderr：日志输出到标准错误输出</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li><li><p>配置文件的引入 <code>include file;</code></p><p>该指令主要用于将其他的Nginx配置或者第三方模块的配置引用到当前的主配置文件中。</p></li></ol><h2 id="events块" tabindex="-1">events块 <a class="header-anchor" href="#events块" aria-label="Permalink to &quot;events块&quot;">​</a></h2><p>该部分配置主要影响Nginx服务器与用户的网络连接，主要包括：</p><ol><li><p>设置网络连接的序列化 <code>accept_mutex on | off;</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">该指令默认为on状态，表示会对多个Nginx进程接收连接进行序列化，防止多个进程对连接的争抢。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">说到该指令，首先得阐述一下什么是所谓的 “惊群问题”，可以参考 WIKI百科的解释。就Nginx的场景来解释的话大致的意思就是：当一个新网络连接来到时，多个worker进程会被同时唤醒，但仅仅只有一个进程可以真正获得连接并处理之。如果每次唤醒的进程数目过多的话，其实是会影响一部分性能的。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">所以在这里，如果accept_mutex on，那么多个worker将是以串行方式来处理，其中有一个worker会被唤醒；反之若accept_mutex off，那么所有的worker都会被唤醒，不过只有一个worker能获取新连接，其它的worker会重新进入休眠状态</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li><li><p>是否允许同时接收多个网络连接 <code>multi_accept on | off;</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">该指令默认为off状态，意指每个worker process 一次只能接收一个新到达的网络连接。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">若想让每个Nginx的worker process都有能力同时接收多个网络连接，则需要开启此配置</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li><li><p>事件驱动模型的选择 <code>use model;</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">model模型可选择项包括：select、poll、kqueue、epoll、rtsig等......</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>最大连接数的配置 <code>worker_connections number;</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">number默认值为512，表示允许每一个worker process可以同时开启的最大连接数</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ol><h2 id="http块" tabindex="-1">http块 <a class="header-anchor" href="#http块" aria-label="Permalink to &quot;http块&quot;">​</a></h2><ol><li><p>定义MIMI-Type</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">include mime.types;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">default_type mime-type;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">MIME-Type指的是网络资源的媒体类型，也即前端请求的资源类型</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">include指令将mime.types文件包含进来</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div></li><li><p>自定义服务日志 <code>access_log path [format];</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">path：自定义服务日志的路径 + 名称</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">format：可选项，自定义服务日志的字符串格式。其也可以使用 log_format 定义的格式</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li><li><p>允许sendfile方式传输文件</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">sendfile on | off;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">sendfile_max_chunk size;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">前者用于开启或关闭使用sendfile()传输文件，默认off</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">后者指令若size&gt;0，则Nginx进程的每个worker process每次调用sendfile()传输的数据了最大不能超出此值；若size=0则表示不限制。默认值为0</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">连接超时时间配置</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></li><li><p>连接超时时间 <code>keepalive_timeout timeout [header_timeout];</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">timeout 表示server端对连接的保持时间，默认75秒</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">header_timeout 为可选项，表示在应答报文头部的 Keep-Alive 域设置超时时间：“Keep-Alive : timeout = header_timeout”</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div></li><li><p>单连接请求数上限 <code>keepalive_requests number;</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">该指令用于限制用户通过某一个连接向Nginx服务器发起请求的次数</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ol><h2 id="server块-属于http块" tabindex="-1">server块（属于http块） <a class="header-anchor" href="#server块-属于http块" aria-label="Permalink to &quot;server块（属于http块）&quot;">​</a></h2><p>server是一切的开始，代表一个代理的出现，里边两大配置项：listen监听接口和server_name监听的地址，里边还包括了location和其它配置项，当存在server的时候，nginx获取到的请求都会去匹配这些server(匹配其中的listen和server_name)。</p><ol><li><p>配置网络监听 <code>listen IP:PORT</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">第一种：配置监听的IP地址：listen IP[:PORT];</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">第二种：配置监听的端口：listen PORT;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">listen 192.168.50.250:8080; #监听具体IP和端口上的链接</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">listen 192.168.50.250; #监听IP上多有端口的链接</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">listen 8080; #监听具体端口上的所有IP的链接</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div></li><li><p>基于名称的虚拟主机配置 <code>server_name name1 name2 ...</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">name可以有多个并列名称，而且此处的name支持正则表达式书写</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">server_name ~^www\\d+\\.myserver\\.com$</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">此时表示该虚拟主机可以接收类似域名 http://www1.myserver.com 等的请求而拒绝 http://www.myserver.com 的域名请求，所以说用正则表达式可以实现更精准的控制</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div></li><li><p>基于IP的虚拟主机配置</p></li></ol><h2 id="location块-属于server块" tabindex="-1">location块（属于server块） <a class="header-anchor" href="#location块-属于server块" aria-label="Permalink to &quot;location块（属于server块）&quot;">​</a></h2><p>指令格式为：<code>location [ = | ~ | ~* | ^~ ] uri {...}</code></p><ol><li><p>请求根目录配置 <code>root path;</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">path：Nginx接收到请求以后查找资源的根目录路径</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>更改location的URI <code>alias path; </code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">path为修改后的根路径</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li><li><p>网站默认首页配置 <code>index file ......</code></p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">file可以包含多个用空格隔开的文件名，首先找到哪个页面，就使用哪个页面响应请求</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div></li></ol><p><img src="https://pic1.zhimg.com/80/v2-630dc25ba16f4c1549d207d5e0aeefe4_720w.webp" alt=""></p><h1 id="常用功能-实战" tabindex="-1">常用功能-实战 <a class="header-anchor" href="#常用功能-实战" aria-label="Permalink to &quot;常用功能-实战&quot;">​</a></h1><p><a href="https://zhuanlan.zhihu.com/p/624322044" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/624322044</a></p><h2 id="虚拟主机" tabindex="-1">虚拟主机 <a class="header-anchor" href="#虚拟主机" aria-label="Permalink to &quot;虚拟主机&quot;">​</a></h2><p>虚拟主机使用的是特殊的软硬件技术，它把一台运行在因特网上的服务器主机分成一台台“虚拟”的主机，每台虚拟主机都可以是一个独立的网站，可以具有独立的域名和完整的internet服务器功能，同一台主机上的虚拟主机之间是完全独立的。</p><p>一台服务器，装了一个nginx，可以跑多个网站，此方式就是虚拟主机。</p><p>原理都是通过配置多个server并修改server_name或者listen配置。</p><h3 id="基于域名" tabindex="-1">基于域名 <a class="header-anchor" href="#基于域名" aria-label="Permalink to &quot;基于域名&quot;">​</a></h3><h3 id="基于ip" tabindex="-1">基于ip <a class="header-anchor" href="#基于ip" aria-label="Permalink to &quot;基于ip&quot;">​</a></h3><h3 id="基于端口" tabindex="-1">基于端口 <a class="header-anchor" href="#基于端口" aria-label="Permalink to &quot;基于端口&quot;">​</a></h3><h2 id="反向代理" tabindex="-1">反向代理 <a class="header-anchor" href="#反向代理" aria-label="Permalink to &quot;反向代理&quot;">​</a></h2><p>反向代理和正向代理的区别就是：正向代理代理客户端，反向代理代理服务器。</p><p>反向代理，其实客户端对代理是无感知的，因为客户端不需要任何配置就可以访问，我们只需要将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，在返回给客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器IP地址。</p><p>理解这两种代理的关键在于代理服务器所代理的对象是什么，正向代理代理的是客户端，我们需要在客户端进行一些代理的设置。而反向代理代理的是服务器，作为客户端的我们是无法感知到服务器的真实存在的。</p><h3 id="为什么需要反向代理" tabindex="-1">为什么需要反向代理？ <a class="header-anchor" href="#为什么需要反向代理" aria-label="Permalink to &quot;为什么需要反向代理？&quot;">​</a></h3><ol><li>提高访问速度：由于目标主机返回的数据会存放在代理服务器的硬盘中，因此下一次访问时，会直接读取，起到缓存作用。</li><li>防火墙作用：由于目标主机返回的数据会存放在代理服务器的硬盘中，因此下一次访问时，会直接读取，起到缓存作用。</li><li>翻墙：翻墙浏览器就是利用了代理服务器，不用出国也能直接访问外网。</li></ol><h3 id="nginx反向代理配置" tabindex="-1">nginx反向代理配置 <a class="header-anchor" href="#nginx反向代理配置" aria-label="Permalink to &quot;nginx反向代理配置&quot;">​</a></h3><p>有时我们会使用一些java或node应用，但又不想让他们直接监听80端口，这时就需要用到端口转发，这也是最常用的反向代理场景。</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server{</span></span>
<span class="line"><span style="color:#A6ACCD;">  listen 80;</span></span>
<span class="line"><span style="color:#A6ACCD;">  server_name  localhost;</span></span>
<span class="line"><span style="color:#A6ACCD;">  index  index.php index.html index.htm;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">  location /api {</span></span>
<span class="line"><span style="color:#A6ACCD;">    proxy_pass  http://127.0.0.1:3000; # 转发规则</span></span>
<span class="line"><span style="color:#A6ACCD;">    proxy_set_header Host $proxy_host; # 修改转发请求头，让3000端口的应用可以受到真实的请求</span></span>
<span class="line"><span style="color:#A6ACCD;">    proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span style="color:#A6ACCD;">    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span style="color:#A6ACCD;">  }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p>这样我们请求<code>http://localhost/.../api..</code>接口时，就会转发到3000端口，从而实现请求转发。</p><p>域名转发同理，修改proxy_pass即可。</p><blockquote><p>当<code>proxy_pass</code>指令后面带有斜杠<code>&#39;/&#39;</code>时，表示将匹配到的URL完全传递给后端服务器进行处理。例如，如果<code>location /app/</code>和<code>proxy_pass http://backend;</code>，那么对于请求<code>http://yourdomain/app/path</code>，<code>nginx</code>会将完整的URL路径<code>/path</code>传递给后端服务器，后端服务器将根据实际情况进行处理，即<code>http://backend/path</code>。</p><p>而当<code>proxy_pass</code>指令后面没有斜杠时，表示将匹配到的URL与<code>location</code>指令中的路径进行合并然后传递给后端服务器。例如，如果<code>location /app/</code>和<code>proxy_pass http://backend;</code>，那么对于请求<code>http://yourdomain/app/path</code>，<code>nginx</code>会将路径<code>/path</code>与<code>location</code>的路径<code>/app/</code>合并，最终将<code>/app/path</code>传递给后端服务器。这样可以有效地重写URL路径，即<code>http://backend/app/path</code>。</p><p>因此，斜杠的有无会影响<code>proxy_pass</code>指令传递给后端服务器的URL路径的处理方式。选择是否带斜杠取决于具体需求和后端服务器的处理逻辑。</p></blockquote><h2 id="负载均衡" tabindex="-1">负载均衡 <a class="header-anchor" href="#负载均衡" aria-label="Permalink to &quot;负载均衡&quot;">​</a></h2><p>分摊到多个操作单元上进行执行。我们就要一个调度者(nginx)，保证所有后端服务器都能将性能充分发挥，从而保持服务器的整体性能最优，这就是负载均衡。</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;"># 负载均衡</span></span>
<span class="line"><span style="color:#A6ACCD;">upstream test{</span></span>
<span class="line"><span style="color:#A6ACCD;">  server 192.168.0.110:8081 weight=2;</span></span>
<span class="line"><span style="color:#A6ACCD;">  server 192.168.0.111:8081 weight=3;</span></span>
<span class="line"><span style="color:#A6ACCD;">  server 192.168.0.112:8081 weight=1;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">    listen       80;</span></span>
<span class="line"><span style="color:#A6ACCD;">    server_name  localhost;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">    location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">        root   html;</span></span>
<span class="line"><span style="color:#A6ACCD;">        index  index.html index.htm;</span></span>
<span class="line"><span style="color:#A6ACCD;">        proxy_pass  http://www.test.com;    # 代理转发</span></span>
<span class="line"><span style="color:#A6ACCD;">    }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><h2 id="正向代理" tabindex="-1">正向代理 <a class="header-anchor" href="#正向代理" aria-label="Permalink to &quot;正向代理&quot;">​</a></h2><p>正向代理是一个位于客户端和原始服务器之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标，然后代理向原始服务器转交请求并将获得的内容返回给客户端。客户端必须要进行一些特别的设置才能使用正向代理。</p><div class="language-text line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">server {</span></span>
<span class="line"><span style="color:#A6ACCD;">     listen 18088;</span></span>
<span class="line"><span style="color:#A6ACCD;">     resolver x.x.x.x valid=60s ipv6=off;</span></span>
<span class="line"><span style="color:#A6ACCD;">     resolver_timeout 30s;</span></span>
<span class="line"><span style="color:#A6ACCD;">     proxy_connect;</span></span>
<span class="line"><span style="color:#A6ACCD;">     proxy_connect_allow            443 80;</span></span>
<span class="line"><span style="color:#A6ACCD;">     proxy_connect_connect_timeout  30s;</span></span>
<span class="line"><span style="color:#A6ACCD;">     proxy_connect_read_timeout     30s;</span></span>
<span class="line"><span style="color:#A6ACCD;">     proxy_connect_send_timeout     30s;</span></span>
<span class="line"><span style="color:#A6ACCD;">      location / {</span></span>
<span class="line"><span style="color:#A6ACCD;">         proxy_pass $scheme://$http_host$request_uri;</span></span>
<span class="line"><span style="color:#A6ACCD;">         proxy_set_header Host $host;</span></span>
<span class="line"><span style="color:#A6ACCD;">     }</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><h2 id="rewrite" tabindex="-1">rewrite <a class="header-anchor" href="#rewrite" aria-label="Permalink to &quot;rewrite&quot;">​</a></h2><p>实现对URL的重写以及对url的重定向。</p><ol><li>URL访问跳转，支持开发设计 a.页面跳转 b.兼容性支持 c.展示效果</li><li>SEO优化 SEO:搜索引擎优化</li><li>维护 a.后台维护 b.流量转发</li><li>安全</li></ol><p><code>rewrite [正则表达式 替换前的URL][替换后的URL][标识flag];</code></p><p><code>rewrite ^(.*)$ /pages/maintain.html break; #把所有的请求都跳转至maintain.html页面,break是一个标识符</code></p><p>flag是一个标识符,标识rewrite的类型</p><ol><li>last:停止rewrite检测[如果没有匹配到，会继续向下匹配]</li><li>break:停止rewrite检测[如果没有匹配到,则不再向下匹配，直接返回404]</li><li>redirect:返回302临时重定向，地址栏会显示跳转后的地址</li><li>permanent:返回301永久重定向,地址栏会显示跳转后的地址</li></ol><h2 id="日志" tabindex="-1">日志 <a class="header-anchor" href="#日志" aria-label="Permalink to &quot;日志&quot;">​</a></h2><p>通过访问日志，可以得到用户地域来源，跳转来源，使用终端，某个URL访问量等相关信息。</p><p>通过错误日志，可以得到系统某个服务或server的性能瓶颈。</p>`,80),i=[p];function r(o,c,t,d,b,u){return n(),a("div",null,i)}const C=s(l,[["render",r]]);export{m as __pageData,C as default};