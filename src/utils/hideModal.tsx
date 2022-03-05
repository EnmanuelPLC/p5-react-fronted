import sleep from './sleep';

const hideModal = async (m: string) => {
  let mod = document.getElementById(m);
  if (mod) {
    await sleep(100);
    mod.classList.remove('show');
    await sleep(250);
    mod.style.display = 'none';
    let body = document.querySelector('body');
    if (body && body.lastChild) {
      body.removeChild(body.lastChild);
      body.classList.remove('modal-open');
      body.style.overflow = '';
      body.style.paddingRight = '';
    }
  }
}

export default hideModal;