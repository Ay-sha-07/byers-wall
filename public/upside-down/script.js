const socket = io();
let hoverTimer = null;
const HOLD_THRESHOLD = 800; // 0.8 seconds to trigger

const rows = [
    { id: "row-1", letters: "ABCDEFGH".split("") },
    { id: "row-2", letters: "IJKLMNOPQ".split("") },
    { id: "row-3", letters: "RSTUVWXYZ".split("") }
];

function buildTransmitterWall() {
    rows.forEach(rowData => {
        const container = document.getElementById(rowData.id);
        rowData.letters.forEach((char) => {
            const box = document.createElement('div');
            box.classList.add('letter-box');
            box.innerText = char;
            
            // Interaction Logic
            box.addEventListener('mouseenter', () => {
                box.classList.add('charging');
                hoverTimer = setTimeout(() => {
                    socket.emit('upside-down-signal', char);
                    // Visual confirmation of send
                    box.style.background = "red";
                    setTimeout(() => box.style.background = "", 200);
                }, HOLD_THRESHOLD);
            });

            box.addEventListener('mouseleave', () => {
                box.classList.remove('charging');
                clearTimeout(hoverTimer);
            });

            container.appendChild(box);
        });
    });
}

buildTransmitterWall();