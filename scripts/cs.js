'use strict';

const handler = module.exports = {};

handler.response = (msg) => {
    if (msg.toLowerCase().startsWith('cs ssh')) {
        handler.envelop('# 将本地 3426 端口映射至 remote 22 端口，此时可 ssh 到此机器的 3426 端口，以实现以此机器作为跳板 ssh 到 remote 主机的效果\n' +
            '$ ssh -fNgL 3426:remote:22 root@remote -o ServerAliveInterval=30\n' +
            '\n' +
            '# 有一跳板机可访问内外网，通过外网端口，经跳板机，访问内网服务\n' +
            '# 可先将本地端口（如：3427）转发至内网服务（192.168.174.74:8888）上\n' +
            '$ ssh -fNgL 3427:192.168.174.74:8888 root@192.168.174.74 -o ServerAliveInterval=30\n' +
            '# 再将外网端口（如：3427，可不一样）转发至本地端口上，即可通过 remote:3427 访问 192.168.174.74:8888 的服务\n' +
            '$ ssh -fNgR 3427:localhost:3427 root@remote -o ServerAliveInterval=30\n' +
            '\n' +
            '# 在本地（local 主机）.ssh 路径生成公钥和私钥文件\n' +
            '$ ssh-keygen -t rsa\n' +
            '# 一路回车即可\n' +
            '$ ssh-copy-id -i ~/.ssh/id_rsa.pub user@remote');
    }
};