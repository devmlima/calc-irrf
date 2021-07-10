import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import * as React from "react";
import { Link } from "react-router-dom";

import { deletePerson, getPerson } from "../../service/Service";
import { maskCpf, maskMoeda } from "../../shared/Masks";
import "./Grid.css";

function Grid() {
  const [rows, setRows] = React.useState([]);

  async function getPersonServer() {
    const response: any = await getPerson();
    const data = response.data.map((d: any) => {
      d.cpf = maskCpf(d.cpf);
      d.bruto = maskMoeda(+d.bruto || 0);
      d.desconto = maskMoeda(+d.desconto || 0);
      d.irrf = maskMoeda(+d.irrf || 0);
      return d;
    });
    setRows(data);
  }

  React.useEffect(() => {
    getPersonServer();
  }, []);

  const handleDelete = async (id: number) => {
    await deletePerson(id);
    getPersonServer();
  };

  return (
    <div className="gridContainer">
      <div className="menu">
        <div className="btnGrid">
          <Link to={{ pathname: `/person/` }}>
            <Button variant="contained" color="primary">
              Novo Colaborador
            </Button>
          </Link>
        </div>

        <div className="titleGrid">
          <h3>Colaboradores Cadastrados</h3>
        </div>

        <div className="btnGrid">
          <Link to="/">
            <Button variant="contained" color="secondary">
              X
            </Button>
          </Link>
        </div>
      </div>

      <div className="gridLayout">
        {rows.length > 0 && (
          <table style={{ width: "100%" }}>
            <th>Nome</th>
            <th>CPF</th>
            <th>Salário Bruto</th>
            <th>Desconto</th>
            <th>Dependentes</th>
            <th>Desconto IRRF</th>
            <th>Actions</th>
            {rows.map((r: any) => {
              return (
                <tr style={{ textAlign: "center" }} key={r.id}>
                  <td>{r.nome}</td>
                  <td>{r.cpf}</td>
                  <td>{r.bruto}</td>
                  <td>{r.desconto}</td>
                  <td>{r.dependentes}</td>
                  <td>{r.irrf || 0}</td>
                  <td>
                    <div className="actionsTable">
                      <div className="edit">
                        <Link
                          to={{
                            pathname: `/person`,
                            search: `${r.id}`,
                          }}
                        >
                          <EditIcon style={{ color: "#000" }} />
                        </Link>
                      </div>
                      <div className="del" onClick={() => handleDelete(r.id)}>
                        <DeleteIcon style={{ color: "#000" }} />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </table>
        )}
      </div>
    </div>
  );
}

export default Grid;
