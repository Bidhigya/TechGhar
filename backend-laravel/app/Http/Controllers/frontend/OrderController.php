<?php
namespace App\Http\Controllers\frontend;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Exception;
use Illuminate\Http\Request;
class OrderController extends Controller
{
    //
public function saveOrder(Request $request)
{
    if (empty($request->cart)) {
        return response()->json([
            'status' => 400,
            'message' => 'Your cart is empty!',
        ], 400);
    }

    // Validate stock first
    foreach ($request->cart as $item) {
        $product = \App\Models\Product::find($item['product_id']);

        if (!$product) {
            return response()->json([
                'status' => 404,
                'message' => "Product with ID {$item['product_id']} not found!",
            ], 404);
        }

        if ($product->qty < $item['qty']) {
            return response()->json([
                'status' => 400,
                'message' => "Only {$product->qty} units available for {$product->title}. Please reduce the quantity.",
            ], 400);
        }
    }

    // If all items are in stock → proceed to create the order
    $order = new \App\Models\Order();
    $order->name = $request->name;
    $order->email = $request->email;
    $order->address = $request->address;
    $order->mobile = $request->mobile;
    $order->state = $request->state;
    $order->zip = $request->zip;
    $order->city = $request->city;
    $order->grand_total = $request->grand_total;
    $order->sub_total = $request->sub_total;
    $order->shipping = $request->shipping;
    $order->discount = $request->discount;
    $order->payment_status = $request->payment_status;
    $order->payment_method = $request->payment_method;
    $order->status = $request->status;
    $order->user_id = $request->user()->id;
    $order->save();

    // Save each order item and update stock
    foreach ($request->cart as $item) {
        $product = \App\Models\Product::find($item['product_id']);

        // Deduct stock
        $product->qty -= $item['qty'];
        $product->save();

        $orderItem = new \App\Models\OrderItem();
        $orderItem->order_id = $order->id;
        $orderItem->price = $item['qty'] * $item['price'];
        $orderItem->unit_price = $item['price'];
        $orderItem->qty = $item['qty'];
        $orderItem->product_id = $item['product_id'];
        $orderItem->port = $item['port'];
        $orderItem->name = $item['title'];
        $orderItem->save();
    }

    return response()->json([
        'status' => 200,
        'id' => $order->id,
        'message' => 'You have placed your order successfully!',
    ]);
}

  
}