import React, {useCallback, useEffect, useState} from 'react';
import {AuthRouter} from './Auth.Router';
import {NavigationContainer} from '@react-navigation/native';
import {useUserStore} from '../store/user/user.store';
import {TabRouter} from './Tab.Router';

const Router = () => {
  const delay = (ms: number, cb?: any) =>
    new Promise(resolve => setTimeout(resolve, ms, cb));
  const [ready, setReady] = useState<boolean>(false);
  const {
    user,
    actions: {initialize: initializeUser},
  } = useUserStore(state => state);
  const init = useCallback(async () => {
    await delay(1500, initializeUser());
    setReady(true);
  }, [initializeUser]);

  useEffect(() => {
    console.log(user);
    init();
  }, [init]);
  if (!ready) {
    return null;
  }
  return (
    <NavigationContainer>
      {user ? <TabRouter /> : <AuthRouter />}
    </NavigationContainer>
  );
};

export default Router;
