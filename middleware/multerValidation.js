import multer from 'multer';
import os from 'os';

const isVercel = process.env.VERCEL === '1';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      if (isVercel) {
        return cb(null, os.tmpdir());
      }
      if(req.path === '/submitReview'){
        return cb(null, "./public/images/reviewImages");
      }else{
        return cb(null, "./public/images/uploads");
      }
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}-${file.originalname}`);
    },
  });


//Use this upload in form when you don't have to take the images from the user
export const upload = multer({storage: storage});

const fileFilter = (req, file, cb) => {

  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only PNG, JPG and JPEG is allowed!'), false);
  }
};

//Use this upload in form when you have to take the images from the user
export const uploadImages = multer({storage: storage, limits: {fileSize: 10 * 1024 * 1024}, fileFilter}).array('productImgs',5);
export const uploadVendorProfileImg = multer({storage: storage, limits: {fileSize: 2 * 1024 * 1024},fileFilter}).single('profileImg');





// //Use this upload in form when you don't have to take the images from the user
// export const upload = multer({storage: storage});