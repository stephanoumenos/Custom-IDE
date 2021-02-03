import axios from "axios";

export const uploadGrammarFromFile = async (selectedFile) => {
  if (selectedFile) {
    const data = new FormData();
    data.append("file", selectedFile);
    const visitor = await axios
      .post("http://localhost:5000/generate-visitor-from-file", data)
      .then((response) => response.data.visitor)
      .catch((error) => console.log(error));
    return visitor;
  }
};

export const uploadGrammar = async (grammar) => {
  const visitor = await axios
    .post("http://localhost:5000/generate-visitor", {
      grammar: grammar,
    })
    .then((response) => response.data.visitor)
    .catch(console.error);
  return visitor;
};
