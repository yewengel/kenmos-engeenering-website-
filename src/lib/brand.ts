export const brandMedia = {
  logo: '/images/logo.svg',

  hero: {
    image: '/images/hero_building.png',
  },

  about: {
    collage1: '/images/about_collage_1.png',
  },

  // These are kept for compatibility with existing components.
  // Project images for the Projects section are stored separately below.
  projects: {
    zemenBank: '/images/project_zemen.png',
    stadium: '/images/project_stadium.png',
    memorial: '/images/project_memorial.png',
    hilton: '/images/project_hilton.png',
  },

  industries: {
    commercial: '/images/ind_commercial.jpg',
    industrial: '/images/ind_industrial.jpg',
    residential: '/images/ind_residential.jpg',
    institutional: '/images/ind_institutional.jpg',
    hospitality: '/images/ind_hospitality.jpg',
    infrastructure: '/images/ind_infrastructure.jpg',
  },
} as const

export const brand = {
  name: 'Kenmos Structural Engineering',
  shortName: 'Kenmos Engineering',

  founderName: 'Kenmos Tesfaye',
  founderTitle: 'Founder & General Manager',

  tagline: 'Precision in Structure. Confidence in Delivery.',

  signatureLine:
    'Disciplined structural engineering services delivered with technical precision and long-term performance in mind.',

  logoPath: brandMedia.logo,

  phone: '+251 911 526 566',
  phoneHref: 'tel:+251911526566',

  location:
    'Enat Building, 7th Floor, Piazza, Addis Ababa, Ethiopia',

  hours:
    'Mon-Fri: 8:00 AM - 6:00 PM, Sat: 8:00 AM - 12:00 PM',

  email: 'contact@kenmosengineering.com',

  heroRotatingTexts: [
    'Structural engineering practice founded in 2009.',
    'Specialized in reinforced concrete and structural steel design.',
    'Technical oversight on more than 800 completed projects.',
    'Delivered to ASCE, ACI, Eurocode, and Ethiopian code standards.',
  ],

  heroStats: [
    {
      value: '15+',
      label: 'Years of Practice',
      count: 15,
    },
    {
      value: '800+',
      label: 'Projects Delivered',
      count: 800,
    },
    {
      value: '20+',
      label: 'Qualified Engineers',
      count: 20,
    },
    {
      value: '1B+',
      label: 'Birr Project Value',
      count: 1,
    },
  ],
} as const

export const aboutContent = {
  subtitle: 'ABOUT KENMOS',

  title: 'Building the Future with Precision & Integrity',

  paragraphs: [
    'Kenmos Structural Engineering was established in 2009. We deliver structural design and construction supervision for concrete and steel projects throughout Ethiopia and East Africa.',

    'Every design is validated against ASCE, ACI, and Eurocode standards using finite-element analysis. We enforce strict disciplines for structural safety, material efficiency, and long-term durability.',

    'Our founder and lead engineer has directed more than 800 projects over 20 years. We deliver technically sound solutions with disciplined cost control and clear client communication.',
  ],
} as const

export const services = [
  {
    id: 'structural-design',
    title: 'Structural Design',
    description:
      'We engineer reinforced concrete and steel-framed structures for buildings of every scale and complexity.',
    icon: 'Building2',
  },

  {
    id: 'supervision',
    title: 'Construction Supervision',
    description:
      'We conduct site inspections and quality audits to ensure design intent is faithfully executed on site.',
    icon: 'ShieldCheck',
  },

  {
    id: 'project-management',
    title: 'Project Management',
    description:
      'We coordinate design teams, milestones, and budgets to deliver projects on schedule and within scope.',
    icon: 'Briefcase',
  },

  {
    id: 'assessment-retrofitting',
    title: 'Assessment & Retrofitting',
    description:
      'We evaluate existing structures and deliver certified retrofitting plans for structural safety and longevity.',
    icon: 'Activity',
  },

  {
    id: 'tender-boq',
    title: 'Tender & BOQ Preparation',
    description:
      'We produce accurate bills of quantities and tender documentation for transparent procurement.',
    icon: 'FileText',
  },

  {
    id: 'consultancy',
    title: 'Engineering Consultancy',
    description:
      'We provide technical reviews, peer audits, and advisory support for developers and investors.',
    icon: 'Users',
  },
] as const

