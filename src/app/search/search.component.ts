import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../interfaces/request.interface';
import { TweetResult } from '../interfaces/tweet.interface';
import { TweetSearchService } from '../tweet-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  public searchInput: string
  public tweetResultsResponse$: Observable<Request<TweetResult>>;

  constructor(private tweetSearchService: TweetSearchService) { }

  oninput(): void {
    if(this.searchInput.length>0) {
      this.getData(100);
    }else {
      this.tweetResultsResponse$ = null;
    }
  }

  search(): void {
    this.getData(100);
  }

  clearSearch():void {
    this.searchInput=null;
    this.tweetResultsResponse$= null;
  }

  getData(maxResults: number): void {
    this.tweetResultsResponse$ = this.tweetSearchService.searchTweets(this.searchInput, maxResults);
  }

  asIsOrder(a, b) {
    return 1;
  }

  isEmpty(object: Object) {
    return Object.keys(object).length===0;
  }

}
