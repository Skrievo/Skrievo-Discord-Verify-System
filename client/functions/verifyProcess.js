const config = require("../../config");

const logtodc = require("./log");

async function verifyProcess(securitycheck, member) {
    switch (securitycheck.action) {
        case "verify":
            // Add and remove roles form user defined at config.verify.roles
            for (const role of config.verify.roles.remove) {
                member.roles.remove(role);
            }
            for (const role of config.verify.roles.add) {
                member.roles.add(role);
            }
            break;
    
        case "kick":
            // Kick user from guild
            member.kick(securitycheck.reason);
            break;
        case "ban":
            // Ban user from guild
            member.ban({ reason: securitycheck.reason });
            break;
        default:
            break;
    }
    if (config.log.enabled) await logtodc(securitycheck.action, securitycheck.reason, member)
}

module.exports = verifyProcess;