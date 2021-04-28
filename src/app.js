import './js/imports';

const Gallery = (function () {
  const getImgUrl = 'https://boiling-refuge-66454.herokuapp.com/images';

  const popup = document.querySelector('.popup');
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value;

  return {
    getData: async function (url) {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    },

    getImgFromId: async function (id) {
      await this.getData(`${getImgUrl}/${id}`).then((data) => {
        this.renderComment(data);
        console.log(data);
      });
    },

    getImg: async function () {
      await this.getData(getImgUrl).then((data) => {
        this.renderImg(data);
      });
    },
    // *****************
    submitComment: async function (data) {
      let response = await fetch(`${getImgUrl}/${data.imgId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      this.hide();
    },

    getComment: function () {
      const imgId = document.querySelector('.popup__img').id;


      let data = {
        imgId,
        name,
        comment,
        date: parseInt((new Date().getTime() / 1000).toFixed(0)),
      };

      this.submitComment(data);
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
      const a = new Date(UNIX_timestamp);
      const year = a.getFullYear();
      const month = a.getMonth() + 1;
      const date = a.getDate();
      const time = `${date}.${month}.${year}`;
      return time;
    },
  };
})();

Gallery.init();


document
  .querySelector('.popup__btn--close')
  .addEventListener('click', Gallery.hide);

document
  .querySelector('.form__btn')
  .addEventListener('click', (e) => {
    e.preventDefault();
    Gallery.getComment();
  });
