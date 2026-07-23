Drop MP3, OGG, or WAV files here. They will appear automatically in the Music app.

Optional metadata can be added in `src/data/music.json`:

```json
[
  {
    "file": "my-song.mp3",
    "title": "Track Title",
    "artist": "Artist Name"
  }
]
```

If a track is missing from `music.json`, the filename (without extension) is used as the title.
