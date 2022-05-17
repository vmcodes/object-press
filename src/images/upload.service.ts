import { Injectable } from '@nestjs/common';
import { constants } from '../constants';
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: constants.accessKeyId,
  secretAccessKey: constants.secretAccessKey,
  region: 'us-east-1',
});

const s3 = new AWS.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.includes('image')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type.'), false);
  }
};

@Injectable()
export class UploadService {
  upload = multer({
    fileFilter,
    storage: multerS3({
      acl: 'public-read',
      s3,
      bucket: 'objectpress',
      metadata: function (req, file, cb) {
        cb(null, { originalname: file.fieldname });
      },
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function (req, file, cb) {
        cb(null, file.fieldname);
      },
    }),
  }).any();
}
