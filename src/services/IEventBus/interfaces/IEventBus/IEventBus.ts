/**
 * passes events
 *
 * @category Category Services
 */
interface IEventBus {
  $on(event: string, callback: () => void): void;
  $emit(event: string): void;
}

export default IEventBus;
