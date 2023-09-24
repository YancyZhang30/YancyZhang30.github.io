## 容器化
![pPTIw6J.png](https://z1.ax1x.com/2023/09/24/pPTIw6J.png)

## Dockerfile
Dockerfile是一个文本文件，内容是一条一条的指令，每条指令构建一层，因此每条指令的内容，就是描述该层应当如何构建。

有了Dockerfile，我们只需要简单地运行一个命令，就可以一键构建出整个容器，包括操作系统、库、环境变量等各种配置。
### FROM
FROM 表示设置要制作的镜像基于哪个镜像，FROM指令必须是整个Dockerfile的第一个指令，如果指定的镜像不存在默认会自动从Docker Hub上下载。

```bash
FROM <image>
FROM <image>:<tag>
FROM <image>@<digest>

FROM node:latest
```

### MAINTAINER
作者信息。

```bash
MAINTAINER <name>

MAINTAINER zhangsan shuaige@example.com
```
### RUN
构建镜像执行的命令。
```bash
RUN <命令行命令>

RUN mkdir -p ./index
```
<命令行命令> 指的就是 在终端输入的shell指令。
exec格式：
```bash
RUN ["可执行文件", "参数1", "参数2"]
```
这里可以把 ”可执行文件“ 理解成一个可接受参数的执行文件，”参数1“、”参数2“ 顾名思义是给执行文件的具体传参。

:::tip
Dockerfile中每个指令都会新建立一层，多个RUN指令就构建多少层镜像，这就会导致镜像冗余，增加部署的时间不说，还容易出错。
:::

```bash
RUN yum -y install wget \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && tar -xvf redis.tar.gz
```

从例子中可以看出，需要书写多行命令时，命令与命令之间用\ 换行 &&来进行拼接。这样执行之后，只会产生一层镜像。

### COPY
复制命令。将上下文目录中的文件都copy到container（运行此镜像的容器）文件系统的文件夹下。
```bash
COPY <源路径>...  <目标路径>

或

COPY ["<源路径>",...  "<目标路径>"]
```

源路径：源文件或源目录。 目标路径：容器内指定路径，路径不存在会被自动创建。

```bash
COPY ./index /crawler_node/index
```

这里源路径为./index，目标路径为/crawler_node/index。

### ADD
将本地文件添加到容器, ADD的功能与COPY类似，都是将本地文件复制到容器中，都会自动创建容器目录。

不同点在于:
1. ADD可以将tar类型（压缩格式为gzip、bzip2以及xz）的文件自动解压；而COPY不会
2. ADD可以加载网络资源，但不会自动解压；COPY不能访问网络资源

```bash
ADD ./bin/* /usr/bin
```

将当前目录下的bin文件夹内所有不带后缀的文件拷贝到/usr/bin目录下。

### CMD
当容器启动所运行的命令。

这时候小伙伴可能有疑问了，RUN不也是用于运行程序的指令吗，CMD和RUN有啥区别？

区别在于**CMD是启动容器时用到的指令，而RUN是构建镜像需要的指令。换句话说，先用RUN命令构建镜像，镜像构建成功后，需要用CMD来将新构建的镜像进行启动，有点类似于npm run serve。**

CMD格式与RUN相类似，也是两种格式:
```bash
shell 格式：CMD <命令>

exec 格式：CMD ["可执行文件", "参数1", "参数2"...]

参数列表格式：CMD ["参数1", "参数2"...]。在指定了 ENTRYPOINT 指令后，用 CMD 指定具体的参数。
```
例如：
```bash
CMD ["node", "index.js"]
```

### ENV
设置环境变量。
```bash
ENV <key> <value>
```
定义了环境变量，后续就可以使用这个环境变量的值。
```bash
ENV HOST 0.0.0.0
ENV PORT 8081
```
后续使用$HOST就能引用到0.0.0.0的值

### EXPOSE
监听端口。
用于为容器开放要监听的端口，以实现与外部的通信。
```bash
EXPOSE 8081
```
这样会将端口号8081暴露出来。
### ENTRYPOINT
容器启动时执行的命令。

ENTRYPOINT命令和CMD很像，ENTRYPOINT也有两种格式，shell格式和exec格式，它们的用法与CMD相同。
如果dockerfile中有多个ENTRYPOINT指令，只有最后一个会生效。如果docker run命令中指定了--entrypoint选项，那么dockerfile中的ENTRYPOINT会被覆盖。

CMD和ENTRYPOINT可以结合使用，这样CMD的内容会作为ENTRYPOINT的参数传递。例如，如果dockerfile中有如下指令：
```bash
ENTRYPOINT ["ping"]
CMD ["www.baidu.com"]
```

那么容器启动时会执行ping www.baidu.com这个命令。
如果docker run命令中指定了其他参数，如docker run myimage www.google.com，那么容器启动时会执行ping www.google.com这个命令，覆盖了dockerfile中的CMD。
如果dockerfile中有多个CMD指令，那么只有最后一个会生效。

### VOLUME
用于在image中创建一个挂载目录，以挂载宿主机上的目录。

通过dockerfile的 VOLUME 指令可以在镜像中创建挂载点，这样只要通过该镜像创建的容器都有了挂载点，但值得注意的是通过 VOLUME 指令创建的挂载点，无法指定主机上对应的目录，而是自动生成的。

[https://www.cnblogs.com/Json1208/p/8975403.html](https://www.cnblogs.com/Json1208/p/8975403.html)
```bash
VOLUME ["/data"]
```
数据卷。

VOLUME 命令会创建一个可以从本地主机或其他容器挂载的挂载点，与-v选项一样。

### LABEL
LABEL和MAINTAINER相类似，也可以添加一些作者的信息。通过LABEL可以为镜像添加一些元数据，格式如下：
```bash
LABEL <key>=<value> <key>=<value> ...
```
```bash
LABEL version="1.0"
LABEL author="萧瑟"
LABEL description="这是一个demo"
```

### WORKDIR
指定工作区。
```bash
WORKDIR <工作区目录>
```
WORKDIR指令的作用就是用来指定工作目录，如果目录不存在，该命令会自动创建目录。

## 容器的使用
### 获取镜像
如果我们本地没有 ubuntu 镜像，我们可以使用 docker pull 命令来载入 ubuntu 镜像：
```bash
$ docker pull ubuntu
```
### 启动容器
以下命令使用 ubuntu 镜像启动一个容器，参数为以命令行模式进入该容器：
```bash
$ docker run -it ubuntu /bin/bash
```
参数说明：
- -i: 交互式操作。
- -t: 终端。
- ubuntu: ubuntu 镜像。
- /bin/bash：放在镜像名后的是命令，这里我们希望有个交互式 Shell，因此用的是 /bin/bash。

要退出终端，直接输入 exit:
```bash
root@ed09e4490c57:/# exit
```
### 启动已停止运行的容器
```bash
$ docker ps -a
```
![docker](https://www.runoob.com/wp-content/uploads/2016/05/docker-container-psa.png)
启动已经停止的容器：
```bash
$ docker start b750bbbcfd88
```
### 后台运行
在大部分的场景下，我们希望 docker 的服务是在后台运行的，我们可以过 -d 指定容器的运行模式。
```bash
$ docker run -itd --name ubuntu-test ubuntu /bin/bash
```
注：加了 -d 参数默认不会进入容器，想要进入容器需要使用指令 docker exec（下面会介绍到）。

### 停止容器
```bash
$ docker stop <容器 ID>
```
停止的容器可以通过 docker restart 重启：
```bash
$ docker restart <容器 ID>
```
### 进入容器
在使用 -d 参数时，容器启动后会进入后台。此时想要进入容器，可以通过以下指令进入：

- docker attach

- docker exec：推荐大家使用 docker exec 命令，因为此命令会退出容器终端，但不会导致容器的停止。

```bash
docker exec -it 243c32535da7 /bin/bash
```

### 导入导出容器
如果要导出本地某个容器，可以使用 docker export 命令。
```bash
$ docker export 1e560fca3906 > ubuntu.tar
```
导出容器 1e560fca3906 快照到本地文件 ubuntu.tar。

可以使用 docker import 从容器快照文件中再导入为镜像，以下实例将快照文件 ubuntu.tar 导入到镜像 test/ubuntu:v1:
```bash
$ cat docker/ubuntu.tar | docker import - test/ubuntu:v1
```
此外，也可以通过指定 URL 或者某个目录来导入，例如：
```bash
$ docker import http://example.com/exampleimage.tgz example/imagerepo
```

### 删除容器
删除容器使用 docker rm 命令：
```bash
$ docker rm -f 1e560fca3906
```