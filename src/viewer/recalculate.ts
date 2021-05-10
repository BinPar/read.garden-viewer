import { State } from '../model/state';

const recalculate = async (state: State): Promise<Partial<State>> =>
  new Promise<Partial<State>>((resolve) => {
    console.log('recalculate', { state });
    resolve({});
  });

export default recalculate;
