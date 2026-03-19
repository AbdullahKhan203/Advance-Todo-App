import express from "express";
import Todo from "../models/Todo.js";
import { protect } from "../middleware/todo-middleware.js";

const router = express.Router();

// CREATE TODO - secure version
router.post("/create", protect, async (req, res) => {
  try {
    const todo = await Todo.create({
      user: req.user._id, // <-- assign logged-in user automatically
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      email: req.body.email,
      status: req.body.status,
      catagory: req.body.catagory,
      priority: req.body.priority,
      time: req.body.time,
    });

    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});


// router.get("/", protect, async (req, res) => {
//   try {
//     //  console.log("user: req.user._id",req.user._id);
     
//     const todos = await Todo.find({ user: req.user._id });

//     res.status(200).json({
//       success: true,
//       count: todos.length,
//       data: todos
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message
//     });

//   }
// });


router.get("/", protect, async (req, res) => {
  try {
    const {
      search = "",
      status = "all",
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "asc"
    } = req.query;

    // 🧠 Build query object
    let query = {
      user: req.user._id
    };

    // 🔍 Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    // 🎯 Filter by status
    if (status !== "all") {
      query.status = status;
    }

    // 📄 Pagination
    const skip = (page - 1) * limit;

    // 🔃 Sorting
    const sortOrder = order === "asc" ? 1 : -1;

    const todos = await Todo.find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit));

    const total = await Todo.countDocuments(query);

    res.status(200).json({
      success: true,
      data: todos,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalTodos: total
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


router.get("/:id", protect, async (req, res) => {
  try {

    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found"
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});



router.put("/:id", protect, async (req, res) => {
  try {

    const todo = await Todo.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found"
      });
    }

    res.status(200).json({
      success: true,
      data: todo
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});

// router.delete("/:id", protect, async (req, res) => {
//   try {
//    const todo = await Todo.findOneAndDelete({
//   _id: req.params.id,
//   user: req.user._id
// });

// if (!todo) {
//   return res.status(404).json({
//     success: false,
//     message: "Todo not found"
//   });
// }

// res.status(200).json({
//   success: true,
//   message: "Todo deleted successfully"
// });

//   } catch (error) {
//     res.status(500).json({
//       message: error.message
//     });
//   }
// });


router.delete("/", protect, async (req, res) => {
  try {
    const { ids } = req.body;

    // validation
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of todo IDs"
      });
    }

    // delete multiple todos of logged-in user
    const result = await Todo.deleteMany({
      _id: { $in: ids },
      user: req.user._id
    });

    res.status(200).json({
      success: true,
      message: "Todos deleted successfully",
      deletedCount: result.deletedCount
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

export default router;