export const industries = [
  {
    id: 'commercial',
    title: 'Commercial Developments',
    description:
      'Structural designs for high-rise towers, malls, offices, and mixed-use commercial properties.',
    image: '/images/Commercial Developments.jpg',
  },

  {
    id: 'industrial',
    title: 'Industrial & Steel Structures',
    description:
      'Heavy industrial structures, warehouses, factory sheds, and specialized steel construction designs.',
    image: '/images/Industrial & Steel Structures.jpg',
  },

  {
    id: 'residential',
    title: 'Residential Complexes',
    description:
      'Multi-family residential apartments, luxury villas, and real estate housing developments.',
    image: '/images/Residential Complexes.jpg',
  },

  {
    id: 'institutional',
    title: 'Institutional Projects',
    description:
      'Structural design for government buildings, universities, stadiums, and public spaces.',
    image: '/images/Institutional Projects.jpg',
  },

  {
    id: 'hospitality',
    title: 'Hospitality Projects',
    description:
      'Luxury hotel designs, resort structures, and recreational facilities combining luxury with safety.',
    image: '/images/Hospitality Projects.jpg',
  },

  {
    id: 'infrastructure',
    title: 'Infrastructure & Specialized Works',
    description:
      'Bridges, retaining structures, sports complexes, and specialized steel/concrete structures.',
    image: '/images/Infrastructure & Specialized Works.jpg',
  },
] as const

