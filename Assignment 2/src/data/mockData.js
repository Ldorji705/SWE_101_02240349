export const subjects = [
  { id: '1', name: 'CTE 205', color: '#6C63FF', progress: 72, tasks: 12, completed: 9 },
  { id: '2', name: 'DIS 303', color: '#FF6584', progress: 45, tasks: 8,  completed: 4 },
  { id: '3', name: 'DSO 101', color: '#43C6AC', progress: 60, tasks: 10, completed: 6 },
  { id: '4', name: 'SDA 202', color: '#F7971E', progress: 88, tasks: 6,  completed: 5 },
  { id: '5', name: 'SWE 201', color: '#ee0979', progress: 30, tasks: 14, completed: 4 },
  { id: '6', name: 'MAT 205', color: '#11998e', progress: 95, tasks: 20, completed: 19 },
];

export const tasks = [
  { id: '1', title: 'Calculus Assignment',  subject: 'MAT 205', due: 'Today',    priority: 'high',   done: false },
  { id: '2', title: 'Read Chapter 5',       subject: 'DIS 303',     due: 'Tomorrow', priority: 'medium', done: false },
  { id: '3', title: 'Lab Report Draft',     subject: 'DSO 101',   due: 'Wed',      priority: 'high',   done: true  },
  { id: '4', title: 'UML structural diagram ',        subject: 'SDA 202',  due: 'Thu',      priority: 'low',    done: false },
  { id: '5', title: 'Problem Set 3',        subject: 'CTE 205', due: 'Fri',      priority: 'medium', done: false },
  { id: '6', title: 'Thermodynamics Notes', subject: 'DIS 303',     due: 'Next Mon', priority: 'low',    done: true  },
  { id: '7', title: 'Assigment 2',     subject: 'SWE 201',     due: 'Today',    priority: 'high',   done: false },
  { id: '8', title: 'Code Review Exercise', subject: 'SWE 201', due: 'Tomorrow', priority: 'medium', done: false },
];

export const userProfile = {
  name: 'Lhundup Dorji',
  year: '2nd Year',
  university: 'CST',
  streak: 14,
  totalPoints: 3240,
  rank: 'Gold Scholar',
};

export const stats = {
  tasksCompletedThisWeek: 11,
  studyHoursThisWeek: 18,
  overallProgress: 65,
  topSubject: 'Computer Sc',
};