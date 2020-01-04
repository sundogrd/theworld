/* eslint-disable max-lines-per-function */
/* eslint-disable max-len */
import * as React from 'react';
import Actions from '../src/renderer/views/GameView/Actions';

export default {
    title: 'MoveActions',
    parameters: {
        backgrounds: [{ name: 'gray', value: '#eee', default: true }],
    },
};

export const toStorybook = () => (
    <div>
        <Actions />
    </div>
);

toStorybook.story = {
    name: 'MoveActions',
};