export const projects = [
  {
    id: 'parliament-building',
    title: 'Parliament Building',
    category: 'Institutional',
    description:
      'Owner: House of People Representative. Lead Consultant: Addis Mebratu Consult + 5-7. Status: Under Preliminary Design.',
    image: '/images/Parliament Building.jpg',
  },

  {
    id: 'ethiopian-air-force-sport-center',
    title: 'Ethiopian Air Force Sport Center',
    category: 'Institutional',
    description:
      'Structural engineering services provided by Kenmos Engineering.',
    image: '/images/Ethiopian Air Force Sport Center.jpg',
  },

  {
    id: 'enat-building',
    title: 'Enat Building (Office Building)',
    category: 'Commercial',
    description:
      'Architects: Million Samuel. Structural: Kenmos Engineering. Status: Completed.',
    image: '/images/Enat Building (Office Building).jpg',
  },

  {
    id: 'ellelie-hotel',
    title: 'Ellelie Hotel',
    category: 'Hospitality',
    description:
      'Lead Consultant: Tilahun Bekele. Structural: Kenmos Engineering.',
    image: '/images/Ellelie Hotel.jpg',
  },

  {
    id: 'eliyana-mall-hotel',
    title: 'Eliyana Mall & Hotel',
    category: 'Commercial',
    description:
      'Lead Consultant: Mesfin Architects. Structural: Kenmos Engineering.',
    image: '/images/Eliyana Mall & Hotel.jpg',
  },

  {
    id: 'dh-geda-tower',
    title: 'DH Geda Tower',
    category: 'Commercial',
    description:
      'Lead Consultant: Mesfin Architects. Structural: Kenmos Engineering.',
    image: '/images/DH Geda Tower.jpg',
  },

  {
    id: 'lex-plaza',
    title: 'Lex Plaza',
    category: 'Commercial',
    description:
      'Lead Consultant: Mesfin Architects. Structural: Kenmos Engineering.',
    image: '/images/Lex Plaza.jpg',
  },

  {
    id: 'nigist-tower',
    title: 'Nigist Tower',
    category: 'Commercial',
    description:
      'Lead Consultant: Fasil Georgis. Structural: Kenmos Engineering.',
    image: '/images/Nigist Tower.jpg',
  },

  {
    id: 'medhanialem-mall',
    title: 'Medhanialem Mall',
    category: 'Commercial',
    description:
      'Lead Consultant: Mesfin Architects. Structural: Kenmos Engineering.',
    image: '/images/Medhanialem Mall.jpg',
  },

  {
    id: 'capital-hotel',
    title: 'Capital Hotel',
    category: 'Hospitality',
    description:
      'Lead Consultant: Mesfin Architects. Structural: Kenmos Engineering.',
    image: '/images/Capital Hotel.jpg',
  },

  {
    id: 'athlet-birhane-adere-mall',
    title: 'Athlet Birhane Adere Mall',
    category: 'Commercial',
    description:
      'Lead Consultant: Mesfin Architects. Structural: Kenmos Engineering.',
    image: '/images/Athlet Birhane Adere Mall.jpg',
  },

  {
    id: 'four-points-sheraton',
    title: 'Four Points by Sheraton Hotel (31 Story)',
    category: 'Hospitality',
    description:
      'Lead Consultant: Jdaw Consult. Structural: Kenmos Engineering.',
    image: '/images/Four Points by Sheraton Hotel (31 Story).jpg',
  },

  {
    id: 'ema-office-building',
    title: 'EMA Office Building (25 Story)',
    category: 'Commercial',
    description:
      'Lead Consultant: Geretta Consult. Structural: Kenmos Engineering.',
    image: '/images/EMA Office Building (25 Story).jpg',
  },

  {
    id: 'marriott-hotel-addis-ababa',
    title: 'Marriott Hotel in Addis Ababa',
    category: 'Hospitality',
    description:
      'Structural: Kenmos Engineering.',
    image: '/images/Marriott Hotel in Addis Ababa.jpg',
  },

  {
    id: 'emaysru-hotel-mekele',
    title: 'Emaysru Hotel (Mekele) (25 Story)',
    category: 'Hospitality',
    description:
      'Structural: Kenmos Engineering.',
    image: '/images/Emaysru Hotel (Mekele) (25 Story).jpg',
  },

  {
    id: 'ethiopian-national-theater',
    title: 'Ethiopian National Theater',
    category: 'Institutional',
    description:
      'Lead Consultant: Addis Mebratu. Design Completed.',
    image: '/images/Ethiopian National Theater.jpg',
  },

  {
    id: 'jimma-university-stadium',
    title: 'Jimma University Stadium (40,000 Spectators)',
    category: 'Institutional',
    description:
      'A stadium with a capacity of 40,000 spectators at Jimma University. Status: Under Construction. Structural: Kenmos Engineering.',
    image: '/images/Jimma University Stadium (40,000 Spectators).jpg',
  },

  {
    id: 'adama-university-stadium',
    title: 'Adama University Stadium (20,000 Spectators)',
    category: 'Institutional',
    description:
      'A stadium with a capacity of 20,000 spectators at Adama University. Construction Completed. Structural: Kenmos Engineering.',
    image: '/images/Adama University Stadium (20,000 Spectators).jpg',
  },

  {
    id: 'harar-stadium',
    title: 'Harar Stadium (55,000 Spectators)',
    category: 'Institutional',
    description:
      'A stadium with a capacity of 55,000 spectators. Lead Consultant: Shigez Consult. Structural: Kenmos Engineering.',
    image: '/images/Harar Stadium (55,000 Spectators).jpg',
  },

  {
    id: 'nib-bank',
    title: 'NIB Bank',
    category: 'Commercial',
    description:
      'Status: Under Construction. Structural: Kenmos Engineering.',
    image: '/images/NIB Bank.jpg',
  },

  {
    id: 'zemen-bank',
    title: 'Zemen Bank',
    category: 'Commercial',
    description:
      'Status: Under Construction. Lead Consultant: Jdaw Consult. Structural: Kenmos Engineering.',
    image: '/images/Zemen Bank.jpg',
  },

  {
    id: 'dire-dawa-stadium',
    title: 'Dire Dawa Stadium',
    category: 'Institutional',
    description:
      'Lead Consultant: ETG. Structural: Kenmos Engineering.',
    image: '/images/Dire Dawa Stadium.jpg',
  },

  {
    id: 'zefmesh',
    title: 'Zefmesh',
    category: 'Commercial',
    description:
      'Lead Consultant: Addis Mebratu. Structural: Kenmos Engineering.',
    image: '/images/Zefmesh.jpg',
  },

  {
    id: 'eepco',
    title: 'EEPCO',
    category: 'Infrastructure',
    description:
      'Lead Consultant: MU Engineering PLC. Structural: Kenmos Engineering.',
    image: '/images/EEPCO.jpg',
  },

  {
    id: 'orda',
    title: 'ORDA (25 Story)',
    category: 'Commercial',
    description:
      'Lead Consultant: Geretta Consult. Structural: Kenmos Engineering.',
    image: '/images/ORDA (25 Story).jpg',
  },

  {
    id: 'hilton',
    title: 'Hilton',
    category: 'Hospitality',
    description:
      'Status: Under Design. Structural: Kenmos Engineering.',
    image: '/images/Hilton.jpg',
  },

  {
    id: 'mekele-hotel',
    title: 'Mekele Hotel (28 Story)',
    category: 'Hospitality',
    description:
      'Lead Consultant: Jdaw Consult. Structural: Kenmos Engineering.',
    image: '/images/Mekele Hotel (28 Story).jpg',
  },

  {
    id: 'mixed-use-35-story',
    title: 'Mixed Use Building 5B + G + 35',
    category: 'Commercial',
    description:
      'Owner: Nho Real Estate. Architect: Italian Company.',
    image: '/images/Mixed Use Building 5B + G + 35.jpg',
  },

  {
    id: 'oic-headquarters',
    title: 'OIC Headquarters 4B + G + 40',
    category: 'Institutional',
    description:
      'Lead Consultant: Zeleke Belay.',
    image: '/images/OIC Headquarters 4B + G + 40.jpg',
  },

  {
    id: 'hosea-luxury-apartment',
    title: 'Hosea Luxury Apartment 5B + G + 25',
    category: 'Residential',
    description:
      'Structural Design & Consultancy. Client: Hosae Trading House PLC. Contractor: Bamacon Engineering PLC. Project Status: Under Construction.',
    image: '/images/Hosea Luxury Apartment 5B + G + 25.jpg',
  },

  {
    id: 'manson-arada-luxury-mall',
    title: 'Manson Arada Luxury Mall',
    category: 'Commercial',
    description:
      'Structural Design & Consultancy. Client: MWS Trading PLC. Contractor: China Jiangsu International Economic & Technical Corporation Group Ltd.',
    image: '/images/Manson Arada Luxury Mall.jpg',
  },
] as const

