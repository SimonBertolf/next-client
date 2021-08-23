import { Projection, ProjectionActual } from '@/models';

const FROM = new Date('March 2017');
const TO = new Date('November 2018');

const createMockValues = (from: Date, to: Date): number[] => {
  if (from > to) throw new Error('Start date (from) must be before end date (to)!');
  const months = 12 * (to.getFullYear() - from.getFullYear()) - from.getMonth() + to.getMonth() + 1;
  return [...new Array(months)].reduce((acc) => {
    acc.push((acc[acc.length - 1] || 1) + (acc[acc.length - 2] || 0));
    return acc;
  }, []);
};

export const mockProtections: Projection[] = [
  {
    _id: '6115096e4a8313b0397b8d48',
    name: 'Luftschloss 225, 8005 Himmel',
    from: FROM,
    to: TO,
    resolution: 'quarterly',
    sections: [
      {
        name: 'sale-sales',
        type: 'sale',
        actual: 'sale-sales',
        displayNames: [{ lang: 'de', text: 'Verkauf' }],
        inputs: [
          {
            name: 'sale1',
            meta: { notarization: new Date('March 21, 2020') },
            displayNames: [{ lang: 'de', text: 'Verkauf 1' }],
            values: createMockValues(FROM, TO),
            _id: 'sale1',
          },
        ],
      },
      {
        name: 'income-rent',
        type: 'income',
        actual: 'income-rent',
        displayNames: [{ lang: 'de', text: 'Miete' }],
        inputs: [
          {
            name: 'living',
            displayNames: [{ lang: 'de', text: 'Mieterträge Wohnen' }],
            values: createMockValues(FROM, TO),
            _id: 'living',
          },
          {
            name: 'commercial',
            displayNames: [{ lang: 'de', text: 'Mieterträge Gewerbe' }],
            values: createMockValues(FROM, TO),
            _id: 'commercial',
          },
          {
            name: 'parking',
            displayNames: [{ lang: 'de', text: 'Mieterträge Parking' }],
            values: createMockValues(FROM, TO),
            _id: 'parking',
          },
          {
            name: 'misc',
            displayNames: [{ lang: 'de', text: 'Mieterträge Sonstige' }],
            values: createMockValues(FROM, TO),
            _id: 'misc',
          },
          {
            name: 'vacancy',
            displayNames: [{ lang: 'de', text: 'Leerstand' }],
            values: createMockValues(FROM, TO),
            _id: 'vacancy',
          },
        ],
      },
      {
        name: 'cost-general',
        type: 'cost',
        displayNames: [{ lang: 'de', text: 'Kosten' }],
        inputs: [
          {
            name: 'property',
            actual: 'property',
            displayNames: [{ lang: 'de', text: 'Grundstück' }],
            values: createMockValues(FROM, TO),
            _id: 'property',
          },
          {
            name: 'fees',
            actual: 'fees',
            displayNames: [{ lang: 'de', text: 'Planungs- und Projekthonorare' }],
            values: createMockValues(FROM, TO),
            _id: 'fees',
          },
          {
            name: 'construction',
            actual: 'construction',
            displayNames: [{ lang: 'de', text: 'Baukosten (ohne Honorare)' }],
            values: createMockValues(FROM, TO),
            _id: 'construction',
          },
          {
            name: 'misc',
            actual: 'misc',
            displayNames: [{ lang: 'de', text: 'Diverse Kosten (ohne Provisionen)' }],
            values: createMockValues(FROM, TO),
            _id: 'misc',
          },
          {
            name: 'commissions',
            actual: 'commissions',
            displayNames: [{ lang: 'de', text: 'Verkaufsprovisionen ' }],
            values: createMockValues(FROM, TO),
            _id: 'commissions',
          },
        ],
      },
      {
        name: 'cost-property',
        type: 'cost',
        displayNames: [{ lang: 'de', text: 'Liegenschaftsaufwand' }],
        inputs: [
          {
            name: 'maintenance',
            actual: 'maintenance',
            displayNames: [{ lang: 'de', text: 'Unterhalt und Reparaturen' }],
            values: createMockValues(FROM, TO),
            _id: 'maintenance',
          },
          {
            name: 'insurance',
            actual: 'insurance',
            displayNames: [{ lang: 'de', text: 'Versicherung' }],
            values: createMockValues(FROM, TO),
            _id: 'insurance',
          },
          {
            name: 'auxiliary',
            actual: 'auxiliary',
            displayNames: [{ lang: 'de', text: 'HNK z.L. Eigentümer' }],
            values: createMockValues(FROM, TO),
            _id: 'auxiliary',
          },
          {
            name: 'marketing',
            actual: 'marketing',
            displayNames: [{ lang: 'de', text: 'Vermietungs- und Vermarktungskosten' }],
            values: createMockValues(FROM, TO),
            _id: 'marketing',
          },
          {
            name: 'taxes',
            actual: 'taxes',
            displayNames: [{ lang: 'de', text: 'Objektsteuern / Gebühren + Abgaben' }],
            values: createMockValues(FROM, TO),
            _id: 'taxes',
          },
          {
            name: 'fees',
            actual: 'fees',
            displayNames: [{ lang: 'de', text: 'Verwaltungshonorar ' }],
            values: createMockValues(FROM, TO),
            _id: 'fees',
          },
        ],
      },
      {
        name: 'cost-management',
        type: 'cost',
        displayNames: [{ lang: 'de', text: 'Management Aufwand' }],
        inputs: [
          {
            name: 'asset',
            actual: 'asset',
            displayNames: [{ lang: 'de', text: 'Asset Management' }],
            values: createMockValues(FROM, TO),
            _id: 'asset',
          },
          {
            name: 'accounting',
            actual: 'accounting',
            displayNames: [{ lang: 'de', text: 'Buchführung' }],
            values: createMockValues(FROM, TO),
            _id: 'accounting',
          },
        ],
      },
      {
        name: 'cost-legal',
        type: 'cost',
        displayNames: [{ lang: 'de', text: 'Legal Entity Kosten' }],
        inputs: [
          {
            name: 'administration',
            actual: 'administration',
            displayNames: [{ lang: 'de', text: 'Verwaltungsaufwand' }],
            values: createMockValues(FROM, TO),
            _id: 'administration',
          },
          {
            name: 'taxes',
            actual: 'taxes',
            displayNames: [{ lang: 'de', text: 'Steuern' }],
            values: createMockValues(FROM, TO),
            _id: 'taxes',
          },
          {
            name: 'external',
            actual: 'external',
            displayNames: [{ lang: 'de', text: 'Betriebsfremder, a.o. Aufwand/Ertrag' }],
            values: createMockValues(FROM, TO),
            _id: 'external',
          },
        ],
      },
      {
        name: 'funding-land',
        actual: 'funding-land',
        type: 'funding',
        meta: { interest: 0.75 },
        displayNames: [{ lang: 'de', text: 'Finanzierung Landkredit' }],
        inputs: [
          {
            name: 'loan',
            displayNames: [{ lang: 'de', text: 'Landkredit' }],
            values: createMockValues(FROM, TO),
            _id: 'loan',
          },
          {
            name: 'amortization',
            displayNames: [{ lang: 'de', text: 'Amortisation Landkredit' }],
            values: createMockValues(FROM, TO),
            _id: 'amortization',
          },
        ],
      },
      {
        name: 'funding-construction',
        actual: 'funding-construction',
        type: 'funding',
        meta: { interest: 0.75 },
        displayNames: [{ lang: 'de', text: 'Finanzierung Baukredit' }],
        inputs: [
          {
            name: 'loan',
            displayNames: [{ lang: 'de', text: 'Baukredit' }],
            values: createMockValues(FROM, TO),
            _id: 'loan',
          },
          {
            name: 'amortization',
            displayNames: [{ lang: 'de', text: 'Amortisation Baukredit' }],
            values: createMockValues(FROM, TO),
            _id: 'amortization',
          },
        ],
      },
      {
        name: 'funding-subordinated',
        actual: 'funding-subordinated',
        type: 'funding',
        meta: { interest: 0.75 },
        displayNames: [{ lang: 'de', text: 'Finanzierung Nachrangige Darlehen' }],
        inputs: [
          {
            name: 'loan',
            displayNames: [{ lang: 'de', text: 'Nachrangige Darlehen' }],
            values: createMockValues(FROM, TO),
            _id: 'loan',
          },
          {
            name: 'amortization',
            displayNames: [{ lang: 'de', text: 'Amortisation Nachrangige Darlehen' }],
            values: createMockValues(FROM, TO),
            _id: 'amortization',
          },
        ],
      },
      {
        name: 'funding-misc',
        actual: 'funding-misc',
        type: 'funding',
        meta: { interest: 0.75 },
        displayNames: [{ lang: 'de', text: 'Finanzierung übrige Darlehen' }],
        inputs: [
          {
            name: 'loan',
            displayNames: [{ lang: 'de', text: 'Übrige Darlehen' }],
            values: createMockValues(FROM, TO),
            _id: 'loan',
          },
          {
            name: 'amortization',
            displayNames: [{ lang: 'de', text: 'Amortisation übrige Darlehen' }],
            values: createMockValues(FROM, TO),
            _id: 'amortization',
          },
        ],
      },
      {
        name: 'equity-property',
        actual: 'equity-property',
        type: 'equity',
        displayNames: [{ lang: 'de', text: 'Eigenkapital Grundstück' }],
        inputs: [
          {
            name: 'capital',
            displayNames: [{ lang: 'de', text: 'Eigenkapital Grundstück' }],
            values: createMockValues(FROM, TO),
            _id: 'capital',
          },
          {
            name: 'repayment',
            displayNames: [{ lang: 'de', text: 'Rückzahlungen EK' }],
            values: createMockValues(FROM, TO),
            _id: 'repayment',
          },
        ],
      },
      {
        name: 'equity-construction',
        actual: 'equity-construction',
        type: 'equity',
        displayNames: [{ lang: 'de', text: 'Eigenkapital Bau' }],
        inputs: [
          {
            name: 'capital',
            displayNames: [{ lang: 'de', text: 'Eigenkapital Bau' }],
            values: createMockValues(FROM, TO),
            _id: 'capital',
          },
          {
            name: 'repayment',
            displayNames: [{ lang: 'de', text: 'Rückzahlungen EK' }],
            values: createMockValues(FROM, TO),
            _id: 'repayment',
          },
        ],
      },
      {
        name: 'equity-universal',
        actual: 'equity-universal',
        type: 'equity',
        displayNames: [{ lang: 'de', text: 'Eigenkapital Allgemein' }],
        inputs: [
          {
            name: 'capital',
            displayNames: [{ lang: 'de', text: 'Eigenkapital Allgemein' }],
            values: createMockValues(FROM, TO),
            _id: 'capital',
          },
          {
            name: 'repayment',
            displayNames: [{ lang: 'de', text: 'Rückzahlungen EK' }],
            values: createMockValues(FROM, TO),
            _id: 'repayment',
          },
        ],
      },
      {
        name: 'equity-other',
        actual: 'equity-other',
        type: 'equity',
        displayNames: [{ lang: 'de', text: 'Eigenkapital übrige Beteiligungen' }],
        inputs: [
          {
            name: 'capital',
            displayNames: [{ lang: 'de', text: 'Eigenkapital übrige Beteiligungen' }],
            values: createMockValues(FROM, TO),
            _id: 'capital',
          },
          {
            name: 'repayment',
            displayNames: [{ lang: 'de', text: 'Rückzahlungen EK' }],
            values: createMockValues(FROM, TO),
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
    resolution: 'yearly',
    sections: [],
    milestones: [],
  },
];

export const mockActuals: ProjectionActual[] = [
  // sale-sales
  {
    name: 'sale-sales',
    section: 'sale-sales',
    displayNames: [{ lang: 'de', text: 'Effektive Erträge' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  // income-rent
  {
    name: 'income-rent',
    section: 'income-rent',
    displayNames: [{ lang: 'de', text: 'Effektive Erträge' }],
    values: createMockValues(FROM, TO).map((value) => (value + 1) * 6),
  },
  // cost-general
  {
    name: 'property',
    section: 'cost-general',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  {
    name: 'fees',
    section: 'cost-general',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  {
    name: 'construction',
    section: 'cost-general',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  {
    name: 'misc',
    section: 'cost-general',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  {
    name: 'commissions',
    section: 'cost-general',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  // cost-property
  {
    name: 'maintenance',
    section: 'cost-property',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  {
    name: 'insurance',
    section: 'cost-property',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  {
    name: 'auxiliary',
    section: 'cost-property',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  {
    name: 'marketing',
    section: 'cost-property',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  {
    name: 'taxes',
    section: 'cost-property',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  {
    name: 'fees',
    section: 'cost-property',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  // cost-management
  {
    name: 'asset',
    section: 'cost-management',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  {
    name: 'accounting',
    section: 'cost-management',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  // cost-legal
  {
    name: 'administration',
    section: 'cost-legal',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  {
    name: 'taxes',
    section: 'cost-legal',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  {
    name: 'external',
    section: 'cost-legal',
    displayNames: [{ lang: 'de', text: 'Effektive Kosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  // funding-land
  {
    name: 'funding-land',
    section: 'funding-land',
    displayNames: [{ lang: 'de', text: 'Effektive Finanzierungskosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 2),
  },
  // funding-construction
  {
    name: 'funding-construction',
    section: 'funding-construction',
    displayNames: [{ lang: 'de', text: 'Effektive Finanzierungskosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 3),
  },
  // funding-subordinated
  {
    name: 'funding-subordinated',
    section: 'funding-subordinated',
    displayNames: [{ lang: 'de', text: 'Effektive Finanzierungskosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 4),
  },
  // funding-misc
  {
    name: 'funding-misc',
    section: 'funding-misc',
    displayNames: [{ lang: 'de', text: 'Effektive Finanzierungskosten' }],
    values: createMockValues(FROM, TO).map((value) => value + 5),
  },
  // equity-property
  {
    name: 'equity-property',
    section: 'equity-property',
    displayNames: [{ lang: 'de', text: 'Effektives Eigenkapital' }],
    values: createMockValues(FROM, TO).map((value) => value + 1),
  },
  // equity-construction
  {
    name: 'equity-construction',
    section: 'equity-construction',
    displayNames: [{ lang: 'de', text: 'Effektives Eigenkapital' }],
    values: createMockValues(FROM, TO).map((value) => value + 2),
  },
  // equity-universal
  {
    name: 'equity-universal',
    section: 'equity-universal',
    displayNames: [{ lang: 'de', text: 'Effektives Eigenkapital' }],
    values: createMockValues(FROM, TO).map((value) => value + 3),
  },
  // equity-other
  {
    name: 'equity-other',
    section: 'equity-other',
    displayNames: [{ lang: 'de', text: 'Effektives Eigenkapital' }],
    values: createMockValues(FROM, TO).map((value) => value + 4),
  },
];
