var gulp = require("gulp"),                     //引入基本项目gulp
    stylus = require("gulp-stylus"),            //引入stylus编译插件
	babel = require("gulp-babel"),				//es6转换
    browserSync = require("browser-sync"),      //引入实时更新浏览器插件
	rename = require("gulp-rename"),            //引入重命名插件
    path = {
        HTML : ["*.html","html/*.html"],                //指定HTML的地址
        STYLUS : "stylus/*.stylus",               //指定stylus的地址
        CSS : "css/*.css",                  //指定CSS的地址
        JS : "js/es6.js",                     //指定JS的地址
    };

gulp.task("stylus", function() {                  //新建名为stylus任务
    gulp.src(path.STYLUS)                         //获取stylus的文件地址
        .pipe(stylus())                           //执行stylus编译
        .pipe(gulp.dest('css'))             //编译完成存入src/css文件夹
        .pipe(browserSync.stream())             //实时监控文件改动
});

gulp.task("html", function() {                  //新建名为html的任务
    for(var i in path.HTML){
        gulp.src(path.HTML[i])                         //获html文件地址
            .pipe(browserSync.stream());            //实时监控文件改动
    }
});

gulp.task("js-watch", function() {              //新建名为html的任务
    gulp.src(path.JS)                           //获html文件地址
        .pipe(browserSync.stream());            //实时监控文件改动
});

gulp.task('js',function(){                      //新建名为js的任务
    gulp.src(path.JS)                           //操作js文件夹中所有的js文件
        .pipe(rename("main.js"))          		//执行重命名插件固定写法
		.pipe(babel({
            presets: ['es2015']
         }))
        .pipe(gulp.dest('js'))             		//把执行以上操作后的文件放到jsmin文件夹
        .pipe(browserSync.stream());          	//实时监控文件改动
});


gulp.task("serve", ["stylus", "js-watch", "html","js"], function() {
    browserSync.init({
        server : "./"
    });
    gulp.watch(path.STYLUS, ["stylus"]);
    gulp.watch(path.JS, ["js-watch"]);
    gulp.watch(path.JS, ["js"]);
    for(var i in path.HTML){
        gulp.watch(path.HTML[i], ["html"]);
    }
    
    gulp.watch(path.CSS).on("change", function() {
        browserSync.reload;
    });
    gulp.watch(path.JS).on("change", function() {
        browserSync.reload;
    });
    for(var i in path.HTML){
        gulp.watch(path.HTML[i]).on("change", function() {
            browserSync.reload;
        });
    }
});

gulp.task("default", ["serve","stylus","js-watch","js"]);    //终端命令gulp时，依次执行任务
