import { memo } from 'react';
import dayjs from 'dayjs';

import './Footer.css';

const Footer = memo(() => {
  return (
    <footer className="footer">
      <h3 className="footer__title">Pet project</h3>
      <section className="footer__author">
        <div className="footer__links">
          <a
            href="https://t.me/aziz_jp"
            target="_blank"
            className="footer__text text-hover"
          >
            Джумаев Азиз
          </a>
          <a
            href="https://github.com/AzizJP"
            target="_blank"
            className="footer__text text-hover"
          >
            Github
          </a>
        </div>
        <span className="footer__copyright">
          &copy;{dayjs().year()}
        </span>
      </section>
    </footer>
  );
});

export default Footer;
