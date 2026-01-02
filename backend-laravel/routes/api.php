<?php

use App\Http\Controllers\admin\AuthController;
use App\Http\Controllers\admin\BrandController;
use App\Http\Controllers\admin\CategoryController;

use App\Http\Controllers\admin\PortController;
use App\Http\Controllers\admin\ProductController;
use App\Http\Controllers\admin\ShippingController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\frontend\AccountController;
use App\Http\Controllers\frontend\OrderController;
use App\Http\Controllers\admin\OrderController as AdminOrderController;
use App\Http\Controllers\admin\StatsController;
use App\Http\Controllers\admin\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\frontend\ProductController as FrontProductController;

Route::post('/admin/login', [AuthController::class, 'authenticate']);
Route::post('/register', [AccountController::class, 'register']);
Route::post('/login', [AccountController::class, 'authenticate']);
Route::get('get-latest-products', [FrontProductController::class, 'latestProducts']);
Route::get('get-featured-products', [FrontProductController::class, 'featuredProducts']);
Route::get('get-categories', [FrontProductController::class, 'getCategories']);
Route::get('get-brands', [FrontProductController::class, 'getBrands']);
Route::get('get-products', [FrontProductController::class, 'getProducts']);
Route::get('get-product/{id}', [FrontProductController::class, 'getProduct']);
Route::get('get-shipping-front', [\App\Http\Controllers\frontend\ShippingController::class, 'getShipping']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(['middleware' => ['auth:sanctum', 'checkUserRole']], function () {
    Route::post('save-order', [OrderController::class, 'saveOrder']);
    Route::get('get-order-details/{id}', [AccountController::class, 'getOrderDetails']);
    Route::get('get-orders', [AccountController::class, 'getOrders']);
    Route::post('create-payment-intent', [OrderController::class, 'createPaymentIntent']);

    Route::get('get-profile-details', [AccountController::class, 'getUserDetails']);
    Route::post('update-profile', [AccountController::class, 'updateProfile']);
    Route::post('/validate-cart', [ProductController::class, 'validateCart']);
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('change-password', [UserController::class, 'changePassword']);
});



Route::group(['middleware' => ['auth:sanctum', 'checkAdminRole']], function () {

    // Route::get('categories',[CategoryController::class,'index']);
    // Route::get('categories/{id}',[CategoryController::class,'show']);
    // Route::post('categories',[CategoryController::class,'store']);
    // Route::put('categories/{id}',[CategoryController::class,'update']);
    // Route::delete('categories/{id}',[CategoryController::class,'destroy']);

     Route::get('stats', [StatsController::class, 'stats']); // summary
    Route::get('order-chart', [StatsController::class, 'orderChart']); // line chart
    Route::get('product-chart', [StatsController::class, 'productChart']); // pie chart
    Route::get('/order-by-category', [StatsController::class, 'orderByCategory']);
Route::get('/order-by-product', [StatsController::class, 'orderByProduct']);
    Route::apiResource('users', UserController::class);
    Route::resource('categories', CategoryController::class);
    Route::resource('brands', BrandController::class);
    Route::resource('products', ProductController::class);

    // Route::get('ports',[PortController::class,'index']);
    Route::apiResource('ports', PortController::class);
    Route::post('temp-images', [TempImageController::class, 'store']);
    Route::post('save-product-image', [ProductController::class, 'saveProductImage']);
    Route::get('change-product-default-image', [ProductController::class, 'updateDefaultImage']);
    Route::delete('delete-product-image/{id}', [ProductController::class, 'deleteProductImage']);
    Route::get('orders', [AdminOrderController::class, 'index']);
    Route::get('orders/{id}', [AdminOrderController::class, 'details']);

    Route::post('update-order/{id}', [AdminOrderController::class, 'updateOrder']);
    Route::get('get-shipping', [ShippingController::class, 'getShipping']);
    Route::post('save-shipping', [ShippingController::class, 'updateShipping']);
});

// Route::middleware(['cors'])->post('temp-images', [TempImageController::class, 'store']);

