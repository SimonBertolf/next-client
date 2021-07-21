import { Report } from '@/models';
import { apiLayoutsMock } from '../layouts/LayoutsMock';

export const reportsMock: Report[] = [
  {
    _id: '60c87280e4b3d2773833e4bf',
    name: 'My first Report',
    layout: apiLayoutsMock[0],
    data: [
      {
        widget: apiLayoutsMock[0].widgets[0]._id,
        data: [
          { x: 0.34376009422885456, y: 0.6720355641805758, z: apiLayoutsMock[0].widgets[0].type },
          { x: 0.7152418210466758, y: 0.346876533637388, z: apiLayoutsMock[0].widgets[0].type },
          { x: 0.8123033196418115, y: 0.4708964748771982, z: apiLayoutsMock[0].widgets[0].type },
        ],
      },
      {
        widget: apiLayoutsMock[0].widgets[1]._id,
        data: [
          { x: 0.5685327345526454, y: 0.47956121477804436, z: apiLayoutsMock[0].widgets[1].type },
          { x: 0.37798435033660915, y: 0.9404370685941059, z: apiLayoutsMock[0].widgets[1].type },
          { x: 0.22357614769123058, y: 0.6458173304129009, z: apiLayoutsMock[0].widgets[1].type },
        ],
      },
    ],
  },
  {
    _id: '60c872a7e6c6d49a03511f63',
    name: 'My second Report',
    layout: apiLayoutsMock[0],
    data: [
      {
        widget: apiLayoutsMock[0].widgets[0]._id,
        data: [
          { x: 0.7627118933582804, y: 0.06332215775533201, z: apiLayoutsMock[0].widgets[0].type },
          { x: 0.4156069425255948, y: 0.45480299659007417, z: apiLayoutsMock[0].widgets[0].type },
          { x: 0.12275838917020421, y: 0.8176896247692789, z: apiLayoutsMock[0].widgets[0].type },
        ],
      },
      {
        widget: apiLayoutsMock[0].widgets[1]._id,
        data: [
          { x: 0.7917770168433145, y: 0.7697095716982787, z: apiLayoutsMock[0].widgets[1].type },
          { x: 0.40207200186795355, y: 0.6750912737170907, z: apiLayoutsMock[0].widgets[1].type },
          { x: 0.5339471411650683, y: 0.6941143971987715, z: apiLayoutsMock[0].widgets[1].type },
        ],
      },
    ],
  },
];
