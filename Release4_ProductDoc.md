 # <center> Project Document - RELEASE 2 </center>
 
 ## Updates since Release 4
- Updated sections (software methodology, risk management, project progress, testing) with new information from Release 4
- Updated list of uses cases and completed features
- Updated work breakdown to have member roles for release
- New project schedule, showing planned vs. actual schedule

## Introduction
<p> Our project is to develop a virtual machine that can run CHIP-8 programs (games, tools, etc.). Furthermore, we will be developing at least 2 CHIP-8 games, a debugger, and one other tool that would be useful for a software developer. The virtual machine will be put on an interactive website for people to use.</p>

## Meeting Schedule
<p>Weekly meetings will be held Fridays at 11:00 am to 11:30 am at the SFU Surrey campus. Longer meetings will be held throughout the term as needed in order to meet milestones and schedule dates. We will also have meetings online through our Discord if need be. Each meeting will serve as means for each individual member to give an update of the work that was done by them over the past week. We will then also set goals for ourselves to reach before the next meeting.</p>
Each meeting will be recorded (in text form) and shared with the members not only to keep track of information, but also in case someone is not able to make it to the meeting.

## Communication
Communication will be done through weekly meetings, Github, and Discord.

**Github:**
- Used for code reviews, organizing and managing issues
- Taking advantage of Github functions such as labels, milestones, etc, as well as - version control functions such as branching.
- Allows everything to be organized

**Meetings:**
- Weekly meetings on Fridays prior to class
- Location decided day before, generally in CSIL
- Progress updates, set milestones to achieve before next meeting

**Discord**
- Members expected to check discord frequently; main source of communication
- Includes links to all documents and resources required for this project
- A Github bot will be implemented to send push notifications, etc.
- Includes voice chat that can be used if needed
- Can hold unofficial meetings

## Software Methodology
<p>Our software development will follow the incremental model,since our software is divided in many smaller versions,it grows incrementaly. This means we will perform analysis, design, coding, and testing for every release cycle. In addition, we have implemented agile-like development practices such as setting short term deliverables and continuous integration. We as a whole team always prioritized working software and team collaboration. There were no prescribed standards; rather, all the team members got to work over the software parts that they wanted to. Trying to be as close to agile like development, we always kept the manifesto, "Plan to Replan", in mind in order to have good risk management.</p>
<p>We will use git as our version control software, with a github repository. Typescript, HTML, and the CHIP-8 instruction set are our languages of choice to develop the games and tools necessary. In addition, we may use JQuery while integrating the presentation website. We will develop automated tests using Jest, and use CircleCI to aid us in continuous integration. Finally, we will use Octo to help us with programming the games.</p>
<p>Our team of 5 is divided into separate groups for the work that needs to be done. There is one main project manager (who has the most experience with Git), 3 people specializing in emulator design and 2 general programmers (responsible for the games and tools). Furthermore, there are 3 people dedicated to design the website for the emulator and keeping track of the documentation of our project. Each person has more than one role that they are not necessarily limited to.</p>
The following table shows the roles that each group member has.

|             | Project Manager | Emulator | Tools | Games | Documentation and Design |
|-------------|:---------------:|:--------:|:-----:|:-----:|:------------------------:|
| Benjamin A. |        x        |     x    |   x   |       |                          |
| Rakim Z.    |                 |          |   x   |   x   |             x            |
| Marko M.    |        x        |     x    |       |   x   |                          |
| Ronit C.    |                 |          |   x   |   x   |             x            |
| Nic V.      |                 |     x    |   x   |       |             x            |

<p>Emulator work will be split up into the different commands that Chip8 has as well as the main functions of the emulator. One member will implement the commands while the other two group members can split the work on functions such as memory management, interpretation, the subroutine call stack, and so on. Afterwards, the same team will work on the visualizer for the emulator.</p>
<p>Two group members will be assigned to game design at one time. Because the type of game we decide to make could vary greatly, the work breakdown will have to be decided once the plan for the game is set. The two group members will split the workload evenly between them.</p>
<p>The documentation will be procedural and will be constantly updated after every weekly meeting to add new information or change previous revisions</p>

