<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Task;

class TaskController extends Controller
{
    //
    public function __construct()
    {
        $this->middleware('auth');
    }

    
    public function index(Request $request)
	{
		$method = $request->method();
		$tasks = $request->user()->tasks()->get();
		$taskedit = null;

		if ($request->isMethod('post')){
			$id = $request->route('id');
			$taskedit = Task::find($request->id);
		}
		return view('tasks.index', [
	        'tasks' => $tasks,
	        'taskedit' => $taskedit,
	    ]);
	}


	public function store(Request $request)
	{
		$this->validate($request, [
	        'name' => 'required|max:255',
	    ]);
		
		if($request->route('id') != null){
			$task = Task::find($request->id);
			$task->name = $request->name;
			$task->save();
		}
		else{
			$request->user()->tasks()->create([
	        	'name' => $request->name,
	    	]);
		}	   

	    return redirect('/tasks');
	}

	public function destroy(Request $request, Task $task)
	{
	    $this->authorize('destroy', $task);

	    $task->delete();

	    return redirect('/tasks');
	}

	public function reactTasks(Request $request)
	{
		return view('tasks.react_tasks', []);
	}
}
