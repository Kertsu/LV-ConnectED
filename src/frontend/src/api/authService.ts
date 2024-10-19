import { AxiosError } from 'axios';
import axiosInstance from './axiosConfig';

// Function to handle user registration
export const registerUser = async ({name, email, role}: {
  name: string;
  email: string;
  role: "student" | "provider"
}) => {
  try {
    const response = await axiosInstance.post('/auth/register', {
        name,
        email,
        role
    });

    return response.data;
  } catch (error) {
    throw "Something went wrong!";
  }
};

// Function to handle user login
export const loginUser = async ({ email }: {
  email: string;
}) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      email
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.message;
    } else {
      throw "Something went wrong!";
    }
  }
};

// Function to verify OTP (during registration)
export const verifyRegistrationOtp = async ({ otp, email, token }: {
  otp: string;
  email: string;
  token: string;
}) => {
  try {
    const response = await axiosInstance.post('/auth/verify-register', {
      otp,
      email,
      token
    });

    return response.data;
  } catch (error) {
    throw 'An unexpected error occurred during OTP verification';
  }
};

// Function to verify OTP (during login)
export const verifyLoginOtp = async ({ otp, email, token }: {
  otp: string;
  email: string;
  token: string;
}) => {
  try {
    const response = await axiosInstance.post('/auth/verify-login', {
        otp,
        email,
        token
    });

    return response.data;
  } catch (error) {
    throw 'An unexpected error occurred during OTP verification';
  }
};

// Function to resend OTP
export const resendOtp = async (email: string) => {
  try {
    const response = await axiosInstance.post('/auth/resend-otp', { email });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || 'Error resending OTP';
    } else {
      throw 'An unexpected error occurred during OTP resending';
    }
  }
};

// Function to get logged-in user details
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.post("/@self");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || 'Error fetching user details';
    } else {
      throw 'An unexpected error occurred while fetching user details';
    }
  }
};
