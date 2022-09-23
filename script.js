/* ACCORDEON */

const accordeonItems = document.querySelectorAll('.education__accordeon-item');
const accordeonTriggers = document.querySelectorAll('.education__accordeon-trigger');

accordeonTriggers.forEach(item => {
  item.addEventListener('click', (e) => {
    const parent = item.parentNode;
    if (parent.classList.contains('education__accordeon-item--active')) {
      parent.classList.remove('education__accordeon-item--active');
    } else {
      accordeonItems.forEach(child => {
        child.classList.remove('education__accordeon-item--active');
      });
      parent.classList.add('education__accordeon-item--active');
    }
  });
});

/* TABS */

const tabsBtn = document.querySelectorAll('.education__accordeon-content');
const educationCover = document.querySelector('.education__places-cover');
const educationWebCover = document.querySelector('.education__places-webdev--cover');
const educationItems = document.querySelectorAll('[data-education]');
const educationContentItems = Array.from(document.querySelectorAll('.education__accordeon-content')).slice(1);
const educationContentWeb = document.querySelectorAll('.education__places-webdev-item');

accordeonTriggers.forEach((item, index) => {
  item.addEventListener('click', (e) => {
    if(e.target.parentNode.classList.contains('education__accordeon-item--active') && index == educationItems[index].dataset.education) {
      educationCover.classList.add('hid');
      educationCover.classList.remove('show');
      educationWebCover.classList.add('hid');
      educationWebCover.classList.remove('show');
      educationItems[index].classList.add('hid');
      educationItems[index].classList.remove('show');
      educationWebCover.style.display = 'block';
      educationItems[index].style.display = 'flex'; 
      setTimeout(() => {
        educationCover.style.display = 'none';
        educationWebCover.classList.remove('hid');
        educationWebCover.classList.add('show');
        educationItems[index].classList.remove('hid');
        educationItems[index].classList.add('show');
      }, 300);
      if (educationItems[index].nextElementSibling) {
        educationItems[index].nextElementSibling.style.display = 'none';
      } else {
        educationItems[index].previousElementSibling.style.display = 'none';
      }
      educationContentItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
          educationWebCover.style.display = 'none';
          item.classList.remove('activity');
          if (e.target && educationContentWeb[index].dataset.web == index) {
            educationContentItems.forEach(list => {
              list.classList.remove('activity');
              if (list == e.target) {
                e.target.classList.add('activity');
              }
            });
            if (item.classList.contains('activity')) {
              educationContentWeb.forEach(item => {
                item.classList.remove('activity');
                item.classList.add('hidden');
              });
              educationContentWeb[index].classList.add('activity');
              educationContentWeb[index].classList.remove('hidden');
                educationContentWeb.forEach(item => {
                  if (!item.classList.contains('active')) {
                    item.style.display = 'none';
                  }
                });
            } else {
              educationContentWeb[index].classList.add('hidden');
              educationContentWeb[index].classList.remove('activity');
            }
          } 
        });
      });
    } else {
      educationCover.style.display = 'block';
      setTimeout(() => {
        educationCover.classList.add('show');
        educationCover.classList.remove('hid');
        educationCover.style.display = 'block';
        educationWebCover.style.display = 'none';
      educationItems[index].style.display = 'none';
      }, 300);
      educationWebCover.classList.remove('show');
      educationWebCover.classList.add('hid');
      educationItems[index].classList.remove('show');
      educationItems[index].classList.add('hid');
    }
  });
});

accordeonTriggers.forEach(item => {
  item.addEventListener('click', () => {
    educationContentItems.forEach(cont => {
      cont.classList.remove('activity');
    });
    educationContentWeb.forEach(cont => {
      cont.classList.remove('activity');
    });
  });
});

/* BURGER */

const disableScrolling = () => {
  const x = window.scrollX;
  const y = window.scrollY;
  window.onscroll = function () {
      window.scrollTo(x, y) ;
  };
};

  const header = document.querySelector('.header'); //сделать делегирование и закрытие меню по клику на ссылки
  const burgerBtn = header.querySelector('.burger__button');
  const headerMenu = header.querySelector('.header__menu');
  const linksHeader = header.querySelectorAll('.header__menu-item > a');

  seamless.polyfill();
  const burgerMenuOpen = () => {
    headerMenu.classList.toggle('active');
    burgerBtn.classList.toggle('active');
    disableScrolling();
    if (!burgerBtn.classList.contains('active')) {
      window.onscroll = function () {};
    }
  };

  const burgerMenuClose = (menu, btn) => {
    window.onscroll = function () {};
    menu.classList.remove('active');
    btn.classList.remove('active');
  };

  linksHeader.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      let idAnchor = item.getAttribute('href').substring(1);
      const section = document.getElementById(idAnchor);
      if(section) {
        section.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });
      } else {
        seamless.elementScrollIntoView(document.querySelector('#hobbie'), {
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
      });
      }
      burgerMenuClose(headerMenu, burgerBtn);
    });
  });
  burgerBtn.addEventListener('click', burgerMenuOpen);

