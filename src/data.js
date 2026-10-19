export const GITHUB = 'https://github.com/abdulazimkhan26';
export const LINKEDIN = 'https://linkedin.com/in/abdulazimkhan01';
export const EMAIL = 'aakstackdev@gmail.com';

export const navLinks = [
  ['about', 'About'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['experience', 'Experience'],
  ['contact', 'Contact'],
];

export const phrases = [
  'AI Software Engineer',
  'Workflow automation with n8n',
  'Full-stack: Next.js + Express',
  'Computer vision with YOLO',
];

export const tickerItems = ['Spring Boot', 'Next.js', 'Express', 'n8n', 'PostgreSQL', 'Keycloak', 'Docker', 'YOLOv8', 'Detectron2', 'TypeScript', 'Python', 'Rust'];

export const stats = [
  ['Projects built', 7, '+'],
  ['Detection accuracy', 87, '%'],
  ['Languages shipped', 6, '+'],
];

export const crewFile = [
  ['Base', 'Kuala Lumpur, Malaysia'],
  ['Now', 'AI Software Engineer, Rakyat Fintech Sdn Bhd'],
  ['Degree', 'BSc Computer Science (Data Analytics), Asia Pacific University'],
  ['Focus', 'Automation, full-stack web, computer vision'],
];

export const bars = [
  ['SQL / PostgreSQL', 95],
  ['Java / Spring Boot', 90],
  ['Python', 90],
  ['C# / ASP.NET', 85],
  ['JavaScript / TypeScript', 72],
];

export const stacks = [
  ['Backend & automation', ['Spring Boot 3', 'Express.js', 'ASP.NET', 'n8n', 'REST APIs', 'JWT auth', 'Microservices', 'JPA / Hibernate']],
  ['Frontend', ['Next.js 14', 'React', 'TypeScript', 'Tailwind CSS', 'Flutter']],
  ['Data & ML', ['YOLOv8L', 'Detectron2', 'Deep learning', 'NLP', 'Data analytics']],
  ['Infra & identity', ['PostgreSQL', 'Docker', 'Keycloak', 'RBAC', 'Supabase', 'Git / GitHub', 'Rust']],
];

export const projects = [
    {
    feature: true, i: 1, status: 'Active development',
    title: 'Bank Statement Analayser',
    desc: 'Bank Statement Analyser that extracts and analyses bank transaction data, categorises income and expenses, and generates financial summaries to help users track spending patterns and understand their financial health.',
    flow: [['Bank Statement', 'User'], ['Doctr/PyTesseract', 'OCR'], ['Python', 'API'], ['PostgreSQL', 'Transaction HIstory'], ['Next.js', 'Banker']],
    chips: ['Python', 'Next.js', 'PostgreSQL'],
  },
  {
    feature: true, i: 2, meta: 'AI Application',
    title: 'Banker Portal',
    desc: 'Operations portal for loan agents at Rakyat Fintech. Applicants apply over WhatsApp, n8n routes their messages, and bankers check eligibility, chat with the team and manage cases behind Keycloak role-based access.',
    flow1: [['WhatsApp', 'Applicant'], ['n8n', 'Routing'], ['Express', 'API'], ['PostgreSQL', 'Cases'], ['Next.js', 'Banker']],
    chips: ['Express', 'Next.js', 'PostgreSQL', 'Keycloak', 'n8n', 'WhatsApp Cloud API', 'RBAC'],
  },
  {
    i: 3, meta: 'Final-year project', href: GITHUB, label: 'Pothole Detection on GitHub',
    title: 'Pothole Detection AI',
    desc: 'Road-damage detection with YOLO and Detectron2 that reached 87% accuracy, aimed at automated road infrastructure monitoring.',
    chips: ['YOLO', 'Detectron2', 'Python'],
  },
  {
    i: 4, meta: 'Payments', href: `${GITHUB}/pluspay_propick`, label: 'PlusPay ProPick on GitHub',
    title: 'PlusPay ProPick',
    desc: 'Payment and order processing service built around clean architecture and reliable transaction handling.',
    chips: ['Java', 'Spring Boot', 'PostgreSQL'],
  },
];

export const alsoOnGithub = [
  ['NLP Text Classifier', GITHUB],
  ['Rust Embedded Systems', GITHUB],
  ['Furniture Sales Orders', `${GITHUB}/furnitureSalesORder_mngmentSys`],
  ['Segi Cafe Management', `${GITHUB}/Segi_CafeManagementSystem`],
];

export const timeline = [
  {
    when: 'Now', now: true, type: 'Work', title: 'AI Software Engineer', org: 'Rakyat Fintech Sdn Bhd',
    points: [
      'Building AI-powered chatbots and workflow automation with n8n',
      'Developing full-stack web apps with Next.js, Express and PostgreSQL',
      'Implementing authentication and identity management with Keycloak',
      'Containerising and deploying services with Docker',
    ],
  },
  {
    when: '2026', type: 'Work', title: 'Junior Software Developer', org: 'HSS Propick Technologies',
    points: [
      'Developed an HRMS for internal HR operations',
      'Built an FFB detection system with YOLOv8L for palm farm monitoring',
      'Worked across backend services and ML pipelines',
    ],
  },
  {
    when: '2024', type: 'Work', title: 'Software Developer Intern', org: 'Probyte Solutions Sdn Bhd',
    points: [
      'Built HRMS, visitor management and payroll systems',
      'Stack: C#/ASP.NET, PostgreSQL, Python',
      'Owned features end to end, from database to UI',
    ],
  },
  {
    when: '2024', type: 'Education', title: 'BSc Computer Science', org: 'Asia Pacific University (APU), Kuala Lumpur',
    points: [
      'Specialisation in Data Analytics',
      'Final-year project: pothole detection with YOLO and Detectron2',
    ],
  },
];
