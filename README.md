微信公众平台服务
===============

本地运行
-------

1. 安装依赖
    ```bash
    $ npm i
    ```
2. 运行，服务启动在本地 8080 端口
    ```bash
    $ node wechat-mp-server.js
    ```
    
调试时，可参照 [内网穿透？试试 ngrok](https://alphahinex.github.io/2021/02/06/ngrok/) 中内容，使用 ngrok 将本地 8080 端口映射至外网地址，即可在 微信公众平台接口调试工具 中，调试本地服务。

或直接在本地，发送请求调试，如：

```bash
$ curl http://localhost:8080 \
-d '<xml><FromUserName>abc</FromUserName><ToUserName>def</ToUserName><MsgType>text</MsgType><Content>abc</Content></xml>'
```

服务端运行
---------

可将此服务通过 `nohup` 或 `screen` 等方式后台运行，启动后，通过 NGINX 等反向代理将服务器的 80 或 443 端口代理至此服务，并将 IP 或域名配置到微信公众号的服务器配置页，即可由此服务响应公众号收到的消息。

没有服务器？看看 [这里](https://alphahinex.github.io/2021/01/17/aws-free-tier/)。

有何功能？
--------

1. 能够正确响应微信公众平台发送的 Token 验证（此处仅正确响应，并未对 Token 进行验证）
1. 关注时回复欢迎消息
1. 回声功能：对任何发送给公众号的文本消息，回复 `<发送内容>, you said.`；其他类型的消息回复 `Not support yet.`
1. 十大 Hacker News：发送 `hn` 关键字，不区分大小写，回复当时 Hacker News RSS 中的前十条内容
1. 抽奖：发送带 `龙` 字的四字消息，根据关注时间（通过接口获得用户信息需公众号主体不能为个人），抽取随机金额

---

Suppored by 

[![JetBrains Logo (Main) logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.svg)](https://jb.gg/OpenSourceSupport)
