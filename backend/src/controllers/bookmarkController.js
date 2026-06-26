const bookmarkService = require('../services/bookmarkService');

const addBookmark = async (req, res) => {
  const bookmark = await bookmarkService.addBookmark({
    videoId: req.params.id,
    userId: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: 'Video bookmarked successfully',
    data: bookmark,
  });
};

module.exports = {
  addBookmark,
};
