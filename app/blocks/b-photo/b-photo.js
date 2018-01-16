import $ from 'jquery';

// Пример url картинок из альбома
let jsonSample = {
	img: [
		'https://pp.userapi.com/c837324/v837324288/5a633/O7a67IPfTaQ.jpg',
		'https://pp.userapi.com/c622820/v622820690/447be/QOGhlND-888.jpg',
		'https://pp.userapi.com/c837229/v837229656/57d49/BMlTJWIvtls.jpg',
		'https://pp.userapi.com/c836533/v836533563/24ea0/yxr4oTHUKzM.jpg',
		'https://pp.userapi.com/c626625/v626625927/426f3/hG-OiLIiNw0.jpg',
		'https://pp.userapi.com/c636222/v636222456/1b43e/BMOkGp9NcHk.jpg',
		'https://pp.userapi.com/c631424/v631424456/20814/zNELjeAAJ4g.jpg',
		'http://img.playground.ru/images/4/7/yKp0f_H2dwI.jpg'
	]
};
const photoBlock = $('.b-photo');
const photoBlockContainer = $('.b-photo__container');
const prev = $('.b-photo__prev');
const next = $('.b-photo__next');
const img = $('.b-photo__image');
const imgWrap = $('.b-photo__image-wrapper');
const comments = $('.b-photo__comments-window');
const commentLike = $('.b-photo__comment-like');
const photoLike = $('.b-photo__like');
const messageBox = $('.b-photo__message');
const sidebar = $('.b-photo__sidebar');
const cancel = $('.b-photo__cancel');
const post = $('.b-photo__post');

let counter = 0;

let cacheHeight = img.height();
let cacheWidth = img.width();

export default class {
	constructor(data = jsonSample) {
		this._data = data;
		this.model = this._data;
	}

	getImageSrc(counter) {
		let delay = Math.floor(Math.random() * (100 - 10 + 1)) + 10;

		return new Promise((resolve, reject) => {
			setTimeout(() => { // имитация задержки ajax c сервера
				let src = this.model.img[counter];
				resolve(src);
			}, delay)
		});

	}

	likeComment() {
		const count = $('.b-photo__comment-like-count');
		if (count.html()) {
			count.html('');
			commentLike.removeClass('.b-photo__comment-like_liked');
		}
		else {
			count.html('1');
			commentLike.addClass('.b-photo__comment-like_liked');
		}
	}

	likePhoto() {
		let count = $('.b-photo__like-counter');
		if (count.html()) {
			count.html('');
			photoLike.removeClass('b-photo__like_liked');
		}
		else {
			count.html('1');
			photoLike.addClass('b-photo__like_liked');
		}
	}

	changeImage(action) {
		this.visionPostBox('close');
		if (action === 'prev') {
			if (counter === 0) counter = this.model.img.length - 1;
			else counter--;
		}
		else {
			if (counter === this.model.img.length - 1) counter = 0;
			else counter++;
		}

		this.getImageSrc(counter).then(src => {
			img.css('visibility', 'hidden');
			img.attr('src', src);
			img.load(() => {
				let height = img.height();
				let width = img.width();

				cacheHeight = (height > cacheHeight) ? cacheHeight = height : cacheHeight;
				cacheWidth = (width > cacheWidth) ? cacheWidth = width : cacheWidth;
				return src;
			});
		}).then(src => {
			let delay = Math.floor(Math.random() * (500 - 50 + 1)) + 50;

			setTimeout(() => { // имитация загрузки изображения
				img.css('visibility', 'visible');
				imgWrap.css('height', cacheHeight);
				imgWrap.css('width', cacheWidth);
				img.attr('src', src);
			}, delay);
		});
	}

	visionPostBox(action) {
		let postBox = $('.b-photo__post-box');

		const submitBox = $('.b-photo__submit');
		let open = () => {
			submitBox.css('display', 'flex');
			messageBox.css({
				'min-height': '72px',
				'padding-bottom': '16px'
			});
		};
		let close = () => {
			submitBox.css('display', 'none');
			messageBox.css({
				'min-height': 0,
				'padding-bottom': '10px'
			});
		};

		if (action === 'open') open();
		if (action === 'close') close();
		else {
			let target = action.toElement;
			let warningElems = postBox.find('*');
			let targetElems = $(target).find('*');

			if ([...targetElems].some( elem => ![...warningElems].includes(elem))) {
				close();
			}
		}
	}

	init() {

		if (navigator.appName == 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie == 1)) {
			$('html').addClass('ie');
		}

		$('.b-photo').click((e) => {
			this.visionPostBox(e);
		});

		messageBox.click(() => {
			this.visionPostBox('open');
		});

		post.click(e => {
			e.preventDefault();
		});

		cancel.click((e) => {
			e.preventDefault();
			this.visionPostBox('close')
		});

		prev.click(() => {
			this.changeImage('prev')
		});

		next.click(() => {
			this.changeImage('next')
		});

		commentLike.click(() => {
			this.likeComment();
		});

		photoLike.click(() => {
			this.likePhoto();
		})
	}
};



