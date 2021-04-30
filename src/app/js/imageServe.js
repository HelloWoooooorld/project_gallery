import { renderImg } from './render';

export const getData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export const getImg = async (getImgUrl) => {
    await getData(getImgUrl).then((data) => {
        renderImg(data);
    });
}
