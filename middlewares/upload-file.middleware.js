import { upload } from "../helpers/multer.js";

export const uploadImages = (req, res, next) => {
    
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).send(err.message);
        }
        next();
    });
}
