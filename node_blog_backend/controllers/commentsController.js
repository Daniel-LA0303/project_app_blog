import Comment from "../models/Comments.js";
import Post from "../models/Post.js";


const getAllComments = async(req, res) => {
    try {
        const comments = await Comment.find()
        .select('comment dateComment postID')  
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
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json(error);
    }

}

const getAllCommentsByPost = async (postId) => {
    try {
        const comments = await Comment.find({ postID: postId }) // Cambiado de id a postID
            .select('comment dateComment postID')
            .populate({
                path: 'userID',
                select: 'name profilePicture'
            })
            .populate({
                path: 'replies',
                select: 'reply dateReply',
                populate: {
                    path: 'userID',
                    select: 'name profilePicture'
                }
            });
        
        return comments;
    } catch (error) {
        console.error("Error en getAllCommentsByPost:", error);
        throw error; // Lanza el error para que sea capturado por el try-catch en getViewPostPage
    }
}

const getAllCommentsByPostFunction = async (id) => {
    try {
        const comments = await Comment.find({ id })
            .select('comment dateComment postID')
            .populate({
                path: 'userID',
                select: 'name profilePicture'
            })
            .populate({
                path: 'replies',
                select: 'reply dateReply',
                populate: {
                    path: 'userID',
                    select: 'name profilePicture'
                }
            });
        
        res.json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
}


const addComment = async (req, res) => {
    const { id } = req.params; // id del post
    const { userID, comment } = req.body;

    try {
        // Buscar el post por su ID
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        // Crear un nuevo comentario
        const newComment = new Comment({
            userID: userID,
            comment: comment,
            postID: id,
        });

        // Guardar el nuevo comentario
        await newComment.save();

        // Agregar el comentario al post
        post.comments.push(newComment);
        await post.save();

        res.json({ msg: 'Comment saved', comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


const getOneComment = async(req, res) => {
    try {
        const comment = await Comment.findById(req.params.id)
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
        res.json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
}

const editComment = async(req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        comment.comment = req.body.comment;
        await comment.save();
        res.json({msg: 'Comment updated'});
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteComment = async(req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.json({msg: 'Comment deleted'});
    }
    catch (error) {
        res.status(500).json(error);
    }
}

export {
    getAllComments,
    getAllCommentsByPost,
    getAllCommentsByPostFunction,
    addComment,
    getOneComment,
    editComment,
    deleteComment
}