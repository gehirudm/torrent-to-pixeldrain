# Torrent to Pixeldrain
This is a simple package that you can use to download and upload the files of a torrent into [Pixeldrain](https://www.pixeldrain.com).

**This is for Educational Purpose.**

## What's Pixeldrain?
It's a file sharing site.
- Provides 20GB daily transfer limit for free accounts
- Fast transfer speeds

## Installation
```bash
$ npm install torrent-to-pixeldrain
```

## Usage
```javascript
let builder = new TorrentBuilder()
            .setType("single file")
            .setInput("./tests/resources/torrent/single-torrent.torrent")
            .setOutput("./tests/downloads")

let writer = new FileWriter("./tests/logs/test-log.txt")

let client = new TorrentToPixeldrain(builder, "fe2f1e37-32b3-4f75-b16b-f51cf4c5cb77", writer)

client.start()
```

