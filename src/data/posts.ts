import type {Post} from '../types';

export const posts: Post[] = [
    {
        id: '1',
        title: 'First post',
        excerpt: "There is a time when you feel the inspiration flowing. It feel quite good to act on it. " +
            "In this case, it's setting up my website. In the future, I will post about various topics on this blog. " +
            "For now, that all there is in here.",
        date: '2026-04-04',
        tag: 'Inspiration',
    },
    {
        id: '2',
        title: 'Tool for seedling preparation',
        excerpt: `
          This year, I wanted to start growing some vegetable in my garden. 
          I went quite overboard and bought many different seed types, up to now, I've been keeping track of them in a notepad... 
          The system started to fall apart when I moved some of the plants that grew to big and needed to be moved to a bigger pot...
          I'm pretty sure I made some mistakes and mixed some species with a few wrong copy pastes.
          So I've decided to build my own tool to manage my seedlings and keep track of how many of each species I have and 
          need to grow before I need to plant them in the garden. The tool might evolve a bit, I've got a few additional ideas, 
          for now, it does the job.   
        `,
        date: '2026-04-05',
        tag: 'Tool',
    }

];