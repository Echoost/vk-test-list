import { useState } from 'react';

import { Avatar, FormItem, IconButton, Input, SimpleCell } from '@vkontakte/vkui';
import { Icon20Cancel, Icon20Check, Icon20TrashSimpleOutline, Icon20WriteOutline } from '@vkontakte/icons';

import { If } from 'react-if';


interface Props {
    key: number;
    name: string;
    link: string;
    avatarUrl: string;
    handleDelete: () => void;
}


const RepositoryCard = (props: Props) => {
    const { key, name, link, avatarUrl, handleDelete } = props;

    const [ isEditing, setEditing ] = useState(false);
    const [ inputValue, setInputValue ] = useState(name);

    return (
        <SimpleCell key={key}
                    before={
                        <a href={link}>
                            <Avatar src={avatarUrl}/>
                        </a>
                    }
                    after={
                        <div className="flex gap-4">
                            <IconButton onClick={() => setEditing(true)}>
                                <Icon20WriteOutline width={44}/>
                            </IconButton>
                            <IconButton onClick={handleDelete}>
                                <Icon20TrashSimpleOutline width={44}/>
                            </IconButton>
                        </div>
                    }>
            <If condition={!isEditing}>
                {inputValue}
            </If>

            <If condition={isEditing}>
                <FormItem top="Изменить название">
                    <div className="flex gap-3 items-center">
                        <Input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>

                        <div className="flex gap-3">
                            <IconButton>
                                <Icon20Check width={44} onClick={() => setEditing(false)}/>
                            </IconButton>

                            <IconButton>
                                <Icon20Cancel width={44} onClick={() => setEditing(false)}/>
                            </IconButton>
                        </div>
                    </div>
                </FormItem>
            </If>
        </SimpleCell>
    );
};

export { RepositoryCard };