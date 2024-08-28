import { Modal } from "react-bootstrap"
import { FormularioDeCadastroDePaciente } from "./formulario-de-cadastro-de-paciente"
import { Mensagem, Paciente } from "../../lib/minhas-interfaces-e-tipos"

interface ModalDeCadastroDePacienteProps {
  modalDeCadastroAberto: boolean
  fecharModalDeCadastro: () => void
  setMensagens: (mensagens: Mensagem[]) => void
  mensagens: Mensagem[]
  adicionarPaciente: (paciente: Paciente) => void
}

export function ModalDeCadastroDePaciente({
  modalDeCadastroAberto,
  fecharModalDeCadastro,
  mensagens,
  setMensagens,
  adicionarPaciente,
}: ModalDeCadastroDePacienteProps) {
  return (
    <Modal
      backdrop="static"
      centered
      size="lg"
      show={modalDeCadastroAberto}
      onHide={fecharModalDeCadastro}
    >
      <Modal.Header>
        <Modal.Title>Formulário de Cadastro de Paciente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormularioDeCadastroDePaciente
          fecharModalDeCadastro={fecharModalDeCadastro}
          mensagens={mensagens}
          setMensagens={setMensagens}
          adicionarPaciente={adicionarPaciente}
        />
      </Modal.Body>
    </Modal>
  );
}
