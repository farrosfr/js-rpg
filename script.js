let level = 1;
let xp = 0;
let health = 100;
let xpToNextLevel = 15; // Butuh 15 XP untuk ke level 2
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const visualContainer = document.querySelector("#visual");
const inventoryContent = document.querySelector("#inventoryContent");
// Deklarasikan variabel untuk #game container di atas
const gameContainer = document.querySelector("#game");
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const levelText = document.querySelector("#levelText");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterImage = document.querySelector("#monsterImage"); // 1. Ambil elemen gambar monster
const heroImage = document.querySelector("#heroImage"); // <-- TAMBAHKAN BARIS INI
const monsterHealthText = document.querySelector("#monsterHealth");
const weapons = [
  { name: 'stick', power: 5, image: './images/stick.png' },
  { name: 'dagger', power: 30, image: './images/dagger.png' },
  { name: 'claw hammer', power: 50, image: './images/claw-hammer.png' },
  { name: 'sword', power: 100, image: './images/sword.png' }
];
const weaponText = document.querySelector("#weaponText");
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15,
    // 2. Tambahkan URL gambar untuk setiap monster
    image: "./images/slime.png"
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60,
    image: "./images/fanged-beast.png"
  },
  {
    name: "dragon",
    level: 20,
    health: 300,
    image: "./images/dragon.png"
  }
]
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\".",
    background: "bg-town" 
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
    background: "bg-store" 
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
    background: "bg-cave" 
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
    //background: "bg-battle" 
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// Dapatkan elemen bar di atas
const playerHealthBar = document.querySelector("#playerHealthBar");
const monsterHealthBar = document.querySelector("#monsterHealthBar");

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function updateInventoryScreen() {
  // Ambil senjata yang sedang dipakai
  let currentWeaponStats = weapons[currentWeapon];

  // Kosongkan konten sebelumnya
  inventoryContent.innerHTML = "";

  // Buat konten baru
  //inventoryContent.innerHTML += `<p>Level: <strong>${level}</strong></p>`;
  //inventoryContent.innerHTML += `<p>XP: <strong>${xp} / ${xpToNextLevel}</strong></p>`;
  //inventoryContent.innerHTML += `<p>Health: <strong>${health} / 100</strong></p>`; // Asumsi maks 100
  //inventoryContent.innerHTML += `<p>Gold: <strong>${gold}</strong></p>`;
  //inventoryContent.innerHTML += `<p>Weapon: <strong>${currentWeaponStats.name}</strong></p>`;
  //inventoryContent.innerHTML += `<p>Damage: <strong>${currentWeaponStats.power}</strong></p>`;

  // Buat struktur HTML baru
  inventoryContent.innerHTML = `
    <div class="weapon-stats">
      <p>Weapon: <strong>${currentWeaponStats.name}</strong></p>
      <p>Damage: <strong>${currentWeaponStats.power}</strong></p>
    </div>
    <img id="weaponImage" src="${currentWeaponStats.image}" alt="${currentWeaponStats.name}">
  `;
}

function update(location) {
  monsterStats.style.display = "none";
  monsterImage.style.display = "none"; // 3. Sembunyikan monster saat pindah lokasi
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;

  // --- TAMBAHKAN LOGIKA INI ---
  if (location.name === "store") {
    if (currentWeapon < weapons.length - 1) {
      let nextWeapon = weapons[currentWeapon + 1];
      button2.innerText = "Buy " + nextWeapon.name + " (30 gold)";
    } else {
      button2.innerText = "Sell weapon for 15 gold";
      button2.onclick = sellWeapon;
    }
  }
  // --- AKHIR DARI LOGIKA TAMBAHAN ---

  visualContainer.classList.remove("bg-town", "bg-store", "bg-cave", "bg-battle");

  // 2. Tambahkan class background yang baru sesuai lokasi
  if (location.background) {
    visualContainer.classList.add(location.background);
  }
}

function goTown() {
  update(locations[0]);
  monsterStats.style.display = "none";
  monsterImage.style.display = "none";
  // --- PASTIKAN BARIS INI ADA ---
  monsterImage.classList.remove("dragon-large");
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    updateHealthBars(); // Update health bar
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
  updateInventoryScreen(); 
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      //weaponText.innerText = newWeapon; // <-- UPDATE TAMPILAN SENJATA
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
    updateInventoryScreen(); 
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  updateHealthBars();
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  monsterImage.src = monsters[fighting].image;
  monsterImage.style.display = "block";

  if (fighting === 2) { // fighting === 2 adalah index untuk "dragon"
    monsterImage.style.display = "none"; // Sembunyikan gambar naga
  } else {
    monsterImage.src = monsters[fighting].image;
    monsterImage.style.display = "block"; // Tampilkan gambar monster lain
  }

  // 1. Hapus semua class background yang mungkin masih menempel
  visualContainer.classList.remove("bg-town", "bg-store", "bg-cave", "bg-dragon");

  // 2. Cek monster mana yang dilawan
  if (fighting === 2) { // fighting === 2 adalah index untuk "dragon"
    visualContainer.classList.add("bg-dragon"); // Gunakan latar Sarang Naga
  } else { // Jika bukan naga (berarti slime atau fanged beast)
    visualContainer.classList.add("bg-cave"); // Gunakan latar Gua
  }
}

