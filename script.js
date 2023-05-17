const gameIds = [730, 570, 440]; // Hardcoded list of game IDs

// Function to fetch game information and display it on the page
async function fetchGameInfo() {
  const gamesList = document.getElementById('games-list');

  for (const gameId of gameIds) {
    const appInfoResponse = await fetch(`https://api.steampowered.com/ISteamApps/GetAppList/v2/`);
    const appInfoData = await appInfoResponse.json();
    const apps = appInfoData.applist.apps;
    const game = apps.find(app => app.appid === gameId);

    if (game) {
      const upToDateResponse = await fetch(`https://api.steampowered.com/ISteamApps/UpToDateCheck/v1/?appid=${gameId}&version=0&format=json`);
      const upToDateData = await upToDateResponse.json();
      const requiredVersion = upToDateData.response.required_version;

      const gameContainer = document.createElement('div');
      gameContainer.classList.add('game-container');

      const gameLogo = document.createElement('img');
      gameLogo.classList.add('game-logo');
      gameLogo.src = `https://steamcdn-a.akamaihd.net/steam/apps/${gameId}/header.jpg`;

      const gameInfo = document.createElement('p');
      gameInfo.textContent = `Name: ${game.name}, Version: ${requiredVersion}`;

      gameContainer.appendChild(gameLogo);
      gameContainer.appendChild(gameInfo);
      gamesList.appendChild(gameContainer);
    }
  }
}

// Call the function to fetch game information
fetchGameInfo();
