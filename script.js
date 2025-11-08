let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = { name: "Dagger 🗡️", power: 10 };

const weapons = [
  { name: "Dagger 🗡️", power: 10, cost: 10 },
  { name: "Sword ⚔️", power: 20, cost: 30 },
  { name: "Bow 🏹", power: 25, cost: 40 },
  { name: "Staff 🔮", power: 35, cost: 60 },
];

const xpText = document.getElementById("xp");
const healthText = document.getElementById("health");
const goldText = document.getElementById("gold");
const weaponText = document.getElementById("weapon");
const text = document.getElementById("text");

const goStore = document.getElementById("goStore");
const goCave = document.getElementById("goCave");
const fightDragon = document.getElementById("fightDragon");

const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const closePopup = document.getElementById("closePopup");

function updateStats() {
  xpText.textContent = xp;
  healthText.textContent = health;
  goldText.textContent = gold;
  weaponText.textContent = currentWeapon.name;
}

function showPopup(message) {
  popupMessage.textContent = message;
  popup.style.display = "block";
}

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

goStore.onclick = function() {
  text.innerHTML = "🏪 You enter the store. Choose a weapon to buy:";
  document.getElementById("controls").innerHTML = weapons
    .map(
      (w) =>
        `<button onclick="buyWeapon('${w.name}')">${w.name} - 💰 ${w.cost} gold</button>`
    )
    .join("") + `<br><button onclick="goTown()">🏰 Back to Town</button>`;
};

function buyWeapon(weaponName) {
  const weapon = weapons.find((w) => w.name === weaponName);
  if (gold >= weapon.cost) {
    gold -= weapon.cost;
    currentWeapon = weapon;
    updateStats();
    showPopup(`You bought ${weapon.name}!`);
  } else {
    showPopup("💰 Not enough gold!");
  }
}

goCave.onclick = function() {
  text.innerHTML = "⚔️ You enter the cave and face a monster!";
  const monsters = [
    { name: "🐀 Rat", hp: 20, gold: 5, xpGain: 5 },
    { name: "🐺 Wolf", hp: 40, gold: 10, xpGain: 10 },
  ];
  const monster = monsters[Math.floor(Math.random() * monsters.length)];
  fightMonster(monster);
};

function fightMonster(monster) {
  let monsterHp = monster.hp;
  while (monsterHp > 0 && health > 0) {
    monsterHp -= currentWeapon.power;
    health -= 10;
  }

  if (health <= 0) {
    showPopup("💀 You were defeated... Game over!");
    disableGame();
  } else {
    xp += monster.xpGain;
    gold += monster.gold;
    text.innerHTML = `🎉 You defeated ${monster.name}! Gained ${monster.xpGain} XP and ${monster.gold} gold.`;
    updateStats();
    document.getElementById("controls").innerHTML = `<button onclick="goTown()">🏰 Back to Town</button>`;
  }
}

fightDragon.onclick = function() {
  if (xp < 50 || health < 80) {
    showPopup("⚠️ Kamu belum siap melawan naga!\nMinimal XP 50 dan Health 80.");
  } else {
    fightMonster({ name: "🐉 Dragon", hp: 100, gold: 50, xpGain: 50 });
  }
};

function goTown() {
  text.innerHTML = "🏰 You are back at the town square. What will you do?";
  document.getElementById("controls").innerHTML = `
    <button id="goStore">🏪 Go to Store</button>
    <button id="goCave">⚔️ Go to Cave</button>
    <button id="fightDragon">🐉 Fight Dragon</button>
  `;
  // rebind events
  document.getElementById("goStore").onclick = goStore.onclick;
  document.getElementById("goCave").onclick = goCave.onclick;
  document.getElementById("fightDragon").onclick = fightDragon.onclick;
}

function disableGame() {
  document.getElementById("controls").innerHTML = `<button onclick="location.reload()">🔁 Restart</button>`;
}

updateStats();
