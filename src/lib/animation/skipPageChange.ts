let skipPageChange = true;

export const forceSkipPageChange = () => {
  skipPageChange = true;
};

export const removeSkipPageChange = () => {
  skipPageChange = false;
};
export const getSkipPageChange = (): boolean => skipPageChange;
