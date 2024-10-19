import AdminController from "App/Controllers/Http/AdminController";
import ApisController from "App/Controllers/Http/ApisController";
import AuthController from "App/Controllers/Http/AuthController";
import BookmarkController from "App/Controllers/Http/BookmarkController";
import FeedbackController from "App/Controllers/Http/FeedbackController";
import PostController from "App/Controllers/Http/PostController";
import UserController from "App/Controllers/Http/UserController";
import AuthMiddleware from "App/Middlewares/Auth";
import Pagination from "App/Middlewares/Pagination";
import { Router } from "express";
const Route = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route.get("/", ApisController.landing);

Route.get("/greet", ApisController.greet);
Route.get("/configurations", ApisController.configurations);
Route.post("/configuration/insert", ApisController.insert_configuration);
Route.post("/configuration/update", ApisController.update_configuration);
Route.post("/configuration/delete", ApisController.delete_configuration);

Route.post("/auth/register", AuthController.register);
Route.post("/auth/login", AuthController.login);
Route.post("/auth/verify", AuthController.verify);
Route.post("/auth/verify-register", AuthController.verifyFromRegister);
Route.post("/auth/verify-login", AuthController.verifyFromLogin);
Route.post("/auth/resend-otp", AuthController.resendOtp);

Route.get("/users/:id", UserController.findById);
Route.get("/users", Pagination.paginate, UserController.getAll);
Route.get("/providers", Pagination.paginate, UserController.getProviders);
Route.get(
  "/non-verified-providers",
  Pagination.paginate,
  UserController.getNonVerifiedProviders
);
Route.get("/students", Pagination.paginate, UserController.getStudents);

Route.get("/posts", Pagination.paginate, PostController.getAll);
Route.get("/posts/:id", PostController.findById);
Route.get("/posts/:type/category", PostController.findByCategoryType);

Route.post(
  "/posts/:id/feedbacks",
  Pagination.paginate,
  FeedbackController.getPostFeedbacks
);

// testing email sending, change recipient in the controller
Route.post("/test", AuthMiddleware.hasAdminAccess, UserController.test);

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route.post('/@self', AuthMiddleware.authorize, UserController.getSelf);

Route.post(
  "/users/:id/remove",
  AuthMiddleware.authorize,
  UserController.deleteById
);
Route.post(
  "/@self/upload/valid-id",
  AuthMiddleware.authorize,
  UserController.uploadValidIdUrl
); // TODO - add a middleware that verifies if the user is a provider
Route.post(
  "/@self/upload/avatar",
  AuthMiddleware.authorize,
  UserController.uploadAvatarUrl
);
Route.post(
  "/@self/upload/banner",
  AuthMiddleware.authorize,
  UserController.uploadBannerUrl
);
Route.post(
  "/@self/update",
  AuthMiddleware.authorize,
  UserController.updateSelf
);
Route.post("/@self", AuthMiddleware.authorize, UserController.getSelf);

Route.post(
  "/users/:id/bookmarks",
  AuthMiddleware.authorize,
  Pagination.paginate,
  BookmarkController.getUserBookmarks
);
Route.post(
  "/bookmarks",
  AuthMiddleware.authorize,
  BookmarkController.createBookmark
);
Route.post(
  "/bookmarks/:id/remove",
  AuthMiddleware.authorize,
  BookmarkController.deleteBookmark
);

Route.post("/posts/create", AuthMiddleware.authorize, PostController.create);
Route.post("/posts/:id", AuthMiddleware.authorize, PostController.updateById);
Route.post(
  "/posts/:id/remove",
  AuthMiddleware.authorize,
  PostController.deleteById
);

Route.post(
  "/feedbacks",
  AuthMiddleware.authorize,
  FeedbackController.createFeedback
);
Route.post(
  "/feedbacks/:id",
  AuthMiddleware.authorize,
  FeedbackController.updateFeedback
);
Route.post(
  "/feedbacks/:id/remove",
  AuthMiddleware.authorize,
  FeedbackController.deleteFeedback
);

/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

Route.post(
  "/protected/users/:id/archive",
  AuthMiddleware.hasAdminAccess,
  AdminController.archiveUserById
);
Route.post(
  "/protected/users/:id/unarchive",
  AuthMiddleware.hasAdminAccess,
  AdminController.unarchiveUserById
);
Route.post(
  "/protected/archived-users",
  Pagination.paginate,
  AuthMiddleware.hasAdminAccess,
  AdminController.getArchivedUsers
);
Route.post(
  "/protected/non-verified-users",
  Pagination.paginate,
  AuthMiddleware.hasAdminAccess,
  AdminController.getNonVerifiedUsers
);

Route.post(
  "/protected/posts/:id/archive",
  AuthMiddleware.hasAdminAccess,
  AdminController.archivePostById
);
Route.post(
  "/protected/posts/:id/unarchive",
  AuthMiddleware.hasAdminAccess,
  AdminController.unarchivePostById
);

Route.post(
  "/protected/providers/:id/verify",
  AuthMiddleware.hasAdminAccess,
  AdminController.verifyProvider
);
Route.post(
  "/protected/non-verified-providers",
  Pagination.paginate,
  AuthMiddleware.hasAdminAccess,
  AdminController.getNonVerifiedProviders
);

export { Route as routes };
