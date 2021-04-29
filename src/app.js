import './js/imports';
import { renderComment, showErr, removeErr, success } from './js/render';
import { getData, getImg } from './js/imageServe';

const Gallery = (function () {
  const getImgUrl = 'https://boiling-refuge-66454.herokuapp.com/images';
  const popup = document.querySelector('.popup');
  const name = document.getElementById('name');
  const comment = document.getElementById('comment');

  return {
    init: function () {
      getImg(getImgUrl);
    },

    getImgFromId: async function (id) {
      await getData(`${getImgUrl}/${id}`).then((data) => {
        renderComment(data, this.showCurrentTime);
      });
    },

    getComment: function () {
      const imgId = document.querySelector('.popup__img').id;

      if (name && comment) {
        let data = {
          imgId,
          name: name.value,
          comment: comment.value,
          date: parseInt((new Date().getTime() / 1000).toFixed(0)),
        };
        this.submitComment(data);
        removeErr();
        success();
        name.value = ""
        comment.value = ""
      } else {
        showErr();
      }
    },

    submitComment: async function (data) {
      let response = await fetch(`${getImgUrl}/${data.imgId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      console.log(response)
      removeErr();
      this.hide();
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

document.querySelector('.block-img').addEventListener('click', (event) => {
  let target = event.target;
  if (target.tagName != 'IMG') return;
  Gallery.show(target.id);
});

document.querySelector('.popup__btn--close').addEventListener('click', Gallery.hide);

document.querySelector('.form__btn').addEventListener('click', (e) => {
  e.preventDefault();
  Gallery.getComment();
});
