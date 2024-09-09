import {IToastStore} from './toast.types';

const DURATION = 5000;

const vectors = {
  default: null,
  info: require('../../assets/vector/toast_info.svg'),
  success: require('../../assets/vector/toast_success.svg'),
  warning: require('../../assets/vector/toast_warning.svg'),
  error: require('../../assets/vector/toast_error.svg'),
};

export const showToastAction =
  (set: any) => (severity: IToastStore['severity'], message: string) => {
    set((state: IToastStore) => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      const newTimeoutId = setTimeout(() => {
        set({
          show: false,
          severity: 'default',
          message: '',
          icon: null,
        });
      }, DURATION);
      return {
        show: true,
        severity,
        message,
        icon: vectors[severity],
        timeoutId: newTimeoutId,
      };
    });
  };

export const hideToastAction =
  (set: any, initialState: Omit<IToastStore, 'actions'>) => () => {
    set((state: IToastStore) => {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      return {...initialState};
    });
  };
