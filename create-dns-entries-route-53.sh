#!/bin/bash

WDR=/usr/src/app

docker run -it -p 80:80 -p 443:443 --volume $PWD/dns:$WDR -w $WDR node:4 sh entrypoint.sh