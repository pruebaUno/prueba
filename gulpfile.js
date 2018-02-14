//llamamos el uso estricto de javascript
'use strict';


//INYECTAR 3 DEPENDENCIAS: utilizamos constantes Y palabra reservada require
const gulp = require('gulp'),
      connect = require('gulp-connect'),
      nodemon = require('gulp-nodemon');
      
      
// CREAR UNA TAREA. El nombre es indiferente
gulp.task('conexion', () => {
    connect.server({
        root: 'public',
        port: 8000,
        //bota el servidor y lo vuelve  subir en cada cambio
        livereload: true
    })
});

//EXPORTACION DE DEPENDENCIAS
gulp.task('dependencias', () => {
    gulp.src([
        './node_modules/angular/angular.min.js',
        './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
        './node_modules/jquery/dist/jquery.min.js'
    ])
    //para que lo guarde en otra carpeta que crea automaticamente
    .pipe(gulp.dest('./public/lib'));

    gulp.src([
        './node_modules/bootstrap/dist/css/bootstrap.min.css',
        './node_modules/bootstrap/dist/js/bootstrap.min.js'
    ])

    .pipe(gulp.dest('./public/lib/bootstrap'));
});

    
 //REload , recarga cada uno
// levanta html
gulp.task('vistas', () => {
    gulp.src('./public/componentes/**/*.html')
    .pipe(connect.reload());
});

//levanta css
gulp.task('estilos', () => {
    gulp.src('./public/componentes/**/*.css')
    .pipe(connect.reload());
});
//levanta javascript
gulp.task('js', () => {
    gulp.src('./public/componentes/**/*.js')
    .pipe(connect.reload());
});
//vigila y lo manda al reload
gulp.task('vigia', () => {
    gulp.watch([
        'public/*.css',
        'public/**/*.css',
        'public/**/**/*.css'

    ],['estilos']);

    gulp.watch([
        'public/*.html',
        'public/**/*.html',
        'public/**/**/*.html'

    ],['vistas']);

    gulp.watch([
        'public/*.js',
        'public/**/*.js',
        'public/**/**/*.js'

    ],['js']);
});
//palabra reservada *default* levanta todas las tareas
gulp.task('default', ['conexion', 'dependencias', 'estilos', 'vigia', 'vistas', 'js']);