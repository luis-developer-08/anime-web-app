<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/telescope-requests', function () {
    $requests = DB::table('telescope_entries')
        ->where('type', 'request') // Fetch only request logs
        ->whereNot('content->uri', 'like', 'api/%') // Exclude 'api/' routes
        ->orderBy('created_at', 'desc')
        ->limit(10) // Fetch the latest 50 requests
        ->get()
        ->map(function ($entry) {
            $content = json_decode($entry->content, true);

            return [
                'method' => $content['method'] ?? null,
                'uri' => $content['uri'] ?? null,
                'status' => $content['response_status'] ?? null,
                'duration' => $content['duration'] ?? null,
                'created_at' => $entry->created_at,
            ];
        });

    return response()->json($requests);
});