## Risk Management
Due to the nature of the project, we may run into problems such as:
- Members falling sick
- Unpredictable emergencies that may lead to a member not being able to finish their work
- Members simply not doing their work or not communicating
- Issues regarding Github
<p> As a result, we have decided to make sure that we are always communicating. Every member is expected to give an update on what they are working on, and is also expected to explain why they couldn't complete the tasks that they were assigned. To ensure that members don't miss out on meeting discussions as a result of unpredictable events, we will be keeping track of what was discussed. Furthermore, if a person is unable to complete the work then the other group members will help them to the best of their ability. Members are expected to store an up to date version of our Github repository locally on their computer, so that in the case of any emergencies we have a backup.</p>
<p>During our development process for Release 2, we came across problems with group members having multiple exams to study for and not being able to work on their assigned tasks. Due to this, we will be sharing our exam schedules with each other so that next time we are prepared. Furthermore, failure to communicate with the group will be taken much more seriously and any offences will be recorded as we get closer to the final release.</p>
<p> We had to make a big decision during the time of Release 4. Game 2, Space Invaders, which we had been working over since Release 3 had some bugs which couldn't be handled by us due to inexperiance with Octo, time restrictions or maybe due to the CHIP-8 limitaions. As a result, we had to replan everthing for the game 2. As a result we ended up making Space Fighters, which is inspired by our version of Space Invaders and Outlaw. </p>

## Project Progress
**RELEASE 4**
<p>Since this is the final release, we planned to finish up everything that was left over from last release. We were successful in completing all of the features that we promised. However, we were unable to complete Space Invaders, but opted to make a new game instead.</p>
<p>In our development for Space Invaders, we ran into some problems. Due to time restraints, a lack of experience with Octo, and CHIP-8 limitations, we were unable to complete the game. There were some bugs that we were unable to fix. We used this failure as an inspiration to create Space Fighters, an original game inspired by Outlaw and Space Invaders. We created two versions of the game: vs AI and 2-player. The sprites for this program were creating using our own sprite editor. However, since we lost a lot of time, we had to follow a guide to implement the AI for the vs. AI version of the game.</p>
<p>In terms of our emulator, all features are completed (key input, opcodes, etc.). We are able to play our own games, as well as roms found online. Furthermore, we have successfully implemented binary file reading, meaning our emulator now supports .ch8 files. Our visualizer displays the correct values for the stacks and registers. Furthermore, programs can be pasued, stepped back/forward, and reset. As a bonus feature, we added the option to change the cycle speed of the emulator.</p>
<p>In this release, we began and finished development for a sprite editor. Users can create an 8x15 sprite, with features including drawing and erasing pixels, along with the option to clear the canvas. The sprite data is available in 3 different styles: binary, hex, and hex with 0x prefix. We used our own tool to create the sprites for our final game, Space Fighters, to test the editor.</p>
<p>Our website design is finalized and functional. It allows users to upload their own programs or pick from pre-existing programs. Furthermore, we have connected the sprite editor and "About" pages with the main html page.</p>

