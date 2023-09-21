import {Router} from "express"
import { getAllPosts, postStore } from "../controlles/post.controller.js";
import { uploadImages } from "../middlewares/upload-file.middleware.js";

export const postsRouter = Router();

postsRouter.post('/store', uploadImages, postStore)
postsRouter.get('/get-all-posts/:user_id', getAllPosts)