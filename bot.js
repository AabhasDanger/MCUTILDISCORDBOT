const Discord = require('discord.js')

require('dotenv').config()

const util = require('minecraft-server-util');

const client = new Discord.Client()

client.on('ready',()=>{
    console.log(`logged in as ${client.user.tag}`)

    client.guilds.cache.forEach((guild)=>{
        let generalchannel;
        guild.channels.cache.forEach((channel)=>{
            if(channel.name == 'general'||channel.name == 'general-chat'){
                generalchannel = channel
            }
        })
        let embed = new Discord.MessageEmbed()
            .setTitle('Bot Activated - info')
            .setColor('#B00F3C')
            .setDescription(`This bot people check if their favorite minecraft servers are online from Discord chatting app! as a utility tool.
            © Copyright. Made By AabhasDanger
            Discord Server Link - https://discord.gg/2K5TNQYEmW`)
        generalchannel.send(embed)
    })
})

client.on('message',(message)=>{
    if(message.author.bot==true){

    }else{
        if(message.content.split(' ')[0]=='!serverStatus'){
            if(message.content.split(' ').length == 2){
                let ip = message.content.split(' ')[1]
                util.status(ip, { port: 25565, enableSRV: true, timeout: 5000, protocolVersion: 47 }) // These are the default options
                    .then((response) => {
                        let status;
                        if(response.onlinePlayers==0){
                            status = 'Offline'
                        }else{
                            status = 'Online'
                        }
                        let color;
                        if(status == 'Offline'){
                            color = '#B00F4C'
                        }else{
                            color = '#00FF00'
                        }

                        let StatusMessage = new Discord.MessageEmbed()
                            .setTitle(`Server with the ip ${ip} is ${status}`)
                            .setColor(color)

                        if(status == 'Offline'){
                            StatusMessage.setDescription('Note : There is currently a bug in the system that cause the servers with 0 players online is classified as Offline.')
                        }
                        message.channel.send(StatusMessage)
                    })
                    .catch((error) => {
                        let Error = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setColor('#B00F3C')
                            .setDescription(`Sorry for the inconvenience, But the command had some problem executing.
                            Entered IP is wrong plz check it and try agian! <@!`+message.author.id+'>')
                            message.channel.send(Error)
                    });
            }else{
                let onlyTwoArgs = new Discord.MessageEmbed()
                .setTitle('Command Error!')
                .setColor('#B00F3C')
                .setDescription('Sorry for the inconvenience, But the command u used just had the wrong number of arguments as follows - `<command>` `<server-ip>` <@!'+message.author.id+'>')
                message.channel.send(onlyTwoArgs)
            }
        }
    }
})

client.login(process.env.BOT_TOKEN)