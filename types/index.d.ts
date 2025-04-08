// Global types for the project
// Avoids having to import types in every file

// Represents the main TV show object returned from the API
interface TVShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number;
  averageRuntime: number;
  premiered: string;
  ended: string | null;
  officialSite: string | null;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network;
  webChannel: WebChannel | null;
  dvdCountry: DvdCountry | null;
  externals: Externals;
  image: Image;
  summary: string;
  updated: number;
  _links: Links;
}

// Schedule information for when the show airs
interface Schedule {
  time: string;
  days: string[];
}

// Rating details (average can be null)
interface Rating {
  average: number | null;
}

// Country details used in network information
interface Country {
  name: string;
  code: string;
  timezone: string;
}

// Network airing the show
interface Network {
  id: number;
  name: string;
  country: Country;
  officialSite: string | null;
}

// Fields for webChannel and dvdCountry;
// Currently these are null in responses, but you can expand if needed.
type WebChannel = null;
type DvdCountry = null;

// External IDs from other services
interface Externals {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string;
}

// Image URLs for the show
interface Image {
  medium: string;
  original: string;
}

// A simple hyperlink structure used for _links
interface Link {
  href: string;
  name?: string;
}

// Hyperlinks attached to the show object
interface Links {
  self: Link;
  previousepisode?: Link;
  nextepisode?: Link;
}

interface Genre {
  name: string;
  shows: TVShow[];
}
