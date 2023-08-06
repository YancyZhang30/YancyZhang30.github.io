## 简介

npm 最初它只是被称为 Node Package Manager，用来作为Node.js的包管理器。

但是随着其它构建工具(webpack、browserify)的发展，npm已经变成了 "the package manager for JavaScript"，它用来安装、管理和分享JavaScript包，同时会自动处理多个包之间的依赖。

## 安装配置

新版的nodejs已经集成了npm，所以不需要额外的手动安装npm。

默认npm时使用的国外的服务器地址，所以下载包可能会非常慢，我们可以修改镜像地址为国内的。

```
npm config set registry https://registry.npm.taobao.org/
```

或者临时使用：

```
npm install --registry=https://registry.npm.taobao.org/
```

## nrm

可以使用nrm管理npm的registry镜像地址。

nrm是一个Node.js的npm镜像源管理工具，可以帮助开发者快速切换和管理npm的镜像源。

1. 安装nrm：使用npm全局安装nrm工具。

   ```
   npm install -g nrm
   ```

2. 查看可用的镜像源列表：执行以下命令查看当前可用的镜像源列表。

   ```
   nrm ls
   ```

3. 切换镜像源：使用以下命令切换到指定的镜像源。

   ```
   nrm use <registry>
   ```

   其中，`<registry>`为要切换的镜像源名称，比如`nrm use taobao`。

4. 添加自定义的镜像源：如果需要添加自定义的镜像源，可以使用以下命令进行添加。

   ```
   nrm add <registry> <registry_url>
   ```

   其中，`<registry>`为要添加的镜像源的名称，`<registry_url>`为镜像源的URL地址。

5. 删除已有的镜像源：如果需要删除已有的镜像源，可以使用以下命令进行删除。

   ```
   nrm del <registry>
   ```

   其中，`<registry>`为要删除的镜像源的名称。

6. 测试镜像源的响应时间：执行以下命令可以测试各个镜像源的响应时间。

   ```
   nrm test
   ```

7. 显示当前正在使用的镜像源：执行以下命令可以显示当前正在使用的镜像源。

   ```
   nrm current
   ```



或者项目根目录下的`.npmrc`文件并添加 `registry = https://registry.npm.taobao.org`，比系统配置优先级更高。

## 常用命令

### 项目初始化和配置

- `npm init`: 初始化一个新的npm包，创建并配置`package.json`文件。
- `npm set`: 设置npm配置变量的值。
- `npm get`: 获取当前npm配置变量的值。
- `npm config`: 配置管理命令。
- `npm prune`: 移除`package.json`文件中未列出的依赖。

### 包安装和卸载

- `npm install`: 安装项目所需的依赖包，根据`package.json`中的`dependencies`字段进行安装。
- `npm install <package>`: 安装指定的包，可以通过包名或URL来指定。
- `npm uninstall <package>`: 卸载指定的包。
- `npm update`: 更新项目的依赖包。
- `npm outdated`: 检查存在过时的依赖包。
- `npm ls`: 查看已安装的包及其依赖关系树。

### 脚本执行

- `npm run`: 运行在`package.json`中定义的脚本命令。
- `npm test`: 运行在`package.json`中定义的测试命令。
- `npm start`: 运行在`package.json`中定义的启动命令。
- `npm stop`: 停止运行在`package.json`中定义的服务。

### 包发布和管理

- `npm publish`: 将项目发布到npm仓库，供其他人使用。
- `npm unpublish`: 从npm仓库撤销已发布的包。
- `npm version`: 更新项目的版本号，并自动生成对应的git标签。
- `npm deprecate`: 发布更新的版本时，声明当前版本已过时。
- `npm owner`: 管理包的所有者。

### 安装源管理和配置

- `npm config`: 配置管理命令，用于设置npm的配置。
- `npm adduser`: 添加用户身份以发布和维护包。
- `npm whoami`: 显示当前登录的用户信息。
- `npm logout`: 注销当前用户。
- `npm adduser`: 添加用户身份。
- `npm token`: 创建、列出和撤销访问令牌。
- `npm install <package> --registry <registry>`: 通过指定镜像源地址来安装包。

### 其他常用命令

- `npm search <keyword>`: 搜索与关键字匹配的npm包。
- `npm docs <package>`: 打开指定包的文档。
- `npm view <package>`: 查看指定包的详细信息。
- `npm init <preset>`: 使用预设值初始化项目`package.json`文件。
- `npm rebuild`: 重新构建已安装的包。

## package.json

`package.json`是一个存储项目元数据的文件，位于项目的根目录下。它是使用npm初始化项目时自动生成的，并在项目开发过程中逐步被填充和更新。

