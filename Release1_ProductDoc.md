 # <center> Project Document - RELEASE 1 </center>
 
## Updates since Release 0
- Added updates section
- Updated all sections to include information for release 2
- Weekly meetings changed from Mondays to Fridays at the same time as before
- Added section describing development methodology under Software Methodology
- Added new technologies under Software Methodology (Jest, CircleCI, Octo)
- Added goals for release 2 in Use Cases

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

## Testing
We will test that our games and tools on an already completed emulator to ensure that our emulator runs in the same way. We will create a test program that will go through each of the CHIP-8 commands with several test cases to verify that they work properly. To test the games and tools someone would have to play or utilize them. Eventually, CircleCI will be implemented to automatically test the repository after every push. This is to ensure the validity of the code and make sure it matches the style that we have set for our project.

## Use Cases
<p>The most important features we have planned for Release 2 are the final version of the first game as well as a visualizer for the emulator. The user will be able to play a game of classic Pong, including moving the paddle to bounce the ball, and score points against an opponent. The user will also be able to see the state of each register of our emulator on the display.</p>
<p>Future releases will include further work on the emulator (debugger, assembler), addtional CHIP-8 games and tools, and eventually the final webpage for the emulator.</p>

## Work Breakdown
![Work Breakdown](images/work_breakdown.PNG?raw=true)
<p>The most amount of work will be dedicated to the emulator itself. The main component is the interpreter, however we believe that the debugger/visualizer will take up most of our time. The games will be worked on in parallel with the emulator along with the tool, so they shouldn’t take too much extra time. The website should take the least amount of work to complete as all of the group members have some sort of experience in that department already.</p>

## Project Schedule
![Project Schedule](images/project_schedule.PNG?raw=true)
<p>By release 1 our goal is to finish the emulator and to have a working prototype of our first game. The game will then be polished after the release date and work on the second game will begin. By release 2 we should have the visualizer and the first game finished. Between release 2 and release 3 we will work on having prototypes for the second game and the Chip8 tool, because this work interval is the shortest that we will get. Work on the second game and tool will continue after release 3 and we should have everything completed a week before we have to hand in the final project.</p>
