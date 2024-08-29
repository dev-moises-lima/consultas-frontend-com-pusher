import "bootstrap/dist/css/bootstrap.min.css"
import { PaginaPrincipal } from "./pages/pagina-principal"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PaginaDoPaciente } from "./pages/pagina-do-paciente"

export function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PaginaPrincipal/>
    },
    {
      path: 'patient/:patientId',
      element: <PaginaDoPaciente/>
    }
  ])

  return (
    <main 
      className="conteiner-fluid mx-auto px-4 py-4"
      style={{
        maxWidth: "1400px"
      }}
    >
      <RouterProvider router={router} />
    </main>
  )
}
