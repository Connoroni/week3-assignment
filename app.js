let gameData = {
  cookieCount: 0,
  cookiesPerSec: 0,
  //cookiesPerClick: 0,
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
  console.log(upgradesArray);
  renderUpgrades();
}
getShopUpgrades();

//You would not believe how long it took me to realise that my problem was that the .push makes an array within another array so each item is actually upgradesArray[0][i]

const shopBox = document.getElementById("shopBox");
async function renderUpgrades() {
  // const getItems = await getShopUpgrades();
  // getItems.forEach(function (upgrade) {
  await getShopUpgrades;
  for (let i = 0; i < upgradesArray[0].length; i++) {
    console.log(i);
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
    upgradeCost.textContent = upgradesArray[0][i].cost;
    upgradeContainer.appendChild(upgradeCost);
    let upgradeIncrease = document.createElement("p");
    upgradeIncrease.textContent = upgradesArray[0][i].increase;
    upgradeContainer.appendChild(upgradeIncrease);
    console.log(upgradeIncrease);
  }
}
