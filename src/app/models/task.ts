export interface TaskModel {
    id?: string;
    title: string;
    category: 'Trabajo' | 'Personal' | 'Otro';
    priority: 'high' | 'middle' | 'low';
    dueDate: Date;
    completed: boolean;
}
