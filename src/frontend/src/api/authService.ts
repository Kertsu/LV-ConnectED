import { AxiosError } from 'axios';
import ky from 'ky';
import axiosInstance, { API_URL } from './axiosConfig';

export interface ResponseType {
  success: number;
  message: string | null;
  data: any | null
}

// Function to handle user registration
export const registerUser = async ({name, email, role}: {
  name: string;
  email: string;
  role: "student" | "provider"
}) => {
  try {
    const response = await ky.post<ResponseType>('auth/register', {
      prefixUrl: API_URL!,
      json: {
        name,
        email,
        role
      }
    }).json();

    return response;
  } catch (error) {
    throw "Something went wrong!";
  }
};

// Function to handle user login
export const loginUser = async ({email}: {
  email: string;
}) => {
  try {
    const response = await ky.post<ResponseType>('auth/login', {
      prefixUrl: API_URL,
      json: {
        email
      }
    }).json();

    return response;
  } catch (error) {
    throw "Something went wrong!";
  }
};

// Function to verify OTP (during registration)
export const verifyRegistrationOtp = async ({ otp, email, token }: {
  otp: string;
  email: string;
  token: string;
}) => {
  try {
    const response = await ky.post<ResponseType>('auth/verify-register', {
      prefixUrl: API_URL,
      json: {
        otp,
        email,
        token
      }
    }).json();

    return response;
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
    const response = await ky.post<ResponseType>('auth/verify-login', {
      prefixUrl: API_URL,
      json: {
        otp,
        email,
        token
      }
    }).json();

    return response;
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
    const response = await axiosInstance.get('/auth/me');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data || 'Error fetching user details';
    } else {
      throw 'An unexpected error occurred while fetching user details';
    }
  }
};
