import { render, screen } from '@testing-library/react';

jest.mock('./api/client', () => ({
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
  },
}));

jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => children,
  GoogleLogin: () => null,
}));

jest.mock('./auth/auth', () => ({
  useAuth: () => ({ isAuthenticated: false, loading: false, currentUser: null })
}));

const App = require('./App').default;

test('renders login screen for unauthenticated users', () => {
  render(<App />);
  expect(screen.getByText('Welcome Back')).toBeInTheDocument();
});
