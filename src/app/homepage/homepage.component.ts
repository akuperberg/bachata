import { Component, ErrorHandler, QueryList, ViewChildren } from '@angular/core';
import { VideosService } from '../shared/services/videos/videos.service';
import { CommonModule } from '@angular/common';
import { catchError, tap } from 'rxjs';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ButtonComponent } from '../shared/button/button.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YouTubePlayer } from '@angular/youtube-player';
import { VideoPlayerComponent } from '../shared/components/video-player/video-player.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, ButtonComponent, YouTubePlayerModule, VideoPlayerComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  public videoInfo: any;
  public videoIds: string[] = [];
  public apiLoaded = false;
  public videoId = '';
  public activeSlideIndex = 0;
  @ViewChildren(YouTubePlayer) youtubePlayer!: QueryList<YouTubePlayer>;

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
    if (!this.apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'http://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }

  ngOnDestroy(): void {
    this.apiLoaded = false;
  }
  

  public onBeforeChange(event: any) {
   this.youtubePlayer.toArray()[this.activeSlideIndex].stopVideo();
  }

      // public beforeChange(event: any) {
    //   this.videos[event.currentSlide].stopVideo$.next();
    // }

  public onAfterChange(event: any): void {
    this.activeSlideIndex = event.currentSlide;
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
      .subscribe(
        (error) => {
          this.errorHandler.handleError(error);
        }
      );
  }
  
}
