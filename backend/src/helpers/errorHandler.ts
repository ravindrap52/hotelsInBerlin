interface IError {
  success: boolean;
  error: string;
  result: null;
}

export const errorHandler = (success: boolean, error: string, result: null): IError => {
  return { success, error, result };
};
