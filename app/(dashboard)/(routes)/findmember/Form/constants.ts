
interface Option {
    value: string;
    label: string;
}

type SkillOptions = Option[];

export const hackathonModes = ["Online", "Offline", "Hybrid"];

export const options: SkillOptions = [
    { value: 'Javascript', label: 'Javascript' },
    { value: 'Python', label: 'Python' },
    { value: 'React JS', label: 'React JS' }, 
    { value: 'Next JS', label: 'Next JS' }, 
    { value: 'MongoDB', label: 'MongoDB' }, 
    { value: 'SQL', label: 'SQL' }
];

export const ExperienceOptions = [
    { value: 'Beginner (0-1 years)', label: 'Beginner (0-1 years)' }, 
    { value: 'Intermediate (1-2 years)', label: 'Intermediate (1-2 years)' }, 
    { value: 'Expert (2+ years)', label: 'Expert (2+ years)' }
];
