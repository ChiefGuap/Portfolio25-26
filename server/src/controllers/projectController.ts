import { Request, Response, NextFunction } from 'express';

// Mock data for projects
const projects = [
  {
    id: 1,
    title: "HIKE: AI-powered Trade & Draft Chatbot",
    description: "Built a conversational agent with LangChain's RAG pipeline to deliver personalized draft and trade guidance for Fantasy Football & Basketball. Engineered time-series analysis in Statsmodels on five seasons of data to automate weekly ARIMA projections for player performance. Leveraged FAISS on LLM embeddings for sentiment analysis over sports news and injury reports to enrich recommendations. Developed a low-latency Streamlit frontend for chat interactions. Won 1st Place in the 2024 Winter Quarter ASA Case Competition.",
    tech: ["Python", "LangChain", "Statsmodels", "Streamlit", "FAISS"],
    liveUrl: null,
    githubUrl: null,
    image: "🤖",
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-03-31')
  },
  {
    id: 2,
    title: "Brain Cancer Detection",
    description: "Engineered a hybrid CNN architecture that achieved 93% test accuracy across four classes of brain tumors from a dataset of 7,000+ MRI images. Conducted extensive image preprocessing and engineered domain-specific features like tumor contour area and pixel intensity to concatenate with CNN embeddings. Developed a React/Flask web application for real-time MRI upload, prediction, and result visualization.",
    tech: ["Python", "OpenCV", "TensorFlow", "Flask", "React"],
    liveUrl: null,
    githubUrl: null,
    image: "🧠",
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-06-30')
  },
  {
    id: 3,
    title: "NBA2k25: Draft Analyzer",
    description: "Developed a full-stack web application using Flask for the REST API and React for the frontend. Implemented a mock draft board that streams live player updates, leveraging historical draft patterns, player biometrics, league data, and Twitter sentiment analysis to create an interactive UI with player rankings and projected draft slots. Scraped NBA.com and other prospect sites to create clean CSV datasets for analysis.",
    tech: ["Python", "Flask", "React", "Pandas", "BeautifulSoup"],
    liveUrl: null,
    githubUrl: null,
    image: "🏀",
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-06-30')
  },
  {
    id: 4,
    title: "Aggie Access",
    description: "A course recommendation and degree tracking tool built for the SacHacks hackathon. Built a TF-IDF and cosine-similarity pipeline in Scikit-learn to recommend courses based on semantic similarity. Developed a React/Next.js frontend to display personalized course suggestions, real-time unit tracking, and requirement fulfillment, achieving a 4.2/5 user satisfaction score. Integrated Flask/FastAPI backend APIs with Supabase for storing user data.",
    tech: ["Python", "Scikit-learn", "Flask", "FastAPI", "React", "Next.js", "Supabase"],
    liveUrl: null,
    githubUrl: null,
    image: "🎓",
    createdAt: new Date('2025-03-01'),
    updatedAt: new Date('2025-03-31')
  },
  {
    id: 5,
    title: "Product Space",
    description: "Built website for the 2025-26 product space school year",
    tech: ["React", "TypeScript", "Styled Components", "Node.js"],
    liveUrl: "davisproductspace.org",
    githubUrl: null,
    image: "🚀",
    createdAt: new Date('2025-10-04'),
    updatedAt: new Date('2025-10-04')
  },
  {
    id: 6,
    title: "BaddiCoach: AI Badminton Trainer",
    description: "A live training coach and player-development dashboard for the UC Davis Badminton Club that drove a 15% increase in match win rates. The tool uses Yolov8 for shuttlecock and pose detection to correct shot form and enhance gameplay. It is paired with a Gemini chatbot to give users real-time feedback and coaching based on their uploaded gameplay. The project involved leading a cross-functional team, running user interviews, and building high-fidelity A/B prototypes in Figma.",
    tech: ["Python", "Yolov8", "Gemini", "Figma", "Jira"],
    liveUrl: null,
    githubUrl: null,
    image: "🏸",
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2025-10-04')
  }
];

// GET /api/projects - Get all projects
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/projects/:id - Get a specific project
export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = parseInt(req.params.id);
    const project = projects.find(p => p.id === projectId);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/projects - Create a new project
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, tech, liveUrl, githubUrl, image } = req.body;

    // Basic validation
    if (!title || !description || !tech) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and tech stack are required'
      });
    }

    const newProject = {
      id: Math.max(...projects.map(p => p.id)) + 1,
      title,
      description,
      tech,
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
      image: image || '🚀',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    projects.push(newProject);

    res.status(201).json({
      success: true,
      data: newProject
    });
  } catch (error) {
    next(error);
  }
};

// PUT /api/projects/:id - Update a project
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = parseInt(req.params.id);
    const projectIndex = projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const { title, description, tech, liveUrl, githubUrl, image } = req.body;

    // Update project
    projects[projectIndex] = {
      ...projects[projectIndex],
      title: title || projects[projectIndex].title,
      description: description || projects[projectIndex].description,
      tech: tech || projects[projectIndex].tech,
      liveUrl: liveUrl !== undefined ? liveUrl : projects[projectIndex].liveUrl,
      githubUrl: githubUrl !== undefined ? githubUrl : projects[projectIndex].githubUrl,
      image: image || projects[projectIndex].image,
      updatedAt: new Date()
    };

    res.status(200).json({
      success: true,
      data: projects[projectIndex]
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/projects/:id - Delete a project
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projectId = parseInt(req.params.id);
    const projectIndex = projects.findIndex(p => p.id === projectId);

    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    const deletedProject = projects.splice(projectIndex, 1)[0];

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: deletedProject
    });
  } catch (error) {
    next(error);
  }
};
