 # <center> Project Document - RELEASE 1 </center>
 
## Updates since Release 0
- Added updates, risk management, and project progress sections
- Updated all sections to include information for Release 1
- Weekly meetings changed from Mondays to Fridays at the same time as before
- Added section describing development methodology under Software Methodology
- Added new technologies under Software Methodology (Jest, CircleCI, Octo)
- Added goals for Release 2 in Use Cases

## Updates since Release 1
- Updated sections with new information from Release 2
- Weekly meetings changed from Mondays to Fridays at the same time as before
- Added goals for Release 3 in Use Cases
- Added a new section in Project Progress, detailing the role each member had for Release 2
- **THERE IS SOME TENTATIVE INFORMATION IN TESTING, PROJECT PROGRESS, AND USE CASES SECTIONS**

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
<p> As a result, as a group we have decided to make sure that we are always communicating. Every member is expected to give an update on what they are working on, and are also expected to explain why they couldn't complete the tasks that they were assigned. To ensure that members don't miss out on meeting discussions as a result of unpredictable events, we will be keeping track of what was discussed. Furthermore, if a person is unable to complete the work then the other group members will help them to the best of their ability. Members are expected to store an up to date version of our Github repository locally on their computer, so that in the case of any emergencies we have a backup.</p>

## Project Progress (Needs to be updated for Release 2, talking about group problems and people being unable to do the work that they were assigned. Also talk about how far we got in the visualizer)
<p>Progress was slow due to our group running into some issues as a result of poor communication. Furthermore, many of the members were unfamiliar with the tools that we planned to use for this project, and the first couple of weeks were used to get familiar with the CHIP-8 architecture, JavaScript, Octo, and so on.</p> 
<p>In Release 0, we stated that we would have a CHIP-8 interpreter and a working prototype of our first game, Pong, finished.  Our emulator team (Nic, Marko, and Ben) managed to finish 90% of the interpreter. Our interpreter contains test functions which validate our code, and the display functions have also been checked. All of the CHIP-8 opcodes have been implemented; however, there wasn’t much time left over to test for bugs. Furthermore, our project also has user input implemented but it hasn’t been completely verified as of now. Essentially, our interpreter is “complete”, but still needs testing.</p>
<p>The 2 general programmers decided to split up their work, with Rakim working on the game and Ronit working on a website for our emulator. Decent progress was made for our first game, Pong, using Octo. It supports 2 players with basic ball movements, and a score tracker implemented as well. The game ends once the score reaches 9. Instead of working on the same thing, it was decided that it would be better if we had a website for our emulator so that it would be possible to run the emulator on any computer (using JavaScript on a modern browser) without the need for specific software. We have a basic website set up for now (shows keypad, emulator display, and has a space for the debugger) which will be worked on and polished over the next couple of releases.</p>
<p>As of now, everyone is familiar with all of the software and tools that we will be using, and all the communication issues have been sorted out. It shouldn’t take much longer to finish up our interpreter and first game, and as soon as they are finished work towards the next release will begin. We are hoping to have Pong completed along with a prototype of our second game, and the emulator team expects to complete the debugger.</p>
<p> Here is a list of each member and the role they played in the current release (Release 2)</p>

- Nic - worked on visualizer (displaying memory, registers, executed instructions, stepping forward)
- Marko -
- Ben - streamlined the interpreter (key presses, moving certain functions to separate files to make the code more readable)
- Rakim - finishing our first game, Pong, as well as working on documentation and website design
- Ronit - creating a prototype of our second game, which will be Space Invaders

## Testing
<p>We will test that our games and tools on an already completed emulator to ensure that our emulator runs in the same way. We will create a test program that will go through each of the CHIP-8 commands with several test cases to verify that they work properly. To test the games and tools someone would have to play or utilize them. Eventually, CircleCI will be implemented to automatically test the repository after every push. This is to ensure the validity of the code and make sure it matches the style that we have set for our project.</p>
<p>As of Release 1, we have some testing programs implemented into our interpreter. Our first game, Pong, can be tested using any pre-existing emulators found online. In the following week after the hand in, we expect to have our automated testing programs integrated into our Github repository using CircleCI.</p>
<p>As of Release 2, we have created additional testing programs for our emulator. **Our first completed game, Pong, can be tested using our emulator.** All debugging information is displayed through the visualizer and if there are any problems they can be narrowed down and fixed thanks to the debugger display as well as being able to step forward.</p>

## Use Cases
<p>The most important features we have planned for Release 3 are to have made substantial progress on our game two, which we have decided will be Space Invaders. Furthermore, our group will begin development on a tool for our emulator. In this phase, we will be finishing off any left over features for our interpreter and visualizer that we were unable to complete before. We will also be making sure that our emulator is able to run smoothly without any bugs.</p>
<p>Future releases will include further work on the emulator (bug testing), polishing all of the tools and games that we create, and if there is any time left over we will be creating additional applications for our emulator.</p>

## Work Breakdown
![Work Breakdown](images/work_breakdown.PNG?raw=true)
<p>The most amount of work will be dedicated to the emulator itself. The main component is the interpreter, however we believe that the debugger/visualizer will take up most of our time. The games will be worked on in parallel with the emulator along with the tool, so they shouldn’t take too much extra time. The website should take the least amount of work to complete as all of the group members have some sort of experience in that department already.</p>

## Project Schedule
![Project Schedule](images/project_schedule.PNG?raw=true)
<p>By release 1 our goal is to finish the emulator and to have a working prototype of our first game. The game will then be polished after the release date and work on the second game will begin. By release 2 we should have the visualizer and the first game finished. Between release 2 and release 3 we will work on having prototypes for the second game and the Chip8 tool, because this work interval is the shortest that we will get. Work on the second game and tool will continue after release 3 and we should have everything completed a week before we have to hand in the final project.</p>
