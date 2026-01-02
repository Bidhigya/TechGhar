<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    //
    public function stats(): JsonResponse
{
    $userCount = User::count();
    $orderCount = Order::count();
    $productCount = Product::count();

    return response()->json([
        'status' => 200,
        'data' => [
            'users'    => $userCount,
            'orders'   => $orderCount,
            'products' => $productCount,
            'revenue'  => Order::sum('grand_total'),
        ],
    ], 200);
}

 public function orderChart(Request $request): JsonResponse
    {
        $filter = $request->get('filter', 'monthly');

        switch ($filter) {
            case 'yearly':
                $data = Order::select(
                    DB::raw('YEAR(created_at) as label'),
                    DB::raw('COUNT(*) as total'),
                    DB::raw('SUM(grand_total) as revenue')
                )
                    ->groupBy('label')
                    ->orderBy('label', 'asc')
                    ->get();
                break;

            case 'weekly':
                $data = Order::select(
                    DB::raw('WEEK(created_at) as label'),
                    DB::raw('COUNT(*) as total'),
                    DB::raw('SUM(grand_total) as revenue')
                )
                    ->whereYear('created_at', Carbon::now()->year)
                    ->groupBy('label')
                    ->orderBy('label', 'asc')
                    ->get();
                break;

            default: // monthly
                $data = Order::select(
                    DB::raw('MONTHNAME(created_at) as label'),
                    DB::raw('COUNT(*) as total'),
                    DB::raw('SUM(grand_total) as revenue')
                )
                    ->whereYear('created_at', Carbon::now()->year)
                    ->groupBy('label')
                    ->orderByRaw('MONTH(created_at)')
                    ->get();
                break;
        }

        return response()->json([
            'status' => 200,
            'filter' => $filter,
            'data'   => $data,
        ]);
    }

    /**
     * 🥧 Product Pie Chart API
     * Breakdown by Category, Brand, and Stock
     */
    public function productChart(): JsonResponse
    {
        // Products by category
        $byCategory = Product::select(
            'category_id',
            DB::raw('COUNT(*) as total')
        )
            ->groupBy('category_id')
            ->with('category:id,name') 
            ->get()
            ->map(fn($item) => [
                'label' => $item->category->name ?? 'Uncategorized',
                'total' => $item->total,
            ]);

        // Products by brand
        $byBrand = Product::select(
            'brand_id',
            DB::raw('COUNT(*) as total')
        )
            ->groupBy('brand_id')
            ->with('brand:id,name') 
            ->get()
            ->map(fn($item) => [
                'label' => $item->brand->name ?? 'No Brand',
                'total' => $item->total,
            ]);

        // Stock availability
        $byStock = [
            'In Stock'  => Product::where('qty', '>', 0)->count(),
            'Out of Stock' => Product::where('qty', '<=', 0)->count(),
        ];

        return response()->json([
            'status' => 200,
            'by_category' => $byCategory,
            'by_brand'    => $byBrand,
            'by_stock'    => $byStock,
        ]);
    }

    /**
 *  Orders by Category Chart
 */
public function orderByCategory(): JsonResponse
{
    $data = Category::with(['products.orderItems'])
        ->get()
        ->map(function($category) {
            $totalOrders = $category->products->flatMap(fn($p) => $p->orderItems)->pluck('order_id')->unique()->count();
            $totalQuantity = $category->products->flatMap(fn($p) => $p->orderItems)->sum('qty');
            $revenue = $category->products->flatMap(fn($p) => $p->orderItems)->sum(function($item) {
                return $item->price * $item->qty; // or $item->unit_price * $item->qty if using unit_price
            });

            return [
                'label' => $category->name,
                'total_orders' => $totalOrders,
                'total_quantity' => $totalQuantity,
                'revenue' => $revenue,
            ];
        });

    return response()->json([
        'status' => 200,
        'data' => $data,
    ]);
}

/**
 *  Orders by Product Chart
 */
public function orderByProduct(): JsonResponse
{
    $data = Product::with('orderItems')
        ->get()
        ->map(function ($product) {
            $totalSold = $product->orderItems->sum('qty');
            $revenue = $product->orderItems->sum(fn($item) => $item->price * $item->qty);

            
            $label = trim($product->title?? '');

          
            if ($label === '' && $product->orderItems->isNotEmpty()) {
                $label = trim($product->orderItems->first()->name ?? '');
            }

            
            if ($label === '') {
                $label = 'Unnamed Product';
            }

            return [
                'label' => $label,
                'total_sold' => $totalSold,
                'revenue' => $revenue,
            ];
        })
       
        ->sortByDesc('total_sold')
        ->take(10)
        ->values();

    return response()->json([
        'status' => 200,
        'data' => $data,
    ]);
}










}
