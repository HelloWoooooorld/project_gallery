import './js/imports';

const getImgUrl = 'https://boiling-refuge-66454.herokuapp.com/images';
const geImgIdUrl = 'https://boiling-refuge-66454.herokuapp.com/images/';
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

async function getImgFromId(id) {
	await getData(`${geImgIdUrl}${id}`).then((data) => {
	renderComment(data)
	});
}

function renderComment(item) {
	popup.style.display = 'flex';
	const popupForm = document.querySelector('.popup__form');
	const popupComment = document.querySelector('.popup__comment');
	const popupImg = document.createElement('img');
	popupImg.classList.add('popup__img');
	popupImg.setAttribute('src', item.url);
	popupImg.setAttribute('id', item.id);
	popupForm.insertAdjacentElement('afterbegin',popupImg);

	item.comments.map((com) => {
		const commentItem = document.createElement('div');
		const commentTime = document.createElement('span');
		const commentUser = document.createElement('span');

		commentItem.classList.add('comment__item');
		commentTime.classList.add('comment__item-time');
		commentUser.classList.add('comment__item-comment');

		commentItem.setAttribute('id', com.id);
		commentTime.textContent = showCurrentTime(com.date);
		commentUser.textContent = com.text;

		commentItem.append(commentTime);
		commentItem.append(commentUser);
		popupComment.append(commentItem);
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

function show(id) {
	getImgFromId(id);
}

function hide() {
	popup.style.display = 'none';
}

function showCurrentTime(UNIX_timestamp) {
	let timestamp = new Date(UNIX_timestamp * 1000);
	let months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	let dayName = [
		'Monday',
		'Thusday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];
	let year = timestamp.getFullYear();
	let month = months[timestamp.getMonth()];
	let date = timestamp.getDate();
	let day = dayName[timestamp.getDay()];
	let hour = timestamp.getHours();
	let min = timestamp.getMinutes();
	let time = `${hour}:${min}, ${day}, ${date} ${month} ${year}`;

	return time;
}

// call events

document.querySelector('.block-img').addEventListener('click', (event) => {
	let target = event.target; // где был клик?

	if (target.tagName != 'IMG') return;
	show(target.id);
});
document.querySelector('.popup__btn--close').addEventListener('click', hide);
getImg();
