const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Kingsman",
    ownerNumber: process.env.OWNER_NUMBER || "27712213644",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "South Africa",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 bot",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Johannesburg",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEZjZHVzamtsbzZCMmpLNXFVTkRDeWhWb3RRUnhTQ1pWQ3l2MUZoVExscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYW9TamNlS0pmd0hMa01RWEpDU3pZR3NGd2FEUWR5azhRclNNekxKZldHMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHR0tRR3FMdDBhU3hRbE5RNzQ2emJXQjZYbVBobEQ0a01FU2ZvaitGckZBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUTTJRVmQ2UlpzdTdkSjhJSTArZ1NYMzVrNFlzNnV2V1NLNkRVa0pSV1EwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktQeXJmNlkrLzEzcWF1R2ljREx4RjRtdUlFRDE2QUYwVHlwYUdUbGU5MUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikg3NnVKdFZrck9FMmY3aVBIQjZNckh6eXJGMHErNlhQZzNmM0hhN0pwVEE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK1BtWnhvOFEzL2ttZWt0SHBVa0Q5ZTlTNHJDa2N6YWdyaDkvR1dNYTZIRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMTZRY3VkNzNnNUowVzdKRkF1RnRVc0lZQTY0eGp1TnFkQkdCYWVrMzNRVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtMUEtmMUlkOHNydFFEYmdRaTlJTDdRRGF1N1B5M0gvVFdIRHJ4MFROc24za1IzV0lxYW5ISEo3dGxRWmRyZ2pINm1oYzRRajQzS1I4OTdrSGNzTEJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTc5LCJhZHZTZWNyZXRLZXkiOiJLb0p2RkhsTGNQNFJSeGg4OXU4eElpaUwrbG5GY0Fuc1Fwc3V1T05hUWc4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJDTkI3N1Y4ViIsIm1lIjp7ImlkIjoiMjc3MTIyMTM2NDQ6MTNAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIyMjU1NTAyMjQzMzA3ODc6MTNAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMWHgvcUlFRUs2eDNzQUdHQVlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJONTJPSlhRdExvaU5jL0FYYWJYY2F4T085ZnhFL2Z0N2RJQUZTbHN3YmhVPSIsImFjY291bnRTaWduYXR1cmUiOiIxSWtpQ0xROFhQbGFlREpMZjNlL01lb3lyZlJXdENIV2dKZkErRmxNYkVmQ0FsSURoRVFFa3VRTXZpeDU3ejh3YUlKK2VOV2Y2Yi9pNHZaRkRvdllCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiMkFud1pLdXlwczBYZEtxRkhoWjNYRzliVDN0WUo4WFgxa1FZSTZ0L0hjNW1TVERTa2lCd283VVFWRnlQUE5XZ1l3eUN3K0c1WGIvcEJDWU1CNGdyQmc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzcxMjIxMzY0NDoxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJUZWRqaVYwTFM2SWpYUHdGMm0xM0dzVGp2WDhSUDM3ZTNTQUJVcGJNRzRWIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDYzNzY4OTIsImxhc3RQcm9wSGFzaCI6IjNSOVozOSJ9",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
