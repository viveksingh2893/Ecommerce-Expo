import { securelyStore, securelyRetrieve, securelyDelete, isDeviceCompromised } from './security';
import * as SecureStore from 'expo-secure-store';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

jest.mock('expo-secure-store');
jest.mock('expo-device');

// Mock sessionStorage for web environment tests
Object.defineProperty(global, 'sessionStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
});

describe('Security Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('securelyStore', () => {
    it('should store value using SecureStore on native platforms', async () => {
      Platform.OS = 'ios';
      await securelyStore('myKey', 'myValue');
      
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith('myKey', 'myValue', {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
      });
    });

    it('should fallback to sessionStorage on web', async () => {
      Platform.OS = 'web';
      await securelyStore('myKey', 'myValue');
      expect(sessionStorage.setItem).toHaveBeenCalledWith('myKey', 'myValue');
    });
  });

  describe('securelyRetrieve', () => {
    it('should retrieve value using SecureStore on native platforms', async () => {
      Platform.OS = 'ios';
      (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce('storedValue');
      
      const result = await securelyRetrieve('myKey');
      
      expect(SecureStore.getItemAsync).toHaveBeenCalledWith('myKey');
      expect(result).toBe('storedValue');
    });

    it('should retrieve from sessionStorage on web', async () => {
      Platform.OS = 'web';
      (sessionStorage.getItem as jest.Mock).mockReturnValueOnce('webValue');
      
      const result = await securelyRetrieve('myKey');
      expect(sessionStorage.getItem).toHaveBeenCalledWith('myKey');
      expect(result).toBe('webValue');
    });
  });

  describe('securelyDelete', () => {
    it('should delete value using SecureStore on native platforms', async () => {
      Platform.OS = 'android';
      await securelyDelete('myKey');
      expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('myKey');
    });

    it('should delete from sessionStorage on web', async () => {
      Platform.OS = 'web';
      await securelyDelete('myKey');
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('myKey');
    });
  });

  describe('isDeviceCompromised', () => {
    it('should return false on web', async () => {
      Platform.OS = 'web';
      const result = await isDeviceCompromised();
      expect(result).toBe(false);
      expect(Device.isRootedExperimentalAsync).not.toHaveBeenCalled();
    });

    it('should return true if device is rooted', async () => {
      Platform.OS = 'android';
      (Device.isRootedExperimentalAsync as jest.Mock).mockResolvedValueOnce(true);
      
      const result = await isDeviceCompromised();
      expect(result).toBe(true);
    });

    it('should return false if root check throws an error (fail closed/open depending on strictness)', async () => {
      Platform.OS = 'ios';
      (Device.isRootedExperimentalAsync as jest.Mock).mockRejectedValueOnce(new Error('API unavailable'));
      
      const result = await isDeviceCompromised();
      expect(result).toBe(false);
    });
  });
});
