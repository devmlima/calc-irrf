import { Button } from "@material-ui/core";
import * as React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="titleHome">
        <h1 style={{ textAlign: "center" }}>Cálculo IRRF</h1>
      </div>
      <div className="apresentation">
        <h4 style={{ textAlign: "center" }}>Tabelas e cálculos do IRRF</h4>
        <br />
        <p>
          A tabela do IR é um dos principais instrumentos para auxiliar os
          contribuintes na hora de enviar as informações fiscais para a Receita.{" "}
          <br />
          Afinal, é nesse documento que constam as alíquotas do Imposto de
          Renda.
          <br />
          <br />
          Isso quer dizer que é essa a fonte para você saber qual é o percentual
          que deve ser aplicado sobre os seus rendimentos.
          <br />
          Portanto, na hora de fazer o cálculo e declara seus rendiemntos, ter
          essa tabela é fundamental para que você não envie nenhum dado errado
          e, consequentemente, não caia na malha fina.
        </p>
        <p></p>
      </div>
      <div className="btn">
        <Link to="/grid">
          <Button variant="contained" color="primary" size="large">
            ENTRAR
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
