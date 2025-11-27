const Movie = require('./movie_model');

class MovieDetail extends Movie {
    constructor(movie, director_list, actor_list, avgRating, review_list) {
        super(movie);  // Gọi constructor của Movie
        this.directors = director_list;
        this.actors = actor_list;
        this.avgRating = avgRating;
        this.reviews = review_list;
    }
    toJSON() {
        // Lấy JSON của parent
        const baseJSON = super.toJSON();
        
        // Thêm các field mới
        return {
            ...baseJSON,
            directors: this.directors,
            actors: this.actors,
            avgRating: this.avgRating,
            reviews: this.reviews
        };
    }
}

module.exports = MovieDetail;