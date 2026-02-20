sudo docker logs wechat-mp > /home/ec2-user/wechat-mp/logs/wechat-mp.log  2>&1
gzip /home/ec2-user/wechat-mp/logs/wechat-mp.log
mv /home/ec2-user/wechat-mp/logs/wechat-mp.log.gz /home/ec2-user/wechat-mp/logs/$(date +%Y%m%d_%H%M%S).log.gz
