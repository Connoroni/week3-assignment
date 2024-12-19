let gameData = {
  cookieCount: 0,
  cookiesPerSec: 0,
  //cookiesPerClick: 0,
  //upgrade1: 0,
  //upgrade2: 0,
  //upgrade3: 0,
  //upgrade4: 0,
  //upgrade5: 0,
  // upgrade numbers are showing the total number the user has of each upgrade
};
//! Get gameData from local storage here

const shopUpgradesArray = [];
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
  shopUpgradesArray.push(resultJson);
  console.log(shopUpgradesArray);
}
// getShopUpgrades();
