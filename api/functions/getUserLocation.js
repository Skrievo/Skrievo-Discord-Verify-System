require("dotenv").config();

async function getUserLocation(req) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // hash the ip for privacy
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    hash.update(ip);
    const ip_hashed = hash.digest('hex');

    let internet = {}

    // Use https://ipinfo.io/ to get User Location
    await fetch("https://ipinfo.io/" + ip + "/json?token=" + process.env.IPINFO_TOKEN).then((response) =>
        response.json()
    ).then((jsonResponse) => internet = {
        ip_hashed: ip_hashed,
        isp: jsonResponse.org,
        loc: jsonResponse.loc,
        city: jsonResponse.city,
        postal: jsonResponse.postal,
        region: jsonResponse.region,
        country: jsonResponse.country,
        timezone: jsonResponse.timezone,
    }
    )

    await fetch("https://vpnapi.io/api/" + ip + "?key=" + process.env.VPNAPI_TOKEN).then((response) => 
        response.json()
    ).then((jsonResponse) => {
        internet.vpn = jsonResponse.security.vpn
        internet.proxy = jsonResponse.security.proxy
        internet.tor = jsonResponse.security.tor
        internet.relay = jsonResponse.security.relay
    })

    return internet
}

module.exports = getUserLocation;