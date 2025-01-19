import { useEffect, useState } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';

import { observer } from 'mobx-react';

import RepositoriesStore from '@stores/RepositoriesStore.tsx';

import { RepositoryCard } from '@components/Atoms/RepositoryCard/RepositoryCard.tsx';

import { Spinner, Text } from '@vkontakte/vkui';


const RepositoriesList = observer(() => {
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ fetching, setFetching ] = useState(true);
    const [ hasMore, setHasMore ] = useState(true);

    const { getRepositoriesAction, deleteRepository, data, filteredData } = RepositoriesStore;

    const fetchMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
        setFetching(true);
    };

    useEffect(() => {
        const fetch = async () => {
            if (fetching) {
                await getRepositoriesAction(currentPage);
                setFetching(false);

                if (currentPage === 5) {
                    setHasMore(false);
                }
            }
        };
        fetch();
    }, [ fetching, currentPage, getRepositoriesAction ]);

    return (
        <InfiniteScroll next={fetchMore}
                        hasMore={hasMore}
                        dataLength={data.length}
                        scrollThreshold={'100px'}
                        loader={<Spinner className="my-3"/>}
                        endMessage={
                            <Text className="text-center my-3">Вы просмотрели все элементы</Text>
                        }>
            <div className="flex flex-col gap-5">
                {filteredData?.map(element => (
                    <RepositoryCard link={element.owner.html_url}
                                    key={element.id}
                                    avatarUrl={element.owner.avatar_url}
                                    name={element.name}
                                    handleDelete={() => deleteRepository(element.id)}/>
                ))}
            </div>
        </InfiniteScroll>
    );
});


export { RepositoriesList };