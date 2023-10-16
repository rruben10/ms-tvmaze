interface IShowResult {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    ended: string;
    officialSite: string;
    schedule: {
        time: string;
        days: string[];
    };
    rating: {
        average: number;
    };
    weight: number;
    network: {
        id: number;
        name: string;
        country: {
            name: string;
            code: string;
            timezone: string;
        };
        officialSite: string;
    };
    webChannel: null | {
        id: number;
        name: string;
        country: null | {
            name: string;
            code: string;
            timezone: string;
        };
        officialSite: string;
    };
    dvdCountry: null | string;
    externals: {
        tvrage: number;
        thetvdb: number;
        imdb: string;
    };
    image: {
        medium: string;
        original: string;
    };
    summary: string;
    updated: number;
    _links: {
        self: {
            href: string;
        };
        previousepisode: {
            href: string;
        };
    };
    comments: null | {
        //id: number,
        comment: string,
        rating: number
    };
}

export default IShowResult;