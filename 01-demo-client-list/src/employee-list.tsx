import { useMemo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { useColorScheme } from "@mui/material/styles";
import { employees, departments, type Employee } from "./data";

const statusColor: Record<Employee["status"], "success" | "warning" | "error"> =
  {
    Activo: "success",
    Vacaciones: "warning",
    Baja: "error",
  };

const currency = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

export function EmployeeList() {
  const { mode, setMode } = useColorScheme();
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("Todos");
  const [status, setStatus] = useState("Todos");

  const filtered = useMemo(
    () =>
      employees.filter(
        (employee) =>
          (search === "" ||
            employee.name.toLowerCase().includes(search.toLowerCase()) ||
            employee.email.toLowerCase().includes(search.toLowerCase())) &&
          (department === "Todos" || employee.department === department) &&
          (status === "Todos" || employee.status === status),
      ),
    [search, department, status],
  );

  const clearFilters = () => {
    setSearch("");
    setDepartment("Todos");
    setStatus("Todos");
  };

  return (
    <div className="min-h-screen bg-background">
      <AppBar position="static" elevation={0}>
        <Toolbar className="gap-4">
          <Typography variant="h6" component="h1" className="grow">
            Acme · Recursos Humanos
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Cambiar modo claro/oscuro"
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          >
            {mode === "dark" ? "☀️" : "🌙"}
          </IconButton>
        </Toolbar>
      </AppBar>

      <main className="mx-auto flex max-w-6xl flex-col gap-6 p-6">
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <Typography variant="h5" component="h2" className="font-medium">
              Empleados
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Gestiona la plantilla, filtra por departamento o estado.
            </Typography>
          </div>
          <Chip
            label={`${filtered.length} de ${employees.length} empleados`}
            color="primary"
          />
        </header>

        <Paper
          variant="outlined"
          className="flex flex-wrap items-center gap-4 p-4"
        >
          <TextField
            label="Buscar"
            placeholder="Nombre o email…"
            size="small"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="min-w-56 grow"
          />
          <TextField
            label="Departamento"
            select
            size="small"
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
            className="w-44"
          >
            <MenuItem value="Todos">Todos</MenuItem>
            {departments.map((dept) => (
              <MenuItem key={dept} value={dept}>
                {dept}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Estado"
            select
            size="small"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-40"
          >
            {["Todos", "Activo", "Vacaciones", "Baja"].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={clearFilters}>Limpiar filtros</Button>
        </Paper>

        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Empleado</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha de alta</TableCell>
                <TableCell align="right">Salario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell>
                    <div className="flex items-center gap-3 py-1">
                      <Avatar className="bg-primary text-sm">
                        {employee.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </Avatar>
                      <div>
                        <Typography variant="body2" className="font-medium">
                          {employee.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          component="p"
                          color="text.secondary"
                        >
                          {employee.email}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <Chip
                      label={employee.status}
                      color={statusColor[employee.status]}
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(employee.hireDate).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell align="right" className="tabular-nums">
                    {currency.format(employee.salary)}
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Typography
                      variant="body2"
                      align="center"
                      color="text.secondary"
                      className="py-8"
                    >
                      No hay empleados que cumplan los filtros.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </main>
    </div>
  );
}
