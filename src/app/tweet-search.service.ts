import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Request } from './interfaces/request.interface';
import { TweetResult } from './interfaces/tweet.interface';

@Injectable({
  providedIn: 'root'
})
export class TweetSearchService {

  private environment = environment;

  constructor(private httpClient: HttpClient) { }

  public searchTweets(searchParam: string, limitResults: number): Observable<Request<TweetResult>> {
    let params = new HttpParams().
      set("query", searchParam).
      set("max_results", limitResults.toString());
    return this.httpClient.
      get(`${this.environment.backEndUrl}/api/v2/tweet/search`, { params: params })
      .pipe(map((tweetResult: TweetResult) => {
        const tweetResults: Request<TweetResult> = {
          result: tweetResult,
          error: null
        }
        return tweetResults;
      }), catchError(this.handleTweetResultError()));
  }

  private handleTweetResultError() {
    return (error: any): Observable<Request<TweetResult>> => {
      return of({ result: null, error });
    };
  }
}
