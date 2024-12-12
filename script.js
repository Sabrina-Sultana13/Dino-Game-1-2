 let score = 0;
    let cross = true;
    let audio = new Audio("FastFeelBananaPeel-320bit.mp3");
    let audiogo = new Audio("gameover.mp3");
    let gameRunning = true;

    setTimeout(() => {
      audio.play();
    }, 1000)

    document.addEventListener("DOMContentLoaded", function () {
      document.onkeydown = function (e) {
        if (gameRunning) {
          console.log("Key code is:", e.keyCode);
          if (e.keyCode == 38) {
            dino = document.querySelector('.dino');
            dino.classList.add("animateDino");
            setTimeout(() => {
              dino.classList.remove("animateDino");
            }, 700);
          }
          if (e.keyCode == 39) {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = dinoX + 112 + "px";
          }
          if (e.keyCode == 37) {
            dino = document.querySelector('.dino');
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = (dinoX - 112) + "px";
          }
        }
      };
    });

    setInterval(() => {
      if (gameRunning) {
        dino = document.querySelector('.dino');
        gameOver = document.querySelector('.gameOver');
        obstacle = document.querySelector('.obstacle');
        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));
        ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));
        offsetX = Math.abs(dx - ox);
        offsetY = Math.abs(dy - oy);
        console.log(offsetX, offsetY);
        if (offsetX < 113 && offsetY < 52) {
          gameRunning = false;
          gameOver.innerHTML = 'Game Over😢 - Reload to start over😊';
          obstacle.classList.remove('obstacleAni');
          audio.pause()
          audiogo.play();
          setTimeout(() => {
            audiogo.pause();
          }, 1000)
          dino.classList.add('fallDino'); // Add the falling animation class
        } else if (offsetX < 145 && cross) {
          score += 1;
          updateScore(score);
          cross = false;
          setTimeout(() => {
            cross = true;
          }, 1000);
          setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log("New Animation Duration : ", newDur)
          }, 500);
        }
      }
    }, 10);

    function updateScore(score) {
      const scoreElement = document.getElementById('scoreCount');
      scoreCount.innerHTML = "Your Score: " + score;
    }
