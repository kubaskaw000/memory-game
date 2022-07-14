let level = 1;

const setNextLevel = async () => {
  await sleep(500);
  alert("Przeszedłes poziom. Kliknij OK aby przejsc dalej");

  level++;
  playRound(level);
};

const restartGame = async () => {
  await sleep(500);
  alert("Przegrales! Twój maksymalny poziom to: " + level);
  document.location.reload();
};

const boardGenerator = (sideSquare) => {
  const board = document.getElementById("board");

  board.innerHTML = "";
  let index = 0;
  for (let i = 0; i < sideSquare; i++) {
    for (let j = 0; j < sideSquare; j++) {
      let boardTile = document.createElement("div");
      boardTile.setAttribute("id", index.toString());
      boardTile.setAttribute("class", "board__tile");
      boardTile.style.background = "bisque";
      board.appendChild(boardTile);

      index++;
    }
  }
};

const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const getRandomTiles = (level, min, max) => {
  const randomTiles = [];
  for (let i = 0; i < level; i++) {
    randomTiles.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return randomTiles;
};

const checkPick = (pickId, moveId, randomTiles) => {
  if (pickId == randomTiles[moveId]) return true;
  else return false;
};

const showRandomTiles = async (randomTiles, visibilityTime) => {
  for (let i = 0; i < randomTiles.length; i++) {
    await sleep(visibilityTime);
    document.getElementById(randomTiles[i]).style.background = "brown";
    await sleep(visibilityTime);
    document.getElementById(randomTiles[i]).style.background = "bisque";
  }
};

const setLevelTitle = () => {
  const menu = document.getElementById("menu");
  menu.innerHTML = "";

  let levelTitle = document.createElement("div");
  levelTitle.setAttribute("id", "menu__level");
  levelTitle.innerHTML = "Poziom: " + level;
  menu.appendChild(levelTitle);
};

const setTileStyle = async (tile, isCorrect) => {
  if (isCorrect) {
    tile.style.background = "green";
    await sleep(300);
    tile.style.background = "bisque";
  } else {
    tile.style.background = "red";
    await sleep(300);
    tile.style.background = "bisque";
  }
};

const playRound = async (level) => {
  setLevelTitle();
  boardGenerator(5);
  let randomTiles = getRandomTiles(level, 0, 24);
  let moveId = 0;
  let boardTiles = document.getElementsByClassName("board__tile");
  boardTiles = [...boardTiles];

  await showRandomTiles(randomTiles, 700);

  boardTiles.map((tile) => {
    tile.addEventListener("click", async () => {
      if (checkPick(tile.id, moveId, randomTiles)) {
        setTileStyle(tile, true);

        if (randomTiles.length == moveId + 1) {
          setNextLevel();
        }
      } else {
        setTileStyle(tile, false);
        await sleep(500);
        restartGame();
      }
      moveId++;
    });
  });
};

const startCounter = async () => {
  const menu = document.getElementById("board");

  let counter = document.createElement("div");
  counter.setAttribute("id", "counter");
  menu.appendChild(counter);

  for (let i = 3; i >= 0; i--) {
    counter.innerHTML = i;
    await sleep(1000);
  }

  menu.removeChild(counter);
};

const init = () => {
  boardGenerator(5);

  const toggleButton = document.getElementById("board__button");
  toggleButton.addEventListener("click", async () => {
    toggleButton.disabled = true;

    await startCounter();
    playRound(level);
  });
};

init();
