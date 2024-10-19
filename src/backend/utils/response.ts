import { Response } from "express";

export const httpResponseSuccess = (
  response: Response,
  data: any = null,
  message: null | string = null,
  code: number = 200
) => {
  return response.status(code).json({
    success: true,
    ...data,
    message,
  });
};

export const httpResponseError = (
  response: Response,
  data: any = null,
  message: null | string = null,
  code: number = 400
) => {
  return response.status(code).json({
    success: false,
    ...data,
    message,
  });
};