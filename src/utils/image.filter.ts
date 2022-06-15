export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|png|jpeg)$/))
    return callback(new Error('This format is not allowed'), false);

  callback(null, true);
};
