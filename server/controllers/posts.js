import Post from "../models/Post.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    console.log("reached")
    const data = req.body.prompt;
    const newPost = new Post({
      post: data
    });
    await newPost.save();
    console.log("saved")
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
