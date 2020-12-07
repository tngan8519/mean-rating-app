import { Individual } from './individual.model';
import { User } from './user.model';

export interface Rate {
  _id: string;
  rating: number;
  text: string;
  author: User;
  individual: Individual;
  createdAt: string;
  updatedAt: string;
}
