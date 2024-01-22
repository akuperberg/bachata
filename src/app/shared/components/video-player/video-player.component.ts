import { Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';
import { Video } from '../../../model/video';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [YouTubePlayerModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss'
})
export class VideoPlayerComponent {
  apiLoaded = false;
  @Input() video: Video = new Video('');
  @Input() width = 0;

  @ViewChild(YouTubePlayer)
  nativeYoutubePlayer!: YouTubePlayer;

  ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'http://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
    this.video.stopVideo$.subscribe(() => this.stopVideo());
  }

  ngOnDestroy(): void {
    this.apiLoaded = false;
  }

  public stopVideo() {
    console.log('video stopping');
    this.nativeYoutubePlayer.stopVideo();
  }
  
}
