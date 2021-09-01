const User = require("../Models/user");
const LiveStream = require("../Models/liveStream");
const Movie = require("../Models/movie");

const Search = require("../Utils/search");

const logInValidations = require("../Validator/logInValidations");

//-----------------------------------------------------
// Admin Auth
// ---------------------------------------------------------------
exports.logInUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email: email?.toLowerCase() });

    const { isValid, errors } = await logInValidations(req.body, user);

    if (isValid > 0) {
      return res.status(400).json(errors);
    }

    const token = user.getJwtToken();

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//----------------------------------------------------
// create user
//----------------------------------------------------
exports.createUser = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    let user = await User.create({
      email: email?.toLowerCase(),
      password,
      role,
    });

    if (user) {
      return res.status(201).json({
        status: true,
        user: user,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ---------------------------------------------------------------
exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//-----------------------------------------------------
// Live Stream
//-----------------------------------------------------
exports.addLiveStream = async (req, res, next) => {
  try {
    const {
      name,
      description,
      stream_url,
      categories,
      featured,
      default: defaultt,
      stream_location,
      stream_count,
    } = req.body;

    const data = await LiveStream.create({
      name,
      description,
      stream_url,
      thumbnail: req?.file?.filename,
      categories,
      default: defaultt,
      featured: featured,
      stream_location: stream_location,
      stream_count: stream_count,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

//-----------------------------------------------------
exports.getAllLiveStreams = async (req, res, next) => {
  try {
    const streamData = await new Search(
      LiveStream.find({}),
      req.query
    ).filterByCategory();

    const data = await streamData.query;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

//-----------------------------------------------------
exports.deleteLiveStream = async (req, res, next) => {
  try {
    await LiveStream.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Stream Delete Successfully" });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

//-----------------------------------------------------
exports.updateLiveStream = async (req, res, next) => {
  try {
    const {
      name,
      description,
      stream_url,
      categories,
      stream_location,
      stream_count,
    } = req.body;

    const updatedData = {};

    if (name) {
      updatedData.name = name;
    }
    if (description) {
      updatedData.description = description;
    }
    if (stream_url) {
      updatedData.stream_url = stream_url;
    }
    if (stream_location) {
      updatedData.stream_location = stream_location;
    }
    if (stream_count) {
      updatedData.stream_count = stream_count;
    }
    if (categories) {
      updatedData.categories = categories;
    }
    if (req?.file) {
      updatedData.thumbnail = req?.file?.filename;
    }

    await LiveStream.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: updatedData,
      }
    );

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

//-----------------------------------------------------
// Movies
//-----------------------------------------------------
exports.addMovie = async (req, res, next) => {
  try {
    const {
      name,
      description,
      stream_url,
      categories,
      featured,
      default: defaultt,
    } = req.body;

    const data = await Movie.create({
      name,
      description,
      stream_url,
      thumbnail: req?.file?.filename,
      categories,
      default: defaultt,
      featured: featured,
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

//-----------------------------------------------------
exports.getAllMovies = async (req, res, next) => {
  try {
    const movieData = await new Search(
      Movie.find({}),
      req.query
    ).filterByCategory();

    const data = await movieData.query;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

//-----------------------------------------------------
exports.deleteMovie = async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Movie Delete Successfully" });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

//-----------------------------------------------------
exports.updateMovie = async (req, res, next) => {
  try {
    const {
      name,
      description,
      stream_url,
      categories,
      default: defaultt,
      featured,
    } = req.body;

    const updatedData = {};

    if (name) {
      updatedData.name = name;
    }
    if (description) {
      updatedData.description = description;
    }
    if (stream_url) {
      updatedData.stream_url = stream_url;
    }
    if (categories) {
      updatedData.categories = categories;
    }
    if (defaultt) {
      updatedData.default = defaultt;
    }
    if (featured) {
      updatedData.featured = featured;
    }

    if (req?.file) {
      updatedData.thumbnail = req?.file?.filename;
    }

    await Movie.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: updatedData,
      }
    );

    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};

exports.homeSearch = async (req, res, next) => {
  try {
    const { search_text, streaming_type } = req.body;
    console.log("body", req.body);
    let data;
    if (streaming_type === "tv") {
      data = await LiveStream.find({
        $or: [
          { name: { $regex: search_text, $options: "i" } },
          { categories: { $regex: search_text, $options: "i" } },
          { description: { $regex: search_text, $options: "i" } },
        ],
      });
    } else {
      data = await Movie.find({
        $or: [
          { name: { $regex: search_text, $options: "i" } },
          { categories: { $regex: search_text, $options: "i" } },
          { description: { $regex: search_text, $options: "i" } },
        ],
      });
    }
    console.log("data", data);
    res.status(200).json({
      status: true,
      message: "Operation successfull",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ message: error?.message });
  }
};
