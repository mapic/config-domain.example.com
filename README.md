# Config files for  `domain.example.com`

These are the necessary config files for Mapic Engine server. You can run this on your own domain, simply replace `domain.example.com` with your own domain. (It does not need to be a subdomain.)

## Install
1. Clone repo to `mapic/config/` folder in the [`mapic`](https://github.com/mapic/mapic) root.
2. Make sure the config folder is named `domain.example.com`.
3. [Set ENV variable](https://www.schrodinger.com/kb/1842) `MAPIC_DOMAIN` to `domain.example.com`.
4. Update the necessary config files (see list below).
5. Add DNS entries.
6. Start your engines! `./restart-mapic.sh`

## List of config files 

| Config file                                 |        Purpose            |   What to update
| --------------------------------------------|---------------------------|-------------------------------| 
| domain.example.com.nginx.conf               | NginX server config       |   Domain name                 |
| mongo.json                                  | MongoDB settings          |   MongoDB access details      |
| redis.layers.conf                           | Redis config              |   Access details              |
| redis.stats.conf                            | Redis config              |   Access details              |
| redis.temp.conf                             | Redis config              |   Access details              |
| redis.tokens.conf                           | Redis config              |   Access details              |
| engine.config.js                            | Engine config             |   Access details, domain name |
| mile.config.js                              | Mile config               |   Mongo/redis access details  |
| env.sh                                      | PostGIS settings          |   PostGIS access details      | 
|                                             |                           |                               |
| mongod.conf                                 | MongoDB config            |   Nothing, defaults good      |
| ssl_certificate.key                         | SSL Certificate           |   Create your own             | 
| ssl_certificate.pem                         | SSL Certificate           |   Create your own             |
| dhparams.pem                                | DH params for SSL         |   Nothing (auto-generated)    |
| nginx.conf -> domain.example.com.nginx.conf | Symlink to nginx config   |   Point to nginx config       |


## DNS configuration
Quite a few DNS entries are needed. (This is due to limitations on parallel concurrent connections allowed in modern browsers, which means when requesting tiles, there's a major speedup if requesting from several subdomains.)

You need to set the following DNS entries. The subdomains can be named whatever, but the routes must be added to [`engine.config.js`](https://github.com/mapic/config-domain.example.com/blob/master/engine.config.js#L222).

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
