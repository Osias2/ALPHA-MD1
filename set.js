const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUJ0S0NKdjJRblM5dE5xQ2NFSkkwdUNVbG5LZjZwWnN1UW9nSEtxYXgyRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTmdZNEJKWFJQb0lPc2NSSy9iRVlWSEVnaE14ZDQybkxSR1pSMjFQekpIbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxRGlLaWdFY3piR0ozR0RyWFVYMVpEbUNUeFdRbE5MYlNaeWJYRE43OVYwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUWU1ZSWswSTcrMDdQYjVESFd6dGVSOVZTWmNYVzZWZzlUZHFNeGUxU3pRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitBZitTZlZTZFl4ZHhaZ0thZDVjRXFaRmFNTzZmV3Y0VnB0djc1R3lCSHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1VNXBJVGhSWjhQcWtzdjFnVnZYSzNDS2swSDllYzZnZVc2Uk1JS2pjQTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU9yNnZlRWg5NW51d1E4MDVnWS9HWVhYdVlXSnJQMnFJbmJOUy80L3pWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiREhtTnkxQmZteE4zYnNKclM1RVgrWDdidnV6NGJwR1NRUFdVZEtLZklTYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5veGtZRDhXNGdzMnZUQlFRbXpZR1NQQmFiazN2RTcrLzJRbW4weWI4bE9TdWluWWdhUzZqY3h5NmpSNTF3VW5nUFhLc0VNM2llUGlVS1pyZEowZGdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI5LCJhZHZTZWNyZXRLZXkiOiJnUVV4Vi9ieWtyWUQ5RllidlN2NnBJNzFSSjFnWEdWWWFnc2tiN2dSbUh3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ0QVdkN0ZNSVNzQ3JBQXphZ0lGdGdBIiwicGhvbmVJZCI6IjEzNzE4MjA2LTY5N2YtNGJjZi1iNmVlLTRjOTRmZDIxNTNiYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTcUNQQ1NmRzZJYzY3WWtSSjZvK2FGSGN4YVE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSWRjcFYzbmNoT0lrYjI3dTI2aU5ycWx4M0U4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQxS1JKRFpRIiwibWUiOnsiaWQiOiIyNjM3ODY2MTk4NTI6MjlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ozZDU3d0NFTEhudWJVR0dCMGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ilc4VW5GUEQ2dGZ1dExtMjErMmtaeHpvM1gzTFZaSFBNS29tQXZDM1hyQWM9IiwiYWNjb3VudFNpZ25hdHVyZSI6InFEeEoxa2xLRlgwZ3lhb2REaitJbHpHUk9Mbkx2cWVOUkpsTUFWZkhmdzBJamZYVVU2OGxXNzZZc3FQQzNDOVZzTmU1QW9EaDROTzJ1SDhpSnd4cUJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJhQjl5eTV1WTlpUVJ3bEdDVThGRXI3cnlEUzNLQ0lHZm5mNHdBQzV0ZDNrcVVlN01lblFDNVAzU0o0MEcvQy9PbzJlZlNyb09xSXlJbmd3eEtPU0VoZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc4NjYxOTg1MjoyOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJWdkZKeFR3K3JYN3JTNXR0ZnRwR2NjNk4xOXkxV1J6ekNxSmdMd3QxNndIIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyNzA4OTI4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdZOSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "keithkeizzah",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " keithkeizzah",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝐀𝐋𝐏𝐇𝐀-𝐌𝐃',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
