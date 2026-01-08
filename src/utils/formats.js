//represent errors in a single string

export const FORMAT_VALIDATION_ERROR = (error) => {
  if (!error || !error.issues) return "Validion failed";

  if (Array.isArray(error.issues)) {
    return error.issues.map((issue) => issue.message).join(", ");
  }

  return JSON.stringify(error);
};
