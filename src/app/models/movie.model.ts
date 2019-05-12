import {MovieCategory} from './movie-category.model';
import {MovieProducer} from './movie-producer.model';
import {Actor} from './actor.model';

export class Movie {
  constructor(public id: number, public name: string,
              public privatecategoryMovie: MovieCategory, private createData: Date,
              public movieActors: Actor[], public viewsCount: number,
              public language: string, public movieProducer: MovieProducer,
              public video: string, public image: URL,
              public publicationDate: Date) {}
}
