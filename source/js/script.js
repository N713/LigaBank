import {setSliderLinksHandlers} from "./components/sliders/slider";
import {tabletSwiper} from "./components/sliders/services-slider";
import {setHandlers} from "./components/sliders/services";
import {setPopupHandlers} from "./components/login/login-popup";
import {setLoginFormHandlers} from "./components/login/login-form";
import {setHeaderLinksHandlers} from "./components/header-links";

import {setSelectHandler, setFormHandlers} from "./components/form";
import {makeOffer} from "./components/form-second-step";

import smoothscroll from 'smoothscroll-polyfill';

setPopupHandlers();
setLoginFormHandlers();
setSliderLinksHandlers();
setHeaderLinksHandlers();

setSelectHandler();
setFormHandlers();

makeOffer();

smoothscroll.polyfill();
