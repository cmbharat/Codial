const gulp = require("gulp");
//library to convert sass to css
const sass = require("gulp-sass")(require("node-sass"));
//library to compress the css files
const cssnano = require("gulp-cssnano");
//library to rename the files with hash along with them
const rev = require("gulp-rev");

const uglify = require("gulp-uglify-es").default;
const imagemin = require("gulp-imagemin");
const del = require("del");

gulp.task("css", function (done) {
  console.log("minifying css");
  gulp
    .src("./static/scss/**/*.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("./static/css"));

  return gulp
    .src("./static/**/*.css")
    .pipe(rev())
    .pipe(gulp.dest("./public/static"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/static"));
  done();
});

gulp.task("js", function (done) {
  console.log("minifying js...");
  gulp
    .src("./static/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest("./public/static"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/static"));
  done();
});

gulp.task("images", function (done) {
  console.log("compressing images...");
  gulp
    .src("./static/**/*.+(png|jpg|gif|svg|jpeg)")
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest("./public/static"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/static"));
  done();
});

// empty the public/assets directory
gulp.task("clean:assets", function (done) {
  del.sync([`./public/static`], { force: true });
  done();
});

gulp.task(
  "build",
  gulp.series("clean:assets", "css", "js", "images"),
  function (done) {
    console.log("Building assets");
    done();
  }
);
