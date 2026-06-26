const videoService = require('../services/videoService');

const createVideo = async (req, res) => {
  const video = await videoService.createVideo(req.body);

  res.status(201).json({
    success: true,
    message: 'Video created successfully',
    data: video,
  });
};

const getVideos = async (req, res) => {
  const videos = await videoService.getVideos(req.query.category);

  res.status(200).json({
    success: true,
    message: 'Videos fetched successfully',
    data: videos,
  });
};

const getVideoById = async (req, res) => {
  const video = await videoService.getVideoById(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Video fetched successfully',
    data: video,
  });
};

const likeVideo = async (req, res) => {
  const video = await videoService.likeVideo(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    message: 'Video liked successfully',
    data: video,
  });
};

module.exports = {
  createVideo,
  getVideos,
  getVideoById,
  likeVideo,
};
