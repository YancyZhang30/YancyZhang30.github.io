import{_ as e,v as a,b as s,R as l}from"./chunks/framework.caa0fbaf.js";const g=JSON.parse('{"title":"跨域","description":"","frontmatter":{},"headers":[],"relativePath":"1-前端开发/1-随笔/15-跨域.md","filePath":"1-前端开发/1-随笔/15-跨域.md","lastUpdated":1702812201000}'),o={name:"1-前端开发/1-随笔/15-跨域.md"},n=l(`<h1 id="跨域" tabindex="-1">跨域 <a class="header-anchor" href="#跨域" aria-label="Permalink to &quot;跨域&quot;">​</a></h1><h2 id="同源策略" tabindex="-1">同源策略 <a class="header-anchor" href="#同源策略" aria-label="Permalink to &quot;同源策略&quot;">​</a></h2><p>浏览器同源策略（Same-Origin Policy）是浏览器中的一种安全机制，用于限制一个页面从另一个源加载或操作资源的能力。同源策略要求，一个页面只能与同一源（协议、域名、端口号相同）的页面进行交互，而与不同源的页面进行交互时，将受到限制。</p><p>同源策略的作用是保护用户隐私和安全，防止恶意网站窃取用户的信息或进行 CSRF（跨站请求伪造）攻击等。例如，如果一个网站的 JavaScript 代码可以访问另一个网站的 Cookie 信息，那么就可能导致用户的隐私泄露。</p><p>同源策略限制了以下几种行为：</p><ol><li>Cookie、LocalStorage 和 IndexDB 等存储数据的读取和写入。</li><li>DOM 对象的读取和修改。</li><li>AJAX 请求的发送和接收。</li><li>嵌入的 iframe 窗口的访问。</li></ol><p>需要注意的是，同源策略只是浏览器的一种安全机制，并不能完全保证网站的安全性。攻击者可以使用其他方式绕过同源策略，例如使用 JSONP、CORS 等技术进行跨域访问。因此，在设计 Web 应用程序时，应该采用多种安全措施来保护用户的隐私和安全。</p><h2 id="预检请求preflight-request" tabindex="-1">预检请求Preflight Request <a class="header-anchor" href="#预检请求preflight-request" aria-label="Permalink to &quot;预检请求Preflight Request&quot;">​</a></h2><p>在<strong>跨域请求</strong>中，如果请求满足<strong>一定条件</strong>，浏览器会先发送一个预检请求（Preflight Request），也称为预校请求，用于检查服务器是否支持跨域请求。</p><p>预检请求是一种 OPTIONS 请求，它的作用是向服务器请求哪些 <strong>HTTP 方法</strong>和<strong>头信息</strong>是被允许的。只有在服务器端返回了正确的响应头信息后，才能发送实际的跨域请求。</p><p>以下情况会触发预检请求：</p><ol><li>使用了非简单请求（Non-Simple Request），即请求方法为 PUT、DELETE，或者 Content-Type 不是 application/x-www-form-urlencoded、multipart/form-data、text/plain 中的一种。</li><li>在请求中使用了自定义的头信息（Custom Headers），例如 X-Requested-With、Authorization 等。</li></ol><p>对于简单请求（Simple Request），不会触发预检请求。简单请求满足以下条件：</p><ol><li>请求方法为 GET、POST、HEAD 中的一种。</li><li><strong>请求头</strong>信息只包含以下字段：Accept、Accept-Language、Content-Language、Content-Type（只限于 application/x-www-form-urlencoded、multipart/form-data、text/plain）中的一种。</li><li>请求中没有使用<strong>自定义头信息</strong>。</li></ol><h2 id="cors" tabindex="-1">CORS <a class="header-anchor" href="#cors" aria-label="Permalink to &quot;CORS&quot;">​</a></h2><p>CORS（Cross-Origin Resource Sharing，跨域资源共享）是一种浏览器技术，用于解决浏览器跨域访问资源的问题。它通过在服务器端设置响应头信息，允许指定的域名访问资源，从而实现跨域访问。</p><p>CORS 的原理是在浏览器端发送跨域请求时，会在请求头中添加一个 Origin 字段(自动)，用于指示请求的来源域名。服务器端在收到请求后，会检查 Origin 字段，并在响应头中添加一个 Access-Control-Allow-Origin 字段，用于指示允许访问的域名。</p><p>例如，如果一个网页的 JavaScript 代码试图通过 AJAX 请求访问另一个域名下的数据，服务器端可以在响应头中添加以下字段：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Access-Control-Allow-Origin: http://example.com</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>其中，<code>http://example.com</code> 是允许访问的域名。这样，浏览器就会允许该网页的 JavaScript 代码访问该域名下的资源。</p><p>如果服务器端允许多个域名访问资源，可以在响应头中添加多个 <code>Access-Control-Allow-Origin</code> 字段，或者使用通配符 <code>*</code> 表示允许所有域名访问资源。例如：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Access-Control-Allow-Origin: http://example.com</span></span>
<span class="line"><span style="color:#A6ACCD;">Access-Control-Allow-Origin: https://example.com</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>或者：</p><div class="language- line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">Access-Control-Allow-Origin: *</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>除了 <code>Access-Control-Allow-Origin</code> 字段外，CORS 还支持其他一些响应头字段，例如 <code>Access-Control-Allow-Methods</code>、<code>Access-Control-Allow-Headers</code> 等，用于指示允许的请求方法和请求头信息。</p>`,25),t=[n];function i(r,p,c,d,u,h){return a(),s("div",null,t)}const C=e(o,[["render",i]]);export{g as __pageData,C as default};
