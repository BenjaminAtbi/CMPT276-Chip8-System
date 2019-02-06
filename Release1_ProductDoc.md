 # Project Document - RELEASE 0
## Introduction
<p>Our project is to develop a virtual machine that can run CHIP-8 programs (games, tools, etc.). Furthermore, we will be developing at least 2 CHIP-8 games, a debugger, and one other tool that would be useful for a software developer. The virtual machine will be put on an interactive website for people to use.</p>

## Meeting Schedule
<p>Weekly meetings will be held Mondays at 11:00 am to 11:30 am at the SFU Surrey campus. Longer meetings will be held throughout the term as needed in order to meet milestones and schedule dates. We will also have meetings online through our Discord if need be. Each meeting will serve as means for each individual member to give an update of the work that was done by them over the past week. We will then also set goals for ourselves to reach before the next meeting.</p>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Each meeting will be recorded (in text form) and shared with the members not only to keep track of information, but also in case someone is not able to make it to the meeting.

## Communication
Communication will be done through weekly meetings, Github, and Discord.

**Github:**

- Used for code reviews, organizing and managing issues
- Taking advantage of Github functions such as labels, milestones, etc, as well as - version control functions such as branching.
- Allows everything to be organized

**Meetings:**

- Weekly meetings on mondays prior to class
- Location decided day before, generally in CSIL
- Progress updates, set milestones to achieve before next meeting

**Discord**

- Members expected to check discord frequently; main source of communication
- Includes links to all documents and resources required for this project
- A Github bot will be implemented to send push notifications, etc.
- Includes voice chat that can be used if needed
- Can hold unofficial meetings

## Software Methodology
<p>We will use git as our version control software, with a github repository. Typescript, HTML, and the CHIP-8 instruction set are our languages of choice to develop the games and tools necessary. In addition, we may use JQuery while integrating the presentation website.</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Our team of 5 is divided into separate groups for the work that needs to be done. There is one main project manager (who has the most experience with Git), 3 people specializing in emulator design and 2 general programmers (responsible for the games and tools). Furthermore, there are 3 people dedicated to design the website for the emulator and keeping track of the documentation of our project. Each person has more than one role that they are not necessarily limited to.</p>
The following table shows the roles that each group member has.

|             | Project Manager | Emulator | Tools | Games | Documentation and Design |
|-------------|:---------------:|:--------:|:-----:|:-----:|:------------------------:|
| Benjamin A. |        x        |     x    |   x   |       |                          |
| Rakim Z.    |                 |          |   x   |   x   |             x            |
| Marko M.    |        x        |     x    |       |   x   |                          |
| Ronit C.    |                 |          |   x   |   x   |             x            |
| Nic V.      |                 |     x    |   x   |       |             x            |

<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Emulator work will be split up into the different commands that Chip8 has as well as the main functions of the emulator. One member will implement the commands while the other two group members can split the work on functions such as memory management, interpretation, the subroutine call stack, and so on. Afterwards, the same team will work on the visualizer for the emulator.</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Two group members will be assigned to game design at one time. Because the type of game we decide to make could vary greatly, the work breakdown will have to be decided once the plan for the game is set. The two group members will split the workload evenly between them.</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The documentation will be procedural and will be constantly updated after every weekly meeting to add new information or change previous revisions</p>

## Testing
We will test that our games and tools on an already completed emulator to ensure that our emulator runs in the same way. We will create a test program that will go through each of the CHIP-8 commands with several test cases to verify that they work properly. To test the games and tools someone would have to play or utilize them. Eventually, CircleCI will be implemented to automatically test the repository after every push. This is to ensure the validity of the code and make sure it matches the style that we have set for our project.

## Use Cases
<p>The most important feature we have for Release 1 is the CHIP-8 interpreter. This includes basic commands such as setting variables, timers, jumping to addresses and getting user inputs (the CHIP-8 keyboard). Users will be able to input commands that will be interpreted by the code. In addition, we are planning to have a prototype of our first game ready by the first release.</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Release 1 will get the members familiarized with the CHIP-8 architecture, as well as javascript and documentation methods. This will lead to less downtime in the future and will help us get right into what needs to be done for the upcoming releases (programming, documentation, etc.).</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Future releases will include further work on the emulator (debugger, assembler), CHIP-8 games and tools, and eventually the webpage for the emulator.</p>

## Work Breakdown
![Work Breakdown](images/work_breakdown.PNG?raw=true)
&nbsp;<p>The most amount of work will be dedicated to the emulator itself. The main component is the interpreter, however we believe that the debugger/visualizer will take up most of our time. The games will be worked on in parallel with the emulator along with the tool, so they shouldn’t take too much extra time. The website should take the least amount of work to complete as all of the group members have some sort of experience in that department already.</p>

## Project Schedule
![Project Schedule](images/project_schedule.PNG?raw=true)
&nbsp;<p>By release 1 our goal is to finish the emulator and to have a working prototype of our first game. The game will then be polished after the release date and work on the second game will begin. By release 2 we should have the visualizer and the first game finished. Between release 2 and release 3 we will work on having prototypes for the second game and the Chip8 tool, because this work interval is the shortest that we will get. Work on the second game and tool will continue after release 3 and we should have everything completed a week before we have to hand in the final project.</p>
