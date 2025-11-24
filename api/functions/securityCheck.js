const config = require("../../config");

const fs = require("fs");

async function securityCheck(userid) {
    const data = fs.readFileSync('./data/users.json', 'utf8');
    const users = JSON.parse(data);
    const user_data = users[userid];

    const data2 = fs.readFileSync('./data/guilds.json', 'utf8');
    const guilds = JSON.parse(data2);
    const user_guilds = guilds[userid];

    if (!user_data) 
        return { status: false, reason: "User not found", action: config.security.account.action };

    if (user_data.bypass)
        return { status: true, reason: "User is bypassed", action: "verify" };
    if (config.security.account.enabled) {
        const currentdate = new Date();
        if (new Date(user_data.created_at) > new Date(currentdate.getTime() - config.security.account.age)) 
            return { status: false, reason: "Account age is less than 7 days", action: config.security.account.action };        
    }
    if (!user_guilds)
        return { status: false, reason: "Guilds from User not found", action: config.security.guilds.action}
    if (config.security.guilds.enabled) {
        for (const guild of user_guilds) {
            if (config.security.guilds.blacklist.includes(guild.id)) 
                return { status: false, reason: "User is on a blacklisted guild", action: config.security.guilds.action };
        }
    }
    if (config.security.ip.enabled) {
        if (config.security.ip.anti_proxy && user_data.proxy) return { status: false, reason: "User is using a proxy", action: config.security.ip.action };
        if (config.security.ip.anti_vpn && user_data.vpn) return { status: false, reason: "User is using a vpn", action: config.security.ip.action };
        if (config.security.ip.anti_tor && user_data.tor) return { status: false, reason: "User is using tor", action: config.security.ip.action };
        if (config.security.ip.anti_relay && user_data.relay) return { status: false, reason: "User is using relay", action: config.security.ip.action };

        if (config.security.ip.anti_isp.enabled) {
            if (config.security.ip.anti_isp.blacklist.some(substring => user_data.isp.toLowerCase().includes(substring))) {
                return { status: false, reason: "User is using a blacklisted ISP", action: config.security.ip.action };
            }
        }
    }
    if (config.security.geolocation.enabled) {
        if (config.security.geolocation.blacklist.includes(user_data.country)) 
            return { status: false, reason: "User is in a blacklisted country", action: config.security.geolocation.action };
    }
    if (config.security.discord.enabled) {
        if (config.security.discord.verified && !user_data.mail_verified) return { status: false, reason: "User has no veriyfied email", action: config.security.discord.action };
        if (config.security.discord.mfa_enabled && !user_data.mfa) return { status: false, reason: "User has no MFA enabled", action: config.security.discord.action };
    }
    return { status: true, reason: "User passed all security checks", action: "verify" };
}

module.exports = securityCheck;