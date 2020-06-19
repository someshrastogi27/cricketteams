<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWinningTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('winning', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('match_id');
            $table->integer('team_id');
            $table->tinyInteger('status')->comment('1 = Winner, 2 = Lost, 3 = Tie');
            $table->tinyInteger('points');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('winning');
    }
}
