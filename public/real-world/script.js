const socket = io(); // Connect to Member 3

const rows = [
    { id: "row-1", letters: "ABCDEFGH".split("") },
    { id: "row-2", letters: "IJKLMNOPQ".split("") },
    { id: "row-3", letters: "RSTUVWXYZ".split("") }
];

const COLORS = ['active-red', 'active-blue', 'active-yellow', 'active-green'];

function playBuzzSound(volume = 0.05) {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(50, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.4);
    } catch (e) { /* Audio requires user interaction */ }
}

function buildWall() {
    rows.forEach(rowData => {
        const container = document.getElementById(rowData.id);
        if(!container) return;
        container.innerHTML = "";
        rowData.letters.forEach((char) => {
            const box = document.createElement('div');
            box.classList.add('letter-box');
            box.id = `box-${char}`;
            const tilt = Math.floor(Math.random() * 20) - 10;
            const drop = Math.floor(Math.random() * 12);
            box.style.transform = `rotate(${tilt}deg) translateY(${drop}px)`;
            const bulb = document.createElement('div');
            bulb.classList.add('bulb');
            const letter = document.createElement('div');
            letter.classList.add('letter');
            letter.innerText = char;
            box.appendChild(bulb);
            box.appendChild(letter);
            container.appendChild(box);
        });
    });
}

function activateLetter(char) {
    const letter = char.toUpperCase();
    const box = document.getElementById(`box-${letter}`);
    const messageSpan = document.getElementById('decoded-message');
    const wall = document.getElementById('main-wall');
    
    if (box) {
        const colorClass = COLORS[letter.charCodeAt(0) % COLORS.length];
        playBuzzSound();
        box.classList.add(colorClass);
        messageSpan.innerText += letter;
        
        if (messageSpan.innerText.includes("RUN")) {
            wall.classList.add('heavy-shake');
            playBuzzSound(0.2);
        }

        setTimeout(() => {
            box.classList.remove(colorClass);
        }, 1500);
    }
}

// MEMBER 2 KEY CHANGE: Listen to the server instead of keyboard
socket.on('real-world-flicker', (letter) => {
    activateLetter(letter);
});

// Local controls for demo cleanup
window.addEventListener('keydown', (e) => {
    if (e.key === "Backspace") {
        document.getElementById('decoded-message').innerText = "";
        const wall = document.getElementById('main-wall');
        if(wall) wall.classList.remove('heavy-shake');
    }
});

buildWall();