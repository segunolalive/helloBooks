import notify from '../../actions/notify';

jest.unmock('../../actions/notify');
notify.success = jest.fn();
notify.error = jest.fn();

export default notify;
