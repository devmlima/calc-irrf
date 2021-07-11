import React from "react";
import { Button, FormControl } from "@material-ui/core";
import "./Person.css";
import { Link, useLocation } from "react-router-dom";
import { getPersonById, postPerson, putPerson } from "../../service/Service";
import { useHistory } from "react-router-dom";
import { maskCpf } from "../../shared/Masks";

function Person() {
  const [id, setId] = React.useState<any>(null);
  const [nome, setNome] = React.useState("");
  const [cpf, setCpf] = React.useState("");
  const [dependentes, setDependentes] = React.useState(0);
  const [bruto, setBruto] = React.useState(0);
  const [desconto, setDesconto] = React.useState(0);
  const [irrf, setIrrf] = React.useState(0);
  const { search } = useLocation();

  const history = useHistory();

  async function getPersonByIdServer(id: number) {
    const response: any = await getPersonById(id);
    const data = response.data;

    data.cpf = maskCpf(data.cpf);

    setNome(data.nome);
    setCpf(data.cpf);
    setBruto(data.bruto);
    setDependentes(data.dependentes);
    setDesconto(data.desconto);
    setIrrf(data.irrf);
  }

  React.useEffect(() => {
    if (search) {
      setId(+search[1]);
    }
  }, [id, search]);

  React.useEffect(() => {
    if (id) {
      getPersonByIdServer(id);
    }
  }, [id]);

  const mapParcela: { [aliquota: number]: number } = {
    0: 0,
    7.5: 142.8,
    15: 354.8,
    22.5: 636.13,
    27.5: 869.36,
  };

  const handleSave = async () => {
    const obj: any = {
      nome,
      cpf: cpf.replace(/\D/g, ""),
      dependentes,
      bruto,
      desconto,
      irrf,
    };

    try {
      if (id) {
        obj.id = id;
        await putPerson(convertModel(obj));
      } else {
        await postPerson(convertModel(obj));
      }
      history.push("/grid");
    } catch (e) {
      throw new Error("Ocorreu um erro ao salvar o formulário!");
    }
  };

  const convertModel = (obj: any) => {
    if (obj.cpf) {
      obj.cpf = cpf.replace(/\D/g, "");
    }
    return obj;
  };

  const handleCalcular = () => {
    let aliquota = 0;
    if (bruto >= 1903.98 && bruto < 2826.66) {
      aliquota = 7.5;
    } else if (bruto > 2826.65 && bruto < 3751.06) {
      aliquota = 15;
    } else if (bruto > 3751.05 && bruto < 4664.69) {
      aliquota = 22.5;
    } else if (bruto > 4664.68) {
      aliquota = 27.5;
    }

    const parcela = mapParcela[aliquota];
    const deducao = 164.56 * dependentes;
    const salarioBase = (bruto - desconto - deducao) * dependentes;
    const descontoIRRF: any = salarioBase * (aliquota / 100) - parcela;

    setIrrf(descontoIRRF);
  };

  return (
    <div className="personContaner">
      <div>
        <h1>Cadastro de Novo Colaborador</h1>
      </div>
      <div style={{ textAlign: "center" }}>
        <span>
          Para calcular corretamente o IRRF, preencha:{" "}
          <strong>
            O Salário Bruto, Desconto da previdência e número de dependentes
          </strong>
        </span>
      </div>
      <form>
        <div className="row">
          <div>
            <FormControl>
              <label htmlFor="nome">Nome</label>
              <input
                placeholder="Nome"
                id="nome"
                type="text"
                value={nome}
                onChange={(value: any) => setNome(value.target.value)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <label htmlFor="cpf">CPF</label>
              <input
                placeholder="CPF"
                id="cpf"
                type="text"
                value={cpf}
                onChange={(value: any) => setCpf(value.target.value)}
              />
            </FormControl>
          </div>
          <div>
            <FormControl>
              <label htmlFor="dependentes">Número de dependentes</label>
              <input
                placeholder="Numero de dependentes"
                id="dependentes"
                type="number"
                value={dependentes}
                onChange={(value: any) => setDependentes(value.target.value)}
              />
            </FormControl>
          </div>
        </div>

        <div className="row">
          <div>
            <FormControl>
              <label htmlFor="bruto">Salário Bruto</label>
              <input
                placeholder="Salário Bruto"
                id="bruto"
                type="text"
                value={bruto}
                onChange={(value: any) => setBruto(value.target.value)}
              />
            </FormControl>
          </div>

          <div>
            <FormControl>
              <label htmlFor="desconto">Desconto previdência</label>
              <input
                placeholder="Desconto previdência"
                id="desconto"
                type="text"
                value={desconto}
                onChange={(value: any) => setDesconto(value.target.value)}
              />
            </FormControl>
          </div>

          <div className="irrf">
            <FormControl>
              <label htmlFor="irrf">Desconto IRRF</label>
              <input
                placeholder="Desconto IRRF"
                id="irrf"
                type="text"
                value={irrf}
                disabled={true}
              />
            </FormControl>
          </div>
        </div>

        <div className="actions">
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCalcular}
            >
              CALCULAR
            </Button>
          </div>
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
