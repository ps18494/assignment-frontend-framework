import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

import { Song } from '../song';
import { ASSET_SONGS, ASSET_THUMBNAILS } from 'src/constants.module';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ASSET_SONGS: string = ASSET_SONGS;
  ASSET_THUMBNAILS: string = ASSET_THUMBNAILS;
  songs: Song[] = [];
  audio: HTMLAudioElement | undefined;
  current: Song | undefined;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    // Fetch songs if queryParams change
    this.route.queryParams.subscribe(() => {
      this.getSongs();
    })

    document.addEventListener('keydown', (e) => {

      if (e.code == 'Space') {
        e.preventDefault();
        this.togglePlay();
      }

      if (e.code == 'ArrowRight') {
        e.preventDefault();
        this.next();
      }

      if (e.code == 'ArrowLeft') {
        e.preventDefault();
        this.previous();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.audio) {
      this.pause();
      this.audio = undefined;
    }
    this.current = undefined;
  }



  next() {
    const currentIndex = this.songs.findIndex(s => s.id === this.current!.id);
    let nextSong = this.songs[currentIndex + 1];
    if (!nextSong) {
      nextSong = this.songs[0];
    }

    this.changeCurrentAndPlay(nextSong);
  }

  previous() {
    const currentIndex = this.songs.findIndex(s => s.id === this.current!.id);
    let previousSong = this.songs[currentIndex - 1];
    if (!previousSong) {
      previousSong = this.songs[this.songs.length - 1];
    }
    this.changeCurrentAndPlay(previousSong);
  }

  /**
   * Stop playing song and Play another song
   * @param song
   */
  play(song: Song) {
    // if (this.audio && this.audio.played) {
      // this.audio.pause();
      // this.current!.playing = false;
    // }
    // this.current = song;
    // this.playCurrentSong();
    this.changeCurrentAndPlay(song);
  }

  /**
   * Change current song and play this current song
   * @param song
   */
  changeCurrentAndPlay(song: Song) {
    if (this.audio && this.audio.played) {
      this.audio.pause();
    }
    // Change status of playing song
    this.current!.playing = false;
    this.current = song;
    this.playCurrentSong();
  }

  /**
   * Load and play current song
   */
  playCurrentSong() {
    this.audio = new Audio(ASSET_SONGS + this.current!.file_name)
    this.audio.play();
    this.current!.playing = true;
  }

  /**
   * Pause current audio
   */
  pause() {
    this.audio!.pause();
    this.current!.playing = false;
  }

  /**
   * Continue play audio
   */
  continue() {
    this.audio!.play();
    this.current!.playing = true;
  }

  togglePlay() {
    // Load and play audio of current song if there is no playing one
    if (!this.audio) {
      this.playCurrentSong();

    // Pause if playing
    } else if (this.audio.paused) {
      this.continue();

    // Continue if paused
    } else {
      this.pause();
    }
  }

  getSongs() {
    this.apiService.getSongs()
      .subscribe((data: Song[]) => {
        this.songs = data.map((song: Song) => ({ ...song, playing: false }));
        this.current = this.songs[Math.floor(Math.random()*this.songs.length)];
      });
  }
}
