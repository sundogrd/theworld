import { observable, action } from 'mobx'


class GameStore {
    @observable value: number = 2

    @action
    addValue = () => {
        this.value = this.value + 1;
        console.log(this.value)
    }
}

export default GameStore