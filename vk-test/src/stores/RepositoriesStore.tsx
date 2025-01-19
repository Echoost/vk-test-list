import { makeAutoObservable, runInAction } from 'mobx';
import { fromPromise, IPromiseBasedObservable } from 'mobx-utils';

import {
    getRepositories,
    Repositories,
} from '@api/getRepositories';


class RepositoriesStore {
    data: Repositories[] = [];
    filterActive = false;
    filteredData: Repositories[] = [];
    filterDates: [ number, number ] = [ 2013, 2025 ];
    repositoriesFromPromise?: IPromiseBasedObservable<Repositories[]> = undefined;

    constructor() {
        makeAutoObservable(this);
    }

    getRepositoriesAction = (page: number) => {
        const newRepositoriesPromise = getRepositories(page);
        this.repositoriesFromPromise = fromPromise(
            newRepositoriesPromise.then(newRepositories => {
                runInAction(() => {
                    this.data = [ ...this.data, ...newRepositories ];

                    if (this.filterActive) {
                        this.filteredData = this.data.filter(repository => {
                            const createdYear = new Date(repository.created_at).getFullYear();
                            return createdYear >= this.filterDates[0] && createdYear <= this.filterDates[1];
                        });
                    } else {
                        this.filteredData = [ ...this.data ];
                    }
                });
                return this.data;
            }),
        );
    };

    deleteRepository = (id: number) => {
        runInAction(() => {
            this.data = this.data.filter(repository => repository.id !== id);

            if (this.filterActive) {
                this.filteredData = this.filteredData.filter(
                    repository => repository.id !== id,
                );
            } else {
                this.filteredData = [ ...this.data ];
            }
        });
    };

    filterByYearRange = (startYear: number, endYear: number) => {
        runInAction(() => {
            this.filterActive = startYear && endYear ? true : false;
            if (this.filterActive) {
                this.filteredData = this.data.filter(repository => {
                    const createdYear = new Date(
                        repository.created_at,
                    ).getFullYear();
                    return createdYear >= startYear && createdYear <= endYear;
                });
            } else {
                this.filteredData = [ ...this.data ];
            }
        });
    };

    setFilterDates = (dates: [ number, number ]) => {
        this.filterDates = dates;
    };
}

export default new RepositoriesStore();