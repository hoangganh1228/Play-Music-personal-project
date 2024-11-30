const Song = require("../../models/song.model");
const Singer = require("../../models/singer.model");
const convertToSlug = require("../../helpers/convertToSlug");


module.exports.result = async (req, res) => {
  const keyword = req.query.keyword;
  
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
        const infoSinger = Singer.findOne({
          _id: song.singerId
        });

        song.infoSinger = infoSinger;
      }

      newSongs = songs;
    } 
  }
  
  res.render("client/pages/search/result", {
    pageTitle: `Kết quả: ${keyword}`,
    keyword: keyword,
    songs: newSongs
  });
}