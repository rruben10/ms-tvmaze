interface ISearchResult {
    show: {
        id: number;
        name: string;
        genres: string[];
        network: null;
        webChannel: {
            id: number;
            name: string;
            country: null | {
                name: string;
                code: string;
                timezone: string;
            };
            officialSite: string;
        };
        summary: string;
        updated: number;
    };
}

export default ISearchResult;