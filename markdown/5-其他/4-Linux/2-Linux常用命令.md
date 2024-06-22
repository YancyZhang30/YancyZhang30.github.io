## 文件目录

### ls
ls（英文全拼：list files）: 列出目录及文件名。
ls命令用于列出指定目录中的文件和目录。例如，ls /path/to/directory/将显示指定目录中的所有文件和子目录。

```bash
[root@www /]# ls -l
total 64
drwxr-xr-x 2 root  root  4096 Feb 15 14:46 cron
drwxr-xr-x 3 mysql mysql 4096 Apr 21  2014 mysql
……
```
选项与参数：
- -a ：全部的文件，连同隐藏文件( 开头为 . 的文件) 一起列出来(常用)
- -d ：仅列出目录本身，而不是列出目录内的文件数据(常用)
- -l ：长数据串列出，包含文件的属性与权限等等数据；(常用)

### ll
ll命令实际上是ls -l的别名，它显示更详细的文件信息，包括文件权限、所有者、组、大小、修改日期等。

在 Linux 中第一个字符代表这个文件是目录、文件或链接文件等等。

当为 d 则是目录
当为 - 则是文件；
若是 l 则表示为链接文档(link file)；
若是 b 则表示为装置文件里面的可供储存的接口设备(可随机存取装置)；
若是 c 则表示为装置文件里面的串行端口设备，例如键盘、鼠标(一次性读取装置)。
接下来的字符中，以三个为一组，且均为 rwx 的三个参数的组合。其中， r 代表可读(read)、 w 代表可写(write)、 x 代表可执行(execute)。 要注意的是，这三个权限的位置不会改变，如果没有权限，就会出现减号 - 而已。

```bash
-rw------- 1 ubuntu ubuntu   65 May 24 16:21 .bash_history
```

### cd
（英文全拼：change directory）：切换目录

```bash
#使用 mkdir 命令创建 runoob 目录
[root@www ~]# mkdir runoob

#使用绝对路径切换到 runoob 目录
[root@www ~]# cd /root/runoob/

#使用相对路径切换到 runoob 目录
[root@www ~]# cd ./runoob/

# 表示回到自己的家目录，亦即是 /root 这个目录
[root@www runoob]# cd ~

# 表示去到目前的上一级目录，亦即是 /root 的上一级目录的意思；
[root@www ~]# cd ..

```

### pwd
pwd（英文全拼：print work directory）：显示目前的目录

选项与参数：
- -P ：显示出确实的路径，而非使用链接 (link) 路径。

### mkdir
mkdir（英文全拼：make directory）：创建一个新的目录

如果想要创建新的目录的话，那么就使用mkdir (make directory)吧。

```bash
mkdir [-mp] 目录名称
```

选项与参数：
- -m ：配置文件的权限喔！直接配置，不需要看默认权限 (umask) 的脸色～
- -p ：帮助你直接将所需要的目录(包含上一级目录)递归创建起来！

