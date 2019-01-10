var fs = require('fs-extra'),
    config = require('../../../services/config');
    const jsdom = require("jsdom");
    const { JSDOM } = jsdom;

module.exports = {

    /**
     * return collection of article given appId
     *
     * @param req appId
     * @param res collection articles for given appId
     */
    getBlogs : function(req,res){

        var appId = req.param('appId');
        var searchQuery = {
            appId : appId
        };


        Blogs.find(searchQuery).sort({ updatedAt: 'DESC' }).exec(function(err,result) {
            if (err) {
                sails.log.error("Blog Collection find Error for given appId : "+appId);
                return done(err);
            }
            res.send(result);
        });
    },

    publishBlog : function(req,res){
        var randomstring = require("randomstring");
        var blog = req.body;
        var data = "";
        var fileDir = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + req.body.appId+ '/assets/images/blogs/';

        const dom = new JSDOM(blog.desc);
        for (var i = 0; i < dom.window.document.querySelectorAll('img').length; i++) {
            var imgeFileName = randomstring.generate()+ ".png";


            if (!dom.window.document.querySelectorAll('img')[i].getAttribute("src").match("http")) {
                data = dom.window.document.querySelectorAll('img')[i].getAttribute("src").replace(/^data:image\/\w+;base64,/, "");
                var buf = new Buffer(data, 'base64');

                fs.writeFile(config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' +
                    req.body.appId + '/assets/images/blogs/' + imgeFileName, buf, function (err) {
                    if (err) {
                        return res.send(err);
                    }
                });
                dom.window.document.querySelectorAll('img')[i].setAttribute("src",config.server.host
                    +"/templates/viewWebImages?userId="+req.userId+"&appId="+req.body.appId+"&1547029702693&images=blogs/"+imgeFileName);

            }
        }

        req.body.desc =dom.window.document.documentElement.outerHTML;
        console.log(fileDir);
        if(blog.isNewBlog == 'true'){
            req.file('file').upload({
                dirname: require('path').resolve(fileDir)
            },function (err, uploadedFiles) {
                if (err) return res.send(500, err);

                var newFileName=Date.now()+'.png';
                fs.rename(uploadedFiles[0].fd, fileDir+'/'+newFileName, function (err) {
                    if (err) return res.send(err);
                });
                var blog =req.body;
                blog.imageUrl = newFileName;
                Blogs.create(blog).exec(function(err, result) {
                    if (err) res.send(err);
                    res.send("ok");
                });
            });
        }else if(blog.isImageUpdate == 'false'){
            var updateQuery = { id : blog.id};
            var data = blog;
            Blogs.update(updateQuery,data).exec(function(err, result) {
                if (err) res.send(err);
                //sails.log.info(result);
                res.send("ok");
            });

        }else if(blog.isImageUpdate == 'true'){
            req.file('file').upload({
                dirname: require('path').resolve(fileDir)
            },function (err, uploadedFiles) {
                if (err) return res.send(500, err);

                var newFileName=Date.now()+'.png';
                fs.rename(uploadedFiles[0].fd, fileDir+'/'+newFileName, function (err) {
                    if (err) return res.send(err);
                });

                blog.imageUrl = newFileName;
                var updateQuery = { id : blog.id};
                var data = blog;
                Blogs.update(updateQuery,data).exec(function(err, result) {
                    if (err) res.send(err);
                    //sails.log.info(result);
                    res.send("ok");
                });
            });
        }
    },
    deleteBlog : function(req,res){

        var appId = req.body.appId;
        var imageUrl = req.body.imageUrl;
        var deleteQuery = {
             id : req.body.id
        }

        var filePath = config.APP_FILE_SERVER + req.userId + '/progressiveTemplates/' + appId+ '/assets/images/blogs/'+ imageUrl;

        Blogs.destroy(deleteQuery).exec(function (err) {
            if (err) return res.send(err);
            fs.unlink(filePath, function (err) {
                res.send(200,{message:'Deleted Blog'});
            });
        });
    }

}