<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //

    protected $fillable = ['name', 'price', 'category_id', 'status'];

   


    // Product has many order items
 
    
    protected $appends=['image_url'];

    public function getImageUrlAttribute(){
     if($this->image==""){
        return "";
     }
     return asset('/uploads/products/smallThumb/'.$this->image);
    }
    function product_images(){
        return $this->hasMany(ProductImage::class);
    }
    function product_ports(){
        return $this->hasMany(ProductSpec::class);
    }
    public function category()
{
    return $this->belongsTo(Category::class);
}

public function brand()
{
    return $this->belongsTo(Brand::class);
}
   public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }


}
