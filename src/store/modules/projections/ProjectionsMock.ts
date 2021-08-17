import { Projection } from '@/models';

export const mockProtections: Projection[] = [
  {
    _id: '6115096e4a8313b0397b8d48',
    name: 'Luftschloss 225, 8005 Himmel',
    from: new Date('March 2017'),
    to: new Date('November 2021'),
    sections: [
      {
        name: 'sale',
        type: 'sale',
        displayNames: [{ lang: 'de', text: 'Verkauf' }],
        inputs: [
          {
            name: 'sale1',
            meta: { notarization: new Date('March 21, 2020') },
            displayNames: [{ lang: 'de', text: 'Verkauf 1' }],
            values: [],
            _id: 'sale1',
          },
        ],
      },
      {
        name: 'rent',
        type: 'income',
        displayNames: [{ lang: 'de', text: 'Miete' }],
        inputs: [
          {
            name: 'living',
            displayNames: [{ lang: 'de', text: 'Mieterträge Wohnen' }],
            values: [],
            _id: 'living',
          },
          {
            name: 'commercial',
            displayNames: [{ lang: 'de', text: 'Mieterträge Gewerbe' }],
            values: [],
            _id: 'commercial',
          },
          {
            name: 'parking',
            displayNames: [{ lang: 'de', text: 'Mieterträge Parking' }],
            values: [],
            _id: 'parking',
          },
          {
            name: 'misc',
            displayNames: [{ lang: 'de', text: 'Mieterträge Sonstige' }],
            values: [],
            _id: 'misc',
          },
          {
            name: 'vacancy',
            displayNames: [{ lang: 'de', text: 'Leerstand' }],
            values: [],
            _id: 'vacancy',
          },
        ],
      },
      {
        name: 'general',
        type: 'cost',
        displayNames: [{ lang: 'de', text: 'Kosten' }],
        inputs: [
          {
            name: 'property',
            displayNames: [{ lang: 'de', text: 'Grundstück' }],
            values: [],
            _id: 'property',
          },
          {
            name: 'fees',
            displayNames: [{ lang: 'de', text: 'Planungs- und Projekthonorare' }],
            values: [],
            _id: 'fees',
          },
          {
            name: 'construction',
            displayNames: [{ lang: 'de', text: 'Baukosten (ohne Honorare)' }],
            values: [],
            _id: 'construction',
          },
          {
            name: 'misc',
            displayNames: [{ lang: 'de', text: 'Diverse Kosten (ohne Provisionen)' }],
            values: [],
            _id: 'misc',
          },
          {
            name: 'commissions',
            displayNames: [{ lang: 'de', text: 'Verkaufsprovisionen ' }],
            values: [],
            _id: 'commissions',
          },
        ],
      },
      {
        name: 'property',
        type: 'cost',
        displayNames: [{ lang: 'de', text: 'Liegenschaftsaufwand' }],
        inputs: [
          {
            name: 'maintenance',
            displayNames: [{ lang: 'de', text: 'Unterhalt und Reparaturen' }],
            values: [],
            _id: 'maintenance',
          },
          {
            name: 'insurance',
            displayNames: [{ lang: 'de', text: 'Versicherung' }],
            values: [],
            _id: 'insurance',
          },
          {
            name: 'auxiliary',
            displayNames: [{ lang: 'de', text: 'HNK z.L. Eigentümer' }],
            values: [],
            _id: 'auxiliary',
          },
          {
            name: 'marketing',
            displayNames: [{ lang: 'de', text: 'Vermietungs- und Vermarktungskosten' }],
            values: [],
            _id: 'marketing',
          },
          {
            name: 'taxes',
            displayNames: [{ lang: 'de', text: 'Objektsteuern / Gebühren + Abgaben' }],
            values: [],
            _id: 'taxes',
          },
          {
            name: 'fees',
            displayNames: [{ lang: 'de', text: 'Verwaltungshonorar ' }],
            values: [],
            _id: 'fees',
          },
        ],
      },
      {
        name: 'management',
        type: 'cost',
        displayNames: [{ lang: 'de', text: 'Management Aufwand' }],
        inputs: [
          {
            name: 'asset',
            displayNames: [{ lang: 'de', text: 'Asset Management' }],
            values: [],
            _id: 'asset',
          },
          {
            name: 'accounting',
            displayNames: [{ lang: 'de', text: 'Buchführung' }],
            values: [],
            _id: 'accounting',
          },
        ],
      },
      {
        name: 'legal',
        type: 'cost',
        displayNames: [{ lang: 'de', text: 'Legal Entity Kosten' }],
        inputs: [
          {
            name: 'administration',
            displayNames: [{ lang: 'de', text: 'Verwaltungsaufwand' }],
            values: [],
            _id: 'administration',
          },
          {
            name: 'taxes',
            displayNames: [{ lang: 'de', text: 'Steuern' }],
            values: [],
            _id: 'taxes',
          },
          {
            name: 'external',
            displayNames: [{ lang: 'de', text: 'Betriebsfremder, a.o. Aufwand/Ertrag' }],
            values: [],
            _id: 'external',
          },
        ],
      },
      {
        name: 'land',
        type: 'funding',
        meta: { interest: 0.75 },
        displayNames: [{ lang: 'de', text: 'Finanzierung Landkredit' }],
        inputs: [
          {
            name: 'loan',
            displayNames: [{ lang: 'de', text: 'Landkredit' }],
            values: [],
            _id: 'loan',
          },
          {
            name: 'amortization',
            displayNames: [{ lang: 'de', text: 'Amortisation Landkredit' }],
            values: [],
            _id: 'amortization',
          },
        ],
      },
      {
        name: 'construction',
        type: 'funding',
        meta: { interest: 0.75 },
        displayNames: [{ lang: 'de', text: 'Finanzierung Baukredit' }],
        inputs: [
          {
            name: 'loan',
            displayNames: [{ lang: 'de', text: 'Baukredit' }],
            values: [],
            _id: 'loan',
          },
          {
            name: 'amortization',
            displayNames: [{ lang: 'de', text: 'Amortisation Baukredit' }],
            values: [],
            _id: 'amortization',
          },
        ],
      },
      {
        name: 'subordinated',
        type: 'funding',
        meta: { interest: 0.75 },
        displayNames: [{ lang: 'de', text: 'Finanzierung Nachrangige Darlehen' }],
        inputs: [
          {
            name: 'loan',
            displayNames: [{ lang: 'de', text: 'Nachrangige Darlehen' }],
            values: [],
            _id: 'loan',
          },
          {
            name: 'amortization',
            displayNames: [{ lang: 'de', text: 'Amortisation Nachrangige Darlehen' }],
            values: [],
            _id: 'amortization',
          },
        ],
      },
      {
        name: 'misc',
        type: 'funding',
        meta: { interest: 0.75 },
        displayNames: [{ lang: 'de', text: 'Finanzierung übrige Darlehen' }],
        inputs: [
          {
            name: 'loan',
            displayNames: [{ lang: 'de', text: 'Übrige Darlehen' }],
            values: [],
            _id: 'loan',
          },
          {
            name: 'amortization',
            displayNames: [{ lang: 'de', text: 'Amortisation übrige Darlehen' }],
            values: [],
            _id: 'amortization',
          },
        ],
      },
      {
        name: 'property',
        type: 'equity',
        displayNames: [{ lang: 'de', text: 'Eigenkapital Grundstück' }],
        inputs: [
          {
            name: 'capital',
            displayNames: [{ lang: 'de', text: 'Eigenkapital Grundstück' }],
            values: [],
            _id: 'capital',
          },
          {
            name: 'repayment',
            displayNames: [{ lang: 'de', text: 'Rückzahlungen EK' }],
            values: [],
            _id: 'repayment',
          },
        ],
      },
      {
        name: 'construction',
        type: 'equity',
        displayNames: [{ lang: 'de', text: 'Eigenkapital Bau' }],
        inputs: [
          {
            name: 'capital',
            displayNames: [{ lang: 'de', text: 'Eigenkapital Bau' }],
            values: [],
            _id: 'capital',
          },
          {
            name: 'repayment',
            displayNames: [{ lang: 'de', text: 'Rückzahlungen EK' }],
            values: [],
            _id: 'repayment',
          },
        ],
      },
      {
        name: 'universal',
        type: 'equity',
        displayNames: [{ lang: 'de', text: 'Eigenkapital Allgemein' }],
        inputs: [
          {
            name: 'capital',
            displayNames: [{ lang: 'de', text: 'Eigenkapital Allgemein' }],
            values: [],
            _id: 'capital',
          },
          {
            name: 'repayment',
            displayNames: [{ lang: 'de', text: 'Rückzahlungen EK' }],
            values: [],
            _id: 'repayment',
          },
        ],
      },
      {
        name: 'other',
        type: 'equity',
        displayNames: [{ lang: 'de', text: 'Eigenkapital übrige Beteiligungen' }],
        inputs: [
          {
            name: 'capital',
            displayNames: [{ lang: 'de', text: 'Eigenkapital übrige Beteiligungen' }],
            values: [],
            _id: 'capital',
          },
          {
            name: 'repayment',
            displayNames: [{ lang: 'de', text: 'Rückzahlungen EK' }],
            values: [],
            _id: 'repayment',
          },
        ],
      },
    ],
    milestones: [],
  },
  {
    _id: '61150db3810948ab5e4ab5e3',
    name: 'Hüpfburg 333, 5032 Spielen',
    from: new Date('January 2018'),
    to: new Date('December 2026'),
    sections: [],
    milestones: [],
  },
];
