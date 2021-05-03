/**
 * handles dom manipulation
 *
 * @category Category Services
 */
interface IDomDocument {
  setTitle(title: string): void;
  setLang(locale: string): void;
}

export default IDomDocument;