## Testing
<p>We will test that our games and tools function on an already completed emulator to ensure that our emulator runs in the same way. We will create a test program that will go through each of the CHIP-8 commands with several test cases to verify that they work properly. To test the games and tools someone would have to play or utilize them. Eventually, CircleCI will be implemented to automatically test the repository after every push. This is to ensure the validity of the code and make sure it matches the style that we have set for our project.</p>
<p>As of Release 1, we have some testing programs implemented into our interpreter. Our first game, Pong, can be tested using any pre-existing emulators found online. In the following week after the hand in, we expect to have our automated testing programs integrated into our Github repository using CircleCI.</p>
<p>As of Release 2, we have created additional automated testing programs for our emulator (for all opcodes except for the key input ones). When the webpage is opened, test.js is automatically run and the output of each test can be seen in the console. The visualizer allows users to pause the program and step forward one instruction at a time, as well as view the contents of the stack, registers and memory. Although our load program function isn't completely finished as of yet, we have set up a file reader that is able to read the contents of a .txt file and parse it into an array. On our website, this can be tested by pressing the "Choose File" button found under the "File Input" section. The display functions of the emulator can be seen in action when the website is loaded, where a sprite can be seen endlessly scrolling across the canvas. Our current cycle rate is very fast, so we suggest that the "Toggle Pause" and "Next" buttons be used to test our emulator. In addition to our emulator, our first game is finished and ready for testing using the steps found in the README file for the game. </p>
<p>In Release 3, we only managed to implement one new feature which is program loading (only works with .txt files). To test this feature, upload the file named "test.txt" from the emulator directory. If the test is passed, a sprite will appear on the emulator screen. Otherwise, nothing will be displayed.</p>
<p>For Release 4, we originally planned to do our automated testing using CircleCI and Jest, however we ran into problems getting those to work. Our project underwent a refactoring where we separated all non-related code into their own files, and reorganized the structure of the entire project. Because of this we started getting errors from Jest that we were unable to deal with. We decided to prioritize the organization of our project, over the use of Jest, because it made it much easier for us to modify and read our code. Instead of Jest, we modified our original test program. The program tests each of our emulator's commands, and now outputs results to it's own webpage, named testPage.html.</p>

## Use Cases
<p>Our emulator is functional and can play pre-loaded games, as well as roms found online. There are a variety of games for users to pick from, including classics like Pong. Furthermore, we have implemented various debugging options for users that may want to learn more about the CHIP-8 architecture. Furthermore, we have developed a sprite editor that can be used to program games or apps for a CHIP-8 emulator. Additionally, all of these programs have working, interactable websites that are associated with them.</p>
<p>Below is a list of our finished features:</p>

**FINISHED**
- Emulator
  - All opcodes are complete and working
  - Able to read and parse .txt and binary files, and run programs
  - Emulator runs and can play any game found online, uploaded by users, or preloaded games
- Visualier/ Debugger
  - Contents of the stack, registers, timers, memory are visible
  - Every instruction is displayed as it is executed
  - Execution of a program can be paused, and stepped back/forward
- Games
  - Pong is fully complete and playable, will be optimized in future releases
  - Space Invaders prototype, with movement and sprite animations
  - New game, Space Fighters, with 2 versions: vs AI, or 2-player. Fully completed and playable.
- Tool: Sprite Editor
  - Can create 8x15 sprites
  - Draw/erase, clear canvas
  - 3 different forms of data: binary, hex, and hex with 0x prefix
- Website
  - Fully functional
  - Links the sprite editor and emulator
  - Includes an "About" page

## Work Breakdown
<p> Here is a list of every member and the role they played in our project</p>

- Nic - continued working on completing the step back portion of the visualizer and general bug fixing
- Marko - 
- Ben -
- Rakim - developed games (Pong, Space Fighters, Space Invaders), worked on documentation (release documents, presentations, and demo video), sprite editor, websites
- Ronit - continued working on game 2 (tank movement, shooting, title screen)

## Project Schedule
![Project Schedule](images/project_schedule.PNG?raw=true)
<p>The lighter bars show our originally planned work schedule, the darker bars show the additional time we needed to complete each part. Our emulator and visualizer were mostly completed by their respective deadlines but they both had difficult features that took longer to complete. The emulator’s input features and the visualizer step back feature both had to be pushed back to after release. Also both had to be continuously modified and fixed throughout the semester. Originally both games had an equal amount of time spent on them, but we failed to account for the time it would take us to learn how to program with CHIP-8. As a result the first game’s completion was pushed back, but the second game was completed in a much shorter time frame once we were comfortable with CHIP-8.</p>
