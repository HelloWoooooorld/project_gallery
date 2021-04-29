const popup = document.querySelector('.popup');

export const renderComment = (item, fn) => {
    popup.style.display = 'flex';

    const popupComment = document.querySelector('.popup__comment');
    const popupImg = document.createElement('img');
    const commentItem = document.createElement('div');
    const commentTime = document.createElement('span');
    const commentUser = document.createElement('span');

    popupImg.classList.add('popup__img');
    popupImg.setAttribute('src', item.url);
    popupImg.setAttribute('id', item.id);
    popup.insertAdjacentElement('afterbegin', popupImg);

    commentItem.classList.add('comment__item');
    commentTime.classList.add('comment__item-time');
    commentUser.classList.add('comment__item-comment');

    if (item.comments.length) {
        item.comments.map((com) => {
            commentItem.setAttribute('id', com.id);
            commentTime.textContent = fn(com.date);
            commentUser.textContent = com.text;
        });
    } else {
        commentTime.textContent = `Alert message`;
        commentUser.textContent = `No comment yet`;
    }

    commentItem.append(commentTime);
    commentItem.append(commentUser);
    popupComment.append(commentItem);
}


export const renderImg = (data) => {
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


export const showErr = () => {
    document.getElementById('name').style.border = '1px solid red';
    document.getElementById('comment').style.border = '1px solid red';
    document.querySelector('.form__btn').style.background = 'red';
}

export const removeErr = () => {
    document.getElementById('name').style.border = 'none';
    document.getElementById('comment').style.border = 'none';
    document.querySelector('.form__btn').style.background = '#4997d0';
}

export const success = () => {
    document.getElementById('name').style.border = '1px solid #49d060';
    document.getElementById('comment').style.border = '1px solid #49d060';
    document.querySelector('.form__btn').style.background = '#49d060';
}
