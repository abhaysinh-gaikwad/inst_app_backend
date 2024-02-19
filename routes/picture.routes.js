const express = require("express");
const { PictureModel } = require("../modles/picture.model");
const { auth } = require("../middleware/auth.middleware");

const pictureRouter = express.Router();

pictureRouter.post("/", auth, async (req, res) => {
  try {
    const picture = new PictureModel(req.body);
    await picture.save();
    res
      .status(200)
      .send({ msg: "Picute has been posted succesfully", picture });
  } catch (err) {
    res.status(400).send({ Error: err });
  }
});

pictureRouter.get("/", auth, async (req, res) => {
  try {
    const picture = await PictureModel.find({ userID: req.body.userID });
    res.status(200).send({ msg: "Picture of the user", picture });
  } catch (err) {
    res.status(400).send({ Error: err });
  }
});

pictureRouter.patch("/:pictureID", auth, async (req, res) => {
  const { pictureID } = req.params;
  try {
    const picture = await PictureModel.findOne({ _id: pictureID });
    if (picture.userID === req.body.userID) {
      await PictureModel.findByIdAndUpdate({ _id: pictureID }, req.body);
      res.status(200).send({
        msg: `The picture discription with id ${pictureID}, has been updated`,
      });
    } else {
      res
        .status(400)
        .send({ msg: `You are not authorized to update this note` });
    }
  } catch (err) {
    res.status(400).send({ Error: err });
  }
});

pictureRouter.delete("/:pictureID", auth, async (req, res) => {
  const { pictureID } = req.params;
  try {
    const picture = await PictureModel.findOne({ _id: pictureID });
    if (picture.userID === req.body.userID) {
      await PictureModel.findByIdAndDelete({ _id: pictureID }, req.body);
      res.status(200).send({
        msg: `The picture discription with id ${pictureID}, has been Deleted`,
      });
    } else {
      res
        .status(400)
        .send({ msg: `You are not authorized to update this note` });
    }
  } catch (err) {
    res.status(400).send({ Error: err });
  }
});

module.exports = {
  pictureRouter,
};
