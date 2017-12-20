import Notify from '../../actions/Notify';

Notify.success = jest.spyOn(Notify, 'success');
Notify.error = jest.spyOn(Notify, 'error');

export default Notify;
