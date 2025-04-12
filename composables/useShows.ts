export async function useShows () {
  const config = useRuntimeConfig();
  const showsApiUrl = `${config.public.apiBase}/shows`;
  
  const showListByGenre = ref<Genre[]>([]);
  const top10Shows = ref<TVShow[]>([]);

  const { data, status } = await useFetch<TVShow[]>(showsApiUrl);

  if (data.value && Array.isArray(data.value)) {
    // All TV shows returned from the API
    const tvShows: TVShow[] = data.value;

    // Assemble Map of shows by genre
    const genreMap = new Map<string, TVShow[]>();
    tvShows.forEach((show: TVShow) => {
      show.genres.forEach((genre: string) => {
        if (genreMap.has(genre)) {
          genreMap.get(genre)!.push(show);
        } else {
          genreMap.set(genre, [show]);
        }
      });
    });

    // Create sorted genre list where each genre's shows are ordered by rating (highest first)
    const showsByGenre: Genre[] = Array.from(genreMap.entries()).map(([name, shows]) => {
      const sortedShows = [...shows].sort((a, b) => {
        const ratingA = a.rating?.average || 0;
        const ratingB = b.rating?.average || 0;
        return ratingB - ratingA;
      });
      return { name, shows: sortedShows };
    });

    // Sort genres so that the genre with the best top-rated show comes first
    showsByGenre.sort((a, b) => {
      const topRatingA = a.shows[0]?.rating?.average || 0;
      const topRatingB = b.shows[0]?.rating?.average || 0;
      return topRatingB - topRatingA;
    });
    showListByGenre.value = showsByGenre;

    // Gather top 10 rated shows from all returned shows
    const sortedAllShows = [...tvShows].sort((a, b) => {
      const ratingA = a.rating?.average || 0;
      const ratingB = b.rating?.average || 0;
      return ratingB - ratingA;
    });
    top10Shows.value = sortedAllShows.slice(0, 10);
  }
  
  return {
    showListByGenre,
    top10Shows,
    status
  };
};