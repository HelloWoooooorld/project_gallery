import './js/imports';

const Gallery = (function () {
	const getImgUrl = 'https://boiling-refuge-66454.herokuapp.com/images';
	const geImgIdUrl = 'https://boiling-refuge-66454.herokuapp.com/images/';
	const addComment =
		'https://boiling-refuge-66454.herokuapp.com/images/:imageId/comments';
	const popup = document.querySelector('.popup');

	return {

    getData: async function (url) {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      return data;
    },

    getImgFromId: async function (id) {
      await this.getData(`${geImgIdUrl}${id}`).then((data) => {
        this.renderComment(data);
      });
    },

    getImg: async function () {
      await this.getData(getImgUrl).then((data) => {
        this.renderImg(data);
      });
    },

		init: function () {
			this.getImg();
		},

		show: function (id) {
			this.getImgFromId(id);
		},

		hide: function () {
			popup.style.display = 'none';
      document.querySelector('.popup__img').remove();
			document.querySelector('.comment__item').remove();
		},

		renderComment: function (item) {
			popup.style.display = 'flex';
			const popupForm = document.querySelector('.popup__form');
			const popupComment = document.querySelector('.popup__comment');
			const popupImg = document.createElement('img');

			popupImg.classList.add('popup__img');
			popupImg.setAttribute('src', item.url);
			popupImg.setAttribute('id', item.id);
			popupForm.insertAdjacentElement('afterbegin', popupImg);

			item.comments.map((com) => {
				const commentItem = document.createElement('div');
				const commentTime = document.createElement('span');
				const commentUser = document.createElement('span');

				commentItem.classList.add('comment__item');
				commentTime.classList.add('comment__item-time');
				commentUser.classList.add('comment__item-comment');

				commentItem.setAttribute('id', com.id);
				commentTime.textContent = this.showCurrentTime(com.date);
				commentUser.textContent = com.text;

				commentItem.append(commentTime);
				commentItem.append(commentUser);
				popupComment.append(commentItem);
			});
		},

		renderImg: function (data) {
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
		},

		showCurrentTime: function (UNIX_timestamp) {
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
		},
	};
})();

Gallery.init();


document.querySelector('.block-img').addEventListener('click', (event) => {
	let target = event.target; // где был клик?
	if (target.tagName != 'IMG') return;
	Gallery.show(target.id);
});

document.querySelector('.popup__btn--close').addEventListener('click', Gallery.hide);
