<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/list', 'TeamController@index');
Route::get('/teamdeinfo/{id}', 'TeamController@show');
Route::get('/teamdetail/{id}', 'TeamController@edit');
Route::post('/teamupdate/{id}', 'TeamController@update');
Route::post('/teamadd', 'TeamController@store');

Route::get('/playerlist', 'PlayerController@index');
Route::get('/playerinfo/{id}', 'PlayerController@show');
Route::get('/playerdetail/{id}', 'PlayerController@edit');
Route::post('/playerupdate/{id}', 'PlayerController@update');
Route::post('/playeradd', 'PlayerController@store');

Route::get('/teamlist', 'MatchController@create');
Route::post('/matchadd', 'MatchController@store');
Route::get('/matchlist', 'MatchController@index');
Route::get('/matchedit/{id}', 'MatchController@edit');
Route::post('/matchupdate/{id}', 'MatchController@update');
Route::get('/matchresult/{id}', 'MatchController@show');
Route::post('/match_result', 'MatchController@match_result');
Route::post('/player_listing', 'MatchController@player_listing');
Route::get('/points', 'MatchController@points');


