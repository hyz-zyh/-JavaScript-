const gulp = require('gulp');
const exec = require('child_process').exec;
const argv = require('minimist')(process.argv.slice(2));


//status
gulp.task('status', function (cb) {
   exec('git status', function (err, stdout, stderr) {
       console.log('以下文件发生改变：\n'+stdout);
       console.error(stderr);
       cb(err);
   }) ;
});

// add   等同于执行 git add * 命令(具体可以自己配置,如 add -A或者add .)
gulp.task('add', function (cb) {
    exec('git add *', function (err, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);
        cb(err);
    });
});

// commit   附加自定义commit的push操作
gulp.task('commit', function (cb) {
    console.log(argv.a);
    if (!argv.a) {
        commitcon = "update";
    } else {
        var commitcon = argv.a
    }
    exec('git commit -m ' + '"' + commitcon + '"', function (err, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);
        cb(err);
    });
});

// push  执行git push 操作
gulp.task('push', function (cb) {
    exec('git push', function (err, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);
        cb(err);
    });
});

// pull  执行git pull 操作
gulp.task('pull', function (cb) {
    exec('git pull', function (err, stdout, stderr) {
        console.log(stdout);
        console.error(stderr);
        cb(err);
    });
});


//**********************具体使用命令*****************************

//  默认  gulp 命令推送到仓库  (如需自定义 commit  执行  gulp -a 自定义commit)
gulp.task('default', gulp.series('status', 'add', 'commit', 'pull', 'push'));

//    gulp b 命令执行build打包，并且推送到仓库 (如需自定义 commit  执行  gulp b -a 自定义commit)
gulp.task('b', gulp.series('status', 'add', 'commit'));