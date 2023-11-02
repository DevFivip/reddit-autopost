const cron = require("node-cron");
const post = require("./model/post");
const usuario = require("./model/usuario");
const watermark = require("./util/watermark");
const reddit = require("./util/reddit");
const imgur = require("./util/imgur");

module.exports.init = () => {
  const scheduledJobFunction = cron.schedule("*/1 * * * *", async () => {
    console.log("schedule is runnig");
    const _post = await post.getComming();
    console.log('desde cron',{ _post })
    const _usuario = await usuario.find(_post.usuario_id);
  
    if (_post.file_url === null) {
      await post.updateStatus(5, _post.id);
      const file = await watermark.mark(_post.file_dir, 'u/' + _usuario.reddit_name)
      // console.log(file);
      const link = await imgur.send(file);
      // console.log(link)
      await post.updateLinkImgur(link, file, _post.id);
      _post.file_url = link
      _post.file_dir = file
      const status = await reddit.uploadToReddit(_post, _usuario);
      console.log({ status })
      if (status == true) {
        await post.updateStatus(2, _post.id);
      }else{
        await post.updateStatus(4, _post.id);
      }
    } else {
      await post.updateStatus(5, _post.id);
      const status = await reddit.uploadToReddit(_post, _usuario);
      console.log({ status })
      if (status == true) {
        await post.updateStatus(2, _post.id);
      }else{
        await post.updateStatus(4, _post.id);
      }
    }
  });

  scheduledJobFunction.start();
}