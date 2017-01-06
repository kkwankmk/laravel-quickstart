@extends('layouts.app')

@section('content')

    <!-- Bootstrap Boilerplate... -->

    <div class="panel-body">
        <!-- Display Validation Errors -->
        @include('common.errors')

        <!-- New Task Form -->
        <form action="@if($taskedit == null) {{ url('task') }} @else {{ url('task/'.$taskedit->id) }} @endif" method="POST" class="form-horizontal">
            {{ csrf_field() }}

            <!-- Task Name -->
            <div class="form-group">
                <label for="task-name" class="col-sm-3 control-label">Task</label>
                
                    <div class="col-sm-6">
                        <input type="text" name="name" id="task-name" class="form-control" value="@if (count($taskedit) > 0){{ $taskedit->name }}@endif">
                    </div>
            </div>
            

            <!-- Add Task Button -->
            <div class="form-group">
                <div class="col-sm-offset-3 col-sm-6">
                    @if (count($taskedit) > 0)
                        <button type="submit" id="edit" class="btn btn-default" value="{{ $taskedit->id }}">
                             Edit Task
                        </button>
    
                    @else
                        <button type="submit" id="create" class="btn btn-default">
                            Add Task
                        </button>
                    
                    @endif
                </div>
            </div>
        </form>
    </div>

    <!-- TODO: Current Tasks -->

    @if (count($tasks) > 0)
        <div class="panel panel-default">
            <div class="panel-heading">
                Current Tasks
            </div>

            <div class="panel-body">
                <table class="table table-striped task-table">

                    <!-- Table Headings -->
                    <thead>
                        <th>Task</th>
                        <th>&nbsp;</th>
                    </thead>

                    <!-- Table Body -->
                    <tbody>
                        @foreach ($tasks as $task)
                            <tr>
                                <!-- Task Name -->
                                <td class="table-text">
                                    <div>{{ $task->name }}</div>
                                </td>

                                <td>
                                    <form action="{{ url('task/edit/'.$task->id) }}" method="POST">
                                        {{ csrf_field() }} 

                                        <button type="submit" id="edit-task-{{ $task->id }}" class="btn btn-primary">
                                            Edit
                                        </button>
                                    </form>
                                </td>

                                <td>
                                    <form action="{{ url('task/'.$task->id) }}" method="POST">
                                        {{ csrf_field() }}
                                        {{ method_field('DELETE') }}

                                        <button type="submit" id="delete-task-{{ $task->id }}" class="btn btn-danger">
                                            <i class="fa fa-btn fa-trash"></i>Delete
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    @endif
@endsection