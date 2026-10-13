// const Yup = require("yup");

// const createHomeSectionSchema = Yup.object().shape({
//   title: Yup.string().required("Section title is required"),

//   category: Yup.string()
//     .required("Category is required"),

//   tag: Yup.string()
//     .oneOf(["bestseller", "popular", "seasonal"])
//     .required("Tag is required"),

//   limit: Yup.number()
//     .min(1)
//     .max(50)
//     .default(8),

//   layout: Yup.string()
//     .oneOf(["slider", "grid"])
//     .default("slider"),

//   order: Yup.number()
//     .required("Order is required"),

//   isActive: Yup.boolean().default(true)
// });

// module.exports = {
//   createHomeSectionSchema
// };







const Yup = require("yup");

// CREATE VALIDATION
const createHomeSectionSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(3).max(100),
  category: Yup.string().required("Category is required"),
  tag: Yup.string()
    .required("Tag is required")
    .oneOf(["bestseller", "popular", "seasonal", "new", "featured"]),
  limit: Yup.number().min(1).max(50).default(8),
  layout: Yup.string()
    .oneOf(["amazon", "flipkart", "myntra", "grid", "slider"])
    .default("amazon"),
  cardStyle: Yup.string()
    .oneOf(["compact", "large", "portrait", "minimal"])
    .default("compact"),
  bgColor: Yup.string().default("#ffffff"),
  accentColor: Yup.string().default("#4f46e5"),
  showSeeMore: Yup.boolean().default(true),
  order: Yup.number().min(1).default(1),
  isActive: Yup.boolean().default(true),
});

// UPDATE VALIDATION (सभी Optional)
const updateHomeSectionSchema = Yup.object().shape({
  title: Yup.string().min(3).max(100).optional(),
  category: Yup.string().optional(),
  tag: Yup.string()
    .oneOf(["bestseller", "popular", "seasonal", "new", "featured"])
    .optional(),
  limit: Yup.number().min(1).max(50).optional(),
  layout: Yup.string()
    .oneOf(["amazon", "flipkart", "myntra", "grid", "slider"])
    .optional(),
  cardStyle: Yup.string()
    .oneOf(["compact", "large", "portrait", "minimal"])
    .optional(),
  bgColor: Yup.string().optional(),
  accentColor: Yup.string().optional(),
  showSeeMore: Yup.boolean().optional(),
  order: Yup.number().min(1).optional(),
  isActive: Yup.boolean().optional(),
});

module.exports = {
  createHomeSectionSchema,
  updateHomeSectionSchema,
};