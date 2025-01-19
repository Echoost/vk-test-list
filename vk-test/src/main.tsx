import { createRoot } from 'react-dom/client';

import { observer } from 'mobx-react-lite';

import './index.css';
import App from './App.tsx';

import { AdaptivityProvider, ConfigProvider } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import PageStore from '@stores/PageStore.tsx';




const container = document.getElementById('root');
const root = createRoot(container!);

const AppWrapper = observer(() => (
    <ConfigProvider colorScheme={PageStore.colorScheme}>
        <AdaptivityProvider>
            <App/>
        </AdaptivityProvider>
    </ConfigProvider>
));

root.render(<AppWrapper/>);