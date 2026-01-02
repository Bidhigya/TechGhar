<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    //

      protected $fillable = ['product_id', 'order_id', 'name', 'price', 'unit_price', 'qty'];


          public function product()
    {
        return $this->belongsTo(Product::class);
    }
    // OrderItem belongs to an order
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // OrderItem belongs to a product

  
}
