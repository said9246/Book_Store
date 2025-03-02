const bookData = require("../Model/bookData");


exports.test = (req, res) => {
    res.send('Hello, World! work yes ');
}



exports.getBook = async (req, res) => {
    try {
        const data = await bookData.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const data = await bookData.create(req.body);
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
