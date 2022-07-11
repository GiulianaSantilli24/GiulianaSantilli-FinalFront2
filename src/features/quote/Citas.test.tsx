//imports
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { render } from "../../test-utils";
import { setupServer } from "msw/node";
import Cita from "./Cita";
import { citaAleatoria, handlers, citaDefinida } from "../../mocks/handler";
import userEvent from "@testing-library/user-event";
// before all de todos los test
const server = setupServer(...handlers);
beforeAll(() => server.listen());
afterAll(() => server.close);
afterEach(() => server.resetHandlers);

//primer test 

describe("primer re", () => {
  beforeEach(() => render(<Cita />));
  it("Should render the main text", () => {  const initialText = screen.queryByText("No se encontro ninguna cita"); expect(initialText).toBeInTheDocument(); });

  it("Should render the search input by name", () => {  const inputName = screen.queryByPlaceholderText(   "Ingresa el nombre del autor" );  expect(inputName).toBeInTheDocument(); });

  it("Should render the button of search", () => {  const getQuoteBtn = screen.queryByText("Obtener cita aleatoria", {   selector: "button", }); expect(getQuoteBtn).toBeInTheDocument(); });

  it("Should render the clear button", () => {const clearBtn = screen.queryByText("Borrar", { selector: "button" }); expect(clearBtn).toBeInTheDocument(); });
});

// segundo test

describe("renderizando con distintos argumentos", () => {
  beforeEach(() => render(<Cita />));
  it("deberia mostrar una cita aleatoria", async () => {
    const getQuoteBtn = screen.getByText("Obtener cita aleatoria", {
      selector: "button",
    });
    fireEvent.click(getQuoteBtn);
    await waitFor(() =>
      expect(screen.queryByText(citaAleatoria.quote)).toBeInTheDocument()
    ); });

  it("deberia mostrar un nombre aleatorio", async () => { const getQuoteBtn = screen.getByText("Obtener cita aleatoria", { selector: "button", });
    fireEvent.click(getQuoteBtn); await waitFor(() =>  expect(screen.queryByText(citaAleatoria.character)).toBeInTheDocument() );});

  it("Should display the name and a quote from a specific character", async () => {  const getQuoteBtn = screen.getByText("Obtener cita aleatoria", { selector: "button", }); const inputName = screen.getByPlaceholderText(   "Ingresa el nombre del autor");
    await userEvent.clear(inputName);
    fireEvent.change(inputName, { target: { value: "Moe" } });
    fireEvent.click(getQuoteBtn);
    await waitFor(() => {
      expect(screen.queryByText(citaDefinida.character)).toBeInTheDocument();
      expect(screen.queryByText(citaDefinida.quote)).toBeInTheDocument();
    }); });

  it("El imput deberia termianr vacio", () => { const inputName = screen.getByPlaceholderText( "Ingresa el nombre del autor" );
    const clearBtn = screen.getByText("Borrar", { selector: "button" });
    fireEvent.change(inputName, { target: { value: "Moe" } });
    fireEvent.click(clearBtn);
    expect(inputName).toBeEmptyDOMElement()
  });
});
