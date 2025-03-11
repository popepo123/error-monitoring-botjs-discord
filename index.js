const ERRORLOG = 'YOUR_CHANNEL_ID';

function sendErrorLog(error) {
    const channel = client.channels.cache.get(ERRORLOG);
    if (!channel) return console.error('Channel not found');

    const errorEmbed = new EmbedBuilder()
        .setTitle('🚨 Error Detect')
        .setDescription(`\`\`\`${error}\`\`\``)
        .setColor('Red')
        .setTimestamp();
    
    channel.send({ embeds: [errorEmbed] }).catch(console.error);
}

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    sendErrorLog(err.stack || err.message);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
    sendErrorLog(reason);
});
