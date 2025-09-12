export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_URL || "http://dsnsandbox.com:8080";
};
