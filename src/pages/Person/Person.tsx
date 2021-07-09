import React from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./Person.css";
import { Link } from "react-router-dom";
import { getPersonById, postPerson, putPerson } from "../../service/Service";

function Person() {
  const [id, setId] = React.useState(null);
  const [nome, setNome] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [dependentes, setDependentes] = React.useState(null);
  const [bruto, setBruto] = React.useState("");
  const [desconto, setDesconto] = React.useState("");
  const [liquido, setLiquido] = React.useState("");

  // LOADING QUANDO EDITAR
  //  React.useEffect(() => {
  // if (id) {
  //   getPersonById(id);
  // }
  //   }, [])

  const handleSave = async () => {
    const obj = {
      nome,
      cpf,
      dependentes,
      bruto,
      desconto,
      liquido,
    };

    try {
      if (id) {
        await postPerson(obj);
      } else {
        await putPerson(obj);
      }
    } catch (e) {
      throw new Error("Ocorreu um erro ao salvar o formulário!");
    }
  };

  return (
    <div className="personContaner">
      <div>
        <h1>Cadastro de Novo Colaborador</h1>
      </div>
      <form>
        <div className="row">
          <div>
            <FormControl>
              <InputLabel htmlFor="nome">Nome</InputLabel>
              <Input
                id="nome"
                type="text"
                onChange={(value: any) => setNome(value.target.value)}
                defaultValue={nome}
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="cpf">CPF</InputLabel>
              <Input
                id="cpf"
                onChange={(value: any) => setCpf(value.target.value)}
                defaultValue={cpf}
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <InputLabel htmlFor="dependentes">
                Número de dependentes
              </InputLabel>
              <Input
                id="dependentes"
                type="number"
                onChange={(value: any) => setDependentes(value.target.value)}
                defaultValue={dependentes}
              />
            </FormControl>
          </div>
        </div>

        <div className="row">
          <div>
            <FormControl>
              <InputLabel htmlFor="bruto">Salário Bruto</InputLabel>
              <Input
                id="bruto"
                onChange={(value: any) => setBruto(value.target.value)}
                defaultValue={bruto}
              />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <InputLabel htmlFor="desconto">
                Desconto da previdência
              </InputLabel>
              <Input
                id="desconto"
                onChange={(value: any) => setDesconto(value.target.value)}
                defaultValue={desconto}
              />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <InputLabel htmlFor="liquido">Salário Líquido</InputLabel>
              <Input
                id="liquido"
                onChange={(value: any) => setLiquido(value.target.value)}
                defaultValue={liquido}
              />
            </FormControl>
          </div>
        </div>

        <div className="actions">
          <div>
            <Button variant="contained" color="primary" onClick={handleSave}>
              SALVAR
            </Button>
          </div>
          <div>
            <Link to="/grid">
              <Button variant="contained" color="secondary">
                VOLTAR
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Person;
