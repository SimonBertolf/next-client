import { container, cid } from 'inversify-props';
import { IAuth } from '@/services';

const auth: IAuth = container.get<IAuth>(cid.IAuth);

test('should do something', () => {
  expect<IAuth>(auth).toBeDefined();
});
