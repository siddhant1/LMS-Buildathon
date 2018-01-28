import { Map as iMap } from 'immutable';

const SET_COLOR = 'SET_COLOR';
const SET_WEIGHT = 'SET_WEIGHT';

const initialState = iMap({
  colors: [
    '#F63E2C', '#EC075C', '#9908A5', '#682BB5', '#3C48C1', '#45B052', '#019688', '#01BAD4',
    '#00A4F5', '#0F90F2', '#88C54B', '#CDDD3F', '#FEEE39', '#FEC224', '#FA9B1C', '#000000',
    '#5F7C8C', '#9D9D9D', '#7A5447', '#FF5406'
  ],
  weights: [1, 2, 4, 6],
  selectedWeight: 2,
  selectedColor: '#000000'
});

export function setColor(color: string): any {
  return {
    type: SET_COLOR,
    color
  };
}

export function setWeight(weight: number): any {
  return {
    type: SET_WEIGHT,
    weight
  };
}

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case SET_COLOR:
      return state.set('selectedColor', action.color);
    case SET_WEIGHT:
      return state.set('selectedWeight', action.weight);
    default:
      return state;
  }
}
