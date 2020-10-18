export interface TweetResult {
    tweets: Tweet[];
    countByTrendingsTagNames : Map<String, Number>;
}


export interface Tweet {
    id?: string,
    text?: string, 
}