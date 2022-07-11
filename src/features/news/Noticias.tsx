import { useEffect, useState } from "react";
import { obtenerNoticias } from "./fakeRest";
import TarjetaNoticiaComponent from "./NoticiasCard";
import {
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
} from "./styled";
import ModalPremium from "./modal/ModalPremium";
import ModalNoPremium from "./modal/ModalNoPremium";
import { minutero, mayusculas } from "./utils";

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();
      const data = respuesta.map((n) => {
        const titulo = mayusculas(n.titulo);
        const minutosTranscurridos = minutero(n.fecha);
        return {
          id: n.id,
          titulo,
          descripcion: n.descripcion,
          fecha: `Hace ${minutosTranscurridos} minutos`,
          esPremium: n.esPremium,
          imagen: n.imagen,
          descripcionCorta: n.descripcion.substring(0, 100),
        };
      });
      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((noticia) => (
          <TarjetaNoticiaComponent noticia={noticia} setModal={setModal} />
        ))}
        {modal ? (
          modal.esPremium ? (
            <ModalPremium setModal={setModal} />
          ) : (
            <ModalNoPremium setModal={setModal} modal={modal} />
          )
        ) : null}
      </ListaNoticias>
    </ContenedorNoticias>
  );
};

export default Noticias;
