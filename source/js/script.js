import {mySwiper, setSliderLinksHandlers} from "./components/slider";
import {tabletSwiper} from "./components/services-slider";
import {setHandlers} from "./components/services";
import {setPopupHandlers} from "./components/login-popup";
import {setLoginFormHandlers} from "./components/login-form";
import {setHeaderLinksHandlers} from "./components/header-links";
import smoothscroll from 'smoothscroll-polyfill';

setHandlers();
setPopupHandlers();
setLoginFormHandlers();
setSliderLinksHandlers();
setHeaderLinksHandlers();
smoothscroll.polyfill();
