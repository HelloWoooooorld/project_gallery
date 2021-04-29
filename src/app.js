import './js/imports';

const Gallery = (function () {
  const getImgUrl = 'https://boiling-refuge-66454.herokuapp.com/images';

  const popup = document.querySelector('.popup');

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
      console.log(response)
      this.hide();
    },

    getComment: function () {
      const imgId = document.querySelector('.popup__img').id;
      const name = document.getElementById('name').value;
      const comment = document.getElementById('comment').value;

      if (name && comment) {
        let data = {
          imgId,
          name,
          comment,
          date: parseInt((new Date().getTime() / 1000).toFixed(0)),
        };
        this.submitComment(data);
        this.removeErr();
        this.success();
      } else {
        this.showErr();
      }
    },

    init: function () {
      this.getImg();
    },

    show: function (id) {
      this.getImgFromId(id);
      document.querySelector('.container').classList.add('popup-fade')
    },

    hide: function () {
      popup.style.display = 'none';
      document.querySelector('.container').classList.remove('popup-fade')
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
      popup.insertAdjacentElement('afterbegin', popupImg);

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

    showErr: function () {
      document.getElementById('name').style.border = '1px solid red';
      document.getElementById('comment').style.border = '1px solid red';
      document.querySelector('.form__btn').style.background = 'red'
    },

    removeErr: function () {
      document.getElementById('name').style.border = 'none';
      document.getElementById('comment').style.border = 'none';
      document.querySelector('.form__btn').style.background = '#4997d0'
    },

    success: function () {
      document.getElementById('name').style.border = '1px solid #49d060';
      document.getElementById('comment').style.border = '1px solid #49d060';
      document.querySelector('.form__btn').style.background = '#49d060'
    }
  };
})();

Gallery.init();

document
  .querySelector('.block-img')
  .addEventListener('click', (event) => {
    let target = event.target; // где был клик?
    if (target.tagName != 'IMG') return;
    Gallery.show(target.id);
  });

document
  .querySelector('.popup__btn--close')
  .addEventListener('click', Gallery.hide);

document
  .querySelector('.form__btn')
  .addEventListener('click', (e) => {
    e.preventDefault();
    Gallery.getComment();
  });
