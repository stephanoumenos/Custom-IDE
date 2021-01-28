const express = require("express")
const app = express()
const PORT = 5000

const cors = require("cors");
const bodyParser = require("body-parser")
const multer = require('multer')

app.use(cors())
app.use(bodyParser.json())


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'tmp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage }).single('file')

generateParser = (path_to_grammar) => {
    console.log("generating");
    var spawn = require("child_process").spawn;
    var child = spawn('node_modules/antlr4ts-cli/antlr4ts', [
        '-no-listener',
        path_to_grammar
    ]);
    child.stdout.on('data', (data) => console.log("stdout", data));
    child.stderr.on('data', (data) => console.log("stderr", data))
    child.on('exit', (data) => console.log("exit", data))
}

app.post('/generate', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json(err);
        }
        generateParser(req.file.path)
        return res.status(200).send(req.file)
    })
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})