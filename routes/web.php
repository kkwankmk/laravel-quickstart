<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index');
Route::get('/tasks', 'TaskController@index');

Route::delete('/task/{task}', 'TaskController@destroy');
Route::post('/task/edit/{id}', 'TaskController@index');
Route::post('/task', 'TaskController@store');
Route::post('/task/{id}', 'TaskController@store');

Route::get('/welcome', 'TaskController@reactTasks');
Route::get('/react_tasks', 'TaskController@reactTasks');
Route::get('/flux_tasks', 'TaskController@reactTasks');
