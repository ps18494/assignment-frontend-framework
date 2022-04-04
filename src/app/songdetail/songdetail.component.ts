import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Song } from '../song';

@Component({
  selector: 'app-songdetail',
  templateUrl: './songdetail.component.html',
  styleUrls: ['./songdetail.component.css']
})
export class SongdetailComponent implements OnInit {

  song: Song | undefined;
  constructor(private apiService: ApiService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getSong();
  }

  getSong() {
    const songId = this.route.snapshot.paramMap.get('id')!;
    this.apiService.getSong(songId).subscribe((data: Song) => {
      this.song = data;
    })
  }

  back() {
    this.location.back();
  }

}
