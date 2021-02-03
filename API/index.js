const express = require("express");
const app = express();
const PORT = 5000;

const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { response } = require("express");

app.use(cors());
app.use(express.json());

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const grammarName = file.originalname.split(".")[0];
    const _path = path.join("tmp", grammarName);
    fs.mkdirSync(_path, { recursive: true });
    cb(null, _path);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

var upload = multer({ storage: storage }).single("file");

generateParser = (path_to_grammar) => {
  console.log("generating");
  var spawn = require("child_process").spawn;
  var child = spawn("node_modules/antlr4ts-cli/antlr4ts", [
    "-no-listener",
    "-visitor",
    "-o",
    "./tmp/",
    path_to_grammar,
  ]);
  child.stdout.on("data", (data) => console.log("stdout", data.toString()));
  child.stderr.on("data", (data) => console.log("stderr", data.toString()));
  child.on("exit", (data) => console.log("exit", data.toString()));
};

// TODO: fix this request to be like generate below.
app.post("/generate-visitor-from-file", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json(err);
    }
    generateParser(req.file.path);
    return res.status(200).send(req.file);
  });
});

const getVisitorCode = (directory) => {
  // TODO: change to async and make file name non-generic.
  return fs.readFileSync(`${directory}/helloVisitor.ts`);
};

app.post("/generate-visitor", (req, res) => {
  // TODO: change grammar name to non-generic.
  console.log(req.body);
  fs.writeFile("./hello.g4", req.body.grammar, (err) => {
    if (err) return console.log(err);

    console.log("Wrote grammar request to file grammar.g4.");
  });
  generateParser("./hello.g4");
  return res.status(200).send({ visitor: getVisitorCode("./tmp").toString() });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
