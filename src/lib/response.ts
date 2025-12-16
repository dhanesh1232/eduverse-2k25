import { NextResponse } from "next/server";

// Define response type for better type safety
type ResponseData = Record<string, unknown> | null;

const headers = {
  "Content-Type": "application/json",
} as const;

const ReturnResponse = (
  status: number,
  message: string,
  data: ResponseData = null
) => {
  return NextResponse.json(
    { success: status >= 200 && status < 300, message, ...(data && { data }) },
    { status, headers }
  );
};

export const ErrorHandles = {
  BadRequest: (message: string = "Bad Request", data: ResponseData = null) =>
    ReturnResponse(400, message, data),
  Unauthorized: (message: string = "Unauthorized", data: ResponseData = null) =>
    ReturnResponse(401, message, data),
  Forbidden: (message: string = "Forbidden", data: ResponseData = null) =>
    ReturnResponse(403, message, data),
  NotFound: (message: string = "Not Found", data: ResponseData = null) =>
    ReturnResponse(404, message, data),
  Conflict: (message: string = "Conflict", data: ResponseData = null) =>
    ReturnResponse(409, message, data),
  UnprocessableEntity: (
    message: string = "Unprocessable Entity",
    data: ResponseData = null
  ) => ReturnResponse(422, message, data),
  TooManyRequests: (
    message: string = "Too Many Requests",
    data: ResponseData = null
  ) => ReturnResponse(429, message, data),
  InternalServer: (
    message: string = "Internal Server Error",
    data: ResponseData = null
  ) => ReturnResponse(500, message, data),
  ServiceUnavailable: (
    message: string = "Service Unavailable",
    data: ResponseData = null
  ) => ReturnResponse(503, message, data),
} as const;

export const SuccessHandles = {
  Ok: (message: string = "Success", data: ResponseData = null) =>
    ReturnResponse(200, message, data),
  Created: (message: string = "Resource Created", data: ResponseData = null) =>
    ReturnResponse(201, message, data),
  Accepted: (message: string = "Accepted", data: ResponseData = null) =>
    ReturnResponse(202, message, data),
} as const;
