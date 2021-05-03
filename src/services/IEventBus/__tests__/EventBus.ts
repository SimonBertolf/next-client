import { container, cid } from 'inversify-props';
import { IEventBus } from '@/services';

const eventBus = container.get<IEventBus>(cid.IEventBus);

test('should handle events', () => {
  let loading = false;
  eventBus.$on('custom-event-load', () => {
    loading = true;
  });
  eventBus.$on('custom-event-complete', () => {
    loading = false;
  });
  eventBus.$emit('custom-event-load');
  expect<boolean>(loading).toBe<boolean>(true);
  eventBus.$emit('custom-event-complete');
  expect<boolean>(loading).toBe<boolean>(false);
});
