const Song = require("../../models/song.model");
const Topic = require("../../models/topic.model");
const Singer = require("../../models/singer.model");


module.exports.list = async (req, res) => {
  const find = {
    status: "active",
    deleted: false
  }

  const slugTopic = req.params.slugTopic;

  const topic = await Topic.findOne({
    slug: slugTopic,
    deleted: false
  })

  if(slugTopic) {
    find.topicId = topic.id
  }

  const songs = await Song.find(find);

  for(const song of songs) {
    const infoSinger  = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    }).select("fullName");
    song.infoSinger = infoSinger 
  }


  res.render("client/pages/songs/list", {
    pageTitle: topic.title,
    songs: songs
});
}