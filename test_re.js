const texts = [
    "[24/10/23, 14:35:22] mi novia linda 🌷: Hola amor",
    "24/10/23, 14:35 - mi novia linda 🌷: Que haces?",
    "24/10/2023, 2:35 p. m. - Yaire: Todo bien",
    "[24/10/23, 2:35:22 p.m.] Yaire: Sii",
    "24/10/23 14:35 - mi novia linda 🌷: Otra prueba",
    "10/24/23, 14:35 - Yaire: date format"
];

const re = /^\[?\d{1,2}[/\-.]\d{1,2}[/\-.]\d{2,4}.*?(?:\]|\-)\s([^:]+):\s(.+)$/;

for (const t of texts) {
    const m = t.match(re);
    if (m) {
        console.log("SENDER:", m[1], "| MSG:", m[2]);
    } else {
        console.log("FAIL:", t);
    }
}
