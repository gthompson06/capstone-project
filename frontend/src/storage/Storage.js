import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveTokens = async (access, refresh, userId) => {
  await AsyncStorage.multiSet([
    ['accessToken', access],
    ['refreshToken', refresh],
    ['userId', userId],
  ]);
};

export const getTokens = async () => {
  const data = await AsyncStorage.multiGet(['accessToken', 'refreshToken', 'userId']);
  return Object.fromEntries(data);
};

export const removeTokens = async () => {
  await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'userId']);
};