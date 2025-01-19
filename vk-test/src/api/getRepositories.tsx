export interface Repositories {
    id: number;
    name: string;
    owner: Owner;
    created_at: string;
}

interface Owner {
    html_url: string;
    login: string;
    avatar_url: string;
}

const getRepositories = async (
    page: number,
): Promise<Repositories[]> => {
    const response = await fetch(
        import.meta.env.VITE_REPOSITORIES_URL + page,
    );

    const data = await response.json();
    return data.items;
};

export { getRepositories };