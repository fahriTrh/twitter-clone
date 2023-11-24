<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        $validatedComment = $request->validate([
            'text' => 'required|max:100',
            'user_id'=> 'required|integer',
            'post_id'=> 'required|integer',
            'recipent_id'=> 'required|integer',
        ]);


        if ($request->file('image')) {
            $file = $request->file('image');

            $destinationPath = public_path('comment-images');
            $hashedName = Str::random(20);
            $extension = $file->getClientOriginalExtension();
            $fileName = $hashedName . '.' . $extension;

            $validatedComment['image'] = $fileName;
            $file->move($destinationPath, $fileName);
        }

        try {
            Comment::create($validatedComment);
            return back()->with('success', 'success comment!');
        } catch (\Exception $e) {
            return back()->with('error', 'something went wrong!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        if ($comment->image) {
            unlink(public_path('comment-images/'. $comment->image));
        }
        
        try {
            Comment::where('id', $comment->id)->delete();
            return back()->with('success','deleted success!');
        } catch (\Exception $e) {
            return back()->with('error', 'something went wrong');
        }
    }
}
