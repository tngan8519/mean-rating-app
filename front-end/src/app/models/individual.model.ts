import { User } from './user.model';
import { Rate } from './rate.model';

export interface Individual {
  _id: string;
  name: string;
  image: string;
  description: string;
  author: User;
  rates: Array<Rate>;
  createdAt: string;
  updatedAt: string;
}

export interface IndividualWithStars extends Individual {
  stars: number;
}
