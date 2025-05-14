const CommentService = require('../services/comment-service');
const commentService = new CommentService();

const createComm = async(req,res) => {
    try{
        const response = await commentService.createComment(req.query.modelId,req.query.modelType,req.user.id,req.body.content);
        console.log(response);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Comment created successfully',
            err: {}
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Error in creating comment',
            err: err
        });
    }
}

module.exports = {
    createComm,
    commentService
}