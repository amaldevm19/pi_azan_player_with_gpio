# pi_azan_player_with_gpio

azan_player is a nodejs application for linux-raspberryPI os. This app play muslim prayer on required time interval. Time interval is calculated using adhan npm library. play-sound npm is used for playing prayer audio file. Since the app is intended to run in a voice evacuation environment we need a relay outupt to activate the AUX input is connected to the audio output of raspberryPI. This application is designed to run on a raspbian / raspberry PI and it makes use of the GPIO pins on 

## Node modules used

```sh
    npm install adhan play-sound moment onoff
```

