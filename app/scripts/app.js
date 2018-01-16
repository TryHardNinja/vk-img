import svg4everybody from 'svg4everybody';
import $ from 'jquery';
import flex from 'flexibility';
import Photo from '../blocks/b-photo/b-photo';

$(() => {
	svg4everybody();
	new Photo().init(); // сюда передать объект вида {img: [src, src, src]} Если нету, то используются шаблонные
});

