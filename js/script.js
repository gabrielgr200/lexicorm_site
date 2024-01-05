const allIndicator = document.querySelectorAll('.indicator li');
const allAbout = document.querySelectorAll('.about li');

allIndicator.forEach(item=> {
  item.addEventListener('click', function () {
    const about = document.querySelector(this.dataset.target);

    allIndicator.forEach(i=> {
      i.classList.remove('active');
    })

    allAbout.forEach(i=> {
      i.classList.remove('active');
    })

    about.classList.add('active');
    this.classList.add('active');
  })
})