export const processSteps = [
  {
    step: '01',
    title: 'Discovery & Consultation',
    description:
      'We meet clients and architects to define project scope, budget, constraints, and delivery timeline.',
  },

  {
    step: '02',
    title: 'Structural Analysis & Design',
    description:
      'We apply finite-element analysis and code-compliant modelling to produce robust structural systems.',
  },

  {
    step: '03',
    title: 'Value Engineering',
    description:
      'We refine materials and detailing to optimize cost without compromising structural performance.',
  },

  {
    step: '04',
    title: 'Construction Supervision',
    description:
      'Our engineers inspect site works at each phase to verify compliance with design intent.',
  },
] as const

export const teamMembers = [
  {
    name: 'Kenmos Tesfaye',
    role: 'Founder & General Manager',
    bio:
      'Leads the practice with 20 years of structural design and construction supervision across 800+ projects.',
    location: 'Addis Ababa Office',
  },

  {
    name: 'Senior Structural Engineer',
    role: 'Senior Structural Engineer',
    bio:
      'Oversees structural analysis, design development, and engineering quality assurance.',
    location: 'Addis Ababa Office',
  },

  {
    name: 'CAD Technician Team',
    role: 'CAD Technicians',
    bio:
      'Produces detailed structural drawings and documentation aligned with project specifications.',
    location: 'Addis Ababa Office',
  },
] as const

export const testimonials = [
  {
    quote:
      'Kenmos Engineering delivered structurally sound designs with clear documentation and consistent communication.',
    name: 'Project Client',
    role: 'Building Developer',
    rating: 5,
  },

  {
    quote:
      'Their team provided dependable engineering support throughout design and construction phases.',
    name: 'Architect Partner',
    role: 'Design Consultant',
    rating: 5,
  },

  {
    quote:
      'Strong technical discipline. Clear reporting. Reliable supervision on site at every phase.',
    name: 'Construction Partner',
    role: 'Contractor',
    rating: 5,
  },
] as const