### 常见字段

下面是`package.json`文件中常见的字段：

1. `name`：项目的名称。必须唯一，且符合npm包名的命名规则。
2. `version`：项目的版本号。采用语义化版本控制（Semantic Versioning）规范，格式为`major.minor.patch`。
3. `description`：项目的描述信息。简要介绍项目的功能、特点等。
4. `main`：指定项目的入口文件。当其他人引入该包时，默认加载的文件路径。
5. `keywords`：关键字数组，用于描述和搜索项目的标签。
6. `author`：项目的作者信息。
7. `contributors`：项目的贡献者列表。
8. `license`：项目的许可证信息。明确说明项目的开源许可协议。
9. `dependencies`：项目所依赖的==生产环境==包列表，以包名和版本号的形式列出。
10. `devDependencies`：项目所依赖的==开发环境==包列表，只在开发和构建过程中使用。
11. `scripts`：定义一系列可以通过`npm run`执行的脚本命令。
12. `repository`：项目的代码托管仓库信息。
13. `bugs`：项目的错误报告地址。
14. `homepage`：项目的主页地址。
15. 其他自定义字段：您可以在`package.json`中添加自定义字段，用于存储其他与项目相关的信息。

`package.json`文件对于管理和构建项目非常重要，在开发过程中，您可以使用npm命令来安装、更新和删除依赖包，运行脚本命令等。同时，通过`npm init`命令可以初始化一个新的`package.json`文件，也可以手动编辑`package.json`文件来添加或修改其中的字段信息。

### 依赖版本

在`package.json`文件中，依赖版本号采用语义化版本控制（Semantic Versioning）规范。该规范定义了三个基本的版本号：主版本号（major）、次版本号（minor）和修订版本号（patch），它们之间使用点号分隔。

版本号的格式如下：

```
<major>.<minor>.<patch>
```

- 主版本号（Major）：当进行不兼容的API修改或功能重构时递增。如果某个版本的主版本号为0，则表示该代码处于起步阶段，可能会有较大改动。
- 次版本号（Minor）：当添加新功能，但是保持向后兼容时递增。
- 修订版本号（Patch）：当进行向后兼容的问题修正时递增。

除了基本的版本号规则，还可以使用==预发布标识符（pre-release identifiers）==来表示在当前版本之前的开发或测试版本，以及元数据（metadata）来提供更多信息。预发布标识符位于版本号之后，使用短横线进行分隔，而元数据位于版本号之后，使用加号进行分隔。

示例：

```
"dependencies": {
  "package-name": "^1.2.3"
}
```

在上述示例中，`^1.2.3`表示对"package-name"包的依赖版本应该==大于等于==1.2.3，并且在次版本号更新时保持向后兼容。符号`^`表示符合这个范围的最新版本。

其他常用的版本约束符号包括：

- `>`：大于指定版本
- `>=`：大于等于指定版本
- `<`：小于指定版本
- `<=`：小于等于指定版本
- `=`：精确匹配指定版本
- `~`：适用于次版本号和修订版本号，表示兼容更新（不修改主版本号）

通过遵守这些版本号命名规范，可以确保项目中的依赖包在升级时能够正确处理==向前兼容性==，并且可以方便地管理和维护项目的依赖关系。

### package-lock.json

> package-lock.json它会在npm更改node_modules目录树或者package.json时自动生成的，它准确的描述了当前项目npm包的依赖树，并且在随后的安装中会根据package-lock.json来安装，保证是相同的一个依赖树，不考虑这个过程中是否有某个依赖有小版本的更新。

它的作用有以下几个方面：

1. 精确锁定版本：`package-lock.json`文件记录了当前项目所依赖的每个包的准确版本号，包括直接依赖和间接依赖。这样可以确保每次安装相同的包版本，以避免由于包的更新引入不兼容或意外的行为变化。
2. 提升安装速度：当执行`npm install`命令时，npm会首先检查`package-lock.json`文件并下载其中列出的特定版本的包，而不需要重新计算依赖树。这种方式通常比简单地从头计算整个依赖树要快得多，从而加快了包的安装速度。
3. 锁定依赖树：`package-lock.json`还记录了完整的依赖树信息，包括各个包之间的关系和版本。这样可以确保项目在不同环境中（例如开发、构建、部署）使用相同的依赖树结构，提升项目的可重现性和一致性。

需要注意的是，`package-lock.json`文件应该与代码版本一起管理，并且只在修改项目依赖关系时才应该更新。同时，在将项目从一个环境迁移到另一个环境时，确保使用相同的`package-lock.json`文件来安装依赖，以保持一致性。