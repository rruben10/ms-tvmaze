interface ISearchResult {
    show: {
        id: number;
        name: string;
        genres: string[];
        network: null | {
            id: number;
            name: string;
            country: {
                name: string;
                code: string;
                timezone: string;
            };
            officialSite: string;
        };
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
        comments: null | {
            comment: string,
            rating: number
        };
    };
}

export default ISearchResult;