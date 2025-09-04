# Dragon Repeller - A Simple JavaScript RPG

[![Try the Game](https://img.shields.io/badge/Play_Now-Live_Demo-green?style=for-the-badge&logo=github)](https://farrosfr.github.io/js-rpg/)

![alt text](image.png)

Welcome to Dragon Repeller\! This is a classic-style RPG built with HTML, CSS, and vanilla JavaScript. Your mission is to grow stronger, manage your resources, and defeat the dragon that terrorizes the town.

## Features

  * **Turn-Based Combat**: Fight monsters like Slimes, Fanged Beasts, and the mighty Dragon.
  * **Simple Economy**: Earn gold by defeating monsters.
  * **Character Progression**: Gain XP to level up and become stronger.
  * **Equipment System**: Purchase better weapons to increase your damage.
  * **Dynamic UI**: The game features two screens—a main game screen and an inventory screen for detailed stats.
  * **Animated Combat**: Simple animations for attacks provide a more engaging experience.

## How to Play

### The Goal

The main objective is to become powerful enough to **defeat the Dragon**. You start in the Town Square with basic stats and a simple "stick" as your weapon.

### Locations

1.  **Town Square**: This is your starting point and safe zone. From here, you can choose to go to the store, the cave, or fight the dragon (not recommended at the start\!).
2.  **Store**: Here you can spend your gold to:
      * **Buy Health**: Restore 10 health for 10 gold.
      * **Buy Weapon**: Upgrade your weapon for 30 gold. The weapons are upgraded in a specific order: Stick -\> Dagger -\> Claw Hammer -\> Sword.
3.  **Cave**: This is where you can fight weaker monsters to gain XP and gold. It's the best place to train before you are ready for the final boss.

### Combat

When you choose to fight a monster, you will have three options:

  * **Attack**: You and the monster will exchange blows. You will deal damage based on your weapon's power and your XP, and the monster will deal damage based on its level.
  * **Dodge**: You attempt to dodge the monster's attack for one turn. You will not take any damage, but you also won't deal any.
  * **Run**: Flee the battle and return to the Town Square.

### Winning and Losing

  * **You Win**: You win the game by reducing the Dragon's health to 0.
  * **You Lose**: If your health drops to 0 at any point, you die. You will have the option to restart the game from the beginning.

## Getting Started (for Developers)

To run this project locally, simply open the `index.html` file in your web browser. For the best experience, it is recommended to use a live server extension (like "Live Server" for VS Code) to serve the files.

## Credits

© 2025 [FarrosFR](https://farrosfr.com)
