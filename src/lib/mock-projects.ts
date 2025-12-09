
export const MOCK_PROJECTS = [
  {
    id: "1",
    title: "Neon City Racer",
    description: "A high-speed cyberpunk racing game built with Three.js and React Three Fiber. Features multiplayer mode and custom vehicle customization.",
    author: {
      name: "CyberDrift",
      avatar: "bg-red-500",
      level: 42
    },
    techStack: ["React", "Three.js", "WebSockets"],
    likes: 1240,
    comments: 85,
    views: 5400,
    image: "/project-thumbnails/racing.jpg", // Placeholder path
    category: "Game Dev"
  },
  {
    id: "2",
    title: "AI Code Assistant",
    description: "An intelligent code completion tool using OpenAI API. Integrated directly into the browser for real-time suggestions.",
    author: {
      name: "DevMind",
      avatar: "bg-blue-500",
      level: 38
    },
    techStack: ["Next.js", "OpenAI", "Tailwind"],
    likes: 890,
    comments: 42,
    views: 3200,
    image: "/project-thumbnails/ai.jpg",
    category: "AI/ML"
  },
  {
    id: "3",
    title: "DeFi Crypto Tracker",
    description: "Real-time cryptocurrency portfolio tracker with advanced charting and predictive analytics using machine learning models.",
    author: {
      name: "CryptoKing",
      avatar: "bg-green-500",
      level: 55
    },
    techStack: ["Vue.js", "D3.js", "Firebase"],
    likes: 2100,
    comments: 156,
    views: 12000,
    image: "/project-thumbnails/crypto.jpg",
    category: "FinTech"
  },
  {
    id: "4",
    title: "Retro Arcade Hub",
    description: "A collection of classic arcade games re-imagined for the web. Includes Pac-Man, Space Invaders, and Pong with a modern twist.",
    author: {
      name: "PixelArtisan",
      avatar: "bg-yellow-500",
      level: 29
    },
    techStack: ["Phaser.js", "TypeScript", "Node.js"],
    likes: 670,
    comments: 30,
    views: 2800,
    image: "/project-thumbnails/arcade.jpg",
    category: "Game Dev"
  },
  {
    id: "5",
    title: "TaskMaster Pro",
    description: "A gamified productivity app that turns your daily to-do list into an RPG quest. Earn XP and level up as you complete tasks.",
    author: {
      name: "ProductivityGuru",
      avatar: "bg-purple-500",
      level: 33
    },
    techStack: ["React Native", "Redux", "GraphQL"],
    likes: 1500,
    comments: 98,
    views: 6500,
    image: "/project-thumbnails/task.jpg",
    category: "Productivity"
  },
  {
    id: "6",
    title: "EcoTrack",
    description: "Mobile app for tracking carbon footprint and suggesting eco-friendly lifestyle changes. Connects with smart home devices.",
    author: {
      name: "GreenEarth",
      avatar: "bg-emerald-500",
      level: 25
    },
    techStack: ["Flutter", "Dart", "AWS"],
    likes: 950,
    comments: 65,
    views: 4100,
    image: "/project-thumbnails/eco.jpg",
    category: "Mobile App"
  },
   {
    id: "7",
    title: "Neural Network Visualizer",
    description: "Interactive tool to visualize and understand how neural networks learn. Great for educational purposes.",
    author: {
      name: "BrainWave",
      avatar: "bg-pink-500",
      level: 48
    },
    techStack: ["Python", "TensorFlow.js", "React"],
    likes: 1800,
    comments: 110,
    views: 7800,
    image: "/project-thumbnails/neural.jpg",
    category: "AI/ML"
  },
  {
    id: "8",
    title: "Space Exploration VR",
    description: "Virtual reality experience exploring the solar system. Compatible with Oculus and specialized web browsers.",
    author: {
      name: "StarGazer",
      avatar: "bg-indigo-500",
      level: 60
    },
    techStack: ["A-Frame", "WebXR", "Blender"],
    likes: 3200,
    comments: 240,
    views: 15000,
    image: "/project-thumbnails/space.jpg",
    category: "VR/AR"
  }
];

export const CATEGORIES = ["All", "Game Dev", "AI/ML", "Web App", "Mobile App", "FinTech", "VR/AR", "Productivity"];
