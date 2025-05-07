const LikeService = require('../services/like-service');

const likeService = new LikeService();

const toggleLike = async (req, res) => {
    try {
        const response = await likeService.toggleLike(req.query.modelId, req.query.modelType, req.body.userId);
        return res.status(200).json({
            success: true,
            data: response,
            message: 'Like toggled successfully',
            error: {}
        })
    }
    catch (error) {
        res.status(500).json({ 
            message: 'Internal server error' ,
            error: error.message,
            success: false

        });
    }
}


module.exports = {
    toggleLike
}