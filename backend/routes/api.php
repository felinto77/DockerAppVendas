<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get("/products", [ProductController::class,"listar"]);
Route::get("/categories", [CategoriesController::class,"listar"]);
Route::post("/products", [ProductController::class,"cadastrar"]);
Route::put("/products/{id}", [ProductController::class,"atualizar"]);
Route::delete("/products/{id}", [ProductController::class,"deletar"]);

Route::post("/register", [AuthController::class,"register"]);
Route::post("/login", [AuthController::class,"login"]);

// Rotas protegidas (requerem autenticação)
Route::middleware('auth')->group(function () {
    Route::get('/listar', [AccountController::class, 'listar']);
});