# package-lock.json

## 为什么需要lock文件

lock文件是在npm5以后才出现的，package-lock.json 文件的出现是为了解决 npm 包管理过程中的两个主要问题：版本管理和可重复性。

### 版本管理
在 npm 中，包的版本是使用语义化版本控制（Semantic Versioning，简称semver ）进行管理的。

::: tip
每个包都有一个版本号，形如 MAJOR.MINOR.PATCH（可以理解为主版本号，次版本号，修订版本号）。MAJOR 版本号表示不兼容的更改，MINOR 版本号表示向后兼容的新功能，PATCH 版本号表示向后兼容的错误修复。

例如："vue": "^3.3.4"
:::

在开发过程中，你可能会依赖于其他包，并指定了它们的版本范围（如 ^1.2.0）。但是，这描述的是一个版本范围而不是一个具体的版本，当执行npm install时如果没有lock文件会下载这个版本范围内的最新的一个版本，如果其他开发者或构建环境安装的实际版本与你的不同，可能会导致不一致的行为，甚至出现错误。

::: tip
关于semver版本范围，

如果你写 ~0.13.0，你只想更新补丁版本：0.13.1 可以，但 0.14.0 不行。

如果你写了^0.13.0，你想得到不改变最左边的非零数字的更新：0.13.1，0.13.2等等。

如果你写 0.13.0，那就是将要使用的确切版本，总是会下载这个版本的包。
:::

而package-lock.json 文件记录了精确的依赖关系和版本号，确保在不同的环境中安装相同的依赖版本，从而解决版本管理问题。
### 可重复性
npm 的依赖项解析是基于递归的。当你安装一个包时，npm 会解析该包的依赖项，并安装它们的依赖项，依此类推。

但是，由于包的版本范围可以是模糊的，不同的解析过程可能导致安装不同的依赖项版本，从而引入了不确定性和不一致性。

package-lock.json 文件锁定了解析过程中的依赖项版本，以确保在不同的环境中重现相同的依赖树，从而提供可重复性。

::: tip
如果只有一个package.json文件，运行npm i会根据它生成一个package-lock.json文件，这个文件相当于本次install的一个快照，它不仅记录了package.json指明的直接依赖的版本，也记录了间接依赖的版本。

如果package.json的semver-range version和package-lock.json中版本兼容(package-lock.json版本在package.json指定的版本范围内)，即使此时package.json中有新的版本，执行npm i也还是会根据package-lock.json下载。

如果手动修改了package.json的version ranges，且和package-lock.json中版本不兼容，那么执行npm i时package-lock.json将会更新到兼容package.json的版本。
:::

## lock文件字段解析
一个 package-lock.json 里面的每个依赖主要是有以下的几部分组成的:
- "name"：指定包的名称，与 package.json 文件中的 "name" 字段相对应。
- "version"：指定包的版本号，与 package.json 文件中的 "version" 字段相对应。
- "lockfileVersion"：package-lock.json 文件的格式版本号，用于确定文件的结构和兼容性。
- "requires``": 是否使用requires来追踪模块的依赖关系
- "dependencies"：一个对象，包含项目所依赖的其他包及其版本号。这些依赖项可以是直接依赖项，也可以是间接依赖项（被其他依赖项所依赖）。并不是所有的子依赖都有 dependencies 属性,只有子依赖的依赖和当前已安装在根目录的 node_modules 中的依赖冲突之后, 才会有这个属性。 这可能涉及嵌套情况的依赖管理。
- "devDependencies"：一个对象，列出了在开发过程中所需的包及其版本号。这些包通常用于测试、构建和开发工具。
- "dev"：表示该模块是否为顶级模块的开发依赖或者是一个的传递依赖关系
- "resolved"：依赖包的安装源(可以理解为下载地址)
- "integrity"：每个包的完整性校验值，用于确保下载的包的完整性和安全性。它是使用哈希算法计算得出的唯一标识符，用于验证包的内容是否被篡改。
- "subdependencies"：一个对象，包含每个包的子依赖项。这包括子依赖项的名称、版本号和其他子依赖项的信息。
- "dependenciesMeta"：一个对象，包含每个包的元数据。这些元数据可以包括版本范围、源、分辨率策略和其他信息。
- "engines"：一个对象，包含该包需要使用的引擎，以及引擎的版本范围，通常只有node、npm

## package-lock.json什么时候会变
1. package-lock.json在npm install的时候会自动生成。
2. 当我们修改依赖位置，比如将部分包的位置从 dependencies 移动到 devDependencies 这种操作，虽然包未变，但是也会影响 package-lock.json，会将部分包的 dev 字段设置为 true。
3. 如果我们安装源 registry 不同，执行 npm install 时也会修改 package-lock.json。因为他是会记录我们的依赖包地址的。
4. 当我们使用npm install添加或npm uninstall移除包的时候，同时也会修改 package-lock.json。
5. 当我们更新某个包的版本的时候，同时也会修改 package-lock.json。

需要注意的是，我们不应该手动修改package.json亦或是package-lock.json文件，这可能会导致一些不可预期的错误，我们应该使用`npm ci`来代替次行为，npm ci会自动帮我们修改或者更新package.json/package-lock.json文件。

比如我们想要下载指定版本的npm包应该使用npm install npmpackage@xx.xx.xx
## npm ci
- npm ci 安装前会检测是否有 package-lock.json或者npm-shrinkwrap.json，没有会停止并提示。
- npm ci 安装前会检测package-lock.json 里的版本和package.json 里的依赖版本是否有偏差，如果有会停止和报错。
- npm ci 安装前会删除掉node_modules 里的内容。
- npm ci 安装完成后不会改变package.json 或者package-lock.json里的内容。
- npm ci 不能像npm install 可以单独安装某个依赖。它只针对当前项目安装所有package-lock.json或者npm-shrinkwrap.json里定义的依赖
- npm ci 安装过程不会打印出很多安装日志。

正因为其安装的稳定和无侵入性质，所以适合集成在发布流程的shell命令里，来替换npm install。