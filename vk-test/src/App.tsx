import './App.css';

import { AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import { Panel } from '@components/Panel/Panel';
import { RepositoriesList } from '@components/RepositoriesList/RepositoriesList.tsx';


function App() {

    return (
        <AppRoot>
            <Panel/>
            <div className="max-w-[1200px] m-auto">
                <RepositoriesList/>
            </div>
        </AppRoot>
    );
}

export default App;
