import {
  Component,
  Input,
  ViewChild
} from '@angular/core';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YouTubePlayer } from '@angular/youtube-player';
import { VideosService } from '../../services/videos/videos.service';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [YouTubePlayerModule],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.scss',
})
export class VideoPlayerComponent {
  @Input() videoId = '';
  @Input() width = 0;
  @Input() activeSlide = 0;
  public apiLoaded = false;
  @ViewChild(YouTubePlayer) youtubePlayer!: any;

  constructor(private videosService: VideosService) {}

  ngOnInit() {
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'http://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
    this.videosService.stopVideo$.subscribe((video) => {
      if (this.youtubePlayer?.videoId === video) {
        this.youtubePlayer.stopVideo();
      }
    });
  }

  ngOnDestroy(): void {
    this.apiLoaded = false;
  }

  stopVideo() {
    this.youtubePlayer.stopVideo();
  }
}
