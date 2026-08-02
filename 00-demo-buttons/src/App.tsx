import Button from "@mui/material/Button";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <Button variant="contained">Botón MUI normal</Button>
      <Button variant="contained" className="bg-emerald-600">
        Botón MUI + bg-emerald-600
      </Button>
    </div>
  );
}

export default App;
