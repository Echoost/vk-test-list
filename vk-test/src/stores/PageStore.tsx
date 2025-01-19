import { makeAutoObservable } from 'mobx';


class PageStore {
    colorScheme: 'light' | 'dark' = 'light';

    constructor() {
        makeAutoObservable(this);
    }

    changeColorScheme(scheme: 'light' | 'dark') {
        this.colorScheme = scheme;
    }
}

export default new PageStore();