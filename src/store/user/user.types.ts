import {IUser} from 'types/user';

interface IUserStoreActions {
  initialize: () => void;
  initUser: (user: IUser) => void;
  reset: () => void;
  logout: () => void;
}

export interface IUserStore {
  user: IUser | null;
  actions: IUserStoreActions;
}
