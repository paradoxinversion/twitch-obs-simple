# Twitch + OBS

This app is a small example of integrating Twitch chat and OBS, allowing Twitch users to change the streamer's Scenes.

## Prerequisites

In order to run this software, you'll need the following:

**A Twitch OAuth Token**: You'll use an OAuth token instead of a password for your bot to log in. [You can generate one here.](https://twitchapps.com/tmi/) Make sure you are logged in/connecting to _the bot's_ account when you do this.

**Node.js**: This is a JavaScript application and Node.js is the framework we're using to execute our code.

**OBS Studio**: This application is currently only tested on OBS Studio. **You're on your own if you're using SLOBS**.

**obs-websocket**: Our application will communicate with OBS via websockets. [You can download the OBS Websockets plugin here.](https://obsproject.com/forum/resources/obs-websocket-remote-control-obs-studio-from-websockets.466/)

Installation for these prereqs vary by oeprating system, so they will not be covered here.

## Installation/Setup

### OBS Setup

Decide which scenes you'll want chat to be able to switch to. Name those scenes with an exclamation point (!) at the beginning, ie: `!My Scene`. The app will only shows these scenes as options and only allow users to switch to them.

### App Installation

- Clone to a directory of your choice.
- `npm` or `yarn` `install` the application dependencies.
- Set the necessary values in a file `.env` at the root of your directory (detailed later)

## Using the App

- Run the app with `yarn dev` if you would like to run a development server that will reload with directory changes.
- Run the app with `yarn start` to run the app regularly.
- `ctrl+z` in your command line to terminate the app.

### Chat Commands

`!scenes`: This will show a list of all available scenes. The exclamation point is omitted from their display.

`!change-scene <scene name>`: This changes the scene to the one specified. For instance, to change to a scene called `!My Scene`, the command would be `!change-scene My Scene`.

## .env

At the root directory of the app, you'll find a `.env` file, which you'll need to edit. The values should be self-explanatory. Be sure to include `oauth:` on the `OAUTH_TOKEN` line. Changing `COMMAND_PREFIX` changes the character that you use tell the bot something is a command.
