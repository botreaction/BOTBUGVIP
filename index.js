/*
KALO MAU REUPLOAD JAN LUPA TAG YT GW
KASIH CREDITS: BASE XLYPER MODS
*/
const { default: xlyperConnect, useSingleFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = require('@adiwajshing/baileys')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const pino = require('pino')
const chalk = require('chalk')
const figlet = require('figlet')
const qrcode = require("qrcode-terminal");
const { error } = require("qrcode-terminal");
const process = require('process')
const FileType = require('file-type')
const PhoneNumber = require('awesome-phonenumber')
const { color, bgcolor } = require('./lib/color')
const { uncache, nocache } = require('./lib/loader')
const { state, saveState } = useSingleFileAuthState(`./xlyper.json`)
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep } = require('./lib/myfunc')

const akses = JSON.parse(fs.readFileSync('./database/akses.json').toString())
const owner = JSON.parse(fs.readFileSync('./database/owner.json').toString())

const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

require('./xlyper.js')
nocache('../xlyper.js', module => console.log(color('[ UPDATE ]', 'cyan'), color(`'${module}'`, 'green'), 'File Is Update!!!'))
require('./index.js')
nocache('../index.js', module => console.log(color('[ UPDATE ]', 'cyan'), color(`'${module}'`, 'green'), 'File Is Update!!!'))

async function startxlyper() {
const { version, isLatest } = await fetchLatestBaileysVersion()
const xlyper = xlyperConnect({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['XLYPER MODS','Safari','1.0.0'],
auth: state,
version
})

store.bind(xlyper.ev)

console.log(color(figlet.textSync(`XLYPER MODS`, {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
whitespaceBreak: false
}), 'green'))



xlyper.ev.on('messages.upsert', async chatUpdate => {
try {
kay = chatUpdate.messages[0]
if (!kay.message) return
kay.message = (Object.keys(kay.message)[0] === 'ephemeralMessage') ? kay.message.ephemeralMessage.message : kay.message
if (kay.key && kay.key.remoteJid === 'status@broadcast') return
if (!xlyper.public && !kay.key.fromMe && chatUpdate.type === 'notify') return
if (kay.key.id.startsWith('BAE5') && kay.key.id.length === 16) return
lyper = smsg(xlyper, kay, store)
require('./xlyper')(xlyper, lyper, chatUpdate, store)
} catch (err) {
console.log(err)}})

xlyper.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

xlyper.ev.on('contacts.update', update => {
for (let contact of update) {
let id = xlyper.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

xlyper.getName = (jid, withoutContact  = false) => {
id = xlyper.decodeJid(jid)
withoutContact = xlyper.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = xlyper.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === xlyper.decodeJid(xlyper.user.id) ?
xlyper.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

xlyper.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}



xlyper.ev.on('group-participants.update', async (eta) => {
        console.log(eta)
        if (!wlcm.includes(eta.id)) return
        try {
            let metadata = await xlyper.groupMetadata(eta.id)
            let participants = eta.participants
            for (let num of participants) {
                // Get Profile Picture User
                try {
                    pp_user = await xlyper.profilePictureUrl(num, 'image')
                } catch {
                   var pp_user = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }

                // Get Profile Picture Group
                try {
                    ppgroup = await xlyper.profilePictureUrl(eta.id, 'image')
                } catch {
                   var ppgroup =  "https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg";
                }
	 
                if (eta.action == 'add') {
                  xlyper.sendMessage(eta.id, { image: { url: pp_user }, contextInfo: { mentionedJid: [num] }, caption: `[ WELCOME NEW MEMBER ]\nHALLO @${num.split("@")[0]}\nWELCOME TO GROUP ${metadata.subject}\n[ DESCRIPTION ]\n\n© XLYPER BOT`, 
contextInfo:{"externalAdReply": {"title": `WELCOME USER`,"body": `Selamat Datang Di Group Ini`,
previewType: "PHOTO",
showAdAttribution: true,
sourceUrl: `https://youtube.com/@xlyper_`,
thumbnailUrl: 'https://telegra.ph/file/4a4058a3a181a1e17127f.jpg', 
}
}})
                  } else if (eta.action == 'remove') {
                  xlyper.sendMessage(eta.id, { image: { url: pp_user }, contextInfo: { mentionedJid: [num] }, caption: `[ GOOD BYE MEMBER ]\n@${num.split("@")[0]} LEAVING TO GROUP ${metadata.subject}\n\n© XLYPER BOT`,
contextInfo:{"externalAdReply": {"title": `GOODBYE USER`,"body": `LEAVING GROUP`,
previewType: "PHOTO",
showAdAttribution: true,
sourceUrl: `https://youtube.com/@xlyper_`,
thumbnailUrl: 'https://telegra.ph/file/4a4058a3a181a1e17127f.jpg', 
}
}})

                }
            }
        } catch (err) {
            console.log(err)
        }
    })




xlyper.sendContact = async (jid, kon, quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: await xlyper.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await xlyper.getName(i + '@s.whatsapp.net')}\n
FN:${await xlyper.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:satwebmail@gmail.com\n
item2.X-ABLabel:Email\n
item3.URL:https://youtube.com/@xlyper_\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;Indonesia;;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}
xlyper.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}

xlyper.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await xlyper.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

xlyper.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await xlyper.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

xlyper.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await xlyper.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

xlyper.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await xlyper.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

xlyper.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

xlyper.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

xlyper.sendText = (jid, text, quoted = '', options) => xlyper.sendMessage(jid, { text: text, ...options }, { quoted })

xlyper.public = true

xlyper.serializeM = (lyper) => smsg(xlyper, lyper, store)

xlyper.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect } = update	
if (connection === 'close') {
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
if (reason === DisconnectReason.badSession) { console.log(`Bad Session File, Please Delete Session and Scan Again`); xlyper.logout(); }
else if (reason === DisconnectReason.connectionClosed) { console.log("Connection closed, reconnecting...."); startxlyper(); }
else if (reason === DisconnectReason.connectionLost) { console.log("Connection Lost from Server, reconnecting..."); startxlyper(); }
else if (reason === DisconnectReason.connectionReplaced) { console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First"); xlyper.logout(); }
else if (reason === DisconnectReason.loggedOut) { console.log(`Device Logged Out, Please Scan Again And Run.`); xlyper.logout(); }
else if (reason === DisconnectReason.restartRequired) { console.log("Restart Required, Restarting..."); startxlyper(); }
else if (reason === DisconnectReason.timedOut) { console.log("Connection TimedOut, Reconnecting..."); startxlyper(); }
else xlyper.end(`Unknown DisconnectReason: ${reason}|${connection}`)
}
console.log('Connected...', update)
})

xlyper.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
xlyper.sendMessage(jid, buttonMessage, { quoted, ...options })
}

xlyper.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
"hydratedContentText": text,
"locationMessage": {
"jpegThumbnail": img },
"hydratedFooterText": footer,
"hydratedButtons": but
}
}
}), options)
xlyper.relayMessage(jid, template.message, { messageId: template.key.id })
}

xlyper.sendList = async (jid , title = '', text = '', buttext = '', footer = '', but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
listMessage :{
title: title,
description: text,
buttonText: buttext,
footerText: footer,
listType: "  SELECT  ",
sections: but,
listType: 1
}
}), options)
xlyper.relayMessage(jid, template.message, { messageId: template.key.id })
}

xlyper.ev.on('creds.update', saveState)

return xlyper
}

startxlyper()