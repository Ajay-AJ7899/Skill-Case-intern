const commentService = require('../services/commentService');

const addComment = async (req, res) => {
  const comment = await commentService.addComment({
    videoId: req.params.id,
    userId: req.user.id,
    content: req.body.content,
  });

  res.status(201).json({
    success: true,
    message: 'Comment added successfully',
    data: comment,
  });
};

const getComments = async (req, res) => {
  const comments = await commentService.getCommentsByVideoId(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Comments fetched successfully',
    data: comments,
  });
};

module.exports = {
  addComment,
  getComments,
};
