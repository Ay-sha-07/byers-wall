# byers-wall✨

Joyce’s Alphabet Wall as a communication system where the Upside Down can only apply force to letters, and the Real World reconstructs language from the letters that react.

![AzulqasGoodnightGIF (2)](https://github.com/user-attachments/assets/91df220f-b71b-4d1b-99d0-9fabf60ce273)


## Basic Details
### Team Name: Byte Me


### Team Members
- Member 2: Aleesha S Boby - SOE,Cusat
- Member 2: Hannah Achu John - SOE,Cusat
- Member 3: Ayisha Muhammed - SOE,Cusat

###📌 Project Description

Inspired by Stranger Things, Joyce’s Alphabet Wall is a web-based communication system where two different “worlds” interact through a shared alphabet wall.
The Upside Down cannot speak or type messages directly. It can only interact by selecting letters, which then light up in the Real World — one letter at a time.
There is:
❌ No camera
❌ No Morse code
❌ No sensors or hardware

Only state-based communication through a shared digital object — just like Joyce and Will.

###🤔 The Problem (That Technically Doesn’t Exist)

What if two worlds shared the same physical structure but:
Could not talk,
Could not see each other,
Could only interact indirectly?

Traditional communication systems assume direct messaging. But Stranger Things showed us something better — symbolic interaction.

###💡 The Solution

Joyce’s Alphabet Wall recreates that idea digitally.

A 26-letter alphabet grid exists in both worlds.
The Upside Down can only select letters.
The Real World only sees letters glow.

Meaning is reconstructed visually

No decoding. No translation. Just letters — one at a time.

###🧱 How It Works
Shared Object

A real-time alphabet state stored in Firebase.

Upside Down UI
   ↓ (selected letter)
Firebase Realtime Database
   ↓
Real World UI
Communication Rules

Only one letter is sent at a time
Letters are sent in order
No duplicates
Real-time synchronization

###🛠️ Technical Details
Technologies Used:

Frontend
HTML, CSS, JavaScript

Separate UIs for:
Upside Down
Real World

Backend / Bridge
Firebase Realtime Database
JavaScript (no server-side code)
