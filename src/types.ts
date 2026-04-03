export interface Post {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    tag: string;
}

export interface Tool {
    id: string;
    name: string;
    description: string;
    icon: string;
    status: 'live' | 'soon';
    path: string;
}