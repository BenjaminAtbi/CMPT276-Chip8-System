<p>Created using OCTO and exported as a .ch8 file. It was then tested using a pre existing emulator.</p>

<p>A completed version of PONG. The left paddle is moved by pressing 1 for up and Q for down. Similarly,
the right paddle is moved by pressing 3 for up and E for down. All collisions are programmed; 
if a ball hits the top or bottom, it will ricochet. When the ball hits the paddles, its horizontal momentum
is reversed. The score is tracked and displayed accurately in the middle of the screen. Furthermore,
the paddles are able to wrap around the sceen (goes below and comes back from the top).</p>

<p>This version of Pong is made for 2 players, and **the program is terminated when either player reaches a score of 5**.</p>

FINISHED FEATURES
- drawing gamestate (borders, score, paddles, ball)
- user input for left and right paddles
- basic ball movement (bounces off walls, resets the game if it goes out of bounds)
- score tracking and updating
  - properly displayed/ updated, terminates game when either player reaches a score of 5 with a GG message
- ball collision with paddles

PLANNED FEATURES (BONUS)
- option to pick between player 2 or computer
  - add an AI to be played against
- add a main menu and the option to restart the game once a player wins
- in the GG screen, display which player won

TEST THE GAME USING THE FOLLOWING LINK: https://johnearnest.github.io/Octo/index.html?key=D4UvJ3cV
