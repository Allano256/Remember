// We first test that the signup and signin forms are rendered properly and validated

import react from '@vitejs/plugin-react';
import { render, screen, fireEvent } from '@testing-library/react';
import { defineConfig } from 'vite';
import Signup from './Signup'; 
import '@testing-library/jest-dom';





describe("Signup Component", () => {
    test("renders signup form", () => {
        render(<Signup />);
        
        // Check if all fields are in the document
        expect(screen.getByText(/first name/i)).toBeInTheDocument();
        expect(screen.getByText(/last name/i)).toBeInTheDocument();
        expect(screen.getByText(/email/i)).toBeInTheDocument();
        expect(screen.getByText(/password/i)).toBeInTheDocument();
        expect(screen.getByText(/confirm password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    });

    test("validates inputs", () => {
        render(<Signup />);
        
        const submitButton = screen.getByRole('button', { name: /sign up/i });
        fireEvent.click(submitButton);
        
        // Check for error messages when inputs are empty
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
        expect(screen.getByText(/confirm password is required/i)).toBeInTheDocument();
    });

    test("submits form with correct data", () => {
        const mockSubmit = jest.fn();
        render(<Signup onSubmit={mockSubmit} />);
        
        fireEvent.change(screen.getByText(/first name/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByText(/last name/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByText(/password/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByText(/confirm password/i), { target: { value: 'password123' } });
        
        fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
        
        expect(mockSubmit).toHaveBeenCalledWith({
            firstName: 'testuser',
            lastName: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            confirmPassword: 'password123'
        });
    });
});




