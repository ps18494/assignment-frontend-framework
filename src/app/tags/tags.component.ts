import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Song } from '../song';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  constructor(private apiService: ApiService, private location: Location) {

  }

  ngOnInit(): void {
    this.getTags();
  }

  tags: Set<string> = new Set();

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#'; // <-----------
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

  getTags() {
    let tags_: Set<string> = new Set();
    this.apiService.getSongs().subscribe((data: Song[]) => {
      data.map(d => {
        tags_ = new Set([...tags_, ...d.tags])
      })
      this.tags = tags_;
    })
  }

  back() {
    this.location.back();
  }
}
