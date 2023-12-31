# shell，cmd，dos，脚本语言之间的关系

## shell
操作系统可以分成核心（kernel）和Shell（外壳）两部分，其中，Shell是操作系统与外部的主要接口，位于操作系统的外层，为用户提供与操作系统核心沟通的途径。

Shell是一个命令解释器(也是一种应用程序)，处于内核和用户之间，负责把用户的指令传递给内核并且把执行结果回显给用户。同时，shell也可以作为一门强大的编程语言。

Shell分为图形界面shell和命令行shell两大类，如Windows的资源管理器explorer.exe和cmd命令窗口。不同系统有不同的shell，如bash、C shell、windows power shell 等等；在linux系统中，通常是Bourne Again shell ( 即bash)。

## dos与windows中cmd区别
在windows系统中见到的桌面即explorer.exe（资源管理器）是图形shell，而cmd就是命令行shell，而dos本身就是一个系统，这算是cmd与dos的最大区别：一个只是接口、一个是操作系统。

只是cmd中的某些命令和dos中的命令相似，因此很多人把二者混为一谈。cmd属于windows系统的一部分，dos本身就是一个系统，在dos系统下可以删除，修复windows系统，而在cmd下则不行。

## linux shell（即bash）和windows cmd区别
在linux/unix平台上，Shell有多种实现，目前多数Linux发行版本默认是bash，即Bourne Again shell。

在Windows平台上，cmd是Command shell的简写，是一个独立的应用程序，它为用户提供对操作系统直接通信的功能，它为基于字符的应用程序和工具提供了非图形界面的运行环境，它执行命令并在屏幕上回显MS-DOS风格的字符。所以，可以近似地认为linux shell=bash而windows shell=cmd，都是命令行解释器，都是用户与操作系统的交互接口。

但是bash要比cmd强大很多，windows也有强大的shell叫windows power shell。psWindows系统接受shell命令的程序是cmd命令行窗口；而Linux发行版ubuntu中对应的程序是terminal终端。

## 脚本语言和编程语言区别
编程语言“编写-编译-链接-运行”（编译型），脚本语言是“解释-执行”（解释型）。脚本语言的程序代码即使最终的可执行文件，通过对应的解释器解释执行即可，所以更方便快捷。每种脚本语言都需要其对应的解释器。如Perl、Python、Ruby、JavaScript等都是脚本语言，shell也属于一种比较特殊的脚本语言。
