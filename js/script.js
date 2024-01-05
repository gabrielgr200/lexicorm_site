const allIndicator = document.querySelectorAll('.indicator li');
const allExplains = document.querySelectorAll('.explains li');

allIndicator.forEach(item=> {
  item.addEventListener('click', function () {
    const explains = document.querySelector(this.dataset.target);

    allIndicator.forEach(i=> {
      i.classList.remove('active');
    })

    allExplains.forEach(i=> {
      i.classList.remove('active');
    })

    explains.classList.add('active');
    this.classList.add('active');
  })
})