import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { API_BASE } from '../constants.module';
import { Song } from './song';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  getSongs() {

    let tag = this.route.snapshot.queryParamMap.get('tag');
    if (!tag) {
      tag = '';
    }
    return this.http.get<Song[]>(API_BASE + 'songs', {
      params: new HttpParams().set('q', tag)
    });
  }

  getSong(id: string) {
    return this.http.get<Song>(API_BASE + `songs/${id}`)
  }
}
