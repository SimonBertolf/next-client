import { injectable } from 'inversify-props';
import { IDomDocument } from '../../interfaces';

@injectable()
class DomDocument implements IDomDocument {
  private dom: Document = document;

  setTitle(title: string): void {
    this.dom.title = title;
  }

  setLang(locale: string): void {
    this.dom.documentElement.lang = locale;
  }
}

export default DomDocument;
