import {Router} from "express"
import { postStore } from "../controlles/post.controller.js";
import { uploadImages } from "../middlewares/upload-file.middleware.js";

export const postsRouter = Router();

postsRouter.post('/store', uploadImages, postStore)