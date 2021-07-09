import { Report } from '@/models';
import { responsiveLayoutMock } from '../layouts/LayoutsMock';

export const reportsMock: Report[] = [
  {
    _id: '60c87280e4b3d2773833e4bf',
    name: 'My first Report',
    data: [
      {
        _id: responsiveLayoutMock.lg[0]._id,
        data: [
          { x: 0.34376009422885456, y: 0.6720355641805758, z: 'WidgetA' },
          { x: 0.7152418210466758, y: 0.346876533637388, z: 'WidgetA' },
          { x: 0.8123033196418115, y: 0.4708964748771982, z: 'WidgetA' },
        ],
      },
      {
        _id: responsiveLayoutMock.lg[1]._id,
        data: [
          { x: 0.5685327345526454, y: 0.47956121477804436, z: 'WidgetC' },
          { x: 0.37798435033660915, y: 0.9404370685941059, z: 'WidgetC' },
          { x: 0.22357614769123058, y: 0.6458173304129009, z: 'WidgetC' },
        ],
      },
      {
        _id: responsiveLayoutMock.lg[2]._id,
        data: [
          { x: 0.12297283712211016, y: 0.1658862038657387, z: 'WidgetB' },
          { x: 0.05146625271367733, y: 0.7256519341010537, z: 'WidgetB' },
          { x: 0.0037210826325269064, y: 0.7938086325318079, z: 'WidgetB' },
        ],
      },
      {
        _id: responsiveLayoutMock.lg[3]._id,
        data: [
          { x: 0.565939202467157, y: 0.36329814393946513, z: 'WidgetA' },
          { x: 0.6478702315267482, y: 0.36533443844520597, z: 'WidgetA' },
          { x: 0.569954453672898, y: 0.11701510176285623, z: 'WidgetA' },
        ],
      },
      {
        _id: responsiveLayoutMock.lg[4]._id,
        data: [
          { x: 0.3085297872653938, y: 0.4064913640663932, z: 'WidgetA' },
          { x: 0.4656033896713174, y: 0.3150669706923055, z: 'WidgetA' },
          { x: 0.7347063550484365, y: 0.2862015543386929, z: 'WidgetA' },
        ],
      },
      {
        _id: responsiveLayoutMock.lg[5]._id,
        data: [
          { x: 0.4337858455560162, y: 0.06835950654699441, z: 'WidgetC' },
          { x: 0.9007343762099009, y: 0.603291920109146, z: 'WidgetC' },
          { x: 0.26397219274850947, y: 0.48134763671814795, z: 'WidgetC' },
        ],
      },
    ],
  },
  {
    _id: '60c872a7e6c6d49a03511f63',
    name: 'My second Report',
    data: [
      {
        _id: responsiveLayoutMock.lg[0]._id,
        data: [
          { x: 0.7627118933582804, y: 0.06332215775533201, z: 'WidgetA' },
          { x: 0.4156069425255948, y: 0.45480299659007417, z: 'WidgetA' },
          { x: 0.12275838917020421, y: 0.8176896247692789, z: 'WidgetA' },
        ],
      },
      {
        _id: responsiveLayoutMock.lg[1]._id,
        data: [
          { x: 0.7917770168433145, y: 0.7697095716982787, z: 'WidgetA' },
          { x: 0.40207200186795355, y: 0.6750912737170907, z: 'WidgetA' },
          { x: 0.5339471411650683, y: 0.6941143971987715, z: 'WidgetA' },
        ],
      },
      {
        _id: responsiveLayoutMock.lg[2]._id,
        data: [
          { x: 0.43637028740631956, y: 0.9996337379838445, z: 'WidgetB' },
          { x: 0.9992214961070791, y: 0.9178411862169895, z: 'WidgetB' },
          { x: 0.9396525499000914, y: 0.30253974675998796, z: 'WidgetB' },
        ],
      },
      {
        _id: responsiveLayoutMock.lg[3]._id,
        data: [
          { x: 0.2891625410540437, y: 0.8031312983319674, z: 'WidgetC' },
          { x: 0.8341068411623982, y: 0.39604359746059803, z: 'WidgetC' },
          { x: 0.5364599496791858, y: 0.6652149295372123, z: 'WidgetC' },
        ],
      },
      {
        _id: responsiveLayoutMock.lg[4]._id,
        data: [
          { x: 0.09818809313869137, y: 0.5466117944178961, z: 'WidgetA' },
          { x: 0.6679579281246346, y: 0.007944719446077553, z: 'WidgetA' },
          { x: 0.21730966835127274, y: 0.5441999132627078, z: 'WidgetA' },
        ],
      },
      {
        _id: responsiveLayoutMock.lg[5]._id,
        data: [
          { x: 0.7382738950020431, y: 0.8501240179279068, z: 'WidgetC' },
          { x: 0.6818585152801391, y: 0.7758206956567124, z: 'WidgetC' },
          { x: 0.12355857701155148, y: 0.9157334805063999, z: 'WidgetC' },
        ],
      },
    ],
  },
];
