jQuery(function () {
  // Setting pre-requisites
  const choices = ["stone", "paper", "scissor"];
  let userScore = 0;
  let cpuScore = 0;

  // calling audio files
  const winGameAudio = new Audio("./public/audio/win_game_sfx.mp3");
  const loseGameAudio = new Audio("./public/audio/lose_game_sfx.mp3");
  const drawGameAudio = new Audio("./public/audio/draw_game_sfx.mp3");

  // setting effect files
  const win_game_effect = "./public/image/effects/win_gif.gif";
  const lose_game_effect = "./public/image/effects/lose_gif.gif";
  const draw_game_effect = "./public/image/effects/draw_gif.gif";

  // setting props files
  const stone_prop = "./public/image/props/stone.png";
  const paper_prop = "./public/image/props/paper.png";
  const scissor_prop = "./public/image/props/scissor.png";
  const selectedProp = [stone_prop, paper_prop, scissor_prop];

  // setting parameters
  const top_left = $("#top-left"); // for text
  const top_center = $("#top-center"); // for text
  const top_right = $("#top-right"); // for text
  const middle_left = $("#middle-left"); // for image
  const middle_center = $("#middle-center"); // for image
  const middle_right = $("#middle-right"); // for image
  const bottom_left = $("#bottom-left"); // for text (user score count)
  const bottom_center = $("#bottom-center"); // for button
  const bottom_right = $("#bottom-right"); // for text (cpu score count)

  // Pre-Game function
  function gameStart() {
    userChoice = null;
    compChoice = choices[Math.floor(Math.random() * choices.length)]; // Re-randomize computer choice

    top_left.html("");
    top_center.html("Options");
    top_right.html("");

    middle_left.html(
      `<button aria-label="option 1" type="button" class="btn btn-outline-primary option-btn" data-option="stone"><img src="${stone_prop}" alt="Stone" class="myImage" /></button>`
    );
    middle_center.html(
      `<button aria-label="option 2" type="button" class="btn btn-outline-primary option-btn" data-option="paper"><img src="${paper_prop}" alt="Paper" class="myImage" /></button>`
    );
    middle_right.html(
      `<button aria-label="option 3" type="button" class="btn btn-outline-primary option-btn" data-option="scissor"><img src="${scissor_prop}" alt="Scissor" class="myImage" /></button>`
    );
    bottom_center.html(
      '<button id="play-btn-1" type="button" class="btn btn-success">Play</button>'
    );

    // Reinitialize game logic to reattach event listeners
    gameLogic();
  }

  // Gameplay function
  function gameplay(userSelection, compSelection) {
    // locking game state as the gameplay function runs.
    if (!choices.includes(userSelection)) {
      return "condition 0"; // Invalid choice
    }

    if (userSelection === compSelection) {
      bottom_left.text(`${userScore}`);
      bottom_right.text(`${cpuScore}`);
      return "condition 1"; // Tie
    }

    if (
      (userSelection === "stone" && compSelection === "scissor") ||
      (userSelection === "paper" && compSelection === "stone") ||
      (userSelection === "scissor" && compSelection === "paper")
    ) {
      userScore++;
      bottom_left.text(`${userScore}`);
      bottom_right.text(`${cpuScore}`);
      return "condition 2"; // User wins
    }

    cpuScore++;
    bottom_left.text(`${userScore}`);
    bottom_right.text(`${cpuScore}`);
    return "condition 3"; // CPU wins
  }

  // restart game function.
  function restartGame() {
    userChoice = null;
    compChoice = choices[Math.floor(Math.random() * choices.length)]; // Re-randomize computer choice

    top_left.html("");
    top_center.html("Options");
    top_right.html("");

    middle_left.html(
      `<button aria-label="option 1" type="button" class="btn btn-outline-primary option-btn" data-option="stone"><img src="${stone_prop}" alt="Stone" class="myImage" /></button>`
    );
    middle_center.html(
      `<button aria-label="option 2" type="button" class="btn btn-outline-primary option-btn" data-option="paper"><img src="${paper_prop}" alt="Paper" class="myImage" /></button>`
    );
    middle_right.html(
      `<button aria-label="option 3" type="button" class="btn btn-outline-primary option-btn" data-option="scissor"><img src="${scissor_prop}" alt="Scissor" class="myImage" /></button>`
    );
    bottom_center.html(
      '<button id="play-btn-1" type="button" class="btn btn-success">Play</button>'
    );

    // Reinitialize game logic to reattach event listeners
    gameLogic();
  }

  function gameLogic() {
    $(".option-btn").on("click", function () {
      // Remove active class from all buttons
      $(".option-btn").removeClass("active");
      // Add active class to the clicked button
      $(this).addClass("active");
      // Store the selected option's data attribute
      userChoice = $(this).data("option");
    });

    // starting game with a click of a button.
    $("#play-btn-1").on("click", function () {
      if (!userChoice) {
        $(".option-btn").removeClass("active");
        alert("Please select an option before playing!");
      } else {
        // Pass the selected option to further logic
        console.log("Selected option:", userChoice);
        $(".option-btn").removeClass("active");

        bottom_center.html(
          '<button id="play-btn-2" type="button" class="btn btn-primary">Play Again</button>'
        );
        $("#play-btn-2").on("click", function () {
          restartGame();
        });

        // Update display
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

        // Game logic.
        switch (gameplay(userChoice, compChoice)) {
          case "condition 0":
            // on invalid condition.
            alert("Invalid operation");
            break;
          case "condition 1":
            // on tie condition.
            top_center.html("<p>It's a tie!</p>");
            middle_center.html(
              `<img src="${draw_game_effect}" alt="tie game" class="myClass" />`
            );
            drawGameAudio.play();
            break;
          case "condition 2":
            // on win condition.
            top_center.html(
              `<p>You win! ${userChoice} beats ${compChoice}</p>`
            );
            middle_center.html(
              `<img src="${win_game_effect}" alt="win game" class="myImage" />`
            );
            winGameAudio.play();
            break;
          case "condition 3":
            // on lose condition.
            top_center.html(
              `<p>You lose! ${compChoice} beats ${userChoice}</p>`
            );
            middle_center.html(
              `<img src="${lose_game_effect}" alt="lose game" class="myImage" />`
            );
            loseGameAudio.play();
            break;
          default:
            alert("Invalid operation");
            break;
        }
      }
    });
  }

  // Main.
  gameStart();
});
