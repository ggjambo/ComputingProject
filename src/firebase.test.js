// Import Firebase auth and storage
import { auth, storage } from './firebase';

// Test Firebase authentication
describe('Firebase auth', () => {
  it('should initialize Firebase auth', () => {
    expect(auth).toBeDefined();
  });
});

// Test Firebase storage
describe('Firebase storage', () => {
  it('should initialize Firebase storage', () => {
    expect(storage).toBeDefined();
  });
});
