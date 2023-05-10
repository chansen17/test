import { proxy } from 'valtio';

const state = proxy({
    limit: null
});

export default state;