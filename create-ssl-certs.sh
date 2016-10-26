#!/bin/bash

# SUBDOMAIN=domain
# DOMAIN=example.com
# SUFFIX=tx
# EMAIL=hello@mapic.io
    
SUBDOMAIN=dev
DOMAIN=mapic.io
SUFFIX=tx
EMAIL=hello@mapic.io
    
# certbot-auto
./ssl certonly \
    --standalone \
    --agree-tos \
    --email "$EMAIL" \
    --hsts \
    --non-interactive \
    --domain "$SUBDOMAIN"."$DOMAIN"       \
    --domain proxy-"$SUFFIX"a."$DOMAIN"   \
    --domain proxy-"$SUFFIX"b."$DOMAIN"   \
    --domain proxy-"$SUFFIX"c."$DOMAIN"   \
    --domain proxy-"$SUFFIX"d."$DOMAIN"   \
    --domain tiles-"$SUFFIX"a."$DOMAIN"   \
    --domain tiles-"$SUFFIX"b."$DOMAIN"   \
    --domain tiles-"$SUFFIX"c."$DOMAIN"   \
    --domain tiles-"$SUFFIX"d."$DOMAIN"   \
    --domain grid-"$SUFFIX"a."$DOMAIN"    \
    --domain grid-"$SUFFIX"b."$DOMAIN"    \
    --domain grid-"$SUFFIX"c."$DOMAIN"    \
    --domain grid-"$SUFFIX"d."$DOMAIN"    
   
cp /etc/letsencrypt/live/dev.mapic.io/privkey.pem ssl_certificate.key
cp /etc/letsencrypt/live/dev.mapic.io/fullchain.pem ssl_certificate.pem