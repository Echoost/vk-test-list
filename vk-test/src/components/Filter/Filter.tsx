import { useState } from 'react';

import { observer } from 'mobx-react';

import { Button, Header, IconButton, ModalCard, Slider } from '@vkontakte/vkui';
import { Icon20SlidersOutline } from '@vkontakte/icons';

import RepositoriesStore from '@stores/RepositoriesStore.tsx';


const Filter = observer(() => {
    const [ openModal, setOpenModal ] = useState(false);
    const { filterByYearRange, setFilterDates, filterDates } = RepositoriesStore;

    const handleConfirm = () => {
        filterByYearRange(filterDates[0], filterDates[1]);
        setOpenModal(false);
    };

    return (
        <>
            <ModalCard open={openModal} onClose={() => setOpenModal(false)}>
                <div className="w-full">
                    <Header>Фильтр по годам</Header>

                    <Slider multiple
                            max={2025}
                            min={2013}
                            withTooltip
                            className="mt-5"
                            value={filterDates}
                            onChange={(dates) => setFilterDates(dates)}/>

                    <Button size="m"
                            stretched
                            className="!mt-8"
                            onClick={handleConfirm}>
                        Принять
                    </Button>
                </div>
            </ModalCard>

            <IconButton>
                <Icon20SlidersOutline onClick={() => setOpenModal(true)} width={40}/>
            </IconButton>
        </>
    );
});


export { Filter };