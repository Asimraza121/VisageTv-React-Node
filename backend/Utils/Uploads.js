const multer = require("multer");
let storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""));
  },
});

const Pictures = multer({
  storage: storage,

  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|JPEG|jpg|JPG|png|PNG)$/)) {
      return cb(
        res
          .status(401)
          .json({ message: "only upload files with jpg, jpeg, png format." })
      );
    }
    cb(undefined, true); // continue with upload
  },
});

const Files = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./uploads/");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),

  fileFilter(req, file, cb) {
    if (
      !file.originalname.match(
        /\.(jpeg|JPEG|jpg|JPG|png|PNG|pdf|PDF|doc|DOC|docx|DOCX|xlsx|XLSX|xls|XLS)$/
      )
    ) {
      return cb(
        res
          .status(401)
          .json({ message: "only upload files with jpg, jpeg, png format." })
      );
    }
    cb(undefined, true); // continue with upload
  },
});

module.exports = { Pictures, Files };
