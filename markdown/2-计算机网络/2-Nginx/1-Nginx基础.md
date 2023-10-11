# Nginx学习整理

Nginx(engine x)是一个高性能的**HTTP和反向代理web服务器**，同时也提供了IMAP/POP3/SMTP服务。

Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，在BSD-like 协议下发行。其特点是占有内存少，并发能力强，事实上nginx的并发能力在同类型的网页服务器中表现较好。

由塞索耶夫为俄罗斯访问量第二的Rambler.ur站点开发的，nginx是Apache服务不错的替代品。

大学尝试过使用apache，但是公司是使用的Nginx，并且感觉Nginx也更加的轻量，所以准备学习一下Nginx。

## 安装

windows

官网下载安装：http://nginx.org/en/download.html

linux

```bash
yum -y install make zlib zlib-devel gcc-c++ libtool openssl openssl-devel
```

## 命令

在根目录下，打开cmd。

### 查看版本

`nginx -v`

### 启动

`start nginx`获取`nginx.exe`

Nginx默认监听的端口号是80，因此需要确保80端口没有被其他程序占用。

在浏览器中输入`localhost`或`127.0.0.1`，会出现一个页面提示`Welcome to nginx!`，即表示Nginx安装并启动成功。

### 快速停止

`nginx -s stop`

### 完整有序停止

`nginx -s quit`

### 重载

`nginx -s reload`

# 配置

