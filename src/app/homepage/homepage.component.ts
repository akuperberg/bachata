import { Component } from '@angular/core';
import { VideosService } from '../shared/services/videos/videos.service';
import { VideoPlayerComponent } from '../shared/components/video-player/video-player.component';
import { CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ButtonComponent } from '../shared/button/button.component';
import { Video } from '../model/video';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [VideoPlayerComponent, CommonModule, SlickCarouselModule, ButtonComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  public videoId = 'i_LwzRVP7bg';
  public videoInfo: any;
  public videos: Array<Video> = [];

  public slickCarouselConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    prevArrow: '<button class="slick-prev">Previous</button>',
    nextArrow: '<button class="slick-next">Next</button>',
  };

  constructor(private videosService: VideosService) {}

  ngOnInit() {
    this.loadPopular();
  }

  public loadPopular() {
    this.videosService
      .getPopularVideos()
      .pipe(
        tap((data) => {
          this.videos = data.items.map((item: any) => new Video(item.id.videoId));
        })
      )
      .subscribe();
  }

  public beforeChange(event: any) {
    this.videos[event.currentSlide].stopVideo$.next();
  }
  
}
