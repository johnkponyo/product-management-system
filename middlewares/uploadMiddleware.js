const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');


// AWS S3 configuration
const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
});



// Multer S3 configuration
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET,
      acl: 'public-read',
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname);
      },
    }),
  });

module.exports = upload