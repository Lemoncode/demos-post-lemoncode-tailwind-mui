export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  status: "Activo" | "Vacaciones" | "Baja";
  hireDate: string;
  salary: number;
}

export const departments = [
  "Desarrollo",
  "Diseño",
  "Ventas",
  "RRHH",
  "Finanzas",
];

export const employees: Employee[] = [
  {
    id: 1,
    name: "Lucía Fernández",
    email: "lucia.fernandez@acme.com",
    department: "Desarrollo",
    status: "Activo",
    hireDate: "2019-03-11",
    salary: 42000,
  },
  {
    id: 2,
    name: "Carlos Méndez",
    email: "carlos.mendez@acme.com",
    department: "Diseño",
    status: "Vacaciones",
    hireDate: "2021-06-01",
    salary: 35000,
  },
  {
    id: 3,
    name: "Ana Torres",
    email: "ana.torres@acme.com",
    department: "Ventas",
    status: "Activo",
    hireDate: "2018-01-22",
    salary: 38500,
  },
  // ...añade las filas que quieras (en el repo tienes 10)
];
