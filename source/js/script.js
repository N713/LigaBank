import {setSliderLinksHandlers} from "./components/slider";
import {tabletSwiper, setTabsHandlers} from "./components/services-slider";
import {setPopupHandlers} from "./components/login-popup";
import {setLoginFormHandlers} from "./components/login-form";
import {setHeaderLinksHandlers} from "./components/header-links";
import {setSelectHandler, setFormHandlers} from "./components/form";
import {makeOffer} from "./components/form-second-step";
import {setBurgerHandler} from "./components/burger";
import smoothscroll from 'smoothscroll-polyfill';

import {addAllMarkers, initialCheck, addListeners} from "./components/map";

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position){
    position = position || 0;
    return this.substr(position, searchString.length) === searchString;
  };
}

smoothscroll.polyfill();
setTabsHandlers();
setPopupHandlers();
setLoginFormHandlers();
setSliderLinksHandlers();
setHeaderLinksHandlers();
setSelectHandler();
setFormHandlers();
makeOffer();
setBurgerHandler();
