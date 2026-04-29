const fs = require('fs');

const lines = [
    "[24/10/23, 14:35:22] mi novia linda 🌷: Hola amor",
    "24/10/23, 14:35 - mi novia linda 🌷: Que haces?",
    "24/10/2023, 2:35 p. m. - Yaire: Todo bien",
    "[24/10/23, 2:35:22 p.m.] Yaire: Sii",
    "24/10/23 14:35 - mi novia linda 🌷: Otra prueba",
    "10/24/23, 14:35 - Yaire: date format",
    "And a multi-line",
    "message here",
    "24/10/23, 14:36 - mi novia linda 🌷: Y luego me dijo: hola"
];

let currentSender = "";
let messages = [];
let senderName = "mi novia linda";

for (let line of lines) {
    line = line.replace(/[\u200E\u200F\uFE0F]/g, '').trim();
    if (!line) continue;
    
    // Check if it's a new message (Starts with digit or [, contains ': ')
    let isNewMessage = /^[\[\d]/.test(line) && line.includes(': ');
    
    if (isNewMessage) {
        let colonIdx = line.indexOf(': ');
        // Edge case: WhatsApp format might have seconds in time `14:35:22`, which contains `: `? No, it's `:22`, no space.
        // What if the sender name has a colon? Very rare.
        let prefix = line.substring(0, colonIdx);
        let msg = line.substring(colonIdx + 2);
        
        let bracketIdx = prefix.lastIndexOf('] ');
        let dashIdx = prefix.lastIndexOf('- ');
        let splitIdx = Math.max(bracketIdx, dashIdx);
        
        if (splitIdx !== -1) {
            currentSender = prefix.substring(splitIdx + 2).trim();
        } else {
            // No recognizable separator, just use prefix
            currentSender = prefix;
        }
        
        if (currentSender.toLowerCase().includes(senderName.toLowerCase())) {
            messages.push(msg);
        }
    } else {
        if (currentSender.toLowerCase().includes(senderName.toLowerCase())) {
            messages.push(line);
        }
    }
}

console.log("Found:", messages.length);
console.log(messages);
