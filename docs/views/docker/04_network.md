当项目大规模使用 Docker 时，容器通信的问题也就产生了。要解决容器通信问题，必须先了解很多关于网络的知识。Docker 作为目前最火的轻量级容器技术，有很多令人称道的功能，如 Docker 的镜像管理。

然而，Docker 同样有着很多不完善的地方，网络方面就是 Docker 比较薄弱的部分。因此，我们有必要深入了解 Docker 的网络知识，以满足更高的网络需求。

### 默认网络
安装 Docker 以后，会默认创建三种网络，可以通过 docker network ls 查看。
```bash
[root@localhost ~]# docker network ls
NETWORK ID          NAME                DRIVER              SCOPE
688d1970f72e        bridge              bridge              local
885da101da7d        host                host                local
f4f1b3cf1b7f        none                null                local
```
![network](https://pic2.zhimg.com/80/v2-a1bcf59f6b7731dfe355a28d29bf2f29_720w.webp)

## bridge网络模型
在该模式中，Docker 守护进程创建了一个虚拟以太网桥 docker0，新建的容器会自动桥接到这个接口，附加在其上的任何网卡之间都能自动转发数据包。

默认情况下，守护进程会创建一对对等虚拟设备接口 veth pair，将其中一个接口设置为容器的 eth0 接口（容器的网卡），另一个接口放置在宿主机的命名空间中，以类似 vethxxx 这样的名字命名，从而将宿主机上的所有容器都连接到这个内部网络上。

比如我运行一个基于 busybox 镜像构建的容器 bbox01，查看 ip addr：
::: tip
busybox 被称为嵌入式 Linux 的瑞士军刀，整合了很多小的 unix 下的通用功能到一个小的可执行文件中。
:::

## 网段冲突
docker安装以后会在主机上创建一个虚拟网卡-docker0，而我们启动的容器host网络以外，其他的都是通过docker0这个虚拟网卡经过物理网卡与外部通信的。这个虚拟网卡本身会有一个网段，一般是`172.17.x.x`，所以问题就明确了，因为docker0占用了这个网段，导致主机无法访问真是的网段机器。

私网地址是：
- A类地址：10.0.0.0～10.255.255.255
- B类地址：172.16.0.0 ～172.31.255.255
- C类地址：192.168.0.0～192.168.255.255

注意局域网段如果是172.16～172.31，需要设置docker-compose子网

```bash
networks:
  proxy:
    ipam:
      config:
      - subnet: 172.30.20.0/24
```

networks的参数ipam即网络管理，其下还有driver参数即指定使用的网络模式，以及config配置参数（比如配置子网等）。

```bash
mynetwork1:
  ipam:
    driver: bridge
mynetwork2:
  ipam:
    driver: default
    config:
    - subnet: 172.16.238.0/24
```