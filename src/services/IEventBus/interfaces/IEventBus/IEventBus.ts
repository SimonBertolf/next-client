/**
 * passes events
 *
 * @category Category Services
 */
export interface IEventBus {
  $on(event: string, callback: () => void): void;
  $emit(event: string): void;
}
