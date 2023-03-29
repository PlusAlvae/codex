import Post from "../models/Post.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { prompt } = req.body;
    const newPost = new Post({
      prompt: prompt
    });
    await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
