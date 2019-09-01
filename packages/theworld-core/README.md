# theworld
此文件夹为thw world的逻辑核心模块

A bundle can contain any or all of the following children though it's suggested that you keep your bundles as modular as possible, i.e., try to keep input events out of the same bundle you're building your areas.

areas/
Area definitions and their items, rooms, NPCs, and quests along with the scripts for those entities
behaviors/
Scripts that are shared between entities of the same type, e.g., a behavior to have an NPC wander around an area
commands/
What it says on the tin, commands to add to the game
effects/
Effects that can be applied to characters (NPCs/Players)
help/
Helpfiles for commands
skills/
Player skills (Spells are included, they're just skills with the SPELL type)
input-events/
Scripts attached to a connected socket, this involves things like handling login and parsing incoming data for commands
Warning: Because of input events' important role it is generally not advised to load more than one bundle with input events
server-events/
Scripts attached to the startup of Ranvier itself such as starting a telnet server
quest-goals/
Quest goal definitions that can be used by builders when writing quests
quest-rewards/
Quest reward definitions that can be used by builders when writing quests
channels.js
Communication channels
player-events.js
Scripts attached to the player such being hit, gaining experience, leveling, etc.
attributes.js
Definitions of available attributes to assign to NPCs or players
