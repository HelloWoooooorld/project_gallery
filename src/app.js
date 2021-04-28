import './js/imports';

const getImgUrl = 'https://boiling-refuge-66454.herokuapp.com/images';
const geImgIdUrl = 'https://boiling-refuge-66454.herokuapp.com/images/:imageId';
const addComment =
	'https://boiling-refuge-66454.herokuapp.com/images/:imageId/comments';
const popup = document.querySelector('.popup');

async function getData(url) {
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
	return data;
}

async function getImg() {
	await getData(getImgUrl).then((data) => {
		renderImg(data);
	});
}

function renderImg(data) {
	const container = document.querySelector('.block-img');
	const res = data.map((item) => {
		const img = document.createElement('img');
		const box = document.createElement('div');

		box.classList.add('box-item');
		img.setAttribute('src', item.url);
		img.setAttribute('id', item.id);

		box.append(img);
		container.append(box);
	});
	return res;
}

function show() {
	popup.style.display = 'flex';
}

function hide() {
	popup.style.display = 'none';
}

getImg();



document.querySelector('.block-img').addEventListener('click', (event) => {
  let target = event.target; // где был клик?

	if (target.tagName != 'IMG') return;
	show();
})
document.querySelector('.popup__btn--close').addEventListener('click', hide);
