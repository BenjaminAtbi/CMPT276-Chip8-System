<p>Created using OCTO and exported as a .ch8 file. It was then tested using a pre existing emulator.</p>

<p>A completed version of PONG. The left paddle is moved by pressing 1 for up and Q for down. Similarly,
the right paddle is moved by pressing 3 for up and E for down. All collisions are programmed; 
if a ball hits the top or bottom, it will ricochet. When the ball hits the paddles, its horizontal momentum
is reversed. The score is tracked and displayed accurately in the middle of the screen. Furthermore,
the paddles are able to wrap around the sceen (goes below and comes back from the top).</p>

This version of Pong is made for 2 players, and **the program is terminated when either player reaches a score of 5**. The program ends with a flashing GG screen in order to give a sense of accomplishment to the winner.

FINISHED FEATURES
- drawing gamestate (score, paddles, ball)
- user input for left and right paddles
- basic ball movement (bounces off walls, resets the game if it goes out of bounds)
- score tracking and updating
  - properly displayed/ updated, terminates game when either player reaches a score of 5 with a GG message (after a short pause)
- ball collision with paddles

BONUS FEATURES (MAY BE IMPLEMENTED FOR FINAL RELEASE)
- option to pick between player 2 or computer
  - add an AI to be played against
- add a main menu and the option to restart the game once a player wins
- in the GG screen, display which player won
- sounds
  - when ball goes out of bounds
  - victory sound

TEST THE GAME USING THE FOLLOWING LINK: https://johnearnest.github.io/Octo/index.html?key=D4UvJ3cV
