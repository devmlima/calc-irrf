import { Button } from "@material-ui/core";
import { DataGrid, GridColDef, GridRowsProp } from "@material-ui/data-grid";
import * as React from "react";
import { Link } from "react-router-dom";
import "./Grid.css";

function Grid() {
  const rows: GridRowsProp = [
    {
      id: 1,
      nome: "Letícia Aurora Farias",
      cpf: "936.938.039-60",
      salario: "998",
      desconto: "74.85",
      dependentes: "2",
    },
    {
      id: 2,
      nome: "Letícia Aurora Farias",
      cpf: "936.938.039-60",
      salario: "998",
      desconto: "74.85",
      dependentes: "2",
    },
    {
      id: 3,
      nome: "Letícia Aurora Farias",
      cpf: "936.938.039-60",
      salario: "998",
      desconto: "74.85",
      dependentes: "2",
    },
  ];

  const columns: GridColDef[] = [
    { field: "nome", headerName: "Nome", width: 300 },
    { field: "cpf", headerName: "CPF", width: 300 },
    { field: "salario", headerName: "Salário", width: 300 },
    { field: "desconto", headerName: "Desconto", width: 300 },
    { field: "dependentes", headerName: "Dependentes", width: 300 },
  ];

  return (
    <div className="gridContainer">
      <div className="menu">
        <div className="btnGrid">
          <Link to="/person">
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
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
}

export default Grid;
