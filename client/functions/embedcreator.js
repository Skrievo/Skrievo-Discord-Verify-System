const config = require('../../config')

async function embedbuildcreator(path) {
    const { EmbedBuilder } = require('discord.js');

    // get the config path
    const args = path.split('.')

    // get the config
    let conf = config

    // get item from config
    args.forEach(argument => {
        conf = conf[argument]
    });

    // create a new 
    const embedbuild = new EmbedBuilder()
        .setColor(conf.color || config.bot.color)
        .setTitle(conf.title)
        .setDescription(conf.description)

    // check if the author iconURL and Footer iconURL is a url
    if (conf.author?.iconURL && !conf.author.iconURL.startsWith('http')) conf.author.iconURL = null
    if (conf.footer?.iconURL && !conf.footer.iconURL.startsWith('http')) conf.footer.iconURL = null
    
    // set the author and footer
    if (conf.footer?.text) embedbuild.setFooter(conf.footer)
    if (conf.author?.name) embedbuild.setAuthor(conf.author)

    // set the image, banner, timestamp and url
    if (conf.image) embedbuild.setThumbnail(conf.image)
    if (conf.banner) embedbuild.setImage(conf.banner)
    if (conf.timestamp) embedbuild.setTimestamp()
    if (conf.url) embedbuild.setURL(conf.url)

    // add fields
    if (conf.fields) conf.fields.forEach(filed => {
        embedbuild.addFields(filed)
    });

    // return the embedbuild
    return embedbuild
}

module.exports = embedbuildcreator