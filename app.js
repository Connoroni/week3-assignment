let gameData = {
  cookieCount: 99,
  cookiesPerSec: 0,
  cookiesPerClick: 1,
  upgrade1: 0,
  upgrade2: 0,
  upgrade3: 0,
  upgrade4: 0,
  upgrade5: 0,
  upgrade6: 0,
  upgrade7: 0,
  upgrade8: 0,
  upgrade9: 0,
  upgrade10: 0,
  // upgrade numbers are showing the total number the user has of each upgrade
};
//! Get gameData from local storage here
//if (saveData != null) {gameData = saveData}
//else {gameData = {OBJECT TO DECLARE GAMEDATA HERE}}

const upgradesArray = [];
async function getShopUpgrades() {
  const result = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  //   console.log(result);
  const resultJson = await result.json();
  //   console.log(resultJson);
  //   const resultWrangled = resultJson[0];
  //   return resultWrangled;
  //I was wrong, no wrangling needed
  upgradesArray.push(resultJson);
  // console.log(upgradesArray);
  renderUpgrades();
}
getShopUpgrades();

// upgradesArray[0][0].name = newName;
// upgradesArray[0][1].name = newName;
// upgradesArray[0][2].name = newName;
// upgradesArray[0][3].name = newName;
// upgradesArray[0][4].name = newName;
// upgradesArray[0][5].name = newName;
// upgradesArray[0][6].name = newName;
// upgradesArray[0][7].name = newName;
// upgradesArray[0][8].name = newName;
// upgradesArray[0][9].name = newName;

//You would not believe how long it took me to realise that my problem was that the .push makes an array within another array so each item is actually upgradesArray[0][i]

const shopBox = document.getElementById("shopBox");
async function renderUpgrades() {
  // const getItems = await getShopUpgrades();
  // getItems.forEach(function (upgrade) {
  await getShopUpgrades;
  for (let i = 0; i < upgradesArray[0].length; i++) {
    // console.log(i);
    const upgradeContainer = document.createElement("div");
    upgradeContainer.className = "shop-item";
    upgradeContainer.id = `upgrade${i}`;
    shopBox.appendChild(upgradeContainer);
    //? let upgradeAmount = document.createElement("p");
    //? upgradeAmount.textContent = gameData
    let upgradeName = document.createElement("p");
    upgradeName.textContent = upgradesArray[0][i].name;
    upgradeContainer.appendChild(upgradeName);
    let upgradeCost = document.createElement("p");
    upgradeCost.textContent = `Cost: ${upgradesArray[0][i].cost}`;
    upgradeContainer.appendChild(upgradeCost);
    let upgradeIncrease = document.createElement("p");
    upgradeIncrease.textContent = `+${upgradesArray[0][i].increase} cookies/second`;
    upgradeContainer.appendChild(upgradeIncrease);
    let upgradeButton = document.createElement("button");
    upgradeButton.textContent = "Buy";
    upgradeButton.className = "upgrade-button";
    upgradeContainer.appendChild(upgradeButton);
    //!add event listeners here
    upgradeButton.addEventListener("click", function () {
      if (upgradesArray[0][i].cost <= gameData.cookieCount) {
        gameData.cookieCount = gameData.cookieCount - upgradesArray[0][i].cost;
        gameData.cookiesPerSec =
          gameData.cookiesPerSec + upgradesArray[0][i].increase;
        updateCookies();
        cookieSecDisplay.textContent = `Cookies per second ${gameData.cookiesPerSec}`;
        console.log(`Purchased ${upgradesArray[0][i].name}`);
      } else {
        const notEnough = document.getElementById("notEnough");
        notEnough.style.display = "block";
        setTimeout(() => {
          notEnough.style.display = "none";
        }, 1000);
      }
    });
  }
}

const cookieCountDisplay = document.getElementById("cookieCount");
cookieCountDisplay.textContent = `Cookie count: ${gameData.cookieCount}`;
const cookieSecDisplay = document.getElementById("cookiesPerSec");
cookieSecDisplay.textContent = `Cookies per second ${gameData.cookiesPerSec}`;
const cookieClickDisplay = document.getElementById("cookiesPerClick");
cookieClickDisplay.textContent = `Cookies per click: ${gameData.cookiesPerClick}`;

function updateCookies() {
  cookieCountDisplay.textContent = `Cookie count: ${gameData.cookieCount}`;
}

const bigButton = document.getElementById("bigButton");
bigButton.addEventListener("click", bigButtonHandler);
function bigButtonHandler() {
  gameData.cookieCount = Number(
    gameData.cookieCount + gameData.cookiesPerClick
  );
  cookieCountDisplay.textContent = `Cookie count: ${gameData.cookieCount}`;
  // console.log(`Cookie count: ${gameData.cookieCount}`);
}

setInterval(() => {
  gameData.cookieCount = gameData.cookieCount + gameData.cookiesPerSec;
  updateCookies();
  //!save to local storage goes here
}, 1000);
