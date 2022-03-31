import { constants } from 'fs';
import { mkdir, access, unlink } from 'fs/promises';

export const createFolder = async (path) => {
  try {
    if (await checkPathExists(path)) {
      await mkdir(path, { recursive: true });
    }
    return true;
  } catch (err) {
    return false;
  }
};

export const getListPath = (files) => {
  return files.map((file) => file.path);
};

export const checkPathExists = async (filePath) => {
  try {
    await access(filePath, constants.F_OK | constants.R_OK | constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
};

export const remove = async (path) => {
  try {
    await unlink(path);
    return true;
  } catch (err) {
    return false;
  }
};
