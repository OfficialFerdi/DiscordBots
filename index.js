const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disabledEveryone: true})

bot.on("ready", async () => {
   console.log(`${bot.user.username}is online!`);

   bot.user.setPresence({game: {type: "WATCHING", name: 'de reports'}, status: 'online'});

});

bot.on("message", async message => {
   if(message.author.bot) return;
   if(message.channel.type === "dm") return;

   let prefix = botconfig.prefix;
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
   let args = messageArray.slice(1);

   if(cmd === `${prefix}report`){

     //!report @ned this is the reason

     let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!rUser) return message.channel.send("kan de naam niet vinden.");
     let reason = args.join(" ").slice(22);

     let reportEmbed = new Discord.RichEmbed()
     .setDescription("De Reports")
     .setColor("#800040")
     .addField("Gerapporteerde gebruiker", `${rUser} with ID: ${rUser.id}`)
     .addField("Gerapporteerd door", `${message.author} with ID: ${message.author.id}`)
     .addField("Channel", message.channel)
     .addField("De tijd", message.createdAt)
     .addField("Reden", reason);


     let reportschannel = message.guild.channels.find(`name`, "reports");
     if(!reportschannel) return message.channel.send("kan de chat: reports niet vinden.");


     message.delete().catch(O_o=>{});
     reportschannel.send(reportEmbed);

     return;
   }
  
  
  
  
   if(cmd === `${prefix}serverinfo`){

     let sicon = message.guild.iconURL;
     let serverembed = new Discord.RichEmbed()
     .setDescription("Server Informatie")
     .setColor("#800040")
     .setThumbnail(sicon)
     .addField("Server Naam", message.guild.name)
     .addField("Server gemaakt op", message.guild.createdAt)
     .addField("Je bent joined op", message.member.joinedAt)
     .addField("Leden in totaal", message.guild.memberCount)


     return message.channel.send(serverembed);
   }



   if(cmd === `${prefix}botinfo`){
    
    let bicon = bot.user.displayAvatarURL;  
     let botembed = new Discord.RichEmbed()
     .setDescription("Bot Informatie")
     .setColor("#800040")
     .setThumbnail(bicon)
     .addField("Bot Naam", bot.user.username)
     .addField("Bot gemaakt op", bot.user.createdAt);
     
     return message.channel.send(botembed);
   

  }
}); 

bot.login(botconfig.token);
