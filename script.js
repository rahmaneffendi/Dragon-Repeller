let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = "Dagger 🗡️";

const weapons = [
  { name: "🗡️ Dagger", damage: 10, cost: 10 },
  { name: "⚔️ Sword", damage: 20, cost: 30 },
  { name: "🏹 Bow", damage: 25, cost: 40 },
  { name: "🔮 Staff", damage: 35, cost: 60 },
];

const monsters = [
  { name: "🐀 Rat", hp: 20, gold: 5, xp: 5 },
  { name: "🐺 Wolf", hp: 40, gold: 10, xp: 10 },
  { name: "🐉 Dragon", hp: 100, gold: 50, xp: 50 },
];

function updateStats() {
  document.getElementById("xp").innerText = xp;
  document.getElementById("health").innerText = health;
  document.getElementById("gold").innerText = gold;
  document.getElementById("weapon").innerText = currentWeapon;
}

function showPopup(message) {
  document.getElementById("popup-message").innerText = message;
  document.getElementById("popup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
}

function goTown() {
  document.getElementById("controls").innerHTML = `
    <button onclick="goStore()">🏪 Go to Store</button>
    <button onclick="goCave()">🕳️ Go to Cave</button>
    <button onclick="fightDragon()">🐉 Fight Dragon</button>
  `;
  document.getElementById("text").innerText =
    "🏰 You are in the town square. What will you do?";
}

function goStore() {
  document.getElementById("text").innerHTML = "🏪 Welcome to the Store! Choose what you want to buy:";
  let weaponButtons = weapons
    .map(
      (w) =>
        `<button onclick="buyWeapon('${w.name}')">${w.name} - 💰 ${w.cost} gold</button>`
    )
    .join("");
  document.getElementById("controls").innerHTML = `
    ${weaponButtons}
    <br>
    <button onclick="buyHealth()">❤️ Buy Health Potion (+20 HP) - 💰 10 gold</button>
    <br>
    <button onclick="goTown()">🏰 Back to Town</button>
  `;
}

function buyWeapon(weaponName) {
  const weapon = weapons.find((w) => w.name === weaponName);
  if (gold >= weapon.cost) {
    gold -= weapon.cost;
    currentWeapon = weapon.name;
    updateStats();
    showPopup(`🛒 You bought ${weapon.name}!`);
  } else {
    showPopup("💰 Not enough gold to buy that weapon!");
  }
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 20;
    if (health > 100) health = 100;
    updateStats();
    showPopup("💖 You feel refreshed! Health restored by 20.");
  } else {
    showPopup("💰 Not enough gold for a potion!");
  }
}

function goCave() {
  document.getElementById("controls").innerHTML = `
    <button onclick="fightMonster('🐀 Rat')">🐀 Fight Rat</button>
    <button onclick="fightMonster('🐺 Wolf')">🐺 Fight Wolf</button>
    <button onclick="goTown()">🏰 Back to Town</button>
  `;
  document.getElementById("text").innerText =
    "🕳️ You enter the dark cave... Monsters lurk around!";
}

function fightMonster(monsterName) {
  const monster = monsters.find((m) => m.name === monsterName);
  document.getElementById("text").innerText =
    `${monster.name} appears! Prepare for battle!`;

  let monsterHP = monster.hp;
  let damage = weapons.find((w) => currentWeapon.includes(w.name.split(" ")[1])).damage;

  const fightInterval = setInterval(() => {
    monsterHP -= damage;
    health -= Math.floor(Math.random() * 10) + 5;

    if (monsterHP <= 0) {
      clearInterval(fightInterval);
      xp += monster.xp;
      gold += monster.gold;
      showPopup(`🏆 You defeated ${monster.name}! +${monster.xp} XP, +${monster.gold} Gold`);
      updateStats();
      goTown();
    } else if (health <= 0) {
      clearInterval(fightInterval);
      showPopup("💀 You have fallen in battle...");
      resetGame();
    }
  }, 700);
}

function fightDragon() {
  if (xp < 50 || health < 80) {
    showPopup("⚠️ You are not ready to face the Dragon! Required: XP ≥ 50, Health ≥ 80.");
    return;
  }

  document.getElementById("text").innerText = "🔥 The Dragon roars! The final battle begins!";
  const dragon = monsters.find((m) => m.name === "🐉 Dragon");
  let dragonHP = dragon.hp;
  let damage = weapons.find((w) => currentWeapon.includes(w.name.split(" ")[1])).damage;

  const fightInterval = setInterval(() => {
    dragonHP -= damage;
    health -= Math.floor(Math.random() * 15) + 10;

    if (dragonHP <= 0) {
      clearInterval(fightInterval);
      showPopup("🎉 You defeated the Dragon! The kingdom is saved!");
      updateStats();
      goTown();
    } else if (health <= 0) {
      clearInterval(fightInterval);
      showPopup("💀 You were slain by the Dragon...");
      resetGame();
    }
  }, 800);
}

function resetGame() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = "Dagger 🗡️";
  updateStats();
  goTown();
}
