# Config files for  `domain.example.com`

These are the necessary config files for Mapic Engine server. You can run this on your own domain, simply replace `domain.example.com` with your own domain. (It does not need to be a subdomain.)



## Mauaul install
1. Clone repo to `/dockerized/config/` folder in [`dockerized`](https://github.com/mapic/dockerized) root.
2. Make sure config folder is named `domain.example.com`.
3. Set ENV variable `MAPIC_DOMAIN` to `domain.example.com`: `export MAPIC_DOMAIN=domain.example.com`
4. Update the config files (see overview below).

## Overview 

| Config file                                 |        Purpose            |   What to update
| --------------------------------------------|---------------------------|-------------------------------| 
| domain.example.nginx.conf                   | NginX server config       |   Domain names                |
| mongo.json                                  | MongoDB settings          |   MongoDB access details      |
| mongod.conf                                 | MongoDB config            |   Nothing, defaults good      |
| redis.layers.conf                           | Redis config              |   Access details              |
| redis.stats.conf                            | Redis config              |   Access details              |
| redis.temp.conf                             | Redis config              |   Access details              |
| redis.tokens.conf                           | Redis config              |   Access details              |
| engine.config.js                            | Redis config              |   Access details              |
| mile.config.js                              | Mile config               |   Mongo/redis access details  |
| ssl_certificate.key                         | SSL Certificate           |   Create your own             | 
| ssl_certificate.pem                         | SSL Certificate           |   Create your own             |
| dhparams.pem                                | DH params for SSL         |   Nothing (auto-generated)    |
| env.sh                                      | PostGIS settings          |   PostGIS access details      | 
| nginx.conf -> domain.example.com.nginx.conf | Symlink to nginx config   |   Point to nginx config       |


## DNS
Quite a few DNS entries are needed. (This is due to limitations on parallel concurrent connections allowed in modern browsers, which means when requesting tiles, there's a major speedup if requesting from several subdomains.)

There are three different endpoints which make a lot of requests: `tiles`, `proxy` and `grid`. 

| Name/host/alias         | TTL |  Type | IP/value      |
--------------------------|-----|-------|---------------|
| domain.example.com.     | 600 |   A   | 85.10.202.87  |
|                         |     |       |               |
| tiles-a.example.com.    | 600 |   A   | 85.10.202.87  |
| tiles-b.example.com.    | 600 |   A   | 85.10.202.87  |
| tiles-c.example.com.    | 600 |   A   | 85.10.202.87  |
| tiles-d.example.com.    | 600 |   A   | 85.10.202.87  |
|                         |     |       |               |
| proxy-a.example.com.    | 600 |   A   | 85.10.202.87  |
| proxy-b.example.com.    | 600 |   A   | 85.10.202.87  |
| proxy-c.example.com.    | 600 |   A   | 85.10.202.87  |
| proxy-d.example.com.    | 600 |   A   | 85.10.202.87  |
|                         |     |       |               |
| grid-a.example.com.     | 600 |   A   | 85.10.202.87  |
| grid-b.example.com.     | 600 |   A   | 85.10.202.87  |
| grid-c.example.com.     | 600 |   A   | 85.10.202.87  |
| grid-d.example.com.     | 600 |   A   | 85.10.202.87  |

Set all these DNS records pointing to your publicly available server IP, and you should be good to go.