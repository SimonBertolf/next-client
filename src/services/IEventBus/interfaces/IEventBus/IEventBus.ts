/**
 * passes events
 *
 * @category Category Services
 */
interface IEventBus {
  $on(event: string, callback: Function): void;
  $emit(event: string): void;
}

export default IEventBus;
