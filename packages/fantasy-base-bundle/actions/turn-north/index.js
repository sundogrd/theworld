module.exports = {
    id: 'turn-north',
    name: '${turn-north}', // for i18n
    timeSpend: () => 1,
    check: () => true,
    do: () => {
        return [
            {
                type: 'creature-change',
                payload: {
                    position: {
                        direction: 'north',
                    },
                },
            },
        ];
    },
};
