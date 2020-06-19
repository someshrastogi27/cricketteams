<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $fillable = [
        'firstname', 'lastname', 'player_image', 'country', 'player_jersey_number', 'team_id'
    ];
}
