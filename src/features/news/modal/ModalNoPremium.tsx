import {
  CloseButton,
  ContenedorModal,
  CotenedorTexto,
  DescripcionModal,
  ImagenModal,
  TarjetaModal,
  TituloModal,
} from "../styled";
import { CloseButton as Close } from "../../../assets";
import { INoticiasNormalizadas } from "../Noticias";
interface Props {
  modal: INoticiasNormalizadas;
  setModal: (close: null) => void;
}

const ModalNoPremium = (props: Props) => {
  return (
    <ContenedorModal>
      <TarjetaModal>
        <CloseButton onClick={() => props.setModal(null)}>
          <img src={Close} alt="close-button" />
        </CloseButton>
        <ImagenModal src={props.modal.imagen} alt="news-image" />
        <CotenedorTexto>
          <TituloModal>{props.modal.titulo}</TituloModal>
          <DescripcionModal>{props.modal.descripcion}</DescripcionModal>
        </CotenedorTexto>
      </TarjetaModal>
    </ContenedorModal>
  );
};

export default ModalNoPremium;
