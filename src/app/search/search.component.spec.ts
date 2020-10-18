import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TweetSearchService } from '../tweet-search.service';

import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';

class mockTweetService {
  searchTweets(searchParam: string, limitResults: number) {
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

    return of({
      result: tweetResultResponseMock,
      error: null
    });
  }
}


describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: TweetSearchService,
          useValue: mockTweetService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
