jQuery(function () {
  // Setting pre-requisites
  const choices = ["stone", "paper", "scissor"];
  let userChoice;
  let compChoice;
  let userScore = 0;
  let cpuScore = 0;

  // Calling audio files
  const winGameAudio = new Audio("./public/audio/win_game_sfx.mp3");
  const loseGameAudio = new Audio("./public/audio/lose_game_sfx.mp3");
  const drawGameAudio = new Audio("./public/audio/draw_game_sfx.mp3");

  // Setting effect files
  const winGameEffect = "./public/image/effects/win_gif.gif";
  const loseGameEffect = "./public/image/effects/lose_gif.gif";
  const drawGameEffect = "./public/image/effects/draw_gif.gif";

  // Setting props files
  const stoneProp = "./public/image/props/stone.png";
  const paperProp = "./public/image/props/paper.png";
  const scissorProp = "./public/image/props/scissor.png";
  const selectedProp = [stoneProp, paperProp, scissorProp];

  // Setting parameters
  const top_left = $("#top-left");
  const top_center = $("#top-center");
  const top_right = $("#top-right");
  const middle_left = $("#middle-left");
  const middle_center = $("#middle-center");
  const middle_right = $("#middle-right");
  const bottom_left = $("#bottom-left");
  const bottom_center = $("#bottom-center");
  const bottom_right = $("#bottom-right");
  const game_result = $("#game-conclusion");

  // Function to handle audio playback
  function playAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  // Function to render game buttons
  function renderGameButtons() {
    middle_left.html(
      `<button aria-label="option stone" type="button" class="btn btn-outline-primary option-btn" data-option="stone"><img src="${stoneProp}" alt="Stone" class="myImage" /></button>`
    );
    middle_center.html(
      `<button aria-label="option paper" type="button" class="btn btn-outline-primary option-btn" data-option="paper"><img src="${paperProp}" alt="Paper" class="myImage" /></button>`
    );
    middle_right.html(
      `<button aria-label="option scissor" type="button" class="btn btn-outline-primary option-btn" data-option="scissor"><img src="${scissorProp}" alt="Scissor" class="myImage" /></button>`
    );
    game_result.html("");
  }

  // Gameplay function
  function gameplay(userSelection, compSelection) {
    if (!choices.includes(userSelection)) {
      return "condition 0"; // Invalid choice
    }

    if (userSelection === compSelection) {
      return "condition 1"; // Tie
    }

    if (
      (userSelection === "stone" && compSelection === "scissor") ||
      (userSelection === "paper" && compSelection === "stone") ||
      (userSelection === "scissor" && compSelection === "paper")
    ) {
      userScore++;
      return "condition 2"; // User wins
    }

    cpuScore++;
    return "condition 3"; // CPU wins
  }

  // Function to update score display
  function updateScore() {
    bottom_left.text(userScore);
    bottom_right.text(cpuScore);
  }

  // Restart game function
  function restartGame() {
    userChoice = null;
    top_left.html("");
    top_center.html("Options");
    top_right.html("");
    renderGameButtons();
    bottom_center.html(
      '<button id="play-btn-1" type="button" class="btn btn-success">Play</button>'
    );
  }

  // Main game logic
  function gameLogic() {
    // Option selection logic
    $(document).on("click", ".option-btn", function () {
      $(".option-btn").removeClass("active");
      $(this).addClass("active");
      userChoice = $(this).data("option");
      compChoice = choices[Math.floor(Math.random() * choices.length)];
    });

    // Start the game when "Play" button is clicked
    $(document).on("click", "#play-btn-1", function () {
      if (!userChoice) {
        $(".option-btn").removeClass("active");
        alert("Please select an option before playing!");
        return;
      }

      // Lock the game buttons and reset them for next round
      $(".option-btn").removeClass("active");
      bottom_center.html(
        '<button id="play-btn-2" type="button" class="btn btn-primary">Play Again</button>'
      );

      // Display the selections
      top_left.text("YOU");
      top_right.text("CPU");
      middle_left.html(
        `<img src="${
          selectedProp[choices.indexOf(userChoice)]
        }" alt="user selection" class="myImage" />`
      );
      middle_right.html(
        `<img src="${
          selectedProp[choices.indexOf(compChoice)]
        }" alt="cpu selection" class="myImage" />`
      );

      // Execute game logic and display result
      switch (gameplay(userChoice, compChoice)) {
        case "condition 0":
          alert("Invalid operation");
          break;
        case "condition 1":
          top_center.html("<p>It's a tie!</p>");
          game_result.html(`<p>You both chose ${userChoice}</p>`);
          middle_center.html(
            `<img src="${drawGameEffect}" alt="tie game" class="myImage" />`
          );
          playAudio(drawGameAudio);
          break;
        case "condition 2":
          top_center.html(`<p>You win!</p>`);
          game_result.html(`<p>${userChoice} beats ${compChoice}</p>`);
          middle_center.html(
            `<img src="${winGameEffect}" alt="win game" class="myImage" />`
          );
          playAudio(winGameAudio);
          break;
        case "condition 3":
          top_center.html(`<p>You lose!</p>`);
          game_result.html(`<p>${compChoice} beats ${userChoice}</p>`);
          middle_center.html(
            `<img src="${loseGameEffect}" alt="lose game" class="myImage" />`
          );
          playAudio(loseGameAudio);
          break;
        default:
          alert("Invalid operation");
          break;
      }

      // Update score after game result
      updateScore();
    });

    // Restart the game when "Play Again" button is clicked
    $(document).on("click", "#play-btn-2", function () {
      restartGame();
    });
  }

  // Main function to start the game
  function gameStart() {
    restartGame();
    gameLogic();
  }

  // Initialize the game on page load
  gameStart();
});
