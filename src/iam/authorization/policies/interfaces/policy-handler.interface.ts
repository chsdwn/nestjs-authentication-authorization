import { ActiveUserData } from 'src/iam/interfaces';
import { Policy } from '.';

export interface PolicyHandler<T extends Policy> {
  handle(policy: T, user: ActiveUserData): Promise<void>;
}
