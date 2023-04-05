# [Honewdew Valley](https://kliu33.github.io/SDV/)

Welcome to Honeydew Valley, a JavaScript-based project inspired by the popular game Stardew Valley. In this game, players take on the role of a farmer, tending to crops, fishing, and decorating your own personal space.

The game features a wide range of crops and fish to catch. Players can also upgrade their farm, purchase new equipment, and unlock decorations as they progress through the game.

I've put a lot of effort into making this game fun and accessible for players of all skill levels. Whether you're an experienced gamer or a casual player looking for a relaxing way to unwind, we think you'll find plenty to enjoy in Honeydew Valley.

To get started, click the live link, read the general tips, and start playing today!

## Wireframe
![Screenshot_5](https://user-images.githubusercontent.com/30753677/223146478-a5271a9b-e740-4063-9855-83c5d5cee60f.png)


## Functionality & MVPs:

Honeydew Valley features a side bar for audio, instructions, and general tips aswell as a canvas to render the game. 

### When a user first loads into the game:

![image](https://user-images.githubusercontent.com/30753677/223147198-6098acac-9602-410c-bcdb-a602fa3ae037.png)

The user is spawned into a bare map, with nothing but some initial money. The game intentionally does not feature a tutorial, a lot of the fun of the game is exploring and experimenting in order to decide how you want to play. There is no "correct" way to play the game, just like there is no "wrong" way to play the game (as long as you remember to eat). Just click the unmute button for some relaxing lofi and enjoy.

### Planting seeds

![image](https://user-images.githubusercontent.com/30753677/230184434-e67089dd-b5ed-406b-911f-10fa86d26f98.png)

When you plant a seed, an instance of this seed class is created. Upon being planted, two Intervals are initialized; one that will call the growUp function and one that will call the wither function, both are repeated at an easily modifiable rate. Both of these intervals are bounded to that instance of the seed, so multiple seeds can exist at the same time without interfering with each other. 'growUp()' progresses the seed to the next stage of its life, but only if it has enough water and not fully grown already. 'wither()' decrements the water_level of the seed until the water level hits 0, at which point 'wither()' will set the seeds 'life' boolean to false, and the seed will disappear. When the seed disappears (either by drying out or being harvested) the instance of the seed at that location is destroyed, making way for newer seeds to be planted.

### Simulating sunlight

![image](https://user-images.githubusercontent.com/30753677/230186703-556b3373-b6fd-49e3-a7f3-12444e5ade69.png)

This is a function I particularly enjoyed working on. This snippet of code is in charge of altering the shading of the map as time progresses in-game to simulate the sun. The 'printhue()' function is interesting to me is because I initially had set alpha to change linearly with time, but as I played the game I realized something. If you look out your window (in real-life) at 12PM and then again at 5PM, there is barely a difference (usually). Similarly between midnight and 5AM, its pretty much just pitch black outside. In order to achieve this effect in-game, I added conditionals to change the alpha dynamically only around the times its supposed to and constant when it should be. This is done using the current amount of minutes that has passed that day for a smooth transition. Of course, when your character is inside the safety of the house, none of the shading is applied, which makes the house that bit cozier.

### Keeping track of the map

![image](https://user-images.githubusercontent.com/30753677/230194691-ce740f8a-f9fb-4256-9732-2f3f5131e16c.png)

These four arrays are how the game keeps track of how the map looks and functions. In the picture, are the initial values of the map when it is initialized by the user. The values stored in the arrays are then changed and dynamically rerendered as the player interacts with the map. There are two 'floor' arrays, one for the inside of the house and one for outside. These arrays dictate what kind of tiles the player is seeing and able to interact with. Some tiles can be walked on, some cannot; some can have items be placed on top of, some cannot. Using these arrays, it is easy to keep track of what the player is able to do and what they aren't (like fishing on dirt or planting seeds in the water). The two 'map' arrays are what keep track of the 'top' layer of the map, mainly player-placed items. Initially, there are a lot of 0's in the 'map' arrays. 0's mean there is currently nothing on that tile, and the player is free to do with it as they want. As the player places things down, the 'map' arrays will dynamically change, which allows for further interaction (opening a placed chest or harvesting a planted seed).

## Techonologies, Libraries, APIS

   This project will be implemented with the following technologies:
   
    Canvas API to render the game
    
    Webpack to bundle and transpile the source Javascript code
    
    npm to manage project dependencies

## Implementation Timeline

   Friday Afternoon & Weekend: Get the basic functionality completely down, gather all the nessessary resources. Think about the different plants and fish that will need images. Refactor the code to create multiple JS files instead of everything in a single file.

   Monday: Work on the game flow, how the plants will grow, how fish will be caught, and how the interactions will work between the user and other entities. Add different tiles to the game, trees/shrubs.

   Tuesday: Work on the additional functionality, time/inventory/money. Think about having a second canvas ontop of current one for a better look.

   Wednesday: Work on the aesthetics of the game, fix anything that needs to be fixed. Maybe think about adding animation to things such as grass, water, or walking. Work on the webpage outside of the game through css.

   Thursday: Deploy project to github and rewrite the proposal README.

## Future Features

- Being able to customize your character with money earned
- Add additional NPCs that the user can interact with
- Animated walking for a smoother experience
- New unlockable areas of the map
- Much more!

## Images/Music

Game tiles by Windies (https://forums.rpgmakerweb.com/index.php?threads/grass-tilesets-the-new-era.64531/)

Character sprites by DevilsAdvocate (https://forums.rpgmakerweb.com/index.php?threads/diagonal-mv-sprites-chibi-tall-tall-template.74151/)

Music: Wondering by Purrple Cat | https://purrplecat.com/ 
