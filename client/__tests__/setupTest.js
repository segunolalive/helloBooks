import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import $ from 'jquery';

global.$ = $;
$.prototype.sideNav = () => { };
$.prototype.material_select = () => { };
$.prototype.modal = () => { };
$.prototype.ready = fn => fn();

global.Materialize = {
  toast: () => {}
};

global.CLOUDINARY_IMG_URL_STUB = 'cloudinary-stub';

configure({ adapter: new Adapter() });
