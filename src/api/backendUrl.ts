const backendBaseUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/+$/, "");
const versionedBackendBaseUrl = backendBaseUrl.endsWith("/api/v1")
  ? backendBaseUrl
  : `${backendBaseUrl}/api/v1`;

export const backendApiUrl = (path: string) =>
  `${versionedBackendBaseUrl}/${path.replace(/^\/+/, "")}`;
