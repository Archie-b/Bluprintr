export interface service<T>{
  add(item:T): boolean;
  getAll(): T[];
  get(id: string): T;
}
