export const maskCpf = (cpf: string) => {
  cpf = cpf.replace(/\D/g, "");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return cpf;
};

export const maskMoeda = (valor: number) => {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};
