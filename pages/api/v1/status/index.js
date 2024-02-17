function status(request, response) {
  response.status(200).json({ mensagem: "Testado com sucesso" });
}

export default status;
