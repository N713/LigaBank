import {setSliderLinksHandlers} from "./components/slider";
import {tabletSwiper} from "./components/services-slider";
import {setHandlers} from "./components/services";
import {setPopupHandlers} from "./components/login-popup";
import {setLoginFormHandlers} from "./components/login-form";
import {setHeaderLinksHandlers} from "./components/header-links";
import {setMarkers} from "./components/map";
import {setSelectHandler, setFormHandlers} from "./components/form";
import {makeOffer} from "./components/form-second-step";

import smoothscroll from 'smoothscroll-polyfill';

setPopupHandlers();
setLoginFormHandlers();
setSliderLinksHandlers();
setHeaderLinksHandlers();

setSelectHandler();
setFormHandlers();
setHandlers();
makeOffer();

smoothscroll.polyfill();