```bash
[root@www ~]# cd /tmp
[root@www tmp]# mkdir test    <==创建一名为 test 的新目录
[root@www tmp]# mkdir test1/test2/test3/test4
mkdir: cannot create directory `test1/test2/test3/test4':
No such file or directory       <== 没办法直接创建此目录啊！
[root@www tmp]# mkdir -p test1/test2/test3/test4
```
### rmdir
rmdir（英文全拼：remove directory）：删除一个空的目录

```bash
rmdir [-p] 目录名称
```

选项与参数：
- -p ：从该目录起，一次删除多级空目录
### cp
cp（英文全拼：copy file）: 复制文件或目录

```bash
[root@www ~]# cp [-adfilprsu] 来源档(source) 目标档(destination)
[root@www ~]# cp [options] source1 source2 source3 .... directory
```

选项与参数：

- -a：相当于 -pdr 的意思，至于 pdr 请参考下列说明；(常用)

- -d：若来源档为链接档的属性(link file)，则复制链接档属性而非文件本身；

- -f：为强制(force)的意思，若目标文件已经存在且无法开启，则移除后再尝试一次；

- -i：若目标档(destination)已经存在时，在覆盖时会先询问动作的进行(常用)

- -l：进行硬式链接(hard link)的链接档创建，而非复制文件本身；

- -p：连同文件的属性一起复制过去，而非使用默认属性(备份常用)；

- -r：递归持续复制，用于目录的复制行为；(常用)

- -s：复制成为符号链接档 (symbolic link)，亦即『捷径』文件；

- -u：若 destination 比 source 旧才升级 destination ！

用 root 身份，将 root 目录下的 .bashrc 复制到 /tmp 下，并命名为 bashrc
```bash
[root@www ~]# cp ~/.bashrc /tmp/bashrc
[root@www ~]# cp -i ~/.bashrc /tmp/bashrc
cp: overwrite `/tmp/bashrc'? n  <==n不覆盖，y为覆盖
```
### rm
rm（英文全拼：remove）: 删除文件或目录

```bash
 rm [-fir] 文件或目录
```

选项与参数：

-f ：就是 force 的意思，忽略不存在的文件，不会出现警告信息；
-i ：互动模式，在删除前会询问使用者是否动作
-r ：递归删除啊！最常用在目录的删除了！这是非常危险的选项！！！
将刚刚在 cp 的实例中创建的 bashrc 删除掉！

```bash
[root@www tmp]# rm -i bashrc
rm: remove regular file `bashrc'? y
```
### mv
mv（英文全拼：move file）: 移动文件与目录，或修改文件与目录的名称

```bash
[root@www ~]# mv [-fiu] source destination
[root@www ~]# mv [options] source1 source2 source3 .... directory
```
选项与参数：
- -f ：force 强制的意思，如果目标文件已经存在，不会询问而直接覆盖；
- -i ：若目标文件 (destination) 已经存在时，就会询问是否覆盖！
- -u ：若目标文件已经存在，且 source 比较新，才会升级 (update)

复制一文件，创建一目录，将文件移动到目录中

```bash
[root@www ~]# cd /tmp
[root@www tmp]# cp ~/.bashrc bashrc
[root@www tmp]# mkdir mvtest
[root@www tmp]# mv bashrc mvtest
```

将某个文件移动到某个目录去，就是这样做！

将刚刚的目录名称更名为 mvtest2

```bash
[root@www tmp]# mv mvtest mvtest2
```

## 查看文件
### cat
由第一行开始显示文件内容

选项与参数：
- -A ：相当於 -vET 的整合选项，可列出一些特殊字符而不是空白而已；
- -b ：列出行号，仅针对非空白行做行号显示，空白行不标行号！
- -E ：将结尾的断行字节 $ 显示出来；
- -n ：列印出行号，连同空白行也会有行号，与 -b 的选项不同；
- -T ：将 [tab] 按键以 ^I 显示出来；
- -v ：列出一些看不出来的特殊字符
### tac
从最后一行开始显示，可以看出 tac 是 cat 的倒着写！
### nl
显示的时候，顺道输出行号！
### more
一页一页的显示文件内容
### less
与 more 类似，但是比 more 更好的是，他可以往前翻页！
### head
只看头几行
```bash
head [-n number] 文件
```
默认的情况中，显示前面 10 行！若要显示前 20 行，就得要这样：
```bash
[root@www ~]# head -n 20 /etc/man.config
```
### tail
只看尾巴几行
```bash
tail [-n number] 文件
```
### touch
创建文件，当然也可以使用vim来创建文件。

## 系统

### chown (change owner)
修改所属用户与组。

```bash
chown [–R] 所有者 文件名
chown [-R] 所有者:属组名 文件名
```

### chmod (change mode)
修改用户的权限。

```bash
chmod [-R] xyz 文件或目录
```
选项与参数：

- xyz : 就是刚刚提到的数字类型的权限属性，为 rwx 属性数值的相加。
- -R : 进行递归(recursive)的持续变更，以及连同次目录下的所有文件都会变更

### grep
grep (global regular expression) 命令用于查找文件里符合条件的字符串或正则表达式。
grep 指令用于查找内容包含指定的范本样式的文件，如果发现某文件的内容符合所指定的范本样式，预设 grep 指令会把含有范本样式的那一列显示出来。若不指定任何文件名称，或是所给予的文件名为 -，则 grep 指令会从标准输入设备读取数据。

```bash
grep [options] pattern [files]
或
grep [-abcEFGhHilLnqrsvVwxy][-A<显示行数>][-B<显示列数>][-C<显示列数>][-d<进行动作>][-e<范本样式>][-f<范本文件>][--help][范本样式][文件或目录...]
```
- pattern - 表示要查找的字符串或正则表达式。
- files - 表示要查找的文件名，可以同时查找多个文件，如果省略 files 参数，则默认从标准输入中读取数据。

常用选项：：
- -i：忽略大小写进行匹配。
- -v：反向查找，只打印不匹配的行。
- -n：显示匹配行的行号。
- -r：递归查找子目录中的文件。
- -l：只打印匹配的文件名。
- -c：只打印匹配的行数。

```bash
grep -i "the" demo_file              //在文件中查找字符串(不区分大小写)

