import $ from 'jquery';

let JsonSample = {
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

export default function () {
	const prev = $('.b-photo__prev');
	const next = $('.b-photo__next');
	const img = $('.b-photo__image');
	const imgWrap = $('.b-photo__image-wrapper');
	const comments = $('.b-photo__comments-window');
	const commentLike = $('.b-photo__comment-like');
	const photoLike = $('.b-photo__like');
	const messageBox = $('.b-photo__message');
	const cancel = $('.b-photo__cancel');


	let model = JsonSample;
	let counter = 0;
	let cacheHeight = img.height();
	let cacheWidth = img.width();

	function likeComment() {
		const count = $('.b-photo__comment-like-count');
		if (count.html()) {
			count.html('');
			commentLike.css('opacity', 0.5);
		}
		else {
			count.html('1');
			commentLike.css('opacity', 1);
		}
	}

	function likePhoto() {
		let count = $('.b-photo__like-counter');
		console.log(count);
		if (count.html()) {
			count.html('');
			photoLike.css('opacity', 0.5);
		}
		else {
			count.html('1');
			photoLike.css('opacity', 1);
		}
	}


	function changeImage(action) {
		let src;
		if (action === 'prev') {
			if (counter === 0) counter = model.img.length - 1;
			else counter--;
		}
		else {
			if (counter === model.img.length - 1) counter = 0;
			else counter++;
		}
		const waitImgSize = new Promise( resolve => {
			src = model.img[counter];
			img.attr('src', src);
			img.load(() => {
				let height = img.height();
				let width = img.width();

				cacheHeight = (height > cacheHeight) ? cacheHeight = height : cacheHeight;
				cacheWidth = (width > cacheWidth) ? cacheWidth = width : cacheWidth;

				resolve([height, width]);
			});
		});
		waitImgSize.then((size) => {
			console.log(size);

			imgWrap.css('height', cacheHeight);
			imgWrap.css('width', cacheWidth);

			src = model.img[counter];
			img.attr('src', src);
		}, () => {
			console.log('error');
		});
	}

	function visionPostBox(action) {
		const submitBox = $('.b-photo__submit');
		if (action === 'open') {
			submitBox.css('display', 'flex');
			messageBox.css({
				'min-height': '72px',
				'padding-bottom': '16px'
			});
		} else {
			submitBox.css('display', 'none');
			messageBox.css({
				'min-height': 0,
				'padding-bottom': '10px'
			});
		}
	}

	messageBox.click(() => {
		visionPostBox('open');
	});

	cancel.click((e) => {
		e.preventDefault();
		visionPostBox('close')
	});

	prev.click(() => {
		changeImage('prev')
	});

	next.click(() => {
		changeImage('next')
	});

	commentLike.click(() => {
		likeComment();
	});

	photoLike.click(() => {
		likePhoto();
	})

}
