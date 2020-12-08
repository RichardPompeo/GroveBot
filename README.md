# Grove Bot

Grove is a Verified Discord Music Bot powered by [Lavalink](https://github.com/Frederikam/Lavalink).

There are several ways to create a music bot, the best known of which is using [ytdl-core](https://www.npmjs.com/package/ytdl-core). 
The one we're going to use is [Lavalink](https://github.com/Frederikam/Lavalink).

### Why Lavalink?

Lavalink is the best way to create a music bot, because lavalink is easy to use and has several functions.

Functions like:
    
- Great streaming quality.
- Rich features.
- Filters to use in the music.
- Can play song from several plataforms.

And more.

### Getting starting

To start this project, I will pass all the dependencies that we will use:

[Lavalink](https://github.com/Frederikam/Lavalink)
[ascii-table](https://www.npmjs.com/package/ascii-table)
[byte-size](https://www.npmjs.com/package/byte-size)
[discord.js](https://www.npmjs.com/package/discord.js)
[erela.js](https://www.npmjs.com/package/erela.js)
[erela.js-spotify](https://www.npmjs.com/package/erela.js-spotify)
[figlet](https://www.npmjs.com/package/figlet)
[fs](https://www.npmjs.com/package/fs)
[glob](https://www.npmjs.com/package/glob)
[lyrics-finder](https://www.npmjs.com/package/lyrics-finder)
[music-progress-bar](https://www.npmjs.com/package/music-progress-bar)
[os](https://www.npmjs.com/package/os)

If you want to know why we use this, just read the descriptions of the NPM listed!

### Installing Lavalink

To install lavalink, you must have [JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) installed, if you don't have it, [click here](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) to download it, if you have installed, just continue the process. [click here](https://github.com/Frederikam/Lavalink) and you will be redirected to lavalink's repository!

After you have installed `lavalink.zip`, you extract it to any folder.
Once this is done, you will create an `application.yml` file and place it:

```js
server: # REST and WS server
  port: 2333
  address: 0.0.0.0
lavalink:
  server:
    password: "YOUR PASSWORD HERE"
    sources:
      youtube: true
      bandcamp: true
      soundcloud: true
      twitch: true
      vimeo: true
      mixer: true
      http: true
      local: false
    bufferDurationMs: 400
    youtubePlaylistLoadLimit: 6 # Number of pages at 100 each
    playerUpdateInterval: 5 # How frequently to send player updates to clients, in seconds
    youtubeSearchEnabled: true
    soundcloudSearchEnabled: true
    gc-warnings: true
    #ratelimit:
      #ipBlocks: ["1.0.0.0/8", "..."] # list of ip blocks
      #excludedIps: ["...", "..."] # ips which should be explicit excluded from usage by lavalink
      #strategy: "RotateOnBan" # RotateOnBan | LoadBalance | NanoSwitch | RotatingNanoSwitch
      #searchTriggersFail: true # Whether a search 429 should trigger marking the ip as failing
      #retryLimit: -1 # -1 = use default lavaplayer value | 0 = infinity | >0 = retry will happen this numbers times

metrics:
  prometheus:
    enabled: false
    endpoint: /metrics

sentry:
  dsn: ""
  environment: ""
#  tags:
#    some_key: some_value
#    another_key: another_value

logging:
  file:
    max-history: 30
    max-size: 1GB
  path: ./logs/

  level:
    root: INFO
    lavalink: INFO
```

`Detail:` Don't forgot to change the password in the `application.yml` file!

### Starting Lavalink Server

To start your Lavalink server, enter the Lavalink folder, hold SHIFT + Right-click, and click in `Open Terminal Here` or `Open Powershell Here` and type

```java
java -jar Lavalink.jar
```

After that, you will see something like this:

```java

       .   _                  _ _       _    __ _ _
      /\\ | | __ ___   ____ _| (_)_ __ | | __\ \ \ \
     ( ( )| |/ _` \ \ / / _` | | | '_ \| |/ / \ \ \ \
      \\/ | | (_| |\ V / (_| | | | | | |   <   ) ) ) )
       '  |_|\__,_| \_/ \__,_|_|_|_| |_|_|\_\ / / / /
    =========================================/_/_/_/

        Version:        4a8414f3d99752a637e24665e17c8d837604dc18-SNAPSHOT
        Build:          Unofficial
        Build time:     28.10.2020 02:17:33 UTC
        Branch          dev
        Commit:         4a8414f
        Commit time:    28.10.2020 02:15:23 UTC
        JVM:            11.0.9
        Lavaplayer      1.3.53

```

And done! Your Lavalink server is running!

Source by [BONEE4](https://github.com/BONEE4)

If necessary, contact `patek#0001`
