
export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
  likes: number;
  comments: number;
  imageUrl?: string; // Added optional image URL
  translatedContent?: {
    text: string;
    language: string;
  };
}

// Sample users
export const users: User[] = [
  {
    id: "1",
    name: "Marie Dubois",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "2",
    name: "Jean Martin",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: "3",
    name: "Sophie Laurent",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: "4",
    name: "Thomas Petit",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

// Sample posts
export const initialPosts: Post[] = [
  {
    id: "1",
    userId: "1",
    content: "Bonjour à tous ! Je suis très heureux de partager cette journée avec vous.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    likes: 15,
    comments: 3,
  },
  {
    id: "2",
    userId: "2",
    content: "Je viens de terminer mon nouveau projet et je suis très satisfait du résultat !",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    likes: 24,
    comments: 5,
  },
  {
    id: "3",
    userId: "3",
    content: "Quelle belle journée pour une promenade dans le parc ! Le soleil brille et les oiseaux chantent.",
    imageUrl: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    likes: 32,
    comments: 7,
  },
  {
    id: "4",
    userId: "4",
    content: "Je viens de découvrir un excellent restaurant près de chez moi. Je vous le recommande vivement !",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 10),
    likes: 18,
    comments: 4,
  },
  {
    id: "5",
    userId: "1",
    content: "Aujourd'hui, j'ai commencé à apprendre une nouvelle langue. C'est difficile mais passionnant !",
    imageUrl: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1024",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    likes: 21,
    comments: 6,
  },
];

// Find user by ID
export const getUserById = (userId: string): User => {
  return users.find(user => user.id === userId) || users[0];
};

// Format date
export const formatDate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days} ${days === 1 ? 'jour' : 'jours'}`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? 'heure' : 'heures'}`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
  } else {
    return `${seconds} ${seconds === 1 ? 'seconde' : 'secondes'}`;
  }
};
