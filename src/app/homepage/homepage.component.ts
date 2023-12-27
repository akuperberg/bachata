import { Component } from '@angular/core';
import { VideosService } from '../shared/services/videos/videos.service';
import { VideoPlayerComponent } from '../shared/components/video-player/video-player.component';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [VideoPlayerComponent, CommonModule, SlickCarouselModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  videoId = 'i_LwzRVP7bg';
  videoInfo: any;
  videoIds: string[] = [];

  slickCarouselConfig = {
    slidesToShow: 2,
    slidesToScroll: 2,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000
  };

  constructor(private videosService: VideosService) {}

  ngOnInit() {
    this.loadPopular();
  }

  loadPopular() {
    this.videosService
      .getPopularVideos()
      .pipe(
        tap((data) => {
          this.videoIds = data.items.map((item: any) => item.id.videoId);
        })
      )
      .subscribe();
  }

  slickInit(e: any) {
    console.log('slick initialized');
  }
  
}
