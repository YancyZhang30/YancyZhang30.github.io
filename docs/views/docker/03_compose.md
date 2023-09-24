

## 简介
- 用于定义和运行多容器Docker应用程序的工具。
- 使用YAML文件来配置应用程序的服务。
- 一条命令即可创建并启动所以服务。

![pPTIHtf.png](https://z1.ax1x.com/2023/09/24/pPTIHtf.png)
上图中各应用之间的关联关系，就是docker compose需要解决的问题。

`docker-compose.yaml`配置文件来配置。

## 使用
Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。

Compose 使用的三个步骤：

- 使用 Dockerfile 定义应用程序的环境。

- 使用 docker-compose.yml 定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。

- 最后，执行 docker-compose up 命令来启动并运行整个应用程序。

## 实例

```yaml
version: "3.0"

services:
  page-decorate:
    image: retailo2oimages.tencentcloudcr.com/frontend/page-decorate:fe096f3a500a0273e242b1f9a3af33eeca57c9dd
    container_name: page-decorate
    user: "1000:100"
    environment:
      NODE_ENV: development
      APP_NAME: page-decorate
      APP_DB_URI: "mongodb://10.250.14.82:27017/page_decorate"
      APP_PUBLIC_URL_PREFIX: "https://cjy-testfront.retailo2o.com/decorate-publish"
      APP_ADMIN_URL_PREFIX: "https://cjy-testfront.retailo2o.com/decorate-admin"
      APP_COMPILER_VUE_BASE_URL: "http://cjy-decorateneibu.retailo2o.com/compiler/vue/"
      APP_STATIC_PUBLIC_PREFIX: "https://cjy-testfront.retailo2o.com/decorate-publish"
      # APP_SSO_API_BASE: "http://test.site.retailo2o.com/"
      APP_SSO_API_BASE_NEW: "http://testcjy-backend.retailo2o.com"
      APP_ADMIN_LOGIN_URL: "https://cjy-testfront.retailo2o.com/rmc/"
    ports:
      - "3100:3000"
    volumes:
      - /data/build/decorate/build:/data/page-decorate/build
      - /data/logs/frontend/page-decorate:/data/web/app/dist/log
    extra_hosts:
      # - "test.site.retailo2o.com:10.250.14.80"
      - "testcjy-backend.retailo2o.com:10.250.14.254"
      - "cjy-decorateneibu.retailo2o.com:10.250.14.82"
    networks:
      - proxy
    restart: on-failure

  decorate-compiler-vue:
    image: retailo2oimages.tencentcloudcr.com/frontend/decorate-compiler-vue:427fbcb30881d76ed714e40cbabcd5a1513a2057
    container_name: decorate-compiler-vue
    user: "1000:100"
    environment:
      NODE_ENV: development
      APP_NAME: decorate-compiler-vue
      APP_ST_DOMAIN: "cjy-testfront.retailo2o.com/st"
      APP_BACKEND_DOMAIN: "testcjy-backend.retailo2o.com"
      APP_FRONT_DOMAIN: "cjy-testfront.retailo2o.com"
    ports:
      - "3101:3000"
    volumes:
      - /data/page-decorate/resources/decorate-components-vue:/data/resources/decorate-components-vue
      - /data/logs/frontend/decorate-compiler-vue:/data/web/app/dist/log
    networks:
      - proxy
    restart: on-failure

  page-decorate-builder:
    image: retailo2oimages.tencentcloudcr.com/frontend/page-decorate-builder:8318e4b0e1fdf9e5d6a2495560925514534db80d
    container_name: page-decorate-builder
    user: "1000:100"
    environment:
      NODE_ENV: development
      APP_NAME: page-decorate-builder
      PORT: 3000
      APP_ENGINE_BASE: "http://cjy-decorateneibu.retailo2o.com"
    ports:
      - "3102:3000"
    volumes:
      - /data/logs/frontend/page-decorate-builder:/data/web/app/log
    extra_hosts:
      - "cjy-decorateneibu.retailo2o.com:10.250.14.82"
    networks:
      - proxy
    restart: on-failure

networks:
  proxy:
    ipam:
      config:
      - subnet: 172.30.20.0/24
```