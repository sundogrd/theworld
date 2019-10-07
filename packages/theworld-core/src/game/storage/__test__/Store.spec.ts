import { parseFunction } from "../Store"
describe('parseFunction',  () => {
    it('parseFunction arrow function', () => {
        const func = parseFunction("function(world, player, me) { return { actionId: 'turn-north', target: null} }")
        console.log(func)
    });
});
