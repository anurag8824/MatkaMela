import multer from "multer";
import path from "path";
import fs from "fs";

const qrFolder = path.join(process.cwd(), "qrImage");

// Agar folder exist nahi hai toh create kar lo
if (!fs.existsSync(qrFolder)) {
  fs.mkdirSync(qrFolder);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, qrFolder);
  },
  filename: function (req, file, cb) {
    cb(null, "qrscanner.jpg"); // fixed name
  },
});

export const qrMulter = multer({ storage: storage });
