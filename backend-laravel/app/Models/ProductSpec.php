<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSpec extends Model
{
    //
    public function port()
{
    return $this->belongsTo(Port::class); // Ensure Port model exists
}

}
