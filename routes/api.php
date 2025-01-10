<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/telescope-requests', function (Request $request) {
    // Optional: Add filters like date range or specific status codes
    $requests = DB::table('telescope_entries')
        ->where('type', 'request') // Only fetch request logs
        ->orderBy('created_at', 'desc')
        ->limit(10) // Fetch the latest 50 requests
        ->get();

    return response()->json($requests);
});
