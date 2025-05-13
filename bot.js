process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const mineflayer = require('mineflayer')
const { SocksProxyAgent } = require('socks-proxy-agent')

// Proxy details
const proxy = 'socks5://98.191.0.37:4145'
const agent = new SocksProxyAgent(proxy)

// Create the bot
const bot = mineflayer.createBot({
    host: 'sme.jartex.fun',
    port: 25565,
    username: 'oirit',
    agent: agent,
    version: false // (auto-detects version)
})

// Print in-game chat to your terminal
bot.on('chat', (username, message) => {
    console.log(`<${username}> ${message}`)
})

// Log connection events
bot.on('login', () => console.log('Bot logged in!'))
bot.on('end', () => console.log('Bot disconnected'))
bot.on('error', err => console.log('Error:', err))

// Let you send chat from your terminal
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.on('line', (input) => {
    if (bot && bot.chat) {
        bot.chat(input)
    } else {
        console.log('Bot is not connected yet.')
    }
})
