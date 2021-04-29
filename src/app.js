import './js/imports';
import {renderComment, renderImg, showErr, removeErr, success} from './js/render'


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
        renderComment(data, this.showCurrentTime);
      });
    },

    getImg: async function () {
      await this.getData(getImgUrl).then((data) => {
        renderImg(data);
      });
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
        removeErr();
        success();
      } else {
        showErr();
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
  .querySelector('.block-img')
  .addEventListener('click', (event) => {
    let target = event.target; 
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
