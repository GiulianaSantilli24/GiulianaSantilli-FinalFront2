import {
  BotonLectura,
  DescripcionTarjetaNoticia,
  FechaTarjetaNoticia,
  ImagenTarjetaNoticia,
  TarjetaNoticia,
  TituloTarjetaNoticia,
} from "./styled";
import { INoticiasNormalizadas } from "./Noticias";

export interface Props {
    noticia: any,
    setModal: ( noticia: INoticiasNormalizadas)=>void
}

const TarjetaNoticiaComponent = (props: Props) => {
  return (
    <TarjetaNoticia>
      <ImagenTarjetaNoticia src={props.noticia.imagen} />
      <TituloTarjetaNoticia>{props.noticia.titulo}</TituloTarjetaNoticia>
      <FechaTarjetaNoticia>{props.noticia.fecha}</FechaTarjetaNoticia>
      <DescripcionTarjetaNoticia>
        {props.noticia.descripcionCorta}
      </DescripcionTarjetaNoticia>
      <BotonLectura onClick={() => props.setModal(props.noticia)}>Ver más</BotonLectura>
    </TarjetaNoticia>
  );
};

export default TarjetaNoticiaComponent;
