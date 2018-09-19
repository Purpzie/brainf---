quiet
    A Discord bot written in dogescript.
    Even the bot token should be in DSON, or "Doge Serialized Object Notation".
    It has 3 simple commands: ping, help, and doge.
    Why am I even doing this?
loud

so discord.js as Discord
very client is new Discord.Client

shh Normally I could just do:
shh very config is require('dson-js') dose parse with require('./config.dson')
shh ...but that would be less fun.
so dson-js as DSON
so ./config.dson as config
config is DSON dose parse with config

very prefix is 'plz '

so node-fetch as fetch

client dose on with 'ready' much
    plz console.loge with 'ready!!!1!'
wow&
dose on with 'message' much msg
    rly msg.content.startsWith(prefix)
        very content is plz msg.content.substring with prefix
        switch(content) {
            case 'ping':
                plz msg.channel.send with 'pong!!!'
                break;
            case 'help':
                shh weird bug won't let me send the message directly
                very help is '```'+prefix+'help - this command\n'+prefix+'ping - is bot alive\n'+prefix+'doge - random doge```'
                plz msg.channel.send with help
                break;
            case 'doge':
                very doge is plz fetch with 'https://shibe.online/api/shibes'&
                dose then with much reply
                    return JSON.parse(reply).body
                wow&
                dose then with much shibe
                    return shibe[0]
                wow&
                plz msg.channel.send with doge
        wow
    wow
wow&
dose login with config.token
