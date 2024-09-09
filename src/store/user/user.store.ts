import {create} from 'zustand';
import {IUserStore} from './user.types';
import {LocalStorage} from '../LocalStorage';
import {StorageKeys} from '../../types/localstorage.types';
import {useToastStore} from '../toast/toast.store';

const {showToast} = useToastStore.getState().actions;

const initial: Omit<IUserStore, 'actions'> = {
  user: null,
};
export const useUserStore = create<IUserStore>((set, get) => ({
  ...initial,
  actions: {
    initialize: () => {
      const user = LocalStorage.user('get');
      set({user});
    },
    logout: () => {
      LocalStorage.clean([StorageKeys.user]);
      get().actions.reset();
      showToast('success', 'Logged out successfully');
    },
    initUser: user => {
      set({user});
      LocalStorage.user('set', user);
    },
    reset: () => set({...initial}),
  },
}));
