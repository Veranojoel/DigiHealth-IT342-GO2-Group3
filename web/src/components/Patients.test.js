import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import apiClient from '../api/client';

jest.mock('../api/client', () => ({
  default: {
    get: jest.fn(),
  },
}));

jest.mock('../auth/auth', () => ({
  useAuth: () => ({ currentUser: { role: 'DOCTOR', fullName: 'Dr. Test' } })
}));

const Patients = require('./Patients').default;

// Mock apiClient

describe('Patients', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders patients table with patient data', async () => {
    // Mock API response
    apiClient.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: 'John Doe',
          phone: '123-456-7890',
          email: 'john@example.com',
          lastVisit: '2023-10-01'
        }
      ]
    });

    render(<Patients />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Check table data
    expect(screen.getByText('1')).toBeInTheDocument(); // id
    expect(screen.getByText('123-456-7890')).toBeInTheDocument(); // phone
    expect(screen.getByText('john@example.com')).toBeInTheDocument(); // email
    expect(screen.getByText('2023-10-01')).toBeInTheDocument(); // lastVisit
  });
});
