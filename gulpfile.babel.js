import gulp, { task } from 'gulp'

//HTML:
import htmlmin from 'gulp-htmlmin'
import concat from 'gulp-concat'

//CSS:
import postcss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

//JavaScript:
import babel from 'gulp-babel'// Transpilar o código .js para versões anteriores ao ES6
import terser from 'gulp-terser'// Minificar o código .js

//Limpeza CSS
import clean from 'gulp-purgecss'

//Otimização de imagens:
import imgemin from 'gulp-imagemin'


//Constantes e variáveis
const cssPlugins = [
    cssnano(),
    autoprefixer()
 ]

 let formatos = ['src/img/**/*.png', 'src/img/**/*.jpg', 'src/img/**/*.ico','src/img/**/*.svg'];
 
gulp.task('htmlmin', () =>{
    return gulp
    //.src('./src/*.html')
    .src('./*.html')
    .pipe(htmlmin({
        collapseWhitespace:true,
        removeComments: true
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(gulp.dest('./build'))
 })

gulp.task('styles', () =>{
    return gulp
    .src('./src/css/*.css')
    .pipe(concat('styles.min.css'))
    .pipe(postcss(cssPlugins))
    .pipe(gulp.dest('./dist/css'))
 })

 gulp.task('babel', () =>{
    return gulp
    .src('./src/js/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(babel())
    .pipe(terser())
    .pipe(gulp.dest('./dist/js'))
    .pipe(gulp.dest('./build/js'))
})

 gulp.task('clean', () =>{
    return gulp
    .src('./dist/css/styles.min.css')
    .pipe(clean({
        content:['./dist/*.html']
    }))
    .pipe(gulp.dest('./build/css/'))
})

gulp.task('imgemin', () =>{
    return gulp
        //.src('./src/img/*')
        .src(formatos)
        .pipe(imgemin())
        .pipe(gulp.dest('./dist/img'))
        .pipe(gulp.dest('./build/img'))
})
 
 gulp.task('default', ()=>{
    //gulp.watch('./src/*.html', gulp.series('htmlmin'))
    gulp.watch('./*.html', gulp.series('htmlmin'))
    gulp.watch('./src/css/*.css', gulp.series('styles'))   
    gulp.watch('./src/js/*.js', gulp.series('babel'))
 })
 