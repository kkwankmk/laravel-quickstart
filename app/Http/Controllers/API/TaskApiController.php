<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Task;

class TaskApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks()->get();
        // print_r($tasks);
        return response()->json($tasks);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // print_r($request->all());
        $task = $request->user()->tasks()->create([
            'name' => $request->name,
        ]);

        return response()->json([
            'id' => $task->id,
            'name' => $task->name,
            'status' => 'save success'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $task = $request->user()->tasks()->find($id);
        return response()->json([
            'id' => $task->id,
            'name' => $task->name
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
         $task = $request->user()->tasks()->find($id);
         $task->name = $request->name;
         $task->save();

         return response()->json([
            'id' => $task->id,
            'name' => $task->name,
            'status' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
         $task = $request->user()->tasks()->find($id);
         $id = $task->id;
         $name = $task->name;
         $task->delete();

        return response()->json([
            'id' => $id,
            'name' => $name,
            'status' => 'delete success'
        ]);
    }
}
