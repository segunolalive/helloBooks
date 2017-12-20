import notify from '../../actions/notify';

notify.success = jest.spyOn(notify, 'success');
notify.error = jest.spyOn(notify, 'error');

export default notify;
