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

// testing API
Route.post("/test", AuthMiddleware.hasAdminAccess, UserController.test);

Route.get("/", ApisController.landing);

Route.get("/greet", ApisController.greet);
Route.get("/configurations", ApisController.configurations);
Route.post("/configuration/insert", ApisController.insert_configuration);
Route.post("/configuration/update", ApisController.update_configuration);
Route.post("/configuration/delete", ApisController.delete_configuration);

Route.post("/auth/register", AuthController.register); // tested
Route.post("/auth/login", AuthController.login);  // tested
Route.post("/auth/verify-register", AuthController.verifyFromRegister); // tested
Route.post("/auth/verify-login", AuthController.verifyFromLogin); // tested
Route.post("/auth/resend-otp", AuthController.resendOtp); // tested

Route.get("/users/:id", UserController.findUserById); // tested
Route.get("/providers", Pagination.paginate, UserController.getProviders); // tested
Route.get("/providers/:id", UserController.getProviderById); // tested
Route.get("/students", Pagination.paginate, UserController.getStudents); // tested


/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route.post("/@self", AuthMiddleware.authorize, UserController.getSelf); // tested
Route.post("/@self/delete", AuthMiddleware.authorize, UserController.deleteSelf ); // tested
Route.post("/@self/upload/valid-id", AuthMiddleware.authorize, UserController.uploadValidIdUrl ); // tested
Route.post("/@self/upload/avatar", AuthMiddleware.authorize, UserController.uploadAvatarUrl); // tested
Route.post("/@self/upload/banner", AuthMiddleware.authorize, UserController.uploadBannerUrl); // tested
Route.post("/@self/update", AuthMiddleware.authorize, UserController.updateSelf); // tested
Route.post('/@self/posts', Pagination.paginate, AuthMiddleware.authorize, UserController.getSelfPosts) // tested
Route.post('/@self/bookmarks', Pagination.paginate, AuthMiddleware.authorize, UserController.getSelfBookmarks) // tested

Route.post("/users/:id/bookmarks", AuthMiddleware.authorize, Pagination.paginate, BookmarkController.getUserBookmarks); // ????????????????
Route.post("/bookmarks", AuthMiddleware.authorize, BookmarkController.createBookmark); // tested
Route.post("/bookmarks/remove", AuthMiddleware.authorize, BookmarkController.deleteBookmark); // tested; by post id
Route.post("/bookmarks/check", AuthMiddleware.authorize, BookmarkController.isBookmarked); // by post id

Route.post("/posts/create", AuthMiddleware.authorize, PostController.create); // tested
Route.post("/posts/:id/update", AuthMiddleware.authorize, PostController.updateById); // tested
Route.post("/posts/:id/remove", AuthMiddleware.authorize, PostController.deleteById); // tested
Route.post("/posts", Pagination.paginate, AuthMiddleware.authorize, PostController.getPosts); // tested
Route.post("/posts/:id", AuthMiddleware.authorize, PostController.findPostById); // tested
Route.post("/posts/:id/feedbacks", AuthMiddleware.authorize, Pagination.paginate, FeedbackController.getPostFeedbacks ); // tested

Route.post("/feedbacks", AuthMiddleware.authorize, FeedbackController.createFeedback); // tested
Route.post("/feedbacks/:id/remove", AuthMiddleware.authorize, FeedbackController.deleteFeedback); // tested

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/
Route.post("/admin/users/:id/remove", AuthMiddleware.hasAdminAccess, UserController.deleteUserById ); // tested
Route.post("/admin/users/:id/archive", AuthMiddleware.hasAdminAccess, AdminController.archiveUserById); // tested
Route.post("/admin/users/:id/unarchive", AuthMiddleware.hasAdminAccess, AdminController.unarchiveUserById); // tested

Route.post("/admin/posts/:id/archive", AuthMiddleware.hasAdminAccess, AdminController.archivePostById); // tested
Route.post("/admin/posts/:id/unarchive", AuthMiddleware.hasAdminAccess, AdminController.unarchivePostById); // tested
Route.post("/admin/providers/:id/verify", AuthMiddleware.hasAdminAccess, AdminController.verifyProvider);

// Breaking changes
Route.post("/admin/users", Pagination.paginate, AuthMiddleware.hasAdminAccess, AdminController.getUsers); // tested
Route.post("/admin/providers", Pagination.paginate, AuthMiddleware.hasAdminAccess, AdminController.getProviders); // tested
Route.post("/admin/students", Pagination.paginate, AuthMiddleware.hasAdminAccess, AdminController.getStudents); // tested
Route.post("/admin/posts", Pagination.paginate, AuthMiddleware.hasAdminAccess, AdminController.getPosts); // tested


Route.post('/creative', ApisController.createPost)

export { Route as routes };
