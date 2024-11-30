const Song = require("../../models/song.model");
const Singer = require("../../models/singer.model");
const convertToSlug = require("../../helpers/convertToSlug");


module.exports.result = async (req, res) => {
  const keyword = req.query.keyword;
  const type = req.params.type

  let newSongs = [];

  if(keyword) {
    const keywordRegex = new RegExp(keyword, "i");
    const unicodeSlug  = convertToSlug.convertToSlug(keyword)
    const slugRegex = new RegExp(unicodeSlug, "i");

    const songs = await Song.find({
      $or: [
        { title: keywordRegex },
        { slug: slugRegex }
      ]
    })

    if(songs.length > 0) {
      for(const song of songs) {
        const infoSinger = await Singer.findOne({
          _id: song.singerId
        });

        newSongs.push({
          id: song.id,
          title: song.title,
          avatar: song.avatar,
          slug: song.slug,
          like: song.like,
          infoSinger: {
            fullName: infoSinger.fullName
          }
        })
      }
    } 
  }

  
  
  switch (type) {
    case "result":
      res.render("client/pages/search/result", {
        pageTitle: `Kết quả: ${keyword}`,
        keyword: keyword,
        songs: newSongs
      });
      break;
    case "suggest":
      res.json({
        code: 200,
        message: "Thành công!",
        songs: newSongs
      })
      break;
    default:
      res.json({
        code: 400,
        message: "Lỗi!"
      });
      break;
  }
}