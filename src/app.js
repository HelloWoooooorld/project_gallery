import './js/imports';

const getImgUrl = 'https://boiling-refuge-66454.herokuapp.com/images';
const geImgIdUrl = 'https://boiling-refuge-66454.herokuapp.com/images/:imageId';
const addComment = 'https://boiling-refuge-66454.herokuapp.com/images/:imageId/comments';

async function getData(url) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}


async function getImg() {
    await getData(getImgUrl).then((data) => {
      renderImg(data.people)
    })
  }


  function renderImg(data) {
    const list = document.querySelector('.list-group')
    list.innerHTML = ''
    
    const total = (document.getElementById(
      'total'
    ).textContent = `Total people in ISS: ${data.length}`)
    const res = data.map((item) => {
      const listItem = document.createElement('li')
      listItem.classList.add('list-group-item')
      listItem.innerHTML = item.name
      list.append(listItem)
    })
  }