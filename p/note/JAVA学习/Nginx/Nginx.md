My Note
-------- 
> Nginx

##### centos上安装

[安装教程](http://www.xuefeng666.com/CentOS/CentOS/#nginx%E9%83%A8%E7%BD%B2)
安装nginx的依赖
```
yum -y install gcc-c++  
yum -y install pcre pcre-devel  
yum -y install zlib zlib-devel  
yum -y install openssl openssl--devel
```
下载Nginx并解压
```
wget -c https://nginx.org/download/nginx-1.14.0.tar.gz
tar -zxvf nginx-1.14.0.tar.gz
```

使用默认配置
```
cd nginx-1.14.0
./configure
```
编译安装
```
make
make install
```
找到nginx路径启动
```
whereis nginx
结果：/usr/local/nginx

cd /usr/local/nginx/sbin/
./nginx :启动
./nginx -s stop：此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程
./nginx -s quit：此方式停止步骤是待nginx进程处理任务完毕进行停止。
./nginx -s reload：重启
```
##### 简单入门

[文章参考](https://mp.weixin.qq.com/s?__biz=MzAxODcyNjEzNQ==&mid=2247486373&idx=1&sn=ce04b0b112af2c8c230d824040894f0f&chksm=9bd0a63daca72f2b5b85d993ed0c22aaa9ef4823a681f490084ed7ea1874a84383ba845f76aa&mpshare=1&scene=1&srcid=0105qacVsG1LFbUzOQxflwSf#rd)

功能：1.[反向代理](https://www.cnblogs.com/Anker/p/6056540.html) 2.负载均衡 3.HTTP服务器（动静分离）4.正向代理


下面的代码是部署在服务器的配置，与生成的文件相比，只改动了location，/HelloWorld被代理到tomcat的8080，/node被代理到node的8082端口，location /下可以认为是静态资源服务器寻找资源文件
```

#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       80;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        location / {
            root   html;
            index  index.html index.htm;
        }
	
		location /HelloWorld {
		    proxy_pass http://129.204.95.10:8080;
	  	    proxy_set_header Host $host:$server_port;
		}

		location /node {
		    proxy_pass http://localhost:8082;
		    proxy_set_header Host $host:$server_port;
		}

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

```