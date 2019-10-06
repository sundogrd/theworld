const gameStore = () => ({
    value: 2,
    addValue() {
        this.value = this.value + 1;
        console.log(this.value)
    }
})

export default gameStore
