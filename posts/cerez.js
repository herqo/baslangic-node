const mongoose = require("mongoose"),
  Post = require("./models/post"),
  PostComment = require("./models/comment");

const data = [
  {
    title: "React Blade Jsx",
    img: "http://openwalls.com/image/40377/thumb3_grey_leopard.jpg",
    content: "Lorem Ipsum Genereator is mumle"
  },
  {
    title: "Django Dersleri",
    img:
      "https://www.thenextrex.com/wp-content/uploads/2017/05/blogging-SMB.png.png",
    content: "Lorem Ipsum is mumle de capitola"
  }
];

function cerezData() {
  // Yemeklerin Veritabanından Silinmesi
  Post.remove({}, err => {
    // if (err) {
    //   console.log(err);
    // } else {
    //   console.log("Postlar Veritabanından Silindi");
    //   // Node js Tutursızlığından Dolayı Postun altına Yazmalyız
    //   // Yemek Ekleme
    //   data.forEach(function(posts) {
    //     Post.create(posts, (err, post) => {
    //       if (err) {
    //         console.log(err);
    //       } else {
    //         console.log("Postlar Eklendi");
    //         // Yorum Eklenmesi
    //         PostComment.create(
    //           {
    //             comment: "Deneme Yorumu",
    //             writer: "Ömer Ozan"
    //           },
    //           (err, comment) => {
    //             if (err) {
    //               console.log(err);
    //             } else {
    //               post.comments.push(comment);
    //               post.save();
    //               console.log("Yorum DA Tamam ");
    //             }
    //           }
    //         );
    //       }
    //     });
    //   });
    // }
  });
}
module.exports = cerezData();
