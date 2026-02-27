export type ProjectStatus = 'In Progress' | 'Completed' | 'On Hold' | 'Archived';

export interface Project {
    id: string;
    name: string;
    description: string;
    client: string;
    status: ProjectStatus;
    startDate: string;
    endDate?: string;
    budget: number;
    assignedTalentCount: number;
    priority: 'Low' | 'Medium' | 'High';
}

export const projects: Project[] = [
    {
        id: 'P1',
        name: 'Apollo Replatforming',
        description: 'Migrating legacy e-commerce platform to Next.js and Microservices.',
        client: 'Starlight Retail',
        status: 'In Progress',
        startDate: '2024-01-15',
        budget: 250000,
        assignedTalentCount: 8,
        priority: 'High',
    },
    {
        id: 'P2',
        name: 'FinSafe AI Audit',
        description: 'Implementing automated risk assessment using machine learning.',
        client: 'Global Finance Corp',
        status: 'In Progress',
        startDate: '2024-02-10',
        budget: 180000,
        assignedTalentCount: 5,
        priority: 'High',
    },
    {
        id: 'P3',
        name: 'Zion Mobile App',
        description: 'Developing a cross-platform fitness tracking application.',
        client: 'Zion Wellness',
        status: 'On Hold',
        startDate: '2023-11-20',
        budget: 95000,
        assignedTalentCount: 3,
        priority: 'Medium',
    },
    {
        id: 'P4',
        name: 'CloudSync Infrastructure',
        description: 'Multi-cloud strategy and implementation for global data synchronization.',
        client: 'DataFlow Inc.',
        status: 'Completed',
        startDate: '2023-08-05',
        endDate: '2024-02-28',
        budget: 320000,
        assignedTalentCount: 12,
        priority: 'High',
    },
    {
        id: 'P5',
        name: 'Nexus UI Kit',
        description: 'Standardizing UI components across all enterprise applications.',
        client: 'Internal Project',
        status: 'In Progress',
        startDate: '2024-03-01',
        budget: 45000,
        assignedTalentCount: 4,
        priority: 'Low',
    },
    {
        id: 'P6',
        name: 'Aries Payment Gateway',
        description: 'Building a secure, PCI-compliant payment processing system.',
        client: 'PaySafe Group',
        status: 'In Progress',
        startDate: '2024-01-30',
        budget: 150000,
        assignedTalentCount: 6,
        priority: 'High',
    },
    {
        id: 'P7',
        name: 'Titan Data Pipeline',
        description: 'Optimizing real-time analytics for high-volume transactions.',
        client: 'BigData Solutions',
        status: 'Completed',
        startDate: '2023-06-15',
        endDate: '2023-12-20',
        budget: 210000,
        assignedTalentCount: 9,
        priority: 'Medium',
    }
];