![](https://pic1.zhimg.com/80/v2-a07d2e7ca774044a61629d6121f27a1c_720w.webp)

nginx.conf由多个块组成，最外面的块是main，main包含Events和HTTP，HTTP包含upstream和多个Server，Server又包含多个location。

## 全局块

该部分配置主要影响Nginx全局，通常包括下面几个部分：

1. 配置运行Nginx服务器用户（组）`user user [group];`

   ```
   user：指定可以运行Nginx服务器的用户

   group：可选项，可以运行Nginx服务器的用户组

   如果user指令不配置或者配置为 user nobody nobody ，则默认所有用户都可以启动Nginx进程
   ```

2. worker process数 `worker_processes number | auto;`

3. Nginx进程PID存放路径 `pid file;`

   ```
   file：指定存放路径和文件名称

   如果不指定默认置于路径 logs/nginx.pid
   ```

4. 错误日志的存放路径 `error_log file | stderr;`

   ```
   file：日志输出到某个文件file

   stderr：日志输出到标准错误输出
   ```

5. 配置文件的引入 `include file;`

   该指令主要用于将其他的Nginx配置或者第三方模块的配置引用到当前的主配置文件中。

## events块

该部分配置主要影响Nginx服务器与用户的网络连接，主要包括：

1. 设置网络连接的序列化 `accept_mutex on | off;`

   ```
   该指令默认为on状态，表示会对多个Nginx进程接收连接进行序列化，防止多个进程对连接的争抢。

   说到该指令，首先得阐述一下什么是所谓的 “惊群问题”，可以参考 WIKI百科的解释。就Nginx的场景来解释的话大致的意思就是：当一个新网络连接来到时，多个worker进程会被同时唤醒，但仅仅只有一个进程可以真正获得连接并处理之。如果每次唤醒的进程数目过多的话，其实是会影响一部分性能的。

   所以在这里，如果accept_mutex on，那么多个worker将是以串行方式来处理，其中有一个worker会被唤醒；反之若accept_mutex off，那么所有的worker都会被唤醒，不过只有一个worker能获取新连接，其它的worker会重新进入休眠状态
   ```

2. 是否允许同时接收多个网络连接 `multi_accept on | off;`

   ```
   该指令默认为off状态，意指每个worker process 一次只能接收一个新到达的网络连接。

   若想让每个Nginx的worker process都有能力同时接收多个网络连接，则需要开启此配置
   ```

3. 事件驱动模型的选择 `use model;`

   ```
   model模型可选择项包括：select、poll、kqueue、epoll、rtsig等......
   ```

4. 最大连接数的配置 `worker_connections number;`

   ```
   number默认值为512，表示允许每一个worker process可以同时开启的最大连接数
   ```

## http块

1. 定义MIMI-Type

   ```
   include mime.types;

   default_type mime-type;

   MIME-Type指的是网络资源的媒体类型，也即前端请求的资源类型

   include指令将mime.types文件包含进来
   ```

2. 自定义服务日志 `access_log path [format];`

   ```
   path：自定义服务日志的路径 + 名称

   format：可选项，自定义服务日志的字符串格式。其也可以使用 log_format 定义的格式
   ```



3. 允许sendfile方式传输文件

   ```
   sendfile on | off;

   sendfile_max_chunk size;

   前者用于开启或关闭使用sendfile()传输文件，默认off

   后者指令若size>0，则Nginx进程的每个worker process每次调用sendfile()传输的数据了最大不能超出此值；若size=0则表示不限制。默认值为0

   连接超时时间配置
   ```

4. 连接超时时间 `keepalive_timeout timeout [header_timeout];`

   ```
   timeout 表示server端对连接的保持时间，默认75秒

   header_timeout 为可选项，表示在应答报文头部的 Keep-Alive 域设置超时时间：“Keep-Alive : timeout = header_timeout”
   ```

5. 单连接请求数上限 `keepalive_requests number;`

   ```
   该指令用于限制用户通过某一个连接向Nginx服务器发起请求的次数
   ```

## server块（属于http块）

server是一切的开始，代表一个代理的出现，里边两大配置项：listen监听接口和server_name监听的地址，里边还包括了location和其它配置项，当存在server的时候，nginx获取到的请求都会去匹配这些server(匹配其中的listen和server_name)。

1. 配置网络监听 `listen IP:PORT`

   ```
   第一种：配置监听的IP地址：listen IP[:PORT];

   第二种：配置监听的端口：listen PORT;

   listen 192.168.50.250:8080; #监听具体IP和端口上的链接

   listen 192.168.50.250; #监听IP上多有端口的链接

   listen 8080; #监听具体端口上的所有IP的链接
   ```

2. 基于名称的虚拟主机配置 `server_name name1 name2 ...`

   ```
   name可以有多个并列名称，而且此处的name支持正则表达式书写

   server_name ~^www\d+\.myserver\.com$

   此时表示该虚拟主机可以接收类似域名 http://www1.myserver.com 等的请求而拒绝 http://www.myserver.com 的域名请求，所以说用正则表达式可以实现更精准的控制
   ```

3. 基于IP的虚拟主机配置

## location块（属于server块）

指令格式为：`location [ = | ~ | ~* | ^~ ] uri {...}`

1. 请求根目录配置 `root path;`

   ```
   path：Nginx接收到请求以后查找资源的根目录路径
   ```

2. 更改location的URI `alias path; `

   ```
   path为修改后的根路径
   ```

3. 网站默认首页配置 `index file ......`

   ```
   file可以包含多个用空格隔开的文件名，首先找到哪个页面，就使用哪个页面响应请求
   ```



![](https://pic1.zhimg.com/80/v2-630dc25ba16f4c1549d207d5e0aeefe4_720w.webp)

# 常用功能-实战

https://zhuanlan.zhihu.com/p/624322044

## 虚拟主机

虚拟主机使用的是特殊的软硬件技术，它把一台运行在因特网上的服务器主机分成一台台“虚拟”的主机，每台虚拟主机都可以是一个独立的网站，可以具有独立的域名和完整的internet服务器功能，同一台主机上的虚拟主机之间是完全独立的。

一台服务器，装了一个nginx，可以跑多个网站，此方式就是虚拟主机。

原理都是通过配置多个server并修改server_name或者listen配置。

### 基于域名

### 基于ip

### 基于端口

## 反向代理

反向代理和正向代理的区别就是：正向代理代理客户端，反向代理代理服务器。

反向代理，其实客户端对代理是无感知的，因为客户端不需要任何配置就可以访问，我们只需要将请求发送到反向代理服务器，由反向代理服务器去选择目标服务器获取数据后，在返回给客户端，此时反向代理服务器和目标服务器对外就是一个服务器，暴露的是代理服务器地址，隐藏了真实服务器IP地址。

理解这两种代理的关键在于代理服务器所代理的对象是什么，正向代理代理的是客户端，我们需要在客户端进行一些代理的设置。而反向代理代理的是服务器，作为客户端的我们是无法感知到服务器的真实存在的。

### 为什么需要反向代理？

1. 提高访问速度：由于目标主机返回的数据会存放在代理服务器的硬盘中，因此下一次访问时，会直接读取，起到缓存作用。
2. 防火墙作用：由于目标主机返回的数据会存放在代理服务器的硬盘中，因此下一次访问时，会直接读取，起到缓存作用。
3. 翻墙：翻墙浏览器就是利用了代理服务器，不用出国也能直接访问外网。

### nginx反向代理配置

有时我们会使用一些java或node应用，但又不想让他们直接监听80端口，这时就需要用到端口转发，这也是最常用的反向代理场景。

```text
server{
  listen 80;
  server_name  localhost;
  index  index.php index.html index.htm;

  location /api {
    proxy_pass  http://127.0.0.1:3000; # 转发规则
    proxy_set_header Host $proxy_host; # 修改转发请求头，让3000端口的应用可以受到真实的请求
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

这样我们请求`http://localhost/.../api..`接口时，就会转发到3000端口，从而实现请求转发。

域名转发同理，修改proxy_pass即可。

> 当`proxy_pass`指令后面带有斜杠`'/'`时，表示将匹配到的URL完全传递给后端服务器进行处理。例如，如果`location /app/`和`proxy_pass http://backend;`，那么对于请求`http://yourdomain/app/path`，`nginx`会将完整的URL路径`/path`传递给后端服务器，后端服务器将根据实际情况进行处理，即`http://backend/path`。
>
> 而当`proxy_pass`指令后面没有斜杠时，表示将匹配到的URL与`location`指令中的路径进行合并然后传递给后端服务器。例如，如果`location /app/`和`proxy_pass http://backend;`，那么对于请求`http://yourdomain/app/path`，`nginx`会将路径`/path`与`location`的路径`/app/`合并，最终将`/app/path`传递给后端服务器。这样可以有效地重写URL路径，即`http://backend/app/path`。
>
> 因此，斜杠的有无会影响`proxy_pass`指令传递给后端服务器的URL路径的处理方式。选择是否带斜杠取决于具体需求和后端服务器的处理逻辑。

## 负载均衡

分摊到多个操作单元上进行执行。我们就要一个调度者(nginx)，保证所有后端服务器都能将性能充分发挥，从而保持服务器的整体性能最优，这就是负载均衡。

```
# 负载均衡
upstream test{
  server 192.168.0.110:8081 weight=2;
  server 192.168.0.111:8081 weight=3;
  server 192.168.0.112:8081 weight=1;
}

server {
    listen       80;
    server_name  localhost;

    location / {
        root   html;
        index  index.html index.htm;
        proxy_pass  http://www.test.com;    # 代理转发
    }
}
```



## 正向代理

正向代理是一个位于客户端和原始服务器之间的服务器，为了从原始服务器取得内容，客户端向代理发送一个请求并指定目标，然后代理向原始服务器转交请求并将获得的内容返回给客户端。客户端必须要进行一些特别的设置才能使用正向代理。

```text
server {
     listen 18088;
     resolver x.x.x.x valid=60s ipv6=off;
     resolver_timeout 30s;
     proxy_connect;
     proxy_connect_allow            443 80;
     proxy_connect_connect_timeout  30s;
     proxy_connect_read_timeout     30s;
     proxy_connect_send_timeout     30s;
      location / {
         proxy_pass $scheme://$http_host$request_uri;
         proxy_set_header Host $host;
     }
}
```

## rewrite

实现对URL的重写以及对url的重定向。

1. URL访问跳转，支持开发设计
   a.页面跳转 b.兼容性支持 c.展示效果
2. SEO优化
   SEO:搜索引擎优化
3. 维护
   a.后台维护 b.流量转发
4. 安全

`rewrite [正则表达式 替换前的URL][替换后的URL][标识flag];`

`rewrite ^(.*)$ /pages/maintain.html break; #把所有的请求都跳转至maintain.html页面,break是一个标识符`

flag是一个标识符,标识rewrite的类型

1. last:停止rewrite检测[如果没有匹配到，会继续向下匹配]
2. break:停止rewrite检测[如果没有匹配到,则不再向下匹配，直接返回404]
3. redirect:返回302临时重定向，地址栏会显示跳转后的地址
4. permanent:返回301永久重定向,地址栏会显示跳转后的地址

## 日志

 通过访问日志，可以得到用户地域来源，跳转来源，使用终端，某个URL访问量等相关信息。

通过错误日志，可以得到系统某个服务或server的性能瓶颈。