import { Map as iMap } from 'immutable';

const initialState = iMap({
  snapshots: <string[]>[],
  version: <number>0
});

const ADD_SNAPSHOT: string = 'ADD_SNAPSHOT';
const EMPTY_SNAPSHOTS: string = 'EMPTY_SNAPSHOTS';
const PREVOUS_VERSION: string = 'PREVOUS_VERSION';
const NEXT_VERSION: string = 'NEXT_VERSION';


export default function reducer(state = initialState, action: any = {}) {

  const version: number = <number>state.get('version');
  const snapshots: string[] = <string[]>state.get('snapshots');

  switch (action.type) {

    case EMPTY_SNAPSHOTS:
      let empty_state = state.set('version', 0);
      return empty_state = empty_state.set('snapshots', []);

    case ADD_SNAPSHOT:
      snapshots.splice(version + 1, snapshots.length - version, action.snapshot);
      const newVersion: number = snapshots.length - 1;
      const add_state = state.set('snapshots', snapshots);
      return add_state.set('version', (newVersion < 0) ? 0 : newVersion);

    case PREVOUS_VERSION:
      let prevVersion: number = version - 1;
      if (prevVersion < 0) {
        prevVersion = 0;
      }
      return state.set('version', prevVersion);

    case NEXT_VERSION:
      const limitLength: number = snapshots.length - 1;
      let nextVersion: number = version + 1;
      if (nextVersion > limitLength) {
        nextVersion = limitLength;
      }
      return state.set('version', nextVersion);

    default:
      return state;
  }
}

export function addSnapShot(snapshot: string): any {
  return {
    type: ADD_SNAPSHOT,
    snapshot
  };
}

export function emptyAction(): any {
  return {
    type: EMPTY_SNAPSHOTS
  };
}

export function undoAction(): any {
  return {
    type: PREVOUS_VERSION
  };
}

export function redoAction(): any {
  return {
    type: NEXT_VERSION
  };
}