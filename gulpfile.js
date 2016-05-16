var gulp = require("gulp"),                     //引入基本项目gulp
    less = require("gulp-less"),                //引入less编译插件
    concat = require("gulp-concat"),            //引入合并插件
    mincss = require("gulp-clean-css"),         //引入css压缩插件
    rename = require("gulp-rename"),            //引入重命名插件
    minjs = require("gulp-uglify"),             //引入JS压缩插件
    browserSync = require("browser-sync"),      //引入实时更新浏览器插件
    path = {
        HTML : "src/**/index.html",             //指定HTML的地址
        LESS : "src/less/*.less",               //指定LESS的地址
        CSS : "src/css/*.css",                  //指定CSS的地址
        JS : "src/js/*.js"                      //指定JS的地址
    };

gulp.task("less", function() {                  //新建名为less任务
    gulp.src(path.LESS)                         //获取less的文件地址
        .pipe(less())                           //执行less编译
        .pipe(gulp.dest('src/css'))             //编译完成存入src/css文件夹
        .pipe(browserSync.stream())             //实时监控文件改动
        .pipe(concat('all.css'))                //合并css文件，取名all
        .pipe(rename({suffix:'.min'}))          //改名后缀名
        .pipe(mincss())                         //执行压缩文件
        .pipe(gulp.dest('build/css'));          //压缩后保存在cssmin文件夹内
});

gulp.task("html", function() {                  //新建名为html的任务
    gulp.src(path.HTML)                         //获html文件地址
        .pipe(browserSync.stream());            //实时监控文件改动
});

gulp.task("js-watch", function() {              //新建名为html的任务
    gulp.src(path.JS)                           //获html文件地址
        .pipe(browserSync.stream());            //实时监控文件改动
});

gulp.task('js',function(){                      //新建名为js的任务
    gulp.src(path.JS)                           //操作js文件夹中所有的js文件
        .pipe(concat('max.js'))                 //执行合并插件并给合并完成文件起一个名字
        .pipe(minjs())                          //执行压缩文件
        .pipe(rename({suffix:'.min'}))          //执行重命名插件固定写法
        .pipe(gulp.dest('build/js'))            //把执行以上操作后的文件放到jsmin文件夹
        .pipe(browserSync.stream());          	//实时监控文件改动
});

gulp.task("serve", ["less", "js-watch", "html"], function() {
    browserSync.init({
        server : "./src"
    });
    gulp.watch(path.LESS, ["less"]);
    gulp.watch(path.JS, ["js-watch"]);
    gulp.watch(path.JS, ["js"]);
    gulp.watch(path.HTML, ["html"]);
    gulp.watch(path.CSS).on("change", function() {
        browserSync.reload;
    });
    gulp.watch(path.JS).on("change", function() {
        browserSync.reload;
    });
    gulp.watch(path.HTML).on("change", function() {
        browserSync.reload;
    });
});

gulp.task("default", ["serve","less","js-watch","js"]);    //终端命令gulp时，依次执行任务
