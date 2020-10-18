import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TweetSearchService } from './tweet-search.service';
import { Request } from '../app/interfaces/request.interface';
import { TweetResult } from './interfaces/tweet.interface';
import { environment } from 'src/environments/environment';

describe('TweetSearchService', () => {
  let service: TweetSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TweetSearchService]
    });
    service = TestBed.inject(TweetSearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to get tweets from Api', () => {
    const tweetResultResponseMock = {
      "tweets": [
        {
          id: "someId",
          text: "someText"
        }
      ],
      "countByTrendingsTagNames": {
        "sampleTag": 1
      }
    }

    service.searchTweets("someParam", 100).subscribe((tweetResult: Request<TweetResult>) => {
      expect(tweetResult.result.tweets).toEqual(tweetResultResponseMock.tweets);
      expect(tweetResult.error).toBeNull();
    });

     const req = httpMock.expectOne(`${environment.backEndUrl}/api/v2/tweet/search?query=someParam&max_results=100`);
     expect(req.request.method).toBe("GET");
     req.flush(tweetResultResponseMock);
  });

});
