/**
 * Mock TV show data for testing purposes
 * Follows the TVShow interface structure from the API
 */

// Import the TVShow interface
/// <reference types="../types" />

export const mockShow: TVShow = {
  "id": 1,
  "url": "https://www.tvmaze.com/shows/1/under-the-dome",
  "name": "Under the Dome",
  "type": "Scripted",
  "language": "English",
  "genres": ["Drama", "Science-Fiction", "Thriller"],
  "status": "Ended",
  "runtime": 60,
  "averageRuntime": 60,
  "premiered": "2013-06-24",
  "ended": "2015-09-10",
  "officialSite": "http://www.cbs.com/shows/under-the-dome/",
  "schedule": {
      "time": "22:00",
      "days": ["Thursday"]
  },
  "rating": {
      "average": 6.5
  },
  "weight": 98,
  "network": {
      "id": 2,
      "name": "CBS",
      "country": {
          "name": "United States",
          "code": "US",
          "timezone": "America/New_York"
      },
      "officialSite": "https://www.cbs.com/"
  },
  "webChannel": null,
  "dvdCountry": null,
  "externals": {
      "tvrage": 25988,
      "thetvdb": 264492,
      "imdb": "tt1553656"
  },
  "image": {
      "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg",
      "original": "https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg"
  },
  "summary": "<p><b>Under the Dome</b> is the story of a small town that is suddenly and inexplicably sealed off from the rest of the world by an enormous transparent dome. The town's inhabitants must deal with surviving the post-apocalyptic conditions while searching for answers about the dome, where it came from and if and when it will go away.</p>",
  "updated": 1739649693,
  "_links": {
      "self": {
          "href": "https://api.tvmaze.com/shows/1"
      },
      "previousepisode": {
          "href": "https://api.tvmaze.com/episodes/185054",
          "name": "The Enemy Within"
      }
  }
};

// Add more mock data as needed for different test scenarios
export const mockTopShows: TVShow[] = Array(10).fill(null).map((_, index) => ({
  ...mockShow,
  id: index + 1,
  name: `Show ${index + 1}`
})); 