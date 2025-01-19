import { observer } from 'mobx-react-lite';

import { If } from 'react-if';

import PageStore from '@stores/PageStore.tsx';

import { Filter } from '@components/Filter/Filter.tsx';

import { IconButton, PanelHeader } from '@vkontakte/vkui';
import { Icon20MoonOutline, Icon20SunOutline } from '@vkontakte/icons';


const Panel = observer(() => {

    const handleChangeLightScheme = () => {
        PageStore.changeColorScheme('light');
    };

    const handleChangeDarkScheme = () => {
        PageStore.changeColorScheme('dark');
    };

    const after = (
        <div className="flex gap-5 items-center pr-3">
            <div>
                <If condition={PageStore.colorScheme === 'light'}>
                    <IconButton onClick={handleChangeDarkScheme}>
                        <Icon20SunOutline width={40}/>
                    </IconButton>
                </If>

                <If condition={PageStore.colorScheme === 'dark'}>
                    <IconButton onClick={handleChangeLightScheme}>
                        <Icon20MoonOutline width={40}/>
                    </IconButton>
                </If>
            </div>

            <Filter/>
        </div>
    );

    return (
        <PanelHeader after={after}>
            Список репозиториев на GitHub
        </PanelHeader>
    );
});

export { Panel };