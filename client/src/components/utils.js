import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as ReactScroll from 'react-scroll';

const IS_DEVELOPMENT_MODE = process.env.NODE_ENV === 'development';

export const API_BASE_URL = IS_DEVELOPMENT_MODE ? 'http://localhost:5000/api/' : 'http://localhost:5000/api';

export const ReactSwal = withReactContent(Swal);
export const animateScroll = ReactScroll.animateScroll;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  validateStatus: (status) => {
    return status >= 200 && status < 500;
  },
});

export const ReactSwalFire = (configs, customClass = {}) => {
    return ReactSwal.fire({
        customClass: {
            container: 'swal-modal-container',
            ...customClass,
        },
        ...configs,
    })
};

export const showLoading = (title = 'Please wait...') => {
  ReactSwalFire({
      title: title,
      allowOutsideClick: false,
      allowEnterKey: false,
      allowEscapeKey: false,
      didOpen: () => {
          ReactSwal.showLoading();
      }
  });
};

export const showError = (title, body) => {
  ReactSwalFire({
      title: title,
      html: body,
      icon: 'error',
      confirmButtonText: 'Retry',
  });
};

export const showSuccess = (title, body = '', timeout = 2000) => {
  ReactSwalFire({
      title: title,
      html: body,
      icon: 'success',
      timer: timeout,
  });
};

export const showInfo = (title, body = '', timeout = 5000) => {
  ReactSwalFire({
      title: title,
      html: body,
      icon: 'info',
      timer: timeout,
  });
};

export const showNetworkError = () => {
  ReactSwalFire({
      title: 'Oops!',
      text: 'A network error occured, please try again.',
      icon: 'error',
      confirmButtonText: 'Okay'
  });
};

export const generateErrorsMarkup = (error_messages) => {
  let error_html = error_messages.map((message) => `<li>${message}</li>`);
  error_html = '<ul style="text-align: left">' + error_html + '</ul>';

  return error_html;
};

export const scrollToTop = () => {
  animateScroll.scrollToTop({
      duration: 700,
      delay: 0,
      smooth: true,
  });
};

export const scrollToSection = (section) => {
  ReactScroll.scroller.scrollTo(section, {
    duration: 700,
    delay: 0,
    smooth: true,
    offset: -100,
  })
};