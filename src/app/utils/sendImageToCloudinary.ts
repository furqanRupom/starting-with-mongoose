import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from "fs"
import AppError from '../errors/AppError';
import httpStatus from 'http-status';

export const sendImageToCloudinary = (imageName: string, path: string) => {
  cloudinary.config({
    cloud_name: config.cloud_name as string,
    api_key: config.api_key as string,
    api_secret: config.api_secret as string,
  });

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        } else resolve(result);


        /* delete the temporory file */

         fs.unlink(path, error => {
           if (error) {
             reject(error);
           } else {
             console.log('the file was deleted');
           }
         });
      },
    );


  });


};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
