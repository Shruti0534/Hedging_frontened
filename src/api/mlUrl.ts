const configuredMlUrl = import.meta.env.VITE_ML_URL?.trim();

export const mlApiUrl = (configuredMlUrl || "http://localhost:8000").replace(
  /\/+$/,
  ""
);
