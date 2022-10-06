const { json } = require("body-parser");
const fs = require("fs");
const saveDataOnFile = require("../utils/saveData");
const users = fs.readFileSync("./public/fakeUserData.json");
const allUsers = JSON.parse(users);

const getARandomUser = (req, res, next) => {
  const randomId = parseInt(Math.random() * 9 + 1);
  const foundUser = allUsers.find((user) => user.id === randomId);
  console.log(foundUser, randomId);
  res.json(foundUser);
};

const getAllUser = (req, res, next) => {
  const { limit } = req.query;
  console.log(limit);
  let result;
  if (limit) {
    result = allUsers.slice(0, limit);
  } else {
    result = allUsers;
  }
  res.json(result);
};

const addANewUser = (req, res, next) => {
  const { gender, name, contact, address, photoUrl } = req.body;
  if (!photoUrl || !name || !contact || !address || !gender) {
    res.status(500).send({ messahe: "Something missing" });
    return;
  }
  const newId = allUsers.length + 1;
  const newUser = {
    id: newId,
    name,
    gender,
    contact,
    address,
    photoUrl,
  };
  const currentUsers = [...allUsers, newUser];
  saveDataOnFile(currentUsers);
  res.send(currentUsers);
};

const updateAUser = (req, res, next) => {
  const { id } = req.params;
  const { gender, name, contact, address, photoUrl } = req.body;
  const isExist = allUsers.find((user) => user.id === Number(id));
  if (!isExist) {
    res.status(500).send({ message: "User not found" });
    return;
  }
  isExist.gender = gender ? gender : isExist.gender;
  isExist.name = name ? name : isExist.name;
  isExist.contact = contact ? contact : isExist.contact;
  isExist.address = address ? address : isExist.address;
  isExist.photoUrl = photoUrl ? photoUrl : isExist.photoUrl;
  saveDataOnFile(allUsers);
  res.send(allUsers);
};

const deleteAUser = (req, res, next) => {
  const { id } = req.params;
  if (Number(id) > allUsers.length) {
    res.status(500).send({ message: "User not found" });
    return;
  }
  const restUsers = allUsers.filter((user) => user.id !== Number(id));
  saveDataOnFile(restUsers);
  res.send(restUsers);
};

module.exports = {
  getARandomUser,
  getAllUser,
  addANewUser,
  deleteAUser,
  updateAUser,
};
