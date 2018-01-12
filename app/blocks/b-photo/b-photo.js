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

	let model = JsonSample;
	let counter = 0;
	let cacheHeight = img.height();
	let cacheWidth = img.width();

	function changeImage(action) {
		let src;
		if (action === 'prev') {
			if (counter === 0) counter = model.img.length;
			counter--;
		}
		else {
			if (counter === model.img.length - 1) counter = 0;
			counter++;
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

	prev.click(() => {
		changeImage('prev')
	});

	next.click(() => {
		changeImage('next')
	});

}
