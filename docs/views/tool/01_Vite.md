# vite学习
## vite为什么比webpack快？
Vite 通过在一开始将应用中的模块区分为 依赖 和 源码 两类，改进了开发服务器启动时间。

- 依赖：大多为在开发时不会变动的纯 JavaScript。一些较大的依赖（例如有上百个模块的组件库）处理的代价也很高。依赖也通常会存在多种模块化格式（例如 ESM 或者 CommonJS）。
Vite 将会使用 esbuild 预构建依赖。esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。

- 源码：通常包含一些并非直接是 JavaScript 的文件，需要转换（例如 JSX，CSS 或者 Vue/Svelte 组件），时常会被编辑。同时，并不是所有的源码都需要同时被加载（例如基于路由拆分的代码模块）。

Vite 以 原生 `ESM 方式`提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

vite官网：https://cn.vitejs.dev/

## vite创建项目
```bash
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```
一般都是：
```bash
npm create vite my-vite-app -- --template vue-ts
```
## 根目录和index.html
在一个 Vite 项目中，index.html 在项目最外层而不是在 public 文件夹内。这是有意而为之的：在开发期间 Vite 是一个服务器，而 index.html 是该 Vite 项目的入口文件。

Vite 将 index.html 视为源码和模块图的一部分。Vite 解析` <script type=\"module" src="..."> `，这个标签指向你的 JavaScript 源码。甚至内联引入 JavaScript 的 `<script type="module"> `和引用 CSS 的 `<link href> `也能利用 Vite 特有的功能被解析。另外，index.html 中的 URL 将被自动转换，因此不再需要 %PUBLIC_URL% 占位符了。

与静态 HTTP 服务器类似，Vite 也有 “根目录” 的概念，即服务文件的位置，在接下来的文档中你将看到它会以 `<root>` 代称。源码中的绝对 URL 路径将以项目的 “根” 作为基础来解析，因此你可以像在普通的静态文件服务器上一样编写代码（并且功能更强大！）。Vite 还能够处理依赖关系，解析处于根目录外的文件位置，这使得它即使在基于 monorepo 的方案中也十分有用。

## vite全局变量

### .env文件
`.env`文件是一个用于存储环境变量的文件。在开发和部署应用程序时，经常需要在不同的环境中配置不同的变量，例如 API 地址、数据库连接信息、密钥等。在许多应用程序中，`.env `文件通常包含一个或多个键值对，用于存储环境变量。

在项目根目录下常见.env文件：
```text
.env                # 所有情况下都会加载
.env.[mode]         # 只在指定模式下加载
```
[mode]指定的是具体模式，所以，一般对于开发，生产和测试环境，都会指定具体的环境
```text
.env
.env.development
.env.production
.env.test
```
示例：
```js
# 只在开发环境加载
VITE_USER_NODE_ENV = development

# 打包时是否删除 console
VITE_DROP_CONSOLE = true

# 公共基础路径
VITE_PUBLIC_PATH = /

# 开发环境接口地址
VITE_API_URL = /api
```

### 环境切换
默认的npm run dev和npm run build就分别对应development开发环境和production生成环境。

也可以手动配置：
```json
"scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "build:dev": "vue-tsc && vite build --mode development",
    "build:test": "vue-tsc && vite build --mode test",
    //....
}
```
加上--mode就能对环境进行设定。

### 引用全局环境变量
在vite项目中读取.env文件内容非常简单，使用`import.meta.env`,就可读取当前环境中加载的.env文件的内容。

例如：
```js
const BASE_API = import.meta.env.VITE_APP_BASE_API
```

但是，在关键的配置文件`vite.config.ts`中import.meta.env是使用不了的，返回undefined。因为vite.config.ts 文件是在` Vite 服务运行之前`被 TypeScript 编译器编译的，而 import.meta.env 变量是在 Vite 服务运行时由 Vite 自动注入到代码中的。

为此，vite专门提供了`loadEnv()`函数，帮我们读取当前环境中env文件的内容。为此，我们可以将默认生成的vite.config.ts文件中的内容进行修改。
```ts
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode, command, ssrBuild }) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  console.log(env);
  return {
    plugins: [vue()],
  }
});
```
`process.cwd()`获得当前项目路径，`const env = loadEnv(mode, root)`得到的就是当前环境的env对象。
## vite静态资源
在vite创建的vue3项目中，引用图片资源有以下两种方式：
### 模板中直接引用图片
```html
<a href="https://vuejs.org/" target="_blank">
  <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
</a>
```
### css或者js中引用图片

在js中引入，有时候我们模板中的图片地址是一个变量：
```js
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
```
例如，imgUrl 在开发时会是 /img.png，在生产构建后会是 /assets/img.2d8efhg.png。

行为类似于 Webpack 的 file-loader。区别在于导入既可以使用绝对公共路径（基于开发期间的项目根路径），也可以使用相对路径。

1. url() 在 CSS 中的引用也以同样的方式处理。

2. 如果 Vite 使用了 Vue 插件，Vue SFC 模板中的资源引用都将自动转换为导入。

3. 常见的图像、媒体和字体文件类型被自动检测为资源。你可以使用 assetsInclude 选项 扩展内部列表。

4. 引用的资源作为构建资源图的一部分包括在内，将生成散列文件名，并可以由插件进行处理以进行优化。

5. 较小的资源体积小于 assetsInlineLimit 选项值 则会被内联为 base64 data URL。

6. Git LFS 占位符会自动排除在内联之外，因为它们不包含它们所表示的文件的内容。要获得内联，请确保在构建之前通过 Git LFS 下载文件内容。

7. 默认情况下，TypeScript 不会将静态资源导入视为有效的模块。要解决这个问题，需要添加 vite/client。
添加声明d.ts文件：
```js
/// <reference types="vite/client" />
```
或者使用`new URL(url, import.meta.url)`
`import.meta.url` 是一个 ESM 的原生功能，会暴露当前模块的 URL。将它与原生的 URL 构造器 组合使用，在一个 JavaScript 模块中，通过相对路径我们就能得到一个被完整解析的静态资源 URL：
```js
const imgUrl = new URL('./img.png', import.meta.url).href

document.getElementById('hero-img').src = imgUrl
```
通用的图片引入函数：
```js
function getImageUrl(name) {
  return new URL(`./dir/${name}.png`, import.meta.url).href
}
```
在生产构建时，Vite 才会进行必要的转换保证 URL 在打包和资源哈希后仍指向正确的地址。然而，`这个 URL 字符串必须是静态的`，这样才好分析。否则代码将被原样保留、因而在 build.target 不支持 import.meta.url 时会导致运行时错误。
```js
// Vite 不会转换这个
const imgUrl = new URL(imagePath, import.meta.url).href
```
css中直接使用url()或者v-bind即可：
```css
.test-box {
  background-image: url('/image/bg.png')
}
```
### 引用后缀
显示URL引入：
```js
import workletURL from 'extra-scalloped-border/worklet.js?url'
CSS.paintWorklet.addModule(workletURL)
```

以字符串引入：
```js
import shaderString from './shader.glsl?raw'
```

以脚本引入：
脚本可以通过 ?worker 或 ?sharedworker 后缀导入为 web worker。
```js
// 在生产构建中将会分离出 chunk
import Worker from './shader.js?worker'
const worker = new Worker()

```
```js
// sharedworker
import SharedWorker from './shader.js?sharedworker'
const sharedWorker = new SharedWorker()

```
```js
// 内联为 base64 字符串
import InlineWorker from './shader.js?worker&inline'

```

## 待补充……