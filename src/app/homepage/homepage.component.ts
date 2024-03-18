import {
  Component,
  ErrorHandler
} from '@angular/core';
import { VideosService } from '../shared/services/videos/videos.service';
import { CommonModule } from '@angular/common';
import { catchError, tap } from 'rxjs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ButtonComponent } from '../shared/components/button/button.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { VideoPlayerComponent } from '../shared/components/video-player/video-player.component';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    SlickCarouselModule,
    ButtonComponent,
    YouTubePlayerModule,
    VideoPlayerComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  public videoIds: string[] = [];
  public currentVideoId = '';
  public activeSlideIndex = 0;

  public slickCarouselConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    prevArrow: '<button class="slick-prev">Previous</button>',
    nextArrow: '<button class="slick-next">Next</button>',
  };

  constructor(
    private videosService: VideosService,
    private errorHandler: ErrorHandler
  ) {}

  ngOnInit() {
    this.loadPopular();
  }

  public onBeforeChange() {
    this.currentVideoId = this.videoIds[this.activeSlideIndex];
  }

  public onAfterChange(event: any): void {
    this.activeSlideIndex = event.currentSlide;
    this.videosService.stopVideo$.next(this.currentVideoId);
  }

  public loadPopular() {
    this.videosService
      .getPopularVideos()
      .pipe(
        tap((data) => {
          this.videoIds = data.items.map((item: any) => item.id.videoId);
        }),
        catchError((error) => {
          this.errorHandler.handleError(error);
          return error;
        })
      )
      .subscribe((error) => {
        this.errorHandler.handleError(error);
      });
  }
}
