const client = require("../bot");

const config = require("../../config")

const fs = require('fs')

// if user gets role
client.on("guildMemberUpdate", async (oldMember, newMember) => {
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
        const role = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id)).first()
        if (role.id === config.verify.bypass) {
            const userdata = fs.readFileSync('./data/users.json', 'utf-8')
            const users = JSON.parse(userdata)

            const user = users[newMember.id]

            if (!user) return

            user.bypass = true

            fs.writeFileSync('./data/users.json', JSON.stringify(users))
        }
    } else if (oldMember.roles.cache.size > newMember.roles.cache.size) {
        const role = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id)).first()

        if (role.id === config.verify.bypass) {
            const userdata = fs.readFileSync('./data/users.json', 'utf-8')
            const users = JSON.parse(userdata)

            const user = users[newMember.id]

            if (!user) return

            user.bypass = false

            fs.writeFileSync('./data/users.json', JSON.stringify(users))
        }
    }
})