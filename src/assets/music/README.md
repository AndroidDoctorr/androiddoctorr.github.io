Drop MP3, OGG, or WAV files into album subfolders here. They will appear automatically in the Music app.



Optional metadata can be added in `src/data/music.json`:



```json

[

  {

    "file": "my-song.mp3",

    "title": "Track Title",

    "artist": "Artist Name",

    "album": "Album Name"

  }

]

```



If a track is missing from `music.json`, the filename (without extension) is used as the title.



Album art lives in `src/assets/album_art/`. Name each image after the album folder slug (e.g. `sunrise.jpg` for tracks in `music/sunrise/`). Albums without art (like Pantheon) fall back to the default gradient and a placeholder icon in the playlist.

Album years can be set in `src/data/albums.json`:

```json
[
  {
    "album": "Album Name",
    "year": 2004
  }
]
```

