## vi三种模式
[![pkinfrn.png](https://s21.ax1x.com/2024/04/27/pkinfrn.png)](https://imgse.com/i/pkinfrn)

### 命令模式
```shell
vi test.txt
```
使用vi命令后，默认是进入命令模式，如果文件不存在，则创建一个新的文件。

在命令模式下，我们可以执行一些快捷键，执行一些常用的操作。浏览文件内容、复制粘贴、查找或者删除文本等。

1. H、J、K、L控制光标移动，方向键也可。
2. ^跳转行首，$跳转行尾
3. `yy`复制一行内容、`p`粘贴内容、`dd`剪切内容，通过前面加数字，可以重复操作`10yy`复制十行内容，`10p`粘贴十次……
4. `ctrl+f`（forward）向前翻页、`ctrl+b`（back）向后翻译、`ctrl+u`（up）向上翻半页、`ctrl+d`（down）向下翻半页
5. `/hello`向下查找hello、`?hello`向上查找hello，通过n键查找下一个，N键相反方向，默认区分大小写，通过`/hello\c`，不区分大小写
6. 撤销操作（类似于ctrl+z）`u`
### 插入模式
命令模式下通过点击i/I（insert）、a/A（append）或者o/O（open）键进入插入模式。

进入插入模式后，输入的内容就会插入当前文件中，按`ESC`键可回到命令模式。

[![pkinIaV.png](https://s21.ax1x.com/2024/04/27/pkinIaV.png)](https://imgse.com/i/pkinIaV)

1. i、a；当前光标前后插入
2. I、A：当前行的前后插入
3. O、o：当前行的上下插入
### 尾行模式
在命令模式下输入`:`进入尾行模式。

1. 替换内容(hello -> world)`:s/hello/world/g`(默认当前行)，替换第一行到第五行：`:1,5s/hello/world/g`，替换整个文件`:1,$/hello/world/g`，不加g只会替换第一个匹配的
2. `set num`设置行号

底线命令模式可以输入单个或多个字符的命令，可用的命令非常多。

在底线命令模式中，基本的命令有（已经省略了冒号）：

- :w：保存文件。
- :q：退出 Vim 编辑器。
- :wq：保存文件并退出 Vim 编辑器。
- :q!：强制退出Vim编辑器，不保存修改。

## 配置文件
`.vimrc`文件，保存vi的配置信息。