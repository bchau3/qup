# qup

# Introduction
Not everyone has the same interests when it comes to their hobbies, their goals, or even the type of music they listen to. In a long car ride or even a big party, one of the key elements during these occasions is the music being played. However, only one person can have their phone connected to the car or the speakers at the party. As a result, the music being played is generally only what that individual person likes or thinks everyone else would enjoy as well. The consequence of this is every other person constantly bugging the person in control of the music to play a song of their liking next. Imagine being the driver and trying to satisfy your passengers or a party host trying to please tens and maybe even hundreds of people. With Q-UP, it allows other people to make song requests and recommendations from their own device without the music player being as involved or giving too much leeway. Q-UP is a mobile application that will allow its users to join or create channels in order to start a collaborative music queue within Spotify. Unlike Spotify, Q-UP will allow its users to add songs of their choice from their own devices, cast votes on which songs should be played next, and still allow the creator of the channel to maintain complete control of the queue.

# Login Credentials

Expo: 
username: figgledoodle
password: redd0g

Spotify (Premium):
username: kianalucin
password: queueup2019

# Requirements
- Node/npm
- Expo CLI
- IOS simulator

# Installation Instruction
1. Clone repo into computer
2. $cd client
3. npm install
4. $cd server
5. npm install

# How To Run
Client:
1. $cd client
2. npm start
3. Sign in to expo with credentials above
4. press 'i' to open simulator

Server (local):
1. $cd client
2. edit config.js to use localhost url instead of aws
1. $cd server
2. node index.js

# Known Bugs
Bug 1: Closing channel with members present. The server crashes. To resolve relaunch server after leaving channel from member. This bug will be resolved before final submission hopefully.
Bug 2: Remote server (Aws ebs) may crash. To resolve simply '$cd server' in second terminal, '$node index.js' to launch server and update client/config.js to use localhost instead of aws.
Bug 3: Too many spotify api requests. To resolve wait before continuing. (This bug will be resolved by lowering calls to spotify's  get current song info and calculating song time locally.
Bug 4: Have to pause/resume song on application to update queue.

