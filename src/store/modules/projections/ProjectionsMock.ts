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
            displayNames: [{ lang: 'de', text: 'sale1' }],
            values: [],
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
          },
          {
            name: 'commercial',
            displayNames: [{ lang: 'de', text: 'Mieterträge Gewerbe' }],
            values: [],
          },
          {
            name: 'parking',
            displayNames: [{ lang: 'de', text: 'Mieterträge Parking' }],
            values: [],
          },
          {
            name: 'misc',
            displayNames: [{ lang: 'de', text: 'Mieterträge Sonstige' }],
            values: [],
          },
          {
            name: 'vacancy',
            displayNames: [{ lang: 'de', text: 'Leerstand' }],
            values: [],
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
          },
          {
            name: 'fees',
            displayNames: [{ lang: 'de', text: 'Planungs- und Projekthonorare' }],
            values: [],
          },
          {
            name: 'construction',
            displayNames: [{ lang: 'de', text: 'Baukosten (ohne Honorare)' }],
            values: [],
          },
          {
            name: 'misc',
            displayNames: [{ lang: 'de', text: 'Diverse Kosten (ohne Provisionen)' }],
            values: [],
          },
          {
            name: 'commissions',
            displayNames: [{ lang: 'de', text: 'Verkaufsprovisionen ' }],
            values: [],
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
          },
          {
            name: 'insurance',
            displayNames: [{ lang: 'de', text: 'Versicherung' }],
            values: [],
          },
          {
            name: 'auxiliary',
            displayNames: [{ lang: 'de', text: 'HNK z.L. Eigentümer' }],
            values: [],
          },
          {
            name: 'marketing',
            displayNames: [{ lang: 'de', text: 'Vermietungs- und Vermarktungskosten' }],
            values: [],
          },
          {
            name: 'taxes',
            displayNames: [{ lang: 'de', text: 'Objektsteuern / Gebühren + Abgaben' }],
            values: [],
          },
          {
            name: 'fees',
            displayNames: [{ lang: 'de', text: 'Verwaltungshonorar ' }],
            values: [],
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
          },
          {
            name: 'accounting',
            displayNames: [{ lang: 'de', text: 'Buchführung' }],
            values: [],
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
          },
          {
            name: 'taxes',
            displayNames: [{ lang: 'de', text: 'Steuern' }],
            values: [],
          },
          {
            name: 'external',
            displayNames: [{ lang: 'de', text: 'Betriebsfremder, a.o. Aufwand/Ertrag' }],
            values: [],
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
          },
          {
            name: 'amortization',
            displayNames: [{ lang: 'de', text: 'Amortisation Landkredit' }],
            values: [],
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
          },
          {
            name: 'amortization',
            displayNames: [{ lang: 'de', text: 'Amortisation Baukredit' }],
            values: [],
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
          },
          {
            name: 'amortization',
            displayNames: [{ lang: 'de', text: 'Amortisation Nachrangige Darlehen' }],
            values: [],
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
          },
          {
            name: 'amortization',
            displayNames: [{ lang: 'de', text: 'Amortisation übrige Darlehen' }],
            values: [],
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
          },
          {
            name: 'repayment',
            displayNames: [{ lang: 'de', text: 'Rückzahlungen EK' }],
            values: [],
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
          },
          {
            name: 'repayment',
            displayNames: [{ lang: 'de', text: 'Rückzahlungen EK' }],
            values: [],
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
          },
          {
            name: 'repayment',
            displayNames: [{ lang: 'de', text: 'Rückzahlungen EK' }],
            values: [],
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
          },
          {
            name: 'repayment',
            displayNames: [{ lang: 'de', text: 'Rückzahlungen EK' }],
            values: [],
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
