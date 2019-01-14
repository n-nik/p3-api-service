const Block = require("./Block.js").Block;
const BlockChain = require("./BlockChain.js");
const ValidationHelpers = require("./ValidationHelpers").ValidationHelpers;

/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        this.blockChain = new BlockChain.Blockchain();
        this.helpers = new ValidationHelpers();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * GET Endpoint to retrieve a block by height, url: "/api/block/:height"
     */
    getBlockByIndex() {
        this.app.get("/api/block/:height", (req, res) => {
            const validationResult = this.helpers.validateParamsSchema(req.params);
            if (validationResult.error) {
                return res.status(400).send({message: validationResult.error.details[0].message})
            }

            this.blockChain.getBlock(req.params.height)
                .then(block => {
                    res.send(block);
                })
                .catch(err => {
                    if(err.notFound) {
                        return res.status(404).send({message: "Block not exist"})
                    }
                    console.log(err);
                    res.status(500).send({message: "Inner server error"});
                });
        });
    }

    /**
     * POST Endpoint to add a new Block, url: "/api/block"
     */
    postNewBlock() {
        this.app.post("/api/block", (req, res) => {
            const validationResult = this.helpers.validateBlockSchema(req.body);
            if (validationResult.error) {
                return res.status(400).send({message: validationResult.error.details[0].message})
            }

            this.blockChain.addBlock(new Block(req.body.body))
                .then(block => {
                    res.send(block);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({message: "Inner server error"});
                });
        });
    }

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);};
