import Comment from "../models/Comments.js";
import Replies from "../models/Replies.js";

const getAllReplies = async (req, res) => {
  try {
    const replies = await Replies.find();
    res.json(replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReply = async (req, res) => {
  try {
    const reply = await Replies.findById(req.params.id);
    res.json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

const createReply = async (req, res) => {
  try {
      // Crear la nueva respuesta
      const reply = new Replies({
          reply: req.body.reply,
          commentId: req.params.id,
          userID: req.body.userID,
          postID: req.body.postID,
          dateReply: new Date()
      });

      // Guardar la nueva respuesta
      const newReply = await reply.save();

      // Buscar el comentario correspondiente
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
          return res.status(404).json({ message: "Comment not found" });
      }

      // Añadir la nueva respuesta al array de respuestas del comentario
      comment.replies.push(newReply._id);
      await comment.save();

      const comment2 = await Comment.findById(req.params.id)
        .select('comment dateComment ')  
        .populate({
            path: 'userID',
            select: 'name profilePicture'  
        }).populate({
            path: 'replies',
            select: 'reply dateReply',
            populate: {
                path: 'userID',
                select: 'name profilePicture'
            }
        })
        res.json(comment2);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};


const updateReply = async (req, res) => {
  try {
    const reply = await Replies.findById(req.params.id);
    if (req.body.reply) {
      reply.reply = req.body.reply;
    }
    const updatedReply = await reply.save();
    const comment2 = await Comment.findById(req.body.commentID)
        .select('comment dateComment ')  
        .populate({
            path: 'userID',
            select: 'name profilePicture'  
        }).populate({
            path: 'replies',
            select: 'reply dateReply',
            populate: {
                path: 'userID',
                select: 'name profilePicture'
            }
        })
        res.json(comment2);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReply = async (req, res) => {
  try {
    await Replies.findByIdAndDelete(req.params.id);
    const comment2 = await Comment.findById(req.body.commentID)
        .select('comment dateComment ')  
        .populate({
            path: 'userID',
            select: 'name profilePicture'  
        }).populate({
            path: 'replies',
            select: 'reply dateReply',
            populate: {
                path: 'userID',
                select: 'name profilePicture'
            }
        })
        res.json(comment2);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllReplies,
  getReply,
  createReply,
  updateReply,
  deleteReply,
};