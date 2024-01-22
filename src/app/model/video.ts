import { Subject } from "rxjs";

export class Video {
    id: string;
    
    startVideo$: Subject<void> = new Subject();
    stopVideo$: Subject<void> = new Subject();

    constructor(videoId: string) {
        this.id = videoId;
    }
}