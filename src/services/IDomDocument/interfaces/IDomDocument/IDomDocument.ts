/**
 * handles dom manipulation
 *
 * @category Category Services
 */
export interface IDomDocument {
  setTitle(title: string): void;
  setLang(locale: string): void;
}
