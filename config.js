/*
KALO MAU REUPLOAD JAN LUPA TAG YT GW
KASIH CREDITS: BASE XLYPER MODS
*/

const fs = require("fs")
const chalk = require("chalk")

global.ownerName = 'XLYPER MODS' //UBAH NAMA OWNER
global.botName = 'Xlyper Mods' //UBAH NAMA BOT
global.ownerNumber = ["62853149136290"] //UBAH NOMOR OWNER
global.packname = 'Created By:' //SETING PACK NAME STIKER
global.author = '© Xlyper Mods' //UBAH AUTHOR STIKER
global.prefa = ['','.'] //GAUSAH DI UBAH
global.wlcm = []
global.mess = {
    wait: '𝙼𝚘𝚑𝚘𝚗 𝚃𝚞𝚗𝚐𝚐𝚞 𝚂𝚎𝚋𝚎𝚗𝚝𝚊𝚛....',
    sukses: '𝚂𝚞𝚌𝚌𝚜𝚎𝚜',
    admin: '𝙵𝚒𝚝𝚞𝚛 𝙺𝚑𝚞𝚜𝚞𝚜 𝙰𝚍𝚖𝚒𝚗 𝙶𝚛𝚘𝚞𝚙!',
    botAdmin: '𝙱𝚘𝚝 𝙱𝚞𝚔𝚊𝚗 𝙰𝚍𝚖𝚒𝚗!',
    akses: '𝙵𝚒𝚝𝚞𝚛 𝙺𝚑𝚞𝚜𝚞𝚜 𝙾𝚠𝚗𝚎𝚛 & 𝙰𝚔𝚜𝚎𝚜 𝙱𝚘𝚝\n𝙼𝚊𝚞 𝙱𝚞𝚢 𝙰𝚔𝚜𝚎𝚜?\n𝙺𝚎𝚝𝚒𝚔 .𝚋𝚞𝚢𝚊𝚔𝚜𝚎𝚜',
    owner: 'Khusus Owner BOT',
    group: 'F𝚒𝚝𝚞𝚛 𝚑𝚊𝚗𝚢𝚊 𝚋𝚒𝚜𝚊 𝚍𝚒 𝚐𝚞𝚗𝚊𝚔𝚊𝚗 𝚍𝚒 𝚐𝚛𝚘𝚞𝚙',
    private: '𝙵𝚒𝚝𝚞𝚛 𝚑𝚊𝚗𝚢𝚊 𝚋𝚒𝚜𝚊 𝚍𝚒 𝚐𝚞𝚗𝚊𝚔𝚊𝚗 𝚍𝚒 𝙿𝚛𝚒𝚟𝚊𝚝𝚎 𝙲𝚑𝚊𝚝',
    bot: '𝙵𝚒𝚝𝚞𝚛 𝙺𝚑𝚞𝚜𝚞𝚜 𝙱𝚘𝚝',
    error: '𝙀𝙍𝙍𝙊𝙍 𝙼𝚊𝚊𝚏 𝚜𝚎𝚙𝚎𝚛𝚝𝚒𝚗𝚢𝚊 𝚊𝚍𝚊 𝚢𝚊𝚗𝚐 𝚎𝚛𝚛𝚘𝚛\n𝚄𝚗𝚝𝚞𝚔 𝚖𝚎𝚗𝚐𝚊𝚝𝚊𝚜𝚒𝚗𝚢𝚊 𝙷𝚞𝚋𝚞𝚗𝚐𝚒 𝙾𝚠𝚗𝚎𝚛',
}
global.thumb = fs.readFileSync('./img/xlyper.jpg')