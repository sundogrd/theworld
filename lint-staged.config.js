module.exports = {
    '*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint', 'git add'],
    '*.{json}': ['prettier --write', 'git add'],
    '*.less': 'stylelint --syntax less',
    '*.{png,jpeg,jpg,gif,svg}': ['imagemin-lint-staged', 'git add'],
};
