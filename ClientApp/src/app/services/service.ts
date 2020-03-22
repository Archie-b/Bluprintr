export interface IService<T>{
  add(item:T);
  getAll();
  get(id: string);
}