function attack() {
    // 1. Tambahkan class untuk memutar animasi
  heroImage.classList.add("lunge-animation");
  monsterImage.classList.add("flash-animation");

  // 2. Hapus class setelah animasi selesai agar bisa diputar lagi
  setTimeout(() => {
    heroImage.classList.remove("lunge-animation");
  }, 400); // 400ms = 0.4s (sesuai durasi animasi lunge)

  setTimeout(() => {
    monsterImage.classList.remove("flash-animation");
  }, 300); // 300ms = 0.3s (sesuai durasi animasi flash)
  // -- AKHIR KODE ANIMASI --

  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    let damage = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  
    // Tambahkan kesempatan 10% untuk critical hit (damage 2x lipat)
    if (Math.random() <= 0.1) {
        damage *= 2;
        text.innerText += " CRITICAL HIT!";

        // -- Picu Animasi Guncangan --
        gameContainer.classList.add("shake-animation");
        setTimeout(() => {
          gameContainer.classList.remove("shake-animation");
        }, 500); // Durasi harus sama dengan di CSS
    }
    
    monsterHealth -= damage;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }

  // Di dalam fungsi attack(), setiap kali healthText atau monsterHealthText diupdate:
  // Update juga barnya
  //playerHealthBar.style.width = health + "%";
  //monsterHealthBar.style.width = (monsterHealth / monsters[fighting].health * 100) + "%";
  updateHealthBars();
  updateInventoryScreen(); 
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function checkLevelUp() {
  if (xp >= xpToNextLevel) {
    level++;
    xp -= xpToNextLevel; // Reset XP setelah naik level
    xpToNextLevel *= 2; // Buat syarat XP berikutnya lebih sulit
    health += 20; // Hadiah naik level: tambah health
    
    levelText.innerText = level; // <-- UPDATE TAMPILAN LEVEL
    // Beri tahu pemain
    text.innerText += "\n\nCongratulations! You reached level " + level + ".";
    xpText.innerText = `${xp} / ${xpToNextLevel}`;
    healthText.innerText = health;
  }
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = `${xp} / ${xpToNextLevel}`;
  update(locations[4]);

  checkLevelUp(); // Panggil fungsi ini setiap kali mengalahkan monster
  updateInventoryScreen(); 
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  level = 1;
  xpToNextLevel = 15;

  levelText.innerText = level;
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = `${xp} / ${xpToNextLevel}`;
  //weaponText.innerText = weapons[0].name; // <-- Reset tampilan senjata
  goTown();
  updateHealthBars(); // Reset health bar
  updateInventoryScreen(); 
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}

function updateHealthBars() {
  // Update Player Health Bar
  let playerHealthPercent = (health / 100) * 100; // Asumsi health maks 100
  playerHealthBar.style.width = playerHealthPercent + "%";
  
  if (playerHealthPercent <= 20) {
    playerHealthBar.style.backgroundColor = "#c0392b"; // Merah
  } else if (playerHealthPercent <= 50) {
    playerHealthBar.style.backgroundColor = "#f1c40f"; // Kuning
  } else {
    playerHealthBar.style.backgroundColor = "#2ecc71"; // Hijau
  }

  // Update Monster Health Bar (hanya jika sedang bertarung)
  if (fighting !== undefined) {
    let monsterMaxHealth = monsters[fighting].health;
    let monsterHealthPercent = (monsterHealth / monsterMaxHealth) * 100;
    monsterHealthBar.style.width = monsterHealthPercent + "%";

    if (monsterHealthPercent <= 20) {
      monsterHealthBar.style.backgroundColor = "#c0392b"; // Merah
    } else if (monsterHealthPercent <= 50) {
      monsterHealthBar.style.backgroundColor = "#f1c40f"; // Kuning
    } else {
      monsterHealthBar.style.backgroundColor = "#2ecc71"; // Hijau
    }
  }
}

xpText.innerText = `${xp} / ${xpToNextLevel}`;
updateInventoryScreen();

// ... (seluruh kode game Anda di atas) ...

// --- LOGIKA UNTUK FOOTER CREDITS ---
// 1. Ambil elemen <p> dengan ID #credits-text
const creditsText = document.querySelector("#credits-text");

// 2. Dapatkan tahun saat ini secara dinamis
const currentYear = new Date().getFullYear();

// 3. Bangun konten HTML untuk kredit
const creditsContent = `© ${currentYear}. Developed by <a href="https://farrosfr.com" target="_blank">FarrosFR</a>`;

// 4. Masukkan konten ke dalam elemen <p>
creditsText.innerHTML = creditsContent;