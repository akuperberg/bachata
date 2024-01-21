import { Component } from '@angular/core';
import { VideosService } from '../shared/services/videos/videos.service';
import { VideoPlayerComponent } from '../shared/components/video-player/video-player.component';
import { CommonModule } from '@angular/common';
import { catchError, tap } from 'rxjs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ButtonComponent } from '../shared/button/button.component';
import { ErrorHandler } from '@angular/core';

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
  public videoIds: string[] = [];

  public slickCarouselConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    prevArrow: '<button class="slick-prev">Previous</button>',
    nextArrow: '<button class="slick-next">Next</button>',
  };

  constructor(private videosService: VideosService, private errorHandler: ErrorHandler) {}

  ngOnInit() {
    this.loadPopular();
  }

  public loadPopular() {
    this.videosService
      .getPopularVideos()
      .pipe(
        tap((data) => {
          this.videoIds = data.items.map((item: any) => item.id.videoId);
        }),
        catchError((error) => {
          // Handle the error here, log it, show a message, etc.
          console.error('An error occurred while loading popular videos:', error);
          return error;
        })
      )
      .subscribe(
        (error) => {
          this.errorHandler.handleError(error);
        }
      );
  }
  
}
