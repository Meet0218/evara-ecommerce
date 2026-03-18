import multer from 'multer';

const storage = multer.memoryStorage();


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