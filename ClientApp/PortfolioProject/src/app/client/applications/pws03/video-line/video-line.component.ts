import { Component, Input, OnInit, ViewChildren, QueryList } from '@angular/core';
import { interval } from 'rxjs';

@Component({
    selector: 'app-video-line',
    templateUrl: './video-line.component.html',
    styleUrls: ['./video-line.component.css']
})
export class VideoLineComponent implements OnInit {

    @ViewChildren('video') videos: QueryList<any> | undefined;
    @Input() sources: string[] = []

    constructor() { }

    videosPlayed = 0


    ngOnInit(): void {
        let intervalTimer = interval(100).subscribe(async () => {
            if (this.videos == undefined) {
                return
            }
            if (this.videos?.length <= this.videosPlayed) {
                intervalTimer?.unsubscribe()
                return
            }
            try {
                for (let i = 0; i < this.videos?.length; i++) {
                    let video = this.videos.get(i).nativeElement as HTMLVideoElement
                    if (video.classList.contains("playing")) {
                        continue
                    }
                    await video.play()
                    video.classList.add("playing")
                    this.videosPlayed += 1
                }
            }
            catch {
            }
        })
    }

}
