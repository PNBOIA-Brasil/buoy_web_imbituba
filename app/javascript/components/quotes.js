import Typed from 'typed.js';

const initQuotes = () => {
  new Typed('#banner-typed-text', {
    strings: ["NORONHA"],
    typeSpeed: 200,
    loop: true
  });
}

export { initQuotes };
