import { container, cid } from 'inversify-props';
import { IDomDocument } from '@/services';
import { SupportedLocales } from '@/types';

const domDocument: IDomDocument = container.get<IDomDocument>(cid.IDomDocument);

test('should change document(DOM) title', () => {
  const newTitle = 'Reamis';
  domDocument.setTitle(newTitle);
  expect<string>(document.title).toEqual<string>(newTitle);
});

test('should change document(DOM) language country code', () => {
  const newLang: string = SupportedLocales.DE;
  domDocument.setLang(newLang);
  expect<string>(document.documentElement.lang).toEqual<string>(newLang);
});
