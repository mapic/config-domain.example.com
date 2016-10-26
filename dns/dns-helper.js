var AWS = require('aws-sdk');
var async = require('async');
var _ = require('lodash');
var fs = require('fs');

// get config
try {
    var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
} catch (e) {
    return console.log('Please \n - edit the config.template.json file with your credentials and settings, and \n - rename to config.json');
}

// subdomains for which to create dns entries
var subdomains = [
    'proxy-' + config.prefix + 'a',
    'proxy-' + config.prefix + 'b',
    'proxy-' + config.prefix + 'c',
    'proxy-' + config.prefix + 'd',
    'tiles-' + config.prefix + 'a',
    'tiles-' + config.prefix + 'b',
    'tiles-' + config.prefix + 'c',
    'tiles-' + config.prefix + 'd',
    'grid-' + config.prefix + 'a',
    'grid-' + config.prefix + 'b',
    'grid-' + config.prefix + 'c',
    'grid-' + config.prefix + 'd',
]
    
// init aws
AWS.config.update(config.aws);

// get the route53 lib
var route53 = new AWS.Route53();

// async ops
var ops = [];

// get list of hosted zones
ops.push(function (callback) {
    route53.listHostedZones({}, callback);
});

// set entries
ops.push(function (data, callback) {

    // get hosted zone
    var hosted_zone = _.find(data.HostedZones, function (d) {
        return d['Name'] == config.hosted_zone_domain + '.';
    });

    // check
    if (!hosted_zone) return callback('No such hosted zone: ' + config.hosted_zone_domain);

    // get id
    var hosted_zone_id = hosted_zone['Id'];

    // set options
    var options = {
        "HostedZoneId": hosted_zone_id,
        "ChangeBatch": {
          "Changes": []
        }
    };

    // add each subdomain
    subdomains.forEach(function (s) {
        options['ChangeBatch']['Changes'].push({
            "Action": "CREATE",
            "ResourceRecordSet": {
                "Name": s + "." + config.hosted_zone_domain,
                "Type": "A",
                "TTL": 600,
                "ResourceRecords": [
                    {
                        "Value": config.ip
                    }
                ]
            }
        });
    });

    
    // update dns records
    route53.changeResourceRecordSets(options, function(err,data) {
        callback(err, data);
    });
    
});


async.waterfall(ops, function (err, result) {
    if (err) return console.log('Something went wrong: ', err);

    console.log('\nSuccess! DNS entries created for\n', subdomains.join('\n'), '\n\nAnswer from AWS was:\n', result);
});

