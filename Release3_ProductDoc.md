 # <center> Project Document - RELEASE 2 </center>
 
## Updates since Release 0
- Added updates, risk management, and project progress sections
- Updated all sections to include information for Release 1
- Weekly meetings changed from Mondays to Fridays at the same time as before
- Added section describing development methodology under Software Methodology
- Added new technologies under Software Methodology (Jest, CircleCI, Octo)
- Added goals for Release 2 in Use Cases

## Updates since Release 1
- Updated sections (testing, project progress, risk management) with new information from Release 2
- Added a new subsection in Project Progress detailing the role each member had for Release 2, and a discussion on features implemented or missed
- Added goals for Release 3 in Use Cases
  - new subsection, detailing finished and unfinished features

## Updates since Release 1
- Updated sections (testing, project progress) with new information from Release 3
- Updated member roles for release
- Added goals for Release 4 along with completed features in Use Cases


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
<p>Our software development will follow the incremental model. This means we will perform analysis, design, coding, and testing for every release cycle. In addition, we have implemented agile-like development practices such as setting short term deliverables and continuous integration.</p>
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

## Project Progress
**RELEASE 3** 
<p>Since the timeframe for this release was smaller, we were unable to complete any major features. For Release 3, we said that we would have a playable prototype of Space Invaders, where the user will be able to move the tank as well as shoot. We also stated that we would have the step back function complete for our visualizer, and that our emulator would be able to load and run any CHIP-8 programs. Additionally, we were hoping to begin development on the tool.</p>
<p>The prototype for Space Invaders is playable; users can now move their tanks and shoot bullets. Furthermore, movement patterns for the aliens have also been implemented. The main feature that needs to be implemented is killing the aliens when a bullet hits them. Our game will consist of 3 levels: level 1 will have 2 aliens, level 2 will have 3 aliens, and level 3 will have 4 aliens. The player will have to beat all 3 levels to win.</p>
<p>Unfortunately, we weren't able to complete the step back function for this release. However, progress has been made and a variety of bugs have been fixed both in the emulator and visualizer. While program loading is not complete, substantial progress has been made. Users can now upload a text (.txt) file on the website and the emulator will attempt to run the program. However, since Ben has not been able to fully implement key input opcodes not every program can be run. Additionally, our current system only accepts text (.txt) files, but we hope will be compatible with .ch8 files for the final release.</p>
<p>A new version of our website is currently being worked on. However, it is still a work in progress and therefore we haven't completely transitioned to it yet. We are still using our old website to test and run our emulator. We have slowed down the cycle speed on our emulator so that it is easier to see what is going on.</p>
<p>We have not begun development on our tool, but we have discussed what it will be and how it will be implemented. As of right now, the plan is to have a standalone app. Some of the ideas include an app that converts .ch8 files into readable text format, a sprite/ audio editor that also allows users to change the cycle speed of the emulator, or a program that aids with writing
games for CHIP-8. The tool will be decided upon and development will begin after the hand in of Release 3.</p>

<p> Here is a list of each member and the role they played in the current release (Release 3)</p>

- Nic - 
- Marko - 
- Ben - n/a
- Rakim - worked on game 2 (movement of aliens, working on visuals, coming up with final game design), created new design for website, documentation
- Ronit - continued working on game 2 (tank movement, shooting, title screen)

## Testing
<p>We will test that our games and tools function on an already completed emulator to ensure that our emulator runs in the same way. We will create a test program that will go through each of the CHIP-8 commands with several test cases to verify that they work properly. To test the games and tools someone would have to play or utilize them. Eventually, CircleCI will be implemented to automatically test the repository after every push. This is to ensure the validity of the code and make sure it matches the style that we have set for our project.</p>
<p>As of Release 1, we have some testing programs implemented into our interpreter. Our first game, Pong, can be tested using any pre-existing emulators found online. In the following week after the hand in, we expect to have our automated testing programs integrated into our Github repository using CircleCI.</p>
<p>As of Release 2, we have created additional automated testing programs for our emulator (for all opcodes except for the key input ones). When the webpage is opened, test.js is automatically run and the output of each test can be seen in the console. The visualizer allows users to pause the program and step forward one instruction at a time, as well as view the contents of the stack, registers and memory. Although our load program function isn't completely finished as of yet, we have set up a file reader that is able to read the contents of a .txt file and parse it into an array. On our website, this can be tested by pressing the "Choose File" button found under the "File Input" section. The display functions of the emulator can be seen in action when the website is loaded, where a sprite can be seen endlessly scrolling across the canvas. Our current cycle rate is very fast, so we suggest that the "Toggle Pause" and "Next" buttons be used to test our emulator. In addition to our emulator, our first game is finished and ready for testing using the steps found in the README file for the game. </p>
<p>In Release 3, we only managed to implement one new feature which is program loading (only works with .txt files). To test this feature, upload the file named "test.txt" from the emulator directory. If the test is passed, a sprite will appear on the emulator screen. Otherwise, nothing will be displayed.  </p>
<p> Currently, the "Game" dropdown menu is just a placeholder and has no real function. It is not supposed to be an actual representation of our emulator loading a CHIP-8 program. This is a feature planned to be completed for the final release.</P>

## Use Cases
<p>Since the next Release is the final one, we hope to have everything completed. This includes a complete emulator and visualizer (that allows for debugging). Our emulator should be able to run any CHIP-8 program: users should be able to pick between our finished versions of Pong or Space Invaders from the website, or upload their own programs (.ch8 files). Additionally, our tool should be completed and ready for use.</p>
<p>Below is a list of our finished and unfinished features:</p>

**FINISHED**
- All opcodes are complete and working
  - automated testing for all opcodes, except for key input opcodes, has been implemented
- Able to read and parse .txt files
- Contents of the stack, registers, timers, memory are visible
- Every instruction is displayed as it is executed
- Execution of a program can be paused, and stepped forward
- Pong is fully complete and playable, will be optimized in future releases
- Space Invaders prototype, with movement and sprite animations
- New and intuitive layout for website (almost finished)

**UNFINISHED**
- Loading contents of .ch8 file into memory array; running programs read from files
- Stepping back in the execution of a program
- Completion of Space Invaders
- Creation of a usable CHIP-8 tool

## Work Breakdown
![Work Breakdown](images/work_breakdown.PNG?raw=true)
<p>The most amount of work will be dedicated to the emulator itself. The main component is the interpreter, however we believe that the debugger/visualizer will take up most of our time. The games will be worked on in parallel with the emulator along with the tool, so they shouldn’t take too much extra time. The website should take the least amount of work to complete as all of the group members have some sort of experience in that department already.</p>

## Project Schedule
![Project Schedule](images/project_schedule.PNG?raw=true)
<p>By release 1 our goal is to finish the emulator and to have a working prototype of our first game. The game will then be polished after the release date and work on the second game will begin. By release 2 we should have the visualizer and the first game finished. Between release 2 and release 3 we will work on having prototypes for the second game and the Chip8 tool, because this work interval is the shortest that we will get. Work on the second game and tool will continue after release 3 and we should have everything completed a week before we have to hand in the final project.</p>
