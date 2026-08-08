export const successResponse = <T>(data: T, message = 'Success') => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message: string, details?: unknown) => ({
  success: false,
  message,
  details,
});
