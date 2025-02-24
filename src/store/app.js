import {createStore} from 'zustand/vanilla';

const store = createStore((set) => ({
  employees: [],
  loadEmployees: () => set((state) => ({employees: state.employees})),
}));

export default store;
