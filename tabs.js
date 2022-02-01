export function tabs() {
  const toggle = document.querySelectorAll('.toggle');
  const tabsArr = document.querySelectorAll('.info');

  toggle.forEach((item, index) => {
      item.addEventListener('click', () => {
        clearActive();
        item.classList.toggle('active');
        updateView();
      });
      function clearActive() {
        toggle.forEach((item, index) => {
          item.classList.remove('active');
          tabsArr[index].classList.remove('active-page');
        });
      }
      function updateView() {
        tabsArr[index].classList.toggle('active-page');
      }
    })
}
