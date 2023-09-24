## 简介
Docker是一个用于构建（build）、运行（run）和传送（share）应用程序的平台。

常见问题：
1. 应用程序的部署和开发环境配置的复杂费时间。
2. 程序在开发环境好用，但是测试或者生产环境却存在很多问题。
3. 新同事加入项目组需要花费大量的时间来配置开发环境，可能会遇到很多问题。

![pPThDmt.png](https://z1.ax1x.com/2023/09/24/pPThDmt.png)

从Docker的Logo可以看出，Docker会将我们的应用程序Ubuntu、Nginx、Redis……打包成一个个“集装箱”，然后可以“运输”
到任何我们需要部署的地方，这样就保证了在任何环境中，都可以像在开发环境一样，正确运行。

![pPTh0OI.png](https://z1.ax1x.com/2023/09/24/pPTh0OI.png)

## 为什么要使用Docker?
![pPThw6A.png](https://z1.ax1x.com/2023/09/24/pPThw6A.png)
现在我们有一个网站项目，使用到的技术如上图所示，如果要在本地开发，那么我们就需要配置一系列的环境和依赖。
![pPThaSH.png](https://z1.ax1x.com/2023/09/24/pPThaSH.png)
这样我们才可以在本地开发网站并调试，如果是更大规模的项目，甚至还需要Redis缓存、Nginx负载均衡等等。

这样我们配置本地开发环境，已经花费了不少时间，如果我们开发完成之后，需要将网站部署到测试或者生产环境上，那么
上述的配置步骤，还要再在测试或者生产的服务器上再来一次，😵‍💫。

而有了Docker之后，我们只需要将这些配置打包成一个个“集装箱”，当其他环境需要部署时，直接将这些集装箱“运输”到
对应的环境即可，这样如果开发环境是没问题的，那么生产或者测试环境肯定也是没问题的，😄。
![pPT43cj.png](https://z1.ax1x.com/2023/09/24/pPT43cj.png)

## Docker与虚拟机区别
![pPT4rv9.png](https://z1.ax1x.com/2023/09/24/pPT4rv9.png)
通过虚拟机，我们可以在windows系统中安装和使用linux系统，虚拟机中的系统是完整的系统，就和我们日常使用的一样，只不过
是我们在虚拟机中运行了他们，这就是“虚拟化”技术。
![pPT4yuR.png](https://z1.ax1x.com/2023/09/24/pPT4yuR.png)
虚拟机在一定程度上实现了资源的整合，可以将一台服务器的计算、存储、网络资源分配给多个逻辑服务器，实现多台服务器的功能。

但是虚拟机的缺点也十分明显，每台虚拟机都要占用大量的资源，例如CPU、内存、硬盘、网络等，并且启动速度也十分的慢，一般都
要几分钟甚至几十分钟。
![pPT4Hbt.png](https://z1.ax1x.com/2023/09/24/pPT4Hbt.png)

我们有时候可能只需要一个web服务器，但是虚拟机却给我们了一个完整的操作系统，包括操作系统的内核，图像界面等等，但是我们并不需要这些。

## 容器（Container）
Docker和容器是两个不同的概念，由于Docker非常的流行，但是Docker只是容器的一种实现，是一个容器化的方案和解决平台，而容器是一种虚
拟化技术，和虚拟机类似，也是一个独立的环境，但是它并不需要在容器中运行一个完整的操作系统，而是使用宿主机的操作系统，所以启动速度非
常快，并且需要的资源更少，所以一台物理服务器上可以运行上百个容器。
![pPTIO1g.png](https://z1.ax1x.com/2023/09/24/pPTIO1g.png)

## 基本原理和概念

### 体系结构
- Docker Engine：Docker引擎，是一个C/S架构的应用程序，它包含了一系列的命令行工具，比如docker、dockerd、docker-compose、docker-machine、- docker-swarm等。
- Docker Client：Docker客户端，是一个命令行工具，用来发送命令给Docker引擎，比如docker run、docker pull、docker build等。
- Docker Daemon：Docker守护进程，是一个后台进程，用来接收并处理来自Docker客户端的请求，然后将结果返回给Docker客户端。
![pPTIYkV.png](https://z1.ax1x.com/2023/09/24/pPTIYkV.png)

### 重要概念
- Docker镜像（Image）：镜像是一个只读的模板，可以用来创建容器；
- Docker容器（Container）：容器是镜像的运行实例，它是一个独立的环境，可以在这个环境中运行应用程序，一个镜像可以创建多个容器；
- Docker仓库（Repository）：Docker仓库是用来存储Docker镜像的地方，比如DockerHub，我们可以在这里下载各种镜像，也可以将自己的镜像上传到这里。

[GeekerHour - Docker教程](https://geekhour.net/2023/04/25/Docker/)