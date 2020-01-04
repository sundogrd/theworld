import { EDirection } from '../../../types/common';

const playerStore = () => ({
    id: '#player',
    name: '玩家',
    description: '来自异世界的勇者',
    gender: 'male',
    race: 'human',
    inventory: {
        maxItem: 10,
        items: {},
    },
    equipment: {},
    position: {
        areaId: '233',
        x: 0,
        y: 0,
        direction: 'south',
    },
    attributes: {
        HP: 10,
        POWER: 3,
        DEF: 2,
    } as Record<string, number>,
    isAlive: true,
    // 以左上角建立坐标系
    move(direction: EDirection): void {
        switch (direction) {
            case EDirection.SOUTH: {
                const { x, y } = this.position;
                // 先写死
                if (y >= 1) {
                    return;
                } else {
                    this.position.y = y + 1;
                }
                break;
            }
            case EDirection.NORTH: {
                const { x, y } = this.position;
                if (y <= 0) {
                    return;
                } else {
                    this.position.y = y - 1;
                }
                break;
            }
            case EDirection.EAST: {
                const { x, y } = this.position;
                if (x >= 1) {
                    return;
                } else {
                    this.position.x = x + 1;
                }
                break;
            }
            case EDirection.WEST: {
                const { x, y } = this.position;
                if (x <= 0) {
                    return;
                } else {
                    this.position.x = x - 1;
                }
                break;
            }
        }
    },
});

export default playerStore;