grep -A 3 -i "example" demo_text     //输出成功匹配的行，以及该行之后的三行

grep -r "ramesh" *                   //在一个文件夹中递归查询包含指定字符串的文件
```
### find

find 命令用于在指定目录下查找文件和目录。

```bash
find [路径] [匹配条件] [动作]
```

参数说明:

1. 路径是要查找的目录路径，可以是一个目录或文件名，也可以是多个路径，多个路径之间用空格分隔，如果未指定路径，则默认为当前目录。

2. expression 是可选参数，用于指定查找的条件，可以是文件名、文件类型、文件大小等等。

匹配条件 中可使用的选项有二三十个之多，以下列出最常用的部份：

- -name pattern：按文件名查找，支持使用通配符 * 和 ?。
- -type type：按文件类型查找，可以是 f（普通文件）、d（目录）、l（符号链接）等。
- -size [+-]size[cwbkMG]：按文件大小查找，支持使用 + 或 - 表示大于或小于指定大小，单位可以是 c（字节）、w（字数）、b（块数）、k（KB）、M（MB）或 G（GB）。
- -mtime days：按修改时间查找，支持使用 + 或 - 表示在指定天数前或后，days 是一个整数表示天数。
- -user username：按文件所有者查找。
- -group groupname：按文件所属组查找。

3. 动作，可选的，用于对匹配到的文件执行操作，比如删除、复制等。

查找当前目录下名为 file.txt 的文件：

```bash
find . -name file.txt
```

将当前目录及其子目录中的所有文件列出：

```bash
# find . -type f
```

这个例子中，-exec 选项允许你执行一个命令，{} 将会被匹配到的文件名替代，\; 表示命令结束。

```bash
find /path/to/search -name "pattern" -exec rm {} \;
```

假设你要在当前目录下查找所有包含"bsc-department-v2"的JSON文件，可以执行以下命令：
```bash
find . -type f -name "*.json" -exec grep -l "bsc-department-v2" {} +
```

### find结合grep
你可以使用find命令结合grep来实现查找指定文件的目的。假设你要在当前目录下查找所有包含"bsc-department-v2"的JSON文件，可以执行以下命令：

这个命令的含义是：

- find .: 在当前目录及其子目录下查找。
- -type f: 限定搜索结果为文件（而非目录）。
- -name "*.json": 指定文件名为以.json结尾的文件。
- -exec grep -l "bsc-department-v2" {} +: 对搜索到的文件执行grep命令，查找包含"bsc-department-v2"的内容，并打印包含该内容的文件名。

这个命令会列出所有包含"bsc-department-v2"内容的JSON文件。