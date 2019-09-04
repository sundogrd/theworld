# Structure
main/
  areas/
    limbo/ - Actual area folder, name will be used as key for `area:id`
             pairs which you'll see for items/npcs
      scripts/     - Scripts for individual entities
      manifest.yml - Required - Metadata about the area itself
      items.yml    - Item definitions
      npcs.yml     - NPC definitions
      rooms.yml    - Room definitions
      quests.yml    - Quest implementations
