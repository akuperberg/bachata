import { Component } from '@angular/core';
import { VideosService } from '../shared/services/videos/videos.service';
import { VideoPlayerComponent } from '../shared/components/video-player/video-player.component';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [VideoPlayerComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {

  videoId = 'i_LwzRVP7bg';
  videoInfo: any;

  constructor(private videosService: VideosService) {}

  ngOnInit() {
    this.loadVideoInfo();
  }

  loadVideoInfo() {
    this.videosService.getVideoInfo(this.videoId).subscribe(
      (data) => {
        this.videoInfo = data.items[0]; // Assuming you want details of the first item in the response
        console.log('Video Info:', this.videoInfo);
      },
      (error) => {
        console.error('Error fetching video info:', error);
      }
    );
  }

}
