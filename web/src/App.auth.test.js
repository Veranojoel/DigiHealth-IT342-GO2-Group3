import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import apiClient from './api/client';

jest.mock('./api/client', () => ({
  default: {
    get: jest.fn(),
  },
}));

jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => children,
  GoogleLogin: () => null,
}));

jest.mock('./auth/auth', () => ({
  useAuth: () => ({ isAuthenticated: true, loading: false, currentUser: { role: 'DOCTOR', fullName: 'Dr. Test' } })
}));

const App = require('./App').default;

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock apiClient

describe('App Routing and Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null); // No token by default
  });

  test('redirects unauthenticated users to login', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
  });

  test('allows authenticated users to access dashboard', async () => {
    // Set up authenticated state
    localStorageMock.getItem.mockReturnValue('fake-jwt-token');

    // Mock API responses
    apiClient.get
      .mockResolvedValueOnce({ data: { totalPatients: 3, todayConfirmed: 1, todayPending: 1, todayCompleted: 1 } })
      .mockResolvedValueOnce({ data: [{ id: 1, time: '10:00 AM', patientName: 'John Doe', type: 'Checkup', status: 'confirmed' }] });

    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('My Patients')).toBeInTheDocument();
    });

    expect(screen.getByText('3')).toBeInTheDocument(); // totalPatients stat
  });
});
