<?php

namespace App\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;

class OrderClient
{
    private Client $client;
    private string $baseUrl;

    public function __construct()
    {
        $this->baseUrl = config('services.orders.url');
        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout' => 30,
            'http_errors' => false,
        ]);
    }

    public function proxy(string $method, string $path, array $data = [], ?int $userId = null): array
    {
        $headers = [
            'Content-Type' => 'application/json',
            'Accept' => 'application/json',
        ];

        if ($userId) {
            $headers['X-User-Id'] = (string) $userId;
        }

        try {
            $response = $this->client->request($method, $path, [
                'headers' => $headers,
                'json' => $data,
            ]);

            return [
                'status' => $response->getStatusCode(),
                'body' => json_decode($response->getBody()->getContents(), true),
            ];
        } catch (GuzzleException $e) {
            throw new \Exception('Erreur de communication avec le service de commandes: ' . $e->getMessage());
        }
    }
}
