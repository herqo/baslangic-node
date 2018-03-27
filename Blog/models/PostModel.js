const mongoose = require("mongoose");

const URL_slug = require("mongoose-url-slugs");

const postSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: "Can Not Be Empty"
  },
  // SeoName:{
  // type:String,
  // },
  PostCom: {
    type: String,
    required: "Can Not Be Empty"
  },
  PostImg: {
    type: String,
    required: "Can Not Be Empty"
  },
  Post: {
    type: String,
    required: "Can Not Be Empty"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// postSchema.pre('save', function(next){
//   this.SeoName = speaker_url(this.Title, {
//     lang:'tr'
//   });
//   next()
// });

postSchema.plugin(URL_slug("Title", { field: "myslug" }));

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
