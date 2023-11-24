<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\FollowerController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\OnFollowController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TwitterController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');



Route::get("/", function () {
    return redirect('/twitter');
});

Route::get("/dashboard", function () {
    return redirect('/twitter');
});

Route::middleware('auth')->group(function () {
    Route::resource('/twitter', TwitterController::class, ['as' => 'twitter']);
    Route::resource('/user', UserController::class, ['as' => 'user']);
    Route::resource('/like', LikeController::class);
    Route::resource('/comment', CommentController::class);

    Route::post('/onfollow', [OnFollowController::class, 'store']);
    Route::delete('/onunfollow', [OnFollowController::class, 'destroy']);

    Route::get('user/{user:id}/followers', [UserController::class, 'followers']);
    Route::get('user/{user:id}/following', [UserController::class, 'following']);

    Route::get('/people', [UserController::class, 'people']);

    Route::get('/search', function (Request $request) {

        $users = User::search($request->q)
            ->query(fn(Builder $query) => $query->with(['followers', 'following']))
            ->get();

        return response()->json($users);